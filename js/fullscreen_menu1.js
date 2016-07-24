(function() {
	/*jshint -W030 */
	"use strict";
		
	  	/* jQuery Nicescroll */
		jQuery(".full_screen_holder").niceScroll({
			styler:"fb",
			zindex: 99999999
		});
		$(".full_screen_holder").getNiceScroll().hide();
		
		
	var triggerBttn = document.getElementById( 'trigger-overlay_menu' ),
		overlay_menu = document.querySelector( 'div.overlay_menu' ),
		closeBttn = overlay_menu.querySelector( 'button.overlay_menu-close' );
		var transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };
		
  	var s = Snap( overlay_menu.querySelector( 'svg' ) ), 
		path = s.select( 'path' ),
		pathConfig = {
			from : path.attr( 'd' ),
			to : overlay_menu.getAttribute( 'data-path-to' )
		};

	function toggleoverlay_menu() {
		if( classie.has( overlay_menu, 'open' ) ) {
			classie.remove( overlay_menu, 'open' );
			classie.add( overlay_menu, 'close' );
			
			var onEndTransitionFn = function( ev ) {
				classie.remove( overlay_menu, 'close' );
			};
			
			path.animate( { 'path' : pathConfig.from }, 400, mina.linear, onEndTransitionFn );
		}
		else if( !classie.has( overlay_menu, 'close' ) ) {
			classie.add( overlay_menu, 'open' );
			path.animate( { 'path' : pathConfig.to }, 400, mina.linear );
		}
			/* full_screen_holder height for safari and webkit and iphone and ipad browsers */
			if($.browser.ipad || 
   			$.browser.iphone ||
			$.browser.webkit ){
				jQuery('.full_screen_holder').height(viewport().height);
			}
			/* Full Screen Bottom bar position ajustement if the vieport height is very large */
				//jQuery('.full_screen_holder').height();
				var all_content_height = jQuery('.full_screen_holder .top_bar').outerHeight() + jQuery('.full_screen_holder .full_screen_menu').outerHeight()+jQuery('.full_screen_holder .bottom_bar').outerHeight();
				var full_screen_height = jQuery('.full_screen_holder').outerHeight();
				if( (full_screen_height > all_content_height)  ){
					jQuery('.full_screen_holder .bottom_bar').addClass('absolute_bar');
				}else{
					jQuery('.full_screen_holder .bottom_bar').removeClass('absolute_bar');
				}
				/*console.log("full_screen_height: "+full_screen_height); 
				console.log("all_content_height: "+all_content_height);*/
				
			/* Resizing Nice Scroll */
			$(".full_screen_holder").getNiceScroll().toggle();
			$(".full_screen_holder").getNiceScroll().resize();
		
	}

	triggerBttn.addEventListener( 'click', toggleoverlay_menu );
	closeBttn.addEventListener( 'click', toggleoverlay_menu );

	jQuery('.full_screen_menu a').click(function(){
			/* Full Screen Menu Counter */
			var nav_count = (jQuery('.full_screen_menu li.current').index()+1).toString();
				if(nav_count.length===1){
					nav_count = "0"+nav_count;
				}
				jQuery('.full_screen_holder .full_nav_counter').text(nav_count);
			toggleoverlay_menu();
			
		});
		

			
	jQuery('.full_screen_menu li').mouseenter(function(){
			var to_count = jQuery(this);
			if(jQuery(this).parents("li").last().length>0){
				to_count = jQuery(this).parents("li").last();
			}
			
			var nav_count = (to_count.index()+1).toString();
			if(nav_count.length===1){
				nav_count = "0"+nav_count;
			}
			jQuery('.full_nav_counter').text(nav_count);
		}).mouseleave(function(){
			
		});

})();

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

/*
 * Viewport - jQuery selectors for finding elements in viewport
 *
 * Copyright (c) 2008-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *  http://www.appelsiini.net/projects/viewport
 *
 */