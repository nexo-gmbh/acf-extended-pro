<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_field_block_editor')):

class acfe_field_block_editor extends acf_field{
    
    public $count = 0;
    
    /**
     * initialize
     */
    function initialize(){
        
        $this->name = 'acfe_block_editor';
        $this->label = __('Block Editor', 'acfe');
        $this->category = 'Content';
        $this->defaults = array(
            'height'            => 175,
            'min_height'        => 175,
            'max_height'        => '',
            'autoresize'        => true,
            'topbar'            => true,
            'topbar_tools'      => array(
                'inserter',
                'undo',
                'navigation',
            ),
            'fixed_toolbar'     => true,
            'allow_code_mode'   => true,
            'allow_lock'        => true,
            'allow_upload'      => true,
            'allow_library'     => true,
            'allowed_blocks'    => array(
                array('block' => 'core/paragraph'),
                array('block' => 'core/image'),
                array('block' => 'core/gallery'),
                array('block' => 'core/quote'),
                array('block' => 'core/heading'),
                array('block' => 'core/list'),
                array('block' => 'core/list-item'),
                array('block' => 'core/code'),
                array('block' => 'core/shortcode'),
                array('block' => 'core/html'),
                array('block' => 'core/table'),
            ),
        );
        
        // register variations
        acf_add_filter_variations('acfe/fields/block_editor/settings', array('name', 'key'), 1);
        
    }
    
    
    
