
$(document).ready(function(){

   $(".input-text-item.width-cross .cross").on("click",function(){
      $(this).parent().find("input").val('');
   });

}); 


