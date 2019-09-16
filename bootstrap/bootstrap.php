<?php

// Autoload from composer
require_once __DIR__ . '/../vendor/autoload.php';

// Use the bootstrapper
$app = require_once __DIR__ . '/app.php';

$path = explode('/', $path);
$path = str_replace('.php', '', end($path));

$app->handle($path);
