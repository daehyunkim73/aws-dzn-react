import React, { useCallback, useState } from 'react';
import close_btn from '../../../image/Center/Close_btn/close_btn.png';
import { Server_ajax_post } from '../../../server_ajax';


/* 필수 항목들을 다 안적었을 때 뜨는 팝업 PPT 페이지 96페이지  */

const Gaci_upload_fail_ok = ({setConfirm}) => {
        

    const Image_close_popup = useCallback(() => {
        const Dev_Question_delete_popup_bgk = document.getElementById("Dev_Question_delete_popup_bgk");
        Dev_Question_delete_popup_bgk.style.display = "none";
    }, []);

    const delete_popup = useCallback(() => {        
        setConfirm(true);
        const Dev_Question_delete_popup_bgk = document.getElementById("Dev_Question_delete_popup_bgk");
        Dev_Question_delete_popup_bgk.style.display = "none";
      }, []);

    return (
        <React.Fragment>
            <div className="smae_popup_bgk_big_box" id="Dev_Question_delete_popup_bgk">
                <div className="Buy_make_popup_white_box">
                    <div className="popup_small_white_box" id="froum_popup_box">
                        <div className="Small_popup_box">
                            <div className="Buy_popup_head_line_box">
                                <div className="Buy_popupClose_box">
                                    <img onClick={Image_close_popup}
                                        src={close_btn} alt="" />
                                </div>
                            </div>
                            <div className="small_Popup_text" id="Buy_popupClose_nav_box">
                                <div className="popup_Contents_box">
                                    {
                                        <p>게시물을 삭제하시겠습니까?</p>
                                    }
                                </div>
                                <div className="one_ok_button_box">
                                    <button className="fail_btn_popup" onClick={Image_close_popup}>취소</button>
                                    <button className="ok_popup_btn" id="question_table_delete_ok_btn" onClick={delete_popup}>확인</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Gaci_upload_fail_ok;