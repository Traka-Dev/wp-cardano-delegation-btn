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
        # GET
        register_rest_route('wptrkdbtn/v1', '/settings', [
            'methods' => 'GET',
            'callback' => [$this, 'get_settings'],
            'permission_callback' => [$this, 'get_settings_permission']
        ]);
        register_rest_route('wptrkdbtn/v1', '/poolId', [
            'methods' => 'GET',
            'callback' => [$this, 'get_poolId'],
            'permission_callback' => [$this, 'get_settings_permission']
        ]);
        # POST
        register_rest_route('wptrkdbtn/v1', '/settings', [
            'methods' => 'POST',
            'callback' => [$this, 'save_settings'],
            'permission_callback' => [$this, 'save_settings_permission']
        ]);
    }

    public function get_settings()
    {
        # 'pool1aqg6fvhcaulvss2ruvpx6ur9vj7pejvdcxv6xp0qlwuwx94evf0' sarga
        $poolId = get_option('wptrkdbtn_settings_poolId');

        $response = [
            'poolId' => $poolId,
        ];

        return rest_ensure_response($response);
    }

    public function get_settings_permission()
    {
        return true;
    }

    public function get_poolId()
    {
        $poolId = get_option('wptrkdbtn_settings_poolId');

        $response = [
            'poolId' => $poolId,
        ];

        return rest_ensure_response($response);
    }

    public function save_settings($req)
    {
        $poolId = sanitize_text_field($req['poolId']);

        update_option('wptrkdbtn_settings_poolId', $poolId);

        return rest_ensure_response('success');
    }

    public function save_settings_permission()
    {
        return current_user_can('manage_options');
    }
}

new WP_React_Settings_Rest_Route();
