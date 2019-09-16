<?php

namespace App\Views;

use App\Utils\Str;
use Timber\Timber;

class View
{
    protected $name;

    protected $withs;

    public function __construct(string $name)
    {
        $this->name = $name;
        $this->withs = Timber::context();
    }

    public function render()
    {
        Timber::render($this->name, $this->withs);
    }

    public function with(array $withs)
    {
        $this->withs = array_merge($this->withs, $withs);

        return $this;
    }

    public function __call(string $method, array $args)
    {
        if (Str::startsWith($method, 'with')) {
            $name = Str::camel(substr($method, 4));

            return $this->with([$name => $args[0]]);
        }
    }
}
