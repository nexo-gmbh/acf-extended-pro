<?php

if(!defined('ABSPATH')){
    exit;
}


if(!class_exists('acfe_module_template_compat')):

class acfe_module_template_compat{
    
    public $module;
    public $allowed_pages = array('post.php', 'post-new.php', 'profile.php', 'user-edit.php', 'user-new.php', 'edit-tags.php', 'term.php');
    
    /**
     * construct
     */
    function __construct(){
        
        $this->module = acfe_get_module('template');
        
        add_action('acf/admin_head',                     array($this, 'admin_head'));
        add_filter('acf/validate_field_group',           array($this, 'validate_field_group'), 20);
        add_filter('acf/prepare_field_group_for_import', array($this, 'validate_field_group'), 20);
    
    }
    
    
    /**
     * admin_head
     *
     * Backward compatibility with local templates using 'location' => array() setting
     */
    function admin_head(){
        
        // globals
        global $pagenow, $post;
        
        // check screen
        if(!in_array($pagenow, $this->allowed_pages)){
            return;
        }
        
        // do not apply on template post type
        if(acfe_maybe_get($post, 'post_type') === $this->module->post_type && in_array($pagenow, array('post.php', 'post-new.php'))){
            return;
        }
        
        // get local items
        $local_items = $this->module->get_local_items();
        
        if(!$local_items){
            return;
        }
        
        // get screen
        $screen = acf_get_form_data('location');
        $screen = acf_get_location_screen($screen);
        
        // Loop
        foreach($local_items as $item){
            
            // validate
            if(empty($item['active']) || empty($item['values']) || empty($item['location'])){
                continue;
            }
            
            // match screen
            if(acfe_match_location_rules($item['location'], $screen)){
                
                // apply values
                acfe_template_apply_values($item['values']);
                
            }
            
        }
        
    }
    
    
    /**
     * validate_field_group
     *
     * Validate Field Group Conditions
     *
     * @param $field_group
     *
     * @return array
     */
    function validate_field_group($field_group){
        
        // loop locations
        if(acf_maybe_get($field_group, 'location')){
            
            foreach($field_group['location'] as $k => $group){
        
                $count = count($group);
        
                foreach($group as $i => $rule){
                    
                    if($rule['param'] !== 'acfe_template'){
                        continue;
                    }
                
                    // do not allow template as single location
                    // only use in combination with another rule
                    if($count === 1){
                        unset($field_group['location'][ $k ]);
                    
                    // convert old numeric value to name
                    }elseif(is_numeric($rule['value'])){
    
                        $item = $this->module->get_item($rule['value']);
                        
                        // convert item id to item name
                        if($item){
                            $field_group['location'][ $k ][ $i ]['value'] = $item['name'];
                            
                        // unset
                        }else{
                            unset($field_group['location'][ $k ][ $i ]);
                        }
                        
                    }
            
                }
                
            }
            
        }
        
        return $field_group;
        
    }
    
}

new acfe_module_template_compat();

endif;