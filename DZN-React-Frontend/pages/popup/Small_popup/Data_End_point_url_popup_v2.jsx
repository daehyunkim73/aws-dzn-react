import React, {useCallback} from 'react';
import { Button } from 'react-bootstrap';
import close_btn from '../../../image/Center/Close_btn/close_btn.png';

/* 구매 / 제작 데이터 > 증복되는 URL 일 때 뜨는 팝업 PPT 13페이지  */

const End_point_url_popup = () => {
    const Image_close_popup = useCallback(() => {
        const End_point_url_bgk = document.getElementById("Data_End_point_url_bgk_v2");
        End_point_url_bgk.style.display="none";
    }, []);
    return (
        <React.Fragment>
             <div className="smae_popup_bgk_big_box" id="Data_End_point_url_bgk_v2">
                <div className="Buy_make_popup_white_box">
                    <div className="popup_small_white_box">
                        <div className="Small_popup_box">
                            <div className="Buy_popup_head_line_box">
                                <h1>엔드포인트 URL</h1>
                                <div className="Buy_popupClose_box">
                                    <img onClick={Image_close_popup}
                                        src={close_btn} alt="" />
                                </div>
                            </div>

                            <div className="small_Popup_text" id="Buy_popupClose_nav_box">
                                <div className="popup_Contents_box">
                                    <p>사용 가능한 URL입니다.</p>
                                </div>

                                <div className="popup_button_box">
                                    <button type='button' onClick={Image_close_popup} className="ok_popup_btn">확인</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default End_point_url_popup;