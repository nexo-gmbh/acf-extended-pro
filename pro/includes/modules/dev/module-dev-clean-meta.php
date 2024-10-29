<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_pro_dev_clean_meta')):

class acfe_pro_dev_clean_meta{
    
    /**
     * construct
     */
    function __construct(){
    
        // check settings
        if((!acfe_is_dev() && !acfe_is_super_dev()) || !acf_current_user_can_admin()){
            return;
        }
        
        // load
        add_action('acfe/load_post',         array($this, 'load_page'));
        add_action('acfe/load_posts',        array($this, 'load_page'));
        add_action('acfe/load_term',         array($this, 'load_page'));
        add_action('acfe/load_terms',        array($this, 'load_page'));
        add_action('acfe/load_user',         array($this, 'load_page'));
        add_action('acfe/load_users',        array($this, 'load_page'));
        add_action('acfe/load_settings',     array($this, 'load_page'));
        add_action('acfe/load_option',       array($this, 'load_page'));
        add_action('acfe/load_attachment',   array($this, 'load_page'));
        add_action('acfe/load_attachments',  array($this, 'load_page'));
        
    }
    
    
    /**
     * load_page
     *
     * acfe/load_post
     * acfe/load_posts
     * acfe/load_term
     * acfe/load_terms
     * acfe/load_user
     * acfe/load_users
     * acfe/load_settings
     * acfe/load_option'
     * acfe/load_attachment
     * acfe/load_attachments
     */
    function load_page(){
        
        // vars
        $post_id = acfe_maybe_get_REQUEST('acfe_dev_clean');
        $nonce = acfe_maybe_get_REQUEST('acfe_dev_clean_nonce');
        
        // check none
        if($post_id && wp_verify_nonce($nonce, 'acfe_dev_clean')){
            
            // get deleted meta
            $deleted = acfe_delete_orphan_meta($post_id);
            
            // set transient
            set_transient('acfe_dev_clean', $deleted, 3600); // 1 hour
            
            // remove args
            $url = remove_query_arg(array(
                'acfe_dev_clean',
                'acfe_dev_clean_nonce'
            ));
            
            // add message
            $url = add_query_arg(array(
                'message' => 'acfe_dev_clean'
            ), $url);
            
            // redirect
            wp_redirect($url);
            exit;
            
        }
        
        // success message
        if(acf_maybe_get_GET('message') === 'acfe_dev_clean'){
    
            /**
             * $deleted = array(
             *     'normal' => array(
             *         '_text' => 'field_63f76af0df2e3',
             *         'text'  => 'value',
             *     ),
             *     'acf' => array(
             *         '_text' => 'field_63f76af0df2e3',
             *         'text'  => 'value',
             *     ),
             * )
             */
            $deleted = acf_get_array(get_transient('acfe_dev_clean'));
            delete_transient('acfe_dev_clean');
            
            // count
            $count = 0;
            foreach($deleted as $type){
                $count += count($type);
            }
            
            // no orphan meta
            if(!$count){
                return acf_add_admin_notice(__('No orphan meta found', 'acfe'), 'warning');
            }
            
            // orphan meta found
            $link = ' <a href="#" data-modal="clean-meta-debug">' . __('View', 'acfe') . '</a>';
    
            add_action('admin_footer', function() use($deleted){
                ?>
                <div class="acfe-modal" data-modal="clean-meta-debug" data-title="<?php _e('Deleted meta', 'acfe'); ?>" data-footer="<?php _e('Close', 'acfe'); ?>">
                    <div class="acfe-modal-spacer">
                        <pre><?php print_r($deleted); ?></pre>
                    </div>
                </div>
                <?php
            });
    
            return acf_add_admin_notice("{$count} meta cleaned.{$link}", 'success');
            
        }
        
    }
    
}

acf_new_instance('acfe_pro_dev_clean_meta');

endif;