<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_pro_module_posts')):

class acfe_pro_module_posts{
    
    // vars
    public $sync = array();
    public $view = '';
    public $module;
    
    /**
     * construct
     */
    function __construct(){
        
        add_action('acfe/module/load_posts',        array($this, 'load_posts'));
        add_filter('acfe/module/edit_columns',      array($this, 'edit_columns'), 10, 2);
        add_action('acfe/module/edit_columns_html', array($this, 'edit_columns_html'), 10, 3);
        add_filter('removable_query_args',          array($this, 'removable_query_args'));
        
    }
    
    
    /**
     * removable_query_args
     *
     * @param $args
     *
     * @return mixed
     */
    function removable_query_args($args){
        
        $args[] = 'acfe_sync_complete';
        return $args;
        
    }
    
    
    /**
     * load_posts
     *
     * acfe/module/load_posts
     *
     * @param $module
     */
    function load_posts($module){
        
        $this->module = $module;
        $this->view = isset($_GET['post_status']) ? sanitize_text_field($_GET['post_status']) : '';
        
        // sync
        $this->setup_sync();
        $this->check_sync();
        $this->check_duplicate();
    
        add_action('admin_enqueue_scripts',                         array($this, 'admin_enqueue_scripts'));
        add_filter("views_edit-{$module->post_type}",               array($this, 'admin_views'));
        add_filter('post_row_actions',                              array($this, 'edit_row_actions'), 10, 2);
        add_filter('page_row_actions',                              array($this, 'edit_row_actions'), 10, 2);
        add_filter("bulk_actions-edit-{$module->post_type}",        array($this, 'admin_bulk_actions'));
    
        // add hooks for 'sync available' view
        if($this->view === 'sync'){
            add_action('admin_footer', array($this, 'admin_footer_sync'), 1);
        }
        
    }
    
    
    /**
     * admin_enqueue_scripts
     */
    function admin_enqueue_scripts(){
        
        // enqueue acfe admin (will also include acfe global + acf global)
        acf_enqueue_script('acf-extended-pro-admin');
    
        // localize text
        acf_localize_text(array(
            'Review local JSON changes' => __('Review local JSON changes', 'acf'),
            'Review local PHP changes'  => __('Review local PHP changes', 'acfe'),
            'Loading diff'              => __('Loading diff', 'acf'),
            'Sync changes'              => __('Sync changes', 'acf'),
        ));
        
    }
    
    
    /**
     * setup_sync
     */
    function setup_sync(){
        
        $items = acfe_module_get_local_items($this->module);
    
        foreach(array_keys($items) as $name){
        
            $item = $items[ $name ];
        
            if((empty($item['sync']['php']) && empty($item['sync']['json'])) || (empty($item['sync']['php']['action']) && empty($item['sync']['json']['action']))){
                unset($items[ $name ]);
            }
        
        }
    
        $this->sync = $items;
        
    }
    
    
    /**
     * check_sync
     */
    function check_sync(){
        
        // display notice on success redirect
        if(acf_maybe_get_GET('acfe_sync_complete')){
            
            $ids = array_map('intval', explode(',', acf_maybe_get_GET('acfe_sync_complete')));
            
            // Generate text.
            $text = sprintf(
                _n('Item synchronised.', '%s items synchronised.', count($ids), 'acf'),
                count( $ids )
            );
            
            // Append links to text.
            $links = array();
            foreach($ids as $id){
                $links[] = '<a href="' . get_edit_post_link($id) . '">' . get_the_title($id) . '</a>';
            }
            
            $text .= ' ' . implode( ', ', $links );
            
            // Add notice.
            acf_add_admin_notice($text, 'success');
            return;
            
        }
        
        // retrieve params
        $type = acf_maybe_get_GET('acfe_sync_source');
        $keys = array();
        
        // manual review sync
        if(acf_maybe_get_GET('acfe_sync_item')){
            $keys[] = sanitize_text_field($_GET['acfe_sync_item']);
            
        // bulk sync
        }elseif(acf_maybe_get_GET('post') && in_array(acf_maybe_get_GET('action2'), array('acfe_sync_db', 'acfe_sync_json', 'acfe_sync_php'))){
            
            $keys = array_map('sanitize_text_field', acf_maybe_get_GET('post'));
            if(acf_maybe_get_GET('action2') === 'acfe_sync_db'){
                $type = 'raw';
            }elseif(acf_maybe_get_GET('action2') === 'acfe_sync_json'){
                $type = 'json';
            }elseif(acf_maybe_get_GET('action2') === 'acfe_sync_php'){
                $type = 'php';
            }
            
        }
        
        if($keys && $type && $this->sync){
    
            check_admin_referer('bulk-posts');
    
            $new_ids = array();
            
            foreach($keys as $key){
    
                $sync = acfe_module_get_local_item($key, $this->module);
                
                if(!$sync){
                    continue;
                }
                
                $item = false;
                $revert_setting = false;
                
                if($type === 'raw'){
                    $item = $sync;
                }elseif(!empty($sync['sync'][ $type ])){
                    
                    // $type = json|php
                    $item = $sync['sync'][ $type ]['item'];
                    
                    // disable php/json sync to avoid updating file
                    if(acfe_get_setting($type)){
                        $revert_setting = $type;
                        acfe_update_setting($type, false);
                    }
                    
                }
                
                if($item){
                    
                    $item['ID'] = $sync['ID'];
                    unset($item['sync'], $item['local_file']);
                    
                    $result = $this->module->import_item($item);
                    $new_ids[] = $result['ID'];
                    
                    if($revert_setting){
                        acfe_update_setting($revert_setting, true);
                    }
                    
                }
                
            }
            
            if($new_ids){
                
                // redirect
                wp_redirect($this->get_current_admin_url('&acfe_sync_complete=' . implode(',', $new_ids)));
                exit;
                
            }
            
        }
        
    }
    
    
    /**
     * check_duplicate
     */
    function check_duplicate(){
        
        // sisplay notice on success redirect
        if(acf_maybe_get_GET('acfe_duplicate_complete')){
            
            $ids = array_map('intval', explode(',', $_GET['acfe_duplicate_complete']));
            
            // generate text
            $text = sprintf(_n('Item duplicated.', '%s items duplicated.', count($ids), 'acf'), count($ids));
            
            // append links to text
            $links = array();
            foreach($ids as $id){
                $links[] = '<a href="' . get_edit_post_link( $id ) . '">' . get_the_title( $id ) . '</a>';
            }
            $text .= ' ' . implode( ', ', $links );
            
            // add notice
            acf_add_admin_notice( $text, 'success' );
            return;
            
        }
        
        // find items to duplicate
        $ids = array();
        if(isset($_GET['acfe_duplicate_item'])){
            $ids[] = intval($_GET['acfe_duplicate_item']);
        } elseif(isset($_GET['post'], $_GET['action2']) && $_GET['action2'] === 'acfe_duplicate_item'){
            $ids = array_map('intval', $_GET['post']);
        }
        
        if($ids){
            
            check_admin_referer('bulk-posts');
            
            // duplicate items and generate new ids
            $new_ids = array();
            foreach($ids as $id){
                
                // todo: fix duplicated item which doesn't have (copy) suffix in local sync files
                $item = $this->module->duplicate_item($id);
                $new_ids[] = $item['ID'];
                
            }
            
            // redirect
            wp_redirect($this->get_admin_url('&acfe_duplicate_complete=' . implode(',', $new_ids)));
            exit;
            
        }
        
    }
    
    
    /**
     * admin_views
     *
     * views_edit-post_type
     *
     * @param $views
     *
     * @return mixed
     */
    function admin_views($views){
        
        // global
        global $wp_list_table, $wp_query;
    
        // count items
        $count = count($this->sync);
    
        // append 'sync' link to subnav
        if($count){
            
            $link = array(
                'href' => esc_url($this->get_admin_url('&post_status=sync')),
                'class' => $this->view === 'sync' ? 'current' : '',
            );
            
            $views['sync'] = '<a ' . acf_esc_atts($link) . '>' . esc_html(__('Sync available', 'acf')) . ' ' . "<span class='count'>({$count})</span>" . '</a>';
            
        }
    
        // modify table pagination args to match JSON data
        if($this->view === 'sync'){
            
            $wp_list_table->set_pagination_args(array(
                'total_items' => $count,
                'total_pages' => 1,
                'per_page'    => $count,
            ));
    
            // at least one post is needed to render bulk drop-down
            $wp_query->post_count = 1;
    
            // fix undefined post_status & post_date inline_edit() when there is no post in the post type
            global $post;
            $post = new stdClass();
            $post->post_status = false;
            $post->post_date = false;
            
        }
        
        return $views;
    
    }
    
    
    /**
     * edit_row_actions
     *
     * @param $actions
     * @param $post
     *
     * @return int[]|mixed|string[]
     */
    function edit_row_actions($actions, $post){
        
        // hide on 'trash' post status
        if(!in_array($post->post_status, array('publish', 'acf-disabled'))){
            return $actions;
        }
    
        // append 'duplicate' action
        $duplicate_action_url = $this->get_admin_url('&acfe_duplicate_item=' . $post->ID . '&_wpnonce=' . wp_create_nonce('bulk-posts'));
        $actions['acfe_duplicate_item'] = '<a href="' . esc_url($duplicate_action_url) . '" aria-label="' . esc_attr__('Duplicate this item', 'acf') . '">' . __('Duplicate', 'acf') . '</a>';
    
        // return actions in custom order.
        $order = array('edit', 'acfe_duplicate_item', 'trash');
        return array_merge(array_flip($order), $actions);
        
    }
    
    
    /**
     * admin_bulk_actions
     *
     * @param $actions
     *
     * @return array|mixed
     */
    function admin_bulk_actions($actions){
    
        // add 'duplicate' action
        if($this->view !== 'sync'){
            $actions['acfe_duplicate_item'] = __('Duplicate', 'acf');
        }
    
        // add 'sync' action
        if($this->sync){
            
            if($this->view === 'sync'){
                $actions = array();
            }
            
            $actions['acfe_sync_db'] = __('Sync from Database', 'acfe');
            $actions['acfe_sync_json'] = __('Sync from JSON file', 'acfe');
            $actions['acfe_sync_php'] = __('Sync from PHP file', 'acfe');
            
        }
        
        return $actions;
        
    }
    
    
    /**
     * admin_footer_sync
     */
    function admin_footer_sync(){
        
        // global
        global $wp_list_table, $module;
        
        // get columns
        $columns = $wp_list_table->get_columns();
        $hidden  = get_hidden_columns($wp_list_table->screen);
        
        ?>
        <table>
            <tbody id="acf-the-list">
            <?php foreach($this->sync as $name => $item): ?>
                
                <tr>
                    <?php foreach($columns as $column => $label): ?>
                        
                        <?php
                        $el = 'td';
                        
                        if($column === 'cb' ){
                            $el           = 'th';
                            $classes      = 'check-column';
                            $label = '';
                        }elseif($column === 'title'){
                            $classes = "$column column-$column column-primary";
                        }else{
                            $classes = "$column column-$column";
                        }
                        
                        if(in_array($column, $hidden, true)){
                            $classes .= ' hidden';
                        }
                        
                        echo "<$el class=\"$classes\" data-colname=\"$label\">";
                    
                        switch($column){
                        
                            // checkbox
                            case 'cb':
                                echo '<label for="cb-select-' . esc_attr($name) . '" class="screen-reader-text">' . esc_html(sprintf(__('Select %s', 'acf'), $item['label'])) . '</label>';
                                echo '<input id="cb-select-' . esc_attr($name) . '" type="checkbox" value="' . esc_attr($name) . '" name="post[]">';
                                break;
                        
                            // title
                            case 'title':
                                $post_state = '';
                                if(!$item['active']){
                                    $post_state = ' — <span class="post-state"><span class="dashicons dashicons-hidden acf-js-tooltip" title="' . _x('Disabled', 'post status', 'acf') . '"></span></span>';
                                }
                                echo '<strong><span class="row-title">' . esc_html($item['label']) . '</span>' . $post_state . '</strong>';
                                
                                echo '<div class="row-actions">' . $module->get_label() . '</div>';
                                echo '<button type="button" class="toggle-row"><span class="screen-reader-text">Show more details</span></button>';
                                break;
                        
                            // other columns
                            default:
                            
                                // actions
                                $this->module->do_module_action('acfe/module/edit_columns_html', $column, $item);
                                break;
                        
                        }
                        
                        echo "</$el>"; ?>
                    
                    <?php endforeach; ?>
                </tr>
        
            <?php endforeach; ?>
            </tbody>
        </table>
        <script type="text/javascript">
            (function($){
                $('#the-list').html($('#acf-the-list').children());
            })(jQuery);
        </script>
        <?php
    }
    
    
    /**
     * edit_columns
     *
     * acfe/module/edit_columns
     *
     * @param $columns
     * @param $module
     *
     * @return mixed
     */
    function edit_columns($columns, $module){
        
        $instance = acf_get_instance('acfe_module_local');
        
        if($instance->is_php_enabled() || $instance->is_json_enabled()){
            $columns['acfe-load'] = __('Load', 'acfe');
        }
        
        if($instance->is_php_enabled()){
            $columns['acfe-autosync-php'] = __('PHP', 'acfe');
        }
        
        if($instance->is_json_enabled()){
            $columns['acfe-autosync-json'] = __('Json', 'acfe');
        }
        
        return $columns;
        
    }
    
    
    /**
     * edit_columns_html
     *
     * acfe/module/edit_columns_html
     *
     * @param $column
     * @param $item
     * @param $module
     */
    function edit_columns_html($column, $item, $module){
        
        switch($column){
            
            // load
            case 'acfe-load':
                
                $this->render_column_load_html($item, $module);
                break;
            
            // php Sync
            case 'acfe-autosync-php':
                
                $this->render_column_autosync_html($item, 'php', $module);
                break;
            
            // json sync
            case 'acfe-autosync-json':
                
                $this->render_column_autosync_html($item, 'json', $module);
                break;
            
        }
        
    }
    
    
    /**
     * render_column_load_html
     *
     * @param $item
     * @param $module
     */
    function render_column_load_html($item, $module){
        
        $local_item = $module->get_local_item($item['name']);
        
        if(!$local_item || $local_item['local'] === 'db'){
            echo '<span>DB</span>';
            
        }elseif($local_item['local'] === 'php'){
            echo '<span>php</span>';
            
        }elseif($local_item['local'] === 'json'){
            echo '<span>Json</span>';
        }
        
    }
    
    
    /**
     * render_column_autosync_html
     *
     * @param $item
     * @param $type
     * @param $module
     */
    function render_column_autosync_html($item, $type, $module){
        
        $data = acfe_module_get_local_item_status($item, $type, $module);
        $wrapper = array('class' => '');
        $icons = array();
        
        if($data['class']){
            $wrapper['class'] = $data['class'];
        }
        
        if($data['message_posts']){
            $wrapper['class'] .= ' acf-js-tooltip';
            $wrapper['title'] = $data['message_posts'];
        }
        
        if($data['icon']){
            $icons[] = '<span class="dashicons dashicons-' . $data['icon'] . '"></span>';
        }
        
        if($data['warning']){
            $icons[] = '<span class="dashicons dashicons-warning"></span>';
        }
        
        ?>
        <span <?php echo acf_esc_atts($wrapper); ?>>
            
            <?php

            if($data['wrapper_start']){ echo $data['wrapper_start']; }

            echo implode('', $icons);

            if($data['wrapper_end']){ echo $data['wrapper_end']; }
            
            ?>
            
        </span>
        <?php
        
    }
    
    
    /**
     * get_admin_url
     *
     * @param $params
     *
     * @return string
     */
    function get_admin_url($params = ''){
        return admin_url("edit.php?post_type={$this->module->post_type}{$params}");
    }
    
    
    /**
     * get_current_admin_url
     *
     * @param $params
     *
     * @return string
     */
    function get_current_admin_url($params = ''){
        return $this->get_admin_url(($this->view ? '&post_status=' . $this->view : '') . $params);
    }
    
}

acf_new_instance('acfe_pro_module_posts');

endif;