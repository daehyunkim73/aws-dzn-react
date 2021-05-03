import React, { useState, useCallback } from 'react';
import Calculate_history_popup from '../../../popup/Popup_salesCal_Management/Calculate_history_popup';
import Calculate_term_popup from '../../../popup/Popup_salesCal_Management/Calculate_term_popup';
import Date_picker from '../../../../Big_component/Date_Picker';
import moment from "moment";
import { useEffect } from 'react';
import { Server_ajax_post } from '../../../../../Server_ajax';
import { useUserInfo } from '../../../../Big_component/Admin_router';
import { useHistory } from 'react-router';

const Calculate_management_search = () => {
  const { selectUserInfo } = useUserInfo();
  const history = useHistory();
  const [accountList, setAccountList] = useState([]);
  const [calculateList, setCalculateList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [settlement_amoun, setSettlement_amoun] = useState(); // 정산금액


  useEffect(() => {
    if(selectUserInfo.length !== 0) {
      (async () => {
        try{
            // 기본정보 불러오기
            const data = {
              portalId: selectUserInfo[0].id,
              compId: selectUserInfo[0].comp_id,
            }   
            const ajax_accountList = await Server_ajax_post(
              `sales_managment/getUserAccountList`, data
            );
            setAccountList(ajax_accountList);
            const ajax_calculateList = await Server_ajax_post(
              `sales_managment/getCalculateList`, data
            );
            setCalculateList(ajax_calculateList);
        }
        catch(e){
            console.error(e);
        }
    })()
    }
}, [])

  const Calculate_popup_Click = () => {
    const Admin_user_calculate_term_popup_bgk = document.getElementById("Admin_user_calculate_term_popup_bgk");
    Admin_user_calculate_term_popup_bgk.style.display="table";
}
  // 개월수 클릭 이벤트
  const dateClick = useCallback((e) => {
    let subDate = e.target.id;

    const buttonClick = document.querySelectorAll(".serach_date_btn");
    const startDate = document.querySelector(
      ".range-picker-input__start .picker-input__text"
    );
    const endDate = document.querySelector(
      ".range-picker-input__end .picker-input__text"
    );

    buttonClick.forEach((data) => {
      if (data.id === subDate) {
        data.classList.add("serach_date_btn_active");
      } else {
        data.classList.remove("serach_date_btn_active");
      }
    });

    if (subDate === "") {
      startDate.value = "";
      endDate.value = "";
    } else if (subDate === "7") {
      startDate.value = moment().subtract(subDate, "d").format("YYYY-MM-DD");
      endDate.value = moment(new Date()).format("YYYY-MM-DD");
    } else if (subDate !== "365") {
      switch (subDate) {
        case "30":
          subDate = "1";
          break;
        case "90":
          subDate = "3";
          break;
        case "180":
          subDate = "6";
          break;
      }
      startDate.value = moment().subtract(subDate, "M").format("YYYY-MM-DD");
      endDate.value = moment(new Date()).format("YYYY-MM-DD");
    } else {
      startDate.value = moment().subtract(1, "Y").format("YYYY-MM-DD");
      endDate.value = moment(new Date()).format("YYYY-MM-DD");
    }

    setStartDate(startDate.value);
    setEndDate(endDate.value);
  }, []);

  const userSearch = () => {
    history.push("/admin/userinfo");
  }
  const Fee_calculation = (total, index) => () => {
    let val = document.getElementById(`calculation_val_${index}`).value;
    val = val / 100;
    val = total * val;
    setSettlement_amoun(total - val)
  }

  return (
    <React.Fragment>
   <Calculate_history_popup /> {/* 정산하기 클리깃 해당 정산시간에 이미 정산된날 짜가 포함된 경우 팝업 */}
            <Calculate_term_popup /> 
            <div className="backoffice_search_wrap calculate_entry_wrap">
                <div className="calculate_input">
                    <p>
                        <label htmlFor='name'>회원명 / 아이디</label>
                        <input type='text' id='name' className='form-control' value={ accountList.length !== 0 ? accountList[0].mbr_id : ""} />
                        <button className='table_view_btn' onClick={userSearch}>회원찾기</button>
                    </p>
                    <p>
                        <label htmlFor='entry_date'>등록 정산일</label>
                        <input type='text' id='entry_date' className='form-control' />
                    </p>
                    <p>
                        <label htmlFor='money'>수수료</label>
                        <input type='text' id='money' className='form-control' />
                    </p>
                    <div>
                        <label htmlFor='date1'>정산 기간 선택</label>
                <div className="dis_inlineBlock">
                  <Date_picker start={startDate} end={endDate} />
                </div>
                <div className="serach_date_btn_wrap dis_inlineBlock calculate_date_btn">
                <button
                    id="7"
                    className="serach_date_btn"
                    onClick={dateClick}
                  >
                    7일
                  </button>
                  <button
                    id="30"
                    className="serach_date_btn"
                    onClick={dateClick}
                  >
                    1개월
                  </button>
                  <button
                    id="90"
                    className="serach_date_btn"
                    onClick={dateClick}
                  >
                    3개월
                  </button>
                  <button
                    id="180"
                    className="serach_date_btn"
                    onClick={dateClick}
                  >
                    6개월
                  </button>
                  <button
                    id="365"
                    className="serach_date_btn"
                    onClick={dateClick}
                  >
                    1년
                  </button>
                  <button id="" className="serach_date_btn" onClick={dateClick}>
                    전체
                  </button>
                </div>
                    </div>
                    <div className="input_submit_wrap"><button className="search_btn"> 검색</button></div>
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
                              {calculateList.map((item, index) => {
                                return(
                                  <tr>
                                  <td>{item.datasvc_gbn === "S" ? "서비스" : "데이터"}</td>
                                  <td>{item.total_pay_amnt}</td>
                                  <td>{item.card_pay_amnt}</td>
                                  <td>{item.point_pay_amnt}</td>
                                  <td>
                                      <div>
                                          <input type='text' id={`calculation_val_${index}`} className='form-control' />
                                          <p> % </p>
                                          <button onClick={Fee_calculation(item.total_pay_amnt, index)} className='table_view_btn'>계산</button>
                                      </div>
                                  </td>
                                  <td>
                                      <div>
                                          <input type='text' className='form-control' value={settlement_amoun} />
                                          <p>원</p>
                                      </div>
                                  </td>
                                  <td><button className='table_view_btn'
                                  onClick={Calculate_popup_Click}>정산하기</button></td>
                              </tr>
                                )
                              })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    </React.Fragment>
  );
};

export default Calculate_management_search;
