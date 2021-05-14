//Полифил для метода window.matchMedia
window.matchMedia || (window.matchMedia = function() {
    "use strict"; 
    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style       = document.createElement('style'),
            script      = document.getElementsByTagName('script')[0],
            info        = null;

        style.type  = 'text/css';
        style.id    = 'matchmediajs-test';

        if (!script) {
          document.head.appendChild(style);
        } else {
          script.parentNode.insertBefore(style, script);
        }

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function(media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());

$(document).ready(function(){



    $(".main-header-block .header-buttons .header-burger").on("click",function(){
        $(".main-header-block .header-block-whith-menu .menu-block").addClass("menu-block-mobile-open");
        setTimeout(function(){
            $(".main-header-block .header-block-whith-menu .menu-block").addClass("animation-end");
        },50);
    });

    $(".main-header-block .header-block-whith-menu .menu-block").on("click",function(){
        $(".main-header-block .header-block-whith-menu .menu-block").removeClass("animation-end");
        setTimeout(function(){
            $(".main-header-block .header-block-whith-menu .menu-block").removeClass("menu-block-mobile-open");
        },300);
    });

    $(".menu-block .menu-block-inner .mobi-nav-close").on("click",function(){
        $(".main-header-block .header-block-whith-menu .menu-block").removeClass("animation-end");
        setTimeout(function(){
            $(".main-header-block .header-block-whith-menu .menu-block").removeClass("menu-block-mobile-open");
        },300);
    });

    $(".main-header-block .header-block-whith-menu .menu-block .menu-block-inner").on("click",function(e){
       e.stopPropagation();
    });


    $(".dropdown-block-custom .dropdown-item .dropdown-header").on("click",function(e){
      if (!$(this).closest(".dropdown-item").hasClass("active")){     
        $(this).closest(".dropdown-block-custom").find(".dropdown-item.active .dropdown-body").slideUp(300);
        $(this).closest(".dropdown-block-custom").find(".dropdown-item.active").removeClass("active");
        $(this).closest(".dropdown-item").addClass("active").find(".dropdown-body").slideDown(300);
      }else{
        $(this).closest(".dropdown-item").removeClass("active").find(".dropdown-body").slideUp(300);
      }
    });

    $('.owl-carousel').owlCarousel({
        margin: 10,
        dots:false,
        nav: false,
        autoplay:true,
        loop:true,
        autoplayTimeout:3000,
        smartSpeed:400,
        responsive: {
            0: {
                items: 1,
                touchDrag: true
            },
            400: {
                items: 3,
                touchDrag: false,
                mouseDrag: true
            },
            1024: {
                items: 5,
                touchDrag: false,
                mouseDrag: true
            }
        }
    });

    $('.top-section-carousel').owlCarousel({
        dots:true,
        nav: false,
        autoplayTimeout:3000,
        smartSpeed:400,
        items:1
    });
    

    $('.people-say-carousel').owlCarousel({
        margin: 10,
        dots:true,
        nav: false,
        autoplay:true,
        loop:true,
        autoplayTimeout:3000,
        smartSpeed:400,
        responsive: {
            0: {
                items: 1,
                touchDrag: true
            },
            576: {
                items: 2,
                touchDrag: false,
                mouseDrag: true
            },
            992: {
                items: 3,
                touchDrag: false,
                mouseDrag: true
            }
        }
    });

   
    
}); 


