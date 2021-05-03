import React, { useCallback, useState } from "react";
import close_btn from "../../../../image/Center/Close_btn/close_btn.png";
import List_style from "../../../../image/Dev_Center/Guide/list_style.png";
import { useHistory } from "react-router";

const Use_Preview_delete_popup = ({ guideMainTitle, guideTitle }) => {
  const Image_close_popup = useCallback(() => {
    const Admin_user_Use_preview_delete_popup_bgk = document.getElementById(
      "Admin_user_Use_preview_delete_popup_bgk"
    );
    Admin_user_Use_preview_delete_popup_bgk.style.display = "none";
  }, []);

  return (
    <React.Fragment>
      <div
        className="admin_background_same_box"
        id="Admin_user_Use_preview_delete_popup_bgk"
      >
        <div className="admin_pixed_popup_white_box">
          <div
            className="admin_service_center_middel_white_box"
            id="sp_admin_preview_white_box"
          >
            <div className="admin_popup_head_line_box">
              <h1>{guideMainTitle}</h1>
              <div className="admin_popupClose_box">
                <img onClick={Image_close_popup} src={close_btn} alt="" />
              </div>
            </div>

            <div className="admin_big_contents_box" id="data_devel_uploade_box">
              <div className="admin_popup_Contents_box admin_popup_Contents_Preview_box">
                <div className="big_preview_box">
                  <div className="preview_big_text_box">
                    <p>{guideMainTitle}</p>
                  </div>
                  <div className="headLine_big_text_contents_text_box">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: guideTitle[0].main_content,
                      }}
                    ></p>
                  </div>
                  <div className="contents_preview_big_box">
                    <p className="contents_preview_text">목차</p>

                    <div className="contenst_preview_list_box">
                      <ul>
                        {guideTitle.map((item) => {
                          return (
                            <li>
                              <img src={List_style} alt="list_stlye" />
                              <span className="sp_list_blue_text">
                                {item.title}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  {guideTitle.map((item) => {
                    return (
                      <div className="douzone_wehaogo_sign_up_text_box">
                        <div className="big_text_wehago_box_head">
                          <h1>{item.title}</h1>
                        </div>
                        <div
                          className="big_text_wehago_box_contents"
                          dangerouslySetInnerHTML={{
                            __html: item.content,
                          }}
                        ></div>
                      </div>
                    );
                  })}
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

export default Use_Preview_delete_popup;
