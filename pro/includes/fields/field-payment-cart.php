<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_payment_cart')):

class acfe_payment_cart extends acf_field{
    
    public $payment_field = false;
    
    /**
     * initialize
     */
    function initialize(){
        
        $this->name = 'acfe_payment_cart';
        $this->label = __('Payment Cart', 'acfe');
        $this->category = 'E-Commerce';
        $this->defaults = array(
            'payment_field'         => '',
            'choices'               => array(),
            'default_value'         => '',
            'display_format'        => '{item} - {currency}{price}',
            'field_type'            => 'checkbox',
            'allow_null'            => 0,
            'multiple'              => 0,
            'ui'                    => 0,
            'placeholder'           => '',
            'search_placeholder'    => '',
            'layout'                => '',
            'toggle'                => 0,
        );
        
    }
    
    
    /**
     * render_field_settings
     *
     * @param $field
     */
    function render_field_settings($field){
    
        // Choices
        $field['choices'] = acf_encode_choices($field['choices']);
    
        // Default Value
        $field['default_value'] = acf_encode_choices($field['default_value'], false);
    
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
        
        // Items
        acf_render_field_setting($field, array(
            'label'         => __('items', 'acfe'),
            'instructions'  => __('Enter each choice on a new line with the item price. For example:','acf') . '<br /><br />' . __('Item 1 : 29<br/>Item 2 : 49','acf'),
            'name'          => 'choices',
            'type'          => 'textarea',
        ));
    
        // Default Value
        acf_render_field_setting($field, array(
            'label'         => __('Default Value','acf'),
            'instructions'  => __('Enter each default value on a new line','acf'),
            'name'          => 'default_value',
            'type'          => 'textarea',
        ));
    
        // display format
        acf_render_field_setting($field, array(
            'label'         => __('Display Format','acf'),
            'instructions'  => __('The format displayed when editing a post','acf'),
            'type'          => 'radio',
            'name'          => 'display_format',
            'other_choice'  => 1,
            'choices'       => array(
                '{item} - {currency}{price}'    => '<span>Item A - 29$</span><code>{item} - {currency}{price}</code>',
                '{currency}{price} - {item}'    => '<span>29$ - Item A</span><code>{currency}{price} - {item}</code>',
                'other'                         => '<span>' . __('Custom:', 'acf') . '</span>',
            )
        ));
    
        // Field Type
        acf_render_field_setting($field, array(
            'label'         => __('Field Type', 'acfe'),
            'instructions'  => __('Field Type', 'acfe'),
            'name'          => 'field_type',
            'type'          => 'select',
            'choices'       => array(
                'checkbox'  => __('Checkbox', 'acf'),
                'radio'     => __('Radio Button', 'acf'),
                'select'    => __('Select', 'acfe'),
            ),
        ));
    
        // Select + Radio: allow_null
        acf_render_field_setting($field, array(
            'label'         => __('Allow Null?','acf'),
            'instructions'  => '',
            'name'          => 'allow_null',
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
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'radio',
                    ),
                ),
            )
        ));
    
        // Select: multiple
        acf_render_field_setting($field, array(
            'label'         => __('Select multiple values?','acf'),
            'instructions'  => '',
            'name'          => 'multiple',
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
    
        // Select: Placeholder
        acf_render_field_setting($field, array(
            'label'             => __('Placeholder','acf'),
            'instructions'      => __('Appears within the input','acf'),
            'type'              => 'text',
            'name'              => 'placeholder',
            'placeholder'       => _x('Select', 'verb', 'acf'),
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'select',
                    ),
                    array(
                        'field'     => 'ui',
                        'operator'  => '==',
                        'value'     => '0',
                    ),
                    array(
                        'field'     => 'allow_null',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                    array(
                        'field'     => 'multiple',
                        'operator'  => '==',
                        'value'     => '0',
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
                    array(
                        'field'     => 'allow_null',
                        'operator'  => '==',
                        'value'     => '1',
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
                    array(
                        'field'     => 'multiple',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                ),
            )
        ));
    
        // Select: Search Placeholder
        acf_render_field_setting($field, array(
            'label'             => __('Search Input Placeholder','acf'),
            'instructions'      => __('Appears within the search input','acf'),
            'type'              => 'text',
            'name'              => 'search_placeholder',
            'placeholder'       => '',
            'conditional_logic' => array(
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
                    array(
                        'field'     => 'multiple',
                        'operator'  => '==',
                        'value'     => '0',
                    ),
                ),
            )
        ));
    
        // Checkbox: layout
        acf_render_field_setting($field, array(
            'label'         => __('Layout','acf'),
            'instructions'  => '',
            'type'          => 'radio',
            'name'          => 'layout',
            'layout'        => 'horizontal',
            'choices'       => array(
                'vertical'      => __("Vertical",'acf'),
                'horizontal'    => __("Horizontal",'acf')
            ),
            'conditions'    => array(
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'checkbox',
                    ),
                ),
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'radio',
                    ),
                ),
            )
        ));
    
        // Checkbox: toggle
        acf_render_field_setting($field, array(
            'label'         => __('Toggle','acf'),
            'instructions'  => __('Prepend an extra checkbox to toggle all choices','acf'),
            'name'          => 'toggle',
            'type'          => 'true_false',
            'ui'            => 1,
            'conditions'    => array(
                array(
                    array(
                        'field'     => 'field_type',
                        'operator'  => '==',
                        'value'     => 'checkbox',
                    ),
                ),
            )
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
        
        // choices
        $field['choices'] = acf_decode_choices($field['choices']);
        
        // default value
        $field['default_value'] = acf_decode_choices($field['default_value'], true);
        
        // single line
        if(!$field['multiple'] && $field['field_type'] !== 'checkbox'){
            $field['default_value'] = acfe_unarray($field['default_value']);
        }
        
        return $field;
        
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
        // hide cart
        if(!$this->payment_field){
            return false;
        }
    
        // get meta
        $meta = acf_get_meta(acfe_get_post_id());
    
        // loop meta
        foreach($meta as $meta_key => $meta_value){
    
            // hide cart if payment was already done and saved
            if($meta_value === $this->payment_field['key']){
                return false;
            }
        
        }
    
        // field type
        $type = $field['type'];
        $field_type = $field['field_type'];
    
        $field['type'] = $field_type;
        $field['wrapper']['data-ftype'] = $type;
        $field['other_choice'] = 0;
        $field['ajax'] = 0;
        $field['allow_custom'] = 0;
    
        // choices
        $field['choices'] = $this->get_choices($field);
    
        // labels
        $field = acfe_prepare_checkbox_labels($field);
        
        // return
        return $field;
        
    }
    
    
    /**
     * get_choices
     *
     * @param $field
     *
     * @return array
     */
    function get_choices($field){
    
        // JS items
        $js_items = array();
    
        // currency
        $currency = acf_maybe_get($this->payment_field, 'currency', 'USD');
        $symbol = acfe_get_currency($currency, 'symbol');
        
        // loop choices
        foreach(array_keys($field['choices']) as $item){
            
            // allow optgroup
            if(strpos($item, '##') === 0){
                continue;
            }
    
            // add to JS
            $js_items[] = array(
                'name' => $item,
                'price' => floatval($this->get_item_price($item, $field)),
            );
        
            // display format
            $label = $field['display_format'];
        
            // parse template tags
            $label = str_replace('{item}', $item, $label);
            $label = str_replace('{price}', $this->get_item_price($item, $field), $label);
            $label = str_replace('{currency}', $symbol, $label);
        
            // set choice
            $field['choices'][ $item ] = $label;
        
        }
    
        // localize JS data
        acfe_set_localize_data('carts', array(
            'field_name' => $field['_name'],
            'field_key'  => $field['key'],
            'symbol'     => $symbol,
            'currency'   => $currency,
            'items'      => $js_items,
        ));
        
        return $field['choices'];
        
    }
    
    
    /**
     * validate_value
     *
     * @param $valid
     * @param $value
     * @param $field
     * @param $input
     *
     * @return string|null
     */
    function validate_value($valid, $value, $field, $input){
        
        // empty value
        if(empty($value)){
            return $valid;
        }
        
        // force array
        $items = acf_get_array($value);
        $items = array_map('wp_unslash', $items);
        
        // loop items
        foreach($items as $item){
    
            // validate item
            if(!$this->validate_item($item, $field)){
                return __("This item doesn't exists. Please try again", 'acfe');
            }
        
        }
        
        return $valid;
        
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
        
        // set cart data
        $this->set_cart_data($value, $field);
        
        // return value for local meta
        if(acfe_is_local_post_id($post_id)){
            return $value;
        }
        
        // do not save meta
        return null;
        
    }
    
    
    /**
     * set_cart_data
     *
     * @param $value
     * @param $field
     */
    function set_cart_data($value, $field){
    
        // items
        $items = acf_get_array($value);
        $items = array_map('wp_unslash', $items);
    
        // get existing cart
        $cart = acf_get_form_data('acfe/payment_cart');
        $cart = acf_get_array($cart);
    
        // parse default cart
        $cart = wp_parse_args($cart, array(
            'fields' => array(),
            'items'  => array(),
            'amount' => 0,
        ));
    
        // avoid processing the same cart field twice
        if(in_array($field['key'], $cart['fields'])){
            return;
        }
    
        // add current field
        $cart['fields'][] = $field['key'];
    
        // loop items
        foreach($items as $item){
        
            // validate item
            if(!$this->validate_item($item, $field)){
                continue;
            }
        
            // vars
            $name = wp_strip_all_tags($item);
            $price = $this->get_item_price($item, $field);
        
            // generate item
            $cart['items'][] = array(
                'item'  => $name,
                'price' => $price
            );
        
            // add to amount
            $cart['amount'] += $price;
        
        }
    
        // set form data for payment process update
        acf_set_form_data('acfe/payment_cart', $cart);
        
    }
    
    
    /**
     * validate_item
     *
     * @param $item
     * @param $field
     *
     * @return bool
     */
    function validate_item($item, $field){
        
        $choices = array_keys($field['choices']);
        
        return in_array($item, $choices);
        
    }
    
    
    /**
     * get_item_price
     *
     * @param $item
     * @param $field
     *
     * @return int
     */
    function get_item_price($item, $field){
        
        $price = 0;
        
        foreach(array_keys($field['choices']) as $key){
            
            if($key === $item){
                $price = $field['choices'][ $key ];
            }
        
        }
        
        return $price;
        
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
        $field['search_placeholder'] = acf_translate($field['search_placeholder']);
        
        return $field;
        
    }
    
}

// initialize
acf_register_field_type('acfe_payment_cart');

endif;