<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_pro_performance_hybrid_revisions')):

class acfe_pro_performance_hybrid_revisions{
    
    /**
     * construct
     */
    function __construct(){
        
        add_filter('_wp_post_revision_fields', array($this, 'wp_post_revision_fields'), 9, 2);
        
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
        
        // acf uses get_post_meta() to retrieve acf meta in
        // advanced-custom-fields-pro/includes/revisions.php:151
        // we need to hook in to retrieve the _acf metaref and make it look like normal meta
        add_filter('get_post_metadata', array($this, 'get_post_metadata'), 10, 5);
        
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
        
        // todo: get $object_id (revision) ->parent (real post) and check if performance is enabled on it
        
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