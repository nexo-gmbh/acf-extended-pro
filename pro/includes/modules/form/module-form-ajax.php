<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_module_form_ajax')):

class acfe_module_form_ajax{
    
    var $redirect = false;
    
    /**
     * construct
     */
    function __construct(){
        
        add_action('wp_ajax_acfe/form/ajax_submit',                 array($this, 'ajax_submit'));
        add_action('wp_ajax_nopriv_acfe/form/ajax_submit',          array($this, 'ajax_submit'));
        
        add_filter('acfe/module/register_field_groups/module=form', array($this, 'register_field_groups'), 15, 2);
        add_filter('acfe/form/set_form_data',                       array($this, 'set_form_data'), 10, 2);
        
    }
    
    
    /**
     * ajax_submit
     *
     * @return void
     */
    function ajax_submit(){
        
        // verify nonce
        if(!acf_verify_ajax()){
            die();
        }
        
        // get form data
        $form = acfe_get_form_sent();
        if(!$form){
            die();
        }
        
        // reset redirect
        $this->redirect = false;
        
        // try to catch redirect url, if any
        add_filter('acfe/redirect', array($this, 'acfe_redirect'), 10, 2);
        
        // force to validate recpatcha, even in ajax
        add_filter('acfe/field/recpatcha/should_validate_value', '__return_true');
        
        // do not show errors during submit validation
        add_filter('acfe/form/submit_show_errors', '__return_false');
        
        // submit form
        acf_get_instance('acfe_module_form_front')->save_post();
        
        // check submission errors
        $errors = acf_get_validation_errors();
        
        // throw errors
        if($errors){
            wp_send_json_error($errors);
        }
        
        // get sucess message
        // this allow apply template tags
        ob_start();
            acf_get_instance('acfe_module_form_front')->render_success($form);
        $message = ob_get_clean();
        
        $data = array();
        $data = apply_filters("acfe/form/submit_success_data",                      $data, $form);
        $data = apply_filters("acfe/form/submit_success_data/form={$form['name']}", $data, $form);
        
        // send json response
        wp_send_json_success(array(
            'id'        => $form['ID'],
            'name'      => $form['name'],
            'message'   => $message,
            'redirect'  => $this->redirect,
            'data'      => $data,
        ));
        
    }
    
    
    /**
     * acfe_redirect
     *
     * @param $location
     * @param $status
     *
     * @return bool
     */
    function acfe_redirect($location, $status){
        
        // store the url
        $this->redirect = $location;
        
        // do not redirect
        return false;
        
    }
    
    
    /**
     * register_field_groups
     *
     * @param $field_groups
     * @param $module
     *
     * @return mixed
     */
    function register_field_groups($field_groups, $module){
        
        // search for 'group_acfe_form' key
        $group_key = array_search('group_acfe_form', array_column($field_groups, 'key'));
        
        // bail early
        if($group_key === false){
            return $field_groups;
        }
        
        // search for 'field_location' key
        $field_key = array_search('field_location', array_column($field_groups[ $group_key ]['fields'], 'key'));
        
        // bail early
        if($field_key === false){
            return $field_groups;
        }
        
        // insert setting before 'field_location'
        $field_groups[ $group_key ]['fields'] = acfe_array_insert_before($field_groups[ $group_key ]['fields'], $field_key, array(
            'key' => 'field_ajax',
            'label' => __('Ajax submission', 'acfe'),
            'name' => 'ajax',
            'type' => 'true_false',
            'instructions' => __('Enable Ajax form submission', 'acfe'),
            'ui' => 1,
            'group_with' => 'settings',
        ));
        
        // return
        return $field_groups;
        
    }
    
    
    /**
     * set_form_data
     *
     * @param $data
     * @param $form
     *
     * @return void
     */
    function set_form_data($data, $form){
        
        if(!empty($form['settings']['ajax'])){
            $data['ajax'] = true;
        }
        
        return $data;
        
    }
    
    
}

acf_new_instance('acfe_module_form_ajax');

endif;