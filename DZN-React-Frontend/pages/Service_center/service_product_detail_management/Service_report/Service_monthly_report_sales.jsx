import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Data_sales_popup from "../../../popup/Big/Data_sales_popup";
import Monthly_report_salesTable from "./Component/Monthly_report_salesTable";
import Datepicker from "../../../Main_Page/component/datapicker_calendar";
import view_more from "../../../../image/Center/Dashboard/view_more.png";
import { Link } from "react-router-dom";

const Service_monthly_report_sales = ({ match }) => {
  useEffect(() => {
    if (match.url == "/svccenter/report/day") {
      document
        .querySelector("#service_monthly_radio_second + label")
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
      <div className="service_product_wrap">
        <div className="page_title_wrap">
          <p className="page_title">매출 분석 리포트</p>
          <div className="page_title_btn">
            <p>Home</p>
            <img className="caption_img" src={view_more} />
            <p>Service Center</p>
            <img className="caption_img" src={view_more} />
            <p>매출 분석 리포트</p>
          </div>
        </div>
        <div className="max_w">
          <div className="api_big_report_table_box">
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
                      <Link to="/svccenter/report/month">
                        <input
                          type="radio"
                          id="service_monthly_radio_first"
                          name="service_payment_montjly_sale"
                          defaultValue="service_monthly_radio_first"
                        />
                        <label htmlFor="service_monthly_radio_first">
                          월별
                        </label>
                      </Link>

                      <input
                        type="radio"
                        id="service_monthly_radio_second"
                        name="service_payment_montjly_sale"
                        defaultValue="service_monthly_radio_second"
                      />
                      <label htmlFor="service_monthly_radio_second">
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
                        id="service_monthly_radio_first_v1"
                        name="service_payment_monthly_sale_v2"
                        defaultValue="service_monthly_radio_first_v1"
                      />
                      <label htmlFor="service_monthly_radio_first_v1">
                        전체
                      </label>

                      <input
                        type="radio"
                        id="service_monthly_radio_second_v2"
                        name="service_payment_monthly_sale_v2"
                        defaultValue="service_monthly_radio_second_v2"
                      />
                      <label htmlFor="service_monthly_radio_second_v2">
                        개별선택
                      </label>
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
            <div className="real_report_sales_table_box">
              <Monthly_report_salesTable />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Service_monthly_report_sales;
