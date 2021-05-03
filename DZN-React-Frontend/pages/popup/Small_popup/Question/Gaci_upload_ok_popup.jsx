import React, { useCallback, useEffect } from 'react';

// 이미지 import
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';

const Gaci_upload_ok = ({setConfirm}) => {
    const Image_close_popup = useCallback(() => {
        const Gaci_uploade_ok_popup_bgk = document.getElementById("Gaci_uploade_ok_popup_bgk");
        Gaci_uploade_ok_popup_bgk.style.display = "none";
    }, []);

    const uploade_gaci_btn = async () => {        
        const Gaci_uploade_ok_popup_bgk = document.getElementById("Gaci_uploade_ok_popup_bgk");
        Gaci_uploade_ok_popup_bgk.style.display = "none";
        setConfirm(true);
    }

    return (
        <React.Fragment>
            <div className="smae_popup_bgk_big_box" id="Gaci_uploade_ok_popup_bgk">
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

export default Gaci_upload_ok;