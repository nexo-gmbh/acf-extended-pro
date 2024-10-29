<?php

if(!defined('ABSPATH')){
    exit;
}

/**
 * register stores
 */
acf_register_store('acfe-scripts');
acf_register_store('acfe-launcher-scripts');


/**
 * acfe_get_scripts
 *
 * @return array|mixed|null
 */
function acfe_get_scripts(){
    return acf_get_store('acfe-scripts')->get();
}


/**
 * acfe_get_script
 *
 * @param $name
 *
 * @return array|mixed|null
 */
function acfe_get_script($name = ''){
    return acf_get_store('acfe-scripts')->get($name);
}


/**
 * acfe_remove_script
 *
 * @param $name
 *
 * @return ACF_Data|false
 */
function acfe_remove_script($name = ''){
    return acf_get_store('acfe-scripts')->remove($name);
}


/**
 * acfe_have_scripts
 *
 * @return bool
 */
function acfe_have_scripts() {
    return acf_get_store('acfe-scripts')->count() ? true : false;
}


/**
 * acfe_is_script
 *
 * @param $name
 *
 * @return bool
 */
function acfe_is_script($name = ''){
    return acf_get_store('acfe-scripts')->has($name);
}


/**
 * acfe_count_scripts
 *
 * @return int
 */
function acfe_count_scripts(){
    return acf_get_store('acfe-scripts')->count();
}


/**
 * acfe_get_scripts_categories
 *
 * @return array
 */
function acfe_get_scripts_categories(){
    
    // vars
    $categories = array();
    $scripts = acfe_get_scripts();
    
    // loop
    foreach($scripts as $script){
        
        if($script->category && !in_array($script->category, $categories)){
            $categories[] = $script->category;
        }
        
    }
    
    // return
    return $categories;
    
}


/**
 * acfe_register_script
 *
 * @param $class
 *
 * @return bool
 */
function acfe_register_script($class){
    
    // var
    $instance = $class;
    
    // instanciate
    if(!$instance instanceOf acfe_script){
        $instance = new $class();
    }
    
    // validate
    $instance = acfe_validate_script($instance);
    
    // check validate
    if(!$instance){
        return false;
    }
    
    // add to store
    acf_get_store('acfe-scripts')->set($instance->name, $instance);
    
    // return
    return true;
    
}


/**
 * acfe_validate_script
 *
 * @param $instance
 *
 * @return false|mixed
 */
function acfe_validate_script($instance){
    
    // check name
    if(empty($instance->name)){
        return false;
    }
    
    // check active
    if(!$instance->active){
        return false;
    }
    
    // set default capability
    if($instance->capability === null){
        $instance->capability = acf_get_setting('capability');
    }
    
    // check permission
    if(!current_user_can($instance->capability)){
        return false;
    }
    
    // set default title
    if(empty($instance->title)){
        $instance->title = $instance->name;
    }
    
    // validate field groups fields
    foreach($instance->field_groups as &$field_group){
        
        if(isset($field_group['fields'])){
    
            // generate fields key if not provided
            $field_group['fields'] = acfe_map_fields($field_group['fields'], function($field){
                
                // this is done within acf_add_local_field() but not in acf_add_local_fields()
                if(!acf_maybe_get($field, 'key')){
                    $field['key'] = "field_{$field['name']}";
                }
                
                // return
                return $field;
                
            });
            
        }
        
    }
    
    // return
    return $instance;
    
}


/**
 * acfe_register_launcher_script
 *
 * @param $args
 */
function acfe_register_launcher_script($args){
    
    // validate
    $args = acfe_validate_launcher_script($args);
    
    // check validate
    if(!$args){
        return false;
    }
    
    // add to store
    acf_get_store('acfe-launcher-scripts')->set($args['name'], $args);
    
    return true;

}

/**
 * acfe_validate_launcher_script
 *
 * @param $args
 *
 * @return array|false
 */
function acfe_validate_launcher_script($args){
    
    // check name
    if(empty($args['name'])){
        return false;
    }
    
    // default args
    $args = wp_parse_args($args, array(
        'name'       => '',
        'label'      => '',
        'capability' => acf_get_setting('capability'),
        'recursive'  => false,
        'executions' => false, // false | true | [number]
    ));
    
    // missing label
    if(empty($args['label'])){
        $args['label'] = $args['name'];
    }
    
    // recursive
    if($args['recursive'] && $args['executions'] === false){
        $args['executions'] = -1;
    }
    
    // simple
    if(!$args['recursive']){
        $args['executions'] = 1;
    }
    
    // check permission
    if(!current_user_can($args['capability'])){
        return false;
    }
    
    // return
    return $args;
    
}


/**
 * acfe_get_launcher_scripts
 *
 * @return array|mixed|null
 */
function acfe_get_launcher_scripts(){
    return acf_get_store('acfe-launcher-scripts')->get();
}


/**
 * acfe_get_launcher_script
 *
 * @param $name
 *
 * @return array|mixed|null
 */
function acfe_get_launcher_script($name = ''){
    return acf_get_store('acfe-launcher-scripts')->get($name);
}