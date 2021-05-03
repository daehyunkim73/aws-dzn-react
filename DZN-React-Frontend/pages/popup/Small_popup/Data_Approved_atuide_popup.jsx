import React, { useCallback } from 'react';

// 이미지 import
import close_btn from '../../../image/Center/Close_btn/close_btn.png';

/* 구매/제작 데이터 > 기본정보 팝업 PPT 12페이지 */

const Experiment_popup = () => {
    const Image_close_popup = useCallback(() => {
        const Approved_audit_bgk_popup = document.getElementById("Approved_audit_bgk_popup");
        Approved_audit_bgk_popup.style.display = "none";
    }, []);

    return (
        <React.Fragment>
            <div className="smae_popup_bgk_big_box" id="Approved_audit_bgk_popup">
                <div className="Buy_make_popup_white_box">
                    <div className="popup_small_white_box">
                        <div className="Small_popup_box">
                            <div className="Buy_popup_head_line_box">
                                <h1>승인심사</h1>
                                <div className="Buy_popupClose_box">
                                    <img onClick={Image_close_popup}
                                        src={close_btn} alt="" />
                                </div>
                            </div>

                            <div className="small_Popup_text" id="Buy_popupClose_nav_box">
                                <div className="popup_Contents_box">
                                    <p>필수 기본정보 및 판매정보 입력 <br />
                                    후 승인심사를 요청할 수 있습니다.</p>
                                </div>

                                <div className="popup_button_box">
                                    <button onClick={Image_close_popup} className="ok_popup_btn">확인</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Experiment_popup;