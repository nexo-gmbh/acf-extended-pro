<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_script_performance_converter')):

class acfe_script_performance_converter extends acfe_script{
    
    /**
     * initialize
     */
    function initialize(){
        
        $this->name         = 'performance_converter';
        $this->title        = 'Performance Converter';
        $this->description  = 'Convert posts, users, taxonomies & options pages meta to Performance Mode or back to normal';
        $this->recursive    = true;
        $this->category     = 'Maintenance';
        $this->author       = 'ACF Extended';
        $this->link         = 'https://www.acf-extended.com';
        $this->version      = '1.0';
    
        $config = acfe_get_performance_config();
        
        $this->field_groups = array(
    
            array(
                'title'             => 'Objects Settings',
                'key'               => 'group_acfe_performance_converter_top',
                'position'          => 'acf_after_title',
                'label_placement'   => 'top',
                'fields'            => array(
            
                    array(
                        'name' => 'col-1',
                        'type' => 'acfe_column',
                        'required' => 0,
                        'columns' => 'fill',
                        'endpoint' => 0,
                        'border' => array('column'),
                    ),
            
                    array(
                        'label'         => 'Post Types',
                        'name'          => 'post_types',
                        'type'          => 'acfe_post_types',
                        'instructions'  => '',
                        'required'      => false,
                        'toggle'        => true,
                        'field_type'    => 'checkbox',
                        'return_format' => 'name',
                    ),
            
                    array(
                        'name' => 'col-2',
                        'type' => 'acfe_column',
                        'required' => 0,
                        'columns' => 'fill',
                        'endpoint' => 0,
                        'border' => array('column'),
                    ),
            
                    array(
                        'label'         => 'Taxonomies',
                        'name'          => 'taxonomies',
                        'type'          => 'acfe_taxonomies',
                        'instructions'  => '',
                        'required'      => false,
                        'toggle'        => true,
                        'field_type'    => 'checkbox',
                        'return_format' => 'name',
                        'callback'      => array(
                            'prepare_field' => function($field){
                                
                                // exclude post format
                                unset($field['choices']['post_format']);
                                return $field;
                                
                            }
                        ),
                    ),
            
                    array(
                        'name' => 'col-3',
                        'type' => 'acfe_column',
                        'required' => 0,
                        'columns' => 'fill',
                        'endpoint' => 0,
                        'border' => array('column'),
                    ),
            
                    array(
                        'label'         => 'Users',
                        'name'          => 'users',
                        'type'          => 'acfe_user_roles',
                        'instructions'  => '',
                        'required'      => false,
                        'toggle'        => true,
                        'field_type'    => 'checkbox',
                        'return_format' => 'name',
                    ),
            
                    array(
                        'name' => 'col-4',
                        'type' => 'acfe_column',
                        'required' => 0,
                        'columns' => 'fill',
                        'endpoint' => 0,
                        'border' => array('column'),
                    ),
            
                    array(
                        'label'         => 'Options Pages',
                        'name'          => 'options_pages',
                        'type'          => 'acfe_options_pages',
                        'instructions'  => '',
                        'required'      => false,
                        'toggle'        => true,
                        'field_type'    => 'checkbox',
                        'return_format' => 'name',
                        'callback'      => array(
                            'render_field' => function($field){
    
                                $options_pages = acf_get_options_pages();
                                
                                if(empty($options_pages)){
                                    echo '<em>'; _e('No options pages', 'acfe'); echo '</em>';
                                }
                                
                            }
                        )
                    ),
        
                ),
    
            ),
    
            array(
                'title'             => 'Conversion Settings',
                'key'               => 'group_acfe_performance_converter_side',
                'position'          => 'side',
                'label_placement'   => 'top',
                'fields'            => array(
    
                    array(
                        'label'         => 'Engine',
                        'name'          => 'engine',
                        'type'          => 'acfe_dynamic_render',
                        'render'        => function(){
                            $config = acfe_get_performance_config();
                            ?><?php echo ucfirst($config['engine']); ?><?php
                        }
                    ),
    
                    array(
                        'label'         => 'Mode',
                        'name'          => 'mode',
                        'type'          => 'radio',
                        'instructions'  => '',
                        'default_value' => $config['mode'],
                        'choices' => array(
                            'test'       => __('Test Drive', 'acfe'),
                            'production' => __('Production', 'acfe'),
                            'rollback'   => __('Rollback', 'acfe'),
                        ),
                    ),
            
                    array(
                        'label'         => 'Items Per Request',
                        'name'          => 'items_per_request',
                        'type'          => 'number',
                        'instructions'  => 'Number of items processed per request',
                        'required'      => true,
                        'min'           => 1,
                        'default_value' => 50,
                    ),
    
                    array(
                        'label'         => 'Interactive Mode',
                        'name'          => 'interactive',
                        'type'          => 'true_false',
                        'instructions'  => 'Confirm meta conversion manually',
                        'ui'            => true,
                        'default_value' => 1,
                    ),
        
                ),
    
            ),

        );
        
        $this->data = array(
            'tasks'     => array(),
            'offset'    => -1,
            'converted' => 0,
        );
        
    }
    
    
    /**
     * admin_head
     */
    function admin_head(){
        
        ?>
        <style>
            .acf-field[data-name="post_types"],
            .acf-field[data-name="taxonomies"],
            .acf-field[data-name="users"],
            .acf-field[data-name="options_pages"]{
                max-height:205px;
                overflow-y:auto;
            }
        </style>
        <?php
        
    }
    
