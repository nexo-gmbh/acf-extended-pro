<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_pro_field_select')):

class acfe_pro_field_select extends acfe_field_extend{
    
    /**
     * initialize
     */
    function initialize(){
        
        $this->name = 'select';
        $this->defaults = array(
            'prepend' => '',
            'append'  => '',
        );
        
    }
    
    
    /**
     * render_field_settings
     *
     * @param $field
     */
    function render_field_settings($field){

        // prepend
        acf_render_field_setting($field, array(
            'label'             => __('Prepend','acf'),
            'instructions'      => __('Appears before the input','acf'),
            'type'              => 'text',
            'name'              => 'prepend',
            'placeholder'       => '',
        ));

        // append
        acf_render_field_setting($field, array(
            'label'             => __('Append','acf'),
            'instructions'      => __('Appears after the input','acf'),
            'type'              => 'text',
            'name'              => 'append',
            'placeholder'       => '',
        ));

    }
    
    
    /**
     * field_wrapper_attributes
     *
     * @param $wrapper
     * @param $field
     *
     * @return mixed
     */
    function field_wrapper_attributes($wrapper, $field){
        
        // Prepend
        if(acf_maybe_get($field, 'prepend')){
            $wrapper['data-acfe-prepend'] = $field['prepend'];
        }
        
        // Append
        if(acf_maybe_get($field, 'append')){
            $wrapper['data-acfe-append'] = $field['append'];
        }
        
        return $wrapper;
        
    }
    
    
    /**
     * translate_field
     *
     * @param $field
     *
     * @return mixed
     */
    function translate_field($field){
        
        $field['prepend'] = acf_translate($field['prepend']);
        $field['append'] = acf_translate($field['append']);
        
        return $field;
        
    }
    
}

acf_new_instance('acfe_pro_field_select');

endif;