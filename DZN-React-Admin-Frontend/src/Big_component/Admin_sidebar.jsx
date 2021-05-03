import React from "react";
import { Link, useLocation } from "react-router-dom";
import user from "../../image/Center/sidebar_icon/user.png";
import arrow_data from "../../image/Center/sidebar_icon/arrow_data.png";
import list_menu_icon from "../../image/Center/sidebar_icon/list_menu_icon.png";
import daa_proum from "../../image/Center/sidebar_icon/daa_proum.png";
import setting from "../../image/Back_Office_Center/Douzone_admin_image/setting.png";
import { useEffect } from "react";

const Admin_sidebar = () => {
  const path = useLocation().pathname;

  useEffect(() => {
    [...document.getElementsByClassName("admin_side_btn")].forEach(
      (item, cnt) => {
        // console.log(item.getAttribute("value"));
        item.classList.remove("data_service_sidebar_click");
        if (item.getAttribute("value") === path) {
          // console.log(item);
          item.classList.add("data_service_sidebar_click");
        }
        // if(item.classList)
      }
    );
    // admin_sidebar.map((item) => {
    //   console.log(item, "hihi");
    // });
  }, [path]);

  return (
    <React.Fragment>
      <nav id="sidebar" className="sidebar">
        <div className="big_ul_list">
          <div className="admin_sidebar-header">
            <div className="admin_data_center_box">
              <Link className="link_style_text" to="/admin/home">
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
                  <img src={user} alt="" />
                  <span className="main_sub_menu_text">회원관리</span>
                </li>
                <div className="childrent_li_box">
                  <Link className="link_style_text" to="/admin/userinfo">
                    <li
                      className="admin_side_btn admin_side_btn_userinfo"
                      value="/admin/userinfo"
                    >
                      회원정보
                    </li>
                  </Link>
                </div>
              </div>

              <div>
                <li>
                  <img src={arrow_data} alt="" />
                  <span className="main_sub_menu_text">데이터센터관리</span>
                </li>
                <div className="childrent_li_box">
                  <Link className="link_style_text" to="/admin/dataapproval">
                    <li
                      className="admin_side_btn admin_side_btn_dataapproval"
                      value="/admin/dataapproval"
                    >
                      데이터 승인관리
                    </li>
                  </Link>
                  <Link className="link_style_text" to="/admin/saledata">
                    <li
                      className="admin_side_btn admin_side_btn_saledata"
                      value="/admin/saledata"
                    >
                      판매데이터 관리
                    </li>
                  </Link>
                </div>
              </div>

              <div>
                <li>
                  <img src={arrow_data} alt="" />
                  <span className="main_sub_menu_text">서비스센터관리</span>
                </li>
                <div className="childrent_li_box">
                  <Link className="link_style_text" to="/admin/usingapi">
                    <li
                      className="admin_side_btn admin_side_btn_usingapi"
                      value="/admin/usingapi"
                    >
                      API 사용 승인관리
                    </li>
                  </Link>
                  <Link className="link_style_text" to="/admin/infra">
                    <li
                      className="admin_side_btn admin_side_btn_infra"
                      value="/admin/infra"
                    >
                      인프라 승인관리
                    </li>
                  </Link>
                  <Link className="link_style_text" to="/admin/svcapproved">
                    <li
                      className="admin_side_btn admin_side_btn_svcapproved"
                      value="/admin/svcapproved"
                    >
                      서비스 승인관리
                    </li>
                  </Link>
                  <Link className="link_style_text" to="/admin/salesvc">
                    <li
                      className="admin_side_btn admin_side_btn_salesvc"
                      value="/admin/salesvc"
                    >
                      판매서비스 승인관리
                    </li>
                  </Link>
                </div>
              </div>

              <div>
                <li>
                  <img src={list_menu_icon} alt="" />
                  <span className="main_sub_menu_text">매출/정산관리</span>
                </li>
                <div className="childrent_li_box">
                  <Link className="link_style_text" to="/admin/salesdata">
                    <li
                      className="admin_side_btn admin_side_btn_salesdata"
                      value="/admin/salesdata"
                    >
                      데이터 매출관리
                    </li>
                  </Link>
                  <Link className="link_style_text" to="/admin/slaessvc">
                    <li
                      className="admin_side_btn admin_side_btn_slaessvc"
                      value="/admin/slaessvc"
                    >
                      서비스 매출관리
                    </li>
                  </Link>
                  <Link className="link_style_text" to="/admin/calculate">
                    <li
                      className="admin_side_btn admin_side_btn_calculate"
                      value="/admin/calculate"
                    >
                      정산관리
                    </li>
                  </Link>
                  <Link className="link_style_text" to="/admin/apisales">
                    <li
                      className="admin_side_btn admin_side_btn_apisales"
                      value="/admin/apisales"
                    >
                      API 매출관리
                    </li>
                  </Link>
                </div>
              </div>

              <div>
                <li>
                  <img src={daa_proum} alt="" />
                  <span className="main_sub_menu_text">게시판관리</span>
                </li>
                <div className="childrent_li_box">
                  <Link className="link_style_text" to="/admin/notice">
                    <li
                      className="admin_side_btn admin_side_btn_notice"
                      value="/admin/notice"
                    >
                      공지사항
                    </li>
                  </Link>
                  <Link className="link_style_text" to="/admin/faq">
                    <li
                      className="admin_side_btn admin_side_btn_faq"
                      value="/admin/faq"
                    >
                      FAQ 목록
                    </li>
                  </Link>
                  <Link className="link_style_text" to="/admin/question">
                    <li
                      className="admin_side_btn admin_side_btn_question"
                      value="/admin/question"
                    >
                      문의하기 목록
                    </li>
                  </Link>
                  <Link className="link_style_text" to="/admin/update">
                    <li
                      className="admin_side_btn admin_side_btn_update"
                      value="/admin/update"
                    >
                      업데이트 목록
                    </li>
                  </Link>
                </div>
              </div>

              <div>
                <li>
                  <img src={daa_proum} alt="" />
                  <span className="main_sub_menu_text">콘텐츠 관리</span>
                </li>
                <div className="childrent_li_box">
                  <Link className="link_style_text" to="/admin/forum">
                    <li
                      className="admin_side_btn admin_side_btn_forum"
                      value="/admin/forum"
                    >
                      포럼 관리
                    </li>
                  </Link>
                  <Link className="link_style_text" to="/admin/usingguide">
                    <li
                      className="admin_side_btn admin_side_btn_usingguide"
                      value="/admin/usingguide"
                    >
                      이용가이드 관리
                    </li>
                  </Link>
                </div>
              </div>

              <div>
                <li>
                  <img src={setting} alt="" />
                  <span className="main_sub_menu_text">관리자 설정</span>
                </li>
                <div className="childrent_li_box">
                  <Link className="link_style_text" to="/admin/user_authority">
                    <li
                      className="admin_side_btn admin_side_btn_user_authority"
                      value="/admin/user_authority"
                    >
                      회원권한 설정
                    </li>
                  </Link>
                  <Link className="link_style_text" to="/admin/usermanage">
                    <li
                      className="admin_side_btn admin_side_btn_usermanage"
                      value="/admin/usermanage"
                    >
                      관리자 회원관리
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
