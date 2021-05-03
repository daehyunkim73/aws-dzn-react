import React, { useEffect, useCallback } from 'react';
import { Button, Table } from 'react-bootstrap';

// 이미지 import
import close_btn from '../../../image/Center/Close_btn/close_btn.png';

/* 승인(판매) 요청 팝업  */

function table_middle() {
    const td = document.querySelectorAll('table td');
    for (let i = 0; i < td.length; i++) {
        td[i].classList.add('align-middle');
    }
    return td;
}

const Data_sales_popup = () => {
    useEffect(() => {
        table_middle();
        return () => {
            table_middle();
        }
    }, []);

    const Image_close_popup = useCallback(() => {
        const Data_report_sales_bgk_popup = document.getElementById("Data_report_sales_bgk_popup");
        Data_report_sales_bgk_popup.style.display = "none";
    }, []);

    return (
        <React.Fragment>
            <div className="smae_popup_bgk_big_box" id="Data_report_sales_bgk_popup">
                <div className="Buy_make_popup_white_box">
                    <div className="big_Data_delete_small_white_box">
                        <div className="Small_popup_box">
                            <div className="Buy_popup_head_line_box">
                                <h1>데이터 매출내역</h1>
                                <div className="Buy_popupClose_box">
                                    <img onClick={Image_close_popup}
                                        src={close_btn} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="question_uploade_nav_box">
                            <div className="Approved_Popup_text_box">
                                <Table responsive className="data_sales_table_box">
                                    <caption>2020.01.23 총 00건</caption>
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
                                            <td>일반전표 (일별 매출, 매입 합산 집계데이터)</td>
                                            <td>홍길동 [wehagodev]</td>
                                            <td>200,000회 / 일</td>
                                            <td className="data_Sales_left_number">200,000</td>
                                            <td className="data_Sales_left_number">15,000</td>
                                            <td className="data_Sales_left_number">5,000</td>
                                        </tr>
                                        <tr>
                                            <td>기업재무데이터를 활용한 부도예측모형</td>
                                            <td>홍길동 [wehagodev]</td>
                                            <td>1,000,000회 / 일</td>
                                            <td className="data_Sales_left_number">10,000,000</td>
                                            <td className="data_Sales_left_number">9,000,000</td>
                                            <td className="data_Sales_left_number">1,000,000</td>
                                        </tr>
                                        <tr>
                                            <td>단위노동비용지수</td>
                                            <td>홍길동 [wehagodev]</td>
                                            <td>200,000회 / 일</td>
                                            <td className="data_Sales_left_number">200,000</td>
                                            <td className="data_Sales_left_number">15,000</td>
                                            <td className="data_Sales_left_number">5,000</td>
                                        </tr>
                                        <tr>
                                            <td>전자세금계사서(홈텍스에서 스캐링한 매 <br />
                                            출 매입 전자세금계산서)</td>
                                            <td>가나다 [wehagodev]</td>
                                            <td>200,000회 / 일</td>
                                            <td className="data_Sales_left_number">200,000</td>
                                            <td className="data_Sales_left_number">15,000</td>
                                            <td className="data_Sales_left_number">5,000</td>
                                        </tr>

                                        <tr>
                                            <td>일반전표 (일별 매출, 매입 합산 집계데이터)</td>
                                            <td>홍길동 [wehagodev]</td>
                                            <td>200,000회 / 일</td>
                                            <td className="data_Sales_left_number">200,000</td>
                                            <td className="data_Sales_left_number">15,000</td>
                                            <td className="data_Sales_left_number">5,000</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="one_ok_button_box">
                                 <button id="ok_image_close" className="ok_popup_btn"
                                  onClick={Image_close_popup}>닫기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Data_sales_popup;