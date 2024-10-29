<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_module_form_action_option')):

class acfe_module_form_action_option extends acfe_module_form_action{
    
    /**
     * initialize
     */
    function initialize(){
        
        $this->name = 'option';
        $this->title = __('Option action', 'acfe');
        
        $this->item = array(
            'action' => 'option',
            'name'   => '',
            'save'   => array(
                'target'     => '',
                'acf_fields' => array(),
            ),
            'load'   => array(
                'source'     => '',
                'acf_fields' => array(),
            ),
        );
        
    }
    
    
    /**
     * load_action
     *
     * acfe/form/load_option:9
     *
     * @param $form
     * @param $action
     *
     * @return mixed
     */
    function load_action($form, $action){
        
        // check source
        if(!$action['load']['source']){
            return $form;
        }
        
        // apply tags
        acfe_apply_tags($action['load']);
        
        // vars
        $load = $action['load'];
        $option_id = acf_extract_var($load, 'source');
        $acf_fields = acf_extract_var($load, 'acf_fields');
        
        // filters
        $option_id = apply_filters("acfe/form/load_option_id",                          $option_id, $form, $action);
        $option_id = apply_filters("acfe/form/load_option_id/form={$form['name']}",     $option_id, $form, $action);
        $option_id = apply_filters("acfe/form/load_option_id/action={$action['name']}", $option_id, $form, $action);
        
        // bail early if no source
        if(!$option_id){
            return $form;
        }
    
        // load acf values
        $form = $this->load_acf_values($form, $option_id, $acf_fields, array());
        
        // return
        return $form;
    
    }
    
    
    /**
     * make_action
     *
     * acfe/form/make_option:9
     *
     * @param $form
     * @param $action
     */
    function make_action($form, $action){
        
        // vars
        $save = $action['save'];
        $option_id = acf_extract_var($save, 'target');
        
        // option id
        $option_id = apply_filters("acfe/form/submit_option_id",                          $option_id, $form, $action);
        $option_id = apply_filters("acfe/form/submit_option_id/form={$form['name']}",     $option_id, $form, $action);
        $option_id = apply_filters("acfe/form/submit_option_id/action={$action['name']}", $option_id, $form, $action);
    
        // bail early
        if($option_id === false){
            return;
        }
    
        // acf values
        $this->save_acf_fields($option_id, $action);
        
        // hooks
        do_action("acfe/form/submit_option",                          $option_id, $form, $action);
        do_action("acfe/form/submit_option/form={$form['name']}",     $option_id, $form, $action);
        do_action("acfe/form/submit_option/action={$action['name']}", $option_id, $form, $action);
    
    }
    
    /**
     * prepare_load_action
     *
     * acfe/module/prepare_load_action
     *
     * @param $action
     *
     * @return array
     */
    function prepare_load_action($action){
    
        // save loop
        foreach(array_keys($action['save']) as $k){
            $action["save_{$k}"] = $action['save'][ $k ];
        }
        
        // load loop
        $load_active = false;
        
        foreach(array_keys($action['load']) as $k){
            
            if(!empty($action['load'][ $k ])){
                $load_active = true;
            }
    
            $action["load_{$k}"] = $action['load'][ $k ];
        
        }
    
        $action['load_active'] = $load_active;
        
        // cleanup
        unset($action['action']);
        unset($action['save']);
        unset($action['load']);
        
        return $action;
        
    }
    
    
    /**
     * prepare_save_action
     *
     * acfe/module/prepare_save_action
     *
     * @param $action
     * @param $item
     *
     * @return mixed
     */
    function prepare_save_action($action){
        
        $save = $this->item;
        
        // general
        $save['name'] = $action['name'];
        
        // save loop
        foreach(array_keys($save['save']) as $k){
            
            // post_type => save_post_type
            if(acf_maybe_get($action, "save_{$k}")){
                $save['save'][ $k ] = $action["save_{$k}"];
            }
            
        }
        
        // check load switch activated
        if($action['load_active']){
    
            // load loop
            foreach(array_keys($save['load']) as $k){
        
                // post_type => load_post_type
                if(acf_maybe_get($action, "load_{$k}")){
                    
                    $value = $action["load_{$k}"];
                    $save['load'][ $k ] = $value;
                    
                }
        
            }
            
        }else{
            
            unset($save['load']);
            
        }
        
        return $save;
        
    }
    
    
    /**
     * register_layout
     *
     * @param $layout
     *
     * @return array
     */
    function register_layout($layout){
        
        // generate options pages choices
        $choices = array();
        $options_pages = acf_get_options_pages();
        
        // loop options pages
        if($options_pages){
            foreach($options_pages as $options_page){
                
                // append choice
                $choices[ $options_page['post_id'] ] = $options_page['page_title'];
            }
        }
    
        return array(
    
            /**
             * documentation
             */
            array(
                'key' => 'field_doc',
                'label' => '',
                'name' => '',
                'type' => 'acfe_dynamic_render',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'render' => function(){
                    echo '<a href="https://www.acf-extended.com/features/modules/dynamic-forms/option-action" target="_blank">' . __('Documentation', 'acfe') . '</a>';
                }
            ),
    
            /**
             * action
             */
            array(
                'key' => 'field_tab_action',
                'label' => __('Action', 'acfe'),
                'name' => '',
                'type' => 'tab',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                    'data-no-preference' => true,
                ),
                'placement' => 'top',
                'endpoint' => 0,
            ),
            array(
                'key' => 'field_name',
                'label' => __('Action name', 'acfe'),
                'name' => 'name',
                'type' => 'acfe_slug',
                'instructions' => __('(Optional) Target this action using hooks.', 'acfe'),
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                    'data-instruction-placement' => 'field'
                ),
                'default_value' => '',
                'placeholder' => __('Option', 'acfe'),
                'prepend' => '',
                'append' => '',
                'maxlength' => '',
            ),
    
