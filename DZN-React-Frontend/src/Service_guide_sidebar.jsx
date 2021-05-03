function Service_guide_sidebar_Big() {
  $(".guid_list_box > li").on("click", function () {
    $(".guid_list_box > li").removeClass("sidebar_click");
    $(this).addClass("sidebar_click");
  });

  $(".guid_list_box > li")
    .mouseenter(function () {
      $(this).addClass("sidebar_hover");
    })
    .mouseleave(function () {
      $(this).removeClass("sidebar_hover");
    });
}

export default Service_guide_sidebar_Big;
