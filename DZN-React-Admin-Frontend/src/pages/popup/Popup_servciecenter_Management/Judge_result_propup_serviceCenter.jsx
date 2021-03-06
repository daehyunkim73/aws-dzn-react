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
          console.log("ππππππππππ", upload_file)
          const result = await Image_uploade(upload_file, 'backoffice', 'C') //μ²«λ²μ§Έ μΈμ: νμΌ μ λ³΄, λλ²μ§Έ μΈμ: service_code, μΈλ²μ§Έ μΈμ: S: μλΉμ€, C: νμ¬, U: μ¬μ©μ*λΉλκΈ°μ*
          console.log(result,"βββββββββ");
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
              <h1>μ¬μ¬κ²°κ³Όμ μ μΆ</h1>
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
                  ν΄λΉ λ΄μ©μΌλ‘ μ¬μ¬κ²°κ³Όμλ₯Ό μ μΆνμ κ² μ΅λκΉ?
                  <br />
                  μ μΆ νλ μμ μ΄ λΆκ°λ₯ν©λλ€.
                </p>
              </div>
              <div className="admin_popup_button_box">
                <button
                  className="admin_popup_first_btn"
                  onClick={Image_close_popup}
                >
                  μ·¨μ
                </button>
                <button
                  className="admin_popup_second_btn"
                  onClick={service_judge}
                  id="judge_post_btn"
                >
                  νμΈ
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
