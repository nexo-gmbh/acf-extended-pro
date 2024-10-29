<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_field_date_picker')):

class acfe_field_date_picker extends acfe_field_extend{
    
    /**
     * initialize
     */
    function initialize(){
        
        $this->name = 'date_picker';
        $this->defaults = array(
            'placeholder' => '',
            'min_date'    => '',
            'max_date'    => '',
            'no_weekends' => 0,
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
    
        acf_render_field_setting($field, array(
            'label'         => __('Date Restriction'),
            'name'          => 'min_date',
            'key'           => 'min_date',
            'instructions'  => 'Enter a date based on the "Display Format" setting. Relative dates must contain value and period pairs; valid periods are <code>y</code> for years, <code>m</code> for months, <code>w</code> for weeks, and <code>d</code> for days.
            <br /><br />
            For example, <code>+1m +7d</code> represents one month and seven days from today. <a href="https://api.jqueryui.com/datepicker/#option-minDate" target="_blank">See documentation</a>',
            'type'          => 'text',
            'default_value' => '',
            'prepend'       => 'Min Date',
            'placeholder'   => 'd/m/Y',
            '_appended'     => true
        ));
    
        acf_render_field_setting($field, array(
            'label'         => '',
            'name'          => 'max_date',
            'key'           => 'max_date',
            'instructions'  => '',
            'type'          => 'text',
            'default_value' => '',
            'prepend'       => 'Max Date',
            'placeholder'   => 'd/m/Y',
            '_append'       => 'min_date'
        ));
    
        acf_render_field_setting($field, array(
            'label'         => __('No Weekends', 'acf'),
            'name'          => 'no_weekends',
            'key'           => 'no_weekends',
            'instructions'  => '',
            'type'          => 'true_false',
            'ui'            => true,
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
        
        // Min Date
        if($field['min_date']){
            $wrapper['data-min_date'] = $field['min_date'];
        }
        
        // Max Date
        if($field['max_date']){
            $wrapper['data-max_date'] = $field['max_date'];
        }
        
        // Placeholder
        if($field['placeholder']){
            $wrapper['data-placeholder'] = $field['placeholder'];
        }
        
        // No Weekends
        if($field['no_weekends']){
            $wrapper['data-no_weekends'] = true;
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

acf_new_instance('acfe_field_date_picker');

endif;