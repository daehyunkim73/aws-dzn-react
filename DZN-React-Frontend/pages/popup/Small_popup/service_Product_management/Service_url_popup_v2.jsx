import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';

// 이미지 import
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';

/* 승인심사 요청 팝업  */

const Service_url_popup_v2 = () => {
    const Image_close_popup = useCallback(() => {
        const ServiceCenter_url_popup_bgk_v2 = document.getElementById("ServiceCenter_url_popup_bgk_v2");
        ServiceCenter_url_popup_bgk_v2.style.display = "none";
    }, []);

    return (
        <React.Fragment>
            <div className="smae_popup_bgk_big_box" id="ServiceCenter_url_popup_bgk_v2">
                <div className="Buy_make_popup_white_box">
                    <div className="popup_small_white_box">
                        <div className="Small_popup_box">
                            <div className="Buy_popup_head_line_box">
                                <h1>서비스 URL</h1>
                                <div className="Buy_popupClose_box" >
                                    <img onClick={Image_close_popup}
                                        src={close_btn} alt="" />
                                </div>
                            </div>

                            <div className="small_Popup_text" id="Buy_popupClose_nav_box">
                                <div className="popup_Contents_box">
                                    <p>사용 가능한 URL 입니다.</p>
                                </div>

                                <div className="one_ok_button_box">
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

export default Service_url_popup_v2;