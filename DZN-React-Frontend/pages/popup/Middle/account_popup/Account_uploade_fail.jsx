import React, {useCallback} from 'react';

// 이미지 import
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';

/* 증복되는 url일 때 뜨는 팝업   */

const Account_uploade_fail = () => {
    const Image_close_popup = useCallback(() => {
        const Account_uploade_fail_bgk = document.getElementById("Account_uploade_fail_bgk");
        Account_uploade_fail_bgk.style.display = "none";
    }, []);
    return (
        <React.Fragment>
            <div className="smae_popup_bgk_big_box" id="Account_uploade_fail_bgk">
                <div className="Buy_make_popup_white_box">
                    <div className="small_white_box" id="froum_popup_box">
                        <div className="Small_popup_box">
                            <div className="Buy_popup_head_line_box">
                                <h1>계좌정보 정보 오류</h1>
                                <div className="Buy_popupClose_box">
                                    <img onClick={Image_close_popup}
                                        src={close_btn} alt="" />
                                </div>
                            </div>
                            <div className="small_Popup_text" id="Buy_popupClose_nav_box">
                                <div className="popup_Contents_box">
                                    <p>예금주명을 확인해주세요.</p>
                                </div>
                                <div className="one_ok_button_box">
                                    <button className="ok_popup_btn"
                                     onClick={Image_close_popup} id="gaci_uploade_ok_btn">확인</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Account_uploade_fail;