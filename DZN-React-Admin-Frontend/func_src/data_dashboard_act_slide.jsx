function data_dashboard_act_slide() {
  let create_el_cnt = 1;
  while (create_el_cnt <= 15) {
    $(
      `
              <div class="working_activity_box clearfix">
               <div class="working_activity_info_wrap clearfix">
                 <p class="working_activity_nickname">user001</p>
                 <p class="working_activity_date">2020.02.01 00:00</p>
                 <div class="working_activity_type">
                   <p class="wise">
         WISE
        </p>
                 </div>
                 <p class="working_activity_info">
                   현재 기업재무데이터를 활용한 부도예측모형 진행 중입니다.
                 </p>
               </div>
               <div class="working_wrap">
                 <div class="working_activity_graph">
                   <p class="working_activity_graph_title">진행률</p>
                   <p class="working_activity_graph_number">60%</p>
                   <div>
                     <span data-val="10%">&nbsp;</span>
                   </div>
                 </div>
               </div>
             </div>`
    ).appendTo($(".working_activity "));

    create_el_cnt++;
  }

  var rowPerPage = 3;

  var working_activity = $(".working_activity");

  var working_activity_box = $(working_activity).find(
    $(".working_activity_box")
  );
  var rowTotals = working_activity_box.length;

  if (rowTotals > 3) {
    $(`<div class="act_arrow">
  <img
    class="act_arrow_img act_prev_arrow_img"
    src="../image/Center/Dashboard/main_left.png"
    alt="left"
  />
  <img
    class="act_arrow_img act_next_arrow_img"
    src="../image/Center/Dashboard/main_right.png"
    alt="right"
  />
</div>`).appendTo($("#act_title_slide"));
  }

  working_activity_box
    .addClass("ds_none")
    .slice(0, rowPerPage)
    .removeClass("ds_none");
  var pageTotal = Math.ceil(rowTotals / rowPerPage);

  var $paging_next_Link = $(".act_next_arrow_img");
  var $paging_prev_Link = $(".act_prev_arrow_img");
  let currPage = 0;
  $paging_next_Link.on("click", function (evt) {
    currPage++;
    if (currPage == pageTotal) {
      currPage = 0;
    }
    evt.preventDefault();

    var startItem = currPage * rowPerPage;
    var endItem = startItem + rowPerPage;

    working_activity_box
      .siblings()
      .css("opacity", "0.0")
      .addClass("ds_none")
      .slice(startItem, endItem)
      .removeClass("ds_none")
      .animate({ opacity: 1 }, 300);
    $(".slide_now").text(currPage + 1);
  });
  $paging_prev_Link.on("click", function (evt) {
    currPage--;
    if (currPage == -1) {
      currPage = pageTotal - 1;
    }
    evt.preventDefault();

    var startItem = currPage * rowPerPage;
    var endItem = startItem + rowPerPage;

    working_activity_box
      .siblings()
      .css("opacity", "0.0")
      .addClass("ds_none")
      .slice(startItem, endItem)
      .removeClass("ds_none")
      .animate({ opacity: 1 }, 300);
    $(".slide_now").text(currPage + 1);
  });
  if (rowTotals > 3) {
    $(
      `<div class="slide_cnt">
<span class="slide_now">` +
        (currPage + 1) +
        `</span>/
<span class="slide_max">` +
        pageTotal +
        `</span>
</div>`
    ).appendTo($("#act_title_slide"));
  }
}

export default data_dashboard_act_slide;
