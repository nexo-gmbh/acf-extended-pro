<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_pro_compatibility')):

class acfe_pro_compatibility{
    
    /**
     * construct
     */
    function __construct(){
        
        // global
        add_action('acf/init',                                    array($this, 'init'), 98);
        add_filter('acfe/form_field_type_category',               array($this, 'form_field_type_category'));
    
        // fields compatibility
        add_filter('acf/validate_field/type=acfe_image_selector', array($this, 'field_image_selector'), 20);
        
        // field groups compatibility
        add_filter('acf/location/rule_values',                    array($this, 'location_rules_values'), 9, 2);
        
    }
    
    
    /**
     * init
     *
     * Renamed modules
     *
     * acf/init:98
     *
     * @since 0.8.8 (20/03/2021)
     */
    function init(){
    
        // settings list
        $settings = array(
            'acfe/modules/dynamic_templates' => 'acfe/modules/templates',
        );
    
        // loop settings
        foreach($settings as $old => $new){
        
            if(acf_get_setting($old) !== null){
                acf_update_setting($new, acf_get_setting($old));
            }
        
        }
        
    }
    
    
    /**
     * form_field_type_category
     *
     * acfe/form_field_type_category
     *
     * Change Forms field category to 'ACF'
     *
     * @param $category
     *
     * @since 0.8.8.1 (25/03/2021)
     *
     * @return string
     */
    function form_field_type_category($category){
        return 'ACF';
    }
    
    
    /**
     * field_image_selector
     *
     * acf/validate_field/type=acfe_image_selector:20
     *
     * Removed images and use choices only
     *
     * @since 0.8.8.4 (14/06/2021)
     */
    function field_image_selector($field){
    
        // compatibility: removed 'images' setting, use choices instead
        if(isset($field['images'])){
        
            // vars
            $choices = $field['choices'];
            $images = acf_maybe_get($field, 'images');
            $images = acf_get_array($images);
        
            // merge & combine images
            $choices = array_merge($images, $choices);
            $choices = array_combine($choices, $choices);
        
            // assign choices
            $field['choices'] = $choices;
        
        }
    
        // return
        return $field;
        
    }
    
    
    /**
     * location_rules_values
     *
     * Fixed kses on Field Group location rules values ajax
     * This fix an issue where custom input render were escaped starting ACF >6.2.7
     *
     * @param $choices
     * @param $rule
     *
     * @return mixed
     *
     * @since 0.9.0.2 (28/04/2024)
     */
    function location_rules_values($choices, $rule){
        
        if(acf_is_screen('acf-field-group') || acf_is_ajax('acf/field_group/render_location_rule')){
            add_filter('wp_kses_allowed_html', array($this, 'location_rules_values_kses'), 10, 2);
        }
        
        return $choices;
        
    }
    
    
    /**
     * location_rules_values_kses
     *
     * @param $allowedtags
     * @param $context
     *
     * @return array
     */
    function location_rules_values_kses($allowedtags, $context){
        
        if($context === 'acf'){
            
            $allowedtags['script'] = true;
            $allowedtags['input']['type'] = true;
            $allowedtags['input']['id'] = true;
            $allowedtags['input']['name'] = true;
            $allowedtags['input']['value'] = true;
        }
        
        return $allowedtags;
        
    }
    
}

new acfe_pro_compatibility();

endif;