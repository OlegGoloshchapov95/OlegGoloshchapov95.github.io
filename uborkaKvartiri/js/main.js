$(document).ready(function(){
  
   $(".main-header-block .navbar-toggler").on("click",function(e){
      if($(this).attr("aria-expanded")=="true"){
        $("#header-block.main-header-block").removeClass("open-header");
      }else{
         $("#header-block.main-header-block").addClass("open-header");
      }
   });

/*-------fixed-cost-block-in-botttom-start---------*/

   var $costBlock = $(".top-section-block .calculate-cost-block");
   if($costBlock.is(".calculate-cost-block")){
     function fixedCostBlockOnScroll(){
      if($(window).width()>=992){
        //показываться будет при пролистывании дальше этой высоты 
        var topHeight = $(".main-block .top-section-block").height();
        //при достижении этой высоты будет скрываться
        var bottomHeight = $(document).height()-$(window).height()-$(".main-footer-block#footer-block").height();
        if($(window).scrollTop()>topHeight && $(window).scrollTop()<bottomHeight && !$costBlock.hasClass("fixed-bottom-cost-block")){
          $(".main-block .top-section-block").css("height",$(".main-block .top-section-block").height()+"px")
          $costBlock.addClass("fixed-bottom-cost-block").find(".cleaning-cost-form").addClass("container");
          setTimeout(function(){$costBlock.addClass("visible-cost-block")},50);
        }else if(($(window).scrollTop()<=topHeight || $(window).scrollTop()>=bottomHeight) && $costBlock.hasClass("fixed-bottom-cost-block")){
          $costBlock.removeClass("visible-cost-block fixed-bottom-cost-block").find(".cleaning-cost-form").removeClass("container");
          $costBlock.css("height","");
        } 
      }
     }
     $(window).on("scroll",fixedCostBlockOnScroll);
     $(window).on("resize",function(){
       if($(window).width()<992){
        $costBlock.removeClass("visible-cost-block fixed-bottom-cost-block").find(".cleaning-cost-form").removeClass("container");
        $(".main-block .top-section-block").css("height","");
       }
     })
   }

/*-------fixed-cost-block-in-botttom-end-----------*/

   $(".owl-carousel").owlCarousel({ 
       nav:false,  
       margin:30,
       dots:false,
       responsive: {
        0: {
          items:1
        },
        992: {
          items:3
        }
      }
   });
}); 


