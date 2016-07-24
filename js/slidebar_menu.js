/**
 
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
(function() {
	
	"use strict";
	  	/* jQuery Nicescroll */
		/*jQuery(".slidebar_holder").niceScroll({
			styler:"fb",
			zindex: 99999999,
		});
		$(".slidebar_holder").getNiceScroll().hide();*/

	var bodyEl = document.body,
		content = document.querySelector( '.content-wrap' ),
		openbtn = document.getElementById( 'open-button' ),
		closebtn = document.getElementById( 'close-button' ),
		isOpen = false,

		morphEl = document.getElementById( 'morph-shape' ),
		s = Snap( morphEl.querySelector( 'svg' ) );
		var path = s.select( 'path' );
		var initialPath = path.attr('d'), /*var initialPath = this.path.attr('d'),*/
		steps = morphEl.getAttribute( 'data-morph-open' ).split(';');
		var stepsTotal = steps.length;
		var isAnimating = false;

	function init() {
		initEvents();
	}

	function initEvents() {
		openbtn.addEventListener( 'click', toggleMenu );
		if( closebtn ) {
			closebtn.addEventListener( 'click', toggleMenu );
		}

		// close the menu element if the target it´s not the menu element or one of its descendants..
		content.addEventListener( 'click', function(ev) {
			var target = ev.target;
			if( isOpen && target !== openbtn ) {
				toggleMenu();
				
			/* full_screen_holder height for safari and webkit and iphone and ipad browsers */
			if($.browser.ipad || 
   			$.browser.iphone ||
			$.browser.webkit ){
				jQuery('.slidebar_holder').height(viewport().height)
			}
			
				var all_content_height = jQuery('.slidebar_holder .close-button').outerHeight() + jQuery('.slidebar_holder .main-nav').outerHeight()+jQuery('.slidebar_holder .bottom_bar').outerHeight();
				var full_screen_height = jQuery('.slidebar_holder').outerHeight();
				if( (full_screen_height > all_content_height)  ){
					jQuery('.slidebar_holder .bottom_bar').addClass('absolute_bar');
				}else{
					jQuery('.slidebar_holder .bottom_bar').removeClass('absolute_bar');
				}
				/*console.log("full_screen_height: "+full_screen_height); 
				console.log("all_content_height: "+all_content_height);*/
				
				/* Resizing Nice Scroll */
				/*$(".slidebar_holder").getNiceScroll().toggle();
				$(".slidebar_holder").getNiceScroll().resize();*/
			}
		} );
	}

	function toggleMenu() {
		if( isAnimating ) return false;
		isAnimating = true;
		if( isOpen ) {
			classie.remove( bodyEl, 'show-menu' );
			// animate path
			setTimeout( function() {
				// reset path
				path.attr( 'd', initialPath );
				isAnimating = false; 
			}, 300 );
		}
		else {
			classie.add( bodyEl, 'show-menu' );
			// animate path
			var pos = 0,
				nextStep = function( pos ) {
					if( pos > stepsTotal - 1 ) {
						isAnimating = false; 
						return;
					}
					path.animate( { 'path' : steps[pos] }, pos === 0 ? 400 : 500, pos === 0 ? mina.easein : mina.elastic, function() { nextStep(pos); } );
					pos++;
				};

			nextStep(pos);
		}
		isOpen = !isOpen;
	}

	init();

})();