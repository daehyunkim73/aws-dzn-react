import React, { useCallback } from "react";
import close_btn from "../../../image/Center/Close_btn/close_btn.png";

/* 유료회원이나 결제가 있는 경우 */

const Service_delete_popup_v2 = (props) => {
  const { pulltitle } = props;
  const imageclose_click = useCallback(() => {
    const Data_delete_popup_v2 = document.getElementById(
      "Service_delete_popup_v2"
    );
    Data_delete_popup_v2.style.display = "none";
  }, []);
  return (
    <React.Fragment>
      <div className="smae_popup_bgk_big_box" id="Service_delete_popup_v2">
        <div className="Buy_make_popup_white_box">
          <div className="Data_delete_small_white_box">
            <div className="Buy_popup_uploda_headLine_box">
              <div className="Buy_popup_head_line_box">
                <h1>{pulltitle}</h1>
                <div className="Buy_popupClose_box">
                  <img onClick={imageclose_click} src={close_btn} alt="" />
                </div>
              </div>
            </div>
            <div
              className="question_uploade_nav_box"
              id="Buy_popupClose_nav_box"
            >
              <div className="popup_Contents_box">
                <p>
                  해당 서비스는
                  <br />
                  삭제할 수 없습니다.
                </p>
              </div>

              <div className="one_ok_button_box">
                <button className="fail_btn_popup" onClick={imageclose_click}>
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Service_delete_popup_v2;
