import React, { useCallback } from 'react';

// 이미지 import
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';

const Question_popup_fail = () => {
    const Image_close_popup = useCallback(() => {
        const Gaci_uploade_fail_popup_bgk = document.getElementById("Gaci_uploade_fail_popup_bgk");
        Gaci_uploade_fail_popup_bgk.style.display = "none";
    }, []);
    return (
        <React.Fragment>
            <div className="smae_popup_bgk_big_box" id="Gaci_uploade_fail_popup_bgk">
                <div className="Buy_make_popup_white_box">
                    <div className="small_white_box">
                        <div className="Buy_popup_uploda_headLine_box">
                            <div className="Buy_popup_head_line_box">
                                <div className="Buy_popupClose_box">
                                    <img onClick={Image_close_popup}
                                        src={close_btn} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="question_uploade_nav_box" id="Buy_popupClose_nav_box">
                            <div className="popup_Contents_box" id="Exposure_text_box">
                                <p>문의 유형을 선택 하세요.</p>
                            </div>

                            <div className="one_ok_button_box">
                                <button className="ok_btn_popup" onClick={Image_close_popup}>확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Question_popup_fail;