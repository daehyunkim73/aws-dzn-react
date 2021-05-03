import React, { useCallback } from 'react';
import close_btn from '../../image/Center/Close_btn/close_btn.png';

const User_none_popup = () => {
    const Image_close_popup = useCallback(() => {
        const User_none_popup_bgk = document.getElementById("User_none_popup_bgk");
        User_none_popup_bgk.style.display = "none";
    }, []);
    return (
        <React.Fragment>
            <div className="admin_background_same_box" id="User_none_popup_bgk">
                <div className="admin_pixed_popup_white_box">
                    <div className="admin_small_white_box">
                        <div className="admin_popup_head_line_box">
                            <h1>가입된 사용자가 없습니다.</h1>
                            <div className="admin_popupClose_box">
                                <img onClick={Image_close_popup} 
                                src={close_btn} alt="" />
                            </div>
                        </div>

                        <div className="admin_big_contents_box">
                            <div className="admin_popup_Contents_box" id="admin_popup_sp_text_box">
                                <p>입력한 정보가 올바른지 확인해주세요.</p>
                            </div>

                            <div className="admin_popup_button_box">
                                <button className="admin_popup_second_btn" id="data_forum_delete" onClick={Image_close_popup}>확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default User_none_popup;