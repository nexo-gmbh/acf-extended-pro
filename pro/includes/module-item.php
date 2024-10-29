<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_pro_module_item')):

class acfe_pro_module_item{
    
    /**
     * construct
     */
    function __construct(){
        
        add_filter('acfe/module/validate_item',         array($this, 'validate_item'), 15);
        add_action('acfe/module/register_field_groups', array($this, 'register_field_groups'), 15, 2);
        
    }
    
    
    /**
     * validate_item
     *
     * @param $item
     *
     * @return mixed
     */
    function validate_item($item){
        
        if(!isset($item['acfe_autosync'])){
            $item['acfe_autosync'] = array();
        }
        
        return $item;
        
    }
    
    
    /**
     * register_field_groups
     *
     * @param $field_groups
     * @param $module
     *
     * @return mixed
     */
    function register_field_groups($field_groups, $module){
        
        $field_groups[] = array(
            'key' => 'group_acfe_module_side',
            'title' => __('Settings', 'acfe'),

            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => $module->post_type,
                    ),
                ),
            ),
            'menu_order' => 1,
            'position' => 'side',
            'style' => 'default',
            'label_placement' => 'top',
            'instruction_placement' => 'label',
            'hide_on_screen' => '',
            'active' => true,
            'description' => '',
            'fields' => array(
                
                array(
                    'key' => 'field_active',
                    'label' => __('Active', 'acf'),
                    'name' => 'active',
                    'type' => 'true_false',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'message' => '',
                    'default_value' => 1,
                    'ui' => 1,
                    'ui_on_text' => '',
                    'ui_off_text' => '',
                ),
                
                array(
                    'key' => 'field_sync_available',
                    'label' => __('Sync available', 'acf'),
                    'name' => 'sync_available',
                    'type' => 'acfe_dynamic_render',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'callback' => array(
                        
                        'prepare_field' => function($field){
    
                            global $item, $module;
    
                            if(!$item || !$module){
                                return false;
                            }
                            
                            if(!acf_get_setting('acfe/json') && !acf_get_setting('acfe/php')){
                                return false;
                            }
                            
                            $data = array(
                                'php' => acfe_module_get_local_item_status($item, 'php', $module),
                                'json' => acfe_module_get_local_item_status($item, 'json', $module),
                            );
                            
                            $sync_available = false;
    
                            foreach($data as $info){
                            
                                if($info['status'] === 'sync_available'){
                                    $sync_available = true;
                                    break;
                                }
                            
                            }
                            
                            if(!$sync_available){
                                return false;
                            }
                            
                            return $field;
                            
                        },
                        
                        'render_field' => function($field){
    
                            global $item, $module;
    
                            if(!$item || !$module){
                                return;
                            }
    
                            $attrs = array(
                                'href'        => '#',
                                'class'       => 'button acf-button',
                                'data-id'     => $item['ID'],
                                'data-event'  => 'review-sync',
                                'data-module' => $module->name,
                                'data-nonce'  => wp_create_nonce('bulk-posts'),
                            );
                        
                            ?><a <?php echo acf_esc_atts($attrs); ?>><?php _e('Review changes', 'acf'); ?></a><?php
                        
                        }
                        
                    )
                ),
                
                array(
                    'key' => 'field_acfe_autosync',
                    'label' => __('Auto Sync', 'acfe'),
                    'name' => 'acfe_autosync',
                    'type' => 'checkbox',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'choices' => array(),
                    'callback' => array(
                        
                        'prepare_field' => function($field){

                            global $item, $module, $pagenow;

                            if(!$item || !$module){
                                return $field;
                            }
                            
                            // default
                            $choices = array();
                            
                            // check php setting
                            if(acf_get_setting('acfe/php')){
                                $choices['php'] = 'PHP';
                            }
                            
                            // check json setting
                            if(acf_get_setting('acfe/json')){
                                $choices['json'] = 'JSON';
                            }
                            
                            // loop choices
                            foreach(array_keys($choices) as $type){
                                
                                // retrieve data
                                $data = acfe_module_get_local_item_status($item, $type, $module);
                                
                                $wrapper = array(
                                    'class' => 'acf-js-tooltip',
                                    'title' => $data['message_post'],
                                );
                                
                                $icon = $data['warning'] && $pagenow !== 'post-new.php' ? '<span class="dashicons dashicons-warning"></span>' : '';
                                
                                ob_start();
                                ?>
                                <span <?php echo acf_esc_atts($wrapper); ?>>
                                    <?php echo $choices[ $type ]; ?>
                                    <?php echo $icon; ?>
                                </span>
                                <?php
                                
                                $choices[ $type ] = ob_get_clean();
                            
                            }
                            
                            // hide field
                            if(empty($choices)){
                                return false;
                            }
                            
                            // assign choices
                            $field['choices'] = $choices;
                            
                            // return
                            return $field;
                            
                        }
                        
                    )
                ),
            ),
        );
        
        return $field_groups;
    
    }
    
}

acf_new_instance('acfe_pro_module_item');

endif;