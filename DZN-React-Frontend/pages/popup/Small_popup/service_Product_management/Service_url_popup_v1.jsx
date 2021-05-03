import React, { useCallback } from "react";
import { Button } from "react-bootstrap";

// 이미지 import
import close_btn from "../../../../image/Center/Close_btn/close_btn.png";

/* 승인심사 요청 팝업  */

const Service_url_popup = () => {
  const Image_close_popup = useCallback(() => {
    const ServiceCenter_url_popup_bgk_v1 = document.getElementById(
      "ServiceCenter_url_popup_bgk_v1"
    );
    ServiceCenter_url_popup_bgk_v1.style.display = "none";
  }, []);
  return (
    <React.Fragment>
      <div
        className="smae_popup_bgk_big_box"
        id="ServiceCenter_url_popup_bgk_v1"
      >
        <div className="Buy_make_popup_white_box">
          <div className="popup_small_white_box">
            <div className="Small_popup_box">
              <div className="Buy_popup_head_line_box">
                <h1>서비스 URL</h1>
                <div className="Buy_popupClose_box">
                  <img onClick={Image_close_popup} src={close_btn} alt="" />
                </div>
              </div>

              <div className="small_Popup_text" id="Buy_popupClose_nav_box">
                <div className="popup_Contents_box">
                  <p>
                    증복되는 URL입니다.
                    <br />
                    다시 한번 입력해주 세요.
                  </p>
                </div>

                <div className="one_ok_button_box">
                  <button onClick={Image_close_popup} className="ok_popup_btn">
                    확인
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Service_url_popup;
