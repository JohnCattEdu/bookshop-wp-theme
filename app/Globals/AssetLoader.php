<?php

namespace App\Globals;

use Exception;

abstract class AssetLoader
{
    protected $assets = [];

    protected $generated = [];

    public function __construct()
    {
        foreach ($this->assets as $key => $value) {
            $this->generated[$key] = $this->getPath($value);
        }
    }

    protected function getPath(string $path): string
    {
        return get_template_directory_uri() . '/lib' . $path;
    }

    public static function __callStatic($method, $args)
    {
        $instance = new self;

        if (property_exists($instance, $method)) {
            return $instance->$method;
        }

        throw new Exception("Undefined static method '$method'.");
    }

    public function __get($key)
    {
        if (array_key_exists($key, $this->generated)) {
            return $this->generated[$key];
        }
    }

    public function __isset($key)
    {
        return array_key_exists($key, $this->generated);
    }

    public static function all(): array
    {
        return (new static)->generated;
    }
}
