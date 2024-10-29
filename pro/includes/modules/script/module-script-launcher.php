<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_script_launcher')):

class acfe_script_launcher extends acfe_script{
    
    /**
     * initialize
     */
    function initialize(){
        
        $this->name         = 'script_launcher';
        $this->title        = 'Script Launcher';
        $this->description  = 'Easily launch scripts using hooks';
        $this->recursive    = true;
        $this->category     = 'Data';
        $this->author       = 'ACF Extended';
        $this->link         = 'https://www.acf-extended.com';
        $this->version      = '1.0';
        
        $this->field_groups = array(
    
            array(
                'title'             => 'Scripts',
                'key'               => 'group_acfe_script_launcher',
                'position'          => 'side',
                'label_placement'   => 'top',
                'fields'            => array(
            
                    array(
                        'label'         => 'Script',
                        'name'          => 'script',
                        'type'          => 'select',
                        'instructions'  => '',
                        'required'      => true,
                        'allow_null'    => true,
                        'placeholder'   => 'Select',
                        'return_format' => 'value',
                        'choices'       => $this->get_scripts_choices()
                    ),
                    
                    array(
                        'label'         => 'Number of executions',
                        'name'          => 'executions',
                        'type'          => 'number',
                        'instructions'  => '',
                        'required'      => false,
                        'min'           => -1,
                        'default_value' => -1,
                        'conditions'    => $this->get_scripts_conditions(),
                    ),
        
                ),
    
            ),

        );
        
        // default data
        $this->data = array(
            'script'     => '',
            'executions' => 0,
        );
        
    }
    
    
    /**
     * start
     */
    function start(){
        
        $script = acfe_get_launcher_script(get_field('script'));
    
        $this->data['script'] = $script['name'];
        $this->data['executions'] = $this->get_script_executions($script);
    
        // action
        do_action("acfe/script_launcher/start",                        $this);
        do_action("acfe/script_launcher/start/name={$script['name']}", $this);
    
        $this->send_response(array(
            'message' => "[{$script['label']}] Starting...",
        ));
        
    }
    
    
    /**
     * stop
     */
    function stop(){
    
        $script = acfe_get_launcher_script($this->data['script']);
    
        // action
        do_action("acfe/script_launcher/stop",                        $this);
        do_action("acfe/script_launcher/stop/name={$script['name']}", $this);
    
        // send response
        $this->send_response(array(
            'message' => "[{$script['label']}] Finished ",
            'status'  => 'success',
        ));
        
    }
    
    
    /**
     * request
     */
    function request(){
    
        // count executions
        // finish script if number of executions is reached
        if($this->data['executions'] >= 0 && $this->data['executions'] === $this->index){
            
            $this->send_response(array(
                'event' => 'stop',
            ));
        
        }
    
        $script = acfe_get_launcher_script($this->data['script']);
        
        // action
        do_action("acfe/script_launcher/request",                        $this);
        do_action("acfe/script_launcher/request/name={$script['name']}", $this);
    
    }
    
    
    /**
     * get_script_executions
     *
     * @param $script
     *
     * @return mixed
     */
    function get_script_executions($script){
    
        // executions manually set
        if($script['executions'] === true){
            return get_field('executions');
        }
    
        return $script['executions'];
        
    }
    
    
    /**
     * get_scripts_choices
     *
     * @return array
     */
    function get_scripts_choices(){
        return wp_list_pluck(acfe_get_launcher_scripts(), 'label', 'name');
    }
    
    
    /**
     * get_scripts_conditions
     *
     * @return array
     */
    function get_scripts_conditions(){
    
        $scripts = acfe_get_launcher_scripts();
    
        $conditions = array(
            
            array(
                
                array(
                    'field'    => 'field_script',
                    'operator' => '!=empty',
                )
                
                /**
                 * array(
                 *     'field'     => 'field_script',
                 *     'operator'  => '!=',
                 *     'value'     => $script['name'],
                 * )
                 */
                
            )
            
        );
    
        foreach($scripts as $script){
        
            // check executions
            if($script['executions'] !== true){
            
                $conditions[0][] = array(
                    'field'     => 'field_script',
                    'operator'  => '!=',
                    'value'     => $script['name'],
                );
            
            }
        
        }
        
        return $conditions;
        
    }
    
}

acfe_register_script('acfe_script_launcher');

endif;