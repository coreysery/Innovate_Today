// JavaScript Document
  jQuery(document).ready(function($){
	"use strict";

	/* Small Navigation */
	// Responsive Navigation Working
/*	jQuery('.toggle_main_menu_btn').click(function(e){
		if(viewport().width < 768){
			e.preventDefault();
			var toggle_element = jQuery(this).attr('rel');
			//console.log('View Port Widt = '+viewport().width);
			jQuery('#'+toggle_element).slideToggle();
			e.stopPropagation();
		}
	});
	
	jQuery('.responsive-nav li').click(function(e){
		if(viewport().width < 768){
			e.preventDefault();
//			alert('children ul length '+ jQuery(this).children('ul').length);
			//if(jQuery(this).children('ul').length === 0){
				jQuery('.responsive-nav').slideToggle();
			//}
			e.stopPropagation();
		}
	});*/
	
	// When Resizing Window will show/hide the List of .top-menu
	jQuery(window).resize(function(){
			if(viewport().width >= 768){
				jQuery('.top-nav').css('display', 'block');
			}
			if(viewport().width <= 767){
				jQuery('.top-nav').css('display', 'block');
			}
		});
	
	/* Sticky Navigation */
	jQuery(".sticky-bar").sticky({ topSpacing: 0 });
	
		
	// Back to top
	jQuery(window).scroll(function () {
        if(jQuery(this).scrollTop() > 200) {
            jQuery('.back_top').fadeIn();
        } else {
            jQuery('.back_top').fadeOut();
        }
    });
	jQuery('.back_to_top').click(function(){
	    jQuery("html, body").animate({ scrollTop: 0 }, 750);

	});


  //});
  
  		/* jQuery Nicescroll */
		jQuery("html").niceScroll({
			styler:"fb",
			zindex: 999999
		});
		
			  /* Max-height of responsive nav */
			  jQuery('.menu-bar .responsive-nav').css('max-height',viewport().height - jQuery('.menu-bar').outerHeight());
			  jQuery(window).resize(function(){
				  jQuery('.menu-bar .responsive-nav').css('max-height',viewport().height - jQuery('.menu-bar').outerHeight());
			  });
			  
  });

	jQuery(window).load(function() { // makes sure the whole site is loaded
		jQuery("#status").fadeOut(); // will first fade out the loading animation
		jQuery("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.
	});

/* 
*
*
* viewport width 
*
*
*/
function viewport(){
	var e = window, a = 'inner';
	if ( !( 'innerWidth' in window ) )
	{
	a = 'client';
	e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}


     