    /**
     * field_group_admin_head
     */
    function field_group_admin_head(){
    
        add_filter('acf/prepare_field/name=block', function($field){
        
            $field['prefix'] = str_replace('row-', '', $field['prefix']);
            $field['name'] = str_replace('row-', '', $field['name']);
        
            return $field;
        
        });
        
    }
    
    
    /**
     * render_field_settings
     *
     * @param $field
     */
    function render_field_settings($field){
    
        // height
        acf_render_field_setting($field, array(
            'label'             => __('Height', 'acfe'),
            'name'              => 'height',
            'key'               => 'height',
            'instructions'      => '',
            'type'              => 'number',
            'default_value'     => '175',
            'min'               => 0,
            'append'            => 'px',
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'autoresize',
                        'operator'  => '!=',
                        'value'  => '1',
                    ),
                )
            )
        ));
    
        // min height (autoresize)
        acf_render_field_setting($field, array(
            'label'             => __('Height', 'acfe'),
            'name'              => 'min_height',
            'key'               => 'min_height',
            'instructions'      => '',
            'type'              => 'number',
            'default_value'     => '175',
            'min'               => 0,
            'prepend'           => 'min',
            'append'            => 'px',
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'autoresize',
                        'operator'  => '==',
                        'value'  => '1',
                    ),
                )
            )
        ));
    
        // max height (autoresize)
        acf_render_field_setting($field, array(
            'label'             => '',
            'name'              => 'max_height',
            'key'               => 'max_height',
            'instructions'      => '',
            'type'              => 'number',
            'default_value'     => '',
            'min'               => 0,
            'prepend'           => 'max',
            'append'            => 'px',
            '_append'           => 'min_height',
            'conditional_logic' => array(
                array(
                    array(
                        'field'    => 'autoresize',
                        'operator' => '==',
                        'value'    => '1',
                    ),
                )
            )
        ));
    
        // auto resize
        acf_render_field_setting($field, array(
            'label'             => __('Autoresize', 'acfe'),
            'name'              => 'autoresize',
            'key'               => 'autoresize',
            'instructions'      => __('Height will be based on the editor content'),
            'type'              => 'true_false',
            'message'           => '',
            'default_value'     => true,
            'ui'                => true,
        ));
    
        // top bar
        acf_render_field_setting($field, array(
            'label'             => __('Top Bar', 'acfe'),
            'name'              => 'topbar',
            'key'               => 'topbar',
            'instructions'      => __('Show the menu bar on top of the editor'),
            'type'              => 'true_false',
            'message'           => '',
            'default_value'     => true,
            'ui'                => true,
        ));
    
        acf_render_field_setting($field, array(
            'label'         => __('Top Bar Tools', 'acfe'),
            'name'          => 'topbar_tools',
            'key'           => 'topbar_tools',
            'instructions'  => '',
            'type'              => 'checkbox',
            'default_value'     => '',
            'layout'            => 'horizontal',
            'choices'           => array(
                'inserter'   => __('Inserter', 'acfe'),
                'selector'   => __('Selector', 'acfe'),
                'undo'       => __('Undo', 'acfe'),
                'toc'        => __('Contents', 'acfe'),
                'navigation' => __('Navigation', 'acfe'),
                'inspector'  => __('Inspector', 'acfe'),
                'editor'     => __('Editor', 'acfe'),
            ),
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'topbar',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                )
            )
        ));
    
        // fixed toolbar
        acf_render_field_setting($field, array(
            'label'             => __('Fixed Toolbar', 'acfe'),
            'name'              => 'fixed_toolbar',
            'key'               => 'fixed_toolbar',
            'instructions'      => '',
            'type'              => 'true_false',
            'message'           => '',
            'default_value'     => true,
            'ui'                => true,
        ));
    
        // allow code mode
        acf_render_field_setting($field, array(
            'label'             => __('Allow Code Editing', 'acfe'),
            'name'              => 'allow_code_mode',
            'key'               => 'allow_code_mode',
            'instructions'      => '',
            'type'              => 'true_false',
            'message'           => '',
            'default_value'     => true,
            'ui'                => true,
        ));
    
        // allow lock
        acf_render_field_setting($field, array(
            'label'             => __('Allow Lock', 'acfe'),
            'name'              => 'allow_lock',
            'key'               => 'allow_lock',
            'instructions'      => '',
            'type'              => 'true_false',
            'message'           => '',
            'default_value'     => true,
            'ui'                => true,
        ));
    
        // allow upload
        acf_render_field_setting($field, array(
            'label'             => __('Allow File Upload', 'acfe'),
            'name'              => 'allow_upload',
            'key'               => 'allow_upload',
            'instructions'      => '',
            'type'              => 'true_false',
            'message'           => '',
            'default_value'     => true,
            'ui'                => true,
        ));
    
        // allow library
        acf_render_field_setting($field, array(
            'label'             => __('Allow File Library', 'acfe'),
            'name'              => 'allow_library',
            'key'               => 'allow_library',
            'instructions'      => '',
            'type'              => 'true_false',
            'message'           => '',
            'default_value'     => true,
            'ui'                => true,
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'allow_upload',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                )
            )
        ));
        
        // allowed blocks
        acf_render_field_setting($field, array(
            'label'                 => __('Allowed Blocks', 'acfe'),
            'name'                  => 'allowed_blocks',
            'key'                   => 'allowed_blocks',
            'instructions'          => '<a href="https://developer.wordpress.org/block-editor/reference-guides/core-blocks/" target="_blank">' . __('List of all available core blocks', 'acfe') . '</a>',
            'type'                  => 'repeater',
            'button_label'          => __('+ Add block'),
            'layout'                => 'table',
            'default_value'         => array(
                array('block' => 'core/paragraph'),
                array('block' => 'core/image'),
                array('block' => 'core/gallery'),
                array('block' => 'core/quote'),
                array('block' => 'core/heading'),
                array('block' => 'core/list'),
                array('block' => 'core/list-item'),
                array('block' => 'core/code'),
                array('block' => 'core/shortcode'),
                array('block' => 'core/html'),
                array('block' => 'core/table'),
            ),
            'required'              => false,
            'sub_fields'            => array(
                
                array(
                    'ID'                => false,
                    'label'             => __('Block Type', 'acfe'),
                    'name'              => 'block',
                    'key'               => 'block',
                    'type'              => 'text',
                    'prefix'            => '',
                    '_name'             => '',
                    'instructions'      => '',
                    'required'          => 0,
                    'conditional_logic' => 0,
                    'default_value'     => '',
                    'wrapper'           => array(
                        'width' => '',
                        'class' => '',
                        'id'    => '',
                    ),
                ),
                
            ),
        ));
        
    }
    
    
    /**
     * input_admin_enqueue_scripts
     */
    function input_admin_enqueue_scripts(){
        
        // vars
        global $wp_version;
        $wp = $wp_version;
        $wp = preg_replace('/-RC\d+?$/', '', $wp); // remove trailing rc
        
        $version = ACFE_VERSION;
        $min = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '' : '.min';
        
        // wp 6.6
        $style_url = "pro/assets/inc/block-editor/block-editor{$min}.css";
        $script_url = "pro/assets/inc/block-editor/block-editor{$min}.js";
        $deps_url = "pro/assets/inc/block-editor/block-editor.deps.php";
        
        // wp 6.0 / 6.1 / 6.2
        if(acf_version_compare($wp, '>=', '6.0') && acf_version_compare($wp, '<', '6.3')){
            
            // append wp version
            $style_url = "pro/assets/inc/block-editor/block-editor-6.0{$min}.css";
            $script_url = "pro/assets/inc/block-editor/block-editor-6.0{$min}.js";
            $deps_url = "pro/assets/inc/block-editor/block-editor-6.0.deps.php";
            
        // wp 6.3
        }elseif(acf_version_compare($wp, '>=', '6.3') && acf_version_compare($wp, '<', '6.4')){
            
            // append wp version
            $style_url = "pro/assets/inc/block-editor/block-editor-6.3{$min}.css";
            $script_url = "pro/assets/inc/block-editor/block-editor-6.3{$min}.js";
            $deps_url = "pro/assets/inc/block-editor/block-editor-6.3.deps.php";
            
        // wp 6.4
        }elseif(acf_version_compare($wp, '>=', '6.4') && acf_version_compare($wp, '<', '6.5')){
            
            // append wp version
            $style_url = "pro/assets/inc/block-editor/block-editor-6.4{$min}.css";
            $script_url = "pro/assets/inc/block-editor/block-editor-6.4{$min}.js";
            $deps_url = "pro/assets/inc/block-editor/block-editor-6.4.deps.php";
            
        // wp 6.5
        }elseif(acf_version_compare($wp, '>=', '6.5') && acf_version_compare($wp, '<', '6.6')){
            
            // append wp version
            $style_url = "pro/assets/inc/block-editor/block-editor-6.5{$min}.css";
            $script_url = "pro/assets/inc/block-editor/block-editor-6.5{$min}.js";
            $deps_url = "pro/assets/inc/block-editor/block-editor-6.5.deps.php";
            
        }
        
        $dependencies = acfe_include($deps_url);
        $dependencies = $dependencies['dependencies'];
        
        // register scripts
        wp_register_script('acf-extended-pro-block-editor', acfe_get_url($script_url), $dependencies, $version);
        wp_register_style('acf-extended-pro-block-editor',  acfe_get_url($style_url),  array(),       $version);
        
    }
    
    
    /**
     * prepare_field
     *
     * @param $field
     *
     * @return false
     */
    function prepare_field($field){
        
        // hide on gutenberg screen
        if(acfe_is_block_editor()){
            return false;
        }
        
        // supports only wp 6.0+
        if(acf_version_compare('wp', '<', '6.0')){
            return false;
        }
        
        // return
        return $field;
        
    }
    
    
    /**
     * render_field
     *
     * @param $field
     */
    function render_field($field){
        
        // append render count
        $this->count++;
        
        // only do this once
        if($this->count === 1){
            
            // require wp screen in case it's missing
            require_once ABSPATH . 'wp-admin/includes/screen.php';
            
            // enqueue
            wp_enqueue_script('acf-extended-pro-block-editor');
            wp_enqueue_style('acf-extended-pro-block-editor');
            
            // enqueue uploader
            if($field['allow_upload']){
                acf_enqueue_uploader();
            }
            
            // enqueue gutenberg
            wp_enqueue_style('wp-block-library');
            
            if(current_theme_supports('wp-block-styles') && ! wp_should_load_separate_core_block_assets()){
                wp_enqueue_style('wp-block-library-theme');
            }
            
            // enabled on gutenberg screen
            add_filter('should_load_block_editor_scripts_and_styles', '__return_true');
            
            do_action('enqueue_block_assets');
            do_action('enqueue_block_editor_assets');
            
        }
        
        // textarea
        $textarea = array(
            'id'    => $field['id'],
            'name'  => $field['name'],
            'value' => $field['value'],
            'class' => 'acf-hidden',
        );
        
        // settings
        $settings = array(
            'editor' => $this->get_editor_settings($field),
            'iso' => array(
                'blocks' => array(
                    'allowBlocks' => $this->get_allowed_blocks($field),
                ),
                'moreMenu'           => false,
                'toolbar'            => false,
                'defaultPreferences' => false,
                'allowEmbeds' => array(
                    'youtube',
                    'vimeo',
                    'wordpress',
                    'wordpress-tv',
                    'videopress',
                    'crowdsignal',
                    'imgur',
                ),
            ),
            'editorType' => 'core',
            'allowUrlEmbed' => false,
            'pastePlainText' => false,
            'replaceParagraphCode' => false,
            'pluginsUrl' => plugins_url('', __DIR__),
        );
        
        // topbar
        if($field['topbar']){
            
            if(in_array('editor', $field['topbar_tools'])){
                $settings['iso']['moreMenu'] = array(
                    'editor' => true,
                );
            }
            
            $settings['iso']['toolbar'] = array(
                'inserter'     => in_array('inserter',   $field['topbar_tools']),
                'selectorTool' => in_array('selector',   $field['topbar_tools']),
                'undo'         => in_array('undo',       $field['topbar_tools']),
                'toc'          => in_array('toc',        $field['topbar_tools']),
                'navigation'   => in_array('navigation', $field['topbar_tools']),
                'inspector'    => in_array('inspector',  $field['topbar_tools']),
            );
            
        // no topbar
        }else{
    
            $settings['iso']['noToolbar'] = true;
            $settings['iso']['toolbar'] = array(
                'inserter'     => false,
                'selectorTool' => false,
                'undo'         => false,
                'toc'          => false,
                'navigation'   => false,
                'inspector'    => false,
            );
            
        }
        
        // fixed toolbar
        if($field['fixed_toolbar']){
            $settings['iso']['defaultPreferences'] = array(
                'fixedToolbar' => true,
            );
        }
        
        // filter
        $settings = apply_filters('acfe/fields/block_editor/settings', $settings, $field);
        
        // wrapper
        $wrapper = array(
            'class'         => 'acfe-block-editor-wrapper',
            'data-settings' => $settings,
        );
    
        $css = "height: {$field['height']}px;";
        
        if($field['autoresize']){
            
            $css = "min-height: {$field['min_height']}px;";
            
            if(!empty($field['max_height'])){
                $css .= "max-height: {$field['max_height']}px;";
            }
            
        }
        
        ?>
        <style>
            textarea[name="<?php echo $field['name']; ?>"] ~ div.editor .interface-interface-skeleton__body{
                <?php echo $css; ?>
            }
        </style>
        <div <?php echo acf_esc_atts($wrapper); ?>>
            <?php acf_textarea_input($textarea); ?>
        </div>
        <?php
        
    }
    
    
    /**
     * validate_value
     *
     * @param $valid
     * @param $value
     * @param $field
     * @param $input
     *
     * @return string
     */
    function validate_value($valid, $value, $field, $input){
        
        if($field['required']){
            
            if($value === '<!-- wp:paragraph -->'.PHP_EOL.'<p></p>'.PHP_EOL.'<!-- /wp:paragraph -->'){
                return sprintf(__( '%s value is required', 'acf'), $field['label']);
            }
            
        }
        
        return $valid;
        
    }
    
    
    /**
     * format_value
     *
     * @param $value
     * @param $post_id
     * @param $field
     *
     * @return array|false|mixed|string[]
     */
    function format_value($value, $post_id, $field){
        
        // bail early
        if(empty($value)){
            return $value;
        }
        
        // return
        return apply_filters('the_content', $value);
        
    }
    
    
    /**
     * get_editor_settings
     *
     * @return array
     */
    function get_editor_settings($field){
    
        // This is copied from core
        global $editor_styles, $post;
    
        wp_add_inline_script(
            'wp-blocks',
            sprintf('wp.blocks.setCategories( %s );', wp_json_encode(get_block_categories($post)))
        );
    
        // Editor Styles.
        $styles = array();
    
        $locale_font_family = esc_html_x('Noto Serif', 'CSS Font Family for Editor Font');
        $styles[]           = array(
            'css' => "body { font-family: '$locale_font_family' }",
        );
    
        if($editor_styles && current_theme_supports('editor-styles')){
            
            foreach($editor_styles as $style){
                if(preg_match('~^(https?:)?//~', $style)){
                    
                    $response = wp_remote_get($style);
                    if (!is_wp_error($response)){
                        $styles[] = array(
                            'css' => wp_remote_retrieve_body($response),
                        );
                    }
                    
                }else{
                    
                    $file = get_theme_file_path($style);
                    if(is_file($file)){
                        $styles[] = array(
                            'css'     => file_get_contents($file),
                            'baseURL' => get_theme_file_uri($style),
                        );
                    }
                    
                }
            }
            
        }
    
        $image_size_names = apply_filters('image_size_names_choose', array('thumbnail' => __('Thumbnail'), 'medium' => __('Medium'), 'large' => __('Large'), 'full' => __('Full Size'),));
    
        $available_image_sizes = array();
        foreach($image_size_names as $image_size_slug => $image_size_name){
            $available_image_sizes[] = array(
                'slug' => $image_size_slug,
                'name' => $image_size_name,
            );
        }
        
        $allow_upload = (bool) $field['allow_upload'];
        $allow_library = (bool) $field['allow_library'];
        
        $editor_settings = array(
            'enableUpload'           => $allow_upload,
            'enableLibrary'          => $allow_library,
            'alignWide'              => get_theme_support('align-wide'),
            'disableCustomColors'    => get_theme_support('disable-custom-colors'),
            'disableCustomFontSizes' => get_theme_support('disable-custom-font-sizes'),
            'disablePostFormats'     => !current_theme_supports('post-formats'),
            'titlePlaceholder'       => apply_filters('enter_title_here', __('Add title'), $post),
            'bodyPlaceholder'        => apply_filters('write_your_story', __('Start writing or type / to choose a block'), $post),
            'isRTL'                  => is_rtl(),
            'autosaveInterval'       => AUTOSAVE_INTERVAL,
            'maxUploadFileSize'      => wp_max_upload_size() ? wp_max_upload_size() : 0,
            'styles'                 => $styles,
            'imageSizes'             => $available_image_sizes,
            'richEditingEnabled'     => user_can_richedit(),
            'codeEditingEnabled'     => (bool) $field['allow_code_mode'],
            'canLockBlocks'          => (bool) $field['allow_lock'],
            'allowedBlockTypes'      => apply_filters('allowed_block_types', true, $post),
            'supportsTemplateMode'   => current_theme_supports('block-templates'),
            
            '__experimentalCanUserUseUnfilteredHTML' => false,
            '__experimentalBlockPatterns'            => array(),
            '__experimentalBlockPatternCategories'   => array(),
        );
    
        // theme settings
        $color_palette = current((array) get_theme_support('editor-color-palette'));
        if (false !== $color_palette){
            $editor_settings['colors'] = $color_palette;
        }
    
        $font_sizes = current((array) get_theme_support('editor-font-sizes'));
        if(false !== $font_sizes){
            $editor_settings['fontSizes'] = $font_sizes;
        }
    
        $gradient_presets = current((array) get_theme_support('editor-gradient-presets'));
        if(false !== $gradient_presets){
            $editor_settings['gradients'] = $gradient_presets;
        }
    
        $block_editor_context = new \WP_Block_Editor_Context(array('post' => $post));
        return get_block_editor_settings( $editor_settings, $block_editor_context );
        
    }
    
    
    /**
     * get_allowed_blocks
     *
     * @return string[]
     */
    function get_allowed_blocks($field){
        
        // vars
        $allowed = array();
        
        // force array
        $field['allowed_blocks'] = acf_get_array($field['allowed_blocks']);
        
        // loop
        foreach($field['allowed_blocks'] as $row){
            if(!empty($row['block'])){
                $allowed[] = $row['block'];
            }
        }
        
        /*
        $allowed = array(
            'core/paragraph',
            'core/image',
            'core/heading',
            'core/gallery',
            'core/list',
            'core/list-item',
            'core/quote',
            'core/shortcode',
            'core/archives',
            'core/audio',
            'core/button',
            'core/buttons',
            'core/calendar',
            'core/categories',
            'core/code',
            'core/columns',
            'core/column',
            'core/cover',
            'core/embed',
            'core/file',
            'core/group',
            'core/freeform',
            'core/html',
            'core/media-text',
            'core/latest-comments',
            'core/latest-posts',
            'core/missing',
            'core/more',
            'core/nextpage',
            'core/preformatted',
            'core/pullquote',
            'core/rss',
            'core/search',
            'core/separator',
            'core/block',
            'core/social-links',
            'core/social-link',
            'core/spacer',
            'core/subhead',
            'core/table',
            'core/tag-cloud',
            'core/text-columns',
            'core/verse',
            'core/video',
        );
        */
        
        // return
        return array_unique($allowed);
        
    }
    
    
    /**
     * input_admin_footer
     */
    function input_admin_footer(){
        
        // bail early
        // no block editor field was rendered on page
        if(!$this->count){
            return;
        }
        
        // vars
        global $post;
        $post_type = 'post';
        
        // post type
        if(isset($post->post_type)){
            $post_type = $post->post_type;
        }
        
        // preload common data
        $preload_paths = array(
            '/',
            '/wp/v2/types?context=edit',
            '/wp/v2/taxonomies?per_page=-1&context=edit',
            '/wp/v2/themes?status=active',
            sprintf('/wp/v2/types/%s?context=edit', $post_type),
            sprintf('/wp/v2/users/me?post_type=%s&context=edit', $post_type),
            array('/wp/v2/media', 'OPTIONS'),
            array('/wp/v2/blocks', 'OPTIONS'),
        );
        
        // pass filters
        $preload_paths = apply_filters('block_editor_preload_paths', $preload_paths, $post);
        $preload_data  = array_reduce($preload_paths, 'rest_preload_api_request', array());
        
        // encode
        $encoded = wp_json_encode($preload_data);
        
        if($encoded !== false){
            ?><script><?php printf('wp.apiFetch.use( wp.apiFetch.createPreloadingMiddleware( %s ) );', $encoded); ?></script><?php
        }
        
    }
    
}

// initialize
acf_register_field_type('acfe_field_block_editor');

endif;