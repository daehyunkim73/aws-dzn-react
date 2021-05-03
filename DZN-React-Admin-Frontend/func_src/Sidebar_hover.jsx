function Dev_Side_bar() {
    $('.nav_small_text_box').on('click', function () {
        $('.nav_small_text_box').removeClass('sidebar_click');
        $(this).addClass('sidebar_click');
        // $(".nav_small_text_box").children("p").children("span").css({
        //     "color":"#cdcdcd"
        // });
        // $(this).children("p").children("span").css({
        //     "color":"#fff"
        // });
    });

    $('.nav_small_text_box').hover(function () {
        $(this).addClass('sidebar_hover');
    }).mouseleave(function () {
        $(this).removeClass('sidebar_hover');
    })
}

export default Dev_Side_bar;