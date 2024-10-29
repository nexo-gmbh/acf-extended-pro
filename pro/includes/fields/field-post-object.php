<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_pro_field_post_object')):

class acfe_pro_field_post_object extends acfe_field_extend{
    
    /**
     * initialize
     */
    function initialize(){
        
        $this->name = 'post_object';
        $this->defaults = array(
            'acfe_add_post'  => 0,
            'acfe_edit_post' => 0,
        );
        
    }
    
    
    /**
     * render_field_settings
     *
     * @param $field
     */
    function render_field_settings($field){
        acf_get_instance('acfe_pro_field_relationship')->render_field_settings($field);
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
        return acf_get_instance('acfe_pro_field_relationship')->field_wrapper_attributes($wrapper, $field);
    }
    
    
    /**
     * render_field
     *
     * @param $field
     */
    function render_field($field){
        acf_get_instance('acfe_pro_field_relationship')->render_field($field);
    }
    
}

acf_new_instance('acfe_pro_field_post_object');

endif;