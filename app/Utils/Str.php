<?php

namespace App\Utils;

class Str
{
    public static function startsWith(string $haystack, string $needle): bool
    {
        return substr($haystack, 0, strlen($needle)) == $needle;
    }

    public static function camel(string $value): string
    {
        return lcfirst(static::studly($value));
    }

    public static function studly(string $value): string
    {
        $value = ucwords(str_replace(['-', '_'], ' ', $value));

        return str_replace(' ', '', $value);
    }

    public static function lower($value)
    {
        return mb_strtolower($value, 'UTF-8');
    }

    public static function snake($value, $delimiter = '_')
    {
        if (!ctype_lower($value)) {
            $value = preg_replace('/\s+/u', '', ucwords($value));

            $value = static::lower(preg_replace('/(.)(?=[A-Z])/u', '$1' . $delimiter, $value));
        }

        return $value;
    }
}
