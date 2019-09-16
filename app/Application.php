<?php

namespace App;

use App\Views\View;
use DI\Container;

class Application
{
    /**
     * The entry handler instance.
     *
     * @var EntryHandler
     */
    protected $handler;

    public function __construct()
    {
        $this->handler = new EntryHandler($this);
    }

    public function getView(string $name): View
    {
        return new View("$name.twig");
    }

    public function handle(string $name)
    {
        $controller = $this->handler->handle($name);
        $view = $controller->handle();

        $view->render();
    }
}
