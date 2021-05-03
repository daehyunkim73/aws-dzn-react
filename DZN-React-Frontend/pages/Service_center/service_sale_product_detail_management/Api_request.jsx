import React, { createContext, useContext } from "react";
import Step_one from "./Api_request_step_one";
import Data_Approved_result_popup from "../../popup/Middle/Data_Approved_result_popup";
import search from "../../../image/Dev_Center/API_Document/search.png";
import { useState } from "react";
import { useEffect } from "react";
import Api_none_search from "../service_product_search/Api_none_search";

const PopupContext = createContext();
const Api_request = () => {
  // 팝업
  const [apiCheckPopup, setApiCheckPopup] = useState([]); // 사용 신청한 api 객체
  const [apiRequestVal, setApiRequestVal] = useState(); // 검색창에 입력한 값
  const [apiSearchVal, setApiSearchVal] = useState([]); // 검색한 내용에 맞는 값을 담은 배열
  const [aaaaa, setaaaaa] = useState([]); // 검색한 내용에 맞는 값을 담은 배열
  const [apiSearchValState, setApiSearchValState] = useState(false); //검색한 값이 있는지 없는지 부울값
  const [checkValState, SetCheckValState] = useState([]); // 신청할 api에서 선택된 api 객체

  let apiSearchState = false; // 한번이라도 검색한 값이 일치하는 내용이 있는지 알려주는 부울값

  const enter_api_request_btn = () => {
    //엔터키 실행
    if (window.event.keyCode == 13) {
      api_request_btn();
    }
  };

  const api_request_btn = () => {
    apiSearchVal.length = 0; // 검색한 값 초기화
    //검색 기능
    const search_val = document.getElementById("svc_search_input");
    if (search_val.value !== "") {
      // 빈 값이 아니면 실행
      let SearchVal, cnt;

      SearchVal = document
        .getElementById("svc_search_input")
        .value.toUpperCase(); // 검색창의 값을 모두 대문자로 변경 후 대소문자 상관없이 검색

      for (cnt = 0; cnt < Object.keys(array.test1).length; cnt++) {
        if (array.test1[cnt].api.toUpperCase().indexOf(SearchVal) > -1) {
          //일치하는 값이 -1보다 많으면 if문 실행
          array.test1[cnt].checked = true;
          apiSearchVal.push(array.test1[cnt]);
          apiSearchState = true; // 일치하는 값이 들어가면 true
        } else {
          setApiSearchValState(true);
        }
        if (apiSearchState === true) {
          //배열값이 한번이라도 바뀌었으면 false로 바꿈
          setApiSearchValState(false);
        }
      }
      setApiRequestVal(search_val.value); // 검색창의 입력한 값 저장
    } else {
      alert("검색어를 입력해주세요.");
    }
  };

  //카테고리 선택 메뉴로 돌아가기
  const searchCategoryBtn = () => {
    const search_val = document.getElementById("svc_search_input"); //검색창 DOM
    search_val.value = ""; //검색창 값 초기화

    setApiRequestVal(); //검색 값 있을때 삼항연산자 조건 변경
    setApiSearchValState(false); //검색 값 없을때 삼항연산자 조건 변경
  };

  const array = {
    test1: [
      {
        id: 1,
        checked: false,
        state: "api_click_1",
        category: "회계",
        sub_category: "회계관리 API",
        api: "기업재무데이터를 활용한 부도예측 API",
        fare: "무료",
      },

      {
        id: 2,
        checked: false,
        state: "api_click_2",
        category: "회계",
        sub_category: "재무 관리 API",
        api: "전표 처리 API",
        fare: "유료",
      },
      {
        id: 3,
        checked: false,
        state: "api_click_3",
        category: "부동산",
        sub_category: "경비 청구 API",
        api: "전자세금계산서 API",
        fare: "",
      },
      {
        id: 4,
        checked: false,
        state: "api_click_4",
        category: "부동산",
        sub_category: "계약 관리 API",
        api: "뉴스 칼럼 API",
        fare: "유료",
      },
      {
        id: 5,
        checked: false,
        state: "api_click_5",
        category: "부동산",
        sub_category: "계약 관리 API",
        api: "부동산 계5약 API",
        fare: "유료",
      },
      {
        id: 6,
        checked: false,
        state: "api_click_6",
        category: "부동산",
        sub_category: "계약 관리 API",
        api: "부동산 계6약 API",
        fare: "유료",
      },
      {
        id: 7,
        checked: false,
        state: "api_click_7",
        category: "부동산",
        sub_category: "계약 관리 API",
        api: "부동산 계7약 API",
        fare: "유료",
      },
      {
        id: 8,
        checked: false,
        state: "api_click_8",
        category: "부동산",
        sub_category: "계약 관리 API",
        api: "부동산 계8약 API",
        fare: "유료",
      },
      {
        id: 9,
        checked: false,
        state: "api_click_9",
        category: "음식",
        sub_category: "치킨 관리 API",
        api: "무슨 치킨 API",
        fare: "유료",
      },
      {
        id: 10,
        checked: false,
        state: "api_click_10",
        category: "음식",
        sub_category: "고기 관리 API",
        api: "고기 먹기 API",
        fare: "유료",
      },
    ],
  };

  return (
    <React.Fragment>
      <PopupContext.Provider
        value={{
          apiCheckPopup,
          setApiCheckPopup,
          apiRequestVal,
          setApiRequestVal,
          array,
          apiSearchVal,
          apiSearchValState,
          checkValState,
          SetCheckValState,
          searchCategoryBtn,
        }}
      >
        <Data_Approved_result_popup />
        <div className="service_basic_info api_request_info api_request">
          <div className="exposure_info_title_wrap clearfix">
            <div className="api_search">
              <p>WEHAGO API 라이브러리</p>
              <input
                id="svc_search_input"
                type="text"
                placeholder="API 제목을 입력해주세요."
                onKeyPress={enter_api_request_btn}
              />
              <img src={search} alt="search" onClick={api_request_btn} />
            </div>
            <div className="api_search_text">
              <ul>
                <li>
                  신청할 API를 선택하여 사용신청하시면 승인 완료 후 사용할 수
                  있습니다.
                </li>
                <li>
                  유료 API일 경우, 제작중인 API는 무료로 제공되며 판매 개시 후
                  유료로 전환됩니다.
                </li>
              </ul>
            </div>
          </div>
          {apiSearchValState ? <Api_none_search /> : <Step_one />}
        </div>
      </PopupContext.Provider>
    </React.Fragment>
  );
};

export default Api_request;

export function useApiPopup_sale() {
  return useContext(PopupContext);
}
