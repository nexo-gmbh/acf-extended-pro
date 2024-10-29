<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_pro_field_group_hide_on_screen')):

class acfe_pro_field_group_hide_on_screen{
    
    /**
     * construct
     */
    function __construct(){
        
        add_action('acf/field_group/admin_head',    array($this, 'admin_head'));
        add_filter('acf/get_field_group_style',     array($this, 'get_field_group_style'), 10, 2);
        
    }
    
    
    /**
     * admin_head
     */
    function admin_head(){
        add_filter('acf/prepare_field/name=hide_on_screen', array($this, 'prepare_hide_on_screen'), 20);
    }
    
    
    /**
     * prepare_hide_on_screen
     *
     * @param $field
     *
     * @return array
     */
    function prepare_hide_on_screen($field){
    
        $field['choices']['title']              = __('Title', 'acfe');
        $field['choices']['save_draft']         = __('Save Draft', 'acfe');
        $field['choices']['preview']            = __('Preview', 'acfe');
        $field['choices']['post_status']        = __('Post Status', 'acfe');
        $field['choices']['visibility']         = __('Post Visibility', 'acfe');
        $field['choices']['publish_date']       = __('Publish Date', 'acfe');
        $field['choices']['trash']              = __('Move to trash', 'acfe');
        $field['choices']['publish']            = __('Publish/Update', 'acfe');
        $field['choices']['minor_publish']      = __('Minor Publishing Actions', 'acfe');
        $field['choices']['misc_publish']       = __('Misc Publishing Actions', 'acfe');
        $field['choices']['major_publish']      = __('Major Publishing Actions', 'acfe');
        $field['choices']['publish_metabox']    = __('Publish Metabox', 'acfe');
        
        // sort asc
        asort($field['choices']);
    
        return $field;
        
    }
    
    
    /**
     * get_field_group_style
     *
     * @param $style
     * @param $field_group
     *
     * @return mixed|string
     */
    function get_field_group_style($style, $field_group){
    
        if(!is_array($field_group['hide_on_screen'])){
            return $style;
        }
    
        $hide = array();
        $elements = array(
            'title'             => '#titlediv > #titlewrap',
            'save_draft'        => '#minor-publishing-actions > #save-action',
            'preview'           => '#minor-publishing-actions > #preview-action',
            'post_status'       => '#misc-publishing-actions > .misc-pub-post-status',
            'visibility'        => '#misc-publishing-actions > .misc-pub-visibility',
            'publish_date'      => '#misc-publishing-actions > .misc-pub-curtime',
            'trash'             => '#major-publishing-actions > #delete-action',
            'publish'           => '#major-publishing-actions > #publishing-action',
            'minor_publish'     => '#minor-publishing-actions',
            'misc_publish'      => '#misc-publishing-actions',
            'major_publish'     => '#major-publishing-actions',
            'publish_metabox'   => '#submitdiv',
        );
        
        foreach($field_group['hide_on_screen'] as $k){
        
            if(isset($elements[ $k ])){
                $id = $elements[ $k ];
                $hide[] = $id;
            }
        
        }
    
        if(!empty($hide)){
            $style .= implode(', ', $hide) . ' {display: none;}';
        }
    
        return $style;
        
    }
    
}

// initialize
new acfe_pro_field_group_hide_on_screen();

endif;