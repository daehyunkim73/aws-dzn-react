import React from "react";
import None_search from "../../../image/Dev_Center/question/search_none.png";
import { useApiPopup_sale } from "../service_sale_product_detail_management/Api_request";
import { useApiPopup } from "../service_product_detail_management/Api_request";
import { useHistory } from "react-router";

const Api_none_search = () => {
  const svc_url = useHistory();
  const { searchCategoryBtn } =
    svc_url.location.pathname.indexOf("saleproduct") !== -1
      ? useApiPopup_sale()
      : useApiPopup(); //검색했을때 컴포넌트 변경 부울값
  return (
    <React.Fragment>
      <div className="api_none_search_wrap ">
        <button className="serach_category_btn" onClick={searchCategoryBtn}>
          카테고리 선택
        </button>
        <div className="api_none_search_table">
          <div className="api_none_search_box">
            <img src={None_search} />
            <br />
            <span>검색된 결과가 없습니다.</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Api_none_search;
