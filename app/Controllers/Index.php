<?php

namespace App\Controllers;

use App\Views\View;
use Timber\Timber;

class Index extends Controller
{
    public function handle(): View
    {
        return view('index')
            ->withPosts(Timber::get_posts());
    }
}
