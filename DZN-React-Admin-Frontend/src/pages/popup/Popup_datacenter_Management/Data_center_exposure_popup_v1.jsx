import React, { useCallback } from "react";
import close_btn from "../../../../image/Center/Close_btn/close_btn.png";
import { useLocation } from "react-router";

const Data_center_exposure_popup_v1 = ({ setShowGbnStat }) => {
  let location = useLocation();

  const Image_close_popup = useCallback(() => {
    const Admin_user_datacenter_mang_popup_bgk_v1 = document.getElementById(
      "Admin_user_datacenter_mang_popup_bgk_v1"
    );
    Admin_user_datacenter_mang_popup_bgk_v1.style.display = "none";
  }, []);

  const setShowGbn = (e) => {
    if (location.pathname.indexOf("datainfo") !== -1) {
      // 데이터센터일때만
      setShowGbnStat("data");
    } else if (location.pathname.indexOf("svcinfo") !== -1) {
      // 서비스센터일때만
      setShowGbnStat("svc");
    }
    Image_close_popup();
  };

  return (
    <React.Fragment>
      <div
        className="admin_background_same_box"
        id="Admin_user_datacenter_mang_popup_bgk_v1"
      >
        <div className="admin_pixed_popup_white_box">
          <div className="admin_small_white_box">
            <div className="admin_popup_head_line_box">
              <h1>노출 설정</h1>
              <div className="admin_popupClose_box">
                <img onClick={Image_close_popup} src={close_btn} alt="" />
              </div>
            </div>

            <div className="admin_big_contents_box">
              <div
                className="admin_popup_Contents_box"
                id="admin_popup_sp_text_box"
              >
                <p>
                  노출함을 설정할 경우 데이터유통포털에
                  <br />
                  <span>판매가 게시됩니다.</span> 설정하시겠습니까?
                </p>
              </div>

              <div className="admin_popup_button_box">
                <button
                  className="admin_popup_first_btn"
                  onClick={Image_close_popup}
                >
                  취소
                </button>
                <button
                  className="admin_popup_second_btn"
                  id="contents_post_btn_v1"
                  onClick={setShowGbn}
                >
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

export default Data_center_exposure_popup_v1;
