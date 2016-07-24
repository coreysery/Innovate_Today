// JavaScript Document
jQuery(document).ready(function ($) {
    "use strict";
    /*
     jQuery('.responsive_menu_toggle').on('click',function(e){
     e.stopPropagation();
     e.preventDefault();
     //if(viewport().width < 768){
     var toggle_el = jQuery(this).attr('rel');
     jQuery('.'+toggle_el).slideToggle();

     //}
     e.stopPropagation();
     e.preventDefault();
     });
     jQuery('.responsive_drop_down a').click(function(e){
     var current_item = $(this).text();
     var parent_rel = jQuery(this).closest('ul').siblings('button.responsive_menu_toggle').html(current_item + ' <span class="caret"></span>');
     if(viewport().width < 768){
     jQuery(this).closest('ul').slideToggle();
     }
     });*/

    /* Parallax Quote Start */
    /* for multiple parallax
     function quote_para(para_img1_easing, para_img2_easing)
     */
    function quote_para(para_img1_easing) {
        //quote_para(para_img1_easing, para_img2_easing)
        jQuery('.parallex_folio').each(function () {
            var el = jQuery(this);
            //console.log( elements[i] , i );
            if (el.visible(true)) {
                el.parallax("50%", para_img1_easing);
                // add a div with class 'bg' above as a wrapper of .parallax_container and uncomment the below line
                //el.find('.bg').parallax("50%", para_img2_easing);
            }
        });
    }

    jQuery(window).scroll(function (event) {
        /* Calling function of multiple parallax
         quote_para(0.2, 0.6);
         */
        quote_para(.3);
    });
    /* Parallax Quote End */

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


    /* Scroll To Navigation */
    jQuery('#top-nav').onePageNav({
        currentClass: 'current',
        changeHash: true,
        scrollSpeed: 600,
        scrollOffset: 0,
        scrollThreshold: 0.3,
        easing: 'swing',
        filter: ':not(.external)',
        scrollChange: function ($currentListItem) {
            jQuery('#small-nav').onePageNav({
                currentClass: 'current',
                changeHash: true,
                scrollSpeed: 600,
                scrollOffset: 0,
                scrollThreshold: 0.3,
                easing: 'swing',
                filter: ':not(.external)'
            });
        }
    });
    jQuery('#small-nav').onePageNav({
        currentClass: 'current',
        changeHash: true,
        scrollSpeed: 600,
        scrollOffset: 0,
        scrollThreshold: 0.3,
        easing: 'swing',
        filter: ':not(.external)',
        scrollChange: function ($currentListItem) {
            jQuery('#top-nav').onePageNav({
                currentClass: 'current',
                changeHash: true,
                scrollSpeed: 600,
                scrollOffset: 0,
                scrollThreshold: 0.3,
                easing: 'swing',
                filter: ':not(.external)'
            });
        }
    });


    // Back to top
    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() > 200) {
            jQuery('.back_top').fadeIn();
        } else {
            jQuery('.back_top').fadeOut();
        }
    });
    jQuery('.back_to_top').click(function () {
        jQuery("html, body").animate({scrollTop: 0}, 750);

    });

    // Scroll to next and previous options and to particular id
    //scroll_to_id
    jQuery('.scroll_next_section').click(function () {
        var scroll_to_id = jQuery(this).data('scroll-id');
        if (scroll_to_id === true) {
            jQuery('html,body').stop().animate({scrollTop: (jQuery(jQuery(this).attr('href')).offset().top) + 'px'}, 1500, 'easeOutExpo');
        } else {
            var next_section;
            next_section = jQuery(this).parents('section').nextAll("section").first();
            //alert(next_section.nextAll(".section_container").first().prepend("<h1>hi aa</h1>"));
            jQuery('html,body').stop().animate({scrollTop: (next_section.offset().top) + 'px'}, 1500, 'easeOutExpo');
        }
    });


    function single_item_width(portoflio_size, wrapper) {
        return Math.floor(((wrapper / portoflio_size) - 2));
    }

    /* Portfolio Nav javascript */
    var viewport_width = viewport();
    var column_width = 291;
    var portfolio_wrapper = jQuery('#container').width();

    var portfolio_widths = {
        'items_lg': 4,
        'items_md': 3,
        'items_sm': 3,
        'items_xs_1': 2,
        'items_xs_2': 1
    };
    //var column_width = viewport_width.width - 20;
    //console.log(viewport_width.width);

    /* Running Masanory 1st time */
    if (viewport_width.width >= 1200) {
        column_width = single_item_width(portfolio_widths.items_lg, portfolio_wrapper);
        //console.log(column_width= 291.5);
        //console.log(jQuery('.container').width());
        jQuery('.work_item').width(column_width);
        /*if(jQuery('.container').width() < 1170){

         column_width= 313;
         //jQuery('.work_item').width(313);
         }*/
    } else if (viewport_width.width >= 992 && viewport_width.width <= 1199) {
        column_width = single_item_width(portfolio_widths.items_md, portfolio_wrapper);
        jQuery('.work_item').width(column_width);
    } else if (viewport_width.width >= 768 && viewport_width.width <= 991) {
        column_width = single_item_width(portfolio_widths.items_sm, portfolio_wrapper);
        jQuery('.work_item').width(column_width);
    } else if (viewport_width.width > 480 && viewport_width.width <= 767) {
        column_width = single_item_width(portfolio_widths.items_xs_1, portfolio_wrapper);
        jQuery('.work_item').width(column_width);
    }
    else if (viewport_width.width <= 480) {
        column_width = single_item_width(portfolio_widths.items_xs_2, portfolio_wrapper);
        jQuery('.work_item').width(column_width);
    }

    /* Gallery Isotope Masonary */
    jQuery('#container').isotope({
        itemSelector: '.isotope-item',
        masonry: {
            columnWidth: column_width
        },
        animationEngine: 'jquery'
    });

    /**Running masonary everytime window resizes */
    jQuery(window).resize(function () {
        viewport_width = viewport();
        portfolio_wrapper = jQuery('#container').width();
        //console.log("viewport_width = "+viewport_width.width);
        if (viewport_width.width >= 1200) {
            column_width = single_item_width(portfolio_widths.items_lg, portfolio_wrapper);
            jQuery('.work_item').width(column_width);
        } else if (viewport_width.width >= 992 && viewport_width.width <= 1199) {
            column_width = single_item_width(portfolio_widths.items_md, portfolio_wrapper);
            jQuery('.work_item').width(column_width);
        } else if (viewport_width.width >= 768 && viewport_width.width <= 991) {
            column_width = single_item_width(portfolio_widths.items_sm, portfolio_wrapper);
            jQuery('.work_item').width(column_width);
        } else if (viewport_width.width > 480 && viewport_width.width <= 767) {
            column_width = single_item_width(portfolio_widths.items_xs_1, portfolio_wrapper);
            jQuery('.work_item').width(column_width);
        }
        else if (viewport_width.width <= 480) {
            column_width = single_item_width(portfolio_widths.items_xs_2, portfolio_wrapper);
            jQuery('.work_item').width(column_width);
        }
        /* Gallery Isotope Masonary */
        jQuery('#container').isotope({
            itemSelector: '.isotope-item',
            masonry: {
                columnWidth: column_width
            }
        });
    });

    /* Gallery Isotope Masonary */
    jQuery('#blog_masanory_container').isotope({
        itemSelector: '.isotope-item',
        masonry: {}
    });
    jQuery(window).resize(function () {
        jQuery('#blog_masanory_container').isotope({
            itemSelector: '.isotope-item',
            masonry: {}
        });
    });

    // filter items when filter link is clicked Masonary isotope
    jQuery('#filters a').click(function () {
        jQuery(this).parent().siblings().removeClass('current');
        jQuery(this).parent().addClass('current');
        var selector = jQuery(this).attr('data-filter');
        jQuery('#container').isotope({filter: selector});
        return false;
    });

    /* jQuery Nicescroll */
    jQuery("html").niceScroll({
        styler: "fb",
        zindex: 99999
    });

    /* testimonial slider */
    $("#testi-feed").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        autoHeight: true,
        items: 1,
        pagination: true,
        paginationNumbers: false,
        stopOnHover: true,
        navigation: false,
        transitionStyle: "goDown",
        itemsDesktop: false,
        itemsDesktopSmall: false,
        itemsTablet: false,
        itemsMobile: false
    });

    /* Featured portfolio caraousel Starts */
    $("#featured-clients").owlCarousel({
        autoPlay: 3000,
        items: 5,
        /*itemsDesktop : [1199,4],
         itemsDesktopSmall : [979,3],*/
        itemsCustom: [
            [0, 1],
            [390, 2],
            [768, 3],
            [980, 4],
            [1200, 5]
        ],
        navigation: true,
        pagination: false,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
    });
    /* Featured portfolio caraousel Ends */

    /* Slider on Blog Posts as Gallery Starts */
    $(".rslides").responsiveSlides({
        auto: true,
        pager: true,
        nav: true,
        speed: 500,
        maxwidth: 800,
        prevText: "",
        nextText: "",
        namespace: "transparent-btns"
    });
    /* Slider on Blog Posts as Gallery Ends */

    /* Featured Slider */
    var sync1 = $("#sync1");
    var sync2 = $("#sync2");

    sync1.owlCarousel({
        autoPlay: 4000,
        singleItem: true,
        slideSpeed: 1000,
        autoHeight: false,
        lazyload: true,
        navigation: false,
        pagination: false,
        afterAction: syncPosition,
        responsiveRefreshRate: 200
    });

    sync2.owlCarousel({
        items: 5,
        itemsMobile: [479, 2],
        navigation: false,
        pagination: false,
        responsiveRefreshRate: 100,
        afterInit: function (el) {
            el.find(".owl-item").eq(0).addClass("synced");
        }
    });

    function syncPosition(el) {
        var current = this.currentItem;
        $("#sync2")
            .find(".owl-item")
            .removeClass("synced")
            .eq(current)
            .addClass("synced");
        if ($("#sync2").data("owlCarousel") !== undefined) {
            center(current)
        }

    }

    $("#sync2").on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).data("owlItem");
        sync1.trigger("owl.goTo", number);
    });

    function center(number) {
        var sync2visible = sync2.data("owlCarousel").owl.visibleItems;

        var num = number;
        var found = false;
        for (var i in sync2visible) {
            if (num === sync2visible[i]) {
                var found = true;
            }
        }

        if (found === false) {
            if (num > sync2visible[sync2visible.length - 1]) {
                sync2.trigger("owl.goTo", num - sync2visible.length + 2)
            } else {
                if (num - 1 === -1) {
                    num = 0;
                }
                sync2.trigger("owl.goTo", num);
            }
        } else if (num === sync2visible[sync2visible.length - 1]) {
            sync2.trigger("owl.goTo", sync2visible[1])
        } else if (num === sync2visible[0]) {
            sync2.trigger("owl.goTo", num - 1)
        }
    }

    /* Max-height of responsive nav */
    jQuery('.menu-bar .responsive-nav').css('max-height', viewport().height - jQuery('.menu-bar').outerHeight());
    jQuery(window).resize(function () {
        jQuery('.menu-bar .responsive-nav').css('max-height', viewport().height - jQuery('.menu-bar').outerHeight());
    });

});

jQuery(window).load(function () { // makes sure the whole site is loaded
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
function viewport() {
    var e = window, a = 'inner';
    if (!( 'innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {width: e[a + 'Width'], height: e[a + 'Height']};
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
(function ($) {


    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *     the user visible viewport of a web browser.
     *     only accounts for vertical position, not horizontal.
     */

    $.fn.visible = function (partial) {

        var $t = $(this),
            $w = $(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

    };

})(jQuery);// JavaScript Document

