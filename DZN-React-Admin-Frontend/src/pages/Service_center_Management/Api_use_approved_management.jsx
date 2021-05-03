import React, { useEffect } from "react";
import Api_use_approved_management_search from "./components/Api_use_approved_management/Api_use_approved_management_search";
import Api_use_approved_management_table from "./components/Api_use_approved_management/Api_use_approved_management_table";
import Pagination from "../../Big_component/Pagination";

const Api_use_approved_management = (props) => {
  return (
    <React.Fragment>
      <div className="Api_use_approved_management_wrap">
        <div className="Page_same_text">
          <p className="backoffice_title">API 사용 승인관리</p>
        </div>
        <Api_use_approved_management_search />
        <Api_use_approved_management_table  />
      </div>
    </React.Fragment>
  );
};

export default Api_use_approved_management;
