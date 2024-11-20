<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_pro_performance_hybrid_revisions')):

class acfe_pro_performance_hybrid_revisions{
    
    var $copy_revision = false;
    
    /**
     * hybdrid engine
     * revision meta structure:
     *
     *  text     = my value
     * _text     = field_6726aa0880d0a
     *  textarea = my value
     * _textarea = field_6726aa0b80d0b
     *
     * this is because acf copy post meta into revision in acf_copy_postmeta()
     * using acf_update_metadata() with $hidden = false
     * this bypass the logic in the hybrid_engine->pre_update_metadata()
     *
     */
    
    /**
     * construct
     */
    function __construct(){
        
        add_action('wp_restore_post_revision',      array($this, 'wp_restore_post_revision'),      9, 2);
        add_action('wp_restore_post_revision_late', array($this, 'wp_restore_post_revision_late'), 11, 2);
        add_filter('acf/pre_update_metadata',       array($this, 'pre_update_metadata'),           10, 5);
        add_filter('_wp_post_revision_fields',      array($this, 'wp_post_revision_fields'),       9, 2);
        
    }
    
    
    /**
     * wp_restore_post_revision
     *
     * @param $post_id
     * @param $revision_id
     *
     * @return void
     */
    function wp_restore_post_revision($post_id, $revision_id){
        if(acfe_get_object_performance_engine_name($post_id) === 'hybrid'){
            $this->copy_revision = true;
        }
    }
    
    
    /**
     * wp_restore_post_revision_late
     *
     * @param $post_id
     * @param $revision_id
     *
     * @return void
     */
    function wp_restore_post_revision_late($post_id, $revision_id){
        if(acfe_get_object_performance_engine_name($post_id) === 'hybrid'){
            $this->copy_revision = false;
        }
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
     * @return mixed|true
     */
    function pre_update_metadata($return, $post_id, $name, $value, $hidden){
        
        // in acf_copy_postmeta()
        // acf uses update_metadata() with $hidden = false on all meta from revision
        // we need to prevent saving meta references when restoring a revision
        if($this->copy_revision && acfe_get_object_performance_engine_name($post_id) === 'hybrid' && !$hidden){
            
            // do not save
            // _my_field = field_abcd1234
            if(acfe_starts_with($name, '_') && acf_is_field_key($value)){
                return true;
            }
            
        }
        
        return $return;
    
    }
    
    
    /**
     * wp_post_revision_fields
     *
     * @param $fields
     * @param $post
     *
     * @return mixed
     */
    function wp_post_revision_fields($fields, $post = null){
        
        // copied from wp_post_revision_fields() in
        // advanced-custom-fields-pro/includes/revisions.php:118
    
        // validate page
        if(acf_is_screen('revision') || acf_is_ajax('get-revision-diffs')){
        
            // bail early if is restoring
            if(acf_maybe_get_GET('action') === 'restore'){
                return $fields;
            }
        
        // allow
        }else{
        
            // bail early (most likely saving a post)
            return $fields;
        
        }
        
        $post_id = acf_maybe_get($post, 'ID');
        
        // compatibility with WP < 4.5 (test)
        if(!$post_id){
            global $post;
            $post_id = $post->ID;
        }
        
        // validate engine of parent post_id
        if(acfe_get_object_performance_engine_name($post_id) === 'hybrid'){
            
            // acf uses get_post_meta() to retrieve acf meta in
            // advanced-custom-fields-pro/includes/revisions.php:212
            // we need to hook in to retrieve the '_acf' metaref and make it look like normal meta
            add_filter('get_post_metadata', array($this, 'get_post_metadata'), 10, 5);
            
        }
        
        // return
        return $fields;
        
    }
    
    
    /**
     * get_post_metadata
     *
     * @param $null
     * @param $object_id
     * @param $meta_key
     * @param $single
     * @param $meta_type
     *
     * @return array|false|mixed
     */
    function get_post_metadata($null, $object_id, $meta_key, $single, $meta_type){
        
        // acf get all meta, without metakey
        if(!empty($meta_key)){
            return $null;
        }
        
        // copied from get_metadata_raw() in
        // wp-includes/meta.php:641
        $meta_cache = wp_cache_get($object_id, $meta_type . '_meta');
    
        if(!$meta_cache){
            $meta_cache = update_meta_cache( $meta_type, array( $object_id ) );
            if ( isset( $meta_cache[ $object_id ] ) ) {
                $meta_cache = $meta_cache[ $object_id ];
            } else {
                $meta_cache = null;
            }
        }
        
        // retrieve _acf metaref
        if(isset($meta_cache['_acf'][0])){
    
            $meta_cache['_acf'][0] = maybe_unserialize($meta_cache['_acf'][0]);
            $meta_cache['_acf'][0] = acf_get_array($meta_cache['_acf'][0]);
            
            foreach($meta_cache['_acf'][0] as $k => $v){
                if(!isset($meta_cache[ $k ])){
                    $meta_cache[ $k ] = array($v);
                }
            }
            
            unset($meta_cache['_acf']);
            
        }
        
        // return
        return $meta_cache;
        
    }
    
}

acf_new_instance('acfe_pro_performance_hybrid_revisions');

endif;