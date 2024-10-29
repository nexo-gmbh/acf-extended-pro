<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_pro_admin_menu')):

class acfe_pro_admin_menu{
    
    /**
     * construct
     */
    function __construct(){
        
        add_action('admin_menu', array($this, 'admin_menu'), 1000);
        
    }
    
    
    /**
     * admin_menu
     */
    function admin_menu(){
        
        global $submenu;
        $parent = 'edit.php?post_type=acf-field-group';
        
        if(isset($submenu[ $parent ])){
            
            foreach($submenu[ $parent ] as $key => $item){
                
                /**
                 * $item = array(
                 *     0 => Templates
                 *     1 => manage_options
                 *     2 => edit.php?post_type=acfe-template
                 *     3 => Templates
                 * )
                 */
                
                if($item[2] === 'edit.php?post_type=acfe-template'){
                    
                    $position = acfe_is_acf_61() ? 8 : 7;
                    
                    acfe_array_move($submenu['edit.php?post_type=acf-field-group'], $key, $position);
                    
                }
                
            }
            
        }
        
    }
    
}

new acfe_pro_admin_menu();

endif;