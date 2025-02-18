const app = window.__initialData;
export const globals = {
  // Color
  header_border: app.header_border, // {string} Color of the header border
  header_default_border: app.header_default_border, // {string} Default color of the header border
  header_overlay_border: app.header_overlay_border, // {string} Color for header border when banner has an overlay
  header_color: app.header_color, // {string} Color of the header
  header_default_color: app.header_default_color, // {string} Default color of the header
  header_overlay_color: app.header_overlay_color, // {string} Color of the header when banner has an overlay
  body_background_color: app.body_background_color, // {string} Background color of the body
  body_text_color: app.body_text_color, // {string} Text color of the body

  // Header
  header_group_height: app.header_group_height, // {number} Height of the header group
  header_bar_height: app.header_bar_height, // {number} Height of the header bar
  has_banner_overlap: app.has_banner_overlap, // {boolean} To check if there is a banner overlay

  // Scroll
  is_scrolled: app.is_scrolled, // {boolean} To toggle check direction of scroll
  is_scrolled_up: app.is_scrolled_up, // {boolean} To toggle check if within 300px of top
  prev_scroll_pos: app.prev_scroll_pos, // {number} Pprevious scroll position of the page.
  show_scroll_up: app.show_scroll_up, // {boolean} To show the 'back to top' button
  has_overlay: app.has_overlay, // {boolean} To enable or disable body scrolling
  enable_body_scrolling: app.enable_body_scrolling, // {boolean} To enable or disable body scrolling

  // Audio
  click_audio: app.click_audio, // {string} URL for click sound
  success_audio: app.success_audio, // {string} URL for success sound
  enable_audio: app.enable_audio, // {boolean} To enable or disable audio

  // Menu
  menu_drawer: app.menu_drawer, // {boolean} To toggle the menu drawer
  menu_nested: app.menu_nested, // {boolean} To check if the menu is nested

  // Product
  sticky_bar_height_left: app.sticky_bar_height_left, // {number} Height of the sticky bar
  sticky_bar_height_right: app.sticky_bar_height_right, // {number} Height of the sticky bar

  // Overlays
  age_overlay: app.age_overlay, // {boolean} To toggle the age overlay
  filter_overlay: app.filter_overlay, // {boolean} To toggle the filter overlay
  localization_overlay: app.localization_overlay, // {boolean} To toggle the localization overlay
  audio_overlay: app.audio_overlay, // {boolean} To toggle audio settings overlay
  discount_overlay: app.discount_overlay, // {boolean} To toggle the discount overlay
  quick_edit_handle: app.quick_edit_handle, // {string} The product handle of the product being edited

  // Alert
  error_alert: app.error_alert, // {boolean} To show the alert
  error_message: app.error_message, // {string} Error message

  // Pagination
  pagination_pages_loaded: app.pagination_pages_loaded, // {number} To track number of pages loaded
  pagination_loading: app.pagination_loading, // {boolean} To show loading state in pagination
  pagination_total_pages: app.pagination_total_pages, // {number} Total number of pages for the current collection
  pagination_current_page: app.pagination_current_page, // {number} Current page number in pagination
  pagination_section: app.pagination_section, // {string} Points to a {{ section.id }} to paginate

  // Product
  product_loading: app.product_loading,                    // {boolean} To check if product is loading
  recent_products: app.recent_products,                    // {array} Recently viewed products

  // Discount properties
  discount_text: app.discount_text, // {string} Text for the discount
  discount_code: app.discount_code, // {string} Code for the discount

  // Cart
  cart_drawer: app.cart_drawer, // {boolean} To toggle the cart drawer
  cart_loading: app.cart_loading, // {boolean} To check if the cart is loading
  cart_alert: app.cart_alert, // {boolean} To show the cart alert
  cart_behavior_desktop: app.cart_behavior_desktop, // {string} Behavior of the cart on desktop
  cart_behavior_mobile: app.cart_behavior_mobile, // {string} Behavior of the cart on mobile
  cart: app.cart, // {object} Object to store the cart data
  progress_bar_threshold: app.progress_bar_threshold, // {number} Set the threshold for the 'free shipping' progress bar
  progress_bar_calculation: app.progress_bar_calculation, // {string} Set the calculation for progress bar to 'total' or 'subtotal'

  // Search
  search_drawer: app.search_drawer, // {boolean} To toggle the search drawer
  search_loading: app.search_loading, // {boolean} To check if the search is loading
  search_term: app.search_term, // {string} Term for the search
  search_items: app.search_items, // {array} Array of search items
  search_focus_index: app.search_focus_index, // {string} Index of the focused search item
  search_focus_url: app.search_focus_url, // {string} URL of the focused search item
  search_items_pages: app.search_items_pages, // {array} Array of search items in pages
  search_items_collections: app.search_items_collections, // {array} Array of search items in collections
  search_items_articles: app.search_items_articles, // {array} Array of search items in articles
  search_items_queries: app.search_items_queries, // {array} Array of search items in queries

  // Edit
  edit_variant: app.edit_variant, // {number} Variant ID of old item when editing
  edit_quantity: app.edit_quantity, // {number} Quantity to use when editing

  // Filter
  filter_min_price: app.filter_min_price, // {number} Value of the min price input
  filter_max_price: app.filter_max_price, // {number} Value of the max price input
  filter_min: app.filter_min, // {number} Min price for the current collection
  filter_max: app.filter_max, // {number} Max price for the current collection
  filter_min_thumb: app.filter_min_thumb, // {number} Sets position of min price thumb
  filter_max_thumb: app.filter_max_thumb, // {number} Sets position of max price thumb

  // Prices
  price_format_with_currency: app.price_format_with_currency, // {string} Format for price with currency
  price_format_without_currency: app.price_format_without_currency, // {string} Format for price without currency
  enable_zeros: app.enable_zeros, // {Boolean} Set to false to hide '.00'
  enable_currency: app.enable_currency, // {Boolean} Set to false to hide 'CAD
};
