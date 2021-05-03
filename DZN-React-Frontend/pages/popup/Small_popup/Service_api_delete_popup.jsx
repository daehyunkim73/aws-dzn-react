import React, { useCallback, useEffect } from "react";
import close_btn from "../../../image/Center/Close_btn/close_btn.png";
import axios from "axios";
import { useServiceSalesContext } from "../../Service_center/service_product_detail_management/service_product_detail_management";
import { useServiceSalesContext_sale } from "../../Service_center/service_sale_product_detail_management/service_product_detail_management";
import { useHistory } from "react-router";
import { Server_ajax_post } from "../../../server_ajax";

/* 구매 / 제작 데이터 > 노출함을 설정했을때 뜨는 팝업  PPT 14페이지  */

const Service_Api_delete_popup = (props) => {
  const svc_url = useHistory();

  const { setService_pop_yn_state } =
    svc_url.location.pathname.indexOf("saleproduct") !== -1
      ? useServiceSalesContext_sale()
      : useServiceSalesContext();

  const { Delete_api_info, Delete_api_info_func, Delete_api_checked } = props;

  const Image_close_popup = useCallback(() => {
    const Service_api_delete_popup_bgk = document.getElementById(
      "Service_api_delete_popup_bgk"
    );
    Service_api_delete_popup_bgk.style.display = "none";
  }, []);

  const Useapi_delete = useCallback(async () => {
    let body = {
      delete_api_info: Delete_api_info,
    };

    try {
      await Server_ajax_post(`svccenter/service_use_api_delete`, body);
      console.log(
        "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
        body.delete_api_info
      );
      Delete_api_info_func([]);
      setService_pop_yn_state(true);
      const Service_api_delete_popup_bgk = document.getElementById(
        "Service_api_delete_popup_bgk"
      );
      Service_api_delete_popup_bgk.style.display = "none";

      setService_pop_yn_state(false);
      Delete_api_checked.current.filter((c) => {
        if (c.checked === null) {
          return;
        } else {
          c.checked = false;
        }
      });
    } catch (e) {
      return console.error(e);
    }

    // axios
    //   .post("https://api.wehago.com/svccenter/service_use_api_delete", body)
    //   .then(() => {
    //     Delete_api_info_func([]);
    //     setService_pop_yn_state(true);
    //     const Service_api_delete_popup_bgk = document.getElementById(
    //       "Service_api_delete_popup_bgk"
    //     );
    //     Service_api_delete_popup_bgk.style.display = "none";
    //   })
    //   .finally(() => {
    //     setService_pop_yn_state(false);
    //     Delete_api_checked.current.filter((c) => {
    //       if (c.checked === null) {
    //         return;
    //       } else {
    //         c.checked = false;
    //       }
    //     });
    //   })
    //   .catch((e) => {
    //     return console.error(e);
    //   });
  }, [Delete_api_info]);

  return (
    <React.Fragment>
      <div className="smae_popup_bgk_big_box" id="Service_api_delete_popup_bgk">
        <div className="Buy_make_popup_white_box">
          <div className="Data_delete_small_white_box">
            <div className="Buy_popup_uploda_headLine_box">
              <div className="Buy_popup_head_line_box">
                <h1>API 삭제</h1>
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
                  API 삭제 후 재사용하시려면 승인절차를
                  <br />
                  거쳐 사용승인 후 사용하실 수 있습니다.
                  <br />
                  삭제하시겠습니까?
                </p>
              </div>

              <div className="one_ok_button_box">
                <button className="fail_btn_popup" onClick={Image_close_popup}>
                  취소
                </button>
                <button
                  className="ok_btn_popup"
                  id="delete_api_btn"
                  onClick={Useapi_delete}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Service_Api_delete_popup;
