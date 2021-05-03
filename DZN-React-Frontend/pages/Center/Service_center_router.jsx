import React, { useState, createContext, useContext } from "react";
import _ from "lodash";
import { Route } from "react-router";
import { useEffect } from "react";

// service_center
import Service_product from "../Service_center/service_product_management/service_product_management";
import Service_sale_product from "../Service_center/service_sale_product/service_product_management";
import Service_product_detail from "../Service_center/service_product_detail_management/service_product_detail_management";
import Service_sale_product_detail from "../Service_center/service_sale_product_detail_management/service_product_detail_management";
import Service_product_sales_calculate_info from "../Service_center/service_product_sales_calculate/Service_product_sales_calculate_info";
import Service_Calculate_list from "../Service_center/calculate_list/Calculate_list";
import Service_Sales_Report_table_v2 from "../Service_center/service_product_detail_management/Service_report/Service_glance_report_sales";
import Service_Sales_Report_table_v1 from "../Service_center/service_product_detail_management/Service_report/Service_monthly_report_sales";
import Service_product_detail_management_certification_none from "../Service_center/service_product_detail_management_certification_none/service_product_detail_management_certification_none";
import Service_product_search from "../Service_center/service_product_search/service_product_search";
import Service_product_detail_management_judge_none_table from "../Service_center/service_product_detail_management_judge_none_table/service_product_detail_management_judge_none_table";
import Service_product_detail_management_sale_management from "../Service_center/service_product_detail_management_sale_management/service_product_detail_management_sale_management";
import Service_product_detail_management_sale from "../Service_center/service_product_detail_management_sale_judge/service_product_detail_management_sale";
import Service_dashboard from "../Service_center/dashboard/dashboard";
// end service_center

const Context = createContext();

const Service_center_router = ({ match }) => {
  const svcenter = match.params.svcenter;

  const getFunction = () => {
    svcenter_sidebar_click();
  };

  function svcenter_sidebar_click() {
    const svc_center_btn_list = document.getElementsByClassName(
      "sv_center_btn"
    );
    const svc_center_btn_target = document.getElementsByClassName(
      "sv_center_btn_" + svcenter
    );

    for (let i = 0; i < svc_center_btn_list.length; i++) {
      svc_center_btn_list[i].classList.remove("data_service_sidebar_click");
      svc_center_btn_target[0].classList.add("data_service_sidebar_click");
    }
  }

  useEffect(() => {
    getFunction(svcenter);
  });

  const [usageInfoFirst, setUsageInfoFirst] = useState(false);
  const [usageInfoSecond, setUsageInfoSecond] = useState(false);

  const [apiUsingBtnEvt, setApiUsingBtnEvt] = useState(false); //api 사용 버튼 클릭시 true로 변경 true 일땐 상세페이지 들어갈 시 api 사용 페이지로 바로 이동
  const [salesReqVal, setSalesReqVal] = useState("basic"); // 서비스 상세 정보 탭 메뉴 관리
  const [salesApiTabReqVal, setSalesApiTabReqVal] = useState("api_request"); // 서비스 상세 정보 api 탭 관리
  const [salesInfraTabReqVal, setSalesInfraTabReqVal] = useState("infra_req"); // 서비스 상세 정보 api 탭 관리

  return (
    <React.Fragment>
      <Context.Provider
        value={{
          usageInfoFirst,
          setUsageInfoFirst,
          usageInfoSecond,
          setUsageInfoSecond,
          salesReqVal,
          setSalesReqVal,
          salesApiTabReqVal,
          setSalesApiTabReqVal,

          salesInfraTabReqVal,
          setSalesInfraTabReqVal,

          apiUsingBtnEvt,
          setApiUsingBtnEvt,
        }}
      >
        <Route
          exact
          path="/svccenter/home"
          component={Service_dashboard}
        ></Route>
        <Route
          exact
          path="/svccenter/product"
          component={Service_product}
        ></Route>

        <Route
          exact
          path="/svccenter/saleproduct"
          component={Service_sale_product}
        ></Route>

        <Route
          path="/svccenter/product/control/:serviceID"
          component={Service_product_detail}
        ></Route>

        <Route
          path="/svccenter/saleproduct/control/:serviceID"
          component={Service_sale_product_detail}
        ></Route>

        <Route
          path="/svccenter/salesinfo"
          component={Service_product_sales_calculate_info}
        ></Route>
        <Route
          path="/svccenter/calculate"
          component={Service_Calculate_list}
        ></Route>
        <Route
          path="/svccenter/report/month"
          component={Service_Sales_Report_table_v2}
        ></Route>
        <Route
          path="/svccenter/report/day"
          component={Service_Sales_Report_table_v1}
        ></Route>

        <Route
          path="/svccenter/product/product_detail_certification_none"
          component={Service_product_detail_management_certification_none}
        ></Route>
        <Route
          path="/svccenter/product/product_search"
          component={Service_product_search}
        ></Route>
        <Route
          path="/svccenter/product/product_detail_management_judge_none_table"
          component={Service_product_detail_management_judge_none_table}
        ></Route>
        <Route
          path="/svccenter/product/product_detail_management_sale_management"
          component={Service_product_detail_management_sale_management}
        ></Route>
        <Route
          path="/svccenter/product/product_detail_management_sale"
          component={Service_product_detail_management_sale}
        ></Route>
      </Context.Provider>
    </React.Fragment>
  );
};

export default Service_center_router;

export function useUsageInfo() {
  return useContext(Context);
}
