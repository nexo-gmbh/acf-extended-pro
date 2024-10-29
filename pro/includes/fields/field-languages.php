<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_languages')):

class acfe_languages extends acf_field{
    
    /**
     * initialize
     */
    function initialize(){
        
        $this->name = 'acfe_languages';
        $this->label = __('Languages', 'acfe');
        $this->category = 'choice';
        $this->defaults = array(
            'languages'             => array(),
            'multilang'             => 0,
            'field_type'            => 'checkbox',
            'multiple'              => 0,
            'flags'                 => 0,
            'continents'            => 0,
            'allow_null'            => 0,
            'choices'               => array(),
            'default_value'         => '',
            'ui'                    => 0,
            'ajax'                  => 0,
            'placeholder'           => '',
            'search_placeholder'    => '',
            'layout'                => '',
            'toggle'                => 0,
            'allow_custom'          => 0,
            'other_choice'          => 0,
            'display_format'        => '{name}',
            'return_format'         => 'array',
        );
        
    }
    
    
    /**
     * get_choices
     *
     * @param $field
     *
     * @return mixed
     */
    function get_choices($field){
        
        // Default args
        $args = array(
            'field'  => 'name',
            'display' => $field['display_format']
        );
        
        // Flags
        if($field['flags']){
            $args['prepend'] = '<span class="iti__flag iti__{flag}"></span>';
        }
        
        // Allow Languages
        if($field['languages']){
            $args['locale__in'] = $field['languages'];
            $args['orderby'] = 'locale__in';
        }
        
        // Group by Continents
        if($field['continents']){
            $args['groupby'] = 'continent';
        }
        
        // Multilingual Support
        if(acfe_is_multilang() && $field['multilang']){
            
            // Get active languages
            $locales = acfe_get_multilang_languages('locale', 'active');
            
            // Search in locale
            $args['locale__in'] = $locales;
            
            // Wildcard search for WPML
            if(acfe_is_wpml()){
                
                // First pass
                $wpml_choices = acfe_get_languages(array(
                    'locale__in' => $locales,
                    'field'      => 'name'
                ));
                
                $not_found = array();
                
                foreach($locales as $locale){
                    
                    if(isset($wpml_choices[$locale]))
                        continue;
                    
                    $not_found[] = $locale;
                    
                }
                
                // There's still locales not found
                if($not_found){
                    
                    // Second pass
                    $wpml_alt_choices = acfe_get_languages(array(
                        'alt__in' => $not_found,
                        'field'      => 'name'
                    ));
                    
                    $wpml_choices = array_merge($wpml_choices, $wpml_alt_choices);
                    
                }
                
                // Change arguments
                $args['locale__in'] = array_keys($wpml_choices);
                
            }
            
        }
        
        // Vars
        $post_id = acfe_get_post_id();
        $field_name = $field['_name'];
        $field_key = $field['key'];
        
        // Filters
        $args = apply_filters("acfe/fields/languages/query",                    $args, $field, $post_id);
        $args = apply_filters("acfe/fields/languages/query/name={$field_name}", $args, $field, $post_id);
        $args = apply_filters("acfe/fields/languages/query/key={$field_key}",   $args, $field, $post_id);
        
        // Query
        $choices = acfe_get_languages($args);
        
        // Loop
        foreach(array_keys($choices) as $code){
            
            // Vars
            $text = $choices[$code];
            $language = acfe_get_language($code);
            
            // Filters
            $text = apply_filters("acfe/fields/languages/result",                       $text, $language, $field, $post_id);
            $text = apply_filters("acfe/fields/languages/result/name={$field_name}",    $text, $language, $field, $post_id);
            $text = apply_filters("acfe/fields/languages/result/key={$field_key}",      $text, $language, $field, $post_id);
            
            // Apply
            $choices[$code] = $text;
            
        }
        
        // Return
        return $choices;
        
    }
    
    
    /**
     * render_field_settings
     *
     * @param $field
     */
    function render_field_settings($field){
    
        if(isset($field['default_value'])){
            $field['default_value'] = acf_encode_choices($field['default_value'], false);
        }
        
        $allow_conditions = array();
        
        if(acfe_is_multilang()){
            
            $plugin = acfe_is_polylang() ? 'Polylang' : 'WPML';
    
            // Multilingual Support
            acf_render_field_setting($field, array(
                'label'         => $plugin . ' ' . __('Languages','acf'),
                'instructions'  => __('Display languages set in', 'acfe') . ' ' . $plugin,
                'name'          => 'multilang',
                'type'          => 'true_false',
                'ui'            => 1,
            ));
    
            $allow_conditions = array(
                array(
                    array(
                        'field'     => 'multilang',
                        'operator'  => '!=',
                        'value'     => '1',
                    ),
                ),
            );
            
        }
        
        // Allow Languages
        acf_render_field_setting($field, array(
            'label'         => __('Allow Languages','acf'),
            'instructions'  => '',
            'type'          => 'select',
            'name'          => 'languages',
            'choices'       => acfe_get_languages(array(
                'field'         => 'native',
                'orderby'       => 'code',
                'display'       => '<span class="iti__flag iti__{flag}"></span>{native} ({locale})',
            )),
            'multiple'      => 1,
            'ui'            => 1,
            'allow_null'    => 1,
            'placeholder'   => __('All Languages','acf'),
            'conditions'    => $allow_conditions
        ));
        
        // Field Type
        acf_render_field_setting($field, array(
            'label'         => __('Appearance','acf'),
            'instructions'  => __('Select the appearance of this field', 'acf'),
            'type'          => 'select',
            'name'          => 'field_type',
            'choices'       => array(
                'checkbox'      => __('Checkbox', 'acf'),
                'radio'         => __('Radio Buttons', 'acf'),
                'select'        => _x('Select', 'noun', 'acf')
            )
        ));
        
        // Default Value
        acf_render_field_setting($field, array(
            'label'         => __('Default Value','acf'),
            'instructions'  => __('Enter each default value on a new line','acf'),
            'name'          => 'default_value',
            'type'          => 'textarea',
        ));
        
        // Return Format
        acf_render_field_setting($field, array(
            'label'         => __('Return Value', 'acf'),
            'instructions'  => '',
            'type'          => 'radio',
            'name'          => 'return_format',
            'layout'        => 'horizontal',
            'choices'       => array(
                'array'         => __('Language array', 'acfe'),
                'name'          => __('Language name', 'acfe'),
                'locale'        => __('Language locale code', 'acfe'),
            ),
        ));
    
        // display format
        acf_render_field_setting($field, array(
            'label'         => __('Display Format','acf'),
            'instructions'  => __('The format displayed when editing a post','acf'),
            'type'          => 'radio',
            'name'          => 'display_format',
            'other_choice'  => 1,
            'choices'       => array(
                '{name}'                => '<span>Italian</span><code>{name}</code>',
                '{native} ({locale})'   => '<span>Italiano (it_IT)</span><code>{native} ({locale})</code>',
                ''                      => '<span>Empty</span>',
                'other'                 => '<span>' . __('Custom:', 'acf') . '</span>',
            )
        ));
        
        // Display Flags
        acf_render_field_setting($field, array(
            'label'         => __('Display Flags','acf'),
            'instructions'  => __('Display languages flags', 'acfe'),
            'name'          => 'flags',
            'type'          => 'true_false',
            'ui'            => 1,
            'conditions'    => array(
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'select',
                    ),
                    array(
                        'field'     => 'ui',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                ),
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'checkbox',
                    ),
                ),
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'radio',
                    ),
                ),
            )
        ));
        
        // Group by Continents
        acf_render_field_setting($field, array(
            'label'         => __('Group by Continents','acf'),
            'instructions'  => __('Group languages by their continent', 'acfe'),
            'name'          => 'continents',
            'type'          => 'true_false',
            'ui'            => 1,
        ));
        
        // Select: Allow Null
        acf_render_field_setting($field, array(
            'label'         => __('Allow Null?','acf'),
            'instructions'  => '',
            'name'          => 'allow_null',
            'type'          => 'true_false',
            'ui'            => 1,
            'conditions'    => array(
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'select',
                    ),
                ),
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'radio',
                    ),
                ),
            )
        ));
        
        // Select: Multiple
        acf_render_field_setting($field, array(
            'label'         => __('Select multiple values?','acf'),
            'instructions'  => '',
            'name'          => 'multiple',
            'type'          => 'true_false',
            'ui'            => 1,
            'conditions'    => array(
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'select',
                    ),
                ),
            )
        ));
        
        // Select: UI
        acf_render_field_setting($field, array(
            'label'         => __('Stylised UI','acf'),
            'instructions'  => '',
            'name'          => 'ui',
            'type'          => 'true_false',
            'ui'            => 1,
            'conditions'    => array(
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'select',
                    ),
                ),
            )
        ));
        
        // Select: Ajax
        acf_render_field_setting($field, array(
            'label'         => __('Use AJAX to lazy load choices?','acf'),
            'instructions'  => '',
            'name'          => 'ajax',
            'type'          => 'true_false',
            'ui'            => 1,
            'conditions'    => array(
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'select',
                    ),
                    array(
                        'field'     => 'ui',
                        'operator'  => '==',
                        'value'     => 1,
                    ),
                ),
            )
        ));
        
        // Select: Placeholder
        acf_render_field_setting($field, array(
            'label'             => __('Placeholder','acf'),
            'instructions'      => __('Appears within the input','acf'),
            'type'              => 'text',
            'name'              => 'placeholder',
            'placeholder'       => _x('Select', 'verb', 'acf'),
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'select',
                    ),
                    array(
                        'field'     => 'ui',
                        'operator'  => '==',
                        'value'     => '0',
                    ),
                    array(
                        'field'     => 'allow_null',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                    array(
                        'field'     => 'multiple',
                        'operator'  => '==',
                        'value'     => '0',
                    ),
                ),
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'select',
                    ),
                    array(
                        'field'     => 'ui',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                    array(
                        'field'     => 'allow_null',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                ),
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'select',
                    ),
                    array(
                        'field'     => 'ui',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                    array(
                        'field'     => 'multiple',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                ),
            )
        ));
        
        // Select: Search Placeholder
        acf_render_field_setting($field, array(
            'label'             => __('Search Input Placeholder','acf'),
            'instructions'      => __('Appears within the search input','acf'),
            'type'              => 'text',
            'name'              => 'search_placeholder',
            'placeholder'       => '',
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'select',
                    ),
                    array(
                        'field'     => 'ui',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                    array(
                        'field'     => 'multiple',
                        'operator'  => '==',
                        'value'     => '0',
                    ),
                ),
            )
        ));
        
        // Radio: Other Choice
        acf_render_field_setting($field, array(
            'label'         => __('Other','acf'),
            'instructions'  => '',
            'name'          => 'other_choice',
            'type'          => 'true_false',
            'ui'            => 1,
            'message'       => __("Add 'other' choice to allow for custom values", 'acf'),
            'conditions'    => array(
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'radio',
                    ),
                ),
            )
        ));
        
        // Checkbox: Layout
        acf_render_field_setting($field, array(
            'label'         => __('Layout','acf'),
            'instructions'  => '',
            'type'          => 'radio',
            'name'          => 'layout',
            'layout'        => 'horizontal', 
            'choices'       => array(
                'vertical'      => __("Vertical",'acf'),
                'horizontal'    => __("Horizontal",'acf')
            ),
            'conditions'    => array(
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'checkbox',
                    ),
                ),
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'radio',
                    ),
                ),
            )
        ));
        
        // Checkbox: Toggle
        acf_render_field_setting($field, array(
            'label'         => __('Toggle','acf'),
            'instructions'  => __('Prepend an extra checkbox to toggle all choices','acf'),
            'name'          => 'toggle',
            'type'          => 'true_false',
            'ui'            => 1,
            'conditions'    => array(
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'checkbox',
                    ),
                ),
            )
        ));
        
        // Checkbox: Allow Custom
        acf_render_field_setting($field, array(
            'label'         => __('Allow Custom','acf'),
            'instructions'  => '',
            'name'          => 'allow_custom',
            'type'          => 'true_false',
            'ui'            => 1,
            'message'       => __("Allow 'custom' values to be added", 'acf'),
            'conditions'    => array(
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'checkbox',
                    ),
                ),
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'select',
                    ),
                    array(
                        'field'     => 'ui',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                )
            )
        ));
        
    }
    
    
    /**
     * update_field
     *
     * @param $field
     *
     * @return mixed
     */
    function update_field($field){
        
        $field['default_value'] = acf_decode_choices($field['default_value'], true);
        
        if($field['field_type'] === 'radio'){
            $field['default_value'] = acfe_unarray($field['default_value']);
        }
        
        return $field;
        
    }
    
    
    /**
     * prepare_field
     *
     * @param $field
     *
     * @return array|mixed
     */
    function prepare_field($field){
    
        // field type
        $type = $field['type'];
        $field_type = $field['field_type'];
    
        $field['type'] = $field_type;
        $field['wrapper']['data-ftype'] = $type;
    
        // choices
        $field['choices'] = $this->get_choices($field);
    
        // radio value
        if($field['field_type'] === 'radio'){
            $field['value'] = acfe_unarray($field['value']);
        }
    
        // labels
        $field = acfe_prepare_checkbox_labels($field);
    
        // allow custom
        if($field['allow_custom']){
        
            $value = acf_maybe_get($field, 'value');
            $value = acf_get_array($value);
        
            foreach($value as $v){
            
                // append custom value to choices
                if(!isset($field['choices'][ $v ])){
                    $field['choices'][ $v ] = $v;
                    $field['custom_choices'][ $v ] = $v;
                }
            }
        
        }
    
        // return
        return $field;
        
    }
    
    
    /**
     * format_value
     *
     * @param $value
     * @param $post_id
     * @param $field
     *
     * @return array|false|mixed|string[]
     */
    function format_value($value, $post_id, $field){
        
        // bail early
        if(empty($value)){
            return $value;
        }
    
        // vars
        $is_array = is_array($value);
        $value = acf_get_array($value);
    
        // loop
        foreach($value as &$v){
        
            // get object
            $object = acfe_get_language($v);
        
            if(!$object || is_wp_error($object)) continue;
        
            // return: object
            if($field['return_format'] === 'array'){
                $v = $object;
    
            // return: name
            }elseif($field['return_format'] === 'name'){
                $v = acf_maybe_get($object, 'name');
            }
        
        }
        
        // check array
        if(!$is_array){
            $value = acfe_unarray($value);
        }
        
        // return
        return $value;
        
    }
    
    
    /**
     * translate_field
     *
     * @param $field
     *
     * @return mixed
     */
    function translate_field($field){
        
        $field['placeholder'] = acf_translate($field['placeholder']);
        $field['search_placeholder'] = acf_translate($field['search_placeholder']);
        
        return $field;
        
    }
    
}

// initialize
acf_register_field_type('acfe_languages');

endif;