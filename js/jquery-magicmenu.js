// DOM Ready
jQuery(function($) {
	'use strict';
    var $el, leftPos, newWidth, $el_parent;
    
    /* Add Magic Line markup via JavaScript, because it ain't gonna work without */
    $(".menu-bar .main-nav > ul").append("<li id='magic-line'></li>");
    
    /* Cache it */
    var $magicLine = $("#magic-line");
	if($(".menu-bar .main-nav > ul").children("li.current").length===0){
	    $(".menu-bar .main-nav > ul > li:first-child").addClass('current');
	}


	if ( jQuery( "#magic-line" ).length ) {
		$magicLine
			.width($(".menu-bar .main-nav .current").width() - 20)
			.css("left", ($(".menu-bar .main-nav > ul > li.current > a").position().left + 10))
			.data("origLeft", ($magicLine.position().left + 10))
			.data("origWidth", $magicLine.width() - 20);
	}
        
    $(".menu-bar .main-nav > ul > li").not($magicLine).mouseenter( function() {

			$el = $(this).children('a');
			$el_parent = $el.parent().parent().closest('li');
			if(  $el_parent[0] === undefined ){
				leftPos = ($el.position().left + 10);
				//console.log('leftPos : ' + leftPos);
				newWidth = $el.parent().width() - 20;
				//console.log('newWidth : ' + newWidth);
				//console.log($el_parent[0]);
			}else{
				$el_parent = $el.closest('.menu-parent-item');
				leftPos = ($el_parent.children('a').position().left + 10);
				
				newWidth = $el_parent.width() - 20;
			}
			
			$magicLine.stop().animate({
				left: leftPos + 10,
				width: newWidth -20
			});
		
    }).mouseleave( function() {
        $magicLine.stop().animate({
            left: $(".menu-bar .main-nav .current > a").position().left + 10,
            width: $(".menu-bar .main-nav .current").width() -20
        });
    });
	$(window).on("scroll resize", function() {
		
			$magicLine.stop().animate({
				left: $(".menu-bar .main-nav .current > a").position().left + 10,
				width: $(".menu-bar .main-nav .current").width() - 20
			});
  });
    
});