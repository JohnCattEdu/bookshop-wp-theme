<?php

namespace App\Utils;

use Timber\Timber as RealTimber;

class Timber
{
    public static function __callStatic($method, $args)
    {
        $method = Str::snake($method);
        $result = RealTimber::$method(...$args);

        if (is_array($result)) {
            return new Collection($result);
        }

        return $result;
    }
}
