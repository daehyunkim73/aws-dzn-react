import React, { useCallback, useEffect, useState } from "react";
import close_btn from "../../../image/Center/Close_btn/close_btn.png";
import { useLocation } from "react-router";
import { useServiceSalesContext_sale } from "../../Service_center/service_sale_product_detail_management/service_product_detail_management";
import { useServiceSalesContext } from "../../Service_center/service_product_detail_management/service_product_detail_management";
import { Server_ajax_post } from "../../../server_ajax";
/* 구매 / 제작 데이터 > 노출함을 설정했을때 뜨는 팝업  PPT 14페이지  */

const Exposure_popup = (props) => {
  const { show_gbn, setShow_gbn, setShow_gbn_svc, dataSave } = props;

  const [popupCloseEvt, setPopupCloseEvt] = useState(false);
  let location = useLocation();
  const { setSvcGbnState } =
    location.pathname.indexOf("saleproduct") !== -1
      ? useServiceSalesContext_sale()
      : useServiceSalesContext();
  const Image_close_popup = useCallback(() => {
    if (location.pathname.indexOf("datacenter") !== -1) {
      props.setShow_gbn("Y");
    }
    const Data_list_popup_bgk = document.getElementById(
      "Data_Exposure_popup_v2"
    );
    Data_list_popup_bgk.style.display = "none";
  }, []);

  useEffect(() => {
    if (popupCloseEvt === true) {
      let body = {
        pdsvc_idx: dataSave[0].pdsvc_idx,
        show_gbn: "N",
      };

      (async function () {
        try {
          await Server_ajax_post(`svccenter/sales_gbn_save`, body);
          setPopupCloseEvt(false);
          setSvcGbnState(true);
        } catch (e) {
          return console.error(e);
        }
      })();
    }
  }, [popupCloseEvt === true]);

  const setNotShowGbn = (e) => {
    if (location.pathname.indexOf("datacenter") !== -1) {
      // 데이터센터일때만
      props.setShow_gbn("Y");
    } else if (location.pathname.indexOf("svccenter") !== -1) {
      if (dataSave[0].stat === 5) {
        let body = {
          pdsvc_idx: dataSave[0].pdsvc_idx,
          stat: "6",
        };
        (async function () {
          try {
            await Server_ajax_post(`svccenter/sales_gbn`, body);
            setShow_gbn_svc("N");
            setPopupCloseEvt(true);
          } catch (e) {
            return console.error(e);
          }
        })();
      }
    }
    const Data_list_popup_bgk = document.getElementById(
      "Data_Exposure_popup_v2"
    );
    Data_list_popup_bgk.style.display = "none";
  };

  return (
    <React.Fragment>
      <div className="smae_popup_bgk_big_box" id="Data_Exposure_popup_v2">
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
                  노출안함을 설정할 경우 데이터유통포털에
                  <br />
                  <span>판매가 중지됩니다.</span> 설정하시겠습니까?
                  <br />
                </p>
              </div>

              <div className="one_ok_button_box">
                <button className="fail_btn_popup" onClick={Image_close_popup}>
                  취소
                </button>
                <button
                  className="ok_btn_popup"
                  id="delete_btn"
                  onClick={setNotShowGbn}
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

export default Exposure_popup;
