import React, { useCallback } from 'react';
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';

const Individual_member_popup = () => {
    const Image_close_popup = useCallback(() => {
        const Admin_user_info_popup_bgk = document.getElementById("Admin_user_info_popup_bgk");
        Admin_user_info_popup_bgk.style.display = "none";
    }, []);
    return (
        <React.Fragment>
            <div className="admin_background_same_box" id="Admin_user_info_popup_bgk">
                <div className="admin_pixed_popup_white_box">
                    <div className="admin_small_white_box">
                        <div className="admin_popup_head_line_box">
                            <h1>회원 개별 알림 보내기</h1>
                            <div className="admin_popupClose_box">
                                <img onClick={Image_close_popup} 
                                src={close_btn} alt="" />
                            </div>
                        </div>

                        <div className="admin_big_contents_box">
                            <div className="admin_popup_Contents_box" id="admin_popup_sp_text_box">
                                <textarea placeholder="내용을 작성하세요" className="user_individual_input">

                                </textarea>
                            </div>

                            <div className="admin_popup_button_box">
                                <button className="admin_popup_first_btn"
                                onClick={Image_close_popup} >취소</button>
                                <button className="admin_popup_second_btn" id="contents_post_btn">확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Individual_member_popup;