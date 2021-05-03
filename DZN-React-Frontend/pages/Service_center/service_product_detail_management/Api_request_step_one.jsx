import React, {
  useCallback,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import Table from "react-bootstrap/Table";
import Step_two from "./Api_request_step_two";
import select_active from "../../../image/Dev_Center/Api_request_step/select_active.png";
import { useState } from "react";
import Api_request_step_one_api_name from "./api_request_step_one_api_name";
import Api_request_step_two_list from "./Api_request_step_two_list";
import Api_request_step_one_category from "./Api_request_step_one_category";
import Api_request_step_one_sub_category from "./Api_request_step_one_sub_category";
import Api_request_Search from "../service_product_search/Api_request";
import Use_api_apprvl_table from "./component/use_api_apprvl_table";
import Api_none_search from "../service_product_search/Api_none_search";
import { useApiPopup } from "./Api_request";
import { useServiceSalesContext } from "../service_product_detail_management/service_product_detail_management";

const SearchApiAdd = createContext();

const Api_request_step_one = () => {
  const { use_api_list, cate_list, serviceID } = useServiceSalesContext();
  const [checkApiName, setCheckApiName] = useState([]); // 신청할 api에서 선택된 api 이름 배열

  const [categoryClick, setCategoryClick] = useState(); // 신청할 api 선택에서 선택한 카테고리 값
  const [subCategoryClick, setSubCategoryClick] = useState(); // 신청할 api 선택에서 선택한 서브 카테고리 값

  const [categoryState, setCategoryState] = useState(false); // 신청할 api 선택에서 카테고리 선택 부울값

  const [arrayApiLengthVal, setArrayApiLengthVal] = useState([]); // 신청할 api에서 카테고리 선택한 값만 객체 저장 ( 총 *건 )

  const [objCheck, setObjCheck] = useState(false); //체크박스 부울값
  const [apiCheckPopup, setApiCheckPopup] = useState([]); //선택 API 사용 신청 목록

  const {
    apiRequestVal,
    array,
    SetCheckValState,
    checkValState,
  } = useApiPopup(); //검색했을때 컴포넌트 변경 부울값

  const Use_Api_Approved_result_Click = useCallback(() => {
    const Data_Approved_result_popup = document.getElementById(
      "Data_Approved_result_popup"
    );
    Data_Approved_result_popup.style.display = "table";
  }, []);

  // 객체 안에 category 중복값 제거
  const array_category_val = [
    ...array.test1
      .reduce((r, o) => {
        // r = 누적 값 ,o = 현잿값
        const key = o.category + "-" + o.category;
        const item =
          r.get(key) ||
          Object.assign({}, o, {
            //객체 병합
            apiCnt: 0,
          });
        item.apiCnt += 1; //중복이 몇개인지 계산
        // key = 카테고리 이름, item = 카테고리 해당 객체
        return r.set(key, item);
      }, new Map())
      .values(),
  ];

  const array_sub_category_val = [
    ...array.test1
      .reduce((r, o) => {
        const key = o.sub_category + "-" + o.sub_category;
        const item =
          r.get(key) ||
          Object.assign({}, o, {
            apiCnt: 0,
          });
        item.apiCnt += 1;
        return r.set(key, item);
      }, new Map())
      .values(),
  ];

  useEffect(() => {
    const categoryList = document.getElementsByClassName(
      "category_select_evt_category"
    );
    for (let i = 0; i < categoryList.length; i++) {
      categoryList[i].addEventListener("click", (e) => {
        if (e.target.className === "category_select_evt_category") {
          if (document.getElementById("api_check_a")) {
            document.getElementById("api_check_a").checked = false;
          }
          setCategoryState(false); //총 *건 값 숨기기
          //카테고리 선택 시 클래스 추가 이벤트
          const category_select_evt = document.getElementsByClassName(
            "category_select_evt_category"
          );
          for (let j in category_select_evt) {
            // 클릭하기전에 li안에 active 클래스 초기화
            if (
              category_select_evt[j].className ===
              "category_select_evt_category api_select_active"
            ) {
              category_select_evt[j].classList.remove("api_select_active");
            }
          }
          category_select_evt[i].classList.add("api_select_active"); // 클릭한 li요소에 active class 추가
          setSubCategoryClick(false); //state에 저장되어있는 sub_category 값 초기화
          setCategoryClick(e.target.childNodes[0].textContent); //클릭한 li요소에 텍스트를 state에 저장
        }
      });
    }
  }, [!apiRequestVal]);

  useEffect(() => {
    const subCategoryClick = document.getElementsByClassName(
      "category_select_evt_sub_category"
    );
    for (let i = 0; i < subCategoryClick.length; i++) {
      subCategoryClick[i].addEventListener("click", (e) => {
        if (document.getElementById("api_check_a")) {
          document.getElementById("api_check_a").checked = false;
        }
        setCategoryState(true);
        setArrayApiLengthVal([]); // STEP 1 총 개수 값 초기화
        //선택한 카테고리 api 총 개수 구하기
        for (let j in array.test1) {
          if (
            array.test1[j].sub_category === e.target.childNodes[0].textContent
          ) {
            setArrayApiLengthVal((arrayApiLengthVal) => [
              ...arrayApiLengthVal,
              array.test1[j],
            ]);
          }
        }

        //서브 카테고리 선택 시 클래스 추가 이벤트
        for (let i in subCategoryClick) {
          if (
            subCategoryClick[i].className ===
            "category_select_evt_sub_category api_select_active"
          ) {
            subCategoryClick[i].classList.remove("api_select_active");
          }
        }
        setSubCategoryClick(e.target.childNodes[0].textContent);
        subCategoryClick[i].classList.add("api_select_active");
      });
    }
  }, [categoryClick]);

  const select_api_add_btn = useCallback(() => {
    let objs = document.getElementsByClassName("svc_checkbox_state");
    let arrayVal = [];

    // 체크한 api 값 저장
    array.test1.map((item) => {
      for (let i = 0; i < objs.length; i++) {
        if (objs[i].checked && Number(objs[i].value) === Number(item.id)) {
          arrayVal.push(item);
        }
      }
    });

    // 처음에 초기값이 없을 때 바로
    if (checkValState.findIndex((i) => i.api) !== 0) {
      arrayVal.map((item) => {
        SetCheckValState((checkValState) => [...checkValState, item]);
      });
    }

    // 사용 신청할 API에 존재하면 실행
    else {
      Object.values(checkValState).map((item) => {
        Object.values(arrayVal).map((item2, index) => {
          if (item.id === item2.id) {
            arrayVal.splice(index, 1);
            checkValState.every(() => item.id === item2.id);
          }
        });
      });
      arrayVal.map((item) => {
        SetCheckValState((checkValState) => [...checkValState, item]);
      });
    }

    // 체크 박스 해제
    if (document.getElementById("api_check_a")) {
      document.getElementById("api_check_a").checked = false;
    }
    for (let i = 0; i < objs.length; i++) {
      objs[i].checked = false;
    }
  }, [checkValState]);

  const selectAll_btn = useCallback(() => {
    let selectAll = document.querySelector("#api_check_a");
    let objs = document.querySelectorAll(".svc_checkbox_state");
    if (selectAll.checked === true) {
      for (let i = 0; i < objs.length; i++) {
        objs[i].checked = false;
      }
    } else if (selectAll.checked === false) {
      for (let i = 0; i < objs.length; i++) {
        objs[i].checked = true;
      }
    }
  }, []);

  return (
    <React.Fragment>
      <SearchApiAdd.Provider
        value={{
          select_api_add_btn,
          array,
          apiCheckPopup,
          setApiCheckPopup,
          setCategoryClick,
          setSubCategoryClick,
          objCheck,
          setObjCheck,
        }}
      >
        {apiRequestVal === undefined ? (
          <div className="api_request_list_wrap clearfix">
            <div className="list_title clearfix">
              <p>STEP 1 신청할 API 선택</p>
              <button
                className="api_list_content_button"
                onClick={select_api_add_btn}
              >
                선택 항목 사용 신청 추가 {">"}
              </button>
            </div>

            <div className="api_list_content clearfix">
              <ul className="api_select first_select">
                {/* <li className="api_select_active">
              <p>회계/인사/재무</p> (200)
              <img src={select_active} />
            </li> */}
                {Object.values(array_category_val).map((item) => {
                  // array.test1.category
                  return (
                    <Api_request_step_one_category
                      category={item.category}
                      apiCnt={item.apiCnt}
                      key={item.id}
                    />
                  );
                })}
              </ul>
              <ul className="api_select second_select">
                {Object.values(array_sub_category_val).map(
                  (item) =>
                    // state 값과 배열 안에 들어있는 category가 일치하는 값만 호출
                    categoryClick === item.category && (
                      <Api_request_step_one_sub_category
                        sub_category={item.sub_category}
                        api={item.api}
                        apiCnt={item.apiCnt}
                        key={item.id}
                      />
                    )
                )}
              </ul>

              <ul className="checkbox_wrap">
                {categoryState ? (
                  <li>
                    <input type="checkbox" id="api_check_a" />
                    <label
                      className="checkbox_design"
                      htmlFor="api_check_a"
                      onClick={selectAll_btn}
                    >
                      총 {Object.keys(arrayApiLengthVal).length}건
                    </label>
                  </li>
                ) : (
                  <React.Fragment></React.Fragment>
                )}
                {array.test1.map((item, index) => {
                  if (
                    categoryClick === item.category &&
                    subCategoryClick === item.sub_category
                  ) {
                    return (
                      <Api_request_step_one_api_name
                        api_name={item.api}
                        fare={item.fare}
                        id={item.id}
                        key={item.id}
                      />
                    );
                  }
                })}
              </ul>
            </div>
          </div>
        ) : (
          <Api_request_Search array={array} />
        )}
        <Step_two
          checkValState={checkValState}
          checkApiName={checkApiName}
          setCheckValState={SetCheckValState}
        />
        <Table responsive>
          <caption className="tb_caption">
            <div className="judge_table_title">신청 API</div>
            <div>승인 완료 된 API는 사용 API 목록에서 확인 할 수 있습니다.</div>
          </caption>
          <thead>
            <tr>
              <th>카테고리</th>
              <th>API</th>
              <th>요금제</th>
              <th>승인여부</th>
            </tr>
          </thead>
          <tbody>
            {use_api_list &&
              use_api_list.map((api_list) => {
                return (
                  Number(api_list.pdsvc_idx) === Number(serviceID) && (
                    <Use_api_apprvl_table
                      Table_api_list={api_list}
                      cate_list={cate_list}
                      key={api_list.sua_idx}
                    />
                  )
                );
              })}
          </tbody>
        </Table>
      </SearchApiAdd.Provider>
    </React.Fragment>
  );
};

export default Api_request_step_one;

export function useSearchApiAdd() {
  return useContext(SearchApiAdd);
}
