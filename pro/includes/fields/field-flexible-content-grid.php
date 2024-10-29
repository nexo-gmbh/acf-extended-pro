<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_pro_field_fc_grid')):

class acfe_pro_field_fc_grid{
    
    public $cols = array();
    
    function __construct(){
        
        $cols = array(
            'auto' => __('Auto', 'acfe'),
            '1'    => '1/12',
            '2'    => '2/12',
            '3'    => '3/12',
            '4'    => '4/12',
            '5'    => '5/12',
            '6'    => '6/12',
            '7'    => '7/12',
            '8'    => '8/12',
            '9'    => '9/12',
            '10'   => '10/12',
            '11'   => '11/12',
            '12'   => '12/12',
        );
        
        $this->cols = apply_filters('acfe/flexible/grid/cols', $cols);
        
        // Hooks
        add_filter('acfe/flexible/defaults_field',           array($this, 'defaults_field'), 20);
        add_filter('acfe/flexible/defaults_layout',          array($this, 'defaults_layout'), 20);
    
        add_action('acfe/flexible/render_field_settings',    array($this, 'render_field_settings'), 20);
        add_action('acfe/flexible/render_layout_settings',   array($this, 'render_layout_settings'), 21, 3);
        add_filter('acfe/flexible/wrapper_attributes',       array($this, 'field_wrapper'), 10, 2);
        add_filter('acfe/flexible/div_values',               array($this, 'div_values'), 10, 2);
        add_filter('acfe/flexible/load_fields',              array($this, 'load_fields'), 10, 2);
        add_filter('acfe/flexible/prepare_layout',           array($this, 'prepare_layout'), 15, 5);
        
        add_filter('acfe/flexible/layouts/div',              array($this, 'layout_div'), 10, 6);
        add_filter('acfe/flexible/layouts/icons',            array($this, 'layout_icons'), 35, 3);
        add_action('acf/render_field/type=flexible_content', array($this, 'render_field'));
        
        add_action('acfe/flexible/render/before_template',   array($this, 'before_template'), 5, 3);
        
    }
    
    
    /**
     * before_template
     *
     * acfe/flexible/render/before_template
     *
     * @param $field
     * @param $layout
     * @param $is_preview
     *
     * @return void
     */
    function before_template($field, $layout, $is_preview){
        
        $flexible_grid = acf_maybe_get($field, 'acfe_flexible_grid');
        $flexible_grid_enabled = acf_maybe_get($flexible_grid, 'acfe_flexible_grid_enabled');
        
        if($flexible_grid_enabled){
            global $col;
            $col = get_sub_field('acfe_layout_col');
        }
        
    }
    
    
    /**
     * defaults_field
     *
     * acfe/flexible/defaults_field
     *
     * @param $field
     *
     * @return mixed
     */
    function defaults_field($field){
        
        $field['acfe_flexible_grid'] = array(
            'acfe_flexible_grid_enabled'    => false,
            'acfe_flexible_grid_align'      => 'center',
            'acfe_flexible_grid_valign'     => 'stretch',
            'acfe_flexible_grid_wrap'       => false,
        );
        
        $field['acfe_flexible_grid_container'] = false;
        
        return $field;
        
    }
    
    
    /**
     * defaults_layout
     *
     * acfe/flexible/defaults_layout
     *
     * @param $layout
     *
     * @return mixed
     */
    function defaults_layout($layout){
        
        $layout['acfe_layout_col'] = 'auto';
        $layout['acfe_layout_allowed_col'] = false;
        
        return $layout;
        
    }
    
    
    /**
     * render_field_settings
     *
     * acfe/flexible/render_field_settings
     *
     * @param $field
     *
     * @return void
     */
    function render_field_settings($field){
    
        acf_render_field_setting($field, array(
            'label'         => __('Grid System', 'acfe'),
            'name'          => 'acfe_flexible_grid',
            'key'           => 'acfe_flexible_grid',
            'instructions'  => __('Enable columns mode', 'acfe') . '. ' . '<a href="https://www.acf-extended.com/features/fields/flexible-content/grid-system" target="_blank">' . __('See documentation', 'acfe') . '</a>',
            'type'          => 'group',
            'layout'        => 'block',
            'sub_fields'    => array(
                array(
                    'name'              => 'acfe_flexible_grid_enabled',
                    'key'               => 'acfe_flexible_grid_enabled',
                    'type'              => 'true_false',
                    'instructions'      => '',
                    'required'          => false,
                    'wrapper'           => array(
                        'width' => '10',
                        'class' => 'acfe_width_auto',
                    ),
                    'message'           => '',
                    'default_value'     => false,
                    'ui'                => true,
                    'ui_on_text'        => '',
                    'ui_off_text'       => '',
                    'conditional_logic' => false,
                ),
                array(
                    'name'          => 'acfe_flexible_grid_align',
                    'key'           => 'acfe_flexible_grid_align',
                    'type'              => 'select',
                    'default_value'     => 'center',
                    'choices'           => array(
                        'left'          => __('Left', 'acfe'),
                        'center'        => __('Center', 'acfe'),
                        'right'         => __('Right', 'acfe'),
                        'space-evenly'  => __('Space evenly', 'acfe'),
                        'space-between' => __('Space between', 'acfe'),
                        'space-around'  => __('Space around', 'acfe'),
                    ),
                    'conditional_logic' => array(
                        array(
                            array(
                                'field'     => 'acfe_flexible_grid_enabled',
                                'operator'  => '==',
                                'value'     => '1',
                            )
                        )
                    ),
                    'wrapper' => array(
                        'width' => '25',
                        'data-acfe-prepend' => __('Align', 'acfe'),
                    )
                ),
                array(
                    'name'          => 'acfe_flexible_grid_valign',
                    'key'           => 'acfe_flexible_grid_valign',
                    'type'              => 'select',
                    'default_value'     => 'stretch',
                    'choices'           => array(
                        'stretch'   => __('Stretch', 'acfe'),
                        'top'       => __('Top', 'acfe'),
                        'center'    => __('Center', 'acfe'),
                        'bottom'    => __('Bottom', 'acfe'),
                    ),
                    'conditional_logic' => array(
                        array(
                            array(
                                'field'     => 'acfe_flexible_grid_enabled',
                                'operator'  => '==',
                                'value'     => '1',
                            )
                        )
                    ),
                    'wrapper' => array(
                        'width' => '25',
                        'data-acfe-prepend' => __('Valign', 'acfe'),
                    )
                ),
                array(
                    'name'          => 'acfe_flexible_grid_wrap',
                    'key'           => 'acfe_flexible_grid_wrap',
                    'type'              => 'true_false',
                    'instructions'      => '',
                    'required'          => false,
                    'wrapper'           => array(
                        'width' => '25',
                    ),
                    'default_value'     => false,
                    'ui'                => false,
                    'message'           => __('No Wrap', 'acfe'),
                    'conditional_logic' => array(
                        array(
                            array(
                                'field'     => 'acfe_flexible_grid_enabled',
                                'operator'  => '==',
                                'value'     => '1',
                            )
                        )
                    )
                ),
            ),
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'acfe_flexible_advanced',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                )
            ),
            'wrapper' => array(
                'class' => 'acfe-field-setting-flex'
            )
        ));
        
        // Flexible Grid: Container
        acf_render_field_setting($field, array(
            'label'         => __('Grid System: Container', 'acfe'),
            'name'          => 'acfe_flexible_grid_container',
            'key'           => 'acfe_flexible_grid_container',
            'instructions'  => __('Apply maximum grid width', 'acfe'),
            'type'              => 'text',
            'default_value'     => '',
            'append'            => 'px',
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'acfe_flexible_advanced',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                    array(
                        'field'     => 'acfe_flexible_grid_enabled',
                        'operator'  => '==',
                        'value'     => '1',
                    ),
                )
            )
        ));
        
    }
    
    
    /**
     * render_layout_settings
     *
     * @param $field
     * @param $layout
     * @param $prefix
     *
     * @return void
     */
    function render_layout_settings($field, $layout, $prefix){
        
        // Check
        if(!$field['acfe_flexible_grid']['acfe_flexible_grid_enabled'])
            return;
        
        // Title
        echo '</li>';
        acf_render_field_wrap(array(
            'label' => __('Grid settings', 'acfe'),
            'type'  => 'hidden',
            'name'  => 'acfe_flexible_grid_label',
            'wrapper' => array(
                'class' => 'acfe-flexible-field-setting',
            )
        ), 'ul');
        echo '<li>';
    
        // Fields
        $acfe_layout_col = acf_maybe_get($layout, 'acfe_layout_col', 'auto');
        $acfe_layout_allowed_col = acf_maybe_get($layout, 'acfe_layout_allowed_col');
        
        acf_render_field_wrap(array(
            'name'          => 'acfe_layout_col',
            'class'         => 'acf-fc-meta-name',
            'type'          => 'select',
            'prefix'        => $prefix,
            'value'         => $acfe_layout_col,
            'choices'       => $this->cols,
            'default_value' => 'auto',
            'allow_null'    => 0,
            'multiple'      => 0,
            'ui'            => 0,
            'ajax'          => 0,
            'return_format' => 0,
            'wrapper' => array(
                'data-acfe-prepend' => __('Default Col', 'acfe'),
            )
        ), 'ul');
        
        acf_render_field_wrap(array(
            'name'          => 'acfe_layout_allowed_col',
            'class'         => 'acf-fc-meta-name',
            'type'          => 'select',
            'prefix'        => $prefix,
            'value'         => $acfe_layout_allowed_col,
            'choices'       => $this->cols,
            'placeholder'   => __('All sizes', 'acfe'),
            'default_value' => '',
            'allow_null'    => 1,
            'multiple'      => 1,
            'ui'            => 1,
            'ajax'          => 0,
            'return_format' => 0,
            'wrapper' => array(
                'data-acfe-prepend' => __('Allowed Col', 'acfe'),
            )
        ), 'ul');
        
    }
    
    
    /**
     * field_wrapper
     *
     * @param $wrapper
     * @param $field
     *
     * @return mixed
     */
    function field_wrapper($wrapper, $field){
    
        // Check Flexible Grid
        if(!$field['acfe_flexible_grid']['acfe_flexible_grid_enabled']){
            return $wrapper;
        }
        
        $wrapper['data-acfe-flexible-grid'] = true;
        $wrapper['data-acfe-flexible-grid-align'] = $field['acfe_flexible_grid']['acfe_flexible_grid_align'];
        $wrapper['data-acfe-flexible-grid-valign'] = $field['acfe_flexible_grid']['acfe_flexible_grid_valign'];
        $wrapper['data-acfe-flexible-grid-wrap'] = $field['acfe_flexible_grid']['acfe_flexible_grid_wrap'];
        
        if(!empty($field['acfe_flexible_grid_container'])){
            $wrapper['data-acfe-flexible-grid-container'] = true;
        }
        
        return $wrapper;
        
    }
    
    
    /**
     * div_values
     *
     * @param $div
     * @param $field
     *
     * @return mixed
     */
    function div_values($div, $field){
    
        // Check Flexible Grid
        if(!empty($field['acfe_flexible_grid_container'])){
            $div['style'] = "max-width:{$field['acfe_flexible_grid_container']}px";
        }
        
        return $div;
        
    }
    
    /**
     * load_fields
     *
     * @param $fields
     * @param $field
     *
     * @return mixed
     */
    function load_fields($fields, $field){
        
        // check setting
        if(!isset($field['acfe_flexible_grid']['acfe_flexible_grid_enabled']) || !$field['acfe_flexible_grid']['acfe_flexible_grid_enabled']){
            return $fields;
        }
        
        // loop layouts
        foreach($field['layouts'] as $i => $layout){
            
            // Vars
            $key = "field_{$layout['key']}_col";
            $name = 'acfe_layout_col';
            $value = acf_maybe_get($layout, 'acfe_layout_col', 'auto');
            
            // Add local
            acf_add_local_field(array(
                'label'                 => false,
                'key'                   => $key,
                'name'                  => $name,
                'type'                  => 'acfe_hidden',
                'required'              => false,
                'default_value'         => $value,
                'parent_layout'         => $layout['key'],
                'parent'                => $field['key']
            ));
            
            // Add sub field
            array_unshift($fields, acf_get_field($key));
            
        }
        
        return $fields;
        
    }
    
    function prepare_layout($layout, $field, $i, $value, $prefix){
        
        if(empty($layout['sub_fields']) || !$field['acfe_flexible_grid']['acfe_flexible_grid_enabled']){
            return $layout;
        }
        
        // Sub field
        $sub_field = acfe_extract_sub_field($layout, 'acfe_layout_col', $value);
        if(!$sub_field){
            return $layout;
        }
        
        // update prefix to allow for nested values
        $sub_field['prefix'] = $prefix;
        $sub_field['class'] = 'acfe-flexible-layout-col';
        $sub_field = acf_validate_field($sub_field);
        $sub_field = acf_prepare_field($sub_field);
        
        $input_attrs = array();
        foreach(array('type', 'id', 'class', 'name', 'value') as $k){
            
            if(isset($sub_field[$k])){
                $input_attrs[$k] = $sub_field[$k];
            }
            
        }
        
        // render input
        echo acf_get_hidden_input(acf_filter_attrs($input_attrs));
        
        return $layout;
        
    }
    
    
    /**
     * layout_div
     *
     * @param $div
     * @param $layout
     * @param $field
     * @param $i
     * @param $value
     * @param $prefix
     *
     * @return mixed
     */
    function layout_div($div, $layout, $field, $i, $value, $prefix){
    
        // Check Flexible Grid
        if(!$field['acfe_flexible_grid']['acfe_flexible_grid_enabled']){
            return $div;
        }
    
        // Sub field
        $sub_field = acfe_extract_sub_field($layout, 'acfe_layout_col', $value);
        if(!$sub_field){
            return $div;
        }
        
        $col = $sub_field['value'];
        
        $div['data-col'] = $col;
        $div['class'] .= ' col-' . $col;
        $div['data-allowed-col'] = $this->get_allowed_col($layout);
        
        return $div;
        
    }
    
    
    /**
     * layout_icons
     *
     * @param $icons
     * @param $layout
     * @param $field
     *
     * @return mixed
     */
    function layout_icons($icons, $layout, $field){
    
        // Check Flexible Grid
        if(!$field['acfe_flexible_grid']['acfe_flexible_grid_enabled']){
            return $icons;
        }
    
        $allowed_sizes = $this->get_allowed_col($layout);
        
        if(!empty($allowed_sizes) && count($allowed_sizes) === 1){
            return $icons;
        }
        
        $icons['col'] = '<a class="acf-icon small acf-js-tooltip acfe-flexible-icon dashicons dashicons-leftright" href="#" title="' . __('Resize column', 'acfe') . '" data-acfe-flexible-grid-col="' . $layout['name'] . '" style="visibility:visible;"></a>';
        
        return $icons;
        
    }
    
    
    /**
     * render_field
     *
     * @param $field
     *
     * @return void
     */
    function render_field($field){
    
        // Check Flexible Grid
        if(!$field['acfe_flexible_grid']['acfe_flexible_grid_enabled']){
            return;
        }
        
        ?>
        <script type="text-html" class="tmpl-acfe-flexible-grid-popup">
            <ul>
                <?php foreach($this->cols as $col => $label): ?>
                    <li><a href="#" data-col="<?php echo $col; ?>"><?php echo $label; ?></a></li>
                <?php endforeach; ?>
            </ul>
        </script>
        <?php
    }
    
    
    /**
     * get_allowed_col
     *
     * @param $layout
     *
     * @return array|mixed|string[]
     */
    function get_allowed_col($layout){
        
        $col = acf_maybe_get($layout, 'acfe_layout_col', 'auto');
        $allowed_col = acf_maybe_get($layout, 'acfe_layout_allowed_col', array());
        
        if(empty($allowed_col)){
            $allowed_col = array('auto', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
        }
        
        if(!in_array($col, $allowed_col)){
            $allowed_col[] = $col;
        }
        
        sort($allowed_col);
        
        return $allowed_col;
        
    }
    
}

// initialize
new acfe_pro_field_fc_grid();

endif;