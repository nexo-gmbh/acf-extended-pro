<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_module_template_upgrades')):

class acfe_module_template_upgrades{
    
    /**
     * construct
     */
    function __construct(){
        
        add_action('acfe/do_upgrade', array($this, 'upgrade_0_8_9'), 10);
        
    }
    
    
    /**
     * upgrade_0_8_9
     *
     * acfe/do_upgrade:10
     *
     * @param $db_version
     */
    function upgrade_0_8_9($db_version){
    
        // check already done
        if(acf_version_compare($db_version, '>=', '0.8.9')){
            return;
        }
        
        // hook on init to load all WP components
        // post types, post statuses 'acf-disabled' etc...
        add_action('init', function(){
    
            // get templates
            $posts = get_posts(array(
                'post_type'      => 'acfe-template',
                'posts_per_page' => -1,
                'fields'         => 'ids',
                'post_status'    => 'any',
            ));
    
            $todo = array();
    
            foreach($posts as $post_id){
        
                if(acfe_is_module_v2_item($post_id)){
                    $todo[] = $post_id;
                }
        
            }
    
            if(!$todo){
                return;
            }
    
            // get module
            $module = acfe_get_module('template');
    
            // loop
            foreach($todo as $post_id){
        
                $title = get_post_field('post_title', $post_id);
                $name = get_post_field('post_name', $post_id);
                $active = (bool) get_post_meta($post_id, 'acfe_template_active', true);
        
                $item = array(
                    'ID'     => $post_id,
                    'name'   => $name,
                    'title'  => $title,
                    'active' => $active,
                    'values' => get_fields($post_id, false)
                );
        
                // import item (update db)
                $module->import_item($item);
        
            }
    
            // log
            acf_log('[ACF Extended] 0.8.9 Upgrade: Templates');
        
        });
    
    }
    
}

acf_new_instance('acfe_module_template_upgrades');

endif;