import React, { useCallback, useEffect } from 'react';
import axios from 'axios';
// 이미지 import
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';
import { Server_ajax_get, Server_ajax_post } from '../../../../server_ajax';
const Gaci_upload_ok = (props) => {
    const { 
        setprop_info_yn,
        prop_title,
        prop_select,
        prop_content,
        prop_file_data_form,
        quest_history
    } = props
    const uploade_gaci_btn = () => {
        let config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        let body = {
            quest_title: prop_title,
            quest_select: prop_select,
            quest_content: prop_content,
            quest_date: new Date().toISOString().slice(0, 10).replace(/-/g, ""),
            quest_data_imfl: null
        }
        if (prop_file_data_form) { //파일이 있으면
            console.log('prop_file_data_form',prop_file_data_form);
            (async function () {
                try {
                  const quest_uploade_img = await Server_ajax_post(
                    `support/quest_uploade_img`, prop_file_data_form
                  );
                  body.quest_data_imfl = quest_uploade_img
                  await Server_ajax_post(
                    `support/question_wirteing_save`, body
                  );
                  quest_history.push('/support/question');
                } catch (e) {
                  return console.error(e);
                }
              })();
        } else {
            (async function () {
                try {
                  await Server_ajax_post(
                    `support/question_wirteing_save`, body
                  );
                  quest_history.push('/support/question');
                } catch (e) {
                  return console.error(e);
                }
              })();
        }
        Image_close_popup();
    };
    const Image_close_popup = useCallback(() => {
        const Gaci_uploade_ok_popup_bgk = document.getElementById("Gaci_uploade_ok_popup_bgk");
        Gaci_uploade_ok_popup_bgk.style.display = "none";
    }, []);
    return (
        <React.Fragment>
            <div className="smae_popup_bgk_big_box" id="Gaci_uploade_ok_popup_bgk">
                <div className="Buy_make_popup_white_box">
                    <div className="popup_small_white_box" id="froum_popup_box">
                        <div className="Small_popup_box">
                            <div className="Buy_popup_head_line_box">
                                <div className="Buy_popupClose_box">
                                    <img onClick={Image_close_popup}
                                        src={close_btn} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="small_Popup_text" id="Buy_popupClose_nav_box">
                            <div className="popup_Contents_box">
                                <p>게시물을 등록하시겠습니까?</p>
                            </div>
                            <div className="one_ok_button_box">
                                <button className="fail_btn_popup" onClick={Image_close_popup}>취소</button>
                                <button className="ok_btn_popup" id="gaci_uploade_ok_btn" onClick={uploade_gaci_btn}>확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Gaci_upload_ok;