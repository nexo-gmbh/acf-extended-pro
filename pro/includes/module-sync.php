<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_module_sync_ajax_diff')):

class acfe_module_sync_ajax_diff extends ACF_Ajax{
    
    // vars
    var $action = 'acfe/ajax/module_local_diff';
    var $public = false;
    
    /**
     * get_response
     *
     * @param $request
     *
     * @return array|WP_Error
     */
    function get_response($request){
        
        // vars
        $id = is_numeric($this->get('id')) ? intval($this->get('id')) : $this->get('id');
        $module = acfe_get_module($this->get('module'));
        $nonce = $this->get('_nonce');
        
        // validate params
        if(!$id || !$module || !$nonce){
            return new WP_Error( 'acf_invalid_param', __('Invalid parameter(s).', 'acf'), array('status' => 404));
        }
        
        $sync = array(
            'type' => 'import',
            'item' => false,
            'items' => array()
        );
        
        // get raw item
        $raw_item = $module->get_raw_item($id);
        
        if($raw_item){
    
            // prepare item
            $raw_item['modified'] = get_post_modified_time('U', true, $raw_item['ID']);
            $raw_item             = $module->prepare_item_for_export($raw_item);
            
            $sync['item'] = $raw_item;
            $sync['type'] = 'sync';
            
        }
        
        // get sync item
        $sync_item = acfe_module_get_local_item($id, $module);
    
        if(!$sync_item){
            return new WP_Error('acf_cannot_compare', __('Sorry, this item is unavailable for diff comparison.', 'acf'), array('status' => 404));
        }
        
        foreach(array('php', 'json') as $type){
    
            if($sync_item['sync'][ $type ] && $sync_item['sync'][ $type ]['action']){
        
                $item = $sync_item['sync'][ $type ]['item'];
                $file = acf_extract_var($item, 'local_file');
                $item = $module->prepare_item_for_export($item);
        
                $sync['items'][] = array(
                    'type' => $type,
                    'file' => $file,
                    'item' => $item
                );
            
            }
            
        }
        
        if(empty($sync['items'])){
            return new WP_Error('acf_cannot_compare', __('Sorry, this item is unavailable for diff comparison.', 'acf'), array('status' => 404));
        }
        
        ob_start();
        ?>
        <div class="acf-diff acfe-diff <?php echo count($sync['items']) >= 2 ? 'three-columns' : ''; ?> <?php echo $sync['type']; ?>">
            <div class="acf-diff-title">
                
                <?php if(!empty($sync['item'])): ?>
                
                    <div class="acf-diff-title-left">
                        <strong><?php _e('Database item', 'acfe'); ?></strong>
                        <span class="date"><?php echo $this->get_date($sync['item']); ?></span>
                    </div>
                
                <?php endif; ?>
    
                <?php foreach($sync['items'] as $item): ?>

                    <div class="acf-diff-title-right">
                        <strong><?php echo $this->get_file_type_label($item['type']); ?></strong>
                        <span class="date"><?php echo $this->get_date($item['item']); ?></span>
                        <span class="file"><?php echo $this->get_file($item['file']); ?></span>
                    </div>
    
                <?php endforeach; ?>
                
            </div>
            <div class="acf-diff-content">
                <?php
                $original = $sync['type'] === 'sync' ? $sync['item'] : array();
                foreach($sync['items'] as $item): ?>
        
                    <?php echo wp_text_diff(acf_json_encode($original), acf_json_encode($item['item'])); ?>
    
                <?php endforeach; ?>
                
            </div>
        </div>
        <?php
        $content = ob_get_clean();
    
        ob_start();
        ?>
        <div class="acfe-diff-toolbar <?php echo count($sync['items']) >= 2 ? 'three-columns' : ''; ?> <?php echo $sync['type']; ?>">
            
            <div class="acfe-diff-toolbar-left">
                <?php $url = admin_url("edit.php?post_type={$module->post_type}&acfe_sync_item={$id}&acfe_sync_source=raw&_wpnonce={$nonce}"); ?>
                <a href="<?php echo esc_url($url); ?>" class="button button-primary"><?php _e('Sync from Database', 'acfe'); ?></a>
            </div>
            
            <?php foreach($sync['items'] as $item): ?>

                <div class="acfe-diff-toolbar-right">
                    <?php $url = admin_url("edit.php?post_type={$module->post_type}&acfe_sync_item={$id}&acfe_sync_source={$item['type']}&_wpnonce={$nonce}"); ?>
                    <a href="<?php echo esc_url($url); ?>" class="button button-primary"><?php echo $this->get_sync_from_label($item['type']); ?></a>
                </div>
        
            <?php endforeach; ?>
            
        </div>
        <?php
        $toolbar = ob_get_clean();
        
        return array(
            'content' => $content,
            'toolbar' => $toolbar,
        );
        
    }
    
    
    /**
     * get_sync_from_label
     *
     * @param $type
     *
     * @return string|void
     */
    function get_sync_from_label($type){
        
        if(is_array($type)){
            $type = acf_maybe_get($type, 'type', 'json');
        }
        
        return $type === 'json' ? __('Sync from JSON file', 'acfe') : __('Sync from PHP file', 'acfe');
        
    }
    
    
    /**
     * get_file_type_label
     *
     * @param $type
     *
     * @return string|void
     */
    function get_file_type_label($type){
    
        if(is_array($type)){
            $type = acf_maybe_get($type, 'type', 'json');
        }
    
        return $type === 'json' ? __('JSON file', 'acfe') : __('PHP file', 'acfe');
        
    }
    
    
    /**
     * get_date
     *
     * @param $modified
     *
     * @return string
     */
    function get_date($modified){
    
        if(is_array($modified)){
            $modified = acf_maybe_get($modified, 'modified');
        }
    
        $date_format   = get_option( 'date_format' ) . ' ' . get_option( 'time_format' );
        $date_template = __('Last updated: %s', 'acf');
        
        return sprintf($date_template, wp_date($date_format, $modified));
        
    }
    
    
    /**
     * get_file
     *
     * @param $file
     *
     * @return string
     */
    function get_file($file){
    
        if(is_array($file)){
            $file = acf_maybe_get($file, 'file');
        }
        
        return acfe_get_human_readable_location($file, true, false);
        
    }
    
}

acf_new_instance('acfe_module_sync_ajax_diff');

endif;