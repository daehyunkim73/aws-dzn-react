import React from 'react';
import Calculate_history_popup from '../../../popup/Popup_salesCal_Management/Calculate_history_popup';
import Calculate_term_popup from '../../../popup/Popup_salesCal_Management/Calculate_term_popup';

const Calculate_management_search = () => {
    const Calculate_popup_Click = () => {
        const Admin_user_calculate_term_popup_bgk = document.getElementById("Admin_user_calculate_term_popup_bgk");
        Admin_user_calculate_term_popup_bgk.style.display="table";
    }
    
    return (
        <React.Fragment>
            <Calculate_history_popup /> {/* 정산하기 클리깃 해당 정산시간에 이미 정산된날 짜가 포함된 경우 팝업 */}
            <Calculate_term_popup /> 
            <div className="backoffice_search_wrap calculate_entry_wrap">
                <div className="calculate_input">
                    <p>
                        <label htmlFor='name'>회원명 / 아이디</label>
                        <input type='text' id='name' className='form-control' />
                        <button className='table_view_btn'>회원찾기</button>
                    </p>
                    <p>
                        <label htmlFor='entry_date'>등록 정산일</label>
                        <input type='text' id='entry_date' className='form-control' />
                    </p>
                    <p>
                        <label htmlFor='money'>수수료</label>
                        <input type='text' id='money' className='form-control' />
                    </p>
                    <p>
                        <label htmlFor='date1'>정산 기간 선택</label>
                        <input type='text' id='date1' className='form-control' />
                        <span> ~ </span>
                        <input type='text' id='date2' className='form-control' />
                        <button className='table_view_btn'>검색</button>
                    </p>
                </div>
                <div className='backoffice_table_wrap calculate_table_wrap'>
                    <div className='table-responsive'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>판매유형(수)</th>
                                    <th>총 결제금액(원)</th>
                                    <th colSpan='2'>
                                        <p>결제수단</p>
                                        <div className='th_double_wrap'>
                                            <p>카드(원)</p>
                                            <p>포인트</p>
                                        </div>
                                    </th>
                                    <th>
                                        <p>수수료 계산</p>
                                        <p>(총 결제금액의 %)</p>
                                    </th>
                                    <th>
                                        <p>정산금액(원)</p>
                                        <p>(총 결제금액 - 수수료)</p>
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>서비스(5)</td>
                                    <td>200,000</td>
                                    <td>15,000</td>
                                    <td>5,000</td>
                                    <td>
                                        <div>
                                            <input type='text' className='form-control' />
                                            <p> % </p>
                                            <button className='table_view_btn'>계산</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <input type='text' className='form-control' />
                                            <p>원</p>
                                        </div>
                                    </td>
                                    <td><button className='table_view_btn'
                                    onClick={Calculate_popup_Click}>정산하기</button></td>
                                </tr>
                                <tr>
                                    <td>데이터(2)</td>
                                    <td>10,000,000</td>
                                    <td>9,000,000</td>
                                    <td>1,000,000</td>
                                    <td>
                                        <div>
                                            <input type='text' className='form-control' />
                                            <p> % </p>
                                            <button className='table_view_btn'>계산</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <input type='text' className='form-control' />
                                            <p> 원</p>
                                        </div>
                                    </td>
                                    <td><button className='table_view_btn'
                                    onClick={Calculate_popup_Click}>정산하기</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Calculate_management_search;
