<?php
/**
 * Custom WordPress file to bypass Really Simple Security
 * Upload this to your WordPress root directory
 * Access via: https://store.neilsonhayslibrary.org/custom-products-endpoint.php
 */

// Load WordPress
require_once('wp-load.php');

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Check if WooCommerce is active
if (!class_exists('WooCommerce')) {
    http_response_code(500);
    echo json_encode(['error' => 'WooCommerce not found']);
    exit;
}

// Simple authentication check (optional)
$expected_key = get_option('woocommerce_api_consumer_key', '');
$provided_key = $_GET['key'] ?? '';

if ($expected_key && $provided_key !== $expected_key) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid key']);
    exit;
}

try {
    // Get products using WooCommerce functions directly
    $args = [
        'post_type' => 'product',
        'post_status' => 'publish',
        'posts_per_page' => intval($_GET['per_page'] ?? 20),
        'paged' => intval($_GET['page'] ?? 1),
        'meta_query' => [
            [
                'key' => '_visibility',
                'value' => ['hidden', 'search'],
                'compare' => 'NOT IN'
            ]
        ]
    ];

    $query = new WP_Query($args);
    $products = [];

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $product = wc_get_product(get_the_ID());
            
            if ($product) {
                $products[] = [
                    'id' => $product->get_id(),
                    'name' => $product->get_name(),
                    'slug' => $product->get_slug(),
                    'price' => $product->get_price(),
                    'regular_price' => $product->get_regular_price(),
                    'sale_price' => $product->get_sale_price(),
                    'on_sale' => $product->is_on_sale(),
                    'status' => $product->get_status(),
                    'stock_status' => $product->get_stock_status(),
                    'description' => $product->get_description(),
                    'short_description' => $product->get_short_description(),
                    'images' => array_map(function($image_id) {
                        return [
                            'id' => $image_id,
                            'src' => wp_get_attachment_url($image_id),
                            'alt' => get_post_meta($image_id, '_wp_attachment_image_alt', true)
                        ];
                    }, $product->get_gallery_image_ids()),
                    'categories' => array_map(function($term) {
                        return [
                            'id' => $term->term_id,
                            'name' => $term->name,
                            'slug' => $term->slug
                        ];
                    }, get_the_terms(get_the_ID(), 'product_cat') ?: [])
                ];
            }
        }
    }

    wp_reset_postdata();

    echo json_encode([
        'products' => $products,
        'total' => $query->found_posts,
        'totalPages' => $query->max_num_pages,
        'currentPage' => intval($_GET['page'] ?? 1)
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
