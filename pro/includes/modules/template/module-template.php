<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_module_template')):

class acfe_module_template extends acfe_module{
    
    /**
     * initialize
     */
    function initialize(){
        
        $this->name         = 'template';
        $this->plural       = 'templates';
        $this->setting      = 'modules/templates';
        
        $this->post_type    = 'acfe-template';
        $this->args         = array(
            'label'             => __('Templates', 'acfe'),
            'show_in_menu'      => 'edit.php?post_type=acf-field-group',
            'labels'            => array(
                'name'          => __('Templates', 'acfe'),
                'singular_name' => __('Template', 'acfe'),
                'menu_name'     => __('Templates', 'acfe'),
                'edit_item'     => __('Edit Template', 'acfe'),
                'add_new_item'  => __('New Template', 'acfe'),
                'enter_title'   => __('Template Title', 'acfe'),
            ),
        );
        
        $this->messages     = array(
            'export_title'              => __('Export Templates', 'acfe'),
            'export_description'        => __('Export Templates', 'acfe'),
            'export_select'             => __('Select Templates', 'acfe'),
            'export_not_found'          => __('No template available.', 'acfe'),
            'export_not_selected'       => __('No templates selected', 'acfe'),
            'export_success_single'     => __('1 template exported', 'acfe'),
            'export_success_multiple'   => __('%s templates exported', 'acfe'),
            'export_instructions'       => __('It is recommended to include this code within the <code>acfe/init</code> hook.', 'acfe'),
            'import_title'              => __('Import Templates', 'acfe'),
            'import_description'        => __('Import Templates', 'acfe'),
            'import_success_single'     => __('1 template imported', 'acfe'),
            'import_success_multiple'   => __('%s templates imported', 'acfe'),
        );
    
        $this->export_files = array(
            'single'    => 'template',
            'multiple'  => 'templates',
        );
    
        $this->validate = array('name');
    
        $this->columns  = array(
            'acfe-name'         => __('Name', 'acfe'),
            'acfe-locations'    => __('Locations', 'acfe'),
            'acfe-field-groups' => __('Field Groups', 'acfe'),
        );
    
        $this->item     = array(
            'name'   => '',
            'title'  => '',
            'active' => true,
            'values' => array(),
        );
    
        $this->alias    = array(
            'title' => 'label',
        );
    
        $this->l10n = array('title');
        
    }
    
    
    /**
     * load_post
     *
     * acfe/module/load_post
     */
    function load_post(){
        
        add_filter('acf/get_field_group_style', '__return_empty_string');
        add_action('edit_form_after_title',     array($this, 'edit_form_after_title'));
        add_action('acfe/prepare_field_group',  array($this, 'prepare_field_group'));
        add_action('acf/prepare_field',         array($this, 'prepare_field'));
        add_action('acf/add_meta_boxes',        array($this, 'add_metaboxes'), 10, 3);
        add_filter('acf/pre_render_fields',     array($this, 'pre_render_fields'), 10, 2);
        add_filter('acf/pre_load_value',        array($this, 'pre_load_value'), 10, 3);
        
    }
    
    
    /**
     * edit_form_after_title
     *
     * edit_form_after_title
     */
    function edit_form_after_title(){
        echo '<div class="notice notice-warning inline"><p>' . __('You are currently editing a Dynamic Template.', 'acfe') . '</p></div>';
    }
    
    
    /**
     * prepare_field_group
     *
     * acfe/prepare_field_group
     *
     * @param $field_group
     *
     * @return mixed
     */
    function prepare_field_group($field_group){
    
        if($field_group['position'] === 'acf_after_title'){
            $field_group['position'] = 'normal';
        }
    
        return $field_group;
        
    }
    
    
    /**
     * prepare_field
     *
     * acf/prepare_field
     *
     * @param $field
     *
     * @return mixed
     */
    function prepare_field($field){
        
        // disable required on values
        if(acfe_starts_with($field['prefix'], 'acf[values]')){
            $field['required'] = 0;
        }
        
        return $field;
        
    }
    
    
    /**
     * add_metaboxes
     *
     * acf/add_meta_boxes
     *
     * @param $post_type
     * @param $post
     * @param $_field_groups
     */
    function add_metaboxes($post_type, $post, $_field_groups){
        
        // add field groups to globals for acf/prepare_field on instructions field
        global $field_groups;
        $field_groups = array();
        
        foreach($_field_groups as $field_group){
            
            if(in_array($field_group['key'], array('group_acfe_module_side', 'group_acfe_template'))){
                continue;
            }
            
            $field_groups[] = $field_group;
            
        }
        
        // display field groups details
        /*if($field_groups){
    
            acfe_add_field_groups_metabox(array(
                'id'            => 'acfe-field-groups',
                'title'         => __('Field Groups', 'acf'),
                'screen'        => $this->post_type,
                'field_groups'  => $field_groups,
            ));
            
        }*/
        
    }
    
    
    /**
     * pre_render_fields
     *
     * acf/pre_render_fields
     *
     * @param $fields
     * @param $post_id
     *
     * @return mixed
     */
    function pre_render_fields($fields, $post_id){
        
        if(!isset($fields[0])){
            return $fields;
        }
        
        global $field_groups;
        $field_group_keys = wp_list_pluck(acf_get_array($field_groups), 'key');
        
        // db field group
        if(is_numeric($fields[0]['parent'])){
        
            $field_groups_ids = array();
        
            foreach($field_group_keys as $field_group_key){
            
                $field_group = acf_get_field_group($field_group_key);
            
                if($field_group && $field_group['ID']){
                    $field_groups_ids[] = $field_group['ID'];
                }
            
            }
        
            // prefix fields
            if(in_array($fields[0]['parent'], $field_groups_ids)){
                acf_prefix_fields($fields, 'acf[values]');
            }
        
        // local field group
        }else{
    
            // prefix fields
            if(in_array($fields[0]['parent'], $field_group_keys)){
                acf_prefix_fields($fields, 'acf[values]');
            }
            
        }
        
        return $fields;
        
    }
    
    
    /**
     * pre_load_value
     *
     * acf/pre_load_value
     *
     * @param $null
     * @param $post_id
     * @param $field
     *
     * @return mixed
     */
    function pre_load_value($null, $post_id, $field){
        
        global $item;
    
        // check field prefix
        if(!acfe_starts_with($field['prefix'], 'acf[values]')){
            return $null;
        }
        
        $field_key = $field['key'];
        $field_name = $field['name'];
        
        // return by name
        if(isset($item['values'][ $field_name ])){
            return $item['values'][ $field_name ];
            
        // return by key
        }elseif(isset($item['values'][ $field_key ])){
            return $item['values'][ $field_key ];
        }
        
        return $null;
        
    }
    
    
    /**
     * prepare_save_item
     *
     * acfe/module/prepare_save_item
     *
     * @param $item
     *
     * @return mixed
     */
    function prepare_save_item($item){
        
        $item['values'] = array();
        
        if(isset($_POST['acf']['values'])){
            
            // setup values meta
            acfe_setup_meta($_POST['acf']['values'], 'acfe/module/save_template', true);
            $item['values'] = get_fields(false, false);
            acfe_reset_meta();
            
        }
        
        // return
        return $item;
        
    }
    
    
    /**
     * validate_name
     *
     * @param $value
     * @param $item
     *
     * @return false|string|void
     */
    function validate_name($value, $item){
        
        // editing current post type
        if($item['name'] === $value){
            return true;
        }
        
        // check sibiling post types (could be disabled)
        $sibiling_item = $this->get_item($value);
        
        if($sibiling_item && $sibiling_item['ID'] !== $item['ID']){
            return __('This template already exists', 'acfe');
        }
        
        return true;
        
    }
    
    
    /**
     * edit_column_acfe_name
     *
     * @param $item
     */
    function edit_column_acfe_name($item){
        echo '<code style="font-size: 12px;">' . $item['name'] . '</code>';
    }
    
    
    /**
     * edit_column_acfe_locations
     *
     * @param $item
     */
    function edit_column_acfe_locations($item){
        
        $text = '—';
        $instance = acf_get_instance('ACF_Admin_Field_Groups');
        
        if(!$instance){
            echo $text;
            return;
        }
        
        $field_groups = acf_get_field_groups(array(
            'post_id'   => $item['ID'],
            'post_type' => $this->post_type
        ));
        
        if($field_groups){
            
            $locations = array();
            
            foreach($field_groups as $field_group){
                
                ob_start();
                $instance->render_admin_table_column_locations($field_group);
                $html = ob_get_clean();
                
                if(!empty($html) && !in_array($html, $locations, true)){
                    $locations[] = $html;
                }
                
            }
            
            if($locations){
                $text = implode('', $locations);
            }
            
        }
        
        echo $text;
        
    }
    
    
    /**
     * edit_column_acfe_field_groups
     *
     * @param $item
     */
    function edit_column_acfe_field_groups($item){
        
        $text = '—';
        
        $field_groups = acf_get_field_groups(array(
            'post_id'   => $item['ID'],
            'post_type' => $this->post_type
        ));
        
        if($field_groups){
            
            $html = array();
            
            foreach($field_groups as $field_group){
                
                $append = $field_group['title'];
                
                if($field_group['ID']){
                    $append = '<a href="' . admin_url("post.php?post={$field_group['ID']}&action=edit") . '">' . $field_group['title'] . '</a>';
                }
                
                $html[] = $append;
                
            }
            
            if($html){
                $text = implode(', ', $html);
            }
            
        }
        
        echo $text;
        
    }
    
    
    /**
     * export_code
     *
     * @param $return
     * @param $code
     * @param $args
     *
     * @return string
     */
    function export_code($code, $args){
        return "acfe_register_template({$code});";
    }
    
}

acfe_register_module('acfe_module_template');

endif;


/**
 * acfe_register_template
 *
 * @param $item
 */
function acfe_register_template($item){
    acfe_get_module('template')->add_local_item($item);
}

/**
 * acfe_add_local_template
 *
 * @param $item
 * @deprecated
 */
function acfe_add_local_template($item){
    _deprecated_function('ACF Extended: acfe_add_local_template()', '0.8.9', "acfe_register_template()");
    acfe_register_template($item);
}