import React, { useCallback } from "react";
import close_btn from "../../../image/Center/Close_btn/close_btn.png";
import { useLocation } from "react-router";

/* 구매 / 제작 데이터 > 노출함을 설정했을때 뜨는 팝업  PPT 14페이지  */

const Exposure_popup = (props) => {
  let location = useLocation();
  const { show_gbn, setShow_gbn, setShow_gbn_svc, setConfirm } = props;

  const Image_close_popup = useCallback(() => {
    if (location.pathname.indexOf("datacenter") !== -1) {
      // 데이터센터일때만
      setShow_gbn("N");      
    } else if (location.pathname.indexOf("svccenter") !== -1) {
      setShow_gbn_svc("N");
    }
    const Data_list_popup_bgk = document.getElementById(
      "Data_Exposure_popup_v1"
    );
    Data_list_popup_bgk.style.display = "none";
  }, []);

  const setShowGbn = (e) => {
    if (location.pathname.indexOf("datacenter") !== -1) {
      // 데이터센터일때만
      setShow_gbn("Y");
      setConfirm(true);
    } else if (location.pathname.indexOf("svccenter") !== -1) {
      setShow_gbn_svc("Y");
    }
    const Data_list_popup_bgk = document.getElementById(
      "Data_Exposure_popup_v1"
    );
    Data_list_popup_bgk.style.display = "none";
  };

  return (
    <React.Fragment>
      <div className="smae_popup_bgk_big_box" id="Data_Exposure_popup_v1">
        <div className="Buy_make_popup_white_box">
          <div className="Data_delete_small_white_box">
            <div className="Buy_popup_uploda_headLine_box">
              <div className="Buy_popup_head_line_box">
                <h1>노출 설정</h1>
                <div className="Buy_popupClose_box">
                  <img onClick={Image_close_popup} src={close_btn} alt="" />
                </div>
              </div>
            </div>
            <div
              className="question_uploade_nav_box"
              id="Buy_popupClose_nav_box"
            >
              <div className="popup_Contents_box" id="Exposure_text_box">
                <p>
                  노출함을 설정할 경우 데이터유통포털에
                  <br />
                  <span>판매가 게시됩니다.</span> 설정하시겠습까?
                </p>
              </div>

              <div className="one_ok_button_box">
                <button className="fail_btn_popup" onClick={Image_close_popup}>
                  취소
                </button>
                <button className="ok_btn_popup" onClick={setShowGbn}>
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

export default Exposure_popup;
