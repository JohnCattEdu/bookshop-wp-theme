<?php

namespace App\Controllers;

use App\Utils\Str;
use App\Views\View;
use App\Utils\Timber;

class WooCommerce extends Controller
{

    public function handle(): View
    {
        if (is_singular('product')) {
            dd('SINGULAR PAGE NEEDED');
            return view('index');
        } else if (is_product_category()) {
            return $this->category();
        }
    }

    protected function category(): View
    {
        $products = Timber::getPosts()->map(function ($product) {
            dd($product);
            dd(wc_get_price_to_display($product));
        });

        dd(array_filter(get_defined_functions()['user'], function ($item) {
            return Str::startsWith($item, 'wc') || Str::startsWith($item, 'woo');
        }));

        return view('woo.category')
            ->withProducts(Timber::get_posts());
    }
}
