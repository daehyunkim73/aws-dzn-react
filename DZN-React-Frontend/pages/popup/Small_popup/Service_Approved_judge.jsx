import React, { useCallback } from "react";
import close_btn from "../../../image/Center/Close_btn/close_btn.png";
import { useServiceSalesContext_sale } from "../../Service_center/service_sale_product_detail_management/service_product_detail_management";
import Axios from "axios";
import { useEffect } from "react";
import { Server_ajax_post, Image_uploade } from "../../../server_ajax";
import Big_date from "../../../src/now_date";
const Approved_Popup = (props) => {
  const { dataSave, setApprvLogic } = useServiceSalesContext_sale();
  const { upload_file } = props;
  const { upload_file_name } = props;
  const { memo_req } = props;
  const { rereq_reason_p } = props;
  const { rereq_reason_e } = props;
  const Image_close_popup = useCallback(() => {
    const Service_judge_popup_bgk = document.getElementById(
      "Service_judge_popup_bgk"
    );
    Service_judge_popup_bgk.style.display = "none";
  }, []);
  const service_judge = () => {
    // const cal_Date = new Big_date();

    let pdsvc_idx = dataSave[0].pdsvc_idx;
    let body = {
      filePath: null,
      stat_gbn: "1",
      rereq_reason: "1",
      pdsvc_idx: pdsvc_idx,
      memo_req: memo_req,
      rereq_reason_p: rereq_reason_p,
      rereq_reason_e: rereq_reason_e,
      upload_file_name: upload_file_name,
    };

    if (upload_file_name !== "") {
      (async function () {
        try {
          const judge_file = await Image_uploade(upload_file, 'backoffice', 'C') //첫번째 인자: 파일 정보, 두번째 인자: service_code, 세번째 인자: S: 서비스, C: 회사, U: 사용자*비동기임*
          if (judge_file) {
            body.filePath = judge_file;
            const rejudge_req = await Server_ajax_post(
              `svccenter/rejudge_req`,
              body
            );
            if (rejudge_req) {
              setApprvLogic(true);
            }
          }
          setApprvLogic(true);
        } catch (e) {
          return console.error(e);
        }
      })();
    } else {
      (async function () {
        try {
          await Server_ajax_post(`svccenter/rejudge_req`, body);
          setApprvLogic(true);
        } catch (e) {
          return console.error(e);
        }
      })();
    }

    Image_close_popup();
  };
  return (
    <React.Fragment>
      <div className="smae_popup_bgk_big_box" id="Service_judge_popup_bgk">
        <div className="Buy_make_popup_white_box">
          <div className="Data_delete_small_white_box">
            <div className="Buy_popup_uploda_headLine_box">
              <div className="Buy_popup_head_line_box">
                <h1>승인심사 요청</h1>
                <div className="Buy_popupClose_box">
                  <img onClick={Image_close_popup} src={close_btn} alt="" />
                </div>
              </div>
            </div>

            <div className="question_uploade_nav_box">
              <div className="Approved_Popup_text_box">
                <p>
                  작성한 내용으로 승인심사를 요청하시겠습니까? <br />
                  관리자가 승인하는데 시간이 소요됩니다. <br />
                  승인 후 수정된 내용으로 적용됩니다.
                </p>
              </div>
              <div className="one_ok_button_box">
                <button className="fail_btn_popup" onClick={Image_close_popup}>
                  취소
                </button>
                <button
                  className="ok_btn_popup"
                  id="judeg_ok_popup"
                  onClick={service_judge}
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

export default Approved_Popup;
