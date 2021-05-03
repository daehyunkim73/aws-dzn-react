import React, { useEffect } from "react";
import Data_sales_popup from "../../../../popup/Big/Data_sales_popup";
import _ from "lodash";
import Data_report_day from "./monthly_report_sales";
import Data_report_month from "./glance_report_sales";

// 이미지 import
import view_more from "../../../../../image/Center/Dashboard/view_more.png";
import { Link, Route } from "react-router-dom";

const Second_Monthly_sales_report_table = ({ match }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const report = _.defaultTo(match.params.report);

  return (
    <React.Fragment>
      <Data_sales_popup />
      <div className="service_product_wrap">
        <div className="page_title_wrap">
          <p className="page_title">매출 분석 리포트</p>
          <div className="page_title_btn">
            <p>Home</p>
            <img className="caption_img" src={view_more} />
            <p>Data Center</p>
            <img className="caption_img" src={view_more} />
            <p>매출 분석 리포트</p>
          </div>
        </div>
        <Route
          path="/datacenter/report/day"
          component={Data_report_day}
        ></Route>
        <Route
          path="/datacenter/report/month"
          component={Data_report_month}
        ></Route>
      </div>
    </React.Fragment>
  );
};

export default Second_Monthly_sales_report_table;
