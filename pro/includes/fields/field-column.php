<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_pro_field_column')):

class acfe_pro_field_column extends acfe_field_extend{
    
    /**
     * initialize
     */
    function initialize(){
    
        $this->name = 'acfe_column';
    
        $this->defaults = array(
            'border'          => '',
            'border_endpoint' => array('endpoint'),
        );
    
        add_filter('acf/prepare_field/name=columns', array($this, 'prepare_columns'), 5);
        
    }
    
    
    /**
     * prepare_columns
     *
     * @param $field
     *
     * @return mixed
     */
    function prepare_columns($field){
        
        $wrapper = acf_maybe_get($field, 'wrapper');
        
        if(!$wrapper){
            return $field;
        }
        
        if(acf_maybe_get($wrapper, 'data-setting') !== 'acfe_column'){
            return $field;
        }
        
        $field['choices'] = array_merge(array(
            'auto' => 'Auto',
            'fill' => 'Fill',
        ), $field['choices']);
        
        return $field;
        
    }
    
    
    /**
     * render_field_settings
     *
     * @param $field
     */
    function render_field_settings($field){
    
        // border
        acf_render_field_setting($field, array(
            'label'         => __('Border', 'acf'),
            'instructions'  => '',
            'type'          => 'checkbox',
            'name'          => 'border',
            'layout'        => 'horizontal',
            'choices'       => array(
                'column'        => __('Column Border', 'acfe'),
                'fields'        => __('Fields Border', 'acfe'),
            ),
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'endpoint',
                        'operator'  => '!=',
                        'value'     => '1',
                    )
                )
            )
        ));
    
        // border
        acf_render_field_setting($field, array(
            'label'         => __('Border', 'acf'),
            'instructions'  => '',
            'type'          => 'checkbox',
            'name'          => 'border_endpoint',
            'layout'        => 'horizontal',
            'choices'       => array(
                'endpoint' => __('Endpoint Border', 'acfe'),
            ),
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'endpoint',
                        'operator'  => '==',
                        'value'     => '1',
                    )
                )
            )
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
    
        if(is_array($field['border']) && in_array('column', $field['border'])){
            $wrapper['data-column-border'] = true;
        }
        
        if($field['endpoint'] && is_array($field['border_endpoint']) && in_array('endpoint', $field['border_endpoint'])){
            $wrapper['data-column-border'] = true;
        }
    
        if(is_array($field['border']) && in_array('fields', $field['border'])){
            $wrapper['data-fields-border'] = true;
        }
        
        return $wrapper;
        
    }
    
}

acf_new_instance('acfe_pro_field_column');

endif;