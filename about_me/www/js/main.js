$(document).ready(function() {
  let header = $("#header"),
      mainH = $("#main").innerHeight(),
      scrollOffset = $(window).scrollTop();
  checkScroll(scrollOffset);
  $(window).on("scroll", function () {
    scrollOffset = $(this).scrollTop();
    checkScroll(scrollOffset);
  });

  function checkScroll(scrollOffset) {
    if ($("#content").hasClass('main_page')) {
      if (scrollOffset >= mainH / 2) {
        header.addClass("fixed");
      } else {
        header.removeClass("fixed");
      }
    }
  }

  $(document).on('click', "#see_more", function () {

    $([document.documentElement, document.body]).animate({
      scrollTop: $("#main_next").offset().top
    }, 500);
  });


  $("#header_logo").click(function () {
    if ($("#content").hasClass('main_page')) {
      $([document.documentElement, document.body]).animate({
        scrollTop: $("#main").offset().top
      }, 500);
    }
  });
})




