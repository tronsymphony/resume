<?php
/**
 * Great American Group functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Great_American_Group
 */

if ( ! function_exists( 'great_american_group_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function great_american_group_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Great American Group, use a find and replace
		 * to change 'great-american-group' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'great-american-group', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', 'great-american-group' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'great_american_group_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );
	}
endif;
add_action( 'after_setup_theme', 'great_american_group_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function great_american_group_content_width() {
	// This variable is intended to be overruled from themes.
	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters( 'great_american_group_content_width', 640 );
}
add_action( 'after_setup_theme', 'great_american_group_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function great_american_group_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'great-american-group' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'great-american-group' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => esc_html__( 'Footer', 'great-american-group-footer' ),
		'id'            => 'footer-bar',
		'description'   => esc_html__( 'Add widgets here.', 'great-american-group-footer' ),
		'before_widget' => '<section id="%1$s" class="footerbarwidget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => esc_html__( 'Footer Second', 'great-american-group-footer' ),
		'id'            => 'footer-bar-second',
		'description'   => esc_html__( 'Add widgets here.', 'great-american-group-footer' ),
		'before_widget' => '<section id="%1$s" class="footerbarwidget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => esc_html__( 'Footer Third', 'great-american-group-footer' ),
		'id'            => 'footer-bar-third',
		'description'   => esc_html__( 'Add widgets here.', 'great-american-group-footer' ),
		'before_widget' => '<section id="%1$s" class="footerbarwidget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

}
add_action( 'widgets_init', 'great_american_group_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function great_american_group_scripts() {
	wp_enqueue_style( 'great-american-group-style', get_stylesheet_uri() );

	wp_enqueue_script( 'great-american-group-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20151215', true );

	wp_enqueue_script( 'great-american-group-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20151215', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	    wp_enqueue_script( 'fontawesome', 'https://use.fontawesome.com/releases/v5.0.6/js/all.js', array(), '', false );

    wp_enqueue_style( 'bootstrap-css', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' );

    

    wp_enqueue_style( 'remodal', get_template_directory_uri() . '/css/remodal.css' );

    wp_enqueue_style( 'remodal-default-theme', get_template_directory_uri() . '/css/remodal-default-theme.css' );

    
    wp_enqueue_style( 'mainsheet', get_template_directory_uri() . '/css/mainsheet.css?v=3.1' );
        
    wp_enqueue_style( 'responsive', get_template_directory_uri() . '/css/responsive.css?v=1.9' );

    wp_enqueue_script( 'popper-js', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js', array( 'jquery' ), null, false );

    wp_enqueue_script( 'bootstrap-js', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js', array( 'jquery' ), null, false );

    wp_enqueue_script( 'remodal', get_template_directory_uri() . '/js/remodal.js', array('jquery'), '', true );

    wp_enqueue_script( 'site-mainscript', get_template_directory_uri() . '/js/mainscript.js?v=1.4', array('jquery'), '', true );
}
add_action( 'wp_enqueue_scripts', 'great_american_group_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}


//// BREADCRUMB START ////       
 function the_breadcrumb() {
 
  $showOnHome = 0; // 1 - show breadcrumbs on the homepage, 0 - don't show
  $delimiter = '&raquo;'; // delimiter between crumbs
  $home = 'Home'; // text for the 'Home' link
  $showCurrent = 1; // 1 - show current post/page title in breadcrumbs, 0 - don't show
  $before = '<span class="current">'; // tag before the current crumb
  $after = '</span>'; // tag after the current crumb
 
  global $post;
  $homeLink = get_bloginfo('url');
  
 
  if (is_home() || is_front_page()) {
 
    if ($showOnHome == 1) echo '<div id="crumbs"><a href="' . $homeLink . '">' . $home . '</a></div>';
 
  } else {
 
    echo '<div id="crumbs"><a href="' . $homeLink . '">' . $home . '</a> ' . $delimiter . ' ';
 
    if ( is_category() ) {
      $thisCat = get_category(get_query_var('cat'), false);
      if ($thisCat->parent != 0) echo get_category_parents($thisCat->parent, TRUE, ' ' . $delimiter . ' ');
      echo $before . 'Archive by category "' . single_cat_title('', false) . '"' . $after;
 
    } elseif ( is_search() ) {
      echo $before . 'Search results for "' . get_search_query() . '"' . $after;
 
    } elseif ( is_day() ) {
      echo '<a href="' . get_year_link(get_the_time('Y')) . '">' . get_the_time('Y') . '</a> ' . $delimiter . ' ';
      echo '<a href="' . get_month_link(get_the_time('Y'),get_the_time('m')) . '">' . get_the_time('F') . '</a> ' . $delimiter . ' ';
      echo $before . get_the_time('d') . $after;
 
    } elseif ( is_month() ) {
      echo '<a href="' . get_year_link(get_the_time('Y')) . '">' . get_the_time('Y') . '</a> ' . $delimiter . ' ';
      echo $before . get_the_time('F') . $after;
 
    } elseif ( is_year() ) {
      echo $before . get_the_time('Y') . $after;
 
    } elseif ( is_single() && !is_attachment() ) {
      if ( get_post_type() != 'post' ) {
        $post_type = get_post_type_object(get_post_type());
        $slug = $post_type->rewrite;
        echo '' . $post_type->labels->singular_name . ' ';

        if(get_post($post->post_parent)){
        	$post_data = get_post($post->post_parent);
			$parent_slug = $post_data->post_title;

			if($post->ID == $post_data->ID){
			} else {
				echo $delimiter . ' <a href="' . get_post_permalink($post_data->ID) . '">' . $parent_slug . '</a>';
			}
        }

        if ($showCurrent == 1) echo ' ' . $delimiter . ' <a href="' . get_post_permalink($post->ID) . '">' . $before . get_the_title() . $after . '</a>';

      } else {
        $cat = get_the_category(); $cat = $cat[0];
        $cats = get_category_parents($cat, TRUE, ' ' . $delimiter . ' ');
        if ($showCurrent == 0) $cats = preg_replace("#^(.+)\s$delimiter\s$#", "$1", $cats);
        echo $cats;
        if ($showCurrent == 1) echo $before . get_the_title() . $after;
      }
 
    } elseif ( !is_single() && !is_page() && get_post_type() != 'post' && !is_404() ) {
      $post_type = get_post_type_object(get_post_type());
      echo $before . $post_type->labels->singular_name . $after;
 
    } elseif ( is_attachment() ) {
      $parent = get_post($post->post_parent);
      $cat = get_the_category($parent->ID); $cat = $cat[0];
      echo get_category_parents($cat, TRUE, ' ' . $delimiter . ' ');
      echo '' . $parent->post_title . '';
      if ($showCurrent == 1) echo ' ' . $delimiter . ' ' . $before . get_the_title() . $after;
 
    } elseif ( is_page() && !$post->post_parent ) {
      if ($showCurrent == 1) echo $before . get_the_title() . $after;
 
    } elseif ( is_page() && $post->post_parent ) {
      $parent_id  = $post->post_parent;
      $breadcrumbs = array();
      while ($parent_id) {
        $page = get_page($parent_id);
        $breadcrumbs[] = '<a href="' . get_permalink($page->ID) . '">' . get_the_title($page->ID) . '</a>';
        $parent_id  = $page->post_parent;
      }
      $breadcrumbs = array_reverse($breadcrumbs);
      for ($i = 0; $i < count($breadcrumbs); $i++) {
        echo $breadcrumbs[$i];
        if ($i != count($breadcrumbs)-1) echo ' ' . $delimiter . ' ';
      }
      if ($showCurrent == 1) echo ' ' . $delimiter . ' ' . $before . get_the_title() . $after;
 
    } elseif ( is_tag() ) {
      echo $before . 'Posts tagged "' . single_tag_title('', false) . '"' . $after;
 
    } elseif ( is_author() ) {
       global $author;
      $userdata = get_userdata($author);
      echo $before . 'Articles posted by ' . $userdata->display_name . $after;
 
    } elseif ( is_404() ) {
      echo $before . 'Error 404' . $after;
    }
 
    if ( get_query_var('paged') ) {
      if ( is_category() || is_day() || is_month() || is_year() || is_search() || is_tag() || is_author() ) echo ' (';
      echo __('Page') . ' ' . get_query_var('paged');
      if ( is_category() || is_day() || is_month() || is_year() || is_search() || is_tag() || is_author() ) echo ')';
    }
 
    echo '</div>';
 
  }
} // end the_breadcrumb()



// HEADER SEARCH
add_action('wp_ajax_nopriv_headerSearchFunction', 'headerSearchFunction'); // for not logged in users
add_action('wp_ajax_headerSearchFunction', 'headerSearchFunction');

function headerSearchFunction(){
	require('header_search_functionality.php');
}
// HEADER SEARCH
//// BREADCRUMB END ////
// MONITOR SEARCH BAR
add_action('wp_ajax_nopriv_monitorsearch', 'monitorsearch'); // for not logged in users
add_action('wp_ajax_monitorsearch', 'monitorsearch');

function monitorsearch(){
	require('monitorsearchfunctionality.php');
}


// ROLE BASED SEARCH
add_action('wp_ajax_nopriv_wpa56343_search', 'wpa56343_search'); // for not logged in users
add_action('wp_ajax_wpa56343_search', 'wpa56343_search');

function wpa56343_search(){
	require('search_functionality.php');
}
// MONITOR SEARCH
// INSIGHT SEARCH
add_action('wp_ajax_nopriv_insightssearch', 'insightssearch'); // for not logged in users
add_action('wp_ajax_insightssearch', 'insightssearch');

function insightssearch(){
	require('insights_search.php');
}
// INSIGHT SEARCH


// CREATE THEME OPTIONS PAGE
if( function_exists('acf_add_options_page') ) {
	
	acf_add_options_page(array(
		'page_title' 	=> 'Theme General Settings',
		'menu_title'	=> 'Theme Settings',
		'menu_slug' 	=> 'theme-general-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
}


// LOAD GA MEMBERS CONTENT IN AJAX

add_action('wp_ajax_nopriv_loadgaleaderconent', 'loadgaleaderconent'); 
add_action('wp_ajax_loadgaleaderconent', 'loadgaleaderconent');

function loadgaleaderconent(){
		$targetPost = $_POST['searchTarget'];
		$query = new WP_Query( array( 'post_type' => 'ga-team-members', 'post__in' => array($targetPost) ) );
		while( $query->have_posts() ) : $query->the_post();
		?>
			<div class="posttarget">
					<div id="usertol">
						<div class="flextitle">
							<h1 class="plodltitle">
								<?php the_title(); ?>

							</h1>
						</div>
						<div class="plodlcontent">
							<?php the_content(); ?>
						</div>
					</div>
					<div class="industrial">
						<h3 class="loightboxtitle">
							<div class="idnk">Title</div><?php the_field("title"); ?>
						</h3>
						<h3 class="loightboxtitle">
							<div class="idnk">Contact Information</div>
															<?php if(get_field('number')): ?>
									<a href="tel:<?php the_field('number'); ?>" class="telo"><i class="fas fa-phone"></i> <?php the_field('number'); ?></a>
								<?php endif; ?>
													<?php if(get_field('phone')): ?>
													<a href="tel:<?php the_field('phone'); ?>" class="telo"><i class="fas fa-phone"></i> <?php the_field('phone'); ?></a>
													<?php endif; ?>
													<?php if(get_field('email')): ?>
													<a href="mailto:<?php the_field('email'); ?>" class="emailo"><i class="far fa-envelope"></i> Email</a>
													<?php endif; ?>
						</h3>
						
						<?php  
						$term_obj_list = get_the_terms( $post->ID, 'service-type' );
						?>
						<?php if($term_obj_list): ?>
						<?php $terms_string = join(', ', wp_list_pluck($term_obj_list, 'name')); ?>
						<span class="dustryu"><div class="idnk">Solutions</div><?php echo $terms_string; ?></span>
						<?php endif; ?>
						<?php  
								$indsutryobject = get_the_terms( $post->ID, 'industry-type' );
						?>
						<?php if($indsutryobject): ?>
						<?php $industry_string = join(', ', wp_list_pluck($indsutryobject, 'name')); ?>
						<span class="dustryu"><div class="idnk">Industry</div><?php echo $industry_string; ?></span>
						<?php endif; ?>
					</div>	

			</div>
		<?php endwhile;	 

}

// SEARCHREULTS LOAD GA MEMBERS CONTENT IN AJAX

add_action('wp_ajax_nopriv_searchresultsmembers', 'searchresultsmembers'); 
add_action('wp_ajax_searchresultsmembers', 'searchresultsmembers');

function searchresultsmembers(){
		$targetPost = $_POST['searchTarget'];
		$query = new WP_Query( array( 'post_type' => 'ga-team-members', 'post__in' => array($targetPost) ) );
		while( $query->have_posts() ) : $query->the_post();
		?>
			<div class="posttarget">
					<div class="flextitle">
						<h1 class="plodltitle">
							<?php the_title(); ?>
						</h1>
					</div>
					<div class="industrial">
						<h3 class="loightboxtitle">
							<div class="idnk">Title</div><?php the_field("title"); ?></h3>
						<?php  
								$term_obj_list = get_the_terms( $post->ID, 'service-type' );
								$terms_string = join(', ', wp_list_pluck($term_obj_list, 'name'));
						?>
						<span class="dustryu"><div class="idnk">Industry</div><?php echo $terms_string; ?></span>
						
					</div>
					<div class="plodlcontent">
						<?php the_content(); ?>
					</div>
			</div>
		<?php endwhile;	 

}

// SEARCHREULTS LOAD GA MEMBERS CONTENT IN AJAX

// BREAD CRUMBS
function wpdocs_custom_taxonomies_terms_links() {
    // Get post by post ID.
    if ( ! $post = get_post() ) {
        return '';
    }
 
    // Get post type by post.
    $post_type = $post->post_type;
 
    // Get post type taxonomies.
    $taxonomies = get_object_taxonomies( $post_type, 'objects' );
 
    $out = array();
 
    foreach ( $taxonomies as $taxonomy_slug => $taxonomy ){
 
        // Get the terms related to post.
        $terms = get_the_terms( $post->ID, $taxonomy_slug );
 
        if ( ! empty( $terms ) ) {
           
            foreach ( $terms as $term ) {
                $out[] = $term->slug . " ";
               
            }
           
        }
    }
    return implode( '', $out );
}



add_action('wp_ajax_nopriv_loadcareerscontent', 'loadcareerscontent'); 
add_action('wp_ajax_loadcareerscontent', 'loadcareerscontent');

function loadcareerscontent(){
		$targetPost = $_POST['searchTarget'];
		$query = new WP_Query( array( 'post_type' => 'job-listing', 'post__in' => array($targetPost) ) );
		while( $query->have_posts() ) : $query->the_post();
		?>
			<div class="posttarget">
					<div class="flextitle">
						<h1 class="careerajaxtitle">
							<?php the_title(); ?>
						</h1>
					</div>

					<div class="plodlcontent">
						<?php the_content(); ?>
					</div>
			</div>
		<?php endwhile;	 

}



function wpb_set_post_views($postID) {
    $count_key = 'wpb_post_views_count';
    $count = get_post_meta($postID, $count_key, true);
    if($count==''){
        $count = 0;
        delete_post_meta($postID, $count_key);
        add_post_meta($postID, $count_key, '0');
    }else{
        $count++;
        update_post_meta($postID, $count_key, $count);
    }
}
//To keep the count accurate, lets get rid of prefetching
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);

function template_chooser($template)   {    
  global $wp_query;   
  $post_type = get_query_var('post_type');   
  if( $wp_query->is_search && $post_type == 'monitor' )   
  {
    return locate_template('archive-search.php');  //  redirect to archive-search.php
  }   
  return $template;   
}
add_filter('template_include', 'template_chooser');   


class Primary_Walker_Nav_Menu extends Walker_Nav_Menu {
    function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
        if ( array_search( 'menu-item-has-children', $item->classes ) ) {
            $output .= sprintf( "\n<li class='dropdown %s'><a href='%s' class=\"dropdown-toggle\" data-toggle=\"dropdown\" > %s</a>\n", ( array_search( 'current-menu-item', $item->classes ) || array_search( 'current-page-parent', $item->classes ) ) ? 'active' : '', $item->url, $item->title );
        } else {
            $output .= sprintf( "\n<li %s><a href='%s'> %s</a>\n", ( array_search( 'current-menu-item', $item->classes) ) ? ' class="active"' : '', $item->url, $item->title );
        }
    }

    function start_lvl( &$output, $depth = 0, $args = array()  ) {
        $indent = str_repeat( "\t", $depth );
        $output .= "\n$indent<ul class=\"dropdown-menu\" role=\"menu\">\n";
    }
}




function my_page_columns($columns)
{
	$columns = array(
		'cb'	 	=> '<input type="checkbox" />',
		'thumbnail'	=>	'Thumbnail',
		'title' 	=> 'Title',
		'featured' 	=> 'Featured',
		'author'	=>	'Author',
		'date'		=>	'Date',
	);
	return $columns;
}

function my_custom_columns($column)
{
	global $post;
	if($column == 'thumbnail')
	{
		echo wp_get_attachment_image( get_field('dates', $post->ID), array(200,200) );
	}
	elseif($column == 'dates')
	{
		if(get_field('dates'))
		{
			echo 'Yes';
		}
		else
		{
			echo 'No';
		}
	}
}

add_action("manage_pages_custom_column", "my_custom_columns");
add_filter("manage_edit-page_columns", "my_page_columns");
remove_action('welcome_panel', 'wp_welcome_panel');


 
function myprefix_custom_cron_schedule( $schedules ) {
    $schedules['ever'] = array(
        'interval' => 604800, // Every 6 hours
        'display'  => __('weekly'),
    );
    return $schedules;
}
add_filter( 'cron_schedules', 'myprefix_custom_cron_schedule' );

//Schedule an action if it's not already scheduled
if ( ! wp_next_scheduled( 'myprefix_cron_hook' ) ) {
    wp_schedule_event( time(), 'ever', 'myprefix_cron_hook' );
}

///Hook into that action that'll fire every six hours
 add_action( 'myprefix_cron_hook', 'myprefix_cron_function' );

//create your function, that runs on cron
function myprefix_cron_function() {
	// Update post 37


	$args = array(
		'post_type' => array('monitor','infographic'),
		'posts_per_page' => -1
	);

	$post_query = new WP_Query($args);

	if($post_query->have_posts() ) {
	  while($post_query->have_posts() ) {
	    $post_query->the_post();

	    if(get_field('dates')){


			if (strtotime(get_field('dates')) < strtotime('25 month ago')) {

				  $my_post = array(
				      'ID'           => get_the_ID(),
				      // 'post_title'   => get_the_ID(),
				      // 'post_content'   => 'chanfged',
				      'post_status'  => 'private',
				  );

				  // Update the post into the database
				  wp_update_post( $my_post );
			}
	    }
	  }
	}



}






// remove_action('future_post', '_future_post_hook');

add_filter( 'wp_insert_post_data', 'futurenow_do_not_set_posts_to_future' );

function futurenow_do_not_set_posts_to_future( $data ) {
    if ( $data['post_status'] == 'future' && $data['post_type'] == 'upcoming-event' )
        $data['post_status'] = 'publish';
    return $data;
}