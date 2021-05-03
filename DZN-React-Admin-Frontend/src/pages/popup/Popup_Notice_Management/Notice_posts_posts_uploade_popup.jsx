import React, { useCallback } from "react";
import close_btn from "../../../../image/Center/Close_btn/close_btn.png";
import moment from "moment";
import { Server_ajax_post } from "../../../../Server_ajax";
import { useCookies } from "react-cookie";

const Notice_posts_posts_uploade_popup = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies();  
  const { category, title, content, setNotice_info_yn, userList, history } = props;

  const Image_close_popup = useCallback(() => {
    const Admin_user_notice_post_popup_bgk = document.getElementById(
      "Admin_user_post_uploade_popup_bgk"
    );
    Admin_user_notice_post_popup_bgk.style.display = "none";
  }, []);

  const Image_ok_popup = () => {
    (async () => {
      try {
        let body = {
          notice_title: title,
          notice_category: category,
          notice_content: content,
          notice_date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          notice_writer: cookies.h_portal_id,
          notice_data_imfl: null,
        };
        await Server_ajax_post("contents_management/notice_writing_save", body);

        // 알람 등록
        const alamParam = {
          id: userList,      // 알림을 보낼 사용자계정 ID
          definitionCode: 1,   // 알림 수신 case 정의 코드
          contentCode: 1,      // 알림 내용 코드
          etc: ''              // 추가 내용 ( 예. 000 서비스가 결제되었습니다. 중 000에 들어갈 문구) 
        }                
        await Server_ajax_post(`admin_settings/alarm_regist`, alamParam);

        Image_close_popup();
        history.push("/admin/notice");
      } catch (e) {
        return console.error(e);
      }
    })();

    setNotice_info_yn(false);
  };

  return (
    <React.Fragment>
      <div
        className="admin_background_same_box"
        id="Admin_user_post_uploade_popup_bgk"
      >
        <div className="admin_pixed_popup_white_box">
          <div className="admin_small_white_box">
            <div className="admin_popup_head_line_box">
              <h1>게시물 등록</h1>
              <div className="admin_popupClose_box">
                <img onClick={Image_close_popup} src={close_btn} alt="" />
              </div>
            </div>

            <div className="admin_big_contents_box">
              <div
                className="admin_popup_Contents_box"
                id="admin_popup_sp_text_box"
              >
                <p>게시물을 등록을 확정하시겠습니까?</p>
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
                  id="notice_gaci_uploade_btn"
                  onClick={Image_ok_popup}
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

export default Notice_posts_posts_uploade_popup;
