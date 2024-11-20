<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_address')):

class acfe_address extends acf_field{
    
    var $sub_fields = array();
    
    /**
     * initialize
     */
    function initialize(){
        
        $this->name = 'acfe_address';
        $this->label = __('Address', 'acfe');
        $this->category = 'advanced';
        $this->defaults = array(
            'default_value'      => '',
            'placeholder'        => __('Search for address...', 'acfe'),
            'countries'          => array(),
            'search_type'        => '',
            'geolocation'        => true,
            'custom_address'     => false,
            'fields'             => array(
                array('field' => 'address',       'name'  => 'address'),
                array('field' => 'state',         'name'  => 'state'),
                array('field' => 'country_short', 'name'  => 'country'),
            ),
            'prepend'            => '',
            'append'             => '',
            'api_key'            => '',
        );
        
        $this->sub_fields = array(
            'address'       => __('Full Address', 'acfe'),
            'name'          => __('Name', 'acfe'),
            'street_number' => __('Street Number', 'acfe'),
            'street_name'   => __('Street Name', 'acfe'),
            'city'          => __('City', 'acfe'),
            'state'         => __('State', 'acfe'),
            'state_short'   => __('State (code)', 'acfe'),
            'post_code'     => __('Post code', 'acfe'),
            'country'       => __('Country', 'acfe'),
            'country_short' => __('Country (code)', 'acfe'),
            'place_id'      => __('Place ID', 'acfe'),
            'lat'           => __('Latitutde', 'acfe'),
            'lng'           => __('Longitude', 'acfe'),
        );
        
        add_filter('acf/load_value', array($this, 'load_any_value'), 15, 3);
        
    }
    
