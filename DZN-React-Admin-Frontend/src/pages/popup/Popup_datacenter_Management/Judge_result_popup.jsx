import React, { useCallback } from "react";
import close_btn from "../../../../image/Center/Close_btn/close_btn.png";
const Judget_result_popup = ({ setConfirm }) => {

  const aaprvlSubmitClick = useCallback(() => {
    const Admin_user_datacenter_judge_popup_bgk = document.getElementById(
      "Admin_user_datacenter_judge_popup_bgk"
    );
    setConfirm(true);
    Admin_user_datacenter_judge_popup_bgk.style.display = "none";
  }, []);

  const Image_close_popup = useCallback(() => {
    const Admin_user_datacenter_judge_popup_bgk = document.getElementById(
      "Admin_user_datacenter_judge_popup_bgk"
    );
    Admin_user_datacenter_judge_popup_bgk.style.display = "none";
  }, []);
  
  return (
    <React.Fragment>
      <div
        className="admin_background_same_box"
        id="Admin_user_datacenter_judge_popup_bgk"
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
                <button className="admin_popup_first_btn"
                        onClick={Image_close_popup}>
                  취소
                </button>
                <button className="admin_popup_second_btn" 
                        id="judge_post_btn" 
                        onClick={aaprvlSubmitClick}>
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
export default Judget_result_popup;
