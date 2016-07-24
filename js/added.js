jQuery(".sticky-bar").sticky({topSpacing: 40});
jQuery(window).on('scroll ready load', function () {
    var toTop = $(window).scrollTop();
    var logoHeight = 90;
    var logoBottom = 11;
    var spacing = 0;
    var navSpacing = 53;
    if (toTop < 40) {
        spacing = 40 - toTop;
        logoHeight = 100 - (toTop / 4);
        logoBottom = 30 - (toTop / 4);
        navSpacing = 90 - (toTop / 4);
    }
    jQuery(".sticky-bar").css('top', spacing);
    jQuery(".responsive-nav").css('top', navSpacing);
    jQuery('.logo, .logo-responsive').css({
        'max-width': logoHeight,
        bottom: logoBottom
    })
});
$('.responsive-nav a').on('click', function () {
    $('body').removeClass('active');
});

jQuery(window).on('scroll ready load', function () {
    var toTop = $(window).scrollTop();
    var logoWidth = 90;
    var logoBottom = 0;
    var padding = 0;
    var $logo = jQuery('.logo-responsive');

    if (toTop < 40) {
        logoWidth = 100 - (toTop / 4);
        logoBottom = -10 - (toTop / 4);
        padding = 10 - (toTop / 4);

        jQuery('.logo-responsive img').css({
            border: '0px solid #D9980D',
            width: '100px',
            top: 0
        });
        $logo.css({
            //border : '4px solid #D9980D',
            'overflow-y': 'visible',
            'overflow-x': 'visible',
            'height': '100px'
        });
        $logo.addClass('inno_arc');
    } else {
        $logo.css({
            //border : '4px solid #D9980D',
            'overflow-y': 'hidden',
            'overflow-x': 'visible',
            'height': '55px'
        });
        $logo.removeClass('inno_arc');
        jQuery('.logo-responsive img').css({
            width: '120px',
            position: 'relative',
            top: '-20px',
            border: '4px solid #D9980D'
        });
    }

    $logo.css({
        bottom: logoBottom,
        padding: padding
    });
});

$('.small_menu').click(function (e) {
    $('body').toggleClass('active');
    e.preventDefault();
});

$(function() {

    $('.small_menu').on('tap', function() {
        var $body = $(window);
        $body.bind('scroll', function() {
            if ($body.scrollLeft() !== 0) {
                $body.scrollLeft(0);
            }
        });
    });

});