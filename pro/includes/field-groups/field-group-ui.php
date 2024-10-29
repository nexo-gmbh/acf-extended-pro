<?php

if(!defined('ABSPATH')){
    exit;
}

// check setting
if(!acfe_get_setting('modules/field_group_ui')){
    return;
}

if(!class_exists('acfe_field_group_ui')):

class acfe_field_group_ui{
    
    /**
     * construct
     */
    function __construct(){
        
        add_action('acf/field_group/admin_enqueue_scripts', array($this, 'admin_enqueue_scripts'));
        add_action('acf/field_group/admin_head',            array($this, 'admin_head'), 5);
        add_action('acf/field_group/admin_head',            array($this, 'prepare_data'));
        add_action('acf/field_group/admin_head',            array($this, 'prepare_meta'));
        
        // acf 6.1
        if(acfe_is_acf_61()){
            add_action('acf/render_field_group_settings', array($this, 'render_settings_acf_61'));
            
        // acf 6.0
        }elseif(acfe_is_acf_6()){
            add_action('acf/render_field_group_settings', array($this, 'render_settings_acf_60'));
            
        // acf 5.10 and earlier
        }else{
            add_action('acf/render_field_group_settings',   array($this, 'render_settings'));
        }
        
        
    }
    
    /**
     * admin_enqueue_scripts
     */
    function admin_enqueue_scripts(){
    
        acf_localize_text(array(
            'Enter a Field Type'                => __('Enter a Field Type', 'acfe'),
            'Enter the Field Label'             => __('Enter the Field Label', 'acfe'),
            'Hint: Shift to bypass this prompt' => __('Hint: Shift to bypass this prompt', 'acfe'),
            'Shift+click: Alternative mode'     => __('Shift+click: Alternative mode', 'acfe'),
        ));
        
    }
    
    
    /**
     * admin_head
     */
    function admin_head(){
    
        global $field_group;
        
        // enable filter
        if(acf_maybe_get($field_group, 'acfe_form')){
            acf_enable_filter('acfe/field_group/advanced');
        }
        
    }
    
    /**
     * prepare_data
     */
    function prepare_data(){
    
        add_action('acf/render_field/name=acfe_data', array($this, 'render_data'));
        
    }
    
