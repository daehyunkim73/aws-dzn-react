import React, {useCallback} from 'react';
import { Button } from 'react-bootstrap';
import close_btn from '../../../image/Center/Close_btn/close_btn.png';

/* 서비스 상품관리 > 승인심사  */

const Second_member_popup = () => {
    const imageclose_click = useCallback(() => {
        const Data_delete_popup_v2 = document.getElementById("Data_delete_popup_v2");
        Data_delete_popup_v2.style.display = "none";
    }, []);
    return (
        <React.Fragment>
            <div className="smae_popup_bgk_big_box" id="Data_delete_popup_v2">
                <div className="Buy_make_popup_white_box">
                    <div className="Data_delete_small_white_box">
                        <div className="Buy_popup_uploda_headLine_box">
                            <div className="Buy_popup_head_line_box">
                                <h1>업종별 일용직/정규직 평균 급여 비교</h1>
                                <div className="Buy_popupClose_box">
                                    <img onClick={imageclose_click}
                                        src={close_btn} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="question_uploade_nav_box" id="Buy_popupClose_nav_box">
                            <div className="popup_Contents_box">
                                <p>해당 데이터는 현재 유료회원이 있으므로<br />
                                삭제되지 않습니다.</p>
                            </div>

                            <div className="one_ok_button_box">                                
                                <button className="ok_btn_popup" onClick={imageclose_click}>확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Second_member_popup;