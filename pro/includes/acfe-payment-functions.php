<?php

if(!defined('ABSPATH')){
    exit;
}

/**
 * acfe_get_payment_field_from_field
 *
 * @param $field
 *
 * @return array|false|mixed
 */
function acfe_get_payment_field_from_field($field){
    
    // check if payment field is set in field
    if(acf_maybe_get($field, 'payment_field')){
        
        // get field
        $payment_field = acf_get_field($field['payment_field']);
        
        // found field
        if($payment_field){
            return $payment_field;
        }
        
    }
    
    // payment field not found, try to find one in the current field group
    $field_group = acfe_get_field_group_from_field($field);
    
    if(!$field_group){
        return false;
    }
    
    // query field
    return acfe_query_field(array(
        'context' => $field_group,
        'query'   => array(
            'type' => 'acfe_payment'
        )
    ));
    
}