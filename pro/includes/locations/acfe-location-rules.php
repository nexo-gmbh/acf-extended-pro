<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_location_rules')):

class acfe_location_rules{
    
    /**
     * construct
     */
    function __construct(){
    
        add_filter('acf/location/rule_types', array($this, 'location_rules_types'));
        
    }
    
    
    /**
     * location_rules_types
     *
     * @param $groups
     *
     * @return mixed
     */
    function location_rules_types($groups){
        
        foreach($groups as &$sub_group){
            
            if(isset($sub_group['taxonomy_list'])){
    
                $sub_group = acfe_array_insert_after($sub_group, 'taxonomy_list', 'taxonomy_term_type');
                $sub_group = acfe_array_insert_after($sub_group, 'taxonomy_list', 'taxonomy_term_slug');
                $sub_group = acfe_array_insert_after($sub_group, 'taxonomy_list', 'taxonomy_term_parent');
                $sub_group = acfe_array_insert_after($sub_group, 'taxonomy_list', 'taxonomy_term_name');
                $sub_group = acfe_array_insert_after($sub_group, 'taxonomy_list', 'taxonomy_term');
                
            }
            
            if(isset($sub_group['nav_menu_item'])){
    
                $sub_group = acfe_array_insert_after($sub_group, 'nav_menu_item', 'nav_menu_item_type');
                $sub_group = acfe_array_insert_after($sub_group, 'nav_menu_item', 'nav_menu_item_depth');
            
            }
            
        }
        
        return $groups;
        
    }
    
}

new acfe_location_rules();

endif;