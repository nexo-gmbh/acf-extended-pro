<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_field_time_picker')):

class acfe_field_time_picker extends acfe_field_extend{
    
    /**
     * initialize
     */
    function initialize(){
        
        $this->name = 'time_picker';
        $this->defaults = array(
            'placeholder' => '',
            'min_time'    => '',
            'max_time'    => '',
            'min_hour'    => '',
            'max_hour'    => '',
            'min_min'     => '',
            'max_min'     => '',
            'min_sec'     => '',
            'max_sec'     => '',
        );
        
    }
    
    
    /**
     * render_field_settings
     *
     * @param $field
     */
    function render_field_settings($field){
        
        acf_render_field_setting($field, array(
            'label'         => __('Placeholder', 'acf'),
            'name'          => 'placeholder',
            'key'           => 'placeholder',
            'instructions'  => '',
            'type'          => 'text',
            'default_value' => '',
        ));
        
        // Min Time
        acf_render_field_setting($field, array(
            'label'         => __('Time Restriction'),
            'name'          => 'min_time',
            'key'           => 'min_time',
            'instructions'  => 'String of the minimum time allowed. <code>11:00</code> will restrict to times after 11am. <a href="https://trentrichardson.com/examples/timepicker/" target="_blank">See documentation</a>',
            'type'          => 'text',
            'default_value' => '',
            'prepend'       => 'Min Time',
            'placeholder'   => '09:00',
            '_appended'     => true
        ));
        
        // Max Time
        acf_render_field_setting($field, array(
            'label'         => '',
            'name'          => 'max_time',
            'key'           => 'max_time',
            'instructions'  => '',
            'type'          => 'text',
            'default_value' => '',
            'prepend'       => 'Max Time',
            'placeholder'   => '18:00',
            '_append'       => 'min_time'
        ));
        
        // Hour
        acf_render_field_setting($field, array(
            'label'         => __('Hour Restriction'),
            'name'          => 'min_hour',
            'key'           => 'min_hour',
            'instructions'  => '',
            'type'          => 'number',
            'min'           => 0,
            'default_value' => '',
            'prepend'       => 'Min Hour',
            'placeholder'   => ''
        ));
        
        acf_render_field_setting($field, array(
            'label'         => '',
            'name'          => 'max_hour',
            'key'           => 'max_hour',
            'instructions'  => '',
            'type'          => 'number',
            'min'           => 0,
            'default_value' => '',
            'prepend'       => 'Max Hour',
            'placeholder'   => '',
            '_append'       => 'min_hour'
        ));
        
        // Min
        acf_render_field_setting($field, array(
            'label'         => __('Minutes Restriction'),
            'name'          => 'min_min',
            'key'           => 'min_min',
            'instructions'  => '',
            'type'          => 'number',
            'min'           => 0,
            'default_value' => '',
            'prepend'       => 'Min Min.',
            'placeholder'   => '',
            '_append'       => 'min_hour'
        ));
        
        acf_render_field_setting($field, array(
            'label'         => '',
            'name'          => 'max_min',
            'key'           => 'max_min',
            'instructions'  => '',
            'type'          => 'number',
            'min'           => 0,
            'default_value' => '',
            'prepend'       => 'Max Min.',
            'placeholder'   => '',
            '_append'       => 'min_hour'
        ));
        
        // Sec
        acf_render_field_setting($field, array(
            'label'         => __('Seconds Restriction'),
            'name'          => 'min_sec',
            'key'           => 'min_sec',
            'instructions'  => '',
            'type'          => 'number',
            'min'           => 0,
            'default_value' => '',
            'prepend'       => 'Min Sec.',
            'placeholder'   => '',
            '_append'       => 'min_hour'
        ));
        
        acf_render_field_setting($field, array(
            'label'         => '',
            'name'          => 'max_sec',
            'key'           => 'max_sec',
            'instructions'  => '',
            'type'          => 'number',
            'min'           => 0,
            'default_value' => '',
            'prepend'       => 'Max Sec.',
            'placeholder'   => '',
            '_append'       => 'min_hour'
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
        
        // Placeholder
        if($field['placeholder']){
            $wrapper['data-placeholder'] = $field['placeholder'];
        }
        
        // Hour
        if($field['min_hour']){
            $wrapper['data-min_hour'] = $field['min_hour'];
        }
        
        if($field['max_hour']){
            $wrapper['data-max_hour'] = $field['max_hour'];
        }
        
        // Min
        if($field['min_min']){
            $wrapper['data-min_min'] = $field['min_min'];
        }
        
        if($field['max_min']){
            $wrapper['data-max_min'] = $field['max_min'];
        }
        
        // Sec
        if($field['min_sec']){
            $wrapper['data-min_sec'] = $field['min_sec'];
        }
        
        if($field['max_sec']){
            $wrapper['data-max_sec'] = $field['max_sec'];
        }
        
        // Min Time
        if($field['min_time']){
            $wrapper['data-min_time'] = $field['min_time'];
        }
        
        // Max Time
        if($field['max_time']){
            $wrapper['data-max_time'] = $field['max_time'];
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
        
        $field['placeholder'] = acf_translate($field['placeholder']);
        
        return $field;
        
    }
    
}

acf_new_instance('acfe_field_time_picker');

endif;