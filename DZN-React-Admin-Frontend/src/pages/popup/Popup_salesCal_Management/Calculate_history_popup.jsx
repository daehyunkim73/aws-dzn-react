import React, { useCallback, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Table_middle from '../../../../func_src/Table_middle';
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';

const Calculate_history_popup = () => {
    useEffect(() => {
        Table_middle();
        return () => {
            Table_middle();
        }
    })
    const Image_close_popup = useCallback(() => {
        const Admin_user_calculate_history_popup_bgk = document.getElementById("Admin_user_calculate_history_popup_bgk");
        Admin_user_calculate_history_popup_bgk.style.display = "none";
    }, []);
    return (
        <React.Fragment>
            <div className="admin_background_same_box" id="Admin_user_calculate_history_popup_bgk">
                <div className="admin_pixed_popup_white_box">
                    <div className="admin_service_center_middel_white_box">
                        <div className="admin_popup_head_line_box">
                            <h1>정산 내역</h1>
                            <div className="admin_popupClose_box">
                                <img onClick={Image_close_popup}
                                    src={close_btn} alt="" />
                            </div>
                        </div>

                        <div className="admin_big_contents_box">
                            <div className="admin_popup_Contents_box" id="admin_popup_sp_text_box">
                                <div className="calculate_table_box">
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <td>회원명 / 아이디</td>
                                                <td>한기업 / datapotal</td>
                                            </tr>
                                            <tr>
                                                <td>정산기간</td>
                                                <td>2020.03.01~2020.03.31</td>
                                            </tr>
                                            <tr>
                                                <td>판매유형(수)</td>
                                                <td>서비스 (5)</td>
                                            </tr>
                                            <tr>
                                                <td>총 결제 금액(원)</td>
                                                <td>200,000</td>
                                            </tr>
                                            <tr>
                                                <td>정산기간</td>
                                                <td>180,000</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <div className="cal_big_text_box">
                                        <p>위 내용으로 정산하시겠습니까?</p>
                                    </div>
                                </div>
                            </div>
                            <div className="admin_popup_button_box">
                                <button className="admin_popup_first_btn" onClick={Image_close_popup}>취소</button>
                                <button className="admin_popup_second_btn" id="calculate_history_btn">확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Calculate_history_popup;