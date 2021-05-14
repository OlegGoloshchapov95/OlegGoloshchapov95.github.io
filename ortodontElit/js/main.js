$(document).ready(function(){
  $(".owl-carousel").owlCarousel({ 
       items:1,
       loop:true
  });
  $(".second-carousel").owlCarousel({
       nav:true,
       dots:false,
       items:1,
       loop:true
  });
  $(".third-carousel").owlCarousel({
       nav:true,  
       items:1,
       loop:true,
       margin:30,
       dots:false,
       responsive: {
        0: {
          items:1
        },
        768: {
          items:2
        },
        992: {
          items:3
        }
      }
  });
  $(".fourth-carousel").owlCarousel({
       nav:false,  
       items:1,
       loop:true,
       margin:30,
       dots:true,
       responsive: {
        0: {
          items:1
        },
        481:{
          items:2
        },
        768: {
          items:3
        },
        992: {
          items:4
        }
      }
  });
     //Dropdown in side menu-start
    var $dropdownInSideMenu = $("#header-block .navbar-nav .dropdown");
    var timer = new Array($dropdownInSideMenu.length);
    for(var i=0; i<$dropdownInSideMenu.length; ++i){  
      $dropdownInSideMenu.eq(i).find('>a').on("click", function(e){
        e.stopPropagation();
      });
      function toOpenClick(e){
        if ($(window).width() < 992) {
          e.stopPropagation();
          var index = $dropdownInSideMenu.index(this);
          if(timer[index]){clearInterval(timer[index]);} 
          $(this).find('.dropdown-menu').slideToggle(function(){
            if($(this).css("display")=="none"){$(this).parent().removeClass("opened-drpdn");} 
          });
          $(this).addClass("opened-drpdn"); 
        }
      }
      $dropdownInSideMenu.eq(i).on("click",toOpenClick);
      $dropdownInSideMenu.eq(i).on("mouseenter",function(e){
        if ($(window).width() >= 992) {
          $(this).find(".dropdown-menu").hide().stop(true, true).fadeIn(300); 
        }
      });
      $dropdownInSideMenu.eq(i).on("mouseleave",function(e){
        if ($(window).width() < 992) {
          e.preventDefault();
          e.stopPropagation();
          var index = $dropdownInSideMenu.index(this);
          var $this = $(this);
          timer[index] = setTimeout(function(){$this.find('.dropdown-menu').slideUp(function(){
          }); $this.removeClass("opened-drpdn"); },1000); 
        }else{
          $(this).find(".dropdown-menu").show().stop(true, true).fadeOut(300); 
        }
      });
    }
   //Dropdown in side menu-end

//hide/showAll-start
  $displayAllButton = $(".display-all-toggle-button-wrap>.display-all-toggle-button");
  var maxHeightOnClosed = 80;
  function displayHideStart(){
      $displayAllButton.each(function(index) {
        var attr = $(this).attr('data-height-on-closed');
        var maxHeightOnClosedThis = maxHeightOnClosed;
        if(attr){
          maxHeightOnClosedThis = attr;
        }
        var $displayAllWrap = $(this).parent().parent().find(".display-all-toggle-wrap");
        if($displayAllWrap.height()<=maxHeightOnClosedThis){
          $(this).parent().css("display","none");
        }else{
            if($displayAllWrap.hasClass("closed")){
              if($displayAllWrap.height()>maxHeightOnClosedThis){$displayAllWrap.css("height",maxHeightOnClosedThis+"px");}
            }
        }
     });
  }
  function displayHideClick(e){
        e.preventDefault();
        e.stopPropagation();
        var attr = $(this).attr('data-height-on-closed');
        var maxHeightOnClosedThis = maxHeightOnClosed;
        if(attr){
          maxHeightOnClosedThis = attr;
        }
        var $displayAllWrap = $(this).parent().parent().find(".display-all-toggle-wrap");
        $displayAllWrap.toggleClass("closed");
        if($displayAllWrap.hasClass("closed")){
          $(this).text("Развернуть");
          $displayAllWrap.animate({
            height:maxHeightOnClosedThis+"px"
          },300);
        }else{
          $(this).text("Свернуть");
            $displayAllWrap.css("height","auto");
            var thisHeight = $displayAllWrap.height();
            $displayAllWrap.css("height",maxHeightOnClosedThis+"px").animate({
                height:thisHeight+"px"
            },300);     
        }
  }
  displayHideStart();
  $(window).on("resize",function(e){
      $displayAllButton.parent().css("display","");
      $displayAllButton.each(function(index) {
        var attr = $(this).attr('data-height-on-closed');
        var maxHeightOnClosedThis = maxHeightOnClosed;
        if(attr){
          maxHeightOnClosedThis = attr;
        }
        var $displayAllWrap = $(this).parent().parent().find(".display-all-toggle-wrap");
        $displayAllWrap.css("height","auto");
          if($displayAllWrap.height()<=maxHeightOnClosedThis){
            $(this).parent().css("display","none");
          }else{
              if($displayAllWrap.hasClass("closed")){
                if($displayAllWrap.height()>maxHeightOnClosedThis){$displayAllWrap.css("height",maxHeightOnClosedThis+"px");}
              }
          }
       
      }); 
  });
  $( "body" ).delegate(".display-all-toggle-button-wrap>.display-all-toggle-button", "click", displayHideClick);
//hide/showAll-end 
  /*Fixed-top navbar*/
     //Dropdown in side menu-end


  //Fixed table-of-contents - START
  var tableOfContentsWrapper = document.getElementById("table-of-contents-wrapper");
  var tableOfContThereIs = true;
  if(tableOfContentsWrapper==null){tableOfContThereIs=false;}
  var $tableOfContents = $("#table-of-contents-wrapper .block-table-of-contents");
  function fixedTableOfContents(e){
     var docscroll = $(document).scrollTop();
     var tableGetTop = tableOfContentsWrapper.getBoundingClientRect().top;
     var borderTopToFix;
     if($("#header-block .navbar").hasClass("navbar-fixed-top-custom")){
       borderTopToFix = $("#header-block .navbar").height(); 
     }else{
       borderTopToFix = 0;
     }
     if(tableGetTop<=borderTopToFix && !$tableOfContents.hasClass("fixed-table-contents")){
         var tableOfContHeight = $(tableOfContentsWrapper).height();
         $(tableOfContentsWrapper).css("height", tableOfContHeight+"px");
        $tableOfContents.addClass("fixed-table-contents").css("top",borderTopToFix+"px");
     }else if(tableGetTop>borderTopToFix && $tableOfContents.hasClass("fixed-table-contents")){
        $tableOfContents.removeClass("fixed-table-contents");
        $(tableOfContentsWrapper).css("height","");
     } 
  }
   
  $tableOfContents.find('a[href^="#"]').click(function(){
      //Сохраняем значение атрибута href в переменной:
      var target = $(this).attr('href');
      $('html, body').animate({scrollTop: $(target).offset().top}, 400);
      return false;
  }); 

  //Fixed table-of-contents - END
    //Fixed header-start

  function headerFixedToScroll(e) {
      if ($(window).width() >= 992) {
          e.stopPropagation();
          var docscroll = $(document).scrollTop();
          if(docscroll>350 && !$("#header-block .navbar").hasClass("navbar-fixed-top-custom")){
             var headerHeight = $("#header-block").height();
             $("#header-block").css("height", headerHeight+"px");
             $("#header-block .navbar").addClass("navbar-fixed-top-custom");
             var navbarHeight = $("#header-block .navbar").height();
             $("#header-block .navbar").css("top","-"+navbarHeight+"px").animate({"top":"0px"},function(){
               if($tableOfContents.hasClass("fixed-table-contents")){
                 var navBarHeight = $("#header-block .navbar").height();
                 $tableOfContents.css("top",navBarHeight+"px");
               }
             });
             if($tableOfContents.hasClass("fixed-table-contents")){
               $tableOfContents.animate({"top" : navbarHeight+"px"});
             }
          }else if(docscroll<=300 && $("#header-block .navbar").hasClass("navbar-fixed-top-custom")) {
             $("#header-block .navbar").stop(true,true).removeClass("navbar-fixed-top-custom");   
             $("#header-block").css("height",""); 
             if(tableOfContThereIs){$tableOfContents.css("top","");}   
          }
      }
  }
  
  $(window).on('scroll',headerFixedToScroll);
  if(tableOfContThereIs){
    $(window).on('scroll',fixedTableOfContents);
  }
  $(window).on("resize",function(){
     if($(window).width() < 992){
       $("#header-block .navbar").removeClass("navbar-fixed-top-custom"); 
       $("#header-block").css("height","");
     }
  })
  //Fixed header-end



  //table-toggle-start
    function tableToggle(numberOfPoints){
      var toHide = "Свернуть прайс-лист";
      var toShow = "Открыть полный прайс-лист";

      var $tableWithPrices = $('.table-price-list-wrap>.table');

      $tableWithPrices.each(function(i) {
           var $trs = $(this).find("tbody>tr");
           var trsLength = $trs.length;
           var $tableToggleBtn = $(this).parent().find(".show-hide-all>a");
           if( trsLength<(numberOfPoints+1)){
              $tableToggleBtn.parent().css("display","none");
            }else{
              $(this).find('tbody>tr:nth-child(n+'+Number(numberOfPoints+1)+')').hide();
              $tableToggleBtn.text(toShow);
            } 
            function tableToggleRows(){ 
              $(this).find('tbody>tr:nth-child(n+'+Number(numberOfPoints+1)+')').fadeToggle(300);
            }
            $tableToggleBtn.click(function(e){
               e.preventDefault();
               e.stopPropagation();
               //scrollprice('[id^="price"]');
               $(this).parent().parent().find('tbody>tr:nth-child(n+'+Number(numberOfPoints+1)+')').fadeToggle(300);
               if($tableToggleBtn.text()==toHide){
                    $tableToggleBtn.text(toShow);
                }else{
                    $tableToggleBtn.text(toHide);
                }
            });
      });
    }
    tableToggle(4);
   //table-toggle-end

}); 


