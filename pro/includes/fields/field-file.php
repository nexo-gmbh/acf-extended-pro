<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_pro_field_file')):

class acfe_pro_field_file extends acfe_field_extend{
    
    /**
     * initialize
     */
    function initialize(){
        
        $this->name = 'file';
    
        $this->defaults = array(
            'preview_style'   => 'default',
            'placeholder'     => __('Select', 'acf'),
            'upload_folder'   => '',
            'button_label'    => __('Add File','acf'),
            'stylised_button' => 0,
            'file_count'      => 0,
            'multiple'        => 0,
        );
        
        $this->replace = array(
            'render_field',
            'update_value',
            'validate_value',
            'format_value',
        );
        
        // filters
        $this->add_filter('acf/prepare_field/name=library', array($this, 'prepare_library'));
        $this->add_field_filter('acfe/upload_dir',          array($this, 'upload_dir'), 10, 2);
        
    }
    
    
    /**
     * prepare_library
     *
     * @param $field
     *
     * @return mixed
     */
    function prepare_library($field){
        
        // check if field group ui setting
        if(acf_maybe_get($field['wrapper'], 'data-setting') === 'file'){
            
            // add conditional logic
            $field['conditional_logic'] = array(
                array(
                    array(
                        'field'     => 'uploader',
                        'operator'  => '==',
                        'value'     => 'wp',
                    )
                ),
                array(
                    array(
                        'field'     => 'uploader',
                        'operator'  => '==',
                        'value'     => '',
                    )
                ),
            );
            
        }
        
        return $field;
        
    }
    
    
    /**
     * upload_dir
     *
     * @param $uploads
     * @param $field
     *
     * @return mixed
     */
    function upload_dir($uploads, $field){
        
        // vars
        $upload_folder = acf_maybe_get($field, 'upload_folder');
        
        // check setting
        if(!$upload_folder){
            return $uploads;
        }
    
        // vars
        $folder = trim($upload_folder);
        $folder = ltrim($folder, '/\\');
        $folder = rtrim($folder, '/\\');
    
        // template tags
        if(stripos($folder, '{year}') !== false || stripos($folder, '{month}') !== false){
        
            $time = current_time('mysql');
            $year = substr($time, 0, 4);
            $month = substr($time, 5, 2);
        
            $folder = str_replace('{year}', $year, $folder);
            $folder = str_replace('{month}', $month, $folder);
        
        }
    
        // change path
        $uploads['path'] = "{$uploads['basedir']}/{$folder}";
        $uploads['url'] = "{$uploads['baseurl']}/{$folder}";
        $uploads['subdir'] = '';
        
        // return
        return $uploads;
        
    }
    
    
    /**
     * render_field_settings
     *
     * @param $field
     */
    function render_field_settings($field){
        
        // Preview Style
        acf_render_field_setting($field, array(
            'label'         => __('Preview Style', 'acfe'),
            'instructions'  => '',
            'name'          => 'preview_style',
            'type'          => 'select',
            'choices'       => array(
                'default'   => 'Default',
                'inline'    => 'Inline',
                'select2'   => 'Select',
            ),
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'uploader',
                        'operator'  => '==',
                        'value'     => 'basic',
                    ),
                    array(
                        'field'     => 'stylised_button',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                ),
                array(
                    array(
                        'field'     => 'uploader',
                        'operator'  => '==',
                        'value'     => 'basic',
                    ),
                    array(
                        'field'     => 'multiple',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                ),
                array(
                    array(
                        'field'     => 'uploader',
                        'operator'  => '==',
                        'value'     => 'wp',
                    ),
                ),
                array(
                    array(
                        'field'     => 'uploader',
                        'operator'  => '==',
                        'value'     => '',
                    ),
                ),
            ),
            'wrapper' => array(
                'data-after' => 'return_format'
            )
        ));
        
