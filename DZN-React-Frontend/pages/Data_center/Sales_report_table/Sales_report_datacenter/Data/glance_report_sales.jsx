import React, { useState, useEffect } from "react";
// import BlueLine_chart from '../Component/BlueLine_chart';
import Gal_mon_report_Sales_Table from "../Component/Glance_report_salesTable";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

// 이미지 import

const First_sales_report_table = ({ match }) => {
  useEffect(() => {
    if (match.url == "/datacenter/report/month") {
      document
        .querySelector("#glance_radio_first + label")
        .classList.add("check_report");
    }
  }, []);

  const B_date = new Date();
  const [year_value, SetYear_value] = useState(Number(B_date.getFullYear()));

  return (
    <React.Fragment>
      <div className="api_big_report_table_box max_w">
        <div className="input_wrap" id="report_table_header_box">
          <div className="user_list_wrap">
            <div className="input_box_wrap">
              <div className="input_box white_border">검색기간</div>
              <div className="input_box">데이터</div>
            </div>
            <div className="input_form_wrap">
              <div className="input_form white_border" id="report_radio_box">
                <div className="radio_inputButton_box">
                  <input
                    type="radio"
                    className="report_btn"
                    id="glance_radio_first"
                    name="payment_glance_sale"
                    defaultValue="glance_radio_first"
                  />
                  <label htmlFor="glance_radio_first">
                    월별<span>&nbsp;</span>
                  </label>
                  <Link to="/datacenter/report/day">
                    <input
                      type="radio"
                      className="report_btn"
                      id="glance_radio_second"
                      name="payment_glance_sale"
                      defaultValue="glance_radio_second"
                    />
                    <label htmlFor="glance_radio_second">일별</label>
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
                    id="glance_radio_first_v1"
                    name="payment_glance_sale_v2"
                    defaultValue="glance_radio_first_v1"
                  />
                  <label htmlFor="glance_radio_first_v1">전체</label>

                  <input
                    type="radio"
                    id="glance_radio_second_v2"
                    name="payment_glance_sale_v2"
                    defaultValue="glance_radio_second_v2"
                  />
                  <label htmlFor="glance_radio_second_v2">개별선택</label>
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
        {/* <BlueLine_chart /> */}
        <div className="real_report_sales_table_box">
          <Gal_mon_report_Sales_Table />
        </div>
      </div>
    </React.Fragment>
  );
};

export default First_sales_report_table;
