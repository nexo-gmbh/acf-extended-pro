<?php

if(!class_exists('acfe_dashboard_widgets')):

class acfe_dashboard_widgets{
    
    /**
     * construct
     */
    function __construct(){
        
        add_action('wp_dashboard_setup', array($this, 'wp_dashboard_setup'));
        
    }
    
    
    /**
     * wp_dashboard_setup
     *
     * @return void
     */
    function wp_dashboard_setup(){
        
        $field_groups = acf_get_field_groups(array(
            'dashboard' => 'widget',
        ));
        
        if(!$field_groups){
            return;
        }
        
        // notices
        if(acf_maybe_get_GET('message') === '1'){
            acf_add_admin_notice($this->get_notice(), 'success');
        }
        
        // verify and remove nonce
        if(acf_verify_nonce('dashboard') && $this->get_field_group_sent()){
            
            // get field group sent
            $field_group = $this->get_field_group_sent();
            $widget = $this->get_widget($field_group);
            
            // validate capability
            if(current_user_can($widget['capability'])){
                
                // save data
                if(acf_validate_save_post(true)){
                    
                    // set autoload
                    acf_update_setting('autoload', $widget['autoload']);
                    
                    // save
                    acf_save_post($widget['post_id']);
                    
                    // add notice
                    $this->add_notice($widget['updated_message']);
                    
                    // redirect
                    wp_safe_redirect(add_query_arg(array('message' => '1')));
                    exit;
                    
                }
                
            }
            
        }
        
        // load acf scripts
        acf_enqueue_scripts();
        
        foreach($field_groups as $field_group){
            
            // get widget
            $widget = $this->get_widget($field_group);
            
            // validate capability
            if(!current_user_can($widget['capability'])){
                continue;
            }
            
            $id       = "acf-{$field_group['key']}";
            $context  = $field_group['position'];
            $priority = 'high';
            
            // tweaks to vars
            if($context == 'acf_after_title'){
                $context = 'normal';
            }elseif($context == 'side'){
                $priority = 'core';
            }
            
            // args
            $args = array(
                'widget'      => $widget,
                'field_group' => $field_group,
            );
            
            wp_add_dashboard_widget($id, acf_esc_html($widget['title']), array($this, 'render_widget'), null, $args, $context, $priority);
            
        }
        
    }
    
    
    /**
     * render_widget
     *
     * @param $options
     * @param $args
     *
     * @return void
     */
    function render_widget($options, $args){
        
        // vars
        $id          = $args['id'];
        $field_group = $args['args']['field_group'];
        $widget      = $args['args']['widget'];
        
        echo '<form method="post">';
        
        // get fields
        $fields = acf_get_fields($field_group);
        
        // render fields
        acf_render_fields($fields, $widget['post_id'], 'div', $field_group['instruction_placement']);
        
        // add form data
        // after fields for fields border-top compatibility
        acf_form_data(array(
            'screen'      => 'dashboard',
            'post_id'     => $widget['post_id'],
            'field_group' => $field_group['key'],
        ));
        
        // json vars
        $o = array(
            'id'         => $id,
            'key'        => $field_group['key'],
            'style'      => $field_group['style'],
            'label'      => $field_group['label_placement'],
            'editLink'   => '',
            'editTitle'  => __('Edit field group', 'acf'),
            'visibility' => true,
        );
        
        // edit_url
        if($field_group['ID'] && acf_current_user_can_admin()){
            $o['editLink'] = admin_url('post.php?post=' . $field_group['ID'] . '&action=edit');
        }
        
        ?>
        <?php if($widget['update_button']): ?>
        <div class="acfe-dashboard-widget-actions">
            <input type="submit" value="<?php esc_html_e($widget['update_button']); ?>" class="button button-primary button-large" id="publish" name="publish">
            <span class="spinner"></span>
        </div>
        <?php endif; ?>
        <script type="text/javascript">
        if(typeof acf !== 'undefined'){
            acfe.newDashboardWidget(<?php echo json_encode($o); ?>);
        }
        </script>
        <?php
        
        echo '</form>';
        
    }
    
    
    /**
     * get_widget
     *
     * @param $field_group
     *
     * @return array|mixed
     */
    function get_widget($field_group){
        
        // defaults
        $widget = array(
            'title'           => $field_group['title'],
            'updated_message' => __('Widget updated.', 'acfe'),
            'update_button'   => __('Update', 'acfe'),
            'capability'      => 'edit_posts',
            'post_id'         => 'dashboard',
            'autoload'        => false,
        );
        
        // filters
        $widget = apply_filters("acfe/dashboard_widget_args",                           $widget, $field_group);
        $widget = apply_filters("acfe/dashboard_widget_args/key={$field_group['key']}", $widget, $field_group);
        
        // validate post id
        $widget['post_id'] = acf_get_valid_post_id($widget['post_id']);
        
        // return
        return $widget;
        
    }
    
    
    /**
     * add_notice
     *
     * @param $message
     *
     * @return void
     */
    function add_notice($message){
        
        $transient_name = 'acfe_dashboard_widget_' . get_current_user_id();
        set_transient($transient_name, $message);
        
    }
    
    
    /**
     * get_notice
     *
     * @return mixed
     */
    function get_notice(){
        
        $transient_name = 'acfe_dashboard_widget_' . get_current_user_id();
        
        $message = get_transient($transient_name);
        delete_transient($transient_name);
        
        if(empty($message)){
            return __('Widget updated.', 'acfe');
        }
        
        return $message;
        
    }
    
    
    /**
     * get_field_group_sent
     *
     * @return array|false
     */
    function get_field_group_sent(){
        
        // get sent field group
        $key = acf_maybe_get_POST('_acf_field_group');
        if(!$key){
            return false;
        }
        
        // get field group
        $field_group = acf_get_field_group($key);
        if($field_group){
            return $field_group;
        }
        
        return false;
        
    }
    
}

acf_new_instance('acfe_dashboard_widgets');

endif;