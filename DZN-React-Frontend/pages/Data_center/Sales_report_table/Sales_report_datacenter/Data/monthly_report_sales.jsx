import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Datepicker from "../../../../Main_Page/component/datapicker_calendar";
import Monthly_report_salesTable from "../Component/Monthly_report_salesTable";
import Data_sales_popup from "../../../../popup/Big/Data_sales_popup";
import _ from "lodash";

// 이미지 import
import view_more from "../../../../../image/Center/Dashboard/view_more.png";
import { Link } from "react-router-dom";

const Second_Monthly_sales_report_table = ({ match }) => {
  useEffect(() => {
    if (match.url == "/datacenter/report/day") {
      document
        .querySelector("#monthly_radio_second + label")
        .classList.add("check_report");
    }

    const Data_report_sales_bgk_popup = document.getElementById(
      "Data_report_sales_bgk_popup"
    );
    const sales_td_table = document.querySelectorAll(".sales_td_table td");

    for (let i = 0; i < sales_td_table.length; i++) {
      sales_td_table[i].addEventListener("click", () => {
        Data_report_sales_bgk_popup.style.display = "table";
      });
    }
  }, []);
  return (
    <React.Fragment>
      <Data_sales_popup />
      <div className="api_big_report_table_box max_w">
        <div className="input_wrap" id="report_table_header_box">
          <div className="user_list_wrap">
            <div className="input_box_wrap">
              <div className="input_box white_border">검색기간</div>
              <div className="input_box">검색어</div>
            </div>
            <div className="input_form_wrap">
              <div
                className="input_form white_border date_Picer_input"
                id="report_radio_box"
              >
                <div className="radio_inputButton_box">
                  <Link to="/datacenter/report/month">
                    <input
                      type="radio"
                      id="monthly_radio_first"
                      className="report_btn"
                      name="payment_data_sale"
                      defaultValue="monthly_radio_first"
                    />
                    <label htmlFor="monthly_radio_first">월별</label>
                  </Link>
                  <input
                    type="radio"
                    className="report_btn"
                    id="monthly_radio_second"
                    name="payment_data_sale"
                    defaultValue="monthly_radio_second"
                  />
                  <label htmlFor="monthly_radio_second">
                    일별<span>&nbsp;</span>
                  </label>
                </div>
                <Datepicker />
                <Button>이번달</Button>
              </div>
              <div className="input_form" id="report_radio_box">
                <div className="radio_inputButton_box">
                  <input
                    type="radio"
                    id="monthly_radio_second_v1"
                    name="payment_monthly_sale_v2"
                    defaultValue="monthly_radio_second_v1"
                  />
                  <label htmlFor="monthly_radio_second_v1">전체</label>
                  <input
                    type="radio"
                    id="monthly_radio_second_v2"
                    name="payment_monthly_sale_v2"
                    defaultValue="monthly_radio_second_v2"
                  />
                  <label htmlFor="monthly_radio_second_v2">개별선택</label>
                </div>
                <Form.Control
                  type="text"
                  className="form_input"
                  placeholder="데이터 제목을 선택하세요."
                />
              </div>
            </div>
          </div>
          <div className="input_submit_wrap">
            <button className="search_btn" type="submit">
              {" "}
              검색
            </button>
          </div>
        </div>
        {/* <BlueLine_chart /> */}
        <div className="real_report_sales_table_box">
          <Monthly_report_salesTable />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Second_Monthly_sales_report_table;
