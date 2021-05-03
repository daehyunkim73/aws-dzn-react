function svc_dashboard_act_slide() {
  let create_el_cnt = 1; //비교값
  while (create_el_cnt <= 4) {
    $(
      `
      <div class="working_activity_box">
      <div class="service_working_activity_api">
        <div>
          <p class="service_working_activity_api_type service_working_activity_api_type_create">
            제작 중
          </p>
          <p class="service_working_activity_api_text">
            세금 한방에 잡기
          </p>
        </div>
      </div>
      <div class="working_activity_info_wrap">
        <div class="working_activity_nickname_wrap">
          <p class="working_activity_nickname">
            카드 스크래핑 데이터를 활용한 계정 예측 모형 API
          </p>
        </div>
        <div class="working_activity_type">
          <p class="wise">호출</p>
        </div>
        <p class="working_activity_info">일 200,000</p>
        <div class="working_activity_type">
          <p class="wise">요금제</p>
        </div>
        <p class="working_activity_info">무료</p>
        <div class="working_activity_date">
          <img src={datepicker} alt="" />
          <p>2020.02.01 00:00</p>
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
</div>`).appendTo($("#svc_act_title_slide"));
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
      `<div class="slide_cnt svc_slide_cnt">
<span class="slide_now">` +
        (currPage + 1) +
        `</span>/
<span class="slide_max">` +
        pageTotal +
        `</span>
</div>`
    ).appendTo($("#svc_act_title_slide"));
  }
}

export default svc_dashboard_act_slide;
