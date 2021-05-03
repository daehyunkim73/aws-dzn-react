import React, { useCallback } from 'react';
import close_btn from '../../image/Center/Close_btn/close_btn.png';

/* 구매/제작 데이터 > 기본정보 팝업 PPT 12페이지 */

const Buy_data_table = () => {
    const imageclose_click = useCallback(() => {
        const Buy_make_popup_bgk = document.getElementById("Buy_make_popup_bgk");
        Buy_make_popup_bgk.style.display = "none";
    }, []);
    return (
        <React.Fragment>
            <div className="smae_popup_bgk_big_box" id="Buy_make_popup_bgk">
                <div className="Buy_make_popup_white_box">
                    <div className="copy_white_big_box">
                        <div className="Buy_popup_uploda_headLine_box">
                            <div className="Buy_popup_head_line_box">
                                <h1>승인심사</h1>
                                <div className="Buy_popupClose_box">
                                    <img onClick={imageclose_click} src={close_btn} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="question_uploade_nav_box" id="Buy_popupClose_nav_box">
                            <div className="table_question_uploade_box">
                                <p>필수 기본정보 및 판매정보 입력 <br />
                                    후 승인심사를 요청할 수 있습니다.</p>
                            </div>
                            <div className="table_Question_button_box">
                                <button className="ok_popup_btn">확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Buy_data_table;