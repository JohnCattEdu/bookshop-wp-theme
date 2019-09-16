<?php

namespace App\Controllers;

use App\Application;
use App\Views\View;

abstract class Controller
{
    /**
     * The application instance.
     *
     * @var Application
     */
    protected $app;

    public function __construct(Application $app)
    {
        $this->app = $app;
    }

    abstract public function handle(): View;
}