            /**
             * save
             */
            array(
                'key' => 'field_tab_save',
                'label' => __('Save', 'acfe'),
                'name' => '',
                'type' => 'tab',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'placement' => 'top',
                'endpoint' => 0,
            ),
            array(
                'key' => 'field_save_target',
                'label' => __('Target', 'acfe'),
                'name' => 'save_target',
                'type' => 'select',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => array(),
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                    'data-instruction-placement' => 'field'
                ),
                'choices' => $choices,
                'default_value' => '',
                'allow_null' => 0,
                'multiple' => 0,
                'ui' => 1,
                'ajax' => 1,
                'return_format' => 'value',
                'placeholder' => '',
                'search_placeholder' => __('Select a field or enter a custom value/template tag.', 'acfe'),
                'allow_custom' => 1,
                'ajax_action' => 'acfe/form/map_field_ajax'
            ),
            array(
                'key' => 'field_save_acf_fields',
                'label' => __('Save ACF fields', 'acfe'),
                'name' => 'save_acf_fields',
                'type' => 'checkbox',
                'instructions' => __('Which ACF fields should be saved as metadata', 'acfe'),
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'choices' => array(
                ),
                'allow_custom' => 0,
                'default_value' => array(
                ),
                'layout' => 'vertical',
                'toggle' => 0,
                'return_format' => 'value',
                'save_custom' => 0,
            ),
    
            /**
             * load
             */
            array(
                'key' => 'field_tab_load',
                'label' => __('Load', 'acfe'),
                'name' => '',
                'type' => 'tab',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'placement' => 'top',
                'endpoint' => 0,
            ),
            array(
                'key' => 'field_load_active',
                'label' => __('Load Values', 'acfe'),
                'name' => 'load_active',
                'type' => 'true_false',
                'instructions' => __('Fill inputs with values', 'acfe'),
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'message' => '',
                'default_value' => 0,
                'ui' => 1,
                'ui_on_text' => '',
                'ui_off_text' => '',
            ),
            array(
                'key' => 'field_load_source',
                'label' => __('Source', 'acfe'),
                'name' => 'load_source',
                'type' => 'select',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => array(
                    array(
                        array(
                            'field' => 'field_load_active',
                            'operator' => '==',
                            'value' => '1',
                        ),
                    ),
                ),
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                    'data-instruction-placement' => 'field'
                ),
                'choices' => $choices,
                'default_value' => '',
                'allow_null' => 0,
                'multiple' => 0,
                'ui' => 1,
                'ajax' => 1,
                'return_format' => 'value',
                'placeholder' => '',
                'search_placeholder' => __('Select a field or enter a custom value/template tag.', 'acfe'),
                'allow_custom' => 1,
                'ajax_action' => 'acfe/form/map_field_ajax'
            ),
            array(
                'key' => 'field_load_acf_fields',
                'label' => __('Load ACF fields', 'acfe'),
                'name' => 'load_acf_fields',
                'type' => 'checkbox',
                'instructions' => __('Which ACF fields should have their values loaded', 'acfe'),
                'required' => 0,
                'conditional_logic' => array(
                    array(
                        array(
                            'field' => 'field_load_active',
                            'operator' => '==',
                            'value' => '1',
                        ),
                    ),
                ),
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'choices' => array(
                ),
                'allow_custom' => 0,
                'default_value' => array(
                ),
                'layout' => 'vertical',
                'toggle' => 0,
                'return_format' => 'value',
                'save_custom' => 0,
            ),

        );
        
    }
    
}

acfe_register_form_action_type('acfe_module_form_action_option');

endif;