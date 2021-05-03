import React, { useCallback } from "react";
import close_btn from "../../../image/Center/Close_btn/close_btn.png";
import { useServiceSalesContext } from "../../Service_center/service_product_detail_management/service_product_detail_management";
import Axios from "axios";
import { useEffect } from "react";
import { Server_ajax_post, Image_uploade } from "../../../server_ajax";
/* 필수 항목을 다 안적었을때   */

const Data_Approved_Req_popup = (props) => {
  const { dataSave, setApprvLogic } = useServiceSalesContext();
  const { upload_file } = props;
  const { upload_file_name } = props;
  const service_judge = () => {
    let pdsvc_idx = dataSave[0].pdsvc_idx;

    let body = {
      filePath: null,
      stat_gbn: "0",
      pdsvc_idx: pdsvc_idx,
      upload_file_name: upload_file_name,
    };

    if (upload_file_name !== "") {
      (async function () {
        try {
          const result = await Image_uploade(upload_file, 'backoffice', 'C') //첫번째 인자: 파일 정보, 두번째 인자: service_code, 세번째 인자: S: 서비스, C: 회사, U: 사용자*비동기임*
          body.filePath = result;
          (async function () {
            try {
              const result = await Server_ajax_post(
                `svccenter/judge_req`,
                body
              );
              console.log("첨부파일 보내기 성공", result);
              setApprvLogic(true);
            } catch (e) {
              return console.error(e);
            }
          })();
        } catch (e) {
          return console.error(e);
        }
      })();
    } else {
      (async function () {
        try {
          const result = await Server_ajax_post(`svccenter/judge_req`, body);
          console.log("첨부파일없이 성공", result);
          setApprvLogic(true);
        } catch (e) {
          return console.error(e);
        }
      })();
    }

    Image_close_popup();
  };

  const Image_close_popup = useCallback(() => {
    const Data_Approved_Req_popup = document.getElementById(
      "Data_Approved_Req_popup"
    );
    Data_Approved_Req_popup.style.display = "none";
  }, []);
  return (
    <React.Fragment>
      <div className="smae_popup_bgk_big_box" id="Data_Approved_Req_popup">
        <div className="Buy_make_popup_white_box">
          <div className="popup_small_white_box" id="Approved_req_white_box">
            <div className="Small_popup_box">
              <div className="Buy_popup_head_line_box">
                <h1>승인(판매) 요청</h1>
                <div className="Buy_popupClose_box">
                  <img onClick={Image_close_popup} src={close_btn} alt="" />
                </div>
              </div>

              <div className="small_Popup_text" id="Buy_popupClose_nav_box">
                <div className="popup_Contents_box">
                  <p>
                    작성한 내용으로 승인 심사를 요청하시겠습니까?
                    <br />
                    관리자가 승인하는데 시간이 소용됩니다. <br />
                    승인 후 판매를 게시할 수 있습니다.
                  </p>
                </div>

                <div className="one_ok_button_box">
                  <button
                    onClick={Image_close_popup}
                    className="fail_btn_popup"
                  >
                    취소
                  </button>
                  <button
                    className="ok_popup_btn"
                    id="sp_ok_btn"
                    onClick={service_judge}
                  >
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

export default Data_Approved_Req_popup;
