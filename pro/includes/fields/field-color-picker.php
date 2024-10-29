<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_field_color_picker')):

class acfe_field_color_picker extends acfe_field_extend{
    
    // acf 5.10
    var $is_old_acf = false;
    
    /**
     * initialize
     */
    function initialize(){
        
        $this->name = 'color_picker';
        
        $this->defaults = array(
            'display'      => 'default',
            'button_label' => __('Select Color', 'acfe'),
            'color_picker' => true,
            'absolute'     => false,
            'input'        => true,
            'allow_null'   => true,
            'theme_colors' => false,
            'colors'       => array(),
        );
        
        $this->replace = array(
            'render_field'
        );
    
        // check acf version
        if(acf_version_compare(acf_get_setting('version'),  '<', '5.10')){
            $this->is_old_acf = true;
        }
    
        if($this->is_old_acf){
    
            $this->defaults['return_format'] = 'value';
            $this->defaults['alpha'] = false;
        
        }
    
        add_filter('acf/prepare_field/name=return_format', array($this, 'prepare_return_format'), 5);
        
    }
    
    
    /**
     * prepare_return_format
     *
     * @param $field
     *
     * @return mixed
     */
    function prepare_return_format($field){
        
        // new acf
        if(!$this->is_old_acf){
    
            if(isset($field['wrapper']['data-setting']) && $field['wrapper']['data-setting'] === 'color_picker'){
                
                $field['choices']['label'] = __('Label', 'acf');
                $field['choices']['color_label'] = __('Color + Label Array', 'acfe');
                
            }
            
        }
        
        return $field;
        
    }
    
    
    /**
     * input_admin_enqueue_scripts
     */
    function input_admin_enqueue_scripts(){
        
        // old acf
        if($this->is_old_acf){
    
            $suffix = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '' : '.min';
    
            // register
            wp_register_script('acfe-color-picker-alpha', acfe_get_url('pro/assets/inc/wp-color-picker-alpha/wp-color-picker-alpha' . $suffix . '.js'), array('wp-color-picker'), '3.0.0');
    
            // enqueue if gutenberg
            if(acfe_is_block_editor()){
                wp_enqueue_script('acfe-color-picker-alpha');
            }
            
        }
        
    }
    
    
    /**
     * validate_field
     *
     * @param $field
     *
     * @return mixed
     */
    function validate_field($field){
    
        // new acf
        if(!$this->is_old_acf){
    
            // old alpha
            if(acf_maybe_get($field, 'alpha')){
                $field['enable_opacity'] = true;
                unset($field['alpha']);
            }
            
            // old return format
            if(acf_maybe_get($field, 'return_format') === 'value'){
                $field['return_format'] = 'string';
            }
        
        }
        
        return $field;
        
    }
    
    
    /**
     * render_field_settings
     *
     * @param $field
     */
    function render_field_settings($field){
    
        $field['colors'] = acf_encode_choices($field['colors']);
    
        acf_render_field_setting($field, array(
            'label'         => __('Display Style','acf'),
            'instructions'  => '',
            'name'          => 'display',
            'type'          => 'radio',
            'layout'        => 'horizontal',
            'choices'       => array(
                'default'   => 'Default',
                'palette'   => 'Palette'
            )
        ));
    
        // only for older ACF version
        if($this->is_old_acf){
    
            acf_render_field_setting($field, array(
                'label'         => __('Return Value','acf'),
                'instructions'  => '',
                'name'          => 'return_format',
                'type'          => 'radio',
                'layout'        => 'horizontal',
                'choices'       => array(
                    'value'         => __('Value','acf'),
                    'label'         => __('Label','acf'),
                    'array'         => __('Both (Array)','acf')
                )
            ));
            
        }
        
        acf_render_field_setting($field, array(
            'label'         => __('Button Label','acf'),
            'instructions'  => '',
            'name'          => 'button_label',
            'type'          => 'text',
            'default_value' => __('Select Color'),
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'display',
                        'operator'  => '==',
                        'value'     => 'default',
                    ),
                )
            )
        ));
    
        acf_render_field_setting($field, array(
            'label'         => __('Color Picker','acf'),
            'instructions'  => '',
            'name'          => 'color_picker',
            'type'          => 'true_false',
            'ui'            => 1
        ));
    
        acf_render_field_setting($field, array(
            'label'         => __('Position Absolute','acf'),
            'instructions'  => '',
            'name'          => 'absolute',
            'type'          => 'true_false',
            'ui'            => 1,
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'color_picker',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                )
            )
        ));
    
        acf_render_field_setting($field, array(
            'label'         => __('Text Input','acf'),
            'instructions'  => '',
            'name'          => 'input',
            'type'          => 'true_false',
            'ui'            => 1,
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'display',
                        'operator'  => '==',
                        'value'     => 'default',
                    ),
                ),
                array(
                    array(
                        'field'     => 'color_picker',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                )
            )
        ));
    
        acf_render_field_setting($field, array(
            'label'         => __('Allow null','acf'),
            'instructions'  => '',
            'name'          => 'allow_null',
            'type'          => 'true_false',
            'ui'            => 1
        ));
    
        // only for older ACF version
        if($this->is_old_acf){
    
            acf_render_field_setting($field, array(
                'label'         => __('RGBA','acf'),
                'instructions'  => '',
                'name'          => 'alpha',
                'type'          => 'true_false',
                'ui'            => 1,
            ));
            
        }
    
        acf_render_field_setting($field, array(
            'label'         => __('Use Theme Colors','acf'),
            'instructions'  => '',
            'name'          => 'theme_colors',
            'type'          => 'true_false',
            'ui'            => 1,
        ));
        
        acf_render_field_setting($field, array(
            'label'         => __('Custom Colors','acf'),
            'instructions'  => __('Enter each choice on a new line.', 'acf') . '<br /><br />' . "#2271b1 : Primary<br/>#6c757d : Secondary",
            'type'          => 'textarea',
            'name'          => 'colors',
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
        
        $field['colors'] = acf_decode_choices($field['colors']);
        
        return $field;
        
    }
    
    
    /**
     * render_field
     *
     * @param $field
     */
    function render_field($field){
        
        // enqueue dashicons
        wp_enqueue_style('dashicons');
    
        // old acf
        if($this->is_old_acf){
    
            // enqueue color picker alpha
            if($field['alpha']){
                wp_enqueue_script('acfe-color-picker-alpha');
            }
            
        }
        
        // text input
        $text_input = acf_get_sub_array($field, array('id', 'class', 'value'));
        $text_input['autocomplete'] = 'off';
        
        // hidden input
        $hidden_input = acf_get_sub_array($field, array('name', 'value'));
    
        // get Colors
        $field['colors'] = $this->get_colors($field);
    
        // attributes
        $atts = array(
            'class'             => "acf-color-picker {$field['class']}",
            'data-display'      => $field['display'],
            'data-button_label' => $field['button_label'],
            'data-allow_null'   => $field['allow_null'],
            'data-color_picker' => $field['color_picker'],
            'data-absolute'     => $field['absolute'],
            'data-input'        => $field['input'],
            'data-colors'       => array_keys($field['colors']),
        );
    
        // old acf
        if($this->is_old_acf){
            $atts['data-alpha'] = $field['alpha'];
            
        // new acf
        }else{
            $atts['data-alpha'] = $field['enable_opacity'];
        }
        
        // html
        ?>
        <div <?php echo acf_esc_atts($atts); ?>>
            
            <?php acf_hidden_input($hidden_input); ?>
            
            <?php if($field['display'] === 'default'): ?>
    
                <?php acf_text_input($text_input); ?>
            
            <?php else: ?>

                <div class="acf-color-picker-palette">
                    
                    <?php foreach($field['colors'] as $color => $name): ?>
                        
                        <?php
                        $title = $color !== $name ? $name : false;
                        $selected = $color === $field['value'] ? 'selected' : false;
                        $border = $color;
                        
                        // check gradient
                        if(stripos($border, 'gradient')){
                            
                            preg_match('/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)|#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?/', $border, $matches);
                            
                            // set border as first gradient color
                            if(isset($matches[0])){
                                $border = $matches[0];
                            }
                            
                        }
                        
                        // palette selected
                        // remove value from color picker
                        if($selected){
                            $text_input['value'] = '';
                        }
                        ?>
                    
                        <a href="#" class="color <?php echo $selected; ?>" data-color="<?php echo $color; ?>">
                            <?php if($title): ?>
                                <span class="color-label acf-js-tooltip" title="<?php echo $title; ?>"></span>
                            <?php endif; ?>
                            <span class="color-alpha" style="background:<?php echo $color; ?>; color:<?php echo $border; ?>;"></span>
                            <span class="dashicons dashicons-saved"></span>
                        </a>
        
                    <?php endforeach; ?>
                    
                    <?php
                    if($field['color_picker']){
                        acf_text_input($text_input);
                    }
                    ?>
                    
                </div>
            
            <?php endif; ?>
            
        </div>
        <?php
        
    }
    
    
    /**
     * load_value
     *
     * @param $value
     * @param $post_id
     * @param $field
     *
     * @return mixed
     */
    function load_value($value, $post_id, $field){
    
        // bail early
        if(empty($value)){
            return $value;
        }
        
        // check hex value
        if(is_string($value) && acfe_starts_with($value, '#')){
    
            // convert short hex to full
            // #f00 => #ff0000
            if(strlen($value) === 4){
                $value = "#{$value[1]}{$value[1]}{$value[2]}{$value[2]}{$value[3]}{$value[3]}";
            }
    
            // force lowercase
            $value = strtolower($value);
    
        }
        
        // return
        return $value;
        
    }
    
    
    /**
     * format_value
     *
     * @param $value
     * @param $post_id
     * @param $field
     *
     * @return array|mixed|null
     */
    function format_value($value, $post_id, $field){
        
        // bail early
        if(empty($value)){
            return $value;
        }
    
        // get colors
        $field['colors'] = $this->get_colors($field);
    
        // get color object
        $object = $this->get_color_array($value, $field);
        
        // old acf
        if($this->is_old_acf){
    
            // value
            if($field['return_format'] === 'value'){
                // do nothing
        
            // label
            }elseif($field['return_format'] === 'label'){
                $value = $object['label'];
        
            // array
            }elseif($field['return_format'] === 'array'){
                $value = $object;
        
            }
            
        // new acf
        }else{
            
            // label
            if($field['return_format'] === 'label'){
                $value = $object['label'];
                
            // color + label array
            }elseif($field['return_format'] === 'color_label'){
                $value = $object;
                
            }
            
        }
        
        // return
        return $value;
        
    }
    
    
    /**
     * get_colors
     *
     * @param $field
     *
     * @return array
     */
    function get_colors($field){
        
        // vars
        $colors = array();
        
        // theme colors settings
        if($field['theme_colors']){
            
            // theme support
            // https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-support/#block-color-palettes
            $editor_color_palette = current(acf_get_array(get_theme_support('editor-color-palette')));
            
            if(!empty($editor_color_palette)){
                
                foreach($editor_color_palette as $row){
                    $colors[ $row['color'] ] = $row['name'];
                }
                
            }
            
            // theme.json
            // https://developer.wordpress.org/themes/advanced-topics/theme-json/
            $theme_has_json = false;
            
            // wp 6.2
            if(function_exists('wp_theme_has_theme_json')){
                $theme_has_json = wp_theme_has_theme_json();
                
            // wp 5.8 / 5.9 / 6.0 / 6.1
            }elseif(class_exists('WP_Theme_JSON_Resolver')){
                $theme_has_json = WP_Theme_JSON_Resolver::theme_has_support();
                
            }
            
            if($theme_has_json){
    
                // retrieve theme json
                $theme_data = WP_Theme_JSON_Resolver::get_theme_data();
                $theme_settings = $theme_data->get_settings();
    
                // check palette
                if(isset($theme_settings['color']['palette']['theme'])){
        
                    // loop
                    foreach($theme_settings['color']['palette']['theme'] as $palette){
    
                        // check color not already set in theme support
                        if(!isset($colors[ $palette['color'] ])){
                            $colors[ $palette['color'] ] = $palette['name'];
                        }
            
                    }
        
                }
    
                // check gradients
                if(isset($theme_settings['color']['gradients']['theme'])){
        
                    // loop
                    foreach($theme_settings['color']['gradients']['theme'] as $gradient){
            
                        // check color not already set in theme support
                        if(!isset($colors[ $gradient['gradient'] ])){
                            $colors[ $gradient['gradient'] ] = $gradient['name'];
                        }
            
                    }
        
                }
                
            }
            
        }
        
        // field settings colors
        foreach($field['colors'] as $color => $name){
            
            // check color not already set in theme
            if(!isset($colors[ $color ])){
                $colors[ $color ] = $name;
            }
            
        }
        
        // normalize hex colors
        foreach(array_keys($colors) as $key){
            
            // vars
            $color = $key;
            $name = $colors[ $color ];
            
            // is hex color
            if(acfe_starts_with($color, '#')){
                
                // convert shorthand hex to full
                // #000 => #000000
                if(strlen($color) === 4){
                    $color = "#{$color[1]}{$color[1]}{$color[2]}{$color[2]}{$color[3]}{$color[3]}";
                }
                
                // force lowercase
                $color = strtolower($color);
                
                // update array
                unset($colors[ $key ]);
                $colors[ $color ] = $name;
                
            }
            
        }
        
        // return
        return $colors;
        
    }
    
    
    /**
     * get_color_array
     *
     * @param $value
     * @param $field
     *
     * @return array
     */
    function get_color_array($value, $field){
        
        // loop colors
        foreach($field['colors'] as $color => $name){
    
            // find value as key
            if($color === $value){
                
                return array(
                    'color' => $color,
                    'label' => $name,
                );
                
            }
            
        }
        
        // default
        return array(
            'color' => $value,
            'label' => $value,
        );
        
    }
    
    
    /**
     * translate_field
     *
     * @param $field
     *
     * @return mixed
     */
    function translate_field($field){
        
        $field['button_label'] = acf_translate($field['button_label']);
        
        return $field;
        
    }
    
}

acf_new_instance('acfe_field_color_picker');

endif;