    /**
     * validate
     *
     * @return false|mixed|void
     */
    function validate(){
        
        // check module
        if(!acfe_is_performance_enabled()){
            return acfe_add_validation_error('', 'Performance module is disabled');
        }
    
        // get fields
        $post_types     = get_field('post_types');
        $taxonomies     = get_field('taxonomies');
        $users          = get_field('users');
        $options_pages  = get_field('options_pages');
    
        // check not empty
        if(empty($post_types) && empty($taxonomies) && empty($users) && empty($options_pages)){
            return acfe_add_validation_error('', 'Select at least one object type to convert: Post Type, Taxonomy, User or Options Page');
        }
        
    }
    
    
    /**
     * start
     */
    function start(){
    
        // Vars
        $total = 0;
    
        // Get fields
        $post_types     = get_field('post_types');
        $taxonomies     = get_field('taxonomies');
        $users          = get_field('users');
        $options_pages  = get_field('options_pages');
    
        // Post types
        if($post_types){
        
            // Assign task
            $this->data['tasks']['post_types'] = $post_types;
        
            // Add to total
            $total += $this->count_posts($post_types);
        
        }
    
        // Taxonomies
        if($taxonomies){
        
            // Assign task
            $this->data['tasks']['taxonomies'] = $taxonomies;
        
            // Add to total
            $total += $this->count_terms($taxonomies);
        
        }
    
        // Users
        if($users){
        
            // Assign task
            $this->data['tasks']['users'] = $users;
        
            // Add to total
            $total += $this->count_users($users);
        
        }
    
        // Options Pages
        if($options_pages){
        
            $this->data['tasks']['options_pages'] = $options_pages;
        
            // Add to total
            $total += count($options_pages);
        
        }
    
        // Update stats
        $this->stats['total'] = $total;
        $this->stats['left'] = $total;
    
        // Send Response
        $this->send_response(array(
            'message'   => 'Preparing tasks...',
            'status'    => 'success',
        ));
    
    }
    
    
    /**
     * stop
     */
    function stop(){
    
        $message = "Script finished.";
        $meta = $this->data['converted'] > 0 ? "Total meta converted: {$this->data['converted']}" : "No meta converted";
    
        // Send response
        $this->send_response(array(
            'message'   => "{$message} {$meta}",
            'status'    => 'success',
        ));
        
    }
    
    
    /**
     * request
     */
    function request(){
    
        // Vars
        $tasks = $this->data['tasks'];
        $interactive = get_field('interactive');
    
        // Override confirm if not interactive
        if(!$interactive){
            $this->confirm = true;
        }
    
        // Script finished
        if(!$tasks){
        
            // Send response
            $this->send_response(array(
                'event' => 'stop',
            ));
        
        }
    
        // Process tasks
        foreach(array_keys($tasks) as $task){
        
            // Method
            $method = "process_{$task}";
        
            // Execute
            $this->$method();
        
        }
    
    }
    
    
    /**
     * process_post_types
     */
    function process_post_types(){
        
        // Get task
        $post_types = acf_maybe_get($this->data['tasks'], 'post_types', array());
        $post_type = array_shift($post_types);
        
        // No post type to process
        if(!$post_type) return;
        
        // Get object
        $object = get_post_type_object($post_type);
        $count = $this->count_posts($post_type);
    
        // not allowed
        if(!acfe_is_object_type_performance_enabled('post', $post_type)){
        
            // Update data
            $this->data['offset'] = -1;
            $this->data['tasks']['post_types'] = $post_types; // array_shift() already removed current object
        
            // Send response
            $this->send_response(array(
                'message'   => "Processing: <strong>{$object->label}</strong>. This post type is excluded from Performance Mode",
                'status'    => 'error',
            ));
        
        }
        
        // Processing
        if($this->data['offset'] === -1){
            
            // Update data
            $this->data['offset'] = 0;
            
            // Send response
            $this->send_response(array(
                'message'   => "Processing: <strong>{$object->label}</strong> ({$count} post" . ($count > 1 ? 's' : '') . ")",
                'status'    => 'info',
            ));
            
        }
        
        // Items
        $items = get_posts(array(
            'post_type'         => $post_type,
            'post_status'       => 'any',
            'posts_per_page'    => get_field('items_per_request'),
            'fields'            => 'ids',
            'offset'            => $this->data['offset'],
        ));
        
        // Finished
        if(!$items){
            
            // Update data
            $this->data['offset'] = -1;
            $this->data['tasks']['post_types'] = $post_types; // array_shift() already removed current object
            
            // Empty response
            $this->send_response();
            
        }
        
        // Temp vars
        $left = $this->stats['left'];
        $offset = $this->data['offset'];
        $converted = $this->data['converted'];
        
        // Vars
        $found = array();
        
        // Loop items
        foreach($items as $item_id){
            
            // Vars
            $title = get_the_title($item_id);
            $link = admin_url("post.php?post={$item_id}&action=edit");
            
            // Meta
            $meta = $this->convert_meta($item_id, $this->confirm); // Confirm = true/false/null (confirm/cancel/doesn't exists)
            $count = count($meta);
            
            // Update vars
            $left--;
            $offset++;
            $converted += $this->confirm ? $count : 0;
            
            // No convert found
            if(!$meta) continue;
            
            $found['messages'][] = "{$object->labels->singular_name}: <a href='{$link}' target='_blank'>{$title}</a> - {$count} meta to convert";
            
            $found['debug'][] = array(
                'post_id'   => $item_id,
                'title'     => $title,
                'convert'   => $meta
            );
            
        }
        
        // Ask confirmation
        if($found && $this->confirm === null){
            
            $found['messages'][] = "Perform conversion?";
            
            // Send response
            $this->send_response(array(
                'message'   => $found['messages'],
                'debug'     => $found['debug'],
                'event'     => 'confirm',
                'status'    => 'warning',
            ));
            
        }
        
        // Reset confirm
        $this->confirm = null;
        
        // Update data
        $this->stats['left'] = $left;
        $this->data['offset'] = $offset;
        $this->data['converted'] = $converted;
        
        // Empty response
        $this->send_response();
        
    }
    
    
    /**
     * process_taxonomies
     */
    function process_taxonomies(){
        
        // Get task
        $taxonomies = acf_maybe_get($this->data['tasks'], 'taxonomies', array());
        $taxonomy = array_shift($taxonomies);
        
        // No taxonomy to process
        if(!$taxonomy) return;
        
        // Get object
        $object = get_taxonomy($taxonomy);
        $count = $this->count_terms($taxonomy);
    
        // not allowed
        if(!acfe_is_object_type_performance_enabled('term', $taxonomy)){
        
            // Update data
            $this->data['offset'] = -1;
            $this->data['tasks']['taxonomies'] = $taxonomies; // array_shift() already removed current object
        
            // Send response
            $this->send_response(array(
                'message'   => "Processing: <strong>{$object->label}</strong>. This taxonomy is excluded from Performance module",
                'status'    => 'error',
            ));
        
        }
        
        // Processing
        if($this->data['offset'] === -1){
            
            // Update data
            $this->data['offset'] = 0;
            
            // Send response
            $this->send_response(array(
                'message'   => "Processing: <strong>{$object->label}</strong> ({$count} term" . ($count > 1 ? 's' : '') . ")",
                'status'    => 'info',
            ));
            
        }
        
        // Items
        $items = get_terms(array(
            'taxonomy'  => $taxonomy,
            'number'    => get_field('items_per_request'),
            'fields'    => 'ids',
            'hide_empty'=> false,
            'offset'    => $this->data['offset']
        ));
        
        // Finished
        if(!$items){
            
            // Update data
            $this->data['offset'] = -1;
            $this->data['tasks']['taxonomies'] = $taxonomies; // array_shift() already removed current object
            
            // Empty response
            $this->send_response();
            
        }
        
        // Temp vars
        $left = $this->stats['left'];
        $offset = $this->data['offset'];
        $converted = $this->data['converted'];
        
        // Vars
        $found = array();
        
        // Loop items
        foreach($items as $item_id){
            
            // Vars
            $term = get_term($item_id, $taxonomy);
            $title = $term->name;
            $link = admin_url("term.php?taxonomy={$taxonomy}&tag_ID={$item_id}");
            
            // Meta
            $meta = $this->convert_meta("term_{$item_id}", $this->confirm); // Confirm = true/false/null (confirm/cancel/doesn't exists)
            $count = count($meta);
            
            // Update vars
            $left--;
            $offset++;
            $converted += $this->confirm ? $count : 0;
            
            // No convert found
            if(!$meta) continue;
            
            $found['messages'][] = "{$object->labels->singular_name}: <a href='{$link}' target='_blank'>{$title}</a> - {$count} meta to convert";
            
            $found['debug'][] = array(
                'term_id'   => $item_id,
                'name'      => $title,
                'convert'   => $meta
            );
            
        }
        
        // Ask confirmation
        if($found && $this->confirm === null){
            
            $found['messages'][] = "Perform conversion?";
            
            // Send response
            $this->send_response(array(
                'message'   => $found['messages'],
                'debug'     => $found['debug'],
                'event'     => 'confirm',
                'status'    => 'warning',
            ));
            
        }
        
        // Reset confirm
        $this->confirm = null;
        
        // Update data
        $this->stats['left'] = $left;
        $this->data['offset'] = $offset;
        $this->data['converted'] = $converted;
        
        // Empty response
        $this->send_response();
        
    }
    
    
    /**
     * process_users
     */
    function process_users(){
        
        // Get task
        $user_roles = acf_maybe_get($this->data['tasks'], 'users', array());
        $user_role = array_shift($user_roles);
        
        // No taxonomy to process
        if(!$user_role) return;

        // Get object
        global $wp_roles;
        $object = $wp_roles->roles[ $user_role ];
    
        // not allowed
        if(!acfe_is_object_type_performance_enabled('user', $user_role)){
        
            // Update data
            $this->data['offset'] = -1;
            $this->data['tasks']['users'] = $user_roles; // array_shift() already removed current object
        
            // Send response
            $this->send_response(array(
                'message'   => "Processing: <strong>{$object['name']}</strong>. This user role is excluded from Performance module",
                'status'    => 'error',
            ));
        
        }
        
        // Processing
        if($this->data['offset'] === -1){
            
            // Update data
            $this->data['offset'] = 0;
            
            // Count
            $count = $this->count_users($user_role);
            
            // Send response
            $this->send_response(array(
                'message'   => "Processing: <strong>{$object['name']}</strong> ({$count} user" . ($count > 1 ? 's' : '') . ")",
                'status'    => 'info',
            ));
            
        }
        
        // Items
        $items = get_users(array(
            'number'    => get_field('items_per_request'),
            'role'      => $user_role,
            'fields'    => 'ids',
            'offset'    => $this->data['offset'],
        ));
        
        // Finished
        if(!$items){
            
            // Update data
            $this->data['offset'] = -1;
            $this->data['tasks']['users'] = $user_roles; // array_shift() already removed current object
            
            // Empty response
            $this->send_response();
            
        }
        
        // Temp vars
        $left = $this->stats['left'];
        $offset = $this->data['offset'];
        $converted = $this->data['converted'];
        
        // Vars
        $found = array();
        
        // Loop items
        foreach($items as $item_id){
            
            // Vars
            $user = get_userdata($item_id);
            $title = $user->user_login;
            $link = admin_url("user-edit.php?user_id={$item_id}");
            
            // Meta
            $meta = $this->convert_meta("user_{$item_id}", $this->confirm); // Confirm = true/false/null (confirm/cancel/doesn't exists)
            $count = count($meta);
            
            // Update vars
            $left--;
            $offset++;
            $converted += $this->confirm ? $count : 0;
            
            // No convert found
            if(!$meta) continue;
            
            $found['messages'][] = "{$object['name']}: <a href='{$link}' target='_blank'>{$title}</a> - {$count} meta to convert";
            
            $found['debug'][] = array(
                'user_id'   => $item_id,
                'login'     => $title,
                'convert'   => $meta
            );
            
        }
        
        // Ask confirmation
        if($found && $this->confirm === null){
            
            $found['messages'][] = "Perform conversion?";
            
            // Send response
            $this->send_response(array(
                'message'   => $found['messages'],
                'debug'     => $found['debug'],
                'event'     => 'confirm',
                'status'    => 'warning',
            ));
            
        }
        
        // Reset confirm
        $this->confirm = null;
        
        // Update data
        $this->stats['left'] = $left;
        $this->data['offset'] = $offset;
        $this->data['converted'] = $converted;
        
        // Empty response
        $this->send_response();
        
    }
    
    
    /**
     * process_options_pages
     */
    function process_options_pages(){
        
        // Get task
        $options_pages = acf_maybe_get($this->data['tasks'], 'options_pages', array());
        
        // No taxonomy to process
        if(!$options_pages) return;
        
        // Processing
        if($this->data['offset'] === -1){
            
            // Update data
            $this->data['offset'] = 0;
            
            // Empty response
            $this->send_response();
            
        }
        
        // Items
        $items = array_slice($options_pages, $this->data['offset'], get_field('items_per_request'));
        
        // Finished
        if(!$items){
            
            // Update data
            $this->data['offset'] = -1;
            $this->data['tasks']['options_pages'] = array();
            
            // Empty response
            $this->send_response();
            
        }
        
        // Temp vars
        $left = $this->stats['left'];
        $offset = $this->data['offset'];
        $converted = $this->data['converted'];
        
        // Vars
        $found = array();
        
        // Loop items
        foreach($items as $item){
            
            // vars
            $object = acf_get_options_page($item);
            $item_id = $object['post_id'];
            $title = $object['page_title'];
            $link = admin_url("admin.php?page={$object['menu_slug']}");
    
            // not allowed
            if(!acfe_is_object_type_performance_enabled('option', $item_id)){
        
                // Update data
                $this->data['offset'] = -1;
                $this->data['tasks']['options_pages'] = array_diff($options_pages, array($item)); // Remove current object
        
                // Send response
                $this->send_response(array(
                    'message'   => "Processing: <strong>{$title}</strong>. This options page is excluded from Performance module",
                    'status'    => 'error',
                ));
        
            }
            
            // Meta
            $meta = $this->convert_meta($item_id, $this->confirm); // Confirm = true/false/null (confirm/cancel/doesn't exists)
            $count = count($meta);
            
            // Update vars
            $left--;
            $offset++;
            $converted += $this->confirm ? $count : 0;
            
            // No convert found
            if(!$meta) continue;
            
            $found['messages'][] = "Processing: <strong>{$title}</strong> - {$count} meta to convert";
            
            $found['debug'][] = array(
                'post_id'   => $item_id,
                'title'     => $title,
                'convert'   => $meta
            );
            
        }
        
        // Ask confirmation
        if($found && $this->confirm === null){
            
            $found['messages'][] = "Perform conversion?";
            
            // Send response
            $this->send_response(array(
                'message'   => $found['messages'],
                'debug'     => $found['debug'],
                'event'     => 'confirm',
                'status'    => 'warning',
            ));
            
        }
        
        // Reset confirm
        $this->confirm = null;
        
        // Update data
        $this->stats['left'] = $left;
        $this->data['offset'] = $offset;
        $this->data['converted'] = $converted;
        
        // Empty response
        $this->send_response();
        
    }
    
    
    /**
     * convert_meta
     *
     * @param $post_id
     * @param $confirm
     *
     * @return array
     */
    function convert_meta($post_id, $confirm = false){
    
        // inject mode
        add_filter('acfe/modules/performance/config', array($this, 'get_config'), 99);
    
        // vars
        $data = array();
        
        // update normal meta to performance
        $meta = acfe_do_performance_bypass(function($post_id){
            return acfe_get_meta($post_id);
        }, array($post_id));
        $update = $this->update_meta($meta, $post_id, $confirm);
        $data = array_merge($data, $update);
        
        // update compressed meta to performance
        // this trigger conversion from other engines too
        $meta = acfe_get_meta($post_id);
        $update = $this->update_meta($meta, $post_id, $confirm);
        $data = array_merge($data, $update);
        
        // other actions
        if($confirm){
    
            // convert engines meta
            acfe_do_performance_convert($post_id);
    
            // rollback
            if(get_field('mode') === 'rollback'){
                acfe_do_performance_rollback($post_id);
            }
            
        }
    
        remove_filter('acfe/modules/performance/config', array($this, 'get_config'), 99);
    
        return $data;
        
    }
    
    
    /**
     * update_meta
     *
     * @param $meta
     * @param $post_id
     * @param $confirm
     *
     * @return array
     */
    function update_meta($meta, $post_id, $confirm = false){
    
        // vars
        $data = array();
    
        // loop
        foreach($meta as $row){
        
            // vars
            $field = $row['field'];
            $key = $row['key'];
            $name = $row['name'];
            $value = $row['value'];
        
            // field not found
            if(!$field){
                continue;
            }
        
            // field exists & confirmed conversion
            if($confirm){
            
                // check Save as individual meta
                $save_as_meta = acf_maybe_get($field, 'acfe_save_meta');
            
                // enable filter to also save individually
                if($save_as_meta){
                    acf_enable_filter('acfe/performance_ultra/normal_save');
                }
            
                // update
                acf_update_metadata($post_id, $name, $key, true);
                acf_update_metadata($post_id, $name, $value);
            
                // disable filter
                if($save_as_meta){
                    acf_disable_filter('acfe/performance_ultra/normal_save');
                }
            
            }
        
            // add to data
            $data[ "_$name" ] = $key;
            $data[ $name ] = $value;
        
        }
        
        return $data;
        
    }
    
    
    /**
     * get_config
     *
     * @param $config
     *
     * @return mixed
     */
    function get_config($config){
    
        $config['mode'] = get_field('mode');
        return $config;
        
    }
    
    
    /**
     * count_posts
     *
     * @param $post_type
     *
     * @return int
     */
    function count_posts($post_type){
        
        $query = new WP_Query(array(
            'post_type'         => acf_get_array($post_type),
            'post_status'       => 'any',
            'posts_per_page'    => 1,
        ));
        
        return $query->found_posts;
        
    }
    
    
    /**
     * count_terms
     *
     * @param $taxonomy
     *
     * @return int[]|string|string[]|WP_Error|WP_Term[]
     */
    function count_terms($taxonomy){
        
        return wp_count_terms(array(
            'taxonomy'  => acf_get_array($taxonomy),
            'number'    => 1,
            'hide_empty'=> false,
        ));
        
    }
    
    
    /**
     * count_users
     *
     * @param $user_role
     *
     * @return int|mixed
     */
    function count_users($user_role){
        
        $count = count_users();
        $total = 0;
        
        foreach($count['avail_roles'] as $role => $c){
            
            if(!in_array($role, acf_get_array($user_role))) continue;
            
            $total += $c;
            
        }
        
        return $total;
        
    }
    
}

acfe_register_script('acfe_script_performance_converter');

endif;