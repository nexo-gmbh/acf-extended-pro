<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_performance_hybrid')):

class acfe_performance_hybrid extends acfe_performance{
    
    /**
     * construct
     */
    function initialize(){
        
        $this->name       = 'hybrid';
        $this->meta_key   = '_acf';
        $this->option_key = '_%id%_acf';
        
    }
    
    
    /**
     * pre_load_meta
     *
     * @param $return
     * @param $post_id
     *
     * @hook acf/pre_load_meta:999
     *
     * @function acf_get_meta() + get_fields()
     *
     * @return array|mixed|null
     */
    function pre_load_meta($return, $post_id){
    
        // disabled module or bypass
        if(!$this->is_enabled($post_id) || $this->bypass){
            return $return;
        }
    
        return $this->do_pre_load_meta($return, $post_id);
        
    }
    
    
    /**
     * do_pre_load_meta
     *
     * @param $return
     * @param $post_id
     *
     * @return array
     */
    function do_pre_load_meta($return, $post_id){
    
        // get store
        $_acf = $this->get_store($post_id);
    
        // _acf is empty
        // fallback to normal meta, just in case
        if(empty($_acf)){
            return $return;
        }
    
        /**
         * @var $type
         * @var $id
         */
        extract(acf_decode_post_id($post_id));
    
        // get option
        if($type === 'option'){
            $allmeta = acf_get_option_meta($id);
        
            // get meta
        }else{
            $allmeta = get_metadata($type, $id, '');
        }
    
        $meta = array();
    
        // loop over meta
        if($allmeta){
            foreach($allmeta as $key => $value){
            
                // if reference exists in _acf
                // then add to array
                if(isset($_acf[ "_$key" ])){
                    $meta[ $key ]    = $allmeta[ $key ][0];
                    $meta[ "_$key" ] = $_acf[ "_$key" ];
                }
            
            }
        }
    
        // unserialized results
        // get_metadata does not unserialize if $meta_key is empty
        $meta = array_map('maybe_unserialize', $meta);
    
        // return
        return $meta;
        
    }
    
    
    /**
     * pre_load_metadata
     *
     * @param $return
     * @param $post_id
     * @param $name
     * @param $hidden
     *
     * @hook acf/pre_load_metadata:999
     *
     * @function acf_get_metadata() + acf_get_value()
     *
     * @return mixed
     */
    function pre_load_metadata($return, $post_id, $name, $hidden){
        
        // bail early
        // if _acf
        //    or disabled module
        //    or not prefixed meta
        //    or bypass
        if($name === $this->meta_key || !$this->is_enabled($post_id) || !$hidden || $this->bypass){
            return $return;
        }
        
        return $this->do_pre_load_metadata($return, $post_id, $name, $hidden);
        
    }
    
    
    /**
     * do_pre_load_metadata
     *
     * @param $return
     * @param $post_id
     * @param $name
     * @param $hidden
     *
     * @return mixed
     */
    function do_pre_load_metadata($return, $post_id, $name, $hidden){
        
        if(!$hidden){
            return $return;
        }
    
        // get store
        $_acf = $this->get_store($post_id);
    
        // _acf is empty
        // fallback to normal metaref
        if(empty($_acf)){
            return $return;
        }
    
        // retrieve metaref
        if(isset($_acf["_{$name}"])){
            $return = $_acf["_{$name}"];
        }
    
        // not found in _acf
        // fallback to normal metaref
        return $return;
    
    }
    
    
    /**
     * pre_update_metadata
     *
     * @param $return
     * @param $post_id
     * @param $name
     * @param $value
     * @param $hidden
     *
     * @hook acf/pre_update_metadata:999
     *
     * @function acf_update_metadata() + acf_update_value() + acf_copy_metadata()
     *
     * @return bool|mixed|null
     */
    function pre_update_metadata($return, $post_id, $name, $value, $hidden){
    
        // bail early
        // if _acf
        //    or disabled module
        //    or not prefixed meta
        //    or bypass
        if($name === $this->meta_key || !$this->is_enabled($post_id) || !$hidden || $this->bypass){
            return $return;
        }
        
        // get store
        $_acf = $this->get_store($post_id);
        
        // assign metaref
        $_acf["_{$name}"] = $value;
    
        // update store
        $this->update_store($post_id, $_acf);
        
        // manual update
        // outside acf/save_post, probably in update_field()
        if($this->compile !== $post_id){
            $this->update_meta($_acf, $post_id);
        }
        
        // get config
        $config = $this->get_config();
    
        switch($config['mode']){
        
            // test + rollback
            // save normal meta
            case 'test':
            case 'rollback': {
                return $return;
            }
        
            // production
            // delete normal meta
            case 'production': {
    
                // use normal acf logic
                $this->do_bypass(function($name, $post_id){
        
                    // check if metaref exists
                    // this will get meta cache instead of db call
                    if(acf_get_metadata($post_id, $name, true) !== null){
                        acf_delete_metadata($post_id, $name, true);
                    }
        
                }, array($name, $post_id));
            
                // do not save normal meta
                return true;
            
            }
        
        }
    
        // return
        return $return;
        
    }
    
    
    /**
     * pre_delete_metadata
     *
     * @param $return
     * @param $post_id
     * @param $name
     * @param $hidden
     *
     * @hook acf/pre_delete_metadata:999
     *
     * @function acf_delete_metadata() + acf_delete_value()
     *
     * @return bool|mixed
     */
    function pre_delete_metadata($return, $post_id, $name, $hidden){
    
        // bail early
        // if _acf
        //    or disabled module
        //    or not prefixed meta
        //    or bypass
        if($name === $this->meta_key || !$this->is_enabled($post_id) || !$hidden || $this->bypass){
            return $return;
        }
    
        // get store
        $_acf = $this->get_store($post_id);
    
        // _acf is empty
        // fallback to normal acf logic
        if(empty($_acf)){
            return $return;
        }
        
        // found in array
        if(isset($_acf["_{$name}"])){
            
            // unset
            unset($_acf["_{$name}"]);
            
            // update store
            $this->update_store($post_id, $_acf);
            
            // update meta
            $this->update_meta($_acf, $post_id);
        
        }
        
        // return
        return $return;
    
    }
    
}

acfe_register_performance_engine('acfe_performance_hybrid');

endif;