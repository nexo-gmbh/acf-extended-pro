<?php

if(!defined('ABSPATH')){
    exit;
}

// Check settings
if((!acfe_is_dev() && !acfe_is_super_dev()) || !acf_current_user_can_admin()){
    return;
}

if(!class_exists('acfe_pro_dev_edit_meta')):

class acfe_pro_dev_edit_meta{
    
    /**
     * construct
     */
    function __construct(){
    
        add_filter('acfe/dev/meta/row_actions',    array($this, 'meta_row_actions'), 10, 3);
        add_action('wp_ajax_acfe/dev/edit_meta',   array($this, 'ajax_edit_meta'));
        add_action('wp_ajax_acfe/dev/update_meta', array($this, 'ajax_update_meta'));
        
    }
    
    
    /**
     * meta_row_actions
     *
     * acfe/dev/meta/row_actions
     *
     * @param $row_actions
     * @param $meta
     * @param $args
     *
     * @return array|mixed
     */
    function meta_row_actions($row_actions, $meta, $args){
        
        // check permission
        if(!current_user_can(acf_get_setting('capability'))){
            return $row_actions;
        }
        
        // delete link
        $edit = array(
            'href'           => '#',
            'class'          => 'acfe-dev-edit-meta',
            'data-meta-id'   => $meta['id'],
            'data-meta-key'  => $meta['key'],
            'data-meta-type' => $meta['type'],
            'data-nonce'     => wp_create_nonce("acfe-dev-edit-meta-{$meta['id']}"),
        );
        $new_action = array();
        $new_action['edit'] = '<a ' . acf_esc_attrs($edit). '>' . __('Edit') . '</a>';
        
        // return
        return array_merge($new_action, $row_actions);
        
    }
    
    
    /**
     * ajax_edit_meta
     *
     * wp_ajax_acfe/dev/edit_meta
     */
    function ajax_edit_meta(){
        
        // vars
        $id = acf_maybe_get_POST('id');
        $key = acf_maybe_get_POST('key');
        $type = acf_maybe_get_POST('type');
        
        // check vars
        if(!$id || !$key || !$type){
            wp_die(0);
        }
        
        // check referer
        check_ajax_referer("acfe-dev-edit-meta-{$id}");
        
        // check permission
        if(!current_user_can(acf_get_setting('capability'))){
            wp_die(-1);
        }
        
        // get meta data
        $meta = $this->get_metadata_by_mid($type, $id);
    
        $fields = array(
    
            array(
                'label'             => __('Name', 'acfe'),
                'key'               => 'name',
                'name'              => 'name',
                'type'              => 'text',
                'prefix'            => '',
                'instructions'      => '',
                'required'          => true,
                'conditional_logic' => false,
                'default_value'     => '',
                'placeholder'       => '',
                'prepend'           => '',
                'append'            => '',
                'maxlength'         => '',
                'value'             => $meta['meta_key'],
                'wrapper'           => array(
                    'width' => '',
                    'class' => '',
                    'id'    => '',
                ),
            ),
    
            array(
                'label'             => __('Value', 'acfe'),
                'key'               => 'value',
                'name'              => 'value',
                'type'              => 'textarea',
                'prefix'            => '',
                'instructions'      => '',
                'required'          => false,
                'conditional_logic' => false,
                'default_value'     => '',
                'placeholder'       => '',
                'prepend'           => '',
                'append'            => '',
                'maxlength'         => '',
                'acfe_textarea_code'=> true,
                'value'             => $meta['meta_value'],
                'wrapper'           => array(
                    'width' => '',
                    'class' => '',
                    'id'    => '',
                ),
            ),
            
        );
        
        if($type === 'option'){
            
            $fields[] = array(
                'label'             => __('Autoload', 'acfe'),
                'key'               => 'autoload',
                'name'              => 'autoload',
                'type'              => 'true_false',
                'prefix'            => '',
                'instructions'      => '',
                'required'          => false,
                'conditional_logic' => false,
                'default_value'     => '',
                'ui'                => true,
                'value'             => $meta['autoload'] === 'yes' ? 1 : 0,
                'wrapper'           => array(
                    'width' => '',
                    'class' => '',
                    'id'    => '',
                ),
            );
            
        }
    
        echo '<form>';
            echo '<div class="acf-fields -left">';
            
                acf_render_fields($fields, false, 'div', 'label');
                
            echo '</div>';
        echo '</div>';
        die;
        
    }
    
    
    /**
     * ajax_update_meta
     *
     * wp_ajax_acfe/dev/update_meta
     */
    function ajax_update_meta(){
        
        // vars
        $id = acf_maybe_get_POST('id');
        $key = acf_maybe_get_POST('key');
        $type = acf_maybe_get_POST('type');
        $data = acf_maybe_get_POST('data');
        
        // check vars
        if(!$id || !$key || !$type || !$data){
            wp_die(0);
        }
        
        // check referer
        check_ajax_referer("acfe-dev-edit-meta-{$id}");
        
        // check permission
        if(!current_user_can(acf_get_setting('capability'))){
            wp_die(-1);
        }
    
        $data['value'] = wp_unslash($data['value']);
        $data['value'] = maybe_unserialize($data['value']);
        
        $autoload = (bool) acf_maybe_get($data, 'autoload', false);
        
        if($this->update_metadata_by_mid($type, $id, $data['value'], $data['name'], $autoload)){
    
            $data['value'] = maybe_serialize($data['value']);
            
            echo acf_get_instance('acfe_dev')->render_meta_value($data['value']);
            die;
        }
        
        wp_die(0);
        
    }
    
    
    /**
     * get_metadata_by_mid
     *
     * Taken from wp source code. Removed maybe_unserialize() at the end
     *
     * @param $meta_type
     * @param $meta_id
     *
     * @return array|false|mixed|object|stdClass
     */
    function get_metadata_by_mid($meta_type, $meta_id){
        
        global $wpdb;
        
        if ( ! $meta_type || ! is_numeric( $meta_id ) || floor( $meta_id ) != $meta_id ) {
            return false;
        }
        
        $meta_id = (int) $meta_id;
        if ( $meta_id <= 0 ) {
            return false;
        }
        
        $meta = false;
    
        switch($meta_type){
        
            case 'post': {
    
                $row = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->postmeta} WHERE `meta_id` = %d", $meta_id));
                
                if($row){
                    $meta = array(
                        'meta_key'   => $row->meta_key,
                        'meta_value' => $row->meta_value,
                    );
                }
                
                break;
            
            }
        
            case 'term': {
    
                $row = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->termmeta} WHERE `meta_id` = %d", $meta_id));
    
                if($row){
                    $meta = array(
                        'meta_key'   => $row->meta_key,
                        'meta_value' => $row->meta_value,
                    );
                }
                
                break;
            
            }
        
