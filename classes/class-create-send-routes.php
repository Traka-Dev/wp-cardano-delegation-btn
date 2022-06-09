<?php

/**
 * Custom Rest API End Potins
 */
class WP_React_Send_Rest_Route
{
    public function __construct()
    {
        add_action('rest_send_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {
        # GET get_delegation_btn_params
        register_rest_route('wptrkdbtn/v1', '/send_settings', [
            'methods' => 'GET',
            'callback' => [$this, 'get_settings'],
            'permission_callback' => [$this, 'get_settings_permission']
        ]);
        register_rest_route('wptrkdbtn/v1', '/send-params', [
            'methods' => 'GET',
            'callback' => [$this, 'get_send_btn_params'],
            'permission_callback' => [$this, 'get_settings_permission']
        ]);
        # POST
        register_rest_route('wptrkdbtn/v1', '/send_settings', [
            'methods' => 'POST',
            'callback' => [$this, 'save_settings'],
            'permission_callback' => [$this, 'save_settings_permission']
        ]);
    }

    public function get_settings()
    {
        # Plugin Options
        /**
         * network 1 for mainnet 0 for testnet
         */
        $paymentAddress = get_option('wptrkdbtn_settings_send_paymentAddress');
        $network        = get_option('wptrkdbtn_settings_send_network');
        $testnetApikey  = get_option('wptrkdbtn_settings_send_testnetApiKey');
        $mainnetApiKey  = get_option('wptrkdbtn_settings_send_mainnetApiKey');

        $response = [
            'paymentAddress' => $paymentAddress,
            'network'        => $network,
            'testnetApiKey'  => $testnetApikey,
            'mainnetApiKey'  => $mainnetApiKey
        ];

        return rest_ensure_response($response);
    }

    public function get_settings_permission()
    {
        return true;
    }

    public function get_send_btn_params()
    {
        $paymentAddress  = get_option('wptrkdbtn_settings_send_paymentAddress');
        $network = get_option('wptrkdbtn_settings_send_network');
        $apiKey  = (int)$network === 1 ?
            get_option('wptrkdbtn_settings_send_mainnetApiKey') :
            get_option('wptrkdbtn_settings_send_testnetApiKey');

        $response = [
            'paymentAddress'  => $paymentAddress,
            'network'         => $network,
            'apiKey'          => $apiKey
        ];

        return rest_ensure_response($response);
    }


    /* A function that validates the settings. */
    static function validate_settings($poolId, $network, $testnetApiKey, $mainnetApiKey)
    {
        if (strlen($poolId) < 10) {
            return false;
        }

        if (strlen($mainnetApiKey) < 10) {
            return false;
        }

        if (strlen($testnetApiKey) < 10) {
            return false;
        }

        if (!($network == 1 || $network == 0)) {
            return false;
        }

        return true;
    }

    /**
     * It takes in 4 variables, sanitizes them, and then saves them to the database.
     * 
     * @param req The request object.
     * 
     * @return String success or fail.
     */
    public function save_settings($req)
    {
        $poolId        = sanitize_text_field($req['poolId']);
        $network       = sanitize_text_field($req['network']);
        $testnetApiKey = sanitize_text_field($req['testnetApiKey']);
        $mainnetApiKey = sanitize_text_field($req['mainnetApiKey']);
        if (SELF::validate_settings($poolId, $network, $testnetApiKey, $mainnetApiKey)) {
            update_option('wptrkdbtn_settings_poolId', $poolId);
            update_option('wptrkdbtn_settings_network', $network);
            update_option('wptrkdbtn_settings_testnetApiKey', $testnetApiKey);
            update_option('wptrkdbtn_settings_mainnetApiKey', $mainnetApiKey);
            return rest_ensure_response('success');
        } else {
            return rest_ensure_response('fail');
        }
    }

    public function save_settings_permission()
    {
        return current_user_can('manage_options');
    }
}

new WP_React_Settings_Rest_Route();
