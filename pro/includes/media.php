<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_pro_media')):

class acfe_pro_media{
    
    public $files = array();
    
    /**
     * construct
     */
    function __construct(){
        
        // replace action
        acfe_replace_action('acf/save_post', array('ACF_Media', 'save_files'), array($this, 'save_files'), 5);
        
    }
    
    
    /**
     * save_files
     *
     * @param $post_id
     */
    function save_files($post_id = 0){
        
        // bail early if no $_FILES data
        if(empty($_FILES['acf']['name'])){
            return;
        }
        
        // upload files
        $this->upload_files();
        
    }
    
    
    /**
     * upload_files
     *
     * @param $ancestors
     */
    function upload_files($ancestors = array()){
        
        // vars
        $file = array(
            'name'      => '',
            'type'      => '',
            'tmp_name'  => '',
            'error'     => '',
            'size'      => ''
        );
        
        // populate with $_FILES data
        foreach(array_keys($file) as $k){
            $file[ $k ] = $_FILES['acf'][ $k ];
        }
        
        // walk through ancestors
        if(!empty($ancestors)){
            
            foreach($ancestors as $a){
                
                foreach(array_keys($file) as $k){
                    $file[ $k ] = $file[ $k ][ $a ];
                }
                
            }
            
        }
        
        // is array?
        if(is_array($file['name'])){
            
            foreach(array_keys($file['name']) as $k){
                
                $_ancestors = array_merge($ancestors, array($k));
                
                $this->upload_files($_ancestors);
                
            }
            
            return;
            
        }
        
        // bail ealry if file has error (no file uploaded)
        if($file['error']){
            return;
        }
        
        // Remove numeric ancestor: acf[field_123abc][0]
        foreach($ancestors as $_k => $ancestor){
            
            if(is_numeric($ancestor)){
                unset($ancestors[ $_k ]);
            }
            
        }
        
        //acf_log('-------------- Advanced Uploader: Upload ---------------');
        //acf_log('File name:', $file['name']);
        
        // assign global _acfuploader for media validation
        $_POST['_acfuploader'] = end($ancestors);
        
        // file found!
        $attachment_id = acf_upload_file($file);
        
        // Save file globally (to be reused later)
        $this->files[] = $file;
        
        // update $_POST
        array_unshift($ancestors, 'acf');
        
        $this->update_nested_array($_POST, $ancestors, $attachment_id);
        
    }
    
    
    /**
     * update_nested_array
     *
     * @param $array
     * @param $ancestors
     * @param $value
     *
     * @return bool
     */
    function update_nested_array(&$array, $ancestors, $value){
        
        // if no more ancestors, update the current var
        if(empty($ancestors)){
            
            //acf_log('-------- Advanced Uploader: Second Pass (empty) --------');
            //acf_log('$array before:', $array);
            
            // Search: array([0] => url=C:/fakepath/image.gif&name=image.gif&size=465547&type=image%2Fgif)
            if(is_array($array)){
                
                foreach($array as &$row){
                    
                    if(!is_string($row) || stripos($row, 'url=') !== 0){
                        continue;
                    }
                    
                    $file_parsed = null;
                    parse_str(wp_specialchars_decode($row), $file_parsed);
                    
                    // Get global uploaded files to make sure the order is respected (check name & size)
                    foreach($this->files as $file_uploaded){
                        
                        $file_parsed['name'] = wp_unslash($file_parsed['name']);
                        
                        if($file_uploaded['name'] !== $file_parsed['name'] || absint($file_uploaded['size']) !== absint($file_parsed['size'])){
                            continue;
                        }
                        
                        // Found. Replace with Attachment ID
                        $row = $value;
                        
                        break 2;
                        
                    }
                    
                }
                
            }else{
                
                // Search: 146 (Attachment ID already set before)
                if(is_numeric($array)){
                    
                    // Convert to array for next upload (if any)
                    $array = acf_get_array($array);
                    $array[] = $value;
                    
                    // Other: Native behavior
                }else{
                    
                    $array = $value;
                    
                }
                
            }
            
            //acf_log('$array after:', $array);
            
            // return
            return true;
            
        }
        
        // shift the next ancestor from the array
        $k = array_shift($ancestors);
        
        // if exists
        if(isset($array[$k])){
            
            //acf_log('-------- Advanced Uploader: First Pass (!empty) --------');
            //acf_log('$array['.$k.']', $array[$k]);
            
            return $this->update_nested_array($array[$k], $ancestors, $value);
            
        }
        
        // return
        return false;
        
    }
    
}

new acfe_pro_media();

endif;