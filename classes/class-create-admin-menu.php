<?php

/**
 *  create admin menu 
 */

class WPTRKDBTN_Create_Admin_Page
{

    public function __construct()
    {
        add_action('admin_menu', [$this, 'create_admin_menu']);
    }

    public function create_admin_menu()
    {
        $capability = 'manage_options';
        $slug = 'wptrkdbtn-settings';

        add_menu_page(
            __('WP Delegate ADA', 'wp-trkdbtn-plugin'),
            __('WP Delegate ADA', 'wp-trkdbtn-plugin'),
            $capability,
            $slug,
            [$this, 'menu_page_template'],
            'dashicons-admin-network'
        );
    }

    public function menu_page_template()
    {
        echo '<div class=wrap><div id="wptrkdbtn-admin-app"></div></div>';
    }
}

new WPTRKDBTN_Create_Admin_Page();
