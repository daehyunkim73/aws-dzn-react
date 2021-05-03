import React, { useCallback } from "react";
import close_btn from "../../../image/Center/Close_btn/close_btn.png";
import { useUsageInfo } from "../../Center/Service_center_router";

/* 구매/제작 데이터 > 기본정보 팝업 PPT 12페이지 */

const service_infra_popup = () => {
  const { setSalesInfraTabReqVal } = useUsageInfo();

  const Image_close_popup = useCallback(() => {
    const Service_infra_small_bgk_popup = document.getElementById(
      "Service_infra_small_bgk_popup"
    );
    Service_infra_small_bgk_popup.style.display = "none";
    setSalesInfraTabReqVal("infra_req");
  }, []);

  return (
    <React.Fragment>
      <div
        className="smae_popup_bgk_big_box"
        id="Service_infra_small_bgk_popup"
      >
        <div className="Buy_make_popup_white_box">
          <div className="popup_small_white_box">
            <div className="Small_popup_box">
              <div className="Buy_popup_head_line_box">
                <h1>사용 인프라 서비스</h1>
                <div className="Buy_popupClose_box">
                  <img onClick={Image_close_popup} src={close_btn} alt="" />
                </div>
              </div>

              <div className="small_Popup_text" id="Buy_popupClose_nav_box">
                <div className="popup_Contents_box">
                  <p>
                    사용중인 인프라 서비스가 없습니다. <br />
                    먼저 인프라 서비스를 신청하세요.
                  </p>
                </div>

                <div className="popup_button_box">
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

export default service_infra_popup;
