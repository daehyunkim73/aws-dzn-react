import React, { useCallback, useEffect } from "react";
import close_btn from "../../../image/Center/Close_btn/close_btn.png";
import Axios from "axios";
import { Server_ajax_get, Server_ajax_post } from "../../../server_ajax";
/* 판매 개시 전 서비스의 경우 유료회원이나 결제가 없는 경우  */

const Service_First_member_popup = (props) => {
  const { pullidx } = props;
  const { pulltitle } = props;
  const { setSave_logic } = props;
  const deleteConfirm = () => {
    console.log("yes", pullidx);
    let body = {
      pullidx: pullidx,
    };
    (async function () {
      try {
        await Server_ajax_post("svccenter/service_product_delete", body);
        await Server_ajax_post(
          "svccenter/service_product_delete_saleImg",
          body
        );
        await Server_ajax_post(
          "svccenter/service_product_delete_saleInfo",
          body
        );
        await Server_ajax_post("svccenter/service_product_delete_api", body);
        await setSave_logic(true);
        await Image_close_popup();
      } catch (e) {
        return console.error("ㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷ", e);
      }
    })();
    // Axios.post("https://api.wehago.com/svccenter/service_product_delete", body)
    //   .then(() => {
    //     Axios.post(
    //       "https://api.wehago.com/svccenter/service_product_delete_saleImg",
    //       body
    //     )
    //       .then(() => {
    //         Axios.post(
    //           "https://api.wehago.com/svccenter/service_product_delete_saleInfo",
    //           body
    //         )

    //           .then(() => {
    //             Axios.post(
    //               "https://api.wehago.com/svccenter/service_product_delete_api",
    //               body
    //             )

    //               .then(() => {
    //                 console.log("bb");
    //               })

    //               .catch((e) => {
    //                 console.error(e);
    //               });
    //           })

    //           .catch((e) => {
    //             console.error(e);
    //           });
    //       })

    //       .catch((e) => {
    //         console.error(e);
    //       });
    //   })
    //   .finally(() => {
    //     setSave_logic(true);
    //     Image_close_popup();
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
  };
  const Image_close_popup = useCallback(() => {
    const Data_delete_popup_v1 = document.getElementById(
      "Service_delete_popup_v1"
    );
    Data_delete_popup_v1.style.display = "none";
  }, []);
  return (
    <React.Fragment>
      <div className="smae_popup_bgk_big_box" id="Service_delete_popup_v1">
        <div className="Buy_make_popup_white_box">
          <div className="Data_delete_small_white_box">
            <div className="Buy_popup_uploda_headLine_box">
              <div className="Buy_popup_head_line_box">
                <h1>{pulltitle}</h1>
                <div className="Buy_popupClose_box">
                  <img onClick={Image_close_popup} src={close_btn} alt="" />
                </div>
              </div>
            </div>
            <div
              className="question_uploade_nav_box"
              id="Buy_popupClose_nav_box"
            >
              <div className="popup_Contents_box">
                <p>
                  해당 서비스를 삭제하시면 복구 되지
                  <br />
                  않습니다. 삭제하시겠습니까?
                </p>
              </div>

              <div className="one_ok_button_box">
                <button className="fail_btn_popup" onClick={Image_close_popup}>
                  취소
                </button>
                <button
                  className="ok_btn_popup"
                  id="delete_btn"
                  onClick={deleteConfirm}
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

export default Service_First_member_popup;
