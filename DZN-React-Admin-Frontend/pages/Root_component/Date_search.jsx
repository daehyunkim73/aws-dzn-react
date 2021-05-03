import React, { useState, useEffect, useCallback } from "react";
import Date_Picker from "../Main_Page/component/datapicker_calendar";

const Date_sarch_pciker = (props) => {
  const {
    search_yn_state,
    setSearch_yn_state,
    find_post_date,
    setFind_post_date,
  } = props;
  let root_date = new Date();
  let Year = root_date.getFullYear();
  let Month = root_date.getMonth();
  let rooDate = root_date.getDate();
  Month++;

  /* 변동 날짜 */
  const Month_oneL = String(Month).length === 1 ? "0" + Month : Month;
  const Date_oneL = String(rooDate).length === 1 ? "0" + rooDate : rooDate;
  /* 변동 날짜 */

  // 고정 현재시간
  let now_date_year = root_date.getFullYear();
  let now_Month = root_date.getMonth();
  now_Month++;

  let now_rooDate = root_date.getDate();
  const now_Month_oneL = String(now_Month).length === 1 ? "0" + Month : Month;
  const now_Date_oneL =
    String(now_rooDate).length === 1 ? "0" + rooDate : rooDate;
  const [now_date, setNow_date] = useState(
    now_date_year + "-" + now_Month_oneL + "-" + now_Date_oneL
  ); //현재시간
  // 고정 현재시간

  const [date, setDate] = useState(Year + "-" + Month_oneL + "-" + Date_oneL); //변동현재 날짜
  const [seven, setSeven] = useState(7);
  const [num1_month, setNum1_month] = useState(1);
  const [num3_month, setNum3_month] = useState(3);
  const [num6_month, setNum6_month] = useState(6);
  const [big_one_year, setBig_one_year] = useState(1);
  const [date_yn, setDate_yn] = useState(false);
  const [listDate, setListDate] = useState([]); //날짜 리스트를 담을 애

  const Date_big_list = (
    sameDate,
    sameEnd_date,
    samedateMove,
    sameDate_listDate
  ) => {
    //날짜 리스트 뽑기
    while (sameDate < sameEnd_date) {
      sameDate = samedateMove.toISOString().slice(0, 10);
      sameDate_listDate.push(sameDate);
      samedateMove.setDate(samedateMove.getDate() + 1);
    }
    return sameDate_listDate;
  };

  const getDateRange = (setStart_date, setEnd_date, Date_listDate) => {
    let dateMove = new Date(setStart_date);
    let strDate = setStart_date;

    let dateMove2 = new Date(setEnd_date);
    let strDate2 = setEnd_date;

    if (setStart_date === setEnd_date) {
      strDate = dateMove.toISOString().slice(0, 10);
      Date_listDate.push(strDate);
    } else {
      if (strDate < setEnd_date) {
        //검색 버튼 클릭
        Date_big_list(strDate, setEnd_date, dateMove, Date_listDate);
      } else if (strDate2 < setStart_date) {
        //datepicker 검색
        Date_big_list(strDate2, setStart_date, dateMove2, Date_listDate);
      }
    }
    return Date_listDate;
  };

  useEffect(() => {
    const Date_search = document.querySelectorAll(
      ".datePicker_box .picker-input__text"
    );
    if (date_yn === true) {
      Date_search[0].value = now_date;
      Date_search[1].value = date;
    } else if (date_yn === false) {
      Date_search[0].placeholder = "Start Date";
      Date_search[1].placeholder = "End Date";
    }
  });

  const Same_date = (arr_num, Date_obj, date_pri_data) => {
    const service_key_btn = document.querySelectorAll(
      ".appr_service_btn > button"
    );
    if (service_key_btn[arr_num].classList.contains("search_active")) {
      //비활성화 상태
      setDate_yn(false);
      service_key_btn[arr_num].classList.remove("search_active");
      service_key_btn[arr_num].style.backgroundColor = "#555555";
    } else {
      //활성화 상태
      setDate_yn(true);
      setSearch_yn_state(false);
      setNow_date(now_date_year + "-" + now_Month_oneL + "-" + now_Date_oneL); //검색 버튼의 datepicker는 nowdate가 어느걸 선택할지 모르니 다시 초기화
      setFind_post_date([]);

      for (let i = 0; i < service_key_btn.length; i++) {
        service_key_btn[i].style.backgroundColor = "#555555";
        service_key_btn[i].classList.remove("search_active");
      }
      service_key_btn[arr_num].classList.add("search_active");
      service_key_btn[arr_num].style.backgroundColor = "#00a7ff";

      const Date_btn_pm = Number(Date_obj) - Number(date_pri_data);
      const plus_same_date =
        String(Date_btn_pm).length === 1 ? "0" + Date_btn_pm : Date_btn_pm;
      const threeDaysAgo = new Date(now_date);
      const result = threeDaysAgo.setDate(threeDaysAgo.getDate() - 7);
      const date_result = new Date(result);

      const zero_month =
        String(date_result.getMonth()).length === 1
          ? "0" + (Number(date_result.getMonth()) + Number(1))
          : date_result.getMonth();

      const zero_date =
        String(date_result.getDate()).length === 1
          ? "0" + (Number(date_result.getDate()) + Number(1))
          : date_result.getDate();

      if (Date_obj === Date_oneL) {
        //7일
        setDate(date_result.getFullYear() + "-" + zero_month + "-" + zero_date);
      } else if (Date_obj === Month_oneL) {
        // 1,3,6개월
        setDate(Year + "-" + plus_same_date + "-" + Date_oneL);
      } else if (Date_obj === Year) {
        // 1년이면
        setDate(plus_same_date + "-" + Month_oneL + "-" + Date_oneL);
      }
    }
  };

  const seven_days = useCallback(() => {
    Same_date(0, Date_oneL, seven);
  }, []);

  const one_month = useCallback(() => {
    Same_date(1, Month_oneL, num1_month);
  }, []);

  const three_month = useCallback(() => {
    Same_date(2, Month_oneL, num3_month);
  }, []);

  const six_month = useCallback(() => {
    Same_date(3, Month_oneL, num6_month);
  }, []);

  const one_year = useCallback(() => {
    Same_date(4, Year, big_one_year);
  }, []);

  const date_all = useCallback(() => {
    //전체보기
    setDate_yn(false);
    setSearch_yn_state(false);
    const service_key_btn = document.querySelectorAll(
      ".appr_service_btn > button"
    );
    for (let i = 0; i < service_key_btn.length; i++) {
      service_key_btn[i].classList.remove("search_active");
      service_key_btn[i].style.backgroundColor = "#555555";
    }
    service_key_btn[5].style.backgroundColor = "#00a7ff";
  }, [date_yn && search_yn_state]);

  const Date_search_btn = useCallback(() => {
    setListDate([]);
    setFind_post_date([]);

    const Date_search = document.querySelectorAll(
      ".datePicker_box .picker-input__text"
    );
    if (Date_search[0].value === "" || Date_search[1].value === "") {
      return setSearch_yn_state(false);
    } else {
      if (search_yn_state === true) {
        setSearch_yn_state(false);
      }

      setTimeout(() => {
        setSearch_yn_state(true);
        let start_date = String(Date_search[0].value);
        let end_date = String(Date_search[1].value);
        setDate(end_date);
        setNow_date(start_date);
        getDateRange(end_date, start_date, listDate);
        setFind_post_date((find_post_date) => [...find_post_date, listDate]);
      }, 0);
    }
  }, [
    (date_yn && listDate && find_post_date) ||
      (search_yn_state && date && now_date),
  ]);

  return (
    <React.Fragment>
      <div className="input_wrap sales_management_wrap">
        <div className="user_list_wrap">
          <div className="input_box_wrap">
            <div className="input_box">검색</div>
          </div>
          <div className="input_form_wrap">
            <div className="input_form date_Picer_input" id="sp_date_box">
              <Date_Picker />
              <div className="appr_service_btn">
                <button onClick={seven_days}>7일</button>
                <button onClick={one_month}>1개월</button>
                <button onClick={three_month}>3개월</button>
                <button onClick={six_month}>6개월</button>
                <button onClick={one_year}>1년</button>
                <button onClick={date_all}>전체</button>
              </div>
            </div>
          </div>
        </div>
        <div className="input_submit_wrap">
          <button
            className="search_btn"
            type="submit"
            onClick={Date_search_btn}
          >
            검색
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Date_sarch_pciker;
