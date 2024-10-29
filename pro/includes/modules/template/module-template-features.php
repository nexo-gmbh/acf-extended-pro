<?php

if(!defined('ABSPATH')){
    exit;
}


if(!class_exists('acfe_module_template_features')):

class acfe_module_template_features{
    
    public $bypass = false;
    public $items = array();
    public $module;
    public $allowed_pages = array('post.php', 'post-new.php', 'profile.php', 'user-edit.php', 'user-new.php', 'edit-tags.php', 'term.php');
    
    /**
     * construct
     */
    function __construct(){
        
        $this->module = acfe_get_module('template');
    
        // location rules
        add_filter('acf/location/rule_types',                   array($this, 'rule_types'));
        add_filter('acf/location/rule_operators/acfe_template', array($this, 'rule_operators'), 10, 2);
        add_filter('acf/location/rule_values/acfe_template',    array($this, 'rule_values'));
        add_filter('acf/location/rule_match',                   array($this, 'rule_match_template'), 10, 4);
        add_filter('acf/location/rule_match/acfe_template',     array($this, 'rule_match_post'), 10, 4);
        add_action('acfe/pre_render_field_group',               array($this, 'pre_render_field_group'), 10, 3);
    
    }
    
    
    /**
     * rule_types
     *
     * @param $choices
     *
     * @return mixed
     */
    function rule_types($choices){
        
        $name = __('Forms', 'acf');
        $choices[ $name ] = acfe_array_insert_after($choices[ $name ], 'options_page', 'acfe_template', __('Template', 'acfe'));
        
        return $choices;
        
    }
    
    
    /**
     * rule_operators
     *
     * @param $operators
     * @param $rule
     *
     * @return array
     */
    function rule_operators($operators, $rule){
        return array('==' => __('is equal to', 'acf'));
    }
    
    
    /**
     * rule_values
     *
     * @param $choices
     *
     * @return array
     */
    function rule_values($choices){
        
        // get raw + local items
        $items = $this->module->get_items();
        
        if(empty($items)){
            return array('' => __('No templates found', 'acfe'));
        }
        
        $choices = array();
        
        foreach($items as $item){
            $choices[ $item['name'] ] = $item['title'];
        }
        
        return $choices;
        
    }
    
    
    /**
     * rule_match_template
     *
     * acf/location/rule_match
     *
     * @param $match
     * @param $rule
     * @param $screen
     * @param $field_group
     *
     * @return bool|mixed
     */
    function rule_match_template($match, $rule, $screen, $field_group){
    
        // check active
        // $field_group might be an empty array here (see acfe_match_location_rules)
        if(empty($field_group['active'])){
            return $match;
        }
        
        // bail early if not template post type
        if(acf_maybe_get($screen, 'post_type') !== $this->module->post_type){
            return $match;
        }
        
        // get post id
        $post_id = acf_maybe_get($screen, 'post_id', 0);
        $post_id = $this->get_post_id_translated_default($post_id);
        
        // get item
        $item = $this->module->get_item($post_id);
        
        if(!$item){
            return $match;
        }
    
        // loop through location
        if($field_group['location']){
            
            foreach($field_group['location'] as $group){
            
                // loop over rules and determine if all rules match
                if($group){
                    
                    foreach($group as $group_rule){
                        if($group_rule['param'] === 'acfe_template' && $group_rule['value'] === $item['name']){
                            return true;
                        }
                    }
                    
                }
            
            }
        
        }
    
        // return
        return $match;
        
    }
    
    
    /**
     * rule_match_post
     *
     * acf/location/rule_match/acfe_template
     *
     * Match post, user and terms screens
     *
     * @param $match
     * @param $rule
     * @param $screen
     * @param $field_group
     *
     * @return bool|mixed
     */
    function rule_match_post($match, $rule, $screen, $field_group){
        
        // global
        global $pagenow;
        
        // bail early on template post type
        if(acf_maybe_get($screen, 'post_type') === $this->module->post_type){
            return $match;
        }
        
        // check screen
        if(in_array($pagenow, $this->allowed_pages)){
            
            // get post id
            // todo: check translated posts
            
            //$post_id = $rule['value'];
            //$post_id = $this->get_post_id_translated($post_id);
            
            // get item
            $item = $this->module->get_item($rule['value']);
            
            // check active
            if($item && $item['active']){
                
                if(!$this->bypass){
                    
                    $item['field_group'] = $field_group;
                    $this->items[] = $item;
                    
                }
            
            }
        
        }
        
        // always return true
        // field group is always displayed
        // even if template is disabled
        return true;
        
    }
    
    
    /**
     * pre_render_field_group
     *
     * @param $field_group
     * @param $fields
     * @param $post_id
     */
    function pre_render_field_group($field_group, $fields, $post_id){
        
        if(empty($this->items)){
            return;
        }
    
        // get screen
        $screen = acf_get_form_data('location');
        $screen = acf_get_location_screen($screen);
    
        // Loop
        foreach($this->items as $item){
            
            // bail early if not current field group
            if(empty($item['field_group']['key']) || $item['field_group']['key'] !== $field_group['key']){
                continue;
            }
            
            // loop locations
            foreach($item['field_group']['location'] as $group){
            
                // ignore group if no rules.
                if(empty($group)){
                    continue;
                }
            
                // loop over rules and determine if all rules match.
                $match_group = true;
                $this->bypass = true;
            
                foreach($group as $rule){
                
                    if(!acf_match_location_rule($rule, $screen, array())){
                        $match_group = false;
                        break;
                    }
                
                }
            
                $this->bypass = false;
            
                // show the field group
                if($match_group){
                
                    $found_template = false;
                    foreach($group as $rule){
                        if($rule['param'] === 'acfe_template' && $rule['value'] === $item['name']){
                            $found_template = true;
                            break;
                        }
                    }
                
                    if($found_template){
                        $this->apply_values($item['values']);
                    }
                
                }
            
            }
        
        }
        
    }
    
    
    /**
     * apply_values
     *
     * @param $values
     */
    function apply_values($values){
        
        // Pre load value
        add_filter('acf/pre_load_value', function($null, $post_id, $field) use($values){
            
            // vars
            $field_key = $field['key'];
            $field_name = $field['name'];
            
            // check if field name/key is in the values
            if(!isset($values[ $field_name ]) && !isset($values[ $field_key ])){
                return $null;
            }
            
            // get store
            $store = acf_get_store('values');
            
            // check store
            if($store->has("$post_id:$field_name")){
                return $null;
            }
            
            // load value from database.
            $value = acf_get_metadata($post_id, $field_name);
            
            // value exists
            if($value !== null){
                
                // apply filters
                $value = apply_filters('acf/load_value', $value, $post_id, $field);
                
                // update store
                $store->set("$post_id:$field_name", $value);
                
                // return
                return $null;
                
            }
            
            // return by name
            if(isset($values[ $field_name ])){
                return $values[ $field_name ];
                
            // return by key
            }elseif(isset($values[ $field_key ])){
                return $values[ $field_key ];
            }
            
            // return
            return $null;
            
        }, 10, 3);
        
    }
    
    
    /**
     * get_post_id_translated_default
     *
     * @param $post_id
     *
     * @return int
     */
    function get_post_id_translated_default($post_id){
        
        $post_id = acf_get_valid_post_id($post_id);
        $post_id = acfe_get_post_translated_default($post_id);
        
        return (int) $post_id;
        
    }
    
    
    /**
     * get_post_id_translated
     *
     * @param $post_id
     *
     * @return int
     */
    function get_post_id_translated($post_id){
        
        $post_id = acf_get_valid_post_id($post_id);
        $post_id = acfe_get_post_translated($post_id);
        
        return (int) $post_id;
        
    }
    
}

acf_new_instance('acfe_module_template_features');

endif;

/**
 * acfe_template_apply_values
 *
 * @param $values
 *
 * @return mixed
 */
function acfe_template_apply_values($values){
    return acf_get_instance('acfe_module_template_features')->apply_values($values);
}