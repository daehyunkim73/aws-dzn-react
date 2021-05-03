import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
// 이미지 import
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';
/* 필수 항목들을 다 안적었을 때 뜨는 팝업 PPT 페이지 96페이지  */
import { test } from '../../../../src/now_date';
import { Server_ajax_get, UncertApi_ajax_get, Server_ajax_post, User_info } from '../../../../server_ajax';

const Gaci_uploade_popup = (props) => {
    const {
        setprop_info_yn,
        prop_file_data_form,
        forum_history,
        Development_division,
        prop_writing_info
    } = props

    useEffect(() => {
        if (setprop_info_yn === false) {
            const Froum_Data_Approved_gaci_uploade_popup_bgk = document.getElementById
                (
                    "Froum_Data_Approved_gaci_uploade_popup_bgk"
                );
            Froum_Data_Approved_gaci_uploade_popup_bgk.style.display = "none";
        }
    }, [setprop_info_yn]);

    const Image_close_popup = useCallback(() => {
        setprop_info_yn(false);
    }, [setprop_info_yn]);

    const uploade_gaci_btn = async () => {
        try {
            const date_result = new test();
            const user_cno_info = await User_info();
            const Froum_Data_Approved_gaci_uploade_popup_bgk = document.getElementById
                (
                    "Froum_Data_Approved_gaci_uploade_popup_bgk"
                );
            Froum_Data_Approved_gaci_uploade_popup_bgk.style.display = "none";
            let body = {
                forum_cart_code: Development_division,
                forum_writing_info: prop_writing_info,
                forum_date: date_result.date,
                forum_data_imfl: prop_file_data_form,
                mbr_info_idx: user_cno_info.resultData[0].user_no,
                mbr_post_writer: user_cno_info.resultData[0].user_name,
            }

            await Server_ajax_post('forum/forum_wirteing_save', body);
            if (Development_division === 'D') {
                await forum_history.push('/forum/data');
            } else if (Development_division === 'S') {
                await forum_history.push('/forum/service');
            }
        } catch (e) {
            return console.error(e);
        }
    }

    return (
        <React.Fragment>
            <div className="smae_popup_bgk_big_box" id="Froum_Data_Approved_gaci_uploade_popup_bgk">
                <div className="Buy_make_popup_white_box">
                    <div className="popup_small_white_box" id="froum_popup_box">
                        <div className="Small_popup_box" id="froum_popup_box">
                            <div className="Buy_popup_head_line_box">
                                <div className="Buy_popupClose_box">
                                    <img onClick={Image_close_popup} src={close_btn} alt="" />
                                </div>
                            </div>
                            <div className="small_Popup_text" id="Buy_popupClose_nav_box">
                                <div className="popup_Contents_box">
                                    <p>게시물을 등록하시겠습니까?</p>
                                </div>
                                <div className="one_ok_button_box">
                                    <button className="fail_btn_popup" onClick={Image_close_popup}>취소</button>
                                    <button
                                        className="ok_popup_btn"
                                        id="gaci_uploade_ok_btn"
                                        onClick={uploade_gaci_btn}>확인
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Gaci_uploade_popup;