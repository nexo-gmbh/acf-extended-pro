<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('ACFE_Pro')):

class ACFE_Pro{
    
    /**
     * construct
     */
    function __construct(){
        
        // acfe
        $acfe = acfe();
        
        // constants
        $acfe->constants(array(
            'ACFE_PRO' => true,
        ));
        
        // settings
        $acfe->settings(array(
            'modules/classic_editor'          => false,
            'modules/field_group_ui'          => true,
            'modules/force_sync'              => false,
            'modules/force_sync/delete'       => false,
            'modules/forms/shortcode_preview' => false,
            'modules/global_field_condition'  => true,
            'modules/rewrite_rules'           => true,
            'modules/screen_layouts'          => true,
            'modules/scripts'                 => true,
            'modules/scripts/demo'            => false,
            'modules/templates'               => true,
        ));
        
        // functions
        acfe_include('pro/includes/acfe-helper-functions.php');
        acfe_include('pro/includes/acfe-payment-functions.php');
        acfe_include('pro/includes/acfe-script-functions.php');
        acfe_include('pro/includes/acfe-world-functions.php');
        acfe_include('pro/includes/google-map.php');
        acfe_include('pro/includes/payment.php');
        acfe_include('pro/includes/world.php');
        
        // form
        acfe_include('pro/includes/modules/form/module-form-action-option.php');
        acfe_include('pro/includes/modules/form/module-form-ajax.php');
        acfe_include('pro/includes/modules/form/module-form-shortcode.php');
        
        // template
        acfe_include('pro/includes/modules/template/module-template.php');
        acfe_include('pro/includes/modules/template/module-template-compat.php');
        acfe_include('pro/includes/modules/template/module-template-features.php');
        acfe_include('pro/includes/modules/template/module-template-fields.php');
        acfe_include('pro/includes/modules/template/module-template-upgrades.php');
    
        // module
        acfe_include('pro/includes/module-item.php');
        acfe_include('pro/includes/module-local.php');
        acfe_include('pro/includes/module-posts.php');
        acfe_include('pro/includes/module-sync.php');
    
        // compatibility
        acfe_include('pro/includes/compatibility.php');
        acfe_include('pro/includes/third-party.php');
        
        // admin
        acfe_include('pro/includes/admin/dashboard.php');
        acfe_include('pro/includes/admin/menu.php');
        acfe_include('pro/includes/admin/settings.php');
        
        // scripts
        acfe_include('pro/includes/modules/script/module-script-class.php');
        
        // includes
        add_action('acf/init',                  array($this, 'init'), 99);
        add_action('acf/include_field_types',   array($this, 'include_field_types'), 99);
        add_action('acf/include_admin_tools',   array($this, 'include_admin_tools'));
        
    }
    
    
    /**
     * init
     *
     * acf/init:99
     */
    function init(){
        
        // core
        acfe_include('pro/includes/assets.php');
        acfe_include('pro/includes/hooks.php');
        acfe_include('pro/includes/media.php');
        acfe_include('pro/includes/updater.php');
        acfe_include('pro/includes/updates.php');
    
        // fields
        acfe_include('pro/includes/fields/field-checkbox.php');
        acfe_include('pro/includes/fields/field-column.php');
        acfe_include('pro/includes/fields/field-color-picker.php');
        acfe_include('pro/includes/fields/field-date-picker.php');
        acfe_include('pro/includes/fields/field-date-time-picker.php');
        acfe_include('pro/includes/fields/field-file.php');
        acfe_include('pro/includes/fields/field-image.php');
        acfe_include('pro/includes/fields/field-flexible-content-grid.php');
        acfe_include('pro/includes/fields/field-flexible-content-locations.php');
        acfe_include('pro/includes/fields/field-google-map.php');
        acfe_include('pro/includes/fields/field-post-object.php');
        acfe_include('pro/includes/fields/field-radio.php');
        acfe_include('pro/includes/fields/field-relationship.php');
        acfe_include('pro/includes/fields/field-select.php');
        acfe_include('pro/includes/fields/field-time-picker.php');
        acfe_include('pro/includes/fields/field-true-false.php');
        acfe_include('pro/includes/fields/field-tab.php');
        acfe_include('pro/includes/fields/field-wysiwyg.php');
        
        // fields settings
        acfe_include('pro/includes/fields-settings/instructions.php');
        acfe_include('pro/includes/fields-settings/min-max.php');
        acfe_include('pro/includes/fields-settings/required.php');
        acfe_include('pro/includes/fields-settings/visibility.php');
        
        
        // field groups
        acfe_include('pro/includes/field-groups/field-group-hide-on-screen.php');
        acfe_include('pro/includes/field-groups/field-group-ui.php');
        
        // locations
        acfe_include('pro/includes/locations/acfe-location.php');
        acfe_include('pro/includes/locations/acfe-location-rules.php');
        acfe_include('pro/includes/locations/attachment-list.php');
        acfe_include('pro/includes/locations/dashboard.php');
        acfe_include('pro/includes/locations/menu-item-depth.php');
        acfe_include('pro/includes/locations/menu-item-type.php');
        acfe_include('pro/includes/locations/post-author.php');
        acfe_include('pro/includes/locations/post-author-role.php');
        acfe_include('pro/includes/locations/post-date.php');
        acfe_include('pro/includes/locations/post-date-time.php');
        acfe_include('pro/includes/locations/post-path.php');
        acfe_include('pro/includes/locations/post-screen.php');
        acfe_include('pro/includes/locations/post-slug.php');
        acfe_include('pro/includes/locations/post-time.php');
        acfe_include('pro/includes/locations/post-title.php');
        acfe_include('pro/includes/locations/settings.php');
        acfe_include('pro/includes/locations/taxonomy-term.php');
        acfe_include('pro/includes/locations/taxonomy-term-name.php');
        acfe_include('pro/includes/locations/taxonomy-term-parent.php');
        acfe_include('pro/includes/locations/taxonomy-term-slug.php');
        acfe_include('pro/includes/locations/taxonomy-term-type.php');
        acfe_include('pro/includes/locations/user-list.php');
        acfe_include('pro/includes/locations/woocommerce.php');
        
        // modules
        acfe_include('pro/includes/modules/dev/module-dev-clean-meta.php');
        acfe_include('pro/includes/modules/dev/module-dev-edit-meta.php');
        acfe_include('pro/includes/modules/dev/module-dev-metabox.php');
        acfe_include('pro/includes/modules/performance/module-performance-hybrid.php');
        acfe_include('pro/includes/modules/performance/module-performance-hybrid-revisions.php');
        acfe_include('pro/includes/modules/classic-editor.php');
        acfe_include('pro/includes/modules/force-sync.php');
        acfe_include('pro/includes/modules/global-field-condition.php');
        acfe_include('pro/includes/modules/rewrite-rules.php');
        acfe_include('pro/includes/modules/screen-layouts.php');
        
        // script
        acfe_include('pro/includes/modules/script/module-script.php');
        acfe_include('pro/includes/modules/script/module-script-table.php');
        
    }
    
    
    /**
     * include_field_types
     *
     * acf/include_field_types:99
     */
    function include_field_types(){
        
        acfe_include('pro/includes/fields/field-address.php');
        acfe_include('pro/includes/fields/field-block-editor.php');
        acfe_include('pro/includes/fields/field-block-types.php');
        acfe_include('pro/includes/fields/field-countries.php');
        acfe_include('pro/includes/fields/field-currencies.php');
        acfe_include('pro/includes/fields/field-date-range-picker.php');
        acfe_include('pro/includes/fields/field-field-groups.php');
        acfe_include('pro/includes/fields/field-field-types.php');
        acfe_include('pro/includes/fields/field-fields.php');
        acfe_include('pro/includes/fields/field-image-selector.php');
        acfe_include('pro/includes/fields/field-image-sizes.php');
        acfe_include('pro/includes/fields/field-languages.php');
        acfe_include('pro/includes/fields/field-menus.php');
        acfe_include('pro/includes/fields/field-menu-locations.php');
        acfe_include('pro/includes/fields/field-options-pages.php');
        acfe_include('pro/includes/fields/field-payment.php');
        acfe_include('pro/includes/fields/field-payment-cart.php');
        acfe_include('pro/includes/fields/field-payment-selector.php');
        acfe_include('pro/includes/fields/field-phone-number.php');
        acfe_include('pro/includes/fields/field-post-field.php');
        acfe_include('pro/includes/fields/field-post-formats.php');
        acfe_include('pro/includes/fields/field-templates.php');
        
    }
    
    
    /**
     * include_admin_tools
     *
     * acf/include_admin_tools
     */
    function include_admin_tools(){
    
        acfe_include('pro/includes/admin/tools/rewrite-rules-export.php');
        acfe_include('pro/includes/admin/tools/settings-export.php');
        acfe_include('pro/includes/admin/tools/settings-import.php');
        
    }
    
}

new ACFE_Pro();

endif;