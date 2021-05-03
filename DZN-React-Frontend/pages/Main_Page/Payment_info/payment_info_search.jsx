import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import DataPicker_Calendar from "../component/datapicker_calendar";

const Payment_info_search_asdnasdasd = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <React.Fragment>
      <div className="input_wrap">
        <div className="page_title_wrap payment_info_wrap">
          <p className="page_title">결제정보관리</p>
          <div className="page_title_btn">
            <p>Home</p>
            <img
              className="caption_img"
              src="../image/Center/Dashboard/view_more.png"
            />
            <p>회사설정</p>
            <img
              className="caption_img"
              src="../image/Center/Dashboard/view_more.png"
            />
            <p>결제정보관리</p>
          </div>
        </div>
        <div className="user_list_wrap">
          <div className="input_box_wrap">
            <div className="input_box white_border">검색기간</div>
            <div className="input_box">상세검색</div>
          </div>
          <div className="input_form_wrap">
            <div className="input_form white_border">
              <DataPicker_Calendar />
              <Form>
                <div className="service_key">
                  <button>7일</button>
                  <button className="search_active">1개월</button>
                  <button>3개월</button>
                  <button>6개월</button>
                  <button>1년</button>
                  <button>전체</button>
                </div>
              </Form>
            </div>

            <div className="input_form">
              <Form.Control
                type="text"
                className="form_input"
                placeholder="API 제목 입력"
              />
            </div>
          </div>
        </div>
        <div className="input_submit_wrap">
          <button className="search_btn" type="submit">
            검색
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Payment_info_search_asdnasdasd;
