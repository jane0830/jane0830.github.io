$(document).ready(function(){
  $(".fas").on("click", function(){
    $("nav ul").toggleClass("showing");
  });
  $("nav ul li").on("click", function(){
    $("nav ul").removeClass("showing");
  });
});
