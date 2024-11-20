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
                
                $field['choices']['color_label'] = __('Color Array', 'acfe');
                $field['choices']['slug']        = __('Slug', 'acfe');
                $field['choices']['label']       = __('Label', 'acf');
                
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
            'type'          => 'select',
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
                    'value' => __('Value','acf'),
                    'array' => __('Color Array','acf'),
                    'slug'  => __('Slug', 'acfe'),
                    'label' => __('Label','acf'),
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
    
        // get all colors
        $field['colors'] = $this->get_color_objects($field);
    
        // attributes
        $atts = array(
            'class'             => "acf-color-picker {$field['class']}",
            'data-display'      => $field['display'],
            'data-button_label' => $field['button_label'],
            'data-allow_null'   => $field['allow_null'],
            'data-color_picker' => $field['color_picker'],
            'data-absolute'     => $field['absolute'],
            'data-input'        => $field['input'],
            'data-colors'       => $this->get_picker_colors($field), // picker compatible colors (hex + rgba)
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
                
                <?php $this->render_field_default($field, $text_input); ?>
            
            <?php else: ?>

                <?php $this->render_field_palette($field, $text_input); ?>
            
            <?php endif; ?>
            
        </div>
        <?php
        
    }
    
    
    /**
     * render_field_default
     *
     * @param $field
     * @param $text_input
     *
     * @return void
     */
    function render_field_default($field, $text_input){
        acf_text_input($text_input);
    }
    
    
    /**
     * render_field_palette
     *
     * @param $field
     * @param $text_input
     *
     * @return void
     */
    function render_field_palette($field, $text_input){
        ?>
        <div class="acf-color-picker-palette">
            
            <?php foreach($field['colors'] as $color => $row): ?>
                
                <?php
                $selected = $color === $field['value'] ? 'selected' : false;
                $border = $this->get_border_from_color($color);
                
                $a = array(
                    'href'       => '#',
                    'class'      => "color",
                    'data-color' => $color,
                );
                
                if($selected){
                    $a['class'] .= ' selected';
                    $text_input['value'] = ''; // palette selected, remove color picker value
                }
                
                if($this->is_css_variable($color)){
                    $color = 'var(' . $color . ')';
                }
                
                ?>

                <a <?php echo acf_esc_atts($a); ?>>
                    <?php if($row['label']): ?>
                        <span class="color-label acf-js-tooltip" title="<?php echo $row['label']; ?>"></span>
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
        
        // return
        return $this->normalize_hex($value);
        
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
        $objects = $this->get_color_objects($field);
    
        // get color object
        $object = $this->get_object_with_value($value, $objects);
        
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
        
            // array
            }elseif($field['return_format'] === 'slug'){
                $value = $object['slug'];
        
            }
            
        // new acf
        }else{
            
            // label
            if($field['return_format'] === 'label'){
                $value = $object['label'];
                
            // color array
            }elseif($field['return_format'] === 'color_label'){
                $value = $object;
                
            // slug
            }elseif($field['return_format'] === 'slug'){
                $value = $object['slug'];
                
            }
            
        }
        
        // return
        return $value;
        
    }
    
    
    /**
     * get_color_objects
     *
     * @param $field
     *
     * @return array
     */
    function get_color_objects($field){
        
        // vars
        $colors = array();
        
        // theme colors settings
        if($field['theme_colors']){
            
            // theme support: color palette
            // https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-support/#block-color-palettes
            $editor_color_palette = current(acf_get_array(get_theme_support('editor-color-palette')));
            
            if(!empty($editor_color_palette)){
                
                foreach($editor_color_palette as $row){
                    $colors[ $row['color'] ] = array(
                        'color' => $row['color'],
                        'slug'  => acf_maybe_get($row, 'slug', sanitize_title($row['name'])),
                        'label' => $row['name'],
                    );
                }
                
            }
            
            // theme support: gradients
            // https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-support/#block-gradient-presets
            $editor_gradient_presets = current(acf_get_array(get_theme_support('editor-gradient-presets')));
            
            if(!empty($editor_gradient_presets)){
                
                foreach($editor_gradient_presets as $row){
                    $colors[ $row['gradient'] ] = array(
                        'color' => $row['gradient'],
                        'slug'  => acf_maybe_get($row, 'slug', sanitize_title($row['name'])),
                        'label' => $row['name'],
                    );
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
                    foreach($theme_settings['color']['palette']['theme'] as $row){
    
                        // check color not already set in theme support
                        if(!isset($colors[ $row['color'] ])){
                            
                            $colors[ $row['color'] ] = array(
                                'color' => $row['color'],
                                'slug'  => acf_maybe_get($row, 'slug', sanitize_title($row['name'])),
                                'label' => $row['name'],
                            );
                            
                        }
            
                    }
        
                }
    
                // check gradients
                if(isset($theme_settings['color']['gradients']['theme'])){
        
                    // loop
                    foreach($theme_settings['color']['gradients']['theme'] as $row){
            
                        // check color not already set in theme support
                        if(!isset($colors[ $row['gradient'] ])){
                            
                            $colors[ $row['gradient'] ] = array(
                                'color' => $row['gradient'],
                                'slug'  => acf_maybe_get($row, 'slug', sanitize_title($row['name'])),
                                'label' => $row['name'],
                            );
                            
                        }
            
                    }
        
                }
                
            }
            
        }
        
        // field settings colors
        foreach($field['colors'] as $color => $name){
            
            // check color not already set in theme
            if(!isset($colors[ $color ])){
                
                $colors[ $color ] = array(
                    'color' => $color,
                    'slug'  => sanitize_title($name),
                    'label' => $name,
                );
                
            }
            
        }
        
        // final objects
        $objects = array();
        
        // normalize hex colors
        foreach($colors as $color => $row){
            
            // normalize hex color
            $color = $this->normalize_hex($color);
            
            $objects[ $color ] = array(
                'color' => $color,
                'slug'  => $row['slug'],
                'label' => $row['label'],
                'rgba'  => $this->string_to_rgba_array($color),
            );
            
        }
        
        // filters
        $objects = apply_filters("acfe/fields/color_picker/colors",                        $objects, $field);
        $objects = apply_filters("acfe/fields/color_picker/colors/{$field['key']}",        $objects, $field);
        $objects = apply_filters("acfe/fields/color_picker/colors/name={$field['_name']}", $objects, $field);
        
        // return
        return $objects;
        
    }
    
    
    /**
     * get_object_with_value
     *
     * @param $value
     * @param $objects
     *
     * @return array
     */
    function get_object_with_value($value, $objects){
        
        // get object from value
        if(is_string($value) && isset($objects[ $value ])){
            return $objects[ $value ];
        }
        
        // custom color (not registered)
        return array(
            'color' => $value,
            'slug'  => $value,
            'label' => $value,
            'rgba'  => $this->string_to_rgba_array($value),
        );
        
    }
    
    
    /**
     * get_picker_colors
     *
     * @param $field
     *
     * @return array
     */
    function get_picker_colors($field){
        
        // picker colors
        $picker_colors = array();
        
        // only allow compatible colors: hex or rgba
        // color picker doesn't support gradients or css variables
        foreach($field['colors'] as $color => $row){
            if($this->is_hex($color) || $this->is_rgba($color)){
                $picker_colors[] = $color;
            }
        }
        
        return $picker_colors;
        
    }
    
    
    /**
     * normalize_hex
     *
     * @param $value
     *
     * @return mixed|string
     */
    function normalize_hex($value){
        
        if($this->is_hex($value)){
            
            // convert shorthand hex to full (#000 => #000000)
            if(strlen($value) === 4){
                $value = "#{$value[1]}{$value[1]}{$value[2]}{$value[2]}{$value[3]}{$value[3]}";
            }
            
            // force lowercase
            $value = strtolower($value);
            
        }
        
        return $value;
        
    }
    
    
    /**
     * get_border_from_color
     *
     * color might be a gradient, in this case we must retrieve the first color
     *
     * @param $color
     *
     * @return string
     */
    function get_border_from_color($value){
        
        // default
        $border = $value;
        
        // case: gradient
        if($this->is_gradient($value)){
            
            preg_match('/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)|#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?/', $value, $matches);
            
            // set border as first gradient color
            if(isset($matches[0])){
                $border = $matches[0];
            }
            
        // case: css variable
        }elseif($this->is_css_variable($value)){
            $border = "#cccccc";
            
        }
        
        // return
        return $border;
        
    }
    
    
    /**
     * string_to_rgba_array
     *
     * copied from acf:color_picker field source code
     *
     * @param $value
     *
     * @return array
     */
    function string_to_rgba_array($value){
        
        $value = is_string( $value ) ? trim( $value ) : '';
        
        // Match and collect r,g,b values from 6 digit hex code. If there are 4
        // match-results, we have the values we need to build an r,g,b,a array.
        preg_match( '/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i', $value, $matches );
        if ( count( $matches ) === 4 ) {
            return array(
                'red'   => hexdec( $matches[1] ),
                'green' => hexdec( $matches[2] ),
                'blue'  => hexdec( $matches[3] ),
                'alpha' => (float) 1,
            );
        }
        
        // Match and collect r,g,b values from 3 digit hex code. If there are 4
        // match-results, we have the values we need to build an r,g,b,a array.
        // We have to duplicate the matched hex digit for 3 digit hex codes.
        preg_match( '/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i', $value, $matches );
        if ( count( $matches ) === 4 ) {
            return array(
                'red'   => hexdec( $matches[1] . $matches[1] ),
                'green' => hexdec( $matches[2] . $matches[2] ),
                'blue'  => hexdec( $matches[3] . $matches[3] ),
                'alpha' => (float) 1,
            );
        }
        
        // Attempt to match an rgba(…) or rgb(…) string (case-insensitive), capturing the decimals
        // as a string. If there are two match results, we have the RGBA decimal values as a
        // comma-separated string. Break it apart and, depending on the number of values, return
        // our formatted r,g,b,a array.
        preg_match( '/^rgba?\(([0-9,.]+)\)/i', $value, $matches );
        if ( count( $matches ) === 2 ) {
            $decimals = explode( ',', $matches[1] );
            
            // Handle rgba() format.
            if ( count( $decimals ) === 4 ) {
                return array(
                    'red'   => (int) $decimals[0],
                    'green' => (int) $decimals[1],
                    'blue'  => (int) $decimals[2],
                    'alpha' => (float) $decimals[3],
                );
            }
            
            // Handle rgb() format.
            if ( count( $decimals ) === 3 ) {
                return array(
                    'red'   => (int) $decimals[0],
                    'green' => (int) $decimals[1],
                    'blue'  => (int) $decimals[2],
                    'alpha' => (float) 1,
                );
            }
        }
        
        return array(
            'red'   => 0,
            'green' => 0,
            'blue'  => 0,
            'alpha' => (float) 0,
        );
        
    }
    
    
    /**
     * is_hex
     *
     * @param $value
     *
     * @return bool
     */
    function is_hex($value){
        return is_string($value) && !empty($value) && acfe_starts_with($value, '#');
    }
    
    
    /**
     * is_rgba
     *
     * @param $value
     *
     * @return bool
     */
    function is_rgba($value){
        return is_string($value) && !empty($value) && acfe_starts_with($value, 'rgba');
    }
    
    
    /**
     * is_gradient
     *
     * @param $value
     *
     * @return bool
     */
    function is_gradient($value){
        return is_string($value) && !empty($value) && (acfe_starts_with($value, 'linear-gradient') || acfe_starts_with($value, 'radial-gradient'));
    }
    
    
    /**
     * is_css_variable
     *
     * @param $value
     *
     * @return bool
     */
    function is_css_variable($value){
        return is_string($value) && !empty($value) && acfe_starts_with($value, '--');
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