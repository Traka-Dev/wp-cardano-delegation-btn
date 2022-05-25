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

add_action('admin_enqueue_scripts', 'load_admin_scripts');
add_action('wp_enqueue_scripts', 'load_scripts');
function load_admin_scripts()
{
    wp_enqueue_script('wp-TRKDBTN', WPTRKDBTN_URL . 'dist/adminApp.js', ['jquery', 'wp-element'], wp_rand(), true);
    wp_localize_script('wp-TRKDBTN', 'appLocalizer', [
        'apiUrl' => home_url('/wp-json'),
        'nonce' => wp_create_nonce('wp_rest'),
    ]);
    wp_register_style('toast_styles', WPTRKDBTN_URL . 'dist/adminApp.css');
    wp_enqueue_style('toast_styles'); 
}

function load_scripts()
{
    wp_enqueue_script('wp-TRKDBTN', WPTRKDBTN_URL . 'dist/app.js', ['jquery', 'wp-element'], wp_rand(), true);
    wp_localize_script('wp-TRKDBTN', 'appLocalizer', [
        'apiUrl' => home_url('/wp-json'),
        'nonce' => wp_create_nonce('wp_rest'),
    ]);
    wp_register_style('toast_styles', WPTRKDBTN_URL . 'css/app.css');
    wp_enqueue_style('toast_styles');
}

require_once WPTRKDBTN_PATH . 'classes/class-create-admin-menu.php';
require_once WPTRKDBTN_PATH . 'classes/class-create-settings-routes.php';
require_once WPTRKDBTN_PATH . 'classes/class-create-delegation-cardano-btn.php';

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
