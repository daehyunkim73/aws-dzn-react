import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// 이미지 import
import side_home from "../../image/Center/sidebar_icon/home.png";
import arrow_data from "../../image/Center/sidebar_icon/arrow_data.png";
import arrow_sale_svc from "../../image/Center/sidebar_icon/mart_list.png";
import side_guid from "../../image/Center/sidebar_icon/guid.png";
import list_menu_icon from "../../image/Center/sidebar_icon/list_menu_icon.png";
import list_hamger_menu_bar from "../../image/Center/sidebar_icon/list_hamger_menu_bar.png";
import service_devel from "../../image/Center/sidebar_icon/service_devel.png";
import side_user from "../../image/Center/sidebar_icon/user.png";
import headset from "../../image/Center/sidebar_icon/headset.png";
import right_arrow from "../../image/Center/sidebar_icon/right_arrow.png";

const Sidebar_service_center = () => {
  return (
    <React.Fragment>
      <div className="big_menu_box">
        <ul>
          <Link to="/svccenter/home">
            <li>
              <div className="side_hover_box home_btn sv_center_btn sv_center_btn_home">
                <img src={side_home} alt="home" />
                <span className="main_sub_menu_text">홈</span>
              </div>
            </li>
          </Link>

          <Link to="/svccenter/product">
            <li className="active">
              <div className="side_hover_box sv_center_btn sv_center_btn_product">
                <img src={arrow_data} alt="" />
                <span className="main_sub_menu_text">제작 서비스 관리</span>
              </div>
            </li>
          </Link>

          <Link to="/svccenter/saleproduct">
            <li className="active">
              <div className="side_hover_box sv_center_btn sv_center_btn_saleproduct">
                <img src={arrow_sale_svc} alt="" />
                <span className="main_sub_menu_text">판매 서비스 관리</span>
              </div>
            </li>
          </Link>

          <li>
            <div id="side_hover_box">
              <img src={list_menu_icon} alt="list_menu" />
              <span className="main_sub_menu_text">매출 / 정산 </span>
              <ul className="sub_menu_text">
                <Link to="/svccenter/salesinfo">
                  <li className="sv_center_btn sv_center_btn_salesinfo">
                    - 매출정보
                  </li>
                </Link>
                <Link to="/svccenter/calculate">
                  <li className="sv_center_btn sv_center_btn_calculate">
                    - 정산내역
                  </li>
                </Link>
                <Link to="/svccenter/report/month">
                  <li className="sv_center_btn sv_center_btn_report">
                    - 매출 분석리포트
                  </li>
                </Link>
              </ul>
            </div>
          </li>
          <div className="user_guide_box">
            <li>
              <Link to="/api">
                <div className="side_hover_box">
                  <img src={list_hamger_menu_bar} alt="" />
                  <span className="main_sub_menu_text">API 문서</span>
                  <img className="right_arrow" src={right_arrow} alt="" />
                </div>
              </Link>
            </li>

            <li>
              <Link to="/service_development_guide/svcDevelopment">
                <div className="side_hover_box">
                  <img src={side_guid} alt="" />
                  <span className="main_sub_menu_text">이용가이드</span>
                  <img className="right_arrow" src={right_arrow} alt="" />
                </div>
              </Link>
            </li>

            <li>
              <Link to="/forum/service">
                <div className="side_hover_box">
                  <img src={service_devel} alt="" />
                  <span className="main_sub_menu_text">서비스 개발자 포럼</span>
                  <img className="right_arrow" src={right_arrow} alt="" />
                </div>
              </Link>
            </li>

            <li>
              <Link to="/setting/userinfo">
                <div className="side_hover_box">
                  <img src={side_user} alt="" />
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
                  <img className="right_arrow" src={right_arrow} alt="" />
                </div>
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Sidebar_service_center;
