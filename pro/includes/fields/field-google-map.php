<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_field_google_map')):

class acfe_field_google_map extends acfe_field_extend{
    
    /**
     * initialize
     */
    function initialize(){
        
        $this->name = 'google_map';
        $this->defaults = array(
            'height'                               => 400,
            'center_lat'                           => '46.4519675',
            'center_lng'                           => '3.3221324',
            'zoom'                                 => 2,
            'default_value'                        => '',
            'acfe_google_map_zooms'                => array(
                'zoom'     => 2,
                'min_zoom' => 0,
                'max_zoom' => 21,
            ),
            'acfe_google_map_marker_icon'          => '',
            'acfe_google_map_marker_height'        => 50,
            'acfe_google_map_marker_width'         => 50,
            'acfe_google_map_type'                 => 'roadmap',
            'acfe_google_map_disable_ui'           => false,
            'acfe_google_map_disable_zoom_control' => false,
            'acfe_google_map_disable_map_type'     => false,
            'acfe_google_map_disable_fullscreen'   => false,
            'acfe_google_map_disable_streetview'   => false,
            'acfe_google_map_style'                => '',
            'acfe_google_map_key'                  => '',
        );
        
        $this->add_field_action('acf/render_field_settings', array($this, '_render_field_settings'), 5);
        $this->add_filter('acf/prepare_field/name=zoom',     array($this, 'prepare_zoom'));
        
    }
    
    
    /**
     * _render_field_settings
     *
     * @param $field
     */
    function _render_field_settings($field){
        
        // Preview
        acf_render_field_setting($field, array(
            'label'                                 => __('Map Preview', 'acfe'),
            'name'                                  => 'default_value',
            'instructions'                          => '',
            'type'                                  => 'google_map',
            'height'                                => $field['height'],
            'center_lat'                            => $field['center_lat'],
            'center_lng'                            => $field['center_lng'],
            'zoom'                                  => $field['zoom'],
            'acfe_google_map_zooms'                 => $field['acfe_google_map_zooms'],
            'acfe_google_map_marker_icon'           => $field['acfe_google_map_marker_icon'],
            'acfe_google_map_marker_height'         => $field['acfe_google_map_marker_height'],
            'acfe_google_map_marker_width'          => $field['acfe_google_map_marker_width'],
            'acfe_google_map_type'                  => $field['acfe_google_map_type'],
            'acfe_google_map_disable_ui'            => $field['acfe_google_map_disable_ui'],
            'acfe_google_map_disable_zoom_control'  => $field['acfe_google_map_disable_zoom_control'],
            'acfe_google_map_disable_map_type'      => $field['acfe_google_map_disable_map_type'],
            'acfe_google_map_disable_fullscreen'    => $field['acfe_google_map_disable_fullscreen'],
            'acfe_google_map_disable_streetview'    => $field['acfe_google_map_disable_streetview'],
            'acfe_google_map_style'                 => $field['acfe_google_map_style'],
            'acfe_google_map_key'                   => $field['acfe_google_map_key'],
            'default_value'                         => $field['default_value']
        ));
        
    }
    
    
    /**
     * render_field_settings
     *
     * @param $field
     */
    function render_field_settings($field){
        
        // Zoom
        acf_render_field_setting($field, array(
            'label'         => __('Zoom', 'acfe'),
            'instructions'  => '',
            'prepend'       => '',
            'append'        => '',
            'type'          => 'group',
            'name'          => 'acfe_google_map_zooms',
            'sub_fields'    => array(
                array(
                    'label'         => '',
                    'name'          => 'zoom',
                    'key'           => 'zoom',
                    'type'          => 'range',
                    'prepend'       => '',
                    'append'        => '',
                    'default_value' => $field['zoom'],
                    'required'      => false,
                    'min'           => 0,
                    'max'           => 21,
                    'wrapper'       => array(
                        'width' => 33,
                        'class' => '',
                        'id'    => '',
                    ),
                ),
                array(
                    'label'         => '',
                    'name'          => 'min_zoom',
                    'key'           => 'min_zoom',
                    'prepend'       => 'min',
                    'append'        => '',
                    'type'          => 'range',
                    'required'      => false,
                    'min'           => 0,
                    'max'           => 21,
                    'wrapper'       => array(
                        'width' => 33,
                        'class' => '',
                        'id'    => '',
                    ),
                ),
                array(
                    'label'         => '',
                    'name'          => 'max_zoom',
                    'key'           => 'max_zoom',
                    'prepend'       => 'max',
                    'append'        => '',
                    'default_value' => 21,
                    'type'          => 'range',
                    'required'      => false,
                    'min'           => 0,
                    'max'           => 21,
                    'wrapper'       => array(
                        'width' => 33,
                        'class' => '',
                        'id'    => '',
                    ),
                ),
            )
        ));
        
        // Marker: Image
        acf_render_field_setting($field, array(
            'label'         => __('Marker: Image', 'acfe'),
            'instructions'  => '',
            'type'          => 'image',
            'name'          => 'acfe_google_map_marker_icon'
        ));
        
        // Marker: Height
        acf_render_field_setting($field, array(
            'label'         => __('Marker: Size', 'acfe'),
            'instructions'  => '',
            'type'          => 'number',
            'name'          => 'acfe_google_map_marker_height',
            'default_value' => 50,
            'prepend'       => 'height',
            'append'        => 'px',
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'acfe_google_map_marker_icon',
                        'operator'  => '!=empty',
                    ),
                )
            )
        ));
        
        // Marker: Width
        acf_render_field_setting($field, array(
            'label'         => '',
            'instructions'  => '',
            'type'          => 'number',
            'name'          => 'acfe_google_map_marker_width',
            'default_value' => 50,
            'prepend'       => 'width',
            'append'        => 'px',
            '_append'       => 'acfe_google_map_marker_height',
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'acfe_google_map_marker_icon',
                        'operator'  => '!=empty',
                    ),
                )
            )
        ));
        
        // View: Map Type
        acf_render_field_setting($field, array(
            'label'             => __('View: Map Type'),
            'name'              => 'acfe_google_map_type',
            'instructions'      => '',
            'type'              => 'select',
            'choices'           => array(
                'roadmap'   => 'Map',
                'terrain'   => 'Map + Terrain',
                'satellite' => 'Satellite',
                'hybrid'    => 'Satellite + Labels',
            ),
            'default_value'     => 'roadmap',
        ));
        
        // View: Disable UI
        acf_render_field_setting($field, array(
            'label'         => __('View: Hide UI'),
            'name'          => 'acfe_google_map_disable_ui',
            'instructions'  => '',
            'type'              => 'true_false',
            'message'           => '',
            'default_value'     => false,
            'ui'                => true
        ));
        
        // View: Disable Map Type Selection
        acf_render_field_setting($field, array(
            'label'         => __('View: Hide Zoom Control'),
            'name'          => 'acfe_google_map_disable_zoom_control',
            'instructions'  => '',
            'type'              => 'true_false',
            'message'           => '',
            'default_value'     => false,
            'ui'                => true,
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'acfe_google_map_disable_ui',
                        'operator'  => '!=',
                        'value'     => '1',
                    ),
                )
            )
        ));
        
        // View: Disable Map Type Selection
        acf_render_field_setting($field, array(
            'label'         => __('View: Hide Map Selection'),
            'name'          => 'acfe_google_map_disable_map_type',
            'instructions'  => '',
            'type'              => 'true_false',
            'message'           => '',
            'default_value'     => false,
            'ui'                => true,
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'acfe_google_map_disable_ui',
                        'operator'  => '!=',
                        'value'     => '1',
                    ),
                )
            )
        ));
        
        // View: Disable Fullscreen
        acf_render_field_setting($field, array(
            'label'         => __('View: Hide Fullscreen'),
            'name'          => 'acfe_google_map_disable_fullscreen',
            'instructions'  => '',
            'type'              => 'true_false',
            'message'           => '',
            'default_value'     => false,
            'ui'                => true,
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'acfe_google_map_disable_ui',
                        'operator'  => '!=',
                        'value'     => '1',
                    ),
                )
            )
        ));
        
        // View: Disable Streetview
        acf_render_field_setting($field, array(
            'label'         => __('View: Hide Streetview'),
            'name'          => 'acfe_google_map_disable_streetview',
            'instructions'  => '',
            'type'              => 'true_false',
            'message'           => '',
            'default_value'     => false,
            'ui'                => true,
            'conditional_logic' => array(
                array(
                    array(
                        'field'     => 'acfe_google_map_disable_ui',
                        'operator'  => '!=',
                        'value'     => '1',
                    ),
                )
            )
        ));
        
        // View: Map Style
        acf_render_field_setting($field, array(
            'label'         => __('View: Map Style'),
            'name'          => 'acfe_google_map_style',
            'instructions'  => 'Find map styles on <a href="https://snazzymaps.com/" target="_blank">Snazzy Maps</a>',
            'type'          => 'acfe_code_editor',
            'mode'          => 'javascript',
            'rows'          => 8,
            'max_rows'      => 8,
        ));
        
        // Google Map API Key
        acf_render_field_setting($field, array(
            'label'         => __('API Key'),
            'name'          => 'acfe_google_map_key',
            'instructions'  => '<a href="https://console.cloud.google.com/google/maps-apis/credentials" target="_blank">Google Map API Console</a>',
            'type'          => 'text',
        ));
        
    }
    
    
    /**
     * field_wrapper_attributes
     *
     * @param $wrapper
     * @param $field
     *
     * @return mixed
     */
    function field_wrapper_attributes($wrapper, $field){

        // Zoom
        if(acf_not_empty($field['acfe_google_map_zooms']['zoom'])){
            $wrapper['data-acfe-zoom'] = $field['acfe_google_map_zooms']['zoom'];
        }
        
        // Zoom: Min
        if(acf_not_empty($field['acfe_google_map_zooms']['min_zoom'])){
            $wrapper['data-acfe-min-zoom'] = $field['acfe_google_map_zooms']['min_zoom'];
        }
        
        // Zoom: Max
        if(acf_not_empty($field['acfe_google_map_zooms']['max_zoom'])){
            $wrapper['data-acfe-max-zoom'] = $field['acfe_google_map_zooms']['max_zoom'];
        }
        
        // Marker: Image
        if($field['acfe_google_map_marker_icon']){
    
            $wrapper['data-acfe-marker'] = array(
                'url'    => wp_get_attachment_url($field['acfe_google_map_marker_icon']),
                'height' => $field['acfe_google_map_marker_height'],
                'width'  => $field['acfe_google_map_marker_width'],
            );
        
        }
        
        // View: Map Type
        if($field['acfe_google_map_type']){
            $wrapper['data-acfe-map-type'] = $field['acfe_google_map_type'];
        }
        
        // View: Disable UI
        if($field['acfe_google_map_disable_ui']){
            $wrapper['data-acfe-disable-ui'] = 1;
        }
        
        // View: Disable Zoom Control
        if($field['acfe_google_map_disable_zoom_control']){
            $wrapper['data-acfe-disable-zoom-control'] = 1;
        }
        
        // View: Disable Map Selection
        if($field['acfe_google_map_disable_map_type']){
            $wrapper['data-acfe-disable-map-type'] = 1;
        }
        
        // View: Disable Fullscreen
        if(acf_maybe_get($field, 'acfe_google_map_disable_fullscreen')){
            $wrapper['data-acfe-disable-fullscreen'] = 1;
        }
        
        // View: Disable Streeview
        if($field['acfe_google_map_disable_streetview']){
            $wrapper['data-acfe-disable-streetview'] = 1;
        }
        
        // View: Map Style
        if($field['acfe_google_map_style']){
            $wrapper['data-acfe-style'] = json_encode(json_decode($field['acfe_google_map_style']));
        }
        
        // Parse values
        $value = $field['value'];
        
        // Value: Zoom
        $value_zoom = acf_maybe_get($value, 'zoom');
        
        if(is_numeric($value_zoom) && $value_zoom >= $field['acfe_google_map_zooms']['min_zoom'] && $value_zoom <= $field['acfe_google_map_zooms']['max_zoom'] && ($field['acfe_google_map_disable_ui'] || !$field['acfe_google_map_disable_zoom_control'])){
            
            $wrapper['data-acfe-zoom'] = $value_zoom;
            
        }
        
        return $wrapper;
        
    }
    
    
    /**
     * update_field
     *
     * @param $field
     *
     * @return mixed
     */
    function update_field($field){
    
        // default value
        if(acfe_is_json($field['default_value'])){
            $field['default_value'] = json_decode($field['default_value'], true);
        }
        
        // zoom
        $field['zoom'] = $field['acfe_google_map_zooms']['zoom'];
        
        // return
        return $field;
        
    }
    
    
    /**
     * render_field
     *
     * @param $field
     */
    function render_field($field){
        
        // check field setting
        if(!$field['acfe_google_map_key']){
            return;
        }
        
        // check global setting
        if(!acf_get_setting('enqueue_google_maps')){
            return;
        }
        
        // vars
        $api = array(
            'key'       => $field['acfe_google_map_key'],
            'client'    => acf_get_setting('google_api_client'),
            'libraries' => 'places',
            'ver'       => 3,
            'callback'  => '',
            'language'  => acf_get_locale()
        );
        
        // filter
        $api = apply_filters('acf/fields/google_map/api', $api);
        
        // remove empty
        if(empty($api['key'])){
            unset($api['key']);
        }
        
        if(empty($api['client'])){
            unset($api['client']);
        }
        
        // construct url
        $url = add_query_arg($api, 'https://maps.googleapis.com/maps/api/js');
        
        // localize
        acf_localize_data(array(
            'google_map_api' => $url
        ));
        
    }
    
    
    /**
     * format_value
     *
     * @param $value
     * @param $post_id
     * @param $field
     *
     * @return array
     */
    function format_value($value, $post_id, $field){
        
        if(empty($value)){
            return $value;
        }
        
        // decode json if needed
        if(acfe_is_json($value)){
            $value = json_decode($value, true);
        }
        
        // force array
        $value = acf_get_array($value);
        
        $value['height'] = (int) $field['height'];
        $value['min_zoom'] = (int) $field['acfe_google_map_zooms']['min_zoom'];
        $value['max_zoom'] = (int) $field['acfe_google_map_zooms']['max_zoom'];
        $value['zoom'] = (int) acf_maybe_get($value, 'zoom', $field['acfe_google_map_zooms']['zoom']);
        $value['marker']   = false;
    
        if($field['acfe_google_map_marker_icon']){
        
            $value['marker'] = array(
                'id'     => $field['acfe_google_map_marker_icon'],
                'url'    => wp_get_attachment_url($field['acfe_google_map_marker_icon']),
                'height' => $field['acfe_google_map_marker_height'],
                'width'  => $field['acfe_google_map_marker_width'],
            );
        
        }
    
        $value['map_type'] = $field['acfe_google_map_type'];
        $value['hide_ui'] = boolval($field['acfe_google_map_disable_ui']);
        $value['hide_zoom_control'] = boolval($field['acfe_google_map_disable_zoom_control']);
        $value['hide_map_selection'] = boolval($field['acfe_google_map_disable_map_type']);
        $value['hide_fullscreen'] = boolval($field['acfe_google_map_disable_fullscreen']);
        $value['hide_streetview'] = boolval($field['acfe_google_map_disable_streetview']);
        $value['map_style'] = '';
        
        if($field['acfe_google_map_style']){
            $value['map_style'] = json_encode(json_decode($field['acfe_google_map_style']));
        }
        
        // min zoom
        if($value['zoom'] < $value['min_zoom']){
            $value['zoom'] = $value['min_zoom'];
            
        // max zoom
        }elseif($value['zoom'] > $value['max_zoom']){
            $value['zoom'] = $value['max_zoom'];
        }
        
        // api
        $value['key'] = acf_get_setting('google_api_key', $field['acfe_google_map_key']);
        
        return $value;
        
    }
    
    
    /**
     * prepare_zoom
     *
     * @param $field
     *
     * @return false
     */
    function prepare_zoom($field){
        
        // check setting
        if(acf_maybe_get($field['wrapper'], 'data-setting') === 'google_map'){
            
            // hide default zoom
            if(strpos($field['prefix'], 'zooms') === false){
                return false;
            }
            
        }
        
        // return
        return $field;
        
    }
    
}

new acfe_field_google_map();

endif;