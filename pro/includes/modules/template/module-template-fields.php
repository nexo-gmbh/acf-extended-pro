<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_module_template_field_groups')):

class acfe_module_template_field_groups{
    
    /**
     * construct
     */
    function __construct(){
        
        add_filter('acfe/module/register_field_groups/module=template', array($this, 'register_field_groups'), 10, 2);
        
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
            'key' => 'group_acfe_template',
            'title' => __('Template', 'acfe'),
        
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => $module->post_type,
                    ),
                ),
            ),
        
            'menu_order' => 0,
            'position' => 'acf_after_title',
            'style' => 'default',
            'label_placement' => 'left',
            'instruction_placement' => 'label',
            'hide_on_screen' => '',
            'active' => 1,
            'description' => '',
        
            'fields' => array(
                
                array(
                    'key' => 'field_name',
                    'label' => 'Name',
                    'name' => 'name',
                    'type' => 'acfe_slug',
                    'instructions' => __('The template name.', 'acfe'),
                    'required' => 1,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'maxlength' => '',
                ),
    
                array(
                    'key' => 'field_how_it_works',
                    'label' => 'How it works',
                    'name' => 'how_it_works',
                    'type' => 'acfe_dynamic_render',
                    'instructions' => 'The template name',
                    'required' => 1,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'callback' => array(
                        
                        'prepare_field' => function($field){
                            
                            global $field_groups;
                            
                            // hide if template has fields
                            if(!empty($field_groups)){
                                return false;
                            }
                            
                            // return
                            return $field;
                            
                        },
            
                        'render_field' => function(){
                            ?>
                            <p><?php _e('The Dynamic Templates module let you manage default ACF values in an advanced way. In order to start, you need to connect a field group to a specific template. Head over the Field Groups administration, select the field group of your choice and scroll down to the location settings. To connect a field group to a template, choose a classic location (like Post Type = Post) and add a new rule using the “AND” operator. Select the rule "Dynamic Template" under "Forms", then choose your template and save the field group.', 'acfe'); ?></p>
                
                            <p><?php _e('You can now fill up the template page, values will be automatically loaded for the location it is tied to if the user never saved anything. In this screenshot, there is a different template for the "Post Type: Page" & the "Post Type: Post" while using the same field group.', 'acfe'); ?></p>
                
                            <p><?php _e('The Dynamic Template design is smart enough to fulfill complex scenarios. For example, one single template can be used in conjunction with as many field group location as needed. It is also possible to add multiple field groups into a single template to keep things organized.', 'acfe'); ?></p>
                
                            <p><?php _e('<u>Note:</u> Template values will be loaded when the user haven\'t saved any data related to the said values. Typically in a "New Post" situation. If the user save a value, even an empty one, the template won\'t be loaded.', 'acfe'); ?></p>
                
                            <div class="image">
                                <img src="<?php echo acfe_get_url('pro/assets/images/dynamic-template-instructions.jpg'); ?>" />
                            </div>
                            <?php
                        }
        
                    )
                ),
                
            ),
        );
        
        return $field_groups;
        
    }
    
}

acf_new_instance('acfe_module_template_field_groups');

endif;