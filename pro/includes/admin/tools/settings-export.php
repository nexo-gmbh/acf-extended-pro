<?php 

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_settings_export')):

class acfe_settings_export extends ACF_Admin_Tool{
    
    function initialize(){
        
        // vars
        $this->name = 'acfe_settings_export';
        $this->title = __('Export Settings');
        
    }
    
    function html(){
        
        // Single
        if($this->is_active()){
            
            $this->html_single();
            
        // Archive
        }else{
            
            $this->html_archive();
            
        }
        
    }
    
    function html_archive(){
        
        ?>
        
        <?php if(acfe_is_acf_6()): ?>

            <div class="acf-postbox-header">
                <h2 class="acf-postbox-title"><?php _e('Export ACF Settings', 'acfe'); ?></h2>
            </div>
            <div class="acf-postbox-inner">
    
        <?php else: ?>

            <p><?php _e('Export ACF Settings', 'acfe'); ?></p>
    
        <?php endif; ?>
        
        <?php
        
        $settings = acfe_get_settings('settings');
        $disabled = empty($settings) ? 'disabled="disabled"' : ''; ?>
        
        <p class="acf-submit" style="margin-top:0;">

            <button type="submit" name="action" class="button button-primary" value="json" <?php echo $disabled; ?>><?php _e('Export File'); ?></button>
            <button type="submit" name="action" class="button" value="php" <?php echo $disabled; ?>><?php _e('Generate PHP'); ?></button>
            
        </p>
    
        <?php if(acfe_is_acf_6()): ?>
            </div>
        <?php endif; ?>
        
        <?php
        
    }
    
    function html_single(){
    
        // enqueue
        wp_enqueue_script('code-editor');
        wp_enqueue_style('code-editor');
        
        ?>
        
        <?php if(acfe_is_acf_6()): ?>
            <div class="acf-postbox-header">
                <h2 class="acf-postbox-title"><?php _e('Export ACF Settings', 'acfe'); ?></h2>
            </div>
        <?php endif; ?>
        
        <div class="acf-postbox-columns" style="margin-top: 0;margin-right: 0;margin-bottom: 0;margin-left: 0;padding: 0;">
            <div class="acf-postbox-main">
                
                <p><?php _e("You can copy and paste the following code to your theme's functions.php file or include it within an external file.", 'acf'); ?></p>
                
                <?php

                $str_replace = array(
                    "  "            => "\t",
                    "'!!__(!!\'"    => "__('",
                    "!!\', !!\'"    => "', '",
                    "!!\')!!'"      => "')",
                    "array ("       => "array("
                );

                $preg_replace = array(
                    '/([\t\r\n]+?)array/'   => 'array',
                    '/[0-9]+ => array/'     => 'array'
                );
                
                ?>
                
                <div id="acf-admin-tool-export">
                    <textarea id="acf-export-textarea" readonly="true"><?php
                    echo "add_action('acf/init', 'my_acf_settings');" . "\r\n";
                    echo "function my_acf_settings(){" . "\r\n" . "\r\n";

                    foreach($this->data as $name => $value){
    
                        acf_update_setting('l10n_var_export', true);
    
                        // code
                        $code = var_export($value, true);
    
                        // change double spaces to tabs
                        $code = str_replace(array_keys($str_replace), array_values($str_replace), $code);
    
                        // correctly formats "=> array("
                        $code = preg_replace(array_keys($preg_replace), array_values($preg_replace), $code);
    
                        // esc_textarea
                        $esc_code = esc_textarea($code);
    
                        if($code === "'1'"){
                            $esc_code = 'true';
                        }elseif($code === "'0'"){
                            $esc_code = 'false';
                        }
    
                        // echo
                        echo "    acf_update_setting('{$name}', {$esc_code});" . "\r\n";
    
                        acf_update_setting('l10n_var_export', false);
    
                    }

                    echo "\r\n" . "}";
                    ?></textarea>
                </div>
                
                <p class="acf-submit">
                    <a class="button" id="acf-export-copy"><?php _e( 'Copy to clipboard', 'acf' ); ?></a>
                </p>

                <script type="text/javascript">
                (function($){

                    if(typeof acf === 'undefined'){
                        return;
                    }

                    // acf 6.0 add display block;
                    $('#acf-admin-tools #normal-sortables').css('display', 'block');

                    acf.addAction('ready', function(){

                        // elements
                        var $a = $('#acf-export-copy');
                        var $textarea = $('#acf-export-textarea');

                        // initialize code mirror
                        var edit = wp.codeEditor.initialize($textarea.get(0), {

                            codemirror: $.extend(wp.codeEditor.defaultSettings.codemirror, {
                                lineNumbers:      true,
                                lineWrapping:     true,
                                styleActiveLine:  false,
                                continueComments: true,
                                indentUnit:       4,
                                tabSize:          1,
                                indentWithTabs:   false,
                                mode:             'text/x-php',
                                extraKeys:        {
                                    'Tab':       function(cm){cm.execCommand('indentMore')},
                                    'Shift-Tab': function(cm){cm.execCommand('indentLess')},
                                },
                            })

                        });

                        // set height
                        edit.codemirror.getScrollerElement().style.minHeight = 15 * 18.5 + 'px';

                        if(!document.queryCommandSupported('copy')){
                            return $a.remove();
                        }

                        $a.on('click', function(e){

                            e.preventDefault();
                            var $this = $(this);

                            // copy
                            navigator.clipboard.writeText(edit.codemirror.getValue()).then(function(){

                                // tooltip
                                acf.newTooltip({
                                    text:       "<?php _e('Copied', 'acf'); ?>",
                                    timeout:    250,
                                    target:     $this,
                                });

                            });

                        });

                    });

                })(jQuery);
                </script>
            </div>
        </div>
        <?php
    
    }
    
    function load(){
        
        if(!$this->is_active())
            return;
            
        $this->action = $this->get_action();
        $this->data = $this->get_data();
        
        // Json
        if($this->action === 'json'){
            
            $this->submit();
            
        }
        
        // PHP
        elseif($this->action === 'php'){
    
            // add notice
            if(!empty($this->data)){
                
                acf_add_admin_notice(__('Settings exported.'), 'success');
        
            }
            
        }
        
    }
    
    function submit(){
        
        $this->action = $this->get_action();
        $this->data = $this->get_data();
        
        // Json
        if($this->action === 'json'){
            
            // Date
            $date = date('Y-m-d');
            
            // file
            $file_name = 'acfe-export-settings-' .  $date . '.json';
            
            // headers
            header("Content-Description: File Transfer");
            header("Content-Disposition: attachment; filename={$file_name}");
            header("Content-Type: application/json; charset=utf-8");
            
            // return
            echo acf_json_encode($this->data);
        
        }
        
        // PHP
        elseif($this->action === 'php'){
            
            // url
            $url = add_query_arg(array(
                'action' => 'php'
            ), $this->get_url());
            
            // redirect
            wp_redirect($url);
            
        }
    
        exit;
        
    }
    
    function get_data(){
        
        // export
        $data = acfe_get_settings('settings', array());
        
        return $data;
        
    }
    
    function get_action(){
        
        // vars
        $default = 'json';
        $action = acfe_maybe_get_REQUEST('action', $default);
        
        // check allowed
        if(!in_array($action, array('json', 'php')))
            $action = $default;
        
        // return
        return $action;
        
    }
    
}

acf_register_admin_tool('acfe_settings_export');

endif;