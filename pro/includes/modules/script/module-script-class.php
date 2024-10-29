<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_script')):

class acfe_script{
    
    // defaults
    var $active         = true,
        $name           = '',
        $title          = '',
        $description    = '',
        $recursive      = false,
        $category       = false,
        $author         = false,
        $link           = false,
        $version        = false,
        $capability     = null,
        $field_groups   = array();
    
    var $index          = -1,
        $data           = array(),
        $type           = 'request',
        $confirm        = null,
        $stats          = array(
            'total' => 0,
            'left'  => 0
        );
    
    
    /**
     * construct
     */
    function __construct(){
        $this->initialize();
    }
    
    
    /**
     * initialize
     */
    function initialize(){}
    
    
    /**
     * validate
     */
    function validate(){}
    
    
    /**
     * start
     */
    function start(){}
    
    
    /**
     * request
     */
    function request(){}
    
    
    /**
     * stop
     */
    function stop(){}
    
    
    /**
     * admin_load
     */
    function admin_load(){}
    
    
    /**
     * admin_head
     */
    function admin_head(){}
    
    
    /**
     * admin_enqueue_scripts
     */
    function admin_enqueue_scripts(){}
    
    
    /**
     * send_response
     *
     * @param $args
     */
    function send_response($args = array()){
        
        // allow string/sequential array
        if(is_string($args) || (acf_is_sequential_array($args) && !empty($args))){
            $args = array('message' => $args);
        }
        
        // default args
        $args = wp_parse_args($args, array(
            'status' => 'info',
        ));
    
        // inject data & type
        $args['data'] = $this->data;
        $args['stats'] = $this->stats;
        $args['confirm'] = $this->confirm;
        $args['type'] = $this->type;
    
        // message
        $this->parse_message($args);
    
        // link
        $this->parse_link($args);
    
        // debug
        $this->parse_debug($args);
        
        // event
        $this->parse_event($args);
        
        // send json
        wp_send_json($args);
        
    }
    
    
    /**
     * parse_message
     *
     * @param $args
     */
    function parse_message(&$args){
        
        // bail early
        if(!isset($args['message'])){
            return;
        }
        
        // message not array
        if(!is_array($args['message'])){
            return;
        }
        
        // buffer
        ob_start();
        ?>
        <ul>
            <?php foreach($args['message'] as $line): ?>
                <li><?php echo $line; ?></li>
            <?php endforeach; ?>
        </ul>
        <?php
        
        // assign
        $args['message'] = ob_get_clean();
        
    }
    
    
    /**
     * parse_link
     *
     * @param $args
     */
    function parse_link(&$args){
    
        if(!isset($args['link'])){
            return;
        }
        
        $links = array();
        $link = acf_get_array($args['link']);
        
        // loop thru links
        foreach($link as $k => $v){
            
            $atts = array(
                'text'      => $k,
                'href'      => $v,
                'target'    => '_blank',
            );
            
            if(is_numeric($k)){
    
                // array( '#', 'https://' ) )
                $atts = array(
                    'href'  => $v,
                    'target' => '_blank',
                );
                
                // array( array('text' => 'Text', 'href' => '#' ) )
                if(is_array($v)){
                    $atts = $v;
                }
                
            }
            
            $text = acf_extract_var($atts, 'text', 'Link');
            
            $links[] = '<a ' . acf_esc_atts($atts) . '>' . $text . '</a>';
            
        }
        
        // assign
        $args['link'] = implode(' | ', $links);
    
        if(!isset($args['message'])){
            $args['message'] = '—';
        }
        
    }
    
    
    /**
     * parse_debug
     *
     * @param $args
     */
    function parse_debug(&$args){
        
        // bail early
        if(!isset($args['debug'])){
            return;
        }
        
        // vars
        $debug = $args['debug'];
        
        // array | object
        if(is_array($debug) || is_object($debug)){
    
            $debug = print_r($debug, true);
            
        // bool
        }elseif(is_bool($debug)){
    
            $debug = 'bool(' . ($debug ? 'true' : 'false') . ')';
            
        }
        
        // assign
        $args['debug'] = $debug;
        
        // empty message
        if(!isset($args['message'])){
            $args['message'] = '—';
        }
        
    }
    
    
    /**
     * parse_event
     *
     * @param $args
     */
    function parse_event(&$args){
    
        // default event
        $default = '';
        
        // default: start
        if($this->type === 'start'){
    
            $default = 'request';
        
        // default: request
        }elseif($this->type === 'request'){
    
            $default = 'request';
        
            if(!$this->recursive){
                $default = 'stop';
            }
        
        }
    
        // inject event
        $args['event'] = acf_maybe_get($args, 'event');
    
        // fallback to default
        if(empty($args['event'])){
            $args['event'] = $default;
        
        // effect: pause/clear
        }elseif(in_array($args['event'], array('pause', 'clear', 'confirm'))){
        
            $args['effect'] = $args['event'];
            $args['event'] = $default;
        
        }
        
    }
    
}

endif;