<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_pro_field_image')):

class acfe_pro_field_image extends acfe_field_extend{
    
    /**
     * initialize
     */
    function initialize(){
    
        $this->name = 'image';
        $this->defaults = array(
            'upload_folder' => '',
        );
    
        // upload prefilter
        $this->add_field_filter('acfe/upload_dir', array($this, 'upload_dir'), 10, 2);
        
    }
    
    
    /**
     * upload_dir
     *
     * @param $uploads
     * @param $field
     *
     * @return mixed
     */
    function upload_dir($uploads, $field){
        
        // vars
        $upload_folder = acf_maybe_get($field, 'upload_folder');
        
        // check setting
        if(!$upload_folder){
            return $uploads;
        }
        
        // vars
        $folder = trim($upload_folder);
        $folder = ltrim($folder, '/\\');
        $folder = rtrim($folder, '/\\');
        
        // template tags
        if(stripos($folder, '{year}') !== false || stripos($folder, '{month}') !== false){
            
            $time = current_time('mysql');
            $year = substr($time, 0, 4);
            $month = substr($time, 5, 2);
            
            $folder = str_replace('{year}', $year, $folder);
            $folder = str_replace('{month}', $month, $folder);
            
        }
        
        // change path
        $uploads['path'] = "{$uploads['basedir']}/{$folder}";
        $uploads['url'] = "{$uploads['baseurl']}/{$folder}";
        $uploads['subdir'] = '';
        
        // return
        return $uploads;
        
    }
    
    
    /**
     * render_field_settings
     *
     * @param $field
     */
    function render_field_settings($field){
    
        $upload_dir = wp_upload_dir();
        $upload_dir_url = $upload_dir['baseurl'];
        $upload_dir_url = trailingslashit(str_replace(home_url(), '', $upload_dir_url));
        
        $default_upload_dir_url = $upload_dir['url'];
        $default_upload_dir_url = trailingslashit(str_replace(home_url(), '', $default_upload_dir_url));
    
        $instructions = __('Leave blank to use the default upload folder.', 'acfe') . ' ' . __('Available template tags:', 'acfe') . ' ' . '<code>{year}</code> <code>{month}</code>';
        
        if($upload_dir_url !== $default_upload_dir_url){
            $instructions .= "<br/>" . __('Current default upload folder:', 'acfe') . ' ' . "<code>{$default_upload_dir_url}</code>";
        }
    
        // upload folder
        acf_render_field_setting($field, array(
            'label'         => __('Upload Folder', 'acfe'),
            'instructions'  => $instructions,
            'name'          => 'upload_folder',
            'type'          => 'text',
            'prepend'       => $upload_dir_url,
        ));
        
    }
    
}

acf_new_instance('acfe_pro_field_image');

endif;