    /**
     * field_group_admin_head
     */
    function field_group_admin_head(){
        
        add_filter('acf/prepare_field/name=fields', function($field){
            
            if(isset($field['wrapper']['data-setting']) && $field['wrapper']['data-setting'] === $this->name){
                $field['prefix'] = str_replace('row-', '', $field['prefix']);
                $field['name'] = str_replace('row-', '', $field['name']);
            }
            
            return $field;
            
        });
        
    }
    
    
    /**
     * render_field_settings
     *
     * @param $field
     */
    function render_field_settings($field){
        
        // Select: Placeholder
        acf_render_field_setting($field, array(
            'label'             => __('Placeholder', 'acf'),
            'instructions'      => __('Appears within the input', 'acf'),
            'type'              => 'text',
            'name'              => 'placeholder',
            'placeholder'       => __('Search for address...', 'acfe'),
        ));
        
        // Allow Countries
        acf_render_field_setting($field, array(
            'label'         => __('Allow Countries', 'acfe'),
            'instructions'  => _('Limit the search to specific countries', 'acfe'),
            'type'          => 'select',
            'name'          => 'countries',
            'choices'       => acfe_get_countries(array(
                'field'         => 'localized',
                'display'       => '<span class="iti__flag iti__{code}"></span>{localized}',
            )),
            'multiple'      => 1,
            'ui'            => 1,
            'allow_null'    => 1,
            'placeholder'   => __('All Countries', 'acfe'),
        ));
        
        // Type
        acf_render_field_setting($field, array(
            'label'         => __('Search Type','acfe'),
            'instructions'  => __('Choose the allowed search type', 'acfe'),
            'name'          => 'search_type',
            'type'          => 'radio',
            'layout'        => 'horizontal',
            'choices'      => array(
                ''              => __('None', 'acfe'),
                'geocode'       => __('Geocode (non-business)', 'acfe'),
                'address'       => __('Address', 'acfe'),
                '(regions)'     => __('Regions', 'acfe'),
                '(cities)'      => __('Cities', 'acfe'),
                'establishment' => __('Business', 'acfe'),
            ),
        ));
        
        // Allow Geolocation
        acf_render_field_setting($field, array(
            'label'         => __('Allow Geolocation','acf'),
            'instructions'  => __('Allow the user to find their current location', 'acfe'),
            'name'          => 'geolocation',
            'type'          => 'true_false',
            'ui'            => 1,
        ));
        
        // Allow Geolocation
        acf_render_field_setting($field, array(
            'label'         => __('Allow Custom Address','acf'),
            'instructions'  => __('Allow the user to enter an address not found in the Google Places API', 'acfe'),
            'name'          => 'custom_address',
            'type'          => 'true_false',
            'ui'            => 1,
        ));
        
        // prepend
        acf_render_field_setting($field, array(
            'label'             => __('Prepend','acf'),
            'instructions'      => __('Appears before the input', 'acf'),
            'type'              => 'text',
            'name'              => 'prepend',
            'placeholder'       => '',
        ));
        
        // append
        acf_render_field_setting($field, array(
            'label'             => __('Append','acf'),
            'instructions'      => __('Appears after the input', 'acf'),
            'type'              => 'text',
            'name'              => 'append',
            'placeholder'       => '',
        ));
        
        // api key
        acf_render_field_setting($field, array(
            'label'         => __('API Key'),
            'name'          => 'api_key',
            'instructions'  => '<a href="https://console.cloud.google.com/google/maps-apis/credentials" target="_blank">Google Map API Console</a>',
            'type'          => 'text',
        ));
        
        // Subfields buttons
        acf_render_field_setting($field, array(
            'label'                 => __('Individual Sub Fields', 'acfe'),
            'name'                  => 'fields',
            'key'                   => 'fields',
            'instructions'          => __('Choose which address component should be also saved as an individual sub field', 'acfe'),
            'type'                  => 'repeater',
            'button_label'          => __('+ Add Subfield', 'acfe'),
            'required'              => false,
            'layout'                => 'table',
            'sub_fields'                => array(
                
                array(
                    'ID'                => false,
                    'label'             => 'Field',
                    'name'              => 'field',
                    'key'               => 'field',
                    'type'              => 'select',
                    'prefix'            => '',
                    '_name'             => '',
                    'instructions'      => '',
                    'required'          => 0,
                    'conditional_logic' => 0,
                    'default_value'     => '',
                    'choices'           => $this->sub_fields,
                    'wrapper'           => array(
                        'width' => '',
                        'class' => '',
                        'id'    => '',
                    ),
                ),
                
                array(
                    'ID'                => false,
                    'label'             => 'Name',
                    'name'              => 'name',
                    'key'               => 'name',
                    'type'              => 'text',
                    'prepend'           => !empty($field['name']) ? "{$field['name']}_" : "{field_name}_",
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
     * render_field
     *
     * @param $field
     *
     * @return void
     */
    function render_field($field){
        
        // attrs
        $attrs = array(
            'id'                  => $field['id'],
            'class'               => "acfe-address acf-input-wrap {$field['class']}",
            'data-countries'      => $field['countries'],
            'data-custom_address' => $field['custom_address'],
            'data-search_type'    => $field['search_type'],
        );
        
        $search = '';
        if($field['value']){
            $search = $field['value']['address'];
        } else {
            $field['value'] = '';
        }
        
        $search_input = array(
            'class'         => 'search',
            'placeholder'   => $field['placeholder'],
            'value'         => $search,
        );
        
        // prepend text
        if(!empty($field['prepend'])){
            $search_input['class'] .= ' acf-is-prepended';
        }
        
        // append text
        if(!empty($field['append'])){
            $search_input['class'] .= ' acf-is-appended';
        }
        
        // prepend text
        if(!empty($field['prepend'])){
            echo '<div class="acf-input-prepend">' . acf_esc_html($field['prepend']) . '</div>';
        }
        
        // append text
        if(!empty($field['append'])){
            echo '<div class="acf-input-append">' . acf_esc_html($field['append']) . '</div>';
        }
        
        // api key
        if(!empty($field['api_key']) && acf_get_setting('enqueue_google_maps')){
            
            // vars
            $api = array(
                'key'       => $field['api_key'],
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
        
        ?>
        <div <?php echo acf_esc_attrs($attrs); ?>>
            
            <?php
            acf_hidden_input(array(
                'name'  => $field['name'],
                'value' => $field['value'],
            ));
            ?>

            <div class="acf-actions -hover">
                <?php if($field['custom_address']): ?>
                    <a href="#" data-name="search" class="acf-icon -search grey" title="<?php esc_attr_e('Search', 'acf'); ?>"></a>
                <?php endif; ?>
                <a href="#" data-name="clear" class="acf-icon -cancel grey" title="<?php esc_attr_e('Clear location', 'acf'); ?>"></a>
                <?php if($field['geolocation']): ?>
                    <a href="#" data-name="locate" class="acf-icon -location grey" title="<?php esc_attr_e('Find current location', 'acf'); ?>"></a>
                <?php endif; ?>
            </div>
            
            <?php acf_text_input($search_input); ?>
            <i class="acf-loading"></i>
        
        </div>
        <?php
    }
    
    
    /**
     * load_any_value
     *
     * Handle case for subfields when applying custom array value with 'acf/load_value/name=address'
     *
     * @param $value
     * @param $post_id
     * @param $field
     *
     * @return mixed
     */
    function load_any_value($value, $post_id, $field){
        
        if(!$field || empty($field['type']) || $field['type'] !== $this->name){
            return $value;
        }
        
        // load sub field value
        if($this->is_sub_field($field)){
            
            // get subfield name (country|state|city|...)
            $sub_name = $this->is_sub_field($field);
            
            // check the value is an array
            if($sub_name && is_array($value)){
                return acf_maybe_get($value, $sub_name);
            }
            
        }
        
        return $value;
        
    }
    
    
    /**
     * load_sub_field_value
     *
     * Handle case when using get_field('address_street_name')
     *
     * @param $value
     * @param $post_id
     * @param $field
     *
     * @return mixed
     */
    function load_sub_field_value($value, $post_id, $field){
        
        // clone field
        $sub_field = $field;
        $sub_field['type'] = 'text'; // avoid calling itself again
        
        // get subfield name (start|end)
        $sub_name = $this->is_sub_field($field);
        
        // modify subfield
        $sub_field['name']  = $field['name'];
        $sub_field['_name'] = "{$field['_name']}_{$sub_name}"; // for acf/load_value/name=address_street_name
        
        // get value
        $value = acf_get_value($post_id, $sub_field);
        
        return $value;
        
    }
    
    
    /**
     * load_value
     *
     * @param $value
     * @param $post_id
     * @param $field
     *
     * @return array|false
     */
    function load_value($value, $post_id, $field){
        
        // load sub field value
        // case: get_field('address_street_name')
        if($this->is_sub_field($field)){
            return $this->load_sub_field_value($value, $post_id, $field);
        }
        
        // load value
        // case: get_field('address')
        
        // ensure value is an array
        if($value){
            return wp_parse_args($value, array(
                'address' => '',
            ));
        }
        
        // return
        return false;
        
    }
    
    
    /**
     * update_value
     *
     * @param $value
     * @param $post_id
     * @param $field
     *
     * @return array|string
     */
    function update_value($value, $post_id, $field){
        
        // update sub field value
        if($this->is_sub_field($field)){
            return $value;
        }
        
        // decode JSON string
        if(is_string($value)){
            $value = json_decode(wp_unslash($value), true);
        }
        
        // ensure value is an array
        $value = acf_get_array($value);
        
        if(!empty($field['fields'])){
            
            // clone
            $sub_field = $field;
            $sub_field['type'] = 'text'; // avoid calling itself again
            
            // loop subfields
            foreach($field['fields'] as $row){
                
                $row_field = $row['field'];
                $meta_name = $row['name'];
                
                if(!empty($meta_name)){
                    
                    // assign new name "{address}_{street_name}"
                    $sub_field['name']  = "{$field['name']}_{$meta_name}";
                    $sub_field['_name'] = "{$field['_name']}_{$meta_name}";
                    
                    // update sub field
                    acf_update_value(acf_maybe_get($value, $row_field, ''), $post_id, $sub_field);
                    
                }
                
            }
            
        }
        
        // save as empty string
        if(empty($value)){
            return '';
        }
        
        // return full address details
        return $value;
        
    }
    
    
    /**
     * delete_value
     *
     * @param $post_id
     * @param $field_name
     * @param $field
     */
    function delete_value($post_id, $field_name, $field){
        
        // sub field
        if($this->is_sub_field($field)){
            return;
        }
        
        if(!empty($field['fields'])){
            
            // clone
            $sub_field = $field;
            $sub_field['type'] = 'text'; // avoid calling itself again
            
            // loop subfields
            foreach($field['fields'] as $row){
                
                $meta_name = $row['name'];
                
                if(!empty($meta_name)){
                    
                    // assign new name "{address}_{street_name}"
                    $sub_field['name']  = "{$field['name']}_{$meta_name}";
                    $sub_field['_name'] = "{$field['_name']}_{$meta_name}";
                    
                }
                
                // delete
                acf_delete_value($post_id, $sub_field);
                
            }
        
        }
        
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
        
        // return
        return $value;
        
    }
    
    
    /**
     * is_sub_field
     *
     * @param $field
     *
     * @return false|mixed
     */
    function is_sub_field($field){
        
        if(!empty($field['fields'])){
            
            // loop subfields names
            foreach($field['fields'] as $row){
                
                $meta_name = $row['name'];
                
                // ends with "{address}_{street_name}"
                if(acfe_ends_with($field['name'], "{$field['_name']}_{$meta_name}")){
                    return $meta_name;
                }
                
            }
            
        }
        
        return false;
        
    }
    
    
    /**
     * translate_field
     *
     * @param $field
     *
     * @return mixed
     */
    function translate_field($field){
        
        $field['prepend'] = acf_translate($field['prepend']);
        $field['append'] = acf_translate($field['append']);
        $field['placeholder'] = acf_translate($field['placeholder']);
        
        return $field;
        
    }
    
}

// initialize
acf_register_field_type('acfe_address');

endif;