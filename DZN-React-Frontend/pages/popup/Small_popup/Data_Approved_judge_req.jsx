import React, { useCallback } from 'react';

import close_btn from '../../../image/Center/Close_btn/close_btn.png';

/* 승인심사 요청 팝업  */

const Approved_judge_req_popup = ({setConfirm}) => {

    // 확인 버튼 눌를 때 동작 이벤트
    const confim_popup = useCallback(() => {
        setConfirm(true);
    });

    const close_popup = useCallback(() => {
        const Data_Approved_judge_bgk_popup = document.getElementById("Data_Approved_judge_bgk_popup");
        Data_Approved_judge_bgk_popup.style.display = "none";
    }, []);

    return (
        <React.Fragment>
            <div className="smae_popup_bgk_big_box" id="Data_Approved_judge_bgk_popup">
                <div className="Buy_make_popup_white_box">
                    <div className="Data_delete_small_white_box">
                        <div className="Small_popup_box">
                            <div className="Buy_popup_head_line_box">
                                <h1>승인심사 요청</h1>
                                <div className="Buy_popupClose_box" >
                                    <img onClick={close_popup}
                                        src={close_btn} alt="" />
                                </div>
                            </div>
                            
                            <div className="small_Popup_text" id="Buy_popupClose_nav_box">
                                <div className="popup_Contents_box">
                                    <p>작성한 내용으로 승인심사를 요청하시 겠습니까?
                                    <br />관리자가 승인하는데 시간이 소요됩니다.
                                    <br />승인 후 수정된 내용으로 적용됩니다.</p>
                                </div>

                                <div className="one_ok_button_box">
                                    <button className="fail_btn_popup" onClick={close_popup}>취소</button>
                                    <button id="ok_popup_btn_relay_approved" className="ok_popup_btn" onClick={confim_popup}>확인</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Approved_judge_req_popup;