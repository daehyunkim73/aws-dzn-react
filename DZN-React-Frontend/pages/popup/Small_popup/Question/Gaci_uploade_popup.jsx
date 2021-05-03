import React, { useCallback, useEffect } from 'react';
import axios from 'axios';
// 이미지 import
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';
/* 필수 항목들을 다 안적었을 때 뜨는 팝업 PPT 페이지 96페이지  */
const Gaci_uploade_popup = (props) => {
    const { 
        setprop_info_yn,
        prop_type,
        prop_title,
        prop_content,
        forum_history
    } = props

    useEffect(() => {
        if (setprop_info_yn === false) {
            const Froum_Data_Approved_gaci_uploade_popup_bgk = document.getElementById("Froum_Data_Approved_gaci_uploade_popup_bgk");
            Froum_Data_Approved_gaci_uploade_popup_bgk.style.display = "none";
        }
    }, [setprop_info_yn]);

    const Image_close_popup = useCallback(() => {
        setprop_info_yn(false);
    }, [setprop_info_yn]);

    const uploade_gaci_btn = () => {
        const Froum_Data_Approved_gaci_uploade_popup_bgk = document.getElementById("Froum_Data_Approved_gaci_uploade_popup_bgk");
        Froum_Data_Approved_gaci_uploade_popup_bgk.style.display = "none";
        
        let body = {
            show_gbn: 'Y',
            notice_type: prop_type,
            notice_title: prop_title,
            notice_content: prop_content,
            notice_date: new Date().toISOString().slice(0, 19).replace("T"," ")
        }
        console.log(body);

        axios.post('http://localhost:8081/admin/notice_wirteing_save', body)
        .then(() => {
            forum_history.push('/admin/notice');
        })

        console.log('notice_body',body);
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