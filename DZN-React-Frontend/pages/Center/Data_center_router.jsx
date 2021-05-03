import React from "react";
import _ from "lodash";
import { Route } from "react-router";
import { useEffect } from "react";

import Data_dashboard from "../Data_center/dashboard/dashboard";
import Purchase_create_data_router from "../Data_center/router/purchase_create_data_router";
import Sale_data_router from "../Data_center/router/sale_data_router";
import Purchase_create_data_detail_judge_none_table from "../Data_center/purchase_create_data_detail/purchase_create_data_detail_judge_none_table";
import Sales_calculate_info from "../Data_center/sales_calculate/Sales_calculate_info";
import Data_Calculate_list from "../Data_center/calculate_list/Calculate_list";
import Data_report_router from "../Data_center/Sales_report_table/Sales_report_datacenter/Data/report_router";
import purchase_create_data_detail from "../Data_center/purchase_create_data_detail/purchase_create_data_detail";

const Data_center_router = ({ match }) => {
  const dtcenter = _.defaultTo(match.params.dtcenter);

  const getFunction = () => {
    dtcenter_sidebar_click();
  };

  function dtcenter_sidebar_click() {
    const ds_center_btn_list = document.getElementsByClassName("ds_center_btn");
    const ds_center_btn_target = document.getElementsByClassName(
      "ds_center_btn_" + dtcenter
    );

    for (let i = 0; i < ds_center_btn_list.length; i++) {
      ds_center_btn_list[i].classList.remove("data_service_sidebar_click");
      ds_center_btn_target[0].classList.add("data_service_sidebar_click");
    }
  }

  useEffect(() => {
    getFunction(dtcenter);
  });

  return (
    <React.Fragment>
      <Route path="/datacenter/home" component={Data_dashboard}></Route>
      <Route path="/datacenter/saledata" component={Sale_data_router}></Route>
      <Route
        path="/datacenter/purchasedata"
        component={Purchase_create_data_router}
      ></Route>
      <Route
        path="/datacenter/purchase_create_data_detail"
        component={purchase_create_data_detail}
      ></Route>
      <Route
        path="/datacenter/purchase_create_data_detail_judge_none_table"
        component={Purchase_create_data_detail_judge_none_table}
      ></Route>
      <Route
        path="/datacenter/salesinfo"
        component={Sales_calculate_info}
      ></Route>
      <Route
        path="/datacenter/calculate"
        component={Data_Calculate_list}
      ></Route>
      <Route
        exact
        path="/datacenter/report/:report"
        component={Data_report_router}
      ></Route>
    </React.Fragment>
  );
};

export default Data_center_router;
