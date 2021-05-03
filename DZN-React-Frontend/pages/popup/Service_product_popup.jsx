import React from 'react';
import { Button } from 'react-bootstrap';
import close_btn from '../../image/Center/Close_btn/close_btn.png';

/* 서비스 상품관리 > 승인심사  */

const Service_product_popup = () => {
    return (
        <React.Fragment>
            <div className="smae_popup_bgk_big_box" id="Service_product_popup_box">
                <div className="Buy_make_popup_white_box">
                    <div className="copy_white_big_box">
                        <div className="Buy_popup_uploda_headLine_box">
                            <div className="Buy_popup_head_line_box">
                                <h1>승인(판매) 요청</h1>
                                <div className="Buy_popupClose_box">
                                    <img src={close_btn} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="question_uploade_nav_box" id="Buy_popupClose_nav_box">
                            <div className="Approved_judge_text_box">
                                <p>작성한 내용으로 승인심사를 요청하시 
                                <br/>겠습니까? 관리자가 승인하는데 시간이
                                <br/>소요됩니다. 승인 후 판매를 개시할 수
                                <br/>있습니다.</p>
                            </div>
                            <div className="one_ok_button_box">
                                <Button>취소</Button>
                                <Button>확인</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Service_product_popup;