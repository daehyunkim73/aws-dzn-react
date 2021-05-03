import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// 이미지 import
import side_home from "../../image/Center/sidebar_icon/home.png";
import arrow_data from "../../image/Center/sidebar_icon/arrow_data.png";
import mart_list from "../../image/Center/sidebar_icon/mart_list.png";
import list_menu_icon from "../../image/Center/sidebar_icon/list_menu_icon.png";
import side_guid from "../../image/Center/sidebar_icon/guid.png";
import side_forum from "../../image/Center/sidebar_icon/daa_proum.png";
import side_user from "../../image/Center/sidebar_icon/user.png";
import headset from "../../image/Center/sidebar_icon/headset.png";
import wide from "../../image/Center/sidebar_icon/wide.png";
import wise from "../../image/Center/sidebar_icon/wise.png";
import tablea from "../../image/Center/sidebar_icon/tablea.png";
import right_arrow from "../../image/Center/sidebar_icon/right_arrow.png";

const Sidebar_data_center = () => {
  return (
    <React.Fragment>
      <div className="big_menu_box">
        <ul>
          <Link to="/datacenter/home">
            <li>
              <div className="side_hover_box home_btn ds_center_btn ds_center_btn_home">
                <img src={side_home} alt="home" />
                <span className="main_sub_menu_text">홈</span>
              </div>
            </li>
          </Link>

          <Link to="/datacenter/purchasedata">
            <li className="active">
              <div className="side_hover_box ds_center_btn ds_center_btn_purchasedata">
                <img src={arrow_data} alt="" />
                <span className="main_sub_menu_text">구매/제작 데이터</span>
              </div>
            </li>
          </Link>
          <Link to="/datacenter/saledata">
            <li>
              <div className="side_hover_box ds_center_btn ds_center_btn_saledata">
                <img src={mart_list} alt="mart_list" />
                <span className="main_sub_menu_text">판매 데이터</span>
              </div>
            </li>
          </Link>
          <li>
            <div id="side_hover_box">
              <img src={list_menu_icon} alt="list_menu" />
              <span className="main_sub_menu_text">매출 / 정산 </span>
              <ul className="sub_menu_text">
                <Link to="/datacenter/salesinfo">
                  <li className="ds_center_btn ds_center_btn_salesinfo">
                    - 매출정보
                  </li>
                </Link>
                <Link to="/datacenter/calculate">
                  <li className="ds_center_btn ds_center_btn_calculate">
                    - 정산내역
                  </li>
                </Link>
                <Link to="/datacenter/report/month">
                  <li className="ds_center_btn ds_center_btn_report">
                    - 매출 분석리포트
                  </li>
                </Link>
              </ul>
            </div>
          </li>
          <div className="user_guide_box">
            <li>
              <Link to="/data_development_guide/dataDevelopment">
                <div className="side_hover_box">
                  <img src={side_guid} alt="guid" />
                  <span className="main_sub_menu_text">이용가이드</span>
                  <img className="right_arrow" src={right_arrow} alt="" />
                </div>
              </Link>
            </li>

            <li>
              <Link to="/forum/data">
                <div className="side_hover_box">
                  <img src={side_forum} alt="forum" />
                  <span className="main_sub_menu_text">데이터 활용 포럼</span>
                  <img className="right_arrow" src={right_arrow} alt="" />
                </div>
              </Link>
            </li>

            <li>
              <Link to="/setting/userinfo">
                <div className="side_hover_box">
                  <img src={side_user} alt="user" />
                  <span className="main_sub_menu_text">회원정보관리</span>
                  <img className="right_arrow" src={right_arrow} alt="" />
                </div>
              </Link>
            </li>

            <li>
              <Link to="/support/question">
                <div className="side_hover_box">
                  <img src={headset} alt="" />
                  <span className="main_sub_menu_text">고객센터</span>
                  <img
                    className="right_arrow"
                    src={right_arrow}
                    alt="customer_service"
                  />
                </div>
              </Link>
            </li>
          </div>

          <div>
            <div className="wise_wide_big_box">
              <a href="https://wide.wehago.com/" target="_blank">
                <div className="wide_box">
                  <h3>
                    {" "}
                    <img src={wide} alt="wide" />
                  </h3>
                  <h4>WIDE</h4>
                </div>
              </a>
              <a href="http://wise.bigdata-sme.kr/login" target="_blank">
                <div className="wise_box">
                  <h3>
                    {" "}
                    <img src={wise} alt="wise" />
                  </h3>
                  <h4>WISE</h4>
                </div>
              </a>
            </div>
            <div className="wise_wide_big_box">
              <a href="https://bi.wehago.com/app/v2/workspace" target="_blank">
                <div className="wide_box">
                  <h3>
                    {" "}
                    <img src={tablea} alt="tablea" />
                  </h3>
                  <h4>WEHAGO BI</h4>
                </div>
              </a>
              <a href="https://tableau.wehago.com/" target="_blank">
                <div className="wise_box">
                  <h3>
                    {" "}
                    <img src={wide} alt="wide" />
                  </h3>
                  <h4>Tableau</h4>
                </div>
              </a>
            </div>
          </div>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Sidebar_data_center;
