import React, { useCallback } from 'react';
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';

const Calculate_term_popup = () => {
    const Image_close_popup = useCallback(() => {
        const Admin_user_calculate_term_popup_bgk = document.getElementById("Admin_user_calculate_term_popup_bgk");
        Admin_user_calculate_term_popup_bgk.style.display = "none";
    }, []);
    return (
        <React.Fragment>
            <div className="admin_background_same_box" id="Admin_user_calculate_term_popup_bgk">
                <div className="admin_pixed_popup_white_box">
                    <div className="admin_small_white_box">
                        <div className="admin_popup_head_line_box">
                            <h1>정산 기간</h1>
                            <div className="admin_popupClose_box">
                                <img onClick={Image_close_popup} 
                                src={close_btn} alt="" />
                            </div>
                        </div>

                        <div className="admin_big_contents_box">
                            <div className="admin_popup_Contents_box" id="admin_popup_sp_text_box">
                                <p>검색하신 기간은 이미 정산된 기판에 포함 되어있습니다. 
                                <br/>이미 정산된 기간은 정산되지 않습니다.</p>
                            </div>

                            <div className="admin_popup_button_box">
                                <button className="admin_popup_second_btn" onClick={Image_close_popup}>확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Calculate_term_popup;