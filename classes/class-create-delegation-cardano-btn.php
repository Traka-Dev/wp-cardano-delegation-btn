<?php

/**
 * Delegation Cardano Btn Shortcode
 */
class WP_React_Delegation_Cardano_Btn
{
    public function __construct()
    {
        add_filter('script_loader_tag', [$this, 'TRKDBTN_add_async_defer_attributes'], 10, 2);
    }

    static function TRKDBTN_delegation_cardano_btn()
    {
        return '<script type="application/javascript">
            window.resourceBasePath = "' . WPTRKDBTN_URL . '";
        </script>
        <div class=wrap>
            <div id="wptrkdbtn-app"></div>
        </div>';
    }

    public function TRKDBTN_add_async_defer_attributes($tag, $handle)
    {
        // Busco el valor "async"
        if (strpos($handle, "async")) :
            $tag = str_replace(' src', ' async="async" src', $tag);
        endif;
        // Busco el valor "defer"
        if (strpos($handle, "defer")) :
            $tag = str_replace(' src', ' defer="defer" type="module" src', $tag);
        endif;
        if ($handle === "wp-TRKDBTN-app") :
            $tag = str_replace(' src', ' defer="defer" type="module" src', $tag);
        endif;
        return $tag;
    }
}

new WP_React_Delegation_Cardano_Btn();
add_shortcode('delegation_cardano_btn', ['WP_React_Delegation_Cardano_Btn', 'TRKDBTN_delegation_cardano_btn']);
