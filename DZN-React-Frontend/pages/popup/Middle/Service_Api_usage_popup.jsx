import React, {useCallback} from 'react'
import { Button, Table } from 'react-bootstrap';
import Datepicker from '../../Main_Page/component/datapicker_calendar';
import Popup_Pagination from '../../Main_Page/component/Pagination';

// 이미지 import
import close_btn from '../../../image/Center/Close_btn/close_btn.png';

/* 서비스 상품관리 API 관련 팝업 ppt 41페이지 구매 API 가져오기 버튼 클릭시 오픈   */

const Api_usage_popup = () => {
    const Image_close_popup = useCallback(() => {
        const Service_api_usage_popup_bgk = document.getElementById("Service_api_usage_popup_bgk");
        Service_api_usage_popup_bgk.style.display = "none";
    }, []);

    return (
        <React.Fragment>
            
            <div className="smae_popup_bgk_big_box" id="Service_api_usage_popup_bgk">
                <div className="Buy_make_popup_white_box">
                    <div className="service_center_delete_middel_white_box">
                        <div className="Buy_popup_head_line_box">
                            <div className="Small_popup_box">
                                <div className="Buy_popup_head_line_box">
                                    <h1>API 사용량</h1>
                                    <div className="Buy_popupClose_box">
                                        <img onClick={Image_close_popup}
                                            src={close_btn} alt="" />
                                    </div>
                                </div>

                                <div className="question_uploade_nav_box">
                                    <div className="Approved_Popup_text_box">
                                        <div className="big_text_box_data_box">
                                            <div className="api_usage_text_box">
                                                <h4>기업재무데이터를 활용한 부도예측 조회 API</h4>
                                                <p>100,000회/일 무료</p>
                                                <p>200,000회/일 10,000원 / 월</p>
                                            </div>
                                            <div className="data_picker_box">
                                                {/* <Datepicker /> */}
                                                <Button>검색</Button>
                                            </div>
                                        </div>
                                        <Table responsive className="api_usage_table_box">
                                            <thead>
                                                <tr>
                                                    <th className="wall_api_box">날짜</th>
                                                    <th>호출수</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="wall_api_box">2020.02.26</td>
                                                    <td>200,000</td>
                                                </tr>
                                                <tr>
                                                    <td className="wall_api_box">2020.02.26</td>
                                                    <td>200,000</td>
                                                </tr>
                                                <tr>
                                                    <td className="wall_api_box">2020.02.26</td>
                                                    <td>200,000</td>
                                                </tr>
                                                <tr>
                                                    <td className="wall_api_box">2020.02.26</td>
                                                    <td>200,000</td>
                                                </tr>
                                                <tr>
                                                    <td className="wall_api_box">2020.02.26</td>
                                                    <td>200,000</td>
                                                </tr>
                                                <tr>
                                                    <td className="wall_api_box">2020.02.26</td>
                                                    <td>200,000</td>
                                                </tr>
                                                <tr>
                                                    <td className="wall_api_box">2020.02.26</td>
                                                    <td>200,000</td>
                                                </tr>
                                                <tr>
                                                    <td className="wall_api_box">2020.02.26</td>
                                                    <td>200,000</td>
                                                </tr>
                                                <tr>
                                                    <td className="wall_api_box">2020.02.26</td>
                                                    <td>200,000</td>
                                                </tr>
                                                <tr>
                                                    <td className="wall_api_box">2020.02.26</td>
                                                    <td>200,000</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                    <Popup_Pagination />
                                    <div className="one_ok_button_box">
                                        <button className="ok_btn_popup" onClick={Image_close_popup}>닫기</button>
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

export default Api_usage_popup;