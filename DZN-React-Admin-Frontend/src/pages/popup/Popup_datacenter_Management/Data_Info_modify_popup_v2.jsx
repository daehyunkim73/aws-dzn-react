import React, { useCallback } from 'react';
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';

const Data_Info_modify_popup_v2 = () => {
    const Image_close_popup = useCallback(() => {
        const Admin_user_Data_info_modify_popup_bgk_v2 = document.getElementById("Admin_user_Data_info_modify_popup_bgk_v2");
        Admin_user_Data_info_modify_popup_bgk_v2.style.display = "none";
    }, []);
    return (
        <React.Fragment>
            <div className="admin_background_same_box" id="Admin_user_Data_info_modify_popup_bgk_v2">
                <div className="admin_pixed_popup_white_box">
                    <div className="admin_small_white_box">
                        <div className="admin_popup_head_line_box">
                            <h1>정보 수정</h1>
                            <div className="admin_popupClose_box">
                                <img onClick={Image_close_popup} 
                                src={close_btn} alt="" />
                            </div>
                        </div>

                        <div className="admin_big_contents_box">
                            <div className="admin_popup_Contents_box" id="admin_popup_sp_text_box">
                                <p>관리자에 수정하시면서 회원이 입력한 
                                <br/> 정보도 변경됩니다. 수정하시겠습니까?</p>
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

export default Data_Info_modify_popup_v2;