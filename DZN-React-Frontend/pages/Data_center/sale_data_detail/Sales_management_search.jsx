import React, { useCallback, useState } from 'react';
import Date_Picker from '../../Main_Page/component/datapicker_calendar';
import moment from 'moment'

const Sales_management_search = ({ setSearchData, setRending, setIsSearch }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  

  const searchClick = () => {
    const startDate = document.querySelector(".range-picker-input__start .picker-input__text");
    const endDate = document.querySelector(".range-picker-input__end .picker-input__text");

    setSearchData({startDate: startDate.value, endDate: endDate.value});
    setStartDate(startDate.value);
    setEndDate(endDate.value);
    setRending(true);
    setIsSearch(true);
  }

  // 개월수 클릭 이벤트
  const dateClick = useCallback((e) => {    
    let subDate = e.target.id;
    const buttonClick = document.querySelectorAll(".serach_date_btn");    
    const startDate = document.querySelector(".range-picker-input__start .picker-input__text");
    const endDate = document.querySelector(".range-picker-input__end .picker-input__text");

    buttonClick.forEach((data) => {
      if(data.id === subDate) {
        data.classList.add("serach_date_btn_active");
      } else {
        data.classList.remove("serach_date_btn_active");
      }
    })    
    
    if(subDate === ''){
      startDate.value = '';
      endDate.value = '';
    } else if (subDate === "7") {
      startDate.value = moment().subtract(subDate, 'd').format('YYYY-MM-DD');
      endDate.value = moment(new Date).format('YYYY-MM-DD');
    } else if( subDate !== "365"){
      switch(subDate) {
        case "30": subDate = "1"; break;
        case "90": subDate = "3"; break;
        case "180": subDate = "6"; break;
      }
      startDate.value = moment().subtract(subDate, 'M').format('YYYY-MM-DD');
      endDate.value = moment(new Date).format('YYYY-MM-DD');
    } else {
      startDate.value = moment().subtract(1, 'Y').format('YYYY-MM-DD');
      endDate.value = moment(new Date).format('YYYY-MM-DD');
    }    

    setStartDate(startDate.value);
    setEndDate(endDate.value);
  }, [])

  return (
    <div className="input_wrap sales_management_wrap">
      <div className="user_list_wrap">
        <div className="input_box_wrap">
          <div className="input_box">검색기간</div>
        </div>
        <div className="input_form_wrap">
          <div className="input_form date_Picer_input">
            <Date_Picker start={startDate} end={endDate}/>            
            <div className="serach_date_btn_wrap">
              <button id="7" className="serach_date_btn" onClick={dateClick}>7일</button>
              <button id="30" className="serach_date_btn" onClick={dateClick}>1개월</button>
              <button id="90" className="serach_date_btn" onClick={dateClick} >3개월</button>
              <button id="180" className="serach_date_btn" onClick={dateClick}>6개월</button>
              <button id="365" className="serach_date_btn" onClick={dateClick}>1년</button>
              <button id="" className="serach_date_btn" onClick={dateClick}>전체</button>
            </div>            
          </div>
        </div>
      </div>
      <div className="input_submit_wrap">
        <button className="search_btn" onClick={searchClick}>
          검색
        </button>
      </div>
    </div>
  );
}

export default Sales_management_search;
