<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_location')):

class acfe_location extends acf_location{
    
    function compare_advanced($value, $rule, $allow_all = false){
        
        if($allow_all && $value === 'all'){
            return true;
        }
    
        if($rule['operator'] === '=='){
            return ($value == $rule['value']);
        }
        
        if($rule['operator'] === '!='){
            return ($value != $rule['value']);
        }
        
        if($rule['operator'] === '<'){
            return ($value < $rule['value']);
        }
        
        if($rule['operator'] === '<='){
            return $value <= $rule['value'];
        }
        
        if($rule['operator'] === '>'){
            return $value > $rule['value'];
        }
        
        if($rule['operator'] === '>='){
            return $value >= $rule['value'];
        }
        
        if($rule['operator'] === 'contains'){
            return stripos($value, $rule['value']) !== false;
        }
        
        if($rule['operator'] === '!contains'){
            return stripos($value, $rule['value']) === false;
        }
        
        if($rule['operator'] === 'starts'){
            return stripos($value, $rule['value']) === 0;
        }
        
        if($rule['operator'] === '!starts'){
            return stripos($value, $rule['value']) !== 0;
        }
        
        if($rule['operator'] === 'ends'){
            return acfe_ends_with($value, $rule['value']);
        }
        
        if($rule['operator'] === '!ends'){
            return !acfe_ends_with($value, $rule['value']);
        }
        
        if($rule['operator'] === 'regex'){
            return preg_match('/' . $rule['value'] . '/', $value);
        }
        
        if($rule['operator'] === '!regex'){
            return !preg_match('/' . $rule['value'] . '/', $value);
        }
        
        if($rule['operator'] === '=count'){
            return count($value) == $rule['value'];
        }
    
        if($rule['operator'] === '!=count'){
            return count($value) != $rule['value'];
        }
        
        if($rule['operator'] === '>count'){
            return count($value) > $rule['value'];
        }
        
        if($rule['operator'] === '>=count'){
            return count($value) >= $rule['value'];
        }
        
        if($rule['operator'] === '<count'){
            return count($value) < $rule['value'];
        }
    
        if($rule['operator'] === '<=count'){
            return count($value) <= $rule['value'];
        }
        
        return false;
        
    }
    
}

new acfe_location();

endif;