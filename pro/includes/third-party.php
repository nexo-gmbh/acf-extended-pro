<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_pro_third_party')):

class acfe_pro_third_party{
    
    /**
     * construct
     */
    function __construct(){
        
        add_filter('wpgraphql_acf_supported_fields',        array($this, 'wpgraphql_acf_supported_fields'));
        add_filter('wpgraphql_acf_register_graphql_field',  array($this, 'wpgraphql_acf_register_graphql_field'), 10, 4);
        
    }
    
    
    /**
     * wpgraphql_acf_supported_fields
     *
     * @param $fields
     *
     * @since 0.8.8.2 (27/04/2021)
     *
     * @return mixed
     */
    function wpgraphql_acf_supported_fields($fields){
        
        $acfe_fields = array(
            'acfe_block_types',
            'acfe_countries',
            'acfe_currencies',
            'acfe_date_range_picker',
            'acfe_field_groups',
            'acfe_field_types',
            'acfe_fields',
            'acfe_languages',
            'acfe_menu_locations',
            'acfe_menus',
            'acfe_options_pages',
            'acfe_phone_number',
            'acfe_post_formats',
            'acfe_templates',
        );
        
        return array_merge($fields, $acfe_fields);
        
    }
    
    
    /**
     * wpgraphql_acf_register_graphql_field
     *
     * @param $field_config
     * @param $type_name
     * @param $field_name
     * @param $config
     *
     * @since 0.8.8.4 (14/06/2021)
     *
     * @return mixed
     */
    function wpgraphql_acf_register_graphql_field($field_config, $type_name, $field_name, $config){
    
        $acf_field = isset($config['acf_field']) ? $config['acf_field'] : null;
        $acf_type  = isset($acf_field['type']) ? $acf_field['type'] : null;
    
        switch($acf_type){
        
            case 'acfe_block_types':
            case 'acfe_countries':
            case 'acfe_currencies':
            case 'acfe_date_range_picker':
            case 'acfe_field_groups':
            case 'acfe_field_types':
            case 'acfe_fields':
            case 'acfe_languages':
            case 'acfe_menu_locations':
            case 'acfe_menus':
            case 'acfe_options_pages':
            case 'acfe_phone_number':
            case 'acfe_post_formats':
            case 'acfe_templates': {
                $field_config['type'] = array('list_of' => 'String');
                break;
            }
        
        }
        
        return $field_config;
        
    }
    
}

new acfe_pro_third_party();

endif;