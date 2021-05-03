import React, { useCallback, useEffect } from "react";
import close_btn from "../../../../image/Center/Close_btn/close_btn.png";
import { useServiceSalesContext } from "../../Service_center_Management/Sales_Service_management";
import { Server_ajax_post, Image_uploade } from "../../../../Server_ajax";

const Judge_result_popup_svc = (props) => {
  const { upload_file } = props;
  const { upload_file_name } = props;
  const { JudegeRes } = props;
  const { memo_req } = props;
  const { dataSave, setApprvLogic } = useServiceSalesContext();
  const Image_close_popup = useCallback(() => {
    const Admin_user_servicecenter_judge_popup_bgk = document.getElementById(
      "Admin_user_servicecenter_judge_popup_bgk"
    );
    Admin_user_servicecenter_judge_popup_bgk.style.display = "none";
  }, []);
  const service_judge = () => {
    let pdsvc_idx = dataSave[0].pdsvc_idx;
    let svc_stat = dataSave[0].stat;
    let body = {
      filePath: null,
      pdsvc_idx: pdsvc_idx,
      memo_req: memo_req,
      upload_file_name: upload_file_name,
      JudegeRes: JudegeRes,
      svc_stat: svc_stat,
    };
    if (upload_file_name !== "") {
      (async function () {
        try {
          console.log("👍👍👍👍👍👍👍👍👍👍", upload_file)
          const result = await Image_uploade(upload_file, 'backoffice', 'C') //첫번째 인자: 파일 정보, 두번째 인자: service_code, 세번째 인자: S: 서비스, C: 회사, U: 사용자*비동기임*
          console.log(result,"✔✔✔✔✔✔✔✔✔");
          body.filePath = result;
          const result2 = await Server_ajax_post(
            "service_center_managment/judge_res",
            body
          );
          setApprvLogic(true);
        } catch (e) {
          return console.error(e);
        }
      })();
    } else {
      (async function () {
        try {
          const result = await Server_ajax_post(
            "service_center_managment/judge_res",
            body
          );
          setApprvLogic(true);
        } catch (e) {
          return console.error(e);
        }
      })();
    }
  };
  return (
    <React.Fragment>
      <div
        className="admin_background_same_box"
        id="Admin_user_servicecenter_judge_popup_bgk"
      >
        <div className="admin_pixed_popup_white_box">
          <div className="admin_small_white_box">
            <div className="admin_popup_head_line_box">
              <h1>심사결과서 제출</h1>
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
                  해당 내용으로 심사결과서를 제출하시 겠습니까?
                  <br />
                  제출 후는 수정이 불가능합니다.
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
                  onClick={service_judge}
                  id="judge_post_btn"
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
export default Judge_result_popup_svc;
