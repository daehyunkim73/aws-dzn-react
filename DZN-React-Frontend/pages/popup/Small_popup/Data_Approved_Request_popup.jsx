import React, { useCallback } from 'react';
import close_btn from '../../../image/Center/Close_btn/close_btn.png';

/* 필수 항목을 다 안적었을때   */

const Approved_Request_popup = () => {
    const Image_close_popup = useCallback(() => {
        const Data_Approved_Request_popup_bgk = document.getElementById("Data_Approved_Request_popup_bgk");
        Data_Approved_Request_popup_bgk.style.display = "none";
    }, []);
    return (
        <React.Fragment>
            <div className="smae_popup_bgk_big_box" id="Data_Approved_Request_popup_bgk">
                <div className="Buy_make_popup_white_box">
                    <div className="popup_small_white_box" id="Approved_req_white_box">
                        <div className="Small_popup_box">
                            <div className="Buy_popup_head_line_box">
                                <h1>승인(판매) 요청하기</h1>
                                <div className="Buy_popupClose_box">
                                    <img onClick={Image_close_popup}
                                        src={close_btn} alt="" />
                                </div>
                            </div>
                            <div className="small_Popup_text" id="Buy_popupClose_nav_box">
                                <div className="popup_Contents_box">
                                    <p>필수 항목을 모두 작성하셔야 승인(판매)<br />
                                    을 요청할 수 있습니다.</p>
                                </div>
                                <div className="ok_popup_button">
                                    <button className="ok_popup_btn" onClick={Image_close_popup}>확인</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Approved_Request_popup;