<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('ACFE_World_Data')):

class ACFE_World_Data{
    
    // vars
    public $countries;
    public $languages;
    public $currencies;
    
    /**
     * construct
     */
    function __construct(){
        
        // Data
        $this->countries = acfe_include('pro/includes/data/countries.php');
        $this->languages = acfe_include('pro/includes/data/languages.php');
        $this->currencies = acfe_include('pro/includes/data/currencies.php');
    
        // localize Names
        if(function_exists('locale_get_display_region')){
        
            // get Locale
            $locale = acf_get_locale();
            
            // loop
            foreach(array_keys($this->countries) as $code){
                $this->countries[ $code ]['localized'] = locale_get_display_region("-$code", $locale);
            }
        
        }
        
        $this->countries = apply_filters('acfe/data/countries',   $this->countries);
        $this->languages = apply_filters('acfe/data/languages',   $this->languages);
        $this->currencies = apply_filters('acfe/data/currencies', $this->currencies);
        
    }
    
}

endif;

if(!class_exists('ACFE_World_Query')):

class ACFE_World_Query{
    
    // vars
    public $type;
    public $args;
    public $data;
    
    /**
     * construct
     *
     * @param $args
     */
    function __construct($args){
        
        // setup
        $this->type = acf_extract_var($args, 'type', 'countries');
        $this->data = acf_get_instance('ACFE_World_Data')->{$this->type};
        $this->args = $args;
        
        // validate
        $this->validate();
        
        // filter
        $this->filter();
        
        // order
        $this->order();
        
    }
    
    
    /**
     * validate
     */
    function validate(){
    
        $this->args['orderby'] = (!$this->args['orderby'] && $this->args['field']) ? $this->args['field'] : $this->args['orderby'];
        $this->args['orderby'] = $this->args['orderby'] ? $this->args['orderby'] : 'code';
        
    }
    
    
    /**
     * filter
     */
    function filter(){
        
        // vars
        $args = acf_get_array($this->args);
        $data = acf_get_array($this->data);
        
        // generate rules
        $_args = array_keys($args);
        $rules = array();
        
        // loop
        foreach($_args as $rule){
            
            // vars
            $split = explode('__', $rule);
            $key = $split[0];
            
            // filter
            if(acf_maybe_get($split, 1) !== 'in') continue;
            
            // plural keys
            if($key === 'language') $key = 'languages';
            if($key === 'country')  $key = 'countries';
            if($key === 'currency') $key = 'currencies';
            
            // add rule:
            // name == name__in
            $rules[ $key ] = $rule;
            
        }
        
        // loop thru data
        foreach(array_keys($data) as $key){
            
            // vars
            $row = $data[$key];
            $valid = true;
            
            // Loop thru rules
            foreach($rules as $r_key => $rule){
                
                // filter
                if(!$args[$rule]) continue;
                
                $args[$rule] = acf_get_array($args[$rule]);                  // array('us', 'fr', 'de')
                $is_string = isset($row[$r_key]) && !is_array($row[$r_key]); // $data['fr_FR']['locale']
                
                // string
                if($is_string){
                    
                    if(in_array($row[$r_key], $args[$rule])) continue;
                    
                    $valid = false;
                    
                // array
                }else{
                    
                    $found = false;
                    
                    foreach($row[$r_key] as $sub_row){
                        
                        if(!in_array($sub_row, $args[$rule])) continue;
                        
                        $found = true;
                        
                    }
                    
                    if(!$found){
                        $valid = false;
                    }
                    
                }
                
                
            }
            
            // Do nothing
            if($valid) continue;
            
            // unset
            unset($data[$key]);
            
        }
        
        // Set data
        $this->data = $data;
        
    }
    
    
    /**
     * order
     */
    function order(){
    
        // vars
        $args = $this->args;
        $data = $this->data;
        
        // prepare
        $orderby = $args['orderby'];
        $order = $args['order'];
        $columns = explode('__', $orderby);
        
        // orderby: key
        if(acf_maybe_get($columns, 1) !== 'in'){
            $data = wp_list_sort($data, $orderby, $order, true);
            
        // orderby: name__in
        }else{
            
            $key = $columns[0];                         // name
            $array = acf_get_array($args[$orderby]);    // array('fr', 'us', 'de')
            
            uasort($data, function($a, $b) use($key, $array, $order){
                
                // ASC
                $value_a = $a[$key];
                $value_b = $b[$key];
                
                // DESC
                if($order === 'DESC'){
                    $value_a = $b[$key];
                    $value_b = $a[$key];
                }
                
                // Position
                $pos_a = array_search($value_a, $array);
                $pos_b = array_search($value_b, $array);
                
                // Calculate
                return $pos_a - $pos_b;
                
            });
            
        }
        
        //offset
        if($args['offset'] > 0){
            $data = array_slice($data, $args['offset']);
        }
        
        // limit
        if($args['limit'] > 0){
            $data = array_slice($data, 0, $args['limit']);
        }
        
        // clone
        $_data = $data;
        
        // field
        if($args['field']){
            
            $data = wp_list_pluck($data, $args['field']);
    
            // display
            if($args['display'] !== false){
        
                foreach(array_keys($data) as $code){
            
                    $display = $args['display'];
            
                    if(preg_match_all('/{(.*?)}/', $display, $matches)){
                
                        foreach($matches[1] as $i => $tag){
                            $value = acf_maybe_get($_data[$code], $tag);
                            $display = str_replace('{' . $tag . '}', $value, $display);
                        }
    
                        $display = str_replace('{' . $tag . '}', '', $display);
                
                    }
            
                    $data[$code] = $display;
            
                }
        
            }
            
            // prepend
            if($args['prepend'] !== false){
                
                foreach(array_keys($data) as $code){
                    
                    $prepend = $args['prepend'];
                    
                    if(preg_match_all('/{(.*?)}/', $prepend, $matches)){
                        
                        foreach($matches[1] as $i => $tag){
                            $value = acf_maybe_get($_data[$code], $tag);
                            $prepend = str_replace('{' . $tag . '}', $value, $prepend);
                        }
                        
                        $prepend = str_replace('{' . $tag . '}', '', $prepend);
                        
                    }
                    
                    $data[$code] = $prepend . $data[$code];
                    
                }
                
            }
            
            // append
            if($args['append'] !== false){
                
                foreach(array_keys($data) as $code){
                    
                    $append = $args['append'];
                    
                    if(preg_match_all('/{(.*?)}/', $append, $matches)){
                        
                        foreach($matches[1] as $i => $tag){
                            $value = acf_maybe_get($_data[$code], $tag);
                            $append = str_replace('{' . $tag . '}', $value, $append);
                        }
                        
                        $append = str_replace('{' . $tag . '}', '', $append);
                        
                    }
                    
                    $data[$code] = $data[$code] . $append;
                    
                }
                
            }
            
        }
        
        // groupby
        if($args['groupby']){
            
            $groups = array();
            
            foreach($_data as $code => $row){
                
                if(!isset($row[ $args['groupby'] ]))
                    break;
                
                $groups[ $row[ $args['groupby'] ] ][ $code ] = $data[$code];
                
            }
            
            if($groups){
                
                // sort group asc
                ksort($groups);
                
                // assign data
                $data = $groups;
                
            }
            
        }
    
        // set data
        $this->data = $data;
        
    }
    
    
    /**
     * get
     *
     * @return mixed
     */
    function get(){
        return $this->data;
    }
    
}

endif;