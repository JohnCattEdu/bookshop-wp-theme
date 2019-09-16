<?php

namespace App;

use App\Controllers\Controller;
use Exception;

class EntryHandler
{
    /**
     * The application instance.
     *
     * @var Application
     */
    protected $app;

    /**
     * All the registered handlers.
     *
     * @var array
     */
    protected $handlers = [];

    /**
     * Constructs the class.
     *
     * @param Application $app
     */
    public function __construct(Application $app)
    {
        $this->app = $app;

        require_once __DIR__ . '/routes.php';
    }

    /**
     * Determines if a handler exists for the given string.
     *
     * @param string $name
     * @return boolean
     */
    public function hasHandler(string $name): bool
    {
        return array_key_exists($name, $this->handlers);
    }

    /**
     * Gets the controller for the specified handler.
     *
     * @param string $name
     * @return Controller
     */
    protected function getHandler(string $name): Controller
    {
        $class = $this->handlers[$name];

        return new $class($this->app);
    }

    /**
     * Registers a new handler.
     *
     * @param string $name
     * @param string $controller
     * @return self
     */
    protected function register(string $name, string $controller): self
    {
        $this->handlers[$name] = $controller;

        return $this;
    }

    /**
     * Attempts to handle the specified name.
     *
     * @param string $name
     * @return Controller
     */
    public function handle(string $name): Controller
    {
        if ($this->hasHandler($name)) {
            return $this->getHandler($name);
        }

        throw new Exception("Invalid handler '$name' supplied.");
    }
}
