import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import close_btn from '../../image/Center/Close_btn/close_btn.png';

/* 승인(판매) 요청 팝업  */

function table_middle() {
    const td = document.querySelectorAll('table td');
    for (let i = 0; i < td.length; i++) {
        td[i].classList.add('align-middle');
    }
    return td;
}

const Service_sales_popup = () => {
    useEffect(() => {
        table_middle();
        return () => {
            table_middle();
        }
    }, []);

    return (
        <React.Fragment>
            <div className="smae_popup_bgk_big_box" id="Service_sales_popup_bgk">
                <div className="Data_sales_white_box" >
                    <div className="Buy_popup_uploda_headLine_box">
                        <div className="Buy_popup_head_line_box">
                            <h1>서비스 매출내역</h1>
                            <div className="Buy_popupClose_box">
                                <img src={close_btn} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="question_uploade_nav_box">
                        <div className="Approved_Popup_text_box">
                            <div className="table_date_text_box">
                                <p>2020.01.23 <span>총 00건</span></p>
                            </div>
                            <Table responsive className="data_sales_table_box">
                                <thead>
                                    <tr>
                                        <th rowSpan="4">데이터 제목</th>
                                        <th rowSpan="4">구매자</th>
                                        <th rowSpan="4">요금제</th>
                                        <th rowSpan="4">총 결제금액(원)</th>
                                        <th colSpan="2" scope="colgroup">결제수단</th>
                                    </tr>
                                    <tr>
                                        <th scope="col">카드(원)</th>
                                        <th scope="col">포인트</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>세금아 안녕</td>
                                        <td>홍길동 [wehagodev]</td>
                                        <td>200,000회 / 일</td>
                                        <td>200,000</td>
                                        <td>15,000</td>
                                        <td>5,000</td>
                                    </tr>
                                    <tr>
                                        <td>전표야 나와라</td>
                                        <td>홍길동 [wehagodev]</td>
                                        <td>1,000,000회 / 일</td>
                                        <td>10,000,000</td>
                                        <td >9,000,000</td>
                                        <td>1,000,000</td>
                                    </tr>
                                    <tr>
                                        <td>쉽게 알아보는 통계 분석</td>
                                        <td>홍길동 [wehagodev]</td>
                                        <td>200,000회 / 일</td>
                                        <td>200,000</td>
                                        <td>15,000</td>
                                        <td>5,000</td>
                                    </tr>
                                    <tr>
                                        <td>거래처 관리</td>
                                        <td>가나다 [wehagodev]</td>
                                        <td>200,000회 / 일</td>
                                        <td>200,000</td>
                                        <td>15,000</td>
                                        <td>5,000</td>
                                    </tr>

                                    <tr>
                                        <td>사내 SNS</td>
                                        <td>홍길동 [wehagodev]</td>
                                        <td>200,000회 / 일</td>
                                        <td>200,000</td>
                                        <td>15,000</td>
                                        <td>5,000</td>
                                    </tr>

                                </tbody>
                            </Table>
                        </div>
                        <div className="table_Question_button_box" id="Data_sale_button_box">
                            <Button>닫기</Button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Service_sales_popup;