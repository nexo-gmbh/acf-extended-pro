<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_payment_selector')):

class acfe_payment_selector extends acf_field{
    
    public $payment_field = false;
    
    /**
     * initialize
     */
    function initialize(){
        
        $this->name = 'acfe_payment_selector';
        $this->label = __('Payment Selector', 'acfe');
        $this->category = 'E-Commerce';
        $this->defaults = array(
            'payment_field'         => '',
            'credit_card_label'     => __('Credit Card', 'acfe'),
            'paypal_label'          => 'PayPal',
            'field_type'            => 'radio',
            'layout'                => 'horizontal',
            'ui'                    => 0,
            'icons'                 => 0,
        );
        
    }
    
    
    /**
     * render_field_settings
     *
     * @param $field
     */
    function render_field_settings($field){
    
        // enable local
        acf_enable_filter('local');
    
        $payment_field = acf_get_field($field['payment_field']);
    
        acf_disable_filter('local');
    
        $choices = array();
    
        // add choices
        if($payment_field){
            $choices[ $field['payment_field'] ] = acfe_get_pretty_field_label($payment_field, true);
        }
    
        // Payment Field
        acf_render_field_setting($field, array(
            'label'         => __('Payment Field', 'acfe'),
            'instructions'  => '',
            'name'          => 'payment_field',
            'type'          => 'select',
            'ui'            => 1,
            'ajax'          => 1,
            'allow_null'    => 1,
            'ajax_action'   => 'acfe/get_payment_field',
            'placeholder'   => __('Select the payment field', 'acfe'),
            'choices'       => $choices
        ));
    
        // Credit Card Label
        acf_render_field_setting($field, array(
            'label'         => __('Payments Labels', 'acfe'),
            'instructions'  => '',
            'name'          => 'credit_card_label',
            'prepend'       => __('Credit Card', 'acfe'),
            'type'          => 'text',
        ));
        
        // PayPal Label
        acf_render_field_setting($field, array(
            'label'         => __('PayPal Label', 'acfe'),
            'instructions'  => '',
            'name'          => 'paypal_label',
            'type'          => 'text',
            'prepend'       => 'PayPal',
            '_append'       => 'credit_card_label'
        ));
        
        // Selector Type
        acf_render_field_setting($field, array(
            'label'         => __('Field Type', 'acfe'),
            'instructions'  => __('Field Type', 'acfe'),
            'name'          => 'field_type',
            'type'          => 'select',
            'choices'       => array(
                'radio'     => __('Radio Button', 'acf'),
                'select'    => __('Select', 'acfe'),
            ),
        ));
    
        // Radio: Layout
        acf_render_field_setting($field, array(
            'label'         => __('Layout', 'acfe'),
            'instructions'  => '',
            'name'          => 'layout',
            'type'          => 'radio',
            'layout'		=> 'horizontal',
            'choices'		=> array(
                'vertical'		=> __('Vertical', 'acf'),
                'horizontal'	=> __('Horizontal', 'acf')
            ),
            'conditions'    => array(
                array(
                    'field'     => 'field_type',
                    'operator'  => '==',
                    'value'     => 'radio'
                ),
            ),
        ));
    
        // Select: ui
        acf_render_field_setting($field, array(
            'label'         => __('Stylised UI','acf'),
            'instructions'  => '',
            'name'          => 'ui',
            'type'          => 'true_false',
            'ui'            => 1,
            'conditions'    => array(
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'select',
                    ),
                ),
            )
        ));
    
        // Icons
        acf_render_field_setting($field, array(
            'label'         => __('Icons','acf'),
            'instructions'  => '',
            'name'          => 'icons',
            'type'          => 'true_false',
            'ui'            => 1,
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'radio'
                    ),
                ),
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'select',
                    ),
                    array(
                        'field'     => 'ui',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                ),
            )
        ));
        
    }
    
    
    /**
     * prepare_field
     *
     * @param $field
     *
     * @return false
     */
    function prepare_field($field){
        
        // payment field
        $this->payment_field = acfe_get_payment_field_from_field($field);
    
        // no payment field found
        if(!$this->payment_field){
            return false;
        }
    
        // get meta
        $meta = acf_get_meta(acfe_get_post_id());
    
        // loop meta
        foreach($meta as $meta_key => $meta_value){
        
            // hide field if payment value is set on current post
            if($meta_value === $this->payment_field['key']){
                return false;
            }
        
        
        }
        
        // hide field if only one gateway
        if(count($this->payment_field['gateways']) === 1){
            return false;
        }
    
        // field wrapper
        $field['wrapper']['data-type'] = "acfe_payment_selector_{$field['field_type']}";
        $field['wrapper']['data-payment-field'] = $this->payment_field['key'];
    
        // icons
        if($field['icons']){
            $field['wrapper']['data-icons'] = 1;
        }
        
        // return
        return $field;
        
    }
    
    
    /**
     * render_field
     *
     * @param $field
     */
    function render_field($field){
    
        // settings
        $field['type'] = $field['field_type'];
        $field['other_choice'] = 0;
        $field['ajax'] = 0;
        $field['multiple'] = 0;
        $field['allow_null'] = 0;
    
        // default choices
        $choices = array(
            'stripe' => $field['credit_card_label'],
            'paypal' => $field['paypal_label'],
        );
    
        // clone
        $_choices = array();
    
        // assign payment field gateways order
        foreach($this->payment_field['gateways'] as $gateway){
            $_choices[ $gateway ] = $choices[ $gateway ];
        }
    
        $choices = $_choices;
    
        // assign choices
        $field['choices'] = $choices;
    
        // add icons to select
        if($field['icons'] && $field['type'] === 'select' && $field['ui']){
    
            // stripe
            if(isset($field['choices']['stripe'])){
                $field['choices']['stripe'] .= '<span class="acfe-payments-icons -stripe"></span>';
            }
    
            // paypal
            if(isset($field['choices']['paypal'])){
                $field['choices']['paypal'] .= '<span class="acfe-payments-icons -paypal"></span>';
            }
        
        }
        
        acf_get_field_type($field['type'])->render_field($field);
        
    }
    
    
    /**
     * update_value
     *
     * @param $value
     * @param $post_id
     * @param $field
     *
     * @return null
     */
    function update_value($value, $post_id, $field){
        
        // return value for local meta
        if(acfe_is_local_post_id($post_id)){
            return $value;
        }
    
        // do not save meta
        return null;
        
    }
    
    
    /**
     * translate_field
     *
     * @param $field
     *
     * @return mixed
     */
    function translate_field($field){
        
        $field['credit_card_label'] = acf_translate($field['credit_card_label']);
        $field['paypal_label'] = acf_translate($field['paypal_label']);
        
        return $field;
        
    }
    
}

// initialize
acf_register_field_type('acfe_payment_selector');

endif;