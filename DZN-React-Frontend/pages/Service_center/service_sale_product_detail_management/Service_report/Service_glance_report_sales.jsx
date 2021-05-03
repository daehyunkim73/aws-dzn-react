import React, { useState, useEffect } from "react";
// import BlueLine_chart from './Component/BlueLine_chart';
import Gal_mon_report_Sales_Table from "./Component/Glance_report_salesTable";
import Form from "react-bootstrap/Form";
import view_more from "../../../../image/Center/Dashboard/view_more.png";
import { Link } from "react-router-dom";

const Service_glance_report_sales = ({ match }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (match.url == "/svccenter/report/month") {
      document
        .querySelector("#service_glance_radio_first + label")
        .classList.add("check_report");
    }
  }, []);
  const B_date = new Date();
  const [year_value, SetYear_value] = useState(Number(B_date.getFullYear()));

  return (
    <React.Fragment>
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
                  <div className="input_box">데이터</div>
                </div>
                <div className="input_form_wrap">
                  <div
                    className="input_form white_border"
                    id="report_radio_box"
                  >
                    <div className="radio_inputButton_box">
                      <input
                        type="radio"
                        id="service_glance_radio_first"
                        name="service_payment_glance_sale"
                        defaultValue="service_glance_radio_first"
                      />
                      <label htmlFor="service_glance_radio_first">
                        월별<span>&nbsp;</span>
                      </label>
                      <Link to="/svccenter/report/day">
                        <input
                          type="radio"
                          id="service_glance_radio_second"
                          name="service_payment_glance_sale"
                          defaultValue="service_glance_radio_second"
                        />

                        <label htmlFor="service_glance_radio_second">
                          일별
                        </label>
                      </Link>
                    </div>
                    <div className="date_box">
                      <Form.Control as="select" className="sp_select_year_box">
                        <option>{year_value}</option>
                        <option>2019</option>
                        <option>2018</option>
                        <option>2017</option>
                        <option>2016</option>
                        <option>2015</option>
                        <option>2014</option>
                        <option>2013</option>
                        <option>2012</option>
                        <option>2011</option>
                        <option>2010</option>
                        <option>2009</option>
                        <option>2008</option>
                        <option>2007</option>
                        <option>2006</option>
                        <option>2005</option>
                        <option>2004</option>
                        <option>2003</option>
                        <option>2002</option>
                        <option>2001</option>
                        <option>2000</option>
                      </Form.Control>
                    </div>
                  </div>
                  <div className="input_form" id="report_radio_box">
                    <div className="radio_inputButton_box">
                      <input
                        type="radio"
                        id="service_glance_radio_first_v1"
                        name="service_payment_glance_sale_v2"
                        defaultValue="service_glance_radio_first_v1"
                      />
                      <label htmlFor="service_glance_radio_first_v1">
                        전체
                      </label>

                      <input
                        type="radio"
                        id="service_glance_radio_second_v2"
                        name="service_payment_glance_sale_v2"
                        defaultValue="service_glance_radio_second_v2"
                      />
                      <label htmlFor="service_glance_radio_second_v2">
                        개별선택
                      </label>
                    </div>
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
            {/* <BlueLine_chart /> 그래프 들어가는곳 */}
            <div className="real_report_sales_table_box">
              <Gal_mon_report_Sales_Table />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Service_glance_report_sales;