        // Placeholder
        acf_render_field_setting($field, array(
            'label'             => __('Placeholder Text', 'acf'),
            'instructions'      => '',
            'name'              => 'placeholder',
            'type'              => 'text',
            'default_value'     => __('Select', 'acf'),
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'preview_style',
                        'operator'  => '==',
                        'value'     => 'inline',
                    ),
                ),
                array(
                    array(
                        'field'     => 'preview_style',
                        'operator'  => '==',
                        'value'     => 'select2',
                    ),
                ),
            ),
            'wrapper' => array(
                'data-after' => 'preview_style'
            )
        ));
        
        $upload_dir = wp_upload_dir();
        $upload_dir_url = $upload_dir['baseurl'];
        $upload_dir_url = trailingslashit(str_replace(home_url(), '', $upload_dir_url));
    
        $default_upload_dir_url = $upload_dir['url'];
        $default_upload_dir_url = trailingslashit(str_replace(home_url(), '', $default_upload_dir_url));
    
        $instructions = __('Leave blank to use the default upload folder.', 'acfe') . ' ' . __('Available template tags:', 'acfe') . ' ' . '<code>{year}</code> <code>{month}</code>';
    
        if($upload_dir_url !== $default_upload_dir_url){
            $instructions .= "<br/>" . __('Current default upload folder:', 'acfe') . ' ' . "<code>{$default_upload_dir_url}</code>";
        }
        
        // Upload folder
        acf_render_field_setting($field, array(
            'label'         => __('Upload Folder', 'acfe'),
            'instructions'  => $instructions,
            'name'          => 'upload_folder',
            'type'          => 'text',
            'prepend'       => $upload_dir_url,
        ));
        
        // Button Label
        acf_render_field_setting($field, array(
            'label'             => __('Button Label', 'acf'),
            'instructions'      => '',
            'name'              => 'button_label',
            'default_value'     => __('Add File','acf'),
            'type'              => 'text',
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'stylised_button',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                ),
                array(
                    array(
                        'field'     => 'multiple',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                ),
                array(
                    array(
                        'field'     => 'uploader',
                        'operator'  => '==',
                        'value'     => 'wp',
                    ),
                ),
                array(
                    array(
                        'field'     => 'uploader',
                        'operator'  => '==',
                        'value'     => '',
                    ),
                ),
            )
        ));
        
        // Stylised button
        acf_render_field_setting($field, array(
            'label'             => __('Stylized Button', 'acfe'),
            'instructions'      => '',
            'name'              => 'stylised_button',
            'type'              => 'true_false',
            'ui'                => 1,
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'uploader',
                        'operator'  => '==',
                        'value'     => 'basic',
                    ),
                    array(
                        'field'     => 'multiple',
                        'operator'  => '!=',
                        'value'     => '1',
                    ),
                )
            )
        ));
        
        // File Count
        acf_render_field_setting($field, array(
            'label'             => __('File Count', 'acfe'),
            'instructions'      => '',
            'name'              => 'file_count',
            'type'              => 'true_false',
            'ui'                => 1,
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'uploader',
                        'operator'  => '==',
                        'value'     => 'basic',
                    ),
                    array(
                        'field'     => 'stylised_button',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                ),
                array(
                    array(
                        'field'     => 'uploader',
                        'operator'  => '==',
                        'value'     => 'basic',
                    ),
                    array(
                        'field'     => 'multiple',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                ),
                array(
                    array(
                        'field'     => 'uploader',
                        'operator'  => '==',
                        'value'     => 'wp',
                    ),
                ),
                array(
                    array(
                        'field'     => 'uploader',
                        'operator'  => '==',
                        'value'     => '',
                    ),
                ),
            )
        ));
        
        // Multiple upload
        acf_render_field_setting($field, array(
            'label'         => __('Allow Multiple Files', 'acfe'),
            'instructions'  => '',
            'name'          => 'multiple',
            'type'          => 'true_false',
            'ui'            => 1,
        ));
        
    }
    
    
    /**
     * render_field
     *
     * @param $field
     */
    function render_field($field){
        
        // settings
        $uploader        = $field['uploader'] ? $field['uploader'] : acf_get_setting('uploader');
        $preview_style   = $field['preview_style'];
        $placeholder     = $field['placeholder'];
        $stylised_button = $field['stylised_button'];
        $file_count      = $field['file_count'];
        $multiple        = $field['multiple'];
        $min             = $field['min'];
        $max             = $field['max'];
        
        if($placeholder && !in_array($preview_style, array('inline', 'select2'))){
            $placeholder = false;
        }
        
        if($multiple || $uploader === 'wp'){
            $stylised_button = true;
        }
        
        // enqueue
        if($uploader === 'wp'){
            acf_enqueue_uploader();
        }
        
        $div = array(
            'class'           => 'acf-file-uploader',
            'data-library'    => $field['library'],
            'data-mime_types' => $field['mime_types'],
            'data-uploader'   => $uploader,
        );
        
        $field_name = $field['name'];
        
        if($multiple){
            
            $div['data-multiple'] = $multiple;
            
            $field_name .= '[]';
            
        }
        
        if($min){
            $div['data-min'] = $min;
        }
        
        if($max){
            $div['data-max'] = $max;
        }
        
        if(!$stylised_button){
            $div['data-basic'] = true;
        }
        
        if($preview_style){
            $div['class'] .= " -{$preview_style}";
        }
        
        if($placeholder){
            $div['class'] .= ' has-placeholder';
        }
        
        $rows = array(
            'acfcloneindex' => array(
                'value'     => '',
                'icon'      => esc_url(wp_mime_type_icon()),
                'title'     => '',
                'url'       => '',
                'filename'  => '',
                'filesize'  => ''
            )
        );
        
        $has_value = false;
        
        // has value?
        if(!empty($field['value'])){
            
            $values = acf_get_array($field['value']);
            $i = 0;
            foreach($values as $value){
                
                $attachment = acf_get_attachment($value);
                
                if($attachment){
                    
                    $i++;
                    $has_value = true;
                    
                    // Only one value if not multiple
                    if(!$multiple && $i > 1)
                        break;
                    
                    // update
                    $rows[] = array(
                        'value'     => $value,
                        'icon'      => $attachment['icon'],
                        'title'     => $attachment['title'],
                        'url'       => $attachment['url'],
                        'filename'  => $attachment['filename'],
                        'filesize'  => $attachment['filesize'] ? size_format($attachment['filesize']) : '',
                    );
                    
                }
                
            }
            
        }
        
        // has value
        if($has_value){
            $div['class'] .= ' has-value';
        }
        
        ?>
        <div <?php echo acf_esc_atts($div); ?>>
            
            <?php
            acf_hidden_input(array(
                'name' => $field['name'],
                'value' => ''
            ));
            ?>

            <div class="values show-if-value">
                
                <?php if($placeholder){ ?>
                    <span class="-placeholder"><?php echo $placeholder; ?></span>
                <?php } ?>
                
                <?php foreach($rows as $i => $row){ ?>
                    
                    <?php
                    $wrap = array(
                        'class' => 'file-wrap'
                    );
                    
                    if($i === 'acfcloneindex'){
                        
                        $wrap['class'] .= ' acf-clone';
                        $wrap['data-id'] = 'acfcloneindex';
                        
                    }
                    
                    ?>

                    <div <?php echo acf_esc_atts($wrap); ?>>
                        
                        <?php
                        acf_hidden_input(array(
                            'name'      => $field_name,
                            'value'     => $row['value']
                        ));
                        ?>

                        <div class="file-icon">
                            <img data-name="icon" src="<?php echo esc_url($row['icon']); ?>" alt=""/>
                        </div>
                        <div class="file-info">
                            <p>
                                <strong data-name="title"><?php echo esc_html($row['title']); ?></strong>
                            </p>
                            <p>
                                <strong><?php _e('File name', 'acf'); ?>:</strong>
                                <a data-name="filename" href="<?php echo esc_url($row['url']); ?>" target="_blank"><?php echo esc_html($row['filename']); ?></a>
                            </p>
                            <p>
                                <strong><?php _e('File size', 'acf'); ?>:</strong>
                                <span data-name="filesize"><?php echo esc_html($row['filesize']); ?></span>
                            </p>
                        </div>

                        <div class="acf-actions -hover">
                            <?php if($uploader === 'wp' && $i !== 'acfcloneindex'){ ?>
                                <a class="acf-icon -pencil dark" data-name="edit" href="#" title="<?php _e('Edit', 'acf'); ?>"></a>
                            <?php } ?>
                            <a class="acf-icon -cancel dark" data-name="remove" href="#" title="<?php _e('Remove', 'acf'); ?>"></a>
                        </div>

                    </div>
                
                
                <?php } ?>

            </div>
            
            <?php
            
            $wrapper = array(
                'class'     => 'acf-uploader-wrapper'
            );
            
            if(!$multiple){
                $wrapper['class'] .= ' hide-if-value';
            }
            
            $button_label = $field['button_label'] ? $field['button_label'] : __('Add File','acf');
            ?>

            <div <?php echo acf_esc_atts($wrapper); ?>>
                
                <?php if($uploader == 'basic'): ?>

                    <div class="acf-uploader" data-id="<?php echo uniqid(); ?>">
                        
                        <?php if($stylised_button){ ?>

                            <a data-name="basic-add" class="acf-button button" href="#">
                                <?php echo $button_label; ?>
                                <?php if($file_count){ ?>
                                    <span class="count" data-count="0"></span>
                                <?php }?>
                            </a>
                        
                        <?php } ?>
                        
                        <?php
                        
                        $args = array(
                            'name'   => $field_name,
                            'id'     => $field['id'],
                            'key'    => $field['key'],
                            'accept' => $field['mime_types']
                        );
                        
                        if($multiple){
                            $args['multiple'] = '';
                        }
                        
                        acf_file_input($args);
                        
                        ?>

                    </div>
                
                <?php else: ?>

                    <div class="acf-uploader">

                        <a data-name="add" class="acf-button button" href="#">
                            <?php echo $button_label; ?>
                            <?php if($file_count){ ?>
                                <span class="count" data-count="0"></span>
                            <?php }?>
                        </a>

                    </div>
                
                <?php endif; ?>

            </div>
        </div>
        <?php
        
    }
    
    
    /**
     * update_value
     *
     * @param $value
     * @param $post_id
     * @param $field
     *
     * @return array|false|mixed|null
     */
    function update_value($value, $post_id, $field){
        
        // Bail early if no value.
        if(empty($value)){
            return $value;
        }
    
        // Bail early if local meta
        if(acfe_is_local_post_id($post_id)){
            return $value;
        }
        
        $values = acf_get_array($value);
        $return = array();
        
        foreach($values as $attachment_id){
            
            // Parse value for id.
            $attachment_id = acf_idval($attachment_id);
            
            // Connect attacment to post.
            acf_connect_attachment_to_post($attachment_id, $post_id);
            
            if(!empty($attachment_id)){
                $return[] = $attachment_id;
            }
            
        }
        
        // Empty
        if(empty($return)){
            return '';
        }
        
        // First value
        if(count($return) === 1){
            return array_shift($return);
        }
        
        // Array
        return $return;
        
    }
    
    
    /**
     * validate_value
     *
     * @param $valid
     * @param $value
     * @param $field
     * @param $input
     *
     * @return false|mixed|string
     */
    function validate_value($valid, $value, $field, $input){
        
        $values = acf_get_array($value);
        $errors = array();
        
        // Required
        if($field['required']){
            
            $empty = true;
            
            foreach($values as $value){
                
                if(empty($value)) continue;
                
                $empty = false;
                break;
                
            }
            
            if($empty){
                $valid = false;
            }
            
        }
        
        // Check files errors
        foreach($values as $value){
            
            // bail early if empty
            if(empty($value)) continue;
            
            // bail ealry if is numeric
            if(is_numeric($value)) continue;
            
            // bail ealry if not basic string
            if(!is_string($value)) continue;
            
            // decode value
            $file = null;
            parse_str($value, $file);
            
            // bail early if no attachment
            if(empty($file)) continue;
            
            // Get file errors
            $file_errors = acf_validate_attachment($file, $field, 'basic_upload');
            
            if(!empty($file_errors)){
                $errors[] = implode("\n", $file_errors);
            }
            
        }
        
        // Get all errors
        if(!empty($errors)){
            $valid = implode("\n", $errors);
        }
        
        // return
        return $valid;
        
    }
    
    
    /**
     * format_value
     *
     * @param $value
     * @param $post_id
     * @param $field
     *
     * @return array|false|mixed
     */
    function format_value($value, $post_id, $field){
        
        $values = acf_get_array($value);
        $return = array();
        
        foreach($values as $_value){
            
            if(!is_numeric($_value)) continue;
            
            $_value = intval($_value);
            
            // format
            if($field['return_format'] == 'url'){
                
                $return[] = wp_get_attachment_url($_value);
                
            }elseif($field['return_format'] == 'array'){
                
                $return[] = acf_get_attachment($_value);
                
            }elseif($field['return_format'] == 'id'){
                
                $return[] = $_value;
                
            }
            
        }
        
        if(!acf_maybe_get($field, 'multiple')){
    
            $return = acfe_unarray($return);
            
            if(empty($return)){
                $return = false;
            }
            
        }
        
        return $return;
        
    }
    
    
    /**
     * translate_field
     *
     * @param $field
     *
     * @return mixed
     */
    function translate_field($field){
        
        $field['placeholder'] = acf_translate($field['placeholder']);
        $field['button_label'] = acf_translate($field['button_label']);
        
        return $field;
        
    }
    
}

acf_new_instance('acfe_pro_field_file');

endif;