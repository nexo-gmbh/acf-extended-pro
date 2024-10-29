<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_pro_field_true_false')):

class acfe_pro_field_true_false extends acfe_field_extend{
    
    /**
     * initialize
     */
    function initialize(){
        
        $this->name = 'true_false';
        $this->defaults = array(
            'style' => '',
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
            'label'        => __('Style','acf'),
            'instructions' => '',
            'type'         => 'select',
            'name'         => 'style',
            'choices'      => array(
                ''              => __('Default', 'acf'),
                'rounded'       => __('Default Rounded', 'acf'),
                'small'         => __('Small', 'acf'),
                'small_rounded' => __('Small Rounded', 'acf'),
                'alt'           => __('Alternative', 'acf'),
                'alt_rounded'   => __('Alternative Rounded', 'acf'),
            ),
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'ui',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                )
            ),
            'wrapper' => array(
                'data-after' => 'ui'
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
        
        // style
        if($field['style']){
            $wrapper['data-acfe-style'] = $field['style'];
        }
        
        return $wrapper;
        
    }
    
}

acf_new_instance('acfe_pro_field_true_false');

endif;