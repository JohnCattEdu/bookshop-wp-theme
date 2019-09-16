<?php

namespace App\Utils;

use App\Utils\Concerns\IsCollection;
use ArrayAccess;

class Collection implements ArrayAccess
{
    use IsCollection;

    public function all()
    {
        return $this->items;
    }

    public function map(callable $callback)
    {
        $keys = array_keys($this->items);
        $items = array_map($callback, $this->items, $keys);

        return new static(array_combine($keys, $items));
    }
}
