<?php

if(!defined('ABSPATH')){
    exit;
}

// register store
acf_register_store('sync-files')->prop('multisite', true);

if(!class_exists('acfe_module_local')):

class acfe_module_local{
    
    /**
     * construct
     */
    function __construct(){
        
        // hooks
        add_action('acfe/module/add_local_item', array($this, 'add_local_item'), 10, 2);
        add_action('acfe/module/updated_item',   array($this, 'updated_item'), 10, 2);
        add_action('acfe/module/trashed_item',   array($this, 'deleted_item'), 10, 2);
        add_action('acfe/module/deleted_item',   array($this, 'deleted_item'), 10, 2);
        add_action('acfe/module/include_items',  array($this, 'include_items'), 5);
        
        // register settings
        $this->register_settings();
        
    }
    
    
    /**
     * is_php_enabled
     *
     * @return bool
     */
    function is_php_enabled(){
        return (bool) acfe_get_setting('php');
    }
    
    
    /**
     * is_json_enabled
     *
     * @return bool
     */
    function is_json_enabled(){
        return (bool) acfe_get_setting('json');
    }
    
    
    /**
     * add_local_item
     *
     * acfe/module/add_local_item
     *
     * @param $item
     * @param $module
     */
    function add_local_item($item, $module){
        
        // add each item to "local-any-my_module" store
        // this is used in $this->get_items() to compare item with manually added item by dev in theme with function such as acf_add_options_page()
        if(in_array($item['local'], array('php', 'json'))){
            acf_get_store("local-any-{$module->post_type}")->append($item);
        }
        
    }
    
    
    /**
     * updated_item
     *
     * acfe/module/updated_item
     *
     * @param $item
     * @param $module
     */
    function updated_item($item, $module){
        
        // on update
        if($item['ID']){
            
            // get raw item from db
            $raw_item = $module->get_item($item['ID']);
            
            // delete old file if name changed
            if($raw_item['name'] && $raw_item['name'] !== $item['name'] && !acf_is_filter_enabled('acfe/module/update_unique_name')){
                
                if(acfe_has_php_sync($item)){
                    $this->delete_php_file($raw_item, $module, true);
                }
                
                if(acfe_has_json_sync($item)){
                    $this->delete_json_file($raw_item, $module, true);
                }
                
            }
            
        }
    
        // php
        if(acfe_has_php_sync($item)){
            $this->save_php_file($item, $module);
        }else{
            $this->delete_php_file($item, $module);
        }
    
        // json
        if(acfe_has_json_sync($item)){
            $this->save_json_file($item, $module);
        }else{
            $this->delete_json_file($item, $module);
        }
        
    }
    
    
    /**
     * deleted_item
     *
     * acfe/module/deleted_item
     *
     * @param $item
     * @param $module
     */
    function deleted_item($item, $module){
    
        // wp appends '__trashed' to end of 'name' (post_name)
        $item['name'] = str_replace('__trashed', '', $item['name']);
        
        // delete files
        $this->delete_files($item, $module);
        
    }
    
    
    /**
     * include_items
     *
     * acfe/module/include_items
     *
     * @param $module
     */
    function include_items($module){
        
        // php sync
        if($this->is_php_enabled()){
            
            // scan files
            $files = $this->scan_php_folders($module);
            
            // add sync files
            $this->add_files($files);
            
            // temporarly disable __() translation
            add_filter('gettext', array($this, 'disable_gettext'), 10, 3);
            
            // loop files
            foreach($files as $file){
                
                // load item
                require_once($file);
                
            }
    
            // re-enable translation
            remove_filter('gettext', array($this, 'disable_gettext'), 10);
            
        }
    
        // json sync
        if($this->is_json_enabled()){
        
            // scan files
            $files = $this->scan_json_folders($module);
    
            // add sync files
            $this->add_files($files);
            
            // loop files
            foreach($files as $file){
    
                // add data
                $json               = json_decode(file_get_contents($file), true);
                $json['local']      = 'json';
                $json['local_file'] = $file;
                
                // load item
                $module->add_local_item($json);
            
            }
        
        }
        
    }
    
    
    /**
     * save_php_file
     *
     * @param $item
     * @param $module
     *
     * @return false|int
     */
    function save_php_file($item, $module){
        
        // validate
        if(!$this->is_php_enabled()){
            return false;
        }
        
        // vars
        $path = $this->get_php_save_path($item, $module);
        $file = untrailingslashit($path) . '/' . $item['name'] . '.php';
    
        if(!is_writable($path)){
            return false;
        }
    
        // translation
        $l10n = acf_get_setting('l10n');
        $l10n_textdomain = acf_get_setting('l10n_textdomain');
    
        if($l10n && $l10n_textdomain){
        
            acf_update_setting('l10n_var_export', true);
        
            $item = $module->translate_item($item);
        
            acf_update_setting('l10n_var_export', false);
        
        }
    
        // cleanup keys
        $data = $module->prepare_item_for_export($item);
    
        // append modified time
        if($item['ID']){
            $data['modified'] = get_post_modified_time('U', true, $item['ID']);
        }else{
            $data['modified'] = strtotime('now');
        }
    
        ob_start();
    
        echo "<?php " . "\r\n" . "\r\n";
    
        // code
        $code = acfe_var_export($data, false);
    
        // echo
        echo $module->export_local_code($code, $data) . "\r\n" . "\r\n";
    
        $output = ob_get_clean();
    
        // save and return true if bytes were written
        $result = file_put_contents($file, $output);
        
        // clear file opcache
        if(function_exists('opcache_invalidate')){
            opcache_invalidate($file);
        }
        
        return $result;
        
    }
    
    
    /**
     * save_json_file
     *
     * @param $item
     * @param $module
     *
     * @return false|int
     */
    function save_json_file($item, $module){
        
        // validate
        if(!$this->is_json_enabled()){
            return false;
        }
    
        // vars
        $path = $this->get_json_save_path($item, $module);
        $file = untrailingslashit($path) . '/' . $item['name'] . '.json';
    
        if(!is_writable($path)){
            return false;
        }
        
        // cleanup keys
        $data = $module->prepare_item_for_export($item);
    
        // append modified time
        if($item['ID']){
            $data['modified'] = get_post_modified_time('U', true, $item['ID']);
        }else{
            $data['modified'] = strtotime('now');
        }
    
        // save and return true if bytes were written
        $result = file_put_contents($file, acf_json_encode($data));
        
        return $result;
        
    }
    
    
    /**
     * delete_files
     *
     * @param $item
     * @param $module
     * @param $force_delete
     *
     * @return void
     */
    function delete_files($item, $module, $force_delete = false){
    
        // save php
        $this->delete_php_file($item, $module, $force_delete);
    
        // save json
        $this->delete_json_file($item, $module, $force_delete);
        
    }
    
    
    /**
     * delete_php_file
     *
     * @param $item
     * @param $module
     */
    function delete_php_file($item, $module, $force_delete = false){
    
        // validate
        if(!$this->is_php_enabled()){
            return;
        }
        
        // check force delete
        if(!$force_delete){
            
            // filters
            $delete = true;
            $delete = apply_filters("acfe/settings/should_delete_php/{$module->plural}",                      $delete, $item);
            $delete = apply_filters("acfe/settings/should_delete_php/{$module->plural}/ID={$item['ID']}",     $delete, $item);
            $delete = apply_filters("acfe/settings/should_delete_php/{$module->plural}/name={$item['name']}", $delete, $item);
            
            // do not delete
            if(!$delete){
                return;
            }
            
        }
        
        // vars
        $path = $this->get_php_save_path($item, $module);
        $file = untrailingslashit($path) . '/' . $item['name'] . '.php';
        
        // delete
        if(is_readable($file)){
            unlink($file);
        }
        
    }
    
    
    /**
     * delete_json_file
     *
     * @param $item
     * @param $module
     */
    function delete_json_file($item, $module, $force_delete = false){
    
        // validate
        if(!$this->is_json_enabled()){
            return;
        }
        
        // check force delete
        if(!$force_delete){
            
            // filters
            $delete = true;
            $delete = apply_filters("acfe/settings/should_delete_json/{$module->plural}",                      $delete, $item);
            $delete = apply_filters("acfe/settings/should_delete_json/{$module->plural}/ID={$item['ID']}",     $delete, $item);
            $delete = apply_filters("acfe/settings/should_delete_json/{$module->plural}/name={$item['name']}", $delete, $item);
            
            // do not delete
            if(!$delete){
                return;
            }
            
        }
        
        // vars
        $path = $this->get_json_save_path($item, $module);
        $file = untrailingslashit($path) . '/' . $item['name'] . '.json';
        
        // delete
        if(is_readable($file)){
            unlink($file);
        }
        
    }
    
    
    /**
     * scan_php_folders
     *
     * @param $module
     *
     * @return array
     */
    function scan_php_folders($module){
        
        $php_files = array();
        $paths = $this->get_php_load_path($module);
        
        foreach($paths as $path){
            
            $path = untrailingslashit($path);
            
            if(!is_dir($path)){
                continue;
            }
            
            $files = glob("{$path}/*.php");
            
            if(!$files){
                continue;
            }
            
            foreach($files as $file){
                
                //$key = pathinfo($file, PATHINFO_FILENAME);
                $php_files[] = wp_normalize_path($file);
                
            }
            
        }
        
        return $php_files;
        
    }
    
    
    /**
     * scan_json_folders
     *
     * @param $module
     *
     * @return array
     */
    function scan_json_folders($module){
        
        $json_files = array();
        $paths = $this->get_json_load_path($module);
        
        foreach($paths as $path){
            
            if(!is_dir($path)){
                continue;
            }
            
            $files = scandir($path);
            if(!$files){
                continue;
            }
            
            foreach($files as $filename){
                
                // ignore hidden files
                if($filename[0] === '.'){
                    continue;
                }
                
                // ignore sub directories
                $file = untrailingslashit($path) . '/' . $filename;
                if(is_dir($file)){
                    continue;
                }
                
                // ignore non json files
                $ext = pathinfo($filename, PATHINFO_EXTENSION);
                if($ext !== 'json'){
                    continue;
                }
                
                // read json data
                $json = json_decode(file_get_contents($file), true);
                
                // remove old check on $json['name'] as options-pages don't have it
                // if(!is_array($json) || !isset($json['name']))
                
                if(!is_array($json)){
                    continue;
                }
                
                // append data.
                $json_files[] = wp_normalize_path($file);
                
            }
            
        }
        
        return $json_files;
        
    }
    
    
    /**
     * add_files
     *
     * @param $files
     */
    function add_files($files){
        
        $store = acf_get_store('sync-files');
        
        foreach(acf_get_array($files) as $file){
            $store->append($file);
        }
        
    }
    
    
    /**
     * get_files
     * @return array|mixed|null
     */
    function get_files(){
        return acf_get_store('sync-files')->get();
    }
    
    
    /**
     * get_item
     *
     * @param $id
     * @param $module
     *
     * @return false|mixed
     */
    function get_item($id, $module){
        
        // defaults
        $field = is_numeric($id) ? 'ID' : 'name';
        $items = $this->get_items($module);
        
        // generate map to search in
        $map = wp_list_pluck($items, $field);
        $key = array_search($id, $map);
        
        // item found by id
        if($key !== false){
            return $items[ $key ];
        }
        
        // return
        return false;
        
    }
    
    
    /**
     * get_items
     *
     * @param $module
     *
     * @return array
     */
    function get_items($module){
        
        $files = $this->get_files();
        $items = array();
        $local_items = array();
        
        // compare found files with local registered items
        // to make sure we only use "sync" items (and not items added manually by devs in theme)
        foreach($files as $file){
            
            $local_item = acf_get_store("local-any-{$module->post_type}")->query(array('local_file' => $file));
            
            if($local_item){
                $local_items[] = current($local_item);
            }
            
        }
        
        foreach($local_items as $local_item){
            
            // extract vars
            $name = acf_maybe_get($local_item, 'name');
            
            if(isset($items[ $name ])){
                continue;
            }
            
            $local_item = wp_parse_args($local_item, array(
                'ID' => 0,
            ));
            
            // generate item
            $items[ $name ] = $local_item;
            
            // assign raw item data
            $raw_item = $module->get_raw_item($name);
            
            if($raw_item){
                $items[ $name ] = $raw_item;
            }
            
            $items[ $name ]['sync'] = array(
                'php'  => false,
                'json' => false,
            );
            
        }
        
        // loop over items and update/append local.
        foreach($local_items as $local_item){
            
            // extract vars
            $name     = acf_maybe_get($local_item, 'name');
            $local    = acf_maybe_get($local_item, 'local');
            $file     = acf_maybe_get($local_item, 'local_file');
            $modified = acf_maybe_get($local_item, 'modified');
            $private  = acf_maybe_get($local_item, 'private');
            
            if($private || !in_array($local, array('php', 'json'))){
                continue;
            }
            
            $items[ $name ]['sync'][ $local ] = array();
            $items[ $name ]['sync'][ $local ]['action'] = false;
            $items[ $name ]['sync'][ $local ]['file'] = $file;
            $items[ $local_item['name'] ]['sync'][ $local_item['local'] ]['item'] = $local_item;
            
            // append to sync if not yet in db posts
            if(!$items[ $name ]['ID']){
                $items[ $name ]['sync'][ $local ]['action'] = 'import';
                
            // append to sync if modified time is newer than database
            //}elseif($modified && $modified > get_post_modified_time('U', true, $items[ $name ]['ID'])){
            }else{
                
                $_item = $items[ $name ];
                unset($_item['sync']);
                $_item['modified'] = get_post_modified_time('U', true, $_item['ID']);
                
                $_local_item = $local_item;
                unset($_local_item['local_file']);
                
                $_item = $module->prepare_item_for_export($_item);
                $_local_item = $module->prepare_item_for_export($_local_item);
                
                $raw_item_serialized = maybe_serialize($_item);
                $local_item_serialized = maybe_serialize($_local_item);
                
                if($raw_item_serialized !== $local_item_serialized){
                    $items[ $name ]['sync'][ $local ]['action'] = 'sync';
                }
                
                
            }
            
        }
        
        return $items;
        
    }
    
