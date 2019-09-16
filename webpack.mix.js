const mix = require('laravel-mix');
const tailwind = require('tailwindcss');
const cssImport = require('postcss-import');
const cssNested = require('postcss-nested');

mix
    .postCss('assets/css/style.pcss', 'lib/css', [
        cssImport(),
        tailwind(),
        cssNested(),
    ])
    .js('assets/js/preload.js', 'lib/js')
    .js('assets/js/app.js', 'lib/js')
    .copyDirectory('assets/img', 'lib/img')
