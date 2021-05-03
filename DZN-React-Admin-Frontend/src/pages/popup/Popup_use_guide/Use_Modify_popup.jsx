import React, { useCallback } from "react";
import close_btn from "../../../../image/Center/Close_btn/close_btn.png";

const Use_modify_popup = ({ ModifySaveEvtBtn }) => {
  const Image_close_popup = useCallback(() => {
    const Admin_user_Usemodify_popup_bgk = document.getElementById(
      "Admin_user_Usemodify_popup_bgk"
    );
    Admin_user_Usemodify_popup_bgk.style.display = "none";
  }, []);
  return (
    <React.Fragment>
      <div
        className="admin_background_same_box"
        id="Admin_user_Usemodify_popup_bgk"
      >
        <div className="admin_pixed_popup_white_box">
          <div className="admin_little_white_box">
            <div className="admin_popup_head_line_box">
              <div className="admin_popupClose_box">
                <img onClick={Image_close_popup} src={close_btn} alt="" />
              </div>
            </div>

            <div className="admin_big_contents_box">
              <div
                className="admin_popup_Contents_box"
                id="admin_popup_sp_text_box"
              >
                <p>수정사항을 적용하시겠습니까?</p>
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
                  id="use_modify_btn"
                  onClick={ModifySaveEvtBtn}
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

export default Use_modify_popup;
