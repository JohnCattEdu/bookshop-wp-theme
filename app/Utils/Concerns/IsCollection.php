<?php

namespace App\Utils\Concerns;

use Exception;
use Traversable;

trait IsCollection
{
    protected $items;

    public function __construct($items = [])
    {
        $this->items = $this->getArrayableItems($items);
    }

    public function offsetSet($key, $value)
    {
        if (is_null($key)) {
            $this->items[] = $value;
        } else {
            $this->items[$key] = $value;
        }
    }

    public function offsetExists($key)
    {
        return array_key_exists($key, $this->items);
    }

    public function offsetGet($key)
    {
        return $this->items[$key];
    }

    public function offsetUnset($key)
    {
        unset($this->items[$key]);
    }

    protected function getArrayableItems($items)
    {
        if (is_array($items)) {
            return $items;
        } elseif ($items instanceof self) {
            return $items->all();
        } else {
            $type = gettype($items);
            $type = $type === 'object' ? get_class($items) : $type;

            throw new Exception("Unhandled type '$type' passed to Collection.");
        }
    }
}
