<?php

if(!defined('ABSPATH')){
    exit;
}

/**
 * acfe_get_countries
 *
 * @param $args
 *
 * @return mixed
 */
function acfe_get_countries($args = array()){
    
    // default args
    $args = wp_parse_args($args, array(
        'type'          => 'countries',
        'code__in'      => false,
        'name__in'      => false,
        'continent__in' => false,
        'language__in'  => false,
        'currency__in'  => false,

        'orderby'       => false,
        'order'         => 'ASC',
        'offset'        => 0,
        'limit'         => -1,

        'field'         => false,
        'display'       => false,
        'prepend'       => false,
        'append'        => false,
        'groupby'       => false,
    ));
    
    // query
    $query = new ACFE_World_Query($args);
    
    // results
    return $query->data;
    
}


/**
 * acfe_get_country
 *
 * @param $code
 * @param $field
 *
 * @return false|mixed|null
 */
function acfe_get_country($code, $field = ''){
    
    $data = acfe_get_countries(array(
        'code__in'  => $code,
        'limit'     => 1
    ));
    
    $data = reset($data);
    
    if($field){
        return acf_maybe_get($data, $field);
    }
    
    return $data;
    
}

/**
 * acfe_get_languages
 *
 * @param $args
 *
 * @return mixed
 */
function acfe_get_languages($args = array()){
    
    // default args
    $args = wp_parse_args($args, array(
        'type'              => 'languages',
        'name__in'          => false,
        'locale__in'        => false,
        'alt__in'           => false,
        'code__in'          => false,
        'continent__in'     => false,
        'country__in'       => false,
        'currency__in'      => false,
        
        'orderby'           => false,
        'order'             => 'ASC',
        'offset'            => 0,
        'limit'             => -1,

        'field'             => false,
        'display'           => false,
        'prepend'           => false,
        'append'            => false,
        'groupby'           => false,
    ));
    
    // query
    $query = new ACFE_World_Query($args);
    
    // results
    return $query->data;
    
}


/**
 * acfe_get_language
 *
 * @param $locale
 * @param $field
 *
 * @return false|mixed|null
 */
function acfe_get_language($locale, $field = ''){
    
    $data = acfe_get_languages(array(
        'locale__in'  => $locale,
        'limit'       => 1
    ));
    
    $data = reset($data);
    
    if($field){
        return acf_maybe_get($data, $field);
    }
    
    return $data;
    
}


/**
 * acfe_get_currencies
 *
 * @param $args
 *
 * @return mixed
 */
function acfe_get_currencies($args = array()){
    
    // default args
    $args = wp_parse_args($args, array(
        'type'          => 'currencies',
        'name__in'      => false,
        'code__in'      => false,
        'continent__in' => false,
        'country__in'   => false,
        'language__in'  => false,
        
        'countries'     => false,
        'languages'     => false,
        
        'orderby'       => false,
        'order'         => 'ASC',
        'offset'        => 0,
        'limit'         => -1,

        'field'         => false,
        'display'       => false,
        'prepend'       => false,
        'append'        => false,
        'groupby'       => false,
    ));
    
    // query
    $query = new ACFE_World_Query($args);
    
    // results
    return $query->data;
    
}


/**
 * acfe_get_currency
 *
 * @param $code
 * @param $field
 *
 * @return false|mixed|null
 */
function acfe_get_currency($code, $field = ''){
    
    $data = acfe_get_currencies(array(
        'code__in'  => $code,
        'limit'     => 1
    ));
    
    $data = reset($data);
    
    if($field){
        return acf_maybe_get($data, $field);
    }
    
    return $data;
    
}