<?php

/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

use Timber\Timber;
use Timber\Site;
use Timber\Menu;
use Twig\Environment as Twig;
use App\Globals\Images;
use App\Globals\Scripts;
use App\Globals\Styles;

require_once __DIR__ . '/vendor/autoload.php';
$timber = new Timber();

/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class BookshopSite extends Site
{
    /** Add timber support. */
    public function __construct()
    {
        add_action('after_setup_theme', [$this, 'themeSupports']);
        add_filter('timber/context', [$this, 'addToContext']);
        add_filter('timber/twig', [$this, 'addToTwig']);
        add_action('init', [$this, 'registerPostTypes']);
        add_action('init', [$this, 'registerTaxonomies']);
        add_action('wp_enqueue_scripts', [$this, 'initAssets']);

        parent::__construct();
    }
    /** This is where you can register custom post types. */
    public function registerPostTypes()
    { }

    /** This is where you can register custom taxonomies. */
    public function registerTaxonomies()
    { }

    /** This is where you add some context
     *
     * @param string $context context['this'] Being the Twig's {{ this }}.
     */
    public function addToContext($context)
    {
        $context['menu'] = new Menu();
        $context['site'] = $this;

        return $context;
    }

    public function themeSupports()
    {
        add_theme_support('automatic-feed-links');
        add_theme_support('title-tag');
        add_theme_support('post-thumbnails');
        add_theme_support('html5', [
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
        ]);
        add_theme_support('post-formats', [
            'aside',
            'image',
            'video',
            'quote',
            'link',
            'gallery',
            'audio',
        ]);
        add_theme_support('menus');
        add_theme_support('woocommerce');
    }

    /** This is where you can add your own functions to twig.
     *
     * @param string $twig get extension.
     */
    public function addToTwig(Twig $twig)
    {
        $twig->addExtension(new Twig_Extension_StringLoader());
        $twig->addGlobal('images', new Images);

        return $twig;
    }

    public function initAssets()
    {
        foreach (Scripts::all() as $key => $path) {
            wp_enqueue_script($key, $path);
        }

        foreach (Styles::all() as $key => $path) {
            wp_enqueue_style($key, $path);
        }
    }
}

new BookshopSite();