    /**
     * get_item_sync_status
     *
     * @param $item
     * @param $type    'php' | 'json'
     * @param $module
     *
     * @return array|object
     */
    function get_item_status($item, $type, $module){
        
        $local_item = $this->get_item($item['name'], $module);
        
        // local sync files found
        if($local_item && $local_item['sync'][ $type ]){
            
            $sync = $local_item['sync'][ $type ];
            $file = acfe_get_human_readable_location($sync['file']);
            
            // sync available (sync | import)
            if($sync['action']){
                
                $attrs = array(
                    'href'        => '#',
                    'data-event'  => 'review-sync',
                    'data-module' => $module->name,
                    'data-nonce'  => wp_create_nonce('bulk-posts'),
                );
                
                // sync
                if($sync['action'] === 'sync'){
                    
                    $attrs['data-id'] = $item['ID'];
                    
                    $return = array(
                        'status'        => 'sync_available',
                        'message_posts' => __('Sync available', 'acfe') . '. ' . $file,
                        'message_post'  => $file,
                        'icon'          => 'update',
                        'wrapper_start' => '<a ' . acf_esc_atts($attrs) . '>',
                        'wrapper_end'   => '<div class="row-actions"><span class="review" style="color:#006799;">' . __('Review', 'acfe') . '</span></div></a>',
                    );
                    
                // import
                }elseif($sync['action'] === 'import'){
                    
                    $attrs['data-id'] = $item['name'];
                    
                    $return = array(
                        'status'        => 'import',
                        'message_posts' => __('Import available', 'acfe') . '. ' . $file,
                        'message_post'  => $file,
                        'icon'          => 'download',
                        'wrapper_start' => '<a ' . acf_esc_atts($attrs) . '>',
                        'wrapper_end'   => '<div class="row-actions"><span class="review" style="color:#006799;">' . __('Review', 'acfe') . '</span></div></a>',
                    );
                    
                }
                
            // already synchronized
            }else{
                
                $return = array(
                    'message_posts' => __('Synchronized', 'acfe') . '. ' . $file,
                    'message_post'  => $file,
                    'icon'          => 'yes',
                );
                
            }
            
        // no local sync files found
        }else{
            
            // post_types/json_save
            // post_types/php_save
            if($type === 'php'){
                $path = $this->get_php_save_path($item, $module);
            }else{
                $path = $this->get_json_save_path($item, $module);
            }
            
            $item_has_sync = in_array($type, (array) acf_maybe_get($item, 'acfe_autosync', array()));
            
            // sync enabled in item settings
            if($item_has_sync){
                
                $path_readable = acfe_get_human_readable_location($path, true, false);
                
                $return = array(
                    'status'        => 'awaiting_save',
                    'message_posts' => __('Awaiting save', 'acf') . '. <br />' . __('Save path', 'acf') . ' ' . lcfirst($path_readable),
                    'message_post'  => __('Awaiting save', 'acf') . '. <br />' . __('Save path', 'acf') . ' ' . lcfirst($path_readable),
                    'class'         => 'secondary',
                    'warning'       => true,
                    'icon'          => 'yes',
                );
                
            // sync disabled in item settings
            }else{
                
                $path_readable = acfe_get_human_readable_location($path);
                
                $return = array(
                    'status'        => 'none',
                    'message_post'  => __('Save path', 'acf') . ' ' . lcfirst($path_readable),
                    'class'         => 'secondary',
                    'icon'          => 'no-alt',
                );
                
            }
            
        }
        
        $return = wp_parse_args($return, array(
            'status'        => '',
            'message_posts' => false,
            'message_post'  => false,
            'class'         => false,
            'warning'       => false,
            'icon'          => 'no-alt',
            'wrapper_start' => false,
            'wrapper_end'   => false,
        ));
        
        return $return;
        
    }
    
    
    /**
     * get_php_save_path
     *
     * @param $item
     * @param $module
     *
     * @return mixed|null
     */
    function get_php_save_path($item, $module){
        
        // default
        $path = acfe_get_setting("php_save/{$module->plural}");
        
        // filters
        $path = apply_filters("acfe/settings/php_save/{$module->plural}/all",                  $path, $item);
        $path = apply_filters("acfe/settings/php_save/{$module->plural}/ID={$item['ID']}",     $path, $item);
        $path = apply_filters("acfe/settings/php_save/{$module->plural}/name={$item['name']}", $path, $item);
        
        // return path
        return $path;
        
    }
    
    
    /**
     * get_php_load_path
     *
     * @param $module
     *
     * @return mixed|null
     */
    function get_php_load_path($module){
        return acfe_get_setting("php_load/{$module->plural}");
    }
    
    
    /**
     * get_json_save_path
     *
     * @param $item
     * @param $module
     *
     * @return mixed|null
     */
    function get_json_save_path($item, $module){
        
        // default
        $path = acfe_get_setting("json_save/{$module->plural}");
        
        // filters
        $path = apply_filters("acfe/settings/json_save/{$module->plural}/all",                  $path, $item);
        $path = apply_filters("acfe/settings/json_save/{$module->plural}/ID={$item['ID']}",     $path, $item);
        $path = apply_filters("acfe/settings/json_save/{$module->plural}/name={$item['name']}", $path, $item);
        
        // return path
        return $path;
        
    }
    
    
    /**
     * get_json_load_path
     *
     * @param $module
     *
     * @return mixed|null
     */
    function get_json_load_path($module){
        return acfe_get_setting("json_load/{$module->plural}");
    }
    
    
    /**
     * register_settings
     */
    function register_settings(){
        
        // acfe
        $acfe = acfe();
        
        // vars
        $settings = array(
            'php' => array(
                'save' => acfe_get_setting('php_save'),
                'load' => (array) acfe_get_setting('php_load'),
            ),
            'json' => array(
                'save' => acfe_get_setting('json_save'),
                'load' => (array) acfe_get_setting('json_load'),
            ),
        );
        
        // loop modules
        foreach(acfe_get_modules() as $module){
            
            if(!$module->is_active()){
                continue;
            }
            
            foreach(array('php', 'json') as $type){
                
                // prepare load paths
                $load_paths = array_map(function($path) use($module){
                    
                    // "themes/my-theme/acfe-php/post-types"
                    return "{$path}/{$module->export_files['multiple']}";
                    
                }, $settings[ $type ]['load']);
                
                // register settings
                $acfe->settings(array(
                    
                    // 'php_save/post_types' => "themes/my-theme/acfe-php/post-types",
                    "{$type}_save/{$module->plural}" => "{$settings[ $type ]['save']}/{$module->export_files['multiple']}",
                    
                    // 'php_load/post_types' => array("themes/my-theme/acfe-php/post-types"),
                    "{$type}_load/{$module->plural}" => $load_paths,
                
                ));
                
            }
            
        }
        
    }
    
    
    /**
     * disable_gettext
     *
     * @param $translation
     * @param $text
     * @param $domain
     *
     * @return mixed
     */
    function disable_gettext($translation, $text, $domain){
        
        // always return native text
        return $text;
    }
    
}

acf_new_instance('acfe_module_local');

endif;

/**
 * acfe_module_get_local_item
 *
 * @param $id
 * @param $module
 *
 * @return mixed
 */
function acfe_module_get_local_item($id, $module){
    return acf_get_instance('acfe_module_local')->get_item($id, $module);
}


/**
 * acfe_module_get_local_item_status
 *
 * @param $item
 * @param $type
 * @param $module
 *
 * @return mixed
 */
function acfe_module_get_local_item_status($item, $type, $module){
    return acf_get_instance('acfe_module_local')->get_item_status($item, $type, $module);
}


/**
 * acfe_module_get_local_items
 *
 * @param $module
 *
 * @return mixed
 */
function acfe_module_get_local_items($module){
    return acf_get_instance('acfe_module_local')->get_items($module);
}