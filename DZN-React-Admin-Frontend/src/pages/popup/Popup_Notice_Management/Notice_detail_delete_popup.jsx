import React, { useCallback, useState } from "react";
import close_btn from "../../../../image/Center/Close_btn/close_btn.png";
import { useHistory } from "react-router";
import { Server_ajax_post } from "../../../../Server_ajax";
import { useEffect } from "react";

const Notice_delete_popup = (props) => {
  const history = useHistory();
  const setRending = props.setRending;
  const [delList, setDelList] = useState([]);
  const [delListLogic, setDelListLogic] = useState(false);

  const delete_popup = useCallback(() => {
    let objs = document.querySelectorAll(".using_svc_checkbox_state");
    if (objs.length > 0) {
      for (let i = 0; i < objs.length; i++) {
        if (objs[i].checked === true) {
          setDelList((delList) => [...delList, objs[i].id]);
        }
      }
    } else {
      setDelList([props.ntc_key]);
    }
    setDelListLogic(true);
  }, []);

  useEffect(() => {
    if (delListLogic === true) {
      if(delList.length > 0) {
        (async function () {
          try {
            const data = {
              delArray: delList,
            };
            await Server_ajax_post(
              `contents_management/notice_delete_checked`,
              data
            );
            setDelList([]);
            Image_close_popup();
            setDelListLogic(false);
            if (!props.ntc_key) {
              setRending(true);
            } else {
              history.push("/admin/notice");
            }
          } catch (e) {
            return console.error(e);
          }
        })();
      } else {
        Image_close_popup();
        alert("삭제할 내용을 체크해주세요.");
      }

    }
  }, [delListLogic]);

  const Image_close_popup = useCallback(() => {
    const Admin_user_noticeDelete_popup_bgk = document.getElementById(
      "Admin_user_noticeDelete_popup_bgk"
    );
    Admin_user_noticeDelete_popup_bgk.style.display = "none";
  }, []);

  return (
    <React.Fragment>
      <div
        className="admin_background_same_box"
        id="Admin_user_noticeDelete_popup_bgk"
      >
        <div className="admin_pixed_popup_white_box">
          <div className="admin_small_white_box">
            <div className="admin_popup_head_line_box">
              <h1>게시물 삭제</h1>
              <div className="admin_popupClose_box">
                <img onClick={Image_close_popup} src={close_btn} alt="" />
              </div>
            </div>

            <div className="admin_big_contents_box">
              <div
                className="admin_popup_Contents_box"
                id="admin_popup_sp_text_box"
              >
                <p>게시물을 삭제하시겠습니까?</p>
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
                  id="notice_gaci_delete_btn"
                  onClick={delete_popup}
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

export default Notice_delete_popup;
