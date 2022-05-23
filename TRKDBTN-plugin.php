<?php
/*
 * Plugin Name: Cardano Delegation BTN
 * Plugin URI: https://github.com/trakadev/
 * Description: Add Deleagete ada button to your pool
 * Author: TrakaDev
 * Author URI: https://trakdev.com/
 * Text Domain: delegate-ada-pool-plugin
 * Domain Path: /languages
 * Version: 1.0.0
 * Requires PHP: 7.3
 * License: MIT
 * License URI: https://github.com/trakadev
 */

// If this file is access directly, abort!!!
defined('ABSPATH') or die('Unauthorized Access');

/**
 * Plugin Constants
 */

define('WPTRKDBTN_PATH', trailingslashit(plugin_dir_path(__FILE__)));
define('WPTRKDBTN_URL', trailingslashit(plugins_url('/', __FILE__)));

/**
 * Loading Scripts
 */

add_action('admin_enqueue_scripts', 'load_scripts');
function load_scripts()
{
    wp_enqueue_script('wp-TRKDBTN', WPTRKDBTN_URL . 'fist/bundle.js', ['jquery', 'wp-element'], wp_rand(), true);
    wp_localize_script('wp-TRKDBTN', 'appLocalizer', [
        'apiUrl' => home_url('/wp-json'),
        'nonce' => wp_create_nonce('wp_rest'),
    ]);
}

require_once WPTRKDBTN_PATH . 'classes/class-create-admin-menu.php';

/*
register_activation_hook(__FILE__, 'TRKDBTN_plugin_activate');
register_deactivation_hook(__FILE__, 'TRKDBTN_plugin_deactivate');
add_filter('script_loader_tag', 'TRKDBTN_add_async_defer_attributes', 10, 2);
add_shortcode('delegate_cardano_btn', 'TRKDBTN_plugin_delegate_cardano_btn');

function TRKDBTN_plugin_delegate_cardano_btn()
{
    return TRKDBTN_plugin_cardano_btn();
}
function TRKDBTN_plugin_deactivate()
{
    return;
}
function TRKDBTN_plugin_activate()
{
    return;
}



# Activate Logs
if (!function_exists('write_log')) {
    function write_log($log)
    {
        if (true === WP_DEBUG) {
            if (is_array($log) || is_object($log)) {
                error_log(print_r($log, true));
            } else {
                error_log($log);
            }
        }
    }
}
*/