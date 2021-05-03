import React from "react";
import search from "../../../image/Dev_Center/API_Document/search.png";
import { useApiPopup } from "../service_product_detail_management/Api_request";
import { useSearchApiAdd } from "../service_product_detail_management/Api_request_step_one";
import Api_search_request_list from "./Api_search_request_list";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useSearchApiAdd_sale } from "../service_sale_product_detail_management/Api_request_step_one";
import { useApiPopup_sale } from "../service_sale_product_detail_management/Api_request";

const Api_request = () => {
  const svc_url = useHistory();

  const { apiSearchVal, searchCategoryBtn } =
    svc_url.location.pathname.indexOf("saleproduct") !== -1
      ? useApiPopup_sale()
      : useApiPopup(); //검색했을때 컴포넌트 변경 부울값
  const { select_api_add_btn, setCategoryClick, setSubCategoryClick } =
    svc_url.location.pathname.indexOf("saleproduct") !== -1
      ? useSearchApiAdd_sale()
      : useSearchApiAdd();

  const selectAll_btn = () => {
    let selectAll = document.querySelector("#search_api_all_check");
    let objs = document.querySelectorAll(".svc_checkbox_state");
    if (selectAll.checked === true) {
      for (let i = 0; i < objs.length; i++) {
        objs[i].checked = true;
      }
    } else if (selectAll.checked === false) {
      for (let i = 0; i < objs.length; i++) {
        objs[i].checked = false;
      }
    }
  };

  const Search_select_api_add_btn = () => {
    select_api_add_btn;
    setCategoryClick(false);
    setSubCategoryClick(false);
  };
  return (
    <React.Fragment>
      <div className="service_basic_info api_request_info api_request_search">
        <div className="api_request_list_wrap clearfix">
          <div className="list_title clearfix">
            <p>STEP 1 신청할 A1PI 선택</p>
            <button className="serach_category_btn" onClick={searchCategoryBtn}>
              카테고리 선택
            </button>
          </div>
          <div className="api_list_content clearfix">
            <button
              className="serach_category_btn"
              onClick={select_api_add_btn}
            >
              선택 항목 사용 신청 추가 {">"}
            </button>
            <ul className="checkbox_wrap">
              <li className="checkbox_">
                <input
                  type="checkbox"
                  id="search_api_all_check"
                  onClick={selectAll_btn}
                />
                <label
                  className="checkbox_design"
                  htmlFor="search_api_all_check"
                >
                  총 {apiSearchVal.length}건
                </label>
              </li>

              {Object.values(apiSearchVal).map((item) => {
                return (
                  <Api_search_request_list
                    category={item.category}
                    api={item.api}
                    fare={item.fare}
                    id={item.id}
                    key={item.id}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Api_request;
