import React, { useCallback, useEffect, useState } from "react";
import Side_button from "./Side_button";
import { Link, Route, Switch } from "react-router-dom";
import Center_Profile from "./Center_Profile";
import Center_Alarm from "./Center_Alarm";
import Header_Click_Event from "../../src/Header_Click_Event";

import Side_nav from "./Side_nav";

import Data_center_router from "./Data_center_router";
import Service_center_router from "./Service_center_router";

// 이미지 import
import developers_logo from "../../image/Center/Developers_header/developers_logo.png";
import profile_dropdown from "../../image/Center/Developers_header/profile_dropdown.png";
import profile_dummy from "../../image/Center/Profile/profile_dummy.jpg";
import header_bell from "../../image/Center/Developers_header/bell.png";
import header_setting from "../../image/Center/Developers_header/setting.png";
import dc from "../../src/center_sidebar_dc";
import sc from "../../src/center_sidebar_sc";
import { useCookies } from "react-cookie";
import { Server_ajax_get } from "../../server_ajax";
import moment from 'moment';

const Center_Header = ({ match }) => {
  const dashboard_sidebar = match.url;
  const [one, setOne] = useState(true);
  const [cnt, setCnt] = useState(0);
  const [alamList, setAlamList] = useState([]);    
  const [cookies, setCookie, removeCookie] = useCookies();
  //wehago_s,  h_portal_id,  h_selected_company_no,  cell_company_no,  AUTH_R_TOKEN,  AUTH_A_TOKEN

  useEffect(() => {
    if (dashboard_sidebar == "/datacenter") {
      document
        .getElementById("CenterHeaderSvcBtn")
        .classList.remove("center_header_btn");
      document
        .getElementById("CenterHeaderDataBtn")
        .classList.add("center_header_btn");
    } else if (dashboard_sidebar == "/svccenter") {
      document
        .getElementById("CenterHeaderDataBtn")
        .classList.remove("center_header_btn");
      document
        .getElementById("CenterHeaderSvcBtn")
        .classList.add("center_header_btn");
    }
  });

  useEffect(() => {
    Header_Click_Event();
    if (dashboard_sidebar == "/datacenter") {
      dc();
      setOne(false);
    } else if (dashboard_sidebar == "/svccenter") {
      sc();
      setOne(true);
    }
  }, []);

  // 데이터 서비스 센터 사이드바 줄이기 버튼 주호
  const Big_click = useCallback(() => {
    $("#sidebar").toggleClass("active");
    $(".main_sub_menu_text, .sub_menu_text").toggleClass("list-unstyled CTAs");
    $(".big_menu_box li, .data_center_big_box > div").on("click", () => {
      $("#sidebar").removeClass("active");
    });
  });

  const first_btn = () => {
    dc();
    setOne(false);
  };

  const second_btn = () => {
    sc();
    setOne(true);
  };

  // 알람 정보 가져오기
  useEffect(() => {
    (async () => {
      try {        
        const mbrId = cookies.h_portal_id;        
        const url = `Main/get_alam_list?id=${mbrId}`;        
        const result = await Server_ajax_get(url);

        result.map(data => {
          data.reg_date = moment(data.reg_date).format('YYYY.MM.DD');
        })
        setCnt(result.length);        
        setAlamList(result);
      } catch(e) {
        console.error(e);
      }
    })();    
  }, [])

  return (
    <React.Fragment>
      <div className="hidden_box">
        <nav className="center_header">
          <div className="center_header_wrap">
            <div className="center_header_left_wrap">
              <div className="center_header_sidebar_btn_wrap">
                <Side_button post={Big_click} key={Big_click} />
              </div>
              <Link to="/">
                <img
                  src={developers_logo}
                  alt="center_header_logo"
                  className="center_header_logo"
                />
              </Link>
              <div className="center_header_btn_wrap">
                <Link to="/datacenter/home">
                  <button id="CenterHeaderDataBtn" onClick={first_btn}>
                    Data Center
                  </button>
                </Link>
                <Link to="/svccenter/home">
                  <button id="CenterHeaderSvcBtn" onClick={second_btn}>
                    Service Center
                  </button>
                </Link>
              </div>
            </div>
            <div className="center_header_right_wrap">
              <div className="profile_wrap">
                <div className="nickname_wrap">
                  {cookies.wehago_s ? (
                    <p>{cookies.h_portal_id} 님</p>
                  ) : (
                    <p>USER 님</p>
                  )}
                  {cookies.wehago_s && (
                    <img src={profile_dropdown} alt="dropdown" />
                  )}
                </div>
                <img
                  src={profile_dummy}
                  className="profile_image profile"
                  alt="profile"
                />
              </div>
              <img
                src={header_bell}
                className="center_header_right_icon center_header_right_bell_icon"
                alt="bell"
              />
              <span>{cnt >= 99 ? `99` : cnt}</span>
              <Link to="/setting/userinfo">
                <img
                  src={header_setting}
                  className="center_header_right_icon"
                  alt="setting"
                />
              </Link>

              <Center_Profile />
              <Center_Alarm alamList={alamList} setCnt={setCnt} cookies={cookies} />
            </div>
          </div>
        </nav>
        <div className="wrapper">
          <Side_nav
            dsboard_side={dashboard_sidebar}
            setData={one}
            setTest={setOne}
          />

          <Route
            path="/datacenter/:dtcenter"
            component={Data_center_router}
          ></Route>
          {/* service_center */}

          <Route
            path="/svccenter/:svcenter"
            component={Service_center_router}
          ></Route>

          {/*end service_center */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Center_Header;
