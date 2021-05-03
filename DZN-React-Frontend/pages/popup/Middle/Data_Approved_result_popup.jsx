import React, { useCallback } from "react";

// 이미지 import
import close_btn from "../../../image/Center/Close_btn/close_btn.png";

/* 서비스 상품관리 > 승인심사  */

const Data_Approved_result_popup = (props) => {
  const { approval_review } = props;
  const imageclose_click = () => {
    const Data_list_popup_bgk = document.getElementById(
      "Data_Approved_result_popup_v2"
    );
    Data_list_popup_bgk.style.display = "none";
  };
  return (
    <React.Fragment>
      <div
        className="smae_popup_bgk_big_box"
        id="Data_Approved_result_popup_v2"
      >
        <div className="Buy_make_popup_white_box">
          <div className="Data_Approved_small_white_box">
            <div className="Buy_popup_uploda_headLine_box">
              <div className="Buy_popup_head_line_box">
                <h1>승인심사 결과</h1>
                <div className="Buy_popupClose_box">
                  <img onClick={imageclose_click} src={close_btn} alt="" />
                </div>
              </div>
            </div>
            <div
              className="question_uploade_nav_box"
              id="Buy_popupClose_nav_box"
            >
              <div className="Sale_member_text_box">
                <p>다음과 같이 결과를 알려드립니다.</p>
              </div>
              <div className="Companion_box">반려</div>
              <div className="user_approved_result_popup">
                {/* <textarea disabled value={approval_review && approval_review[0].memo} /> */}
              </div>
              <div className="file_download_text_box">
                <p>첨부파일</p>
                <p>
                  <span id="Aprroved_result_data_box">
                    승인심사결과_0303.doc
                  </span>
                </p>
              </div>
              <div className="one_ok_button_box">
                <button onClick={imageclose_click} className="ok_btn_popup">
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Data_Approved_result_popup;
