<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_module_form_shortcode_preview')):

class acfe_module_form_shortcode_preview{
    
    /*
     * Construct
     */
    function __construct(){
        
        // filters
        add_filter('mce_css',                               array($this, 'mce_css'));
    
        // ajax
        add_action('wp_ajax_acfe/form/shortcode',           array($this, 'ajax_shortcode'));
        add_action('wp_ajax_nopriv_acfe/form/shortcode',    array($this, 'ajax_shortcode'));
        
    }
    
    /*
     * TinyMCE CSS
     */
    function mce_css($css){
        
        // shortcode preview setting
        $preview = acfe_get_setting('modules/forms/shortcode_preview');
        
        // bail early
        if($preview === false){
            return $css;
        }
        
        global $wp_styles;
        $src = array();
        $acf_styles = array('acf-global', 'acf-input', 'acf-pro-input', 'acf-extended', 'acf-extended-input', 'acf-extended-pro-input');
        
        // loop
        foreach($wp_styles->registered as $handle => $style){
            
            if(!in_array($handle, $acf_styles)) continue;
            
            // add to list
            $src[] = $style->src;
            
        }
        
        // check list
        if($src){
            
            $css .= !empty($css) ? ',' : '';
            $css .= implode(',', $src);
            
        }
        
        return $css;
        
    }
    
    /*
     * Shortcode
     */
    function ajax_shortcode(){
    
        // validate
        if(!acf_verify_ajax()) die;
    
        // get instance for ajax
        $instance = acf_get_instance('acfe_module_form_front');
        $shortcode = acf_get_instance('acfe_module_form_shortcode');
    
        // vars
        $args = acf_maybe_get_POST('args', array());
        $form = $instance->get_form($args);
        $preview = acfe_get_setting('modules/forms/shortcode_preview');
    
        // no preview
        if(!$form || $preview === false){
            return;
        }
        
        // force array
        $preview = acf_get_array($preview);
    
        // no preview to display
        if(!empty($preview) && ((!empty($form['ID']) && in_array($form['ID'], $preview)) || in_array($form['name'], $preview))){
            
            // set preview mode
            global $is_preview;
            $is_preview = true;
            
            // display form
            echo $shortcode->render_shortcode($form);
            
            die;
            
        }
    
    }
    
}

acf_new_instance('acfe_module_form_shortcode_preview');

endif;