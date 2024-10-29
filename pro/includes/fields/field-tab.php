<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_field_tab')):

class acfe_field_tab extends acfe_field_extend{
    
    /**
     * initialize
     */
    function initialize(){
        
        $this->name = 'tab';
        $this->defaults = array(
            'no_preference' => 0
        );
        
    }
    
    
    /**
     * render_field_settings
     *
     * @param $field
     */
    function render_field_settings($field){
    
        acf_render_field_setting($field, array(
            'label'         => __('No Preference','acf'),
            'instructions'  => 'Do not save opened tab user preference',
            'name'          => 'no_preference',
            'type'          => 'true_false',
            'ui'            => 1
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
        
        if($field['no_preference']){
            $wrapper['data-no-preference'] = 1;
        }
        
        return $wrapper;
        
    }
    
}

acf_new_instance('acfe_field_tab');

endif;