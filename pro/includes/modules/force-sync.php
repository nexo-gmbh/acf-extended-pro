<?php

if(!defined('ABSPATH')){
    exit;
}

// check setting
if(!acfe_get_setting('modules/force_sync')){
    return;
}

if(!class_exists('acfe_pro_force_sync')):

class acfe_pro_force_sync{
    
    /**
     * construct
     */
    function __construct(){
        
        add_action('current_screen', array($this, 'current_screen'));
        
    }
    
    
    /**
     * current_screen
     */
    function current_screen(){
        
        // vars
        $screen = get_current_screen();
        $rule = acf_is_screen(array('dashboard', 'edit-acf-field-group'));
        
        // filter
        $rule = apply_filters('acfe/modules/force_sync/rule', $rule, $screen);
        
        if(!$rule){
            return;
        }
        
        // check json setting
        if(!acf_get_setting('json')){
            return;
        }
        
        // sync
        $this->sync_field_groups();
        
        // sync delete
        if(acfe_get_setting('modules/force_sync/delete')){
            $this->sync_deleted_field_groups();
        }
        
    }
    
    
    /**
     * sync_field_groups
     *
     * @param $silent
     *
     * @return array
     */
    function sync_field_groups($silent = false){
        
        // avoid timestamp update during force sync
        acf_update_setting('json', false);
    
        // vars
        $files = acf_get_local_json_files();
        $desync = $this->get_desync_field_groups();
        $field_groups = array();
        
        // exclude
        $exclude = apply_filters('acfe/modules/force_sync/exclude', array());
        
        // loop
        foreach($desync as $key => $group){
            
            // check exclude
            if(in_array($key, $exclude)){
                continue;
            }
            
            $local_field_group = json_decode(file_get_contents($files[$key]), true);
            $local_field_group['ID'] = $group['ID'];
            $result = acf_import_field_group($local_field_group);
    
            $field_groups[] = $result;
            
        }
        
        //sync done
        if($field_groups){
            
            if(!$silent){
    
                $this->remove_desync($field_groups);
                $this->add_admin_sync_notice($field_groups);
                
            }
    
            do_action('acfe/modules/force_sync/sync', $field_groups);
            
        }
        
        // re-enable json
        acf_update_setting('json', true);
        
        return $field_groups;
        
    }
    
    
    /**
     * sync_deleted_field_groups
     *
     * @param $silent
     *
     * @return array
     */
    function sync_deleted_field_groups($silent = false){
        
        // vars
        $field_groups = array();
        $db_field_groups = array();
    
        // exclude
        $exclude = apply_filters('acfe/modules/force_sync/exclude', array());
        
        $is_local = acf_get_setting('local');
        $json = acf_get_local_json_files();
        $local_field_groups = array_keys($json);
        
        if($is_local){
            acf_disable_filter('local');
        }
        
        foreach(acf_get_field_groups() as $field_group){
            
            // extract vars
            $autosync = acf_get_array(acf_maybe_get($field_group, 'acfe_autosync', array()));
            
            // ignore field group that are not synced with json
            if(!in_array('json', $autosync)){
                continue;
            }
            
            // ignore exluded
            if(in_array($field_group['key'], $exclude)){
                continue;
            }
            
            // check if db field group has local file
            if(in_array($field_group['key'], $local_field_groups)){
                continue;
            }
            
            
            // add to collection
            $field_groups[] = $field_group;
            
            // delete field group
            acf_delete_field_group($field_group['key']);
            
        }
        
        if($is_local){
            acf_enable_filter('local');
        }
        
        // sync done
        if($field_groups){
            
            if(!$silent){
                $this->add_admin_deleted_notice($field_groups);
            }
            
            do_action('acfe/modules/force_sync/delete', $field_groups);
            
        }
        
        return $field_groups;
        
    
    }
    
    
    /**
     * get_desync_field_groups
     *
     * @return array
     */
    function get_desync_field_groups(){
        
        // vars
        $desync = array();
        $files = acf_get_local_json_files();
        
        if(!$files){
            return $desync;
        }
    
        // get all groups in a single cached query to check if sync is available.
        $field_groups = acf_get_field_groups();
        
        foreach($field_groups as $field_group){
        
            // extract vars.
            $local = acf_maybe_get($field_group, 'local');
            $modified = acf_maybe_get($field_group, 'modified');
            $private = acf_maybe_get($field_group, 'private');
        
            // ignore if is private
            if($private){
                continue;
            
            // ignore not local "json"
            }elseif($local !== 'json'){
                continue;
            
            // append to sync if not yet in database
            }elseif(!$field_group['ID']){
                $desync[ $field_group['key'] ] = $field_group;
            
            // append to sync if "json" modified time is newer than database
            }elseif($modified && $modified > get_post_modified_time('U', true, $field_group['ID'])){
                $desync[ $field_group['key'] ] = $field_group;
            }
            
        }
        
        return $desync;
        
    }
    
    
    /**
     * remove_desync
     *
     * @param $field_groups
     */
    function remove_desync($field_groups = array()){
        
        if(acf_version_compare(acf_get_setting('version'),  '<', '5.9')){
            return;
        }
        
        foreach($field_groups as $field_group){
            unset(acf_get_instance('ACF_Admin_Field_Groups')->sync, $field_group['key']);
        }
        
        if(empty(acf_get_instance('ACF_Admin_Field_Groups')->sync)){
            acf_get_instance('ACF_Admin_Field_Groups')->sync = array();
        }
        
        acf_get_instance('ACF_Admin_Field_Groups')->setup_sync();
        acf_get_instance('ACFE_Field_Groups')->sync = acf_get_instance('ACF_Admin_Field_Groups')->sync;
        
    }
    
    
    /**
     * add_admin_sync_notice
     *
     * @param $field_groups
     */
    function add_admin_sync_notice($field_groups){
        
        // vars
        $count = count($field_groups);
        $field_groups_links = array();
        
        foreach($field_groups as $field_group){
            $field_groups_links[] = '<a href="' . admin_url('post.php?post=' . $field_group['ID'] . '&action=edit') . '">' . $field_group['title'] . '</a>';
        }
        
        $title = $count > 1 ? $count . ' Field Groups synchronized: ' : $count . ' Field Group synchronized: ';
        
        acf_add_admin_notice($title . implode(', ', $field_groups_links), 'success');
        
    }
    
    
    /**
     * add_admin_deleted_notice
     *
     * @param $field_groups
     */
    function add_admin_deleted_notice($field_groups){
        
        // vars
        $count = count($field_groups);
        $field_groups_titles = array();
        
        foreach($field_groups as $field_group){
            $field_groups_titles[] = $field_group['title'];
        }
        
        $title = $count > 1 ? $count . ' Field Groups deleted: ' : $count . ' Field Group deleted: ';
        
        acf_add_admin_notice($title . implode(', ', $field_groups_titles), 'success');
        
    }
    
}

acf_new_instance('acfe_pro_force_sync');

endif;


/**
 * acfe_force_sync
 *
 * @return mixed
 */
function acfe_force_sync(){
    return acf_get_instance('acfe_pro_force_sync')->sync_field_groups(true);
}


/**
 * acfe_force_sync_delete
 *
 * @return mixed
 */
function acfe_force_sync_delete(){
    return acf_get_instance('acfe_pro_force_sync')->sync_deleted_field_groups(true);
}