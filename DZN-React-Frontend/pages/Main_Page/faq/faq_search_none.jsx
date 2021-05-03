import React from "react";
import None_search from "../../../image/Dev_Center/question/search_none.png";
const Faq_search_none = () => {
  // $('.pagination_wrap').css("display", "none");
  return (
    <React.Fragment>
      <div>
        <div className="faq_select_btn_wrap">
          <label class="btn btn-outline-primary active">
            <input type="radio" name="faqRadioBtn" value="all" />
            <p>전체보기</p>
          </label>
          <label class="btn btn-outline-primary">
            <input type="radio" name="faqRadioBtn" value="faq_radio2" />
            <p>데이터 개발</p>
          </label>
          <label class="btn btn-outline-primary">
            <input type="radio" name="faqRadioBtn" value="faq_radio3" />
            <p>서비스 개발</p>
          </label>
          <label class="btn btn-outline-primary">
            <input type="radio" name="faqRadioBtn" value="faq_radio4" />
            <p>API 이용/관리</p>
          </label>
        </div>
        <div className="faq_select_btn_wrap faq_select_bottom_wrap">
          <label class="btn btn-outline-primary">
            <input type="radio" name="faqRadioBtn" value="faq_radio5" />
            <p>결제/정산</p>
          </label>
          <label class="btn btn-outline-primary">
            <input type="radio" name="faqRadioBtn" value="faq_radio6" />
            <p>기타</p>
          </label>
          <label class="btn btn-outline-primary">
            <input type="radio" name="faqRadioBtn" value="faq_radio7" />
            <p>(추가)</p>
          </label>
          <label class="btn btn-outline-primary">
            <input type="radio" name="faqRadioBtn" value="faq_radio8" />
            <p>(추가)</p>
          </label>
        </div>
      </div>
      <div className="faq_none_wrap">
        <div className="faq_content_title">
          <p>'OO' 검색 API 내용</p>
        </div>
        <div className="faq_table">
          <div className="content_list_none">
            <img src={None_search} />
            <br />
            <span>검색된 결과가 없습니다.</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Faq_search_none;
