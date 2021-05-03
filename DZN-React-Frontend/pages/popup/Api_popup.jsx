import React from 'react';
import { Button, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import close_btn from '../../image/Center/Close_btn/close_btn.png';

/* API 문서 신청 팝업 PPT 59페이지  */

const Api_popup = () => {
    return (
        <React.Fragment>
            <div className="smae_popup_bgk_big_box" id="Api_popup_bgk_page">
                <div className="Account_success_white_box" >
                    <div className="Buy_popup_uploda_headLine_box">
                        <div className="Buy_popup_head_line_box">
                            <h1>API 신청</h1>
                            <div className="Buy_popupClose_box">
                                <img src={close_btn} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="question_uploade_nav_box">
                        <div className="Approved_Popup_text_box">
                            <div className="api_contents_text_box">
                                <p>총 6건의 API를 제휴 신청합니다.</p>
                                <p>과금은 서비스를 마켓에 판매 시작 시점으로 진행됩니다.</p>
                            </div>
                            <Table responsive className="api_contents_table_box">
                                <thead>
                                    <tr>
                                        <th className="wall_api_box">신청 API</th>
                                        <th>과금</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="wall_api_box">
                                            기업재무데이터를 활용한 부도예측 <br />
                                            API
                                        </td>
                                        <td>
                                            100,000회/일 무료 <br />
                                            200,000회/일 10,000원 / 월
                                        </td>
                                    </tr>

                                </tbody>
                            </Table>
                            <div className="wehago_developers_box">
                                <div className="wehago_developers_text_box">
                                    <h1>Wehago Developers API 이용목적</h1>
                                </div>
                                <div className="api_service_select_box">
                                    <div className="service_small_text_box">
                                        <p>서비스</p>
                                        <Form.Control as="select">
                                            <option>세금아 안녕</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Form.Control>
                                    </div>
                                    <div className="down_service_text_box">
                                        <p>서비스를 선택해 주세요.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table_Question_button_box" id="bank_button_box">
                            <Button>취소</Button>
                            <Button>사용신청</Button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Api_popup;