    /**
     * render_settings
     *
     * ACF 5.10 and earlier
     *
     * @param $field_group
     */
    function render_settings($field_group){
    
        // general
        acf_render_field_wrap(array(
            'label' => 'General',
            'type'  => 'tab',
            'key'  => 'general',
            'wrapper' => array(
                'data-no-preference' => true,
                'data-before' => 'active'
            )
        ));
        
        // form settings
        acf_render_field_wrap(array(
            'label'         => __('Advanced settings', 'acfe'),
            'name'          => 'acfe_form',
            'prefix'        => 'acf_field_group',
            'type'          => 'true_false',
            'ui'            => 1,
            'instructions'  => __('Enable advanced fields settings & validation'),
            'value'         => (isset($field_group['acfe_form'])) ? $field_group['acfe_form'] : '',
            'required'      => false,
            'wrapper'       => array(
                'data-after' => 'active'
            )
        ));
        
        // display title
        acf_render_field_wrap(array(
            'label'         => __('Display title', 'acfe'),
            'instructions'  => __('Render this title on edit post screen', 'acfe'),
            'type'          => 'text',
            'name'          => 'acfe_display_title',
            'prefix'        => 'acf_field_group',
            'value'         => acf_maybe_get($field_group, 'acfe_display_title'),
            'placeholder'   => '',
            'prepend'       => '',
            'append'        => '',
            'wrapper'       => array(
                'data-before' => 'menu_order'
            )
        ));
    
        // hide on screen
        acf_render_field_wrap(array(
            'label' => 'Screen',
            'type'  => 'tab',
            'key'   => 'screen',
            'wrapper'       => array(
                'data-before' => 'acfe_display_title'
            )
        ));
    
        if(acf_maybe_get($field_group, 'acfe_permissions') || acf_is_filter_enabled('acfe/field_group/advanced')){
    
            // permissions
            acf_render_field_wrap(array(
                'label' => 'Permissions',
                'type'  => 'tab',
                'key'   => 'permissions'
            ));
            
            acf_render_field_wrap(array(
                'label'         => __('Permissions'),
                'name'          => 'acfe_permissions',
                'prefix'        => 'acf_field_group',
                'type'          => 'checkbox',
                'instructions'  => __('Select user roles that are allowed to view and edit this field group in post edition'),
                'required'      => false,
                'default_value' => false,
                'choices'       => acfe_get_roles(),
                'value'         => acf_maybe_get($field_group, 'acfe_permissions', array()),
                'layout'        => 'vertical'
            ));
            
        }
    
        // advanced
        acf_render_field_wrap(array(
            'label' => 'Data',
            'type'  => 'tab',
            'key'   => 'advanced'
        ));
    
        // meta
        acf_render_field_wrap(array(
            'label'         => __('Custom meta data'),
            'name'          => 'acfe_meta',
            'key'           => 'acfe_meta',
            'instructions'  => __('Add custom meta data to the field group.'),
            'prefix'        => 'acf_field_group',
            'type'          => 'repeater',
            'button_label'  => __('+ Meta'),
            'required'      => false,
            'layout'        => 'table',
            'value'         => (isset($field_group['acfe_meta'])) ? $field_group['acfe_meta'] : array(),
            'wrapper'       => array(
                'data-enable-switch' => true
            ),
            'sub_fields'    => array(
                array(
                    'ID'            => false,
                    'label'         => __('Key'),
                    'name'          => 'acfe_meta_key',
                    'key'           => 'acfe_meta_key',
                    'prefix'        => '',
                    '_name'         => '',
                    '_prepare'      => '',
                    'type'          => 'text',
                    'instructions'  => false,
                    'required'      => false,
                    'wrapper'       => array(
                        'width' => '',
                        'class' => '',
                        'id'    => '',
                    ),
                ),
                array(
                    'ID'            => false,
                    'label'         => __('Value'),
                    'name'          => 'acfe_meta_value',
                    'key'           => 'acfe_meta_value',
                    'prefix'        => '',
                    '_name'         => '',
                    '_prepare'      => '',
                    'type'          => 'text',
                    'instructions'  => false,
                    'required'      => false,
                    'wrapper'       => array(
                        'width' => '',
                        'class' => '',
                        'id'    => '',
                    ),
                ),
            )
        ));
    
        // data
        acf_render_field_wrap(array(
            'label'         => __('Field group data'),
            'instructions'  => __('View raw field group data, for development use'),
            'type'          => 'acfe_dynamic_render',
            'name'          => 'acfe_data',
            'prefix'        => 'acf_field_group',
            'value'         => $field_group['key'],
        ));
    
        // note
        acf_render_field_wrap(array(
            'label' => 'Note',
            'type'  => 'tab',
            'key'   => 'note'
        ));
    
        // note
        acf_render_field_wrap(array(
            'label'         => __('Note'),
            'name'          => 'acfe_note',
            'prefix'        => 'acf_field_group',
            'type'          => 'textarea',
            'instructions'  => __('Add personal note. Only visible to administrators'),
            'value'         => (isset($field_group['acfe_note'])) ? $field_group['acfe_note'] : '',
            'required'      => false
        ));
        
    }
    
    
    /**
     * render_settings_acf_60
     *
     * ACF 6.0
     *
     * @param $field_group
     */
    function render_settings_acf_60($field_group){
    
        // advanced settings
        acf_render_field_wrap(array(
            'label'         => __('Advanced settings', 'acfe'),
            'name'          => 'acfe_form',
            'prefix'        => 'acf_field_group',
            'type'          => 'true_false',
            'ui'            => 1,
            'instructions'  => __('Enable advanced fields settings & validation'),
            'value'         => (isset($field_group['acfe_form'])) ? $field_group['acfe_form'] : '',
            'required'      => false,
            'wrapper'       => array(
                'data-after' => 'active'
            )
        ), 'div', 'label', true);
    
        // display title
        acf_render_field_wrap(array(
            'label'         => __('Display title', 'acfe'),
            'instructions'  => __('Render this title on edit post screen', 'acfe'),
            'type'          => 'text',
            'name'          => 'acfe_display_title',
            'prefix'        => 'acf_field_group',
            'value'         => acf_maybe_get($field_group, 'acfe_display_title'),
            'placeholder'   => '',
            'prepend'       => '',
            'append'        => '',
        ), 'div', 'label', true);
        
        echo '</div>';
    
        if(acf_maybe_get($field_group, 'acfe_permissions') || acf_is_filter_enabled('acfe/field_group/advanced')){
    
            acf_render_field_wrap(
                array(
                    'type'  => 'tab',
                    'label' => __('Permissions', 'acfe'),
                    'key'   => 'acf_field_group_settings_tabs',
                )
            );
    
            echo '<div class="field-group-settings field-group-settings-tab">';
        
            // permissions
            acf_render_field_wrap(array(
                'label'         => __('Permissions', 'acfe'),
                'name'          => 'acfe_permissions',
                'prefix'        => 'acf_field_group',
                'type'          => 'checkbox',
                'instructions'  => __('Select user roles that are allowed to view and edit this field group in post edition', 'acfe'),
                'required'      => false,
                'default_value' => false,
                'choices'       => acfe_get_roles(),
                'value'         => acf_maybe_get($field_group, 'acfe_permissions', array()),
                'layout'        => 'vertical'
            ), 'div', 'label', true);
    
            echo '</div>';
        
        }
    
        acf_render_field_wrap(
            array(
                'type'  => 'tab',
                'label' => __('Data', 'acfe'),
                'key'   => 'acf_field_group_settings_tabs',
            )
        );
    
        echo '<div class="field-group-settings field-group-settings-tab">';
    
        // meta
        acf_render_field_wrap(array(
            'label'         => __('Custom meta data', 'acfe'),
            'name'          => 'acfe_meta',
            'key'           => 'acfe_meta',
            'instructions'  => __('Add custom meta data to the field group.', 'acfe'),
            'prefix'        => 'acf_field_group',
            'type'          => 'repeater',
            'button_label'  => __('+ Meta'),
            'required'      => false,
            'layout'        => 'table',
            'value'         => (isset($field_group['acfe_meta'])) ? $field_group['acfe_meta'] : array(),
            'wrapper'       => array(
                'data-enable-switch' => true
            ),
            'sub_fields'    => array(
                array(
                    'ID'            => false,
                    'label'         => __('Key'),
                    'name'          => 'acfe_meta_key',
                    'key'           => 'acfe_meta_key',
                    'prefix'        => '',
                    '_name'         => '',
                    '_prepare'      => '',
                    'type'          => 'text',
                    'instructions'  => false,
                    'required'      => false,
                    'wrapper'       => array(
                        'width' => '',
                        'class' => '',
                        'id'    => '',
                    ),
                ),
                array(
                    'ID'            => false,
                    'label'         => __('Value'),
                    'name'          => 'acfe_meta_value',
                    'key'           => 'acfe_meta_value',
                    'prefix'        => '',
                    '_name'         => '',
                    '_prepare'      => '',
                    'type'          => 'text',
                    'instructions'  => false,
                    'required'      => false,
                    'wrapper'       => array(
                        'width' => '',
                        'class' => '',
                        'id'    => '',
                    ),
                ),
            )
        ), 'div', 'label', true);
    
        // data
        acf_render_field_wrap(array(
            'label'         => __('Field group data', 'acfe'),
            'instructions'  => __('View raw field group data, for development use', 'acfe'),
            'type'          => 'acfe_dynamic_render',
            'name'          => 'acfe_data',
            'prefix'        => 'acf_field_group',
            'value'         => $field_group['key'],
        ), 'div', 'label', true);
    
        echo '</div>';
    
        acf_render_field_wrap(
            array(
                'type'  => 'tab',
                'label' => __('Note', 'acfe'),
                'key'   => 'acf_field_group_settings_tabs',
            )
        );
    
        echo '<div class="field-group-settings field-group-settings-tab">';
    
        // note
        acf_render_field_wrap(array(
            'label'         => __('Note', 'acfe'),
            'name'          => 'acfe_note',
            'prefix'        => 'acf_field_group',
            'type'          => 'textarea',
            'instructions'  => __('Add personal note. Only visible to administrators', 'acfe'),
            'value'         => (isset($field_group['acfe_note'])) ? $field_group['acfe_note'] : '',
            'required'      => false
        ), 'div', 'label', true);
    
    }
    
    
    /**
     * render_settings_acf_61
     *
     * ACF 6.1
     *
     * @param $field_group
     */
    function render_settings_acf_61($field_group){
        
        // advanced settings
        acf_render_field_wrap(array(
            'label'         => __('Advanced settings', 'acfe'),
            'name'          => 'acfe_form',
            'prefix'        => 'acf_field_group',
            'type'          => 'true_false',
            'ui'            => 1,
            'instructions'  => __('Enable advanced fields settings & validation'),
            'value'         => (isset($field_group['acfe_form'])) ? $field_group['acfe_form'] : '',
            'required'      => false,
            'wrapper'       => array(
                'data-after' => 'active'
            )
        ), 'div', 'label', true);
        
        // display title
        acf_render_field_wrap(array(
            'label'         => __('Display title', 'acfe'),
            'instructions'  => __('Render this title on edit post screen', 'acfe'),
            'type'          => 'text',
            'name'          => 'acfe_display_title',
            'prefix'        => 'acf_field_group',
            'value'         => acf_maybe_get($field_group, 'acfe_display_title'),
            'placeholder'   => '',
            'prepend'       => '',
            'append'        => '',
            'wrapper'       => array(
                'data-after' => 'description'
            )
        ), 'div', 'label', true);
        
        if(acf_maybe_get($field_group, 'acfe_permissions') || acf_is_filter_enabled('acfe/field_group/advanced')){
            
            acf_render_field_wrap(
                array(
                    'type'  => 'tab',
                    'label' => __('Permissions', 'acfe'),
                    'key'   => 'acf_field_group_settings_tabs',
                )
            );
            
            echo '<div class="field-group-settings field-group-settings-tab">';
            
            // permissions
            acf_render_field_wrap(array(
                'label'         => __('Permissions', 'acfe'),
                'name'          => 'acfe_permissions',
                'prefix'        => 'acf_field_group',
                'type'          => 'checkbox',
                'instructions'  => __('Select user roles that are allowed to view and edit this field group in post edition', 'acfe'),
                'required'      => false,
                'default_value' => false,
                'choices'       => acfe_get_roles(),
                'value'         => acf_maybe_get($field_group, 'acfe_permissions', array()),
                'layout'        => 'vertical'
            ), 'div', 'label', true);
            
            echo '</div>';
            
        }
        
        acf_render_field_wrap(
            array(
                'type'  => 'tab',
                'label' => __('Data', 'acfe'),
                'key'   => 'acf_field_group_settings_tabs',
            )
        );
        
        echo '<div class="field-group-settings field-group-settings-tab">';
        
        // meta
        acf_render_field_wrap(array(
            'label'         => __('Custom meta data', 'acfe'),
            'name'          => 'acfe_meta',
            'key'           => 'acfe_meta',
            'instructions'  => __('Add custom meta data to the field group.', 'acfe'),
            'prefix'        => 'acf_field_group',
            'type'          => 'repeater',
            'button_label'  => __('+ Meta'),
            'required'      => false,
            'layout'        => 'table',
            'value'         => (isset($field_group['acfe_meta'])) ? $field_group['acfe_meta'] : array(),
            'wrapper'       => array(
                'data-enable-switch' => true
            ),
            'sub_fields'    => array(
                array(
                    'ID'            => false,
                    'label'         => __('Key'),
                    'name'          => 'acfe_meta_key',
                    'key'           => 'acfe_meta_key',
                    'prefix'        => '',
                    '_name'         => '',
                    '_prepare'      => '',
                    'type'          => 'text',
                    'instructions'  => false,
                    'required'      => false,
                    'wrapper'       => array(
                        'width' => '',
                        'class' => '',
                        'id'    => '',
                    ),
                ),
                array(
                    'ID'            => false,
                    'label'         => __('Value'),
                    'name'          => 'acfe_meta_value',
                    'key'           => 'acfe_meta_value',
                    'prefix'        => '',
                    '_name'         => '',
                    '_prepare'      => '',
                    'type'          => 'text',
                    'instructions'  => false,
                    'required'      => false,
                    'wrapper'       => array(
                        'width' => '',
                        'class' => '',
                        'id'    => '',
                    ),
                ),
            )
        ), 'div', 'label', true);
        
        // data
        acf_render_field_wrap(array(
            'label'         => __('Field group data', 'acfe'),
            'instructions'  => __('View raw field group data, for development use', 'acfe'),
            'type'          => 'acfe_dynamic_render',
            'name'          => 'acfe_data',
            'prefix'        => 'acf_field_group',
            'value'         => $field_group['key'],
        ), 'div', 'label', true);
        
        echo '</div>';
        
        acf_render_field_wrap(
            array(
                'type'  => 'tab',
                'label' => __('Note', 'acfe'),
                'key'   => 'acf_field_group_settings_tabs',
            )
        );
        
        echo '<div class="field-group-settings field-group-settings-tab">';
        
        // note
        acf_render_field_wrap(array(
            'label'         => __('Note', 'acfe'),
            'name'          => 'acfe_note',
            'prefix'        => 'acf_field_group',
            'type'          => 'textarea',
            'instructions'  => __('Add personal note. Only visible to administrators', 'acfe'),
            'value'         => (isset($field_group['acfe_note'])) ? $field_group['acfe_note'] : '',
            'required'      => false
        ), 'div', 'label', true);
        
        echo '</div>';
        
    }
    
    
    /**
     * render_data
     *
     * @param $field
     */
    function render_data($field){
        
        // get field group
        $field_group = acf_get_field_group($field['value']);
        
        if(!$field_group){
            echo '<a href="#" class="button disabled" disabled>' . __('Data') . '</a>';
            return;
        }
        
        // esc field group
        $field_group = @map_deep($field_group, 'esc_html');
        
        // get raw field group
        $raw_field_group = get_post($field_group['ID']);
        $raw_field_group = @map_deep($raw_field_group, 'esc_html');
    
        ?>
        <a href="#" class="acf-button button" data-modal><?php _e('Data', 'acfe'); ?></a>
        <div class="acfe-modal" data-title="<?php echo $field_group['title']; ?>" data-footer="<?php _e('Close', 'acfe'); ?>">
            <div class="acfe-modal-spacer">
                <pre style="margin-bottom:15px;"><?php print_r($field_group); ?></pre>
                <pre><?php print_r($raw_field_group); ?></pre>
            </div>
        </div>
        <?php
        
    }
    
    
    /**
     * prepare_meta
     */
    function prepare_meta(){
        
        $names = array('acfe_meta', 'acfe_meta_key', 'acfe_meta_value');
        
        foreach($names as $name){
            
            add_filter("acf/prepare_field/name={$name}", function($field){
                
                $field['prefix'] = str_replace('row-', '', $field['prefix']);
                $field['name'] = str_replace('row-', '', $field['name']);
                
                return $field;
                
            });
            
        }
        
    }
    
}

// initialize
new acfe_field_group_ui();

endif;