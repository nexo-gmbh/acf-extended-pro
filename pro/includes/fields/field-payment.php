<?php

if(!defined('ABSPATH')){
    exit;
}

if(!class_exists('acfe_payment')):

class acfe_payment extends acf_field{
    
    var $sub_fields;
    var $errors;
    
    /**
     * initialize
     */
    function initialize(){
        
        $this->name = 'acfe_payment';
        $this->label = __('Payment', 'acfe');
        $this->category = 'E-Commerce';
        $this->defaults = array(
            'gateways'                  => array('stripe'),
            'amount'                    => '',
            'currency'                  => 'USD',
            'description'               => '',
            'button_paypal'             => __('PayPal Checkout', 'acfe'),
            'button'                    => 0,
            'button_value'              => __('Pay now', 'acfe'),
            'button_class'              => 'button button-primary',
            'button_id'                 => '',
            'button_before'             => '',
            'button_after'              => '',
            'stripe_hide_zip'           => 0,
            'stripe_test_secret_key'    => '',
            'stripe_test_public_key'    => '',
            'stripe_secret_key'         => '',
            'stripe_public_key'         => '',
            'paypal_test_username'      => '',
            'paypal_test_password'      => '',
            'paypal_test_signature'     => '',
            'paypal_test_merchant_id'   => '',
            'paypal_username'           => '',
            'paypal_password'           => '',
            'paypal_signature'          => '',
            'paypal_merchant_id'        => '',
            'mode'                      => 'test',
        );
        
        $this->sub_fields = array('id', 'gateway', 'amount', 'currency', 'items', 'date', 'ip', 'mode', 'object');
        
        // errors
        $errors = array(
            'amount_null'        => __('Amount cannot be null', 'acfe'),
            'field_not_found'    => __('An error has occured', 'acfe'),
            'payment_create'     => __('An error has occured', 'acfe'),
            'payment_confirm'    => __('An error has occured', 'acfe'),
            'payment_failed'     => __('Payment failed', 'acfe'),
            'invalid_data'       => __('An error has occured', 'acfe'),
            'invalid_card'       => __('Your card number is invalid', 'acfe'),
            'payment_cancelled'  => __('Payment cancelled, please try again', 'acfe'),
        );
        
        // filters
        $this->errors = apply_filters('acfe/fields/payment/errors', $errors);
        
        // stripe + paypal request
        add_action('wp_ajax_acfe/payment_request',              array($this, 'payment_create'));
        add_action('wp_ajax_nopriv_acfe/payment_request',       array($this, 'payment_create'));
        
        // stripe confirm
        add_action('wp_ajax_acfe/stripe_confirm',               array($this, 'stripe_confirm'));
        add_action('wp_ajax_nopriv_acfe/stripe_confirm',        array($this, 'stripe_confirm'));
        
        // paypal confirm
        add_action('wp_ajax_acfe/paypal_confirm',               array($this, 'paypal_confirm'));
        add_action('wp_ajax_nopriv_acfe/paypal_confirm',        array($this, 'paypal_confirm'));
    
        $this->add_field_filter('acfe/form/format_value',       array($this, 'form_format_value'), 5, 4);
        
    }
    
    
    /**
     * render_field_settings
     *
     * @param $field
     */
    function render_field_settings($field){
    
        // Gateways
        acf_render_field_setting($field, array(
            'label'         => __('Gateways', 'acfe'),
            'instructions'  => __('Choose your payment gateways', 'acfe'),
            'name'          => 'gateways',
            'type'          => 'select',
            'ui'            => 1,
            'multiple'      => 1,
            'choices'       => array(
                'stripe' => 'Stripe',
                'paypal' => 'PayPal Express',
            ),
        ));
    
        // Amount
        acf_render_field_setting($field, array(
            'label'         => __('Amount', 'acfe'),
            'instructions'  => __('The amount to charge'),
            'name'          => 'amount',
            'type'          => 'number',
            'min'           => 0,
        ));
    
        // Currency
        acf_render_field_setting($field, array(
            'label'             => __('Currency', 'acfe'),
            'instructions'      => __('The currency to use'),
            'name'              => 'currency',
            'type'              => 'acfe_currencies',
            'field_type'        => 'select',
            'display_format'    => '{symbol} {code}',
            'return_format'     => 'code',
            'ui'                => 1,
            'search_placeholder'=> 'Search currencies',
        ));
    
        // Description
        acf_render_field_setting($field, array(
            'label'         => __('Description', 'acfe'),
            'instructions'  => __('A description attached to the payment. Useful for displaying to users', 'acfe'),
            'name'          => 'description',
            'type'          => 'text',
        ));
    
        // Paypal Button
        acf_render_field_setting($field, array(
            'label'         => __('Paypal Button', 'acfe'),
            'instructions'  => __('The paypal checkout button text', 'acfe'),
            'name'          => 'button_paypal',
            'type'          => 'text',
            'conditions'    => array(
                array(
                    'field'     => 'gateways',
                    'operator'  => '==contains',
                    'value'     => 'paypal'
                ),
            ),
        ));
    
        // Button
        acf_render_field_setting($field, array(
            'label'         => __('Display Button','acf'),
            'instructions'  => '',
            'name'          => 'button',
            'type'          => 'true_false',
            'ui'            => 1,
        ));
    
        // Button: Value
        acf_render_field_setting($field, array(
            'label'         => __('Button value', 'acfe'),
            'instructions'  => __('Set a default button value', 'acfe'),
            'type'          => 'text',
            'name'          => 'button_value',
            'conditions'    => array(
                array(
                    'field'     => 'button',
                    'operator'  => '==',
                    'value'     => '1'
                ),
            ),
        ));
    
        // Button: Class
        acf_render_field_setting($field, array(
            'label'         => __('Button attributes','acf'),
            'instructions'  => '',
            'type'          => 'text',
            'name'          => 'button_class',
            'prepend'       => __('class', 'acf'),
            'conditions'    => array(
                array(
                    'field'     => 'button',
                    'operator'  => '==',
                    'value'     => '1'
                ),
            ),
        ));
    
        // Button: ID
        acf_render_field_setting($field, array(
            'label'         => '',
            'instructions'  => '',
            'type'          => 'text',
            'name'          => 'button_id',
            'prepend'       => __('id', 'acf'),
            '_append'       => 'button_class',
            'conditions'    => array(
            array(
                'field'     => 'button',
                'operator'  => '==',
                'value'     => '1'
            ),
        ),
        ));
    
        // Button: Before HTML
        acf_render_field_setting($field, array(
            'label'         => __('Before HTML', 'acfe'),
            'instructions'  => __('Custom HTML before the button', 'acfe'),
            'type'          => 'acfe_code_editor',
            'name'          => 'button_before',
            'rows'          => 4,
            'conditions'    => array(
                array(
                    'field'     => 'button',
                    'operator'  => '==',
                    'value'     => '1'
                ),
            ),
        ));
    
        // Button: After HTML
        acf_render_field_setting($field, array(
            'label'         => __('After HTML', 'acfe'),
            'instructions'  => __('Custom HTML after the button', 'acfe'),
            'type'          => 'acfe_code_editor',
            'name'          => 'button_after',
            'rows'          => 4,
            'conditions'    => array(
                array(
                    'field'     => 'button',
                    'operator'  => '==',
                    'value'     => '1'
                ),
            ),
        ));
    
        // Stripe: Hide Postal Code
        acf_render_field_setting($field, array(
            'label'         => __('Stripe: Hide Postal Code', 'acfe'),
            'instructions'  => __('Hide Stripe\'s postal code field validation which can be displayed in specific cases', 'acfe'),
            'name'          => 'stripe_hide_zip',
            'type'          => 'true_false',
            'ui'            => true,
            'conditions'    => array(
                array(
                    'field'     => 'gateways',
                    'operator'  => '==contains',
                    'value'     => 'stripe'
                ),
            ),
        ));
    
        // Stripe Test: Secret Key
        acf_render_field_setting($field, array(
            'label'         => __('Stripe Test API', 'acfe'),
            'instructions'  => '<a href="https://dashboard.stripe.com/test/apikeys" target="_blank">' . __('Your Stripe Test API Keys', 'acfe') . '</a>',
            'name'          => 'stripe_test_secret_key',
            'type'          => 'text',
            'prepend'       => __('Secret key', 'acfe'),
            '_appended'     => true,
        ));
        
        // Stripe Test: Public Key
        acf_render_field_setting($field, array(
            'label'         => '',
            'instructions'  => '',
            'name'          => 'stripe_test_public_key',
            'type'          => 'text',
            'prepend'       => __('Public key', 'acfe'),
            '_append'       => 'stripe_test_secret_key',
        ));
    
        // Stripe Prod: Private Key
        acf_render_field_setting($field, array(
            'label'         => __('Stripe Production API', 'acfe'),
            'instructions'  => '<a href="https://dashboard.stripe.com/apikeys" target="_blank">' . __('Your Stripe Production API Keys', 'acfe') . '</a>',
            'name'          => 'stripe_secret_key',
            'type'          => 'text',
            'prepend'       => __('Secret key', 'acfe'),
            '_appended'     => true,
        ));
        
        // Stripe Prod: Public Key
        acf_render_field_setting($field, array(
            'label'         => '',
            'instructions'  => '',
            'name'          => 'stripe_public_key',
            'type'          => 'text',
            'prepend'       => __('Public key', 'acfe'),
            '_append'       => 'stripe_secret_key',
        ));
    
        // PayPal Test: Username
        acf_render_field_setting($field, array(
            'label'         => __('PayPal Test API', 'acfe'),
            'instructions'  => '<a href="https://developer.paypal.com/developer/accounts/" target="_blank">' . __('Your PayPal Sandbox Credentials', 'acfe') . '</a>',
            'name'          => 'paypal_test_username',
            'type'          => 'text',
            'prepend'       => __('Username', 'acfe'),
            '_appended'     => true,
        ));
    
        // PayPal Test: Password
        acf_render_field_setting($field, array(
            'label'         => '',
            'instructions'  => '',
            'name'          => 'paypal_test_password',
            'type'          => 'text',
            'prepend'       => __('Password', 'acfe'),
            '_append'       => 'paypal_test_username',
        ));
    
        // PayPal Test: Signature
        acf_render_field_setting($field, array(
            'label'         => '',
            'instructions'  => '',
            'name'          => 'paypal_test_signature',
            'type'          => 'text',
            'prepend'       => __('Signature', 'acfe'),
            '_appended'     => true,
        ));
    
        // PayPal Test: Merchant ID
        acf_render_field_setting($field, array(
            'label'         => '',
            'instructions'  => '',
            'name'          => 'paypal_test_merchant_id',
            'type'          => 'text',
            'prepend'       => __('Merchant ID', 'acfe'),
            '_append'       => 'paypal_test_signature',
        ));
    
        // PayPal Prod: Username
        acf_render_field_setting($field, array(
            'label'         => __('PayPal Production API', 'acfe'),
            'instructions'  => '<a href="https://developer.paypal.com/docs/nvp-soap-api/apiCredentials/#api-signatures" target="_blank">' . __('Your PayPal Production Credentials', 'acfe') . '</a>',
            'name'          => 'paypal_username',
            'type'          => 'text',
            'prepend'       => __('Username', 'acfe'),
            '_appended'     => true,
        ));
    
        // PayPal Prod: Password
        acf_render_field_setting($field, array(
            'label'         => '',
            'instructions'  => '',
            'name'          => 'paypal_password',
            'type'          => 'text',
            'prepend'       => __('Password', 'acfe'),
            '_append'       => 'paypal_username',
        ));
    
        // PayPal Prod: Signature
        acf_render_field_setting($field, array(
            'label'         => '',
            'instructions'  => '',
            'name'          => 'paypal_signature',
            'type'          => 'text',
            'prepend'       => __('Signature', 'acfe'),
            '_appended'     => true,
        ));
    
        // PayPal Prod: Merchant ID
        acf_render_field_setting($field, array(
            'label'         => '',
            'instructions'  => '',
            'name'          => 'paypal_merchant_id',
            'type'          => 'text',
            'prepend'       => __('Merchant ID', 'acfe'),
            '_append'       => 'paypal_signature',
        ));
    
        // Mode
        acf_render_field_setting($field, array(
            'label'         => __('Mode', 'acfe'),
            'instructions'  => __('Switch API mode', 'acfe'),
            'name'          => 'mode',
            'type'          => 'radio',
            'layout'        => 'horizontal',
            'choices'       => array(
                'test' => __('Test', 'acfe'),
                'prod' => __('Production', 'acfe'),
            ),
        ));
        
    }
    
    
    /**
     * update_field
     *
     * @param $field
     *
     * @return mixed
     */
    function update_field($field){
    
        // default to stripe
        if(empty($field['gateways'])){
            $field['gateways'] = array('stripe');
        }
    
        return $field;
        
    }
    
    
    /**
     * input_admin_enqueue_scripts
     */
    function input_admin_enqueue_scripts(){
    
        // register
        wp_register_script('acfe-stripe',   '//js.stripe.com/v3/',                     array('jquery'), null);
        wp_register_script('acfe-paypal',   '//www.paypalobjects.com/api/checkout.js', array('jquery'), null);
        
        // localize
        acf_localize_data(array(
            'paymentL10n' => array(
                'paymentCancelled' => $this->errors['payment_cancelled'],
            )
        ));
        
    }
    
    
    /**
     * prepare_field
     *
     * @param $field
     *
     * @return mixed
     */
    function prepare_field($field){
        
        // value render
        if($field['value']){
            
            $field['required'] = false;
            return $field;
            
        }
        
        // hide field if paypal only, no button or first gateway is paypal and no selector
        if(!$field['button'] && ($this->has_gateway($field, 'paypal', true) || (reset($field['gateways']) === 'paypal'))){
            $field['wrapper']['class'] .= ' acf-hidden';
        }
        
        return $field;
        
    }
    
    
    /**
     * render_field
     *
     * @param $field
     */
    function render_field($field){
        
        if($field['value']){
            $this->render_value($field);
        }else{
            $this->render_input($field);
        }
        
    }
    
    
    /**
     * render_value
     *
     * @param $field
     */
    function render_value($field){
        
        // format value
        $value = acf_format_value($field['value'], 0, $field);
    
        ?>
        <div class="acfe-payment-value">
            <div class="gateway">
                <strong><?php _e('Gateway', 'acfe'); ?>:</strong> <?php echo $value['gateway']; ?><?php echo $value['mode'] === __('Test', 'acfe') ? " ({$value['mode']})" : ''; ?>
            </div>
    
            <div class="amount">
                <strong><?php _e('Amount', 'acfe'); ?>:</strong> <?php echo $value['symbol'].$value['amount']; ?>
            </div>
    
            <?php if($value['items'] && is_array($value['items']) && isset($value['items'][0]) && isset($value['items'][0]['item'])): ?>
            <div class="items">
                <strong><?php _e('Items', 'acfe'); ?>:</strong> <?php echo implode(', ', wp_list_pluck($value['items'], 'item')); ?>
            </div>
            <?php endif; ?>
            
            <div class="date">
                <strong><?php _e('Date', 'acfe'); ?>:</strong> <?php echo $value['date']; ?>
            </div>
            
            <div class="ip">
                <strong><?php _e('IP Address', 'acfe'); ?>:</strong> <a href="https://ipinfo.io/<?php echo $value['ip']; ?>" target="_blank"><?php echo $value['ip']; ?></a>
            </div>
            
            <div class="transaction">
                <strong><?php _e('Payment ID', 'acfe'); ?>:</strong> <a href="<?php echo esc_url($value['url']); ?>" target="_blank"><?php echo $value['id']; ?></a>
            </div>
            
            <div class="object">
                <strong><?php _e('Payment Object', 'acfe'); ?>:</strong> <a href="#" data-modal><?php _e('View', 'acfe'); ?></a>
                <div class="acfe-modal" data-title="<?php _e('Payment Object', 'acfe'); ?>" data-size="large" data-footer="<?php _e('Close', 'acfe'); ?>">
                    <div class="acfe-modal-spacer">
                        <pre><?php print_r($value['object']); ?></pre>
                    </div>
                </div>
            </div>
        </div>
        <?php
    
    }
    
    
    /**
     * render_input
     *
     * @param $field
     */
    function render_input($field){
    
        // stripe enqueue
        if($this->has_gateway($field, 'stripe')){
            wp_enqueue_script('acfe-stripe');
        }
    
        // paypal enqueue
        if($this->has_gateway($field, 'paypal')){
            wp_enqueue_script('acfe-paypal');
        }
    
        // div
        $div = array(
            'class'         => "acfe-payment-wrap {$field['class']}",
            'data-gateway'  => reset($field['gateways']),
            'data-gateways' => $field['gateways'],
            'data-mode'     => $field['mode']
        );
    
        // stripe
        if($this->has_gateway($field, 'stripe')){
            $div['data-public-key'] = $this->get_gateway_api($field, 'stripe', 'public_key');
            $div['data-hide_zip'] = $field['stripe_hide_zip'];
            $div['class'] .= ' -stripe';
        }
    
        // paypal
        if($this->has_gateway($field, 'paypal')){
            $div['data-merchant-id'] = $this->get_gateway_api($field, 'paypal', 'merchant_id');
            $div['class'] .= ' -paypal';
        }
        
        if(!$field['button'] && $this->has_gateway($field, 'paypal')){
            $div['data-paypal-hidden'] = true;
        }
    
        // button
        if($field['button']){
            $div['class'] .= ' -button';
        }
    
        // hidden
        $hidden_input = array(
            'id'    => $field['id'],
            'name'  => $field['name'],
        );
    
        ?>
        <div <?php echo acf_esc_atts($div); ?>>
        
            <?php
        
            acf_hidden_input($hidden_input);
        
            $this->render_gateways($field);
        
            $this->render_button($field);
        
            ?>

        </div>
        <?php
        
    }
    
    
    /**
     * render_gateways
     *
     * @param $field
     */
    function render_gateways($field){
        
        if($this->has_gateway($field, 'stripe')){
            
            $hidden = reset($field['gateways']) !== 'stripe' ? 'acf-hidden' : '';
    
            ?><div class="acfe-payment-gateway acfe-payment-stripe <?php echo $hidden; ?>"></div><?php
            
        }
    
        if($this->has_gateway($field, 'paypal')){
            
            ?>
            <div class="acfe-payment-gateway acfe-payment-paypal acf-hidden">
                <button class="acfe-payment-paypal-button <?php echo esc_attr($field['button_class']); ?>"><?php echo esc_html($field['button_paypal']); ?></button>
            </div>
            <?php
        
        }
        
    }
    
    
    /**
     * render_button
     *
     * @param $field
     */
    function render_button($field){
        
        // bail early
        if(!$field['button']) return;
        
        // atts
        $atts = array(
            'id'    => $field['button_id'],
            'class' => 'acfe-payment-button ' . $field['button_class'],
        );
    
        ?>
        <div class="acfe-payment-button-wrap">
            
            <?php echo $field['button_before']; ?>
            
            <button <?php echo acf_esc_atts($atts); ?>><?php echo $field['button_value']; ?></button>
    
            <?php echo $field['button_after']; ?>
            
        </div>
        
        <?php
    
    }
    
    
    /**
     * payment_create
     */
    function payment_create(){
    
        // validate
        if(!acf_verify_ajax()){
            die();
        }
    
        // retrieve vars
        $gateway = acf_maybe_get_POST('gateway', '');
        $field_key = acf_maybe_get_POST('field_key', '');
        $post_id = acf_maybe_get_POST('post_id', 0);
        $acf = acf_maybe_get_POST('fields', array());
    
        // load field
        $field = acf_get_field($field_key);
    
        // field not found
        if(!$field){
            wp_send_json_error(array(
                'error' => $this->errors['field_not_found']
            ));
        }
    
        // unset front-end honeypot
        // todo: _post_content and _post_title
        unset($acf['_validate_email']);
        
        // default args
        $args = array(
            'amount'        => $field['amount'],
            'currency'      => $field['currency'],
            'description'   => $field['description'],
        );
        
        // stripe
        if($gateway === 'stripe'){
            $this->stripe_create($args, $field, $post_id, $acf);
            
        // paypal
        }elseif($gateway === 'paypal'){
            $this->paypal_create($args, $field, $post_id, $acf);
        }
        
    }
    
    
    /**
     * stripe_create
     *
     * @param $args
     * @param $field
     * @param $post_id
     * @param $acf
     *
     * @throws \Stripe\Exception\ApiErrorException
     */
    function stripe_create($args, $field, $post_id, $acf){
        
        // include
        $this->include_stripe($field);
        
        // vars
        $gateway = 'stripe';
    
        // loop
        acfe_setup_meta($acf, 'acfe/stripe_create', true);
            
            // args
            // https://stripe.com/docs/api/payment_intents/create
            $args = apply_filters("acfe/fields/payment/create",                       $args, $field, $gateway, $post_id);
            $args = apply_filters("acfe/fields/payment/create/gateway={$gateway}",    $args, $field, $gateway, $post_id);
            $args = apply_filters("acfe/fields/payment/create/name={$field['name']}", $args, $field, $gateway, $post_id);
            $args = apply_filters("acfe/fields/payment/create/key={$field['key']}",   $args, $field, $gateway, $post_id);
            
        // reset
        acfe_reset_meta();
        
        // validate amount
        $args['amount'] = $this->get_gateway_amount($args['amount'], $args['currency'], 'stripe');
        
        // check amount is not null
        if($args['amount'] === 0.0){
    
            wp_send_json_error(array(
                'error' => $this->errors['amount_null']
            ));
            
        }
    
        // try
        try{
    
            // create payment intent
            $intent = \Stripe\PaymentIntent::create($args);
            
            $return = array(
                'secret' => $intent->client_secret
            );
            
            $return = apply_filters('acfe/fields/payment/create_success',                       $return, $intent, $args, $field, $gateway, $post_id, $acf);
            $return = apply_filters("acfe/fields/payment/create_success/gateway={$gateway}",    $return, $intent, $args, $field, $gateway, $post_id, $acf);
            $return = apply_filters("acfe/fields/payment/create_success/name={$field['name']}", $return, $intent, $args, $field, $gateway, $post_id, $acf);
            $return = apply_filters("acfe/fields/payment/create_success/key={$field['key']}",   $return, $intent, $args, $field, $gateway, $post_id, $acf);
    
            wp_send_json_success($return);
            
        // error
        }catch(Exception $e){
            
            wp_send_json_error(array(
                'error' => $e->getMessage()
            ));
            
        }
        
    }
    
    
    /**
     * stripe_confirm
     */
    function stripe_confirm(){
    
        // validate
        if(!acf_verify_ajax()){
            die();
        }
    
        // retrieve vars
        $field_key = acf_maybe_get_POST('field_key', '');
        $post_id = acf_maybe_get_POST('post_id', 0);
        $acf = acf_maybe_get_POST('fields', array());
        $intent_id = urlencode(acf_maybe_get_POST('intent_id', ''));
    
        // load field
        $field = acf_get_field($field_key);
    
        // field not found
        if(!$field){
            wp_send_json_error(array(
                'error' => $this->errors['field_not_found']
            ));
        }
    
        // include stripe
        $this->include_stripe($field);
        
        try{
        
            // retrieve intent
            $intent = \Stripe\PaymentIntent::retrieve($intent_id);
            
            // successful payment
            if($intent->status === 'succeeded'){
    
                // generate response
                $response = array(
                    'id'        => $intent_id,
                    'gateway'   => 'stripe',
                    'object'    => $intent->toArray()
                );
                
                // encrypt
                $response = $this->payment_confirm($response, $field, $post_id, $acf);
                $response = acf_encrypt(json_encode($response));
                
                // send
                wp_send_json_success(array(
                    'response' => $response
                ));
        
            // unsuccessful payment
            }else{
    
                wp_send_json_error(array(
                    'response' => $this->errors['payment_failed']
                ));
                
            }
        
        }catch(\Stripe\Exception\ApiErrorException $e){
            
            // error
            wp_send_json_error(array(
                'error' => $e->getMessage()
            ));
        
        }
        
    }
    
    
    /**
     * paypal_create
     *
     * @param $args
     * @param $field
     * @param $post_id
     * @param $acf
     */
    function paypal_create($args, $field, $post_id, $acf){
        
        // include
        $this->include_paypal();
    
        // init
        $paypal = new ACFE_Paypal();
        
        // vars
        $endpoint = $this->get_gateway_api($field, 'paypal', 'endpoint');
        $checkout_url = $this->get_gateway_api($field, 'paypal', 'checkout');
        $gateway = 'paypal';
    
        // loop
        acfe_setup_meta($acf, 'acfe/paypal_create', true);
        
            // args
            $args = apply_filters("acfe/fields/payment/create",                       $args, $field, $gateway, $post_id);
            $args = apply_filters("acfe/fields/payment/create/gateway={$gateway}",    $args, $field, $gateway, $post_id);
            $args = apply_filters("acfe/fields/payment/create/name={$field['name']}", $args, $field, $gateway, $post_id);
            $args = apply_filters("acfe/fields/payment/create/key={$field['key']}",   $args, $field, $gateway, $post_id);
            
            // defaults
            $amount = acf_maybe_get($args, 'amount', 0);
            $currency = acf_maybe_get($args, 'currency', 'USD');
            $description = acf_maybe_get($args, 'description');
            
            // check amount is not null
            if((int) $this->get_gateway_amount($amount, $currency, 'paypal') === 0){
                
                wp_send_json_error(array(
                    'error' => $this->errors['amount_null']
                ));
                
            }
        
            // unset incompatible args
            unset($args['amount']);
            unset($args['currency']);
            unset($args['description']);
    
            // https://developer.paypal.com/docs/nvp-soap-api/set-express-checkout-nvp/
            $args = wp_parse_args($args, array(
                'METHOD'                            => 'SetExpressCheckout',
                'USER'                              => $this->get_gateway_api($field, 'paypal', 'username'),
                'PWD'                               => $this->get_gateway_api($field, 'paypal', 'password'),
                'SIGNATURE'                         => $this->get_gateway_api($field, 'paypal', 'signature'),
                'PAYMENTREQUEST_0_AMT'              => $amount,
                'PAYMENTREQUEST_0_CURRENCYCODE'     => $currency,
                'PAYMENTREQUEST_0_DESC'             => $description,
                'VERSION'                           => 121,
                'RETURNURL'                         => '#',
                'CANCELURL'                         => '#',
                'PAYMENTREQUEST_0_PAYMENTACTION'    => 'Sale',
                'LANDINGPAGE'                       => 'Billing',
                'SOLUTIONTYPE'                      => 'Sole',
                'NOSHIPPING'                        => 1,
            ));
    
        // reset
        acfe_reset_meta();
        
        // validate amount
        $args['PAYMENTREQUEST_0_AMT'] = $this->get_gateway_amount($args['PAYMENTREQUEST_0_AMT'], $args['PAYMENTREQUEST_0_CURRENCYCODE'], 'paypal');
    
        // validate description
        $args['PAYMENTREQUEST_0_DESC'] = strlen($args['PAYMENTREQUEST_0_DESC']) > 127 ? substr($args['PAYMENTREQUEST_0_DESC'], 0, 124) . '...' : $args['PAYMENTREQUEST_0_DESC'];
        
        // response
        $response = $paypal->request($endpoint, $args);
        
        // success
        if(strtoupper($response['ACK']) === 'SUCCESS'){
            
            $return = array(
                'url' => $checkout_url . $response['TOKEN']
            );
            
            $return = apply_filters('acfe/fields/payment/create_success',                       $return, $response, $args, $field, $gateway, $post_id, $acf);
            $return = apply_filters("acfe/fields/payment/create_success/gateway={$gateway}",    $return, $response, $args, $field, $gateway, $post_id, $acf);
            $return = apply_filters("acfe/fields/payment/create_success/name={$field['name']}", $return, $response, $args, $field, $gateway, $post_id, $acf);
            $return = apply_filters("acfe/fields/payment/create_success/key={$field['key']}",   $return, $response, $args, $field, $gateway, $post_id, $acf);
            
            wp_send_json_success($return);
            
        }
        
        // error
        wp_send_json_error(array(
            'error' => $this->errors['payment_create']
        ));
        
    }
    
    
    /**
     * paypal_confirm
     */
    function paypal_confirm(){
    
        // validate
        if(!acf_verify_ajax()){
            die();
        }
    
        // retrieve vars
        $field_key = acf_maybe_get_POST('field_key', '');
        $post_id = acf_maybe_get_POST('post_id', 0);
        $acf = acf_maybe_get_POST('fields', array());
        $token = urlencode(acf_maybe_get_POST('token', ''));
        $payer_id = acf_maybe_get_POST('payer_id', '');
    
        // load field
        $field = acf_get_field($field_key);
    
        // field not found
        if(!$field){
            wp_send_json_error(array(
                'error' => $this->errors['field_not_found']
            ));
        }
        
        // include
        $this->include_paypal();
    
        // init
        $paypal = new ACFE_Paypal();
    
        // url
        $endpoint = $this->get_gateway_api($field, 'paypal', 'endpoint');
        
        // confirm
        $confirm = $paypal->confirm($endpoint, array(
            'username'  => $this->get_gateway_api($field, 'paypal', 'username'),
            'password'  => $this->get_gateway_api($field, 'paypal', 'password'),
            'signature' => $this->get_gateway_api($field, 'paypal', 'signature'),
            'token'     => $token,
            'payer_id'  => $payer_id,
        ));
        
        // success
        if(strtoupper($confirm['ACK']) === 'SUCCESS'){
            
            // get transaction id
            $id = $confirm['PAYMENTINFO_0_TRANSACTIONID'];
            
            // generate response
            $response = array(
                'id'        => $id,
                'gateway'   => 'paypal',
                'object'    => $confirm
            );
            
            // encrypt
            $response = $this->payment_confirm($response, $field, $post_id, $acf);
            $response = acf_encrypt(json_encode($response));
            
            // send
            wp_send_json_success(array(
                'response' => $response
            ));
            
        }
    
        // error
        wp_send_json_error(array(
            'error' => $this->errors['payment_confirm']
        ));
        
    }
    
    
    /**
     * payment_confirm
     *
     * @param $response
     * @param $field
     * @param $post_id
     * @param $acf
     *
     * @return mixed|null
     */
    function payment_confirm($response, $field, $post_id, $acf){
    
        // unset front-end honeypot
        // todo: _post_content and _post_title
        unset($acf['_validate_email']);
    
        // vars
        $id = acf_maybe_get($response, 'id');
        $gateway = acf_maybe_get($response, 'gateway');
        $object = acf_maybe_get($response, 'object');
    
        // reformat response
        $response = array();
        $response['id'] = $id;
        $response['gateway'] = $gateway;
        $response['amount'] = 0;
        $response['currency'] = 'USD';
        $response['items'] = array();
        $response['date'] = date_i18n('U');
        $response['ip'] = acfe_get_ip();
        $response['mode'] = $field['mode'];
        $response['object'] = $object;
    
        if($gateway === 'stripe'){
            
            // vars
            $amount = acf_maybe_get($object, 'amount', 0);
            $currency = strtoupper(acf_maybe_get($object, 'currency', 'USD'));
            
            // set
            $response['amount'] = $this->get_pretty_amount($amount, $currency, $gateway);
            $response['currency'] = $currency;
        
        }elseif($gateway === 'paypal'){
            
            // vars
            $amount = acf_maybe_get($object, 'PAYMENTINFO_0_AMT', 0);
            $currency = strtoupper(acf_maybe_get($object, 'PAYMENTINFO_0_CURRENCYCODE', 'USD'));
            
            // set
            $response['amount'] = $this->get_pretty_amount($amount, $currency, $gateway);
            $response['currency'] = $currency;
        
        }
        
        // loop
        acfe_setup_meta($acf, 'acfe/payment_success', true);
            
            // filters
            $response = apply_filters("acfe/fields/payment/object",                         $response, $field, $gateway, $post_id);
            $response = apply_filters("acfe/fields/payment/object/gateway={$gateway}",      $response, $field, $gateway, $post_id);
            $response = apply_filters("acfe/fields/payment/object/name={$field['name']}",   $response, $field, $gateway, $post_id);
            $response = apply_filters("acfe/fields/payment/object/key={$field['key']}",     $response, $field, $gateway, $post_id);
            
            // actions
            do_action("acfe/fields/payment/success",                                        $response, $field, $gateway, $post_id);
            do_action("acfe/fields/payment/success/gateway={$gateway}",                     $response, $field, $gateway, $post_id);
            do_action("acfe/fields/payment/success/name={$field['name']}",                  $response, $field, $gateway, $post_id);
            do_action("acfe/fields/payment/success/key={$field['key']}",                    $response, $field, $gateway, $post_id);
    
        // reset
        acfe_reset_meta();
        
        return $response;
        
    }
    
    
    /**
     * validate_value
     *
     * @param $valid
     * @param $value
     * @param $field
     * @param $input
     *
     * @return string|null
     */
    function validate_value($valid, $value, $field, $input){
        
        // ajax request
        if(acf_is_ajax()){
    
            // stripe: check value is invalid, return an error (even if not required)
            if($value === 'invalid'){
                return $this->errors['invalid_card'];
            }
            
            return $valid;
            
        }
        
        // php request
        // disallow default values: empty | invalid | valid | paypal
        // payment should be done by now and encrypted data should be set in $value
        if($field['required']){
            
            if(empty($value) || $value === 'invalid' || $value === 'valid' || $value === 'paypal'){
                return $this->errors['invalid_data'];
            }
            
        }
        
        return $valid;
        
    }
    
    
    /**
     * update_value
     *
     * @param $value
     * @param $post_id
     * @param $field
     *
     * @return false|null
     */
    function update_value($value, $post_id, $field){
    
        // do not save in admin
        if(is_admin() && !acf_is_ajax()){
            return null;
        }
        
        // update sub field value
        if($this->is_sub_field($field)){
            return $value;
        }
        
        // decode
        $value = @acf_decrypt(json_encode($value));
        $value = json_decode($value, true);
    
        // validate
        $value = $this->validate_payment_object($value);
        
        // clone
        $sub_field = $field;
    
        // loop sub fields
        foreach($this->sub_fields as $name){
            
            // assign new name "{group_payment}_{gateway}"
            $sub_field['name'] = "{$field['name']}_{$name}";
            $sub_value = acf_maybe_get($value, $name);
        
            // update sub field
            acf_update_value($sub_value, $post_id, $sub_field);
        
        }
        
        // save empty
        return false;
        
    }
    
    
    /**
     * load_value
     *
     * @param $value
     * @param $post_id
     * @param $field
     *
     * @return array
     */
    function load_value($value, $post_id, $field){
        
        // load sub field value
        if($this->is_sub_field($field)){
            return $value;
        }
    
        // clone
        $sub_field = $field;
        $values = array();
        
        // loop sub fields
        foreach($this->sub_fields as $name){
    
            // assign new name "{group_payment}_{gateway}"
            $sub_field['name'] = "{$field['name']}_{$name}";
            $sub_value = acf_get_value($post_id, $sub_field);
            
            if($sub_value !== null){
                $values[ $name ] = $sub_value;
            }
        
        }
        
        // return array with sub fields values
        if(!empty($values)){
            return $values;
        }
        
        // return
        return $value;
        
    }
    
    
    /**
     * is_payment_object
     *
     * @param $value
     *
     * @return bool
     */
    function is_payment_object($value = array()){
        
        // failed decrypt
        if(!$value || !is_array($value)){
            return false;
        }
        
        // loop sub fields
        foreach($this->sub_fields as $sub_field){
            
            // sub field name found in array
            if(isset($value[ $sub_field ])) continue;
            
            // sub field not found
            return false;
            
        }
        
        // valid
        return true;
        
    }
    
    
    /**
     * validate_payment_object
     *
     * @param $value
     *
     * @return array
     */
    function validate_payment_object($value){
        
        // force array
        $value = acf_get_array($value);
        
        // defaults
        $value = wp_parse_args($value, array(
            'id'        => '',
            'gateway'   => 'stripe',
            'url'       => '',
            'amount'    => 0.00,
            'currency'  => 'USD',
            'symbol'    => '$',
            'items'     => array(),
            'date'      => date_i18n('U'),
            'ip'        => acfe_get_ip(),
            'mode'      => 'test',
            'object'    => array()
        ));
        
        // currency symbol
        $value['symbol'] = acfe_get_currency($value['currency'], 'symbol');
        
        // stripe url
        if($value['gateway'] === 'stripe'){
            
            $value['url'] = "https://dashboard.stripe.com/payments/{$value['id']}";
            
            if($value['mode'] === 'test'){
                $value['url'] = "https://dashboard.stripe.com/test/payments/{$value['id']}";
            }
            
        // paypal url
        }elseif($value['gateway'] === 'paypal'){
            
            $value['url'] = "https://www.paypal.com/activity/payment/{$value['id']}";
            
            if($value['mode'] === 'test'){
                $value['url'] = "https://www.sandbox.paypal.com/activity/payment/{$value['id']}";
            }
            
        }
        
        // items
        $value['items'] = acf_get_array($value['items']);
        
        // force sequential array on associative array
        if(acf_is_associative_array($value['items'])){
            $value['items'] = array($value['items']);
        }
    
        $items = array();
    
        $i = 0;
        foreach($value['items'] as $row){
        
            $items[ $i ] = array();
            $items[ $i ]['item'] = '';
            
            if(is_array($row)){
                $items[ $i ] = $row;
            }elseif(is_string($row)){
                $items[ $i ]['item'] = $row;
            }
        
            if(!isset($items[ $i ]['item'])){
                $items[ $i ]['item'] = implode(' ', $row);
            }
        
            $i++;
        
        }
    
        $value['items'] = $items;
        
        // return
        return $value;
        
    }
    
    
    /**
     * format_value
     *
     * @param $value
     * @param $post_id
     * @param $field
     *
     * @return mixed|string|null
     */
    function format_value($value, $post_id, $field){
        
        // empty
        if(empty($value)){
            return $value;
        }
        
        // format sub field value
        if($sub_field = $this->is_sub_field($field)){
            return $this->format_single_value($value, $post_id, $field, $sub_field);
        }
        
        // apply default value
        $value = $this->validate_payment_object($value);
        
        // format parent field
        foreach($this->sub_fields as $sub_field){
            
            if(isset($value[ $sub_field ])){
                $value[ $sub_field ] = $this->format_single_value($value[ $sub_field ], $post_id, $field, $sub_field);
            }
            
            
        }
        
        // return
        return $value;
        
    }
    
    
    /**
     * format_single_value
     *
     * @param $value
     * @param $post_id
     * @param $field
     * @param $sub_field
     *
     * @return mixed|string|null
     */
    function format_single_value($value, $post_id, $field, $sub_field){
        
        // gateway
        if($sub_field === 'gateway'){
            
            if($value === 'stripe') $value = 'Stripe';
            if($value === 'paypal') $value = 'PayPal';
    
        // mode
        }elseif($sub_field === 'mode'){
    
            if($value === 'test') $value = __('Test', 'acfe');
            if($value === 'prod') $value = __('Production', 'acfe');
            
        // date
        }elseif($sub_field === 'date'){
    
            $value = date_i18n('d/m/Y H:i:s', $value);
    
        }
        
        return $value;
        
    }
    
    
    /**
     * form_format_value
     *
     * @param $value
     * @param $unformatted
     * @param $post_id
     * @param $field
     *
     * @return false|string
     */
    function form_format_value($value, $unformatted, $post_id, $field){
        
        if(empty($value)){
            return $value;
        }
        
        ob_start();
    
        ?>
        <?php _e('Gateway', 'acfe'); ?>: <?php echo $value['gateway']; ?><?php echo $value['mode'] === __('Test', 'acfe') ? " ({$value['mode']})" : ''; ?><br/>
        <?php _e('Amount', 'acfe'); ?>: <?php echo $value['symbol'].$value['amount']; ?><br/>
        <?php if($value['items'] && is_array($value['items'])): ?>
            <?php _e('Items', 'acfe'); ?>: <?php echo implode(', ', wp_list_pluck($value['items'], 'item')); ?><br/>
        <?php endif; ?>
        <?php _e('Date', 'acfe'); ?>: <?php echo $value['date']; ?><br/>
        <?php _e('IP Address', 'acfe'); ?>: <a href="https://ipinfo.io/<?php echo $value['ip']; ?>" target="_blank"><?php echo $value['ip']; ?></a><br/>
        <?php _e('Payment ID', 'acfe'); ?>: <a href="<?php echo esc_url($value['url']); ?>" target="_blank"><?php echo $value['id']; ?></a>
        <?php
        
        return ob_get_clean();
        
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
    
        // clone
        $sub_field = $field;
    
        // loop sub fields
        foreach($this->sub_fields as $name){
        
            // assign new name "{group_payment}_{gateway}"
            $sub_field['name'] = "{$field['name']}_{$name}";
            
            // delete
            acf_delete_value($post_id, $sub_field);
        
        }
        
    }
    
    
    /**
     * include_stripe
     *
     * @param $field
     */
    function include_stripe($field){
        
        // Lib
        acfe_include('pro/includes/libraries/stripe/init.php');
        
        // API Key
        \Stripe\Stripe::setApiKey($this->get_gateway_api($field, 'stripe', 'secret_key'));
        
    }
    
    
    /**
     * include_paypal
     */
    function include_paypal(){
        
        // Lib
        acfe_include('pro/includes/libraries/paypal/paypal-express.php');
        
    }
    
    
    /**
     * has_gateway
     *
     * @param $field
     * @param $gateway
     * @param $only
     *
     * @return bool
     */
    function has_gateway($field, $gateway, $only = false){
        
        // check if only have that gateway
        $condition = !$only || count($field['gateways']) === 1;
        
        // return
        return in_array($gateway, $field['gateways']) && $condition;
        
    }
    
    
    /**
     * get_gateway_api
     *
     * @param $field
     * @param $gateway
     * @param $name
     *
     * @return mixed|string|null
     */
    function get_gateway_api($field, $gateway, $name){
        
        // paypal endpoint
        if($gateway === 'paypal' && $name === 'endpoint'){
            
            return $field['mode'] === 'test' ? 'https://api-3t.sandbox.paypal.com/nvp' : 'https://api-3t.paypal.com/nvp';
            
        // paypal checkout
        }elseif($gateway === 'paypal' && $name === 'checkout'){
            
            return $field['mode'] === 'test' ? 'https://www.sandbox.paypal.com/checkoutnow?token=' : 'https://www.paypal.com/checkoutnow?token=';
            
        }
        
        // prefix
        $prefix = $field['mode'] === 'test' ? 'test_' : '';
        
        // return
        return acf_maybe_get($field, "{$gateway}_{$prefix}{$name}", '');
        
    }
    
    
    /**
     * get_gateway_amount
     *
     * @param $amount
     * @param $currency
     * @param $gateway
     *
     * @return float|mixed|string
     */
    function get_gateway_amount($amount, $currency, $gateway){
        
        // stripe
        if($gateway === 'stripe'){
    
            // check currency zero decimal
            if(!$this->is_zero_decimal($currency)){
                $amount = round($amount * 100, 0);
            }
            
        // paypal
        }elseif($gateway === 'paypal'){
    
            $amount = number_format($amount, 2, '.', '' );
            
        }
        
        return $amount;
        
    }
    
    
    /**
     * get_pretty_amount
     *
     * @param $amount
     * @param $currency
     * @param $gateway
     *
     * @return string
     */
    function get_pretty_amount($amount, $currency, $gateway){
        
        if($gateway === 'stripe' && !$this->is_zero_decimal($currency)){
            $amount = $amount / 100;
        }
        
        return number_format((float) $amount, 2, '.', '');
        
    }
    
    
    /**
     * is_zero_decimal
     *
     * @param $currency
     *
     * @return bool
     */
    function is_zero_decimal($currency){
        
        return in_array($currency, array('BIF', 'CLP', 'DJF', 'GNF', 'JPY', 'KMF', 'KRW', 'MGA', 'PYG', 'RWF', 'VND', 'VUV', 'XAF', 'XOF', 'XPF'));
        
    }
    
    
    /**
     * is_sub_field
     *
     * @param $field
     *
     * @return false|mixed
     */
    function is_sub_field($field){
        
        // try to retrieve real field name
        $_name = acf_maybe_get($field, '_name');
        
        // loop sub fields
        foreach($this->sub_fields as $sub_field){
            
            // ends with "{my_field}_{sub_field}"
            if(acfe_ends_with($field['name'], "{$_name}_{$sub_field}")){
                return $sub_field;
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
        
        $field['button_value'] = acf_translate($field['button_value']);
        $field['button_paypal'] = acf_translate($field['button_paypal']);
        
        return $field;
        
    }
    
}

// initialize
acf_register_field_type('acfe_payment');

endif;