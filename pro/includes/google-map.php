<?php

if(!defined('ABSPATH')){
    exit;
}

// register store
acf_register_store('acfe_google_maps');

if(!class_exists('acfe_pro_google_map')):

class acfe_pro_google_map{
    
    // define enqueue name
    var $enqueue_name = 'acfe-google-map';
    
    /**
     * construct
     */
    function __construct(){
        
        add_action('wp_print_footer_scripts',    array($this, 'wp_print_footer_scripts'), 9);
        add_action('admin_print_footer_scripts', array($this, 'wp_print_footer_scripts'), 9);
        
    }
    
    
    /**
     * wp_print_footer_scripts
     * admin_print_footer_scripts
     *
     * @return void
     */
    function wp_print_footer_scripts(){
        
        // check maps or already enqueued
        if(!$this->has_map() || wp_script_is($this->enqueue_name, 'enqueued')){
            return;
        }
        
        // print
        $this->print_style();
        $this->print_script();
        
        // api args
        $api = array(
            'key'       => $this->get_api_key(),
            'client'    => acf_get_setting('google_api_client'),
            'libraries' => 'places',
            'v'         => 3.55,
            'callback'  => 'acfeInitGoogleMaps',
            'language'  => acf_get_locale(),
            'loading'   => 'async',
        );
        
        // filter
        $api = apply_filters('acf/fields/google_map/api', $api);
        
        // construct url
        // https://maps.googleapis.com/maps/api/js?key=&callback=acfeInitGoogleMaps&v=3.55&loading=async
        $url = add_query_arg($api, 'https://maps.googleapis.com/maps/api/js');
        
        // enqueue
        // we must enqueue after the printed script
        // to make sure the script is loaded & ready before the callback kicks in
        wp_enqueue_script($this->enqueue_name, $url, array(), null, array(
            'in_footer' => true,
            'strategy'  => 'async',
        ));
        
    }
    
    
    /**
     * print_style
     *
     * @return void
     */
    function print_style(){
        
        $done = array();
        
        echo '<style type="text/css">';
        foreach($this->get_maps() as $map){
            
            if(in_array($map['class_selector'], $done)){
                continue;
            }
            
            $height = $this->is_numeric($map['height']) ? $map['height'] . 'px' : $map['height'];
            
            echo esc_html($map['class_selector']) . '{';
            echo 'height:' . esc_html($height);
            echo '}';
            
            $done[] = $map['class_selector'];
        }
        echo '</style>';
    }
    
    
    /**
     * print_script
     *
     * @return void
     */
    function print_script(){
        ?>
        <script type="text/javascript">
        (function(){
            
            window.acfeGoogleMaps = [];
            
            window.acfeInitGoogleMaps = function(){
                document.querySelectorAll('<?php echo esc_html($this->get_classes()); ?>').forEach(function(el){
                    acfeGoogleMaps.push(acfeNewMap(el));
                });
            }
            
            var acfeNewMap = function(el){
                
                var map = Object.create({
                    
                    el: null,
                    map: null,
                    markers: [],
                    data: {},
                    
                    /**
                     * initMap
                     *
                     * @param el
                     * @returns {Map | Map<any, any>}
                     */
                    init: function(el){
                        
                        // vars
                        this.el = el;
                        
                        // grab dataset
                        var data = Object.assign({}, this.el.dataset);
                        
                        // convert json data
                        for(var key in data){
                            if(data.hasOwnProperty(key)){
                                try{data[ key ] = JSON.parse(data[ key ]);}catch(e){
                                    console.log(e);
                                }
                            }
                        }
                        
                        // assign data
                        this.data = data.map;
                        this.data.style = data.style;
                        
                        // default map args
                        var args = {
                            scrollwheel:       true,
                            zoom:              parseInt(this.get('zoom')),
                            mapTypeId:         this.get('map_type'),
                            minZoom:           this.get('min_zoom'),
                            maxZoom:           this.get('max_zoom'),
                            disableDefaultUI:  this.get('hide_ui'),
                            mapTypeControl:    !this.get('hide_map_selection'),
                            fullscreenControl: !this.get('hide_fullscreen'),
                            streetViewControl: !this.get('hide_streetview'),
                            draggable:         !this.get('disallow_move'),
                            styles:            this.get('style'),
                        };
                        
                        // hide control
                        if(this.get('hide_zoom_control')){
                            args.zoomControl            = false;
                            args.scrollwheel            = false;
                            args.disableDoubleClickZoom = true;
                        }
                        
                        // create map
                        this.map = new google.maps.Map(el, args);
                        
                        // default map markers
                        this.map.markers = [];
                        
                        // init markers
                        this.initMarkers();
                        
                        // center map based on markers
                        this.centerMap();
                        
                        // return instance
                        return this;
                    },
                    
                    initMarkers: function(){
                        this.get('markers').forEach(function(marker){
                            this.initMarker(marker);
                        }, this);
                    },
                    
                    /**
                     * initMarker
                     *
                     * @param marker
                     */
                    initMarker: function(marker){
                        
                        // default marker args
                        var args = {
                            position: {
                                lat: parseFloat(marker.lat),
                                lng: parseFloat(marker.lng)
                            },
                            map: this.map
                        };
                        
                        // add icon
                        if(marker.icon){
                            
                            marker.icon.width = parseInt(marker.icon.width);
                            marker.icon.height = parseInt(marker.icon.height);
                            
                            args.icon = {
                                url:        marker.icon.url,
                                size:       new google.maps.Size(marker.icon.width, marker.icon.height),
                                scaledSize: new google.maps.Size(marker.icon.width, marker.icon.height),
                            }
                            
                        }
                        
                        // Create marker instance.
                        var mapMarker = new google.maps.Marker(args);
                        
                        // Append to reference for later use.
                        this.map.markers.push(mapMarker);
                        
                        // If marker contains HTML, add it to an infoWindow.
                        if(marker.content){
                            
                            // Create info window.
                            var infowindow = new google.maps.InfoWindow({
                                content: marker.content
                            });
                            
                            // Show info window when marker is clicked.
                            mapMarker.addListener('click', function(){
                                infowindow.open(this.map, mapMarker);
                            });
                        }
                    },
                    
                    /**
                     * centerMap
                     */
                    centerMap: function(){
                        
                        if(this.map.markers.length){
                            
                            // Create map boundaries from all map markers.
                            var bounds = new google.maps.LatLngBounds();
                            
                            this.map.markers.forEach(function(marker){
                                bounds.extend({
                                    lat: marker.position.lat(),
                                    lng: marker.position.lng()
                                });
                            });
                            
                            // case: single marker
                            if(this.map.markers.length === 1){
                                this.map.setCenter(bounds.getCenter());
                                
                                // Case: multiple markers
                            }else{
                                this.map.fitBounds(bounds);
                            }
                            
                        }else{
                            
                            // Center map.
                            this.map.setCenter({
                                lat: parseFloat(this.get('center_lat')),
                                lng: parseFloat(this.get('center_lng'))
                            });
                            
                        }
                        
                        
                    },
                    
                    /**
                     * get
                     *
                     * @param name
                     * @param def
                     * @returns {*|null}
                     */
                    get: function(name, def = null){
                        if(typeof name === 'undefined'){
                            return this.data;
                        }
                        return typeof this.data[ name ] !== 'undefined' ? this.data[ name ] : def;
                    },
                    
                    /**
                     * set
                     *
                     * @param name
                     * @param value
                     */
                    set: function(name, value){
                        this.data[ name ] = value;
                    },
                });
                
                return map.init(el);
            
            }
            
        })();
        </script>
        <?php
    }
    
    
    /**
     * render_map
     *
     * @param $args
     * @param $post_id
     *
     * @return void
     */
    function render_map($args = array(), $post_id = 0){
        
        // allow string selector
        // ie: acfe_render_google_map('my_google_map', 50)
        if(is_string($args)){
            $args = array(
                'selector' => $args,
                'post_id'  => $post_id,
            );
        }
        
        // vars
        $field = false;
        
        // default args
        $args = wp_parse_args($args, array(
            'selector' => '',
            'post_id'  => 0,
        ));
        
        // get field object
        if(!empty($args['selector'])){
            $field = get_field_object($args['selector'], $args['post_id']);
        }
        
        // found field
        if($field){
            
            // append settings from field
            $args = wp_parse_args($args, array(
                'height'             => !empty($field['value']) ? $field['value']['height'] : $field['height'],
                'zoom'               => !empty($field['value']) ? $field['value']['zoom'] : $field['zoom'],
                'min_zoom'           => !empty($field['value']) ? $field['value']['min_zoom'] : $field['acfe_google_map_zooms']['min_zoom'],
                'max_zoom'           => !empty($field['value']) ? $field['value']['max_zoom'] : $field['acfe_google_map_zooms']['max_zoom'],
                'center_lat'         => !empty($field['value']) ? $field['value']['lat'] : $field['center_lat'],
                'center_lng'         => !empty($field['value']) ? $field['value']['lng'] : $field['center_lng'],
                'map_type'           => !empty($field['value']) ? $field['value']['map_type'] : $field['acfe_google_map_type'],
                'hide_ui'            => !empty($field['value']) ? $field['value']['hide_ui'] : $field['acfe_google_map_disable_ui'],
                'hide_zoom_control'  => !empty($field['value']) ? $field['value']['hide_zoom_control'] : $field['acfe_google_map_disable_zoom_control'],
                'hide_map_selection' => !empty($field['value']) ? $field['value']['hide_map_selection'] : $field['acfe_google_map_disable_map_type'],
                'hide_fullscreen'    => !empty($field['value']) ? $field['value']['hide_fullscreen'] : $field['acfe_google_map_disable_fullscreen'],
                'hide_streetview'    => !empty($field['value']) ? $field['value']['hide_streetview'] : $field['acfe_google_map_disable_streetview'],
                'style'              => !empty($field['value']) ? $field['value']['map_style'] : $field['acfe_google_map_style'],
                'api_key'            => !empty($field['value']) ? $field['value']['key'] : acf_get_setting('google_api_key', $field['acfe_google_map_key']),
            ));
            
        }
        
        // default args
        $args = wp_parse_args($args, array(
            'id'                 => '',
            'class'              => 'google-map',
            'class_selector'     => '.google-map',
            'height'             => 400,
            'zoom'               => 4,
            'min_zoom'           => 2,
            'max_zoom'           => 21,
            'center_lat'         => 47.127568043756824,
            'center_lng'         => 8.479324347764278,
            'map_type'           => 'roadmap',
            'hide_ui'            => false,
            'hide_zoom_control'  => false,
            'hide_map_selection' => false,
            'hide_fullscreen'    => false,
            'hide_streetview'    => false,
            'disallow_move'      => false,
            'style'              => false,
            'api_key'            => acf_get_setting('google_api_key'),
        ));
        
        // class selector
        $class_selector = $args['class'];
        $class_selector = trim($class_selector);
        $class_selector = str_replace(' ', '.', $class_selector);
        $class_selector = ".{$class_selector}";
        $args['class_selector'] = $class_selector;
        
        // disable ui
        if($args['hide_ui']){
            $args['hide_map_selection'] = true;
            $args['hide_fullscreen']    = true;
            $args['hide_streetview']    = true;
            $args['hide_zoom_control']  = true;
        }
        
        // markers not set
        // this allow to override markers when using selector
        if(!isset($args['markers'])){
            
            // init markers
            $args['markers'] = array();
            
            // append marker based on value
            if($field && !empty($field['value'])){
                
                $args['markers'][] = array(
                    'lat'  => $field['value']['lat'],
                    'lng'  => $field['value']['lng'],
                    'icon' => $field['value']['marker'],
                );
                
            }
            
        }
        
        // force markers array
        $args['markers'] = acf_get_array($args['markers']);
        
        // validate markers
        foreach($args['markers'] as &$marker){
            $marker = wp_parse_args($marker, array(
                'lat'     => 0,
                'lng'     => 0,
                'icon'    => false,
                'content' => '',
            ));
        }
        
        // filter args
        $args = apply_filters("acfe/render_google_map_args",                            $args, $field);
        
        if($field){
            $args = apply_filters("acfe/render_google_map_args/name={$field['_name']}", $args, $field);
            $args = apply_filters("acfe/render_google_map_args/key={$field['key']}",    $args, $field);
        }
        
        $args = apply_filters("acfe/render_google_map_args/id={$args['id']}",           $args, $field);
        
        // append to store
        acf_get_store('acfe_google_maps')->append($args);
        
        // prepare data-style
        $style = $args['style'];
        
        // prepare data-map
        $map = array(
            'zoom'               => $args['zoom'],
            'min_zoom'           => $args['min_zoom'],
            'max_zoom'           => $args['max_zoom'],
            'map_type'           => $args['map_type'],
            'center_lat'         => $args['center_lat'],
            'center_lng'         => $args['center_lng'],
            'hide_ui'            => $args['hide_ui'],
            'hide_zoom_control'  => $args['hide_zoom_control'],
            'hide_map_selection' => $args['hide_map_selection'],
            'hide_fullscreen'    => $args['hide_fullscreen'],
            'hide_streetview'    => $args['hide_streetview'],
            'disallow_move'      => $args['disallow_move'],
            'markers'            => $args['markers'],
        );
        
        // prepare wrapper
        $wrapper = array(
            'class'    => $args['class'],
            'data-map' => $map,
        );
        
        // add style
        if(!empty($style)){
            $wrapper['data-style'] = $style;
        }
        
        // render
        ?><div <?php echo acf_esc_attrs($wrapper); ?>></div><?php
        
    }
    
    
    /**
     * get_api_key
     *
     * @return false|mixed
     */
    function get_api_key(){
        
        // get acf setting
        $api_key = acf_get_setting('google_api_key');
        if(!empty($api_key)){
            return $api_key;
        }
        
        // return the first api key found in maps
        if($this->has_map()){
            foreach($this->get_maps() as $map){
                if(!empty($map['api_key'])){
                    return $map['api_key'];
                }
            }
        }
        
        return false;
    }
    
    
    /**
     * has_map
     *
     * @return bool
     */
    function has_map(){
        return (bool) acf_get_store('acfe_google_maps')->count();
    }
    
    
    /**
     * get_maps
     *
     * @return array|mixed|null
     */
    function get_maps(){
        return acf_get_store('acfe_google_maps')->get();
    }
    
    
    /**
     * get_classes
     *
     * @return string
     */
    function get_classes(){
        
        $classes = array();
        foreach($this->get_maps() as $map){
            if(!in_array($map['class_selector'], $classes)){
                $classes[] = $map['class_selector'];
            }
        }
        
        $classes = implode(', ', $classes);
        
        return $classes;
        
    }
    
    
    /**
     * is_numeric
     *
     * @param $value
     *
     * @return false|int
     */
    function is_numeric($value){
        return preg_match('/^\d+(\.\d+)?$/', $value);
    }
    
}

acf_new_instance('acfe_pro_google_map');

endif;


/**
 * acfe_render_google_map
 *
 * @param $args
 *
 * @return void
 */
function acfe_render_google_map($args = array(), $post_id = 0){
    acf_get_instance('acfe_pro_google_map')->render_map($args, $post_id);
}