import React from "react";
import Data_Aprroved from "../../popup/Small_popup/Data_Approved_req_popup";
import close_btn from "../../../image/Center/Close_btn/close_btn.png";

const Judge_none = () => {
  const Approved_req_Popup_click = () => {
    const Approved_req_Popup = document.getElementById(
      "Data_Approved_Req_popup"
    );
    Approved_req_Popup.style.display = "table";
  };
  return (
    <React.Fragment>
      <Data_Aprroved />
      <div className="judge_table_top">
        <div className="judge_table_title">승인심사요청</div>
        <div className="judge_table">
          <div className="judge_table_left judge_table_float_left">
            <div>제목</div>
            <div>카테고리/유형</div>
            <div>결제방식</div>
            <div>문의/안내 연락처</div>
            <div>파일 첨부</div>
          </div>
          <div className="judge_table_right">
            <div>세금아 안녕</div>
            <div>회계/Web Service</div>
            <div>유료 / 월정액 요금제</div>
            <div>1588-1234</div>
            <div>
              <div className="file_wrap">
                <input type="file" id="file_check" />
                <label className="file_btn" htmlFor="file_check">
                  파일선택
                </label>
              </div>
              <div>
                <p>Asdafdafs.doc</p>
                <img src={close_btn} alt="close" />
              </div>
              <p>※ 기타 심사에 필요한 사항이 있을 경우 파일을 첨부해주세요.</p>
            </div>
          </div>
        </div>
        <div className="judge_table_top_btn judge_table_btn judge_table_none_btn">
          <button>목록</button>
          <button onClick={Approved_req_Popup_click}>재승인 요청</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Judge_none;
