import React, { useCallback } from 'react';
import close_btn from '../../image/Center/Close_btn/close_btn.png';

const Phone_certification_popup = () => {
    const Image_close_popup = useCallback(() => {
        const Phone_certification_popup_bgk = document.getElementById("Phone_certification_popup_bgk");
        Phone_certification_popup_bgk.style.display = "none";
    }, []);
    return (
        <React.Fragment>
            <div className="admin_background_same_box" id="Phone_certification_popup_bgk">
                <div className="admin_pixed_popup_white_box">
                    <div className="admin_small_white_box">
                        <div className="admin_popup_head_line_box">
                            <h1>인증번호 발송</h1>
                            <div className="admin_popupClose_box">
                                <img onClick={Image_close_popup} 
                                src={close_btn} alt="" />
                            </div>
                        </div>

                        <div className="admin_big_contents_box">
                            <div className="admin_popup_Contents_box" id="admin_popup_sp_text_box">
                                <p>인증번호를 발송했습니다. 인증번호가 오지 않을<br/>경우 입력한 정보가 올바른지 확인해주세요.</p>
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

export default Phone_certification_popup;