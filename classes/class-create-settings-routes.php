<?php

/**
 * Custom Rest API End Potins
 */
class WP_React_Settings_Rest_Route
{
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {
        # GET get_delegation_btn_params
        register_rest_route('wptrkdbtn/v1', '/settings', [
            'methods' => 'GET',
            'callback' => [$this, 'get_settings'],
            'permission_callback' => [$this, 'get_settings_permission']
        ]);
        register_rest_route('wptrkdbtn/v1', '/btn-params', [
            'methods' => 'GET',
            'callback' => [$this, 'get_delegation_btn_params'],
            'permission_callback' => [$this, 'get_settings_permission']
        ]);
        # POST
        register_rest_route('wptrkdbtn/v1', '/settings', [
            'methods' => 'POST',
            'callback' => [$this, 'save_settings'],
            'permission_callback' => [$this, 'save_settings_permission']
        ]);
    }

    /**
     * It gets the settings from the database and returns them as a response
     * 
     * @return The response is an array of the plugin options.
     */
    public function get_settings()
    {
        # pool1aqg6fvhcaulvss2ruvpx6ur9vj7pejvdcxv6xp0qlwuwx94evf0 Sarga
        # Plugin Options
        /**
         * network 1 for mainnet 0 for testnet
         */
        $poolId        = get_option('wptrkdbtn_settings_poolId');
        $network       = get_option('wptrkdbtn_settings_network');
        $testnetApikey = get_option('wptrkdbtn_settings_testnetApiKey');
        $mainnetApiKey = get_option('wptrkdbtn_settings_mainnetApiKey');

        $response = [
            'poolId'        => $poolId,
            'network'       => $network,
            'testnetApiKey' => $testnetApikey,
            'mainnetApiKey' => $mainnetApiKey
        ];

        return rest_ensure_response($response);
    }

    public function get_settings_permission()
    {
        return true;
    }

    /**
     * It returns the poolId, network, and apiKey from the Wordpress database
     * 
     * @return The response is an array of the poolId, network, and apiKey.
     */
    public function get_delegation_btn_params()
    {
        $poolId  = get_option('wptrkdbtn_settings_poolId');
        $network = get_option('wptrkdbtn_settings_network');
        $apiKey  = (int)$network === 1 ?
            get_option('wptrkdbtn_settings_mainnetApiKey') :
            get_option('wptrkdbtn_settings_testnetApiKey');

        $response = [
            'poolId'  => $poolId,
            'network' => $network,
            'apiKey'  => $apiKey
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
