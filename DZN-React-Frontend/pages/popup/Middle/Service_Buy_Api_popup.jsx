import React, { useCallback } from 'react'
import Table from 'react-bootstrap/Table';

// 이미지 import
import close_btn from '../../../image/Center/Close_btn/close_btn.png';

/* 서비스 상품관리 API 관련 팝업   */

const Buy_api_popup = () => {
    const Image_close_popup = useCallback(() => {
        const Service_Buy_Api_popup_bgk = document.getElementById("Service_Buy_Api_popup_bgk");
        Service_Buy_Api_popup_bgk.style.display = "none";
    }, []);

    return (
        <React.Fragment>
            <div className="smae_popup_bgk_big_box .Approved_Popup_text_box " id="Service_Buy_Api_popup_bgk">
                <div className="Buy_make_popup_white_box">
                    <div className="service_center_delete_middel_white_box">
                        <div className="Buy_popup_head_line_box">
                            <div className="Small_popup_box">
                                <div className="Buy_popup_head_line_box">
                                    <h1>구매 API</h1>
                                    <div className="Buy_popupClose_box">
                                        <img onClick={Image_close_popup}
                                            src={close_btn} alt="" />
                                    </div>
                                </div>

                                <div className="question_uploade_nav_box .buy_table_popup_box ">
                                    <div className="Approved_Popup_text_box">
                                        <Table responsive className="buy_table_popup_box" >
                                            <caption className="buy_api_caption">
                                                <div className="checkbox_radio_wrap">
                                                    <input type="radio" name="exposure_check_sp2" />
                                                    <div className="checkbox_wrap"><input type="checkbox" id="buy_api_center_check" />
                                                        <label className="checkbox_design" htmlFor="buy_api_center_check"></label></div>
                                                </div>
                                            </caption>
                                            <tbody>
                                                <tr>
                                                    <td className="wall_api_box">  <div className="checkbox_radio_wrap" >
                                                        <input type="radio" name="exposure_check_sp2" id="Exposure_check_sp2" />
                                                        <div className="checkbox_wrap"><input type="checkbox" id="buy_api_center_check_2" />
                                                            <label className="checkbox_design" htmlFor="buy_api_center_check_2"></label></div>
                                                    </div></td>
                                                    <td>전체세금계산서 API</td>
                                                </tr>
                                                <tr>
                                                    <td className="wall_api_box"> <div className="checkbox_radio_wrap" >
                                                        <input type="radio" name="exposure_check_sp2" id="Exposure_check_sp2" />
                                                        <div className="checkbox_wrap"><input type="checkbox" id="buy_api_center_check_3" />
                                                            <label className="checkbox_design" htmlFor="buy_api_center_check_3"></label></div>
                                                    </div></td>
                                                    <td>전자세금계산서 API</td>
                                                </tr>
                                                <tr>
                                                    <td className="wall_api_box"> <div className="checkbox_radio_wrap" >
                                                        <input type="radio" name="exposure_check_sp2" id="Exposure_check_sp2" />
                                                        <div className="checkbox_wrap"><input type="checkbox" id="buy_api_center_check_4" />
                                                            <label className="checkbox_design" htmlFor="buy_api_center_check_4"></label></div>
                                                    </div></td>
                                                    <td>기업재무데이터를 활용한 부도예측 API</td>
                                                </tr>
                                                <tr>
                                                    <td className="wall_api_box"> <div className="checkbox_radio_wrap" >
                                                        <input type="radio" name="exposure_check_sp2" id="Exposure_check_sp2" />
                                                        <div className="checkbox_wrap"><input type="checkbox" id="buy_api_center_check_5" />
                                                            <label className="checkbox_design" htmlFor="buy_api_center_check_5"></label></div>
                                                    </div></td>
                                                    <td>일반전표 (일별 매출,매입 합산 집계데이터) API </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className="one_ok_button_box">
                                        <button className="fail_btn_popup" onClick={Image_close_popup}>취소</button>
                                        <button className="ok_btn_popup" id="Choice_api_get_button">선택한 API 가져오기</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Buy_api_popup;