            case 'user': {
    
                $row = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->usermeta} WHERE `umeta_id` = %d", $meta_id));
                
                if($row){
                    $meta = array(
                        'meta_key'   => $row->meta_key,
                        'meta_value' => $row->meta_value,
                    );
                }
                
                break;
            
            }
        
            case 'option': {
    
                $row = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->options} WHERE `option_id` = %d", $meta_id));
    
                if($row){
                    $meta = array(
                        'meta_key'   => $row->option_name,
                        'meta_value' => $row->option_value,
                        'autoload'   => $row->autoload,
                    );
                }
                
                break;
            
            }
        
        }
        
        if(empty($meta)){
            return false;
        }
        
        return $meta;
        
    }
    
    /**
     * update_metadata_by_mid
     *
     * @param $meta_type
     * @param $meta_id
     * @param $meta_value
     * @param $meta_key
     */
    function update_metadata_by_mid($meta_type, $meta_id, $meta_value, $meta_key = false, $autoload = false){
        
        // option
        if($meta_type === 'option'){
            return update_option($meta_key, $meta_value, $autoload);
        }
        
        // post/user/term
        return update_metadata_by_mid($meta_type, $meta_id, $meta_value, $meta_key);
        
    }
    
}

acf_new_instance('acfe_pro_dev_edit_meta');

endif;