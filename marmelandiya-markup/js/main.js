$(document).ready(function(){


    
    $('.owl-carousel').owlCarousel({
	    margin: 0,
	    responsive: {
	      0: {
	        items: 1,
	        nav: true,
	        touchDrag: true
	      },
	      767: {
	        items: 2,
	        nav: true,
	        autoPlay: false,
	        touchDrag: false,
	        mouseDrag: true
	      },
	      1024: {
	        items: 3,
	        nav: true,
	        autoPlay: false,
	        touchDrag: false,
	        mouseDrag: true
	      }
	    }
	});

   
}); 


