import React from 'react';
import { Button } from 'react-bootstrap';
import close_btn from '../../image/Center/Close_btn/close_btn.png';

const Service_uploade_popup = () => {
    return (
        <React.Fragment>
            <div className="smae_popup_bgk_big_box" id="Approved_Popup_bgk">
                <div className="Service_uploade_text_box_white_box" >
                    <div className="Service_uploade_popup_header">
                        <div className="question_close_headText_box">
                            <div className="question_uploade_text_box" id="Service_uploade_text_box">
                                <h1>서비스 등록하기</h1>
                            </div>
                            <div className="close_popup_image_box">
                                <img src={close_btn} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="question_uploade_nav_box">
                       
                        <div className="table_Question_button_box">
                            <Button>취소</Button>
                            <Button>확인</Button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Service_uploade_popup;