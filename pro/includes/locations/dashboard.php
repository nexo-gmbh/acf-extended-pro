<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_location_dashboard')):

class acfe_location_dashboard extends acfe_location{
    
    function initialize(){
        
        $this->name     = 'dashboard';
        $this->label    = __('Dashboard', 'acfe');
        $this->category = 'forms';
        
    }
    
    function rule_values($choices, $rule){
        
        return array(
            'widget' => __('Widget', 'acfe'),
        );
        
    }
    
    function rule_match($result, $rule, $screen){
        
        $dashboard = acf_maybe_get($screen, 'dashboard');
        
        if(!$dashboard){
            return false;
        }
        
        return $this->compare($dashboard, $rule);
        
    }
    
}

acf_register_location_rule('acfe_location_dashboard');

endif;