<?php

use App\Views\View;

if (!function_exists('view')) {
    function view(string $name): View
    {
        $name = str_replace('.', '/', $name);

        return new View("$name.twig");
    }
}

if (!function_exists('timberSetProduct')) {
    function timberSetProduct($post)
    {
        global $product;

        if (is_woocommerce() || is_front_page()) {
            $product = wc_get_product($post->ID);
        }
    }
}
