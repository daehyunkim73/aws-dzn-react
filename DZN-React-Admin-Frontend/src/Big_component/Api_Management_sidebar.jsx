import React from "react";
import { Link } from "react-router-dom";

import Api_Monitoring_logo from "../../image/Api_Manager/Api_Monitoring_logo.png";
import Api_Library_logo from "../../image/Api_Manager/Api_Library_logo.png";
import Api_Category_logo from "../../image/Api_Manager/Api_Category_logo.png";
import Service_Group_logo from "../../image/Api_Manager/Service_Group_logo.png";

const Admin_sidebar = () => {
  return (
    <React.Fragment>
      <nav id="sidebar" className="sidebar">
        <div className="big_ul_list">
          <div className="admin_sidebar-header">
            <div className="admin_data_center_box">
              <Link className="link_style_text" to="/api/home">
                <h3 className="admin_data_big_text">
                  <i className="fa fa-home"></i>
                  <span>홈</span>
                </h3>
              </Link>
            </div>
          </div>
          <div className="Admin_sidebar_box">
            <ul>
              <div>
                <li>
                  <img src={Api_Monitoring_logo} alt="" />
                  <span className="main_sub_menu_text">API 모니터링</span>
                </li>
                <div className="childrent_li_box">
                  <Link className="link_style_text" to="/api/apistat">
                    <li className="admin_side_btn admin_side_btn_userinfo">
                      API 상태
                    </li>
                  </Link>
                  <Link className="link_style_text" to="/api/log">
                    <li className="admin_side_btn admin_side_btn_userinfo">
                      로그
                    </li>
                  </Link>
                  <Link className="link_style_text" to="/api/statistics">
                    <li className="admin_side_btn admin_side_btn_userinfo">
                      통계
                    </li>
                  </Link>
                </div>
              </div>

              <div>
                <li>
                  <img src={Api_Library_logo} alt="" />
                  <span className="main_sub_menu_text">API 라이브러리</span>
                </li>
                <div className="childrent_li_box">
                  <Link className="link_style_text" to="/api/apimanagement">
                    <li className="admin_side_btn admin_side_btn_dataapproval">
                      API 관리
                    </li>
                  </Link>
                  <Link className="link_style_text" to="/api/apireg">
                    <li className="admin_side_btn admin_side_btn_saledata">
                      API 등록
                    </li>
                  </Link>
                  <Link
                    className="link_style_text"
                    to="/api/apipolicymanagement"
                  >
                    <li className="admin_side_btn admin_side_btn_saledata">
                      API 정책관리
                    </li>
                  </Link>
                </div>
              </div>

              <div>
                <li>
                  <img src={Api_Category_logo} alt="" />
                  <span className="main_sub_menu_text">API 카테고리</span>
                </li>
                <div className="childrent_li_box">
                  <Link
                    className="link_style_text"
                    to="/api/categorymanagement"
                  >
                    <li className="admin_side_btn admin_side_btn_usingapi">
                      카테고리 관리
                    </li>
                  </Link>
                </div>
              </div>

              <div>
                <li>
                  <img src={Service_Group_logo} alt="" />
                  <span className="main_sub_menu_text">서비스그룹 관리</span>
                </li>
                <div className="childrent_li_box">
                  <Link
                    className="link_style_text"
                    to="/api/serviceappmanagement"
                  >
                    <li className="admin_side_btn admin_side_btn_salesdata">
                      서비스 APP 관리
                    </li>
                  </Link>
                  <Link
                    className="link_style_text"
                    to="/api/servicemanagementreg"
                  >
                    <li className="admin_side_btn admin_side_btn_slaessvc">
                      서비스 관리 등록
                    </li>
                  </Link>
                  <Link className="link_style_text" to="/api/usingapiandusage">
                    <li className="admin_side_btn admin_side_btn_calculate">
                      이용 API 및 사용량
                    </li>
                  </Link>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Admin_sidebar;
