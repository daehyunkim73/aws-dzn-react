import React, { useCallback } from "react";
import close_btn from "../../../../image/Center/Close_btn/close_btn.png";

const Approved_result_contents_popup = ({
  search_array_list,
  Svc_infra_click,
  Svc_infra_click_logic,
}) => {
  const Image_close_popup = useCallback(() => {
    const Admin_user_datacenter_approved_result_popup_bgk = document.getElementById(
      "Admin_user_datacenter_approved_result_popup_bgk"
    );
    Admin_user_datacenter_approved_result_popup_bgk.style.display = "none";
  }, []);
  return (
    <React.Fragment>
      <div
        className="admin_background_same_box"
        id="Admin_user_datacenter_approved_result_popup_bgk"
      >
        <div className="admin_pixed_popup_white_box">
          <div className="admin_Data_Approved_req_small_white_box">
            <div className="admin_popup_head_line_box">
              <h1>승인심사 결과</h1>
              <div className="admin_popupClose_box">
                <img onClick={Image_close_popup} src={close_btn} alt="" />
              </div>
            </div>

            <div className="admin_big_contents_box">
              <div
                className="admin_popup_Contents_box"
                id="admin_popup_sp_text_box"
              >
                <div className="admin_Sale_member_text_box">
                  <p>다음과 같이 결과를 알려드립니다.</p>
                </div>
                <div className="admin_new_req_box">
                  <div className="admin_Companion_box">반려</div>
                </div>
                <div className="approved_result_popup">
                  <textarea
                    value={
                      Svc_infra_click_logic === true &&
                      search_array_list[Svc_infra_click] &&
                      search_array_list[Svc_infra_click].return_memo
                    }
                  ></textarea>
                </div>
                <div className="admin_file_download_text_box">
                  <p>첨부파일</p>
                  <p>
                    <span id="admin_Aprroved_req_data_box">
                      {Svc_infra_click_logic === true &&
                        search_array_list[Svc_infra_click] &&
                        search_array_list[Svc_infra_click].add_file_name}
                    </span>
                  </p>
                </div>
              </div>

              <div className="admin_popup_button_box">
                <button
                  className="admin_popup_second_btn"
                  onClick={Image_close_popup}
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

export default Approved_result_contents_popup;
