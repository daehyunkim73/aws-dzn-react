import React, { useState, useContext, createContext, useEffect } from "react";
import Navbar_ui from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Main_page from "../Page/MineSearch";
import { Link, Route, Switch, useHistory, useLocation } from "react-router-dom";
import Big_Footer from "../Page/big_Footer";
import { Row, Col } from "react-bootstrap";
import Api_router from "../../api_document/api_router";
import Data_Development_Guide_page from "../../data_development_guide/Guide_page";
import Data_Development_Guide_Detail_page from "../../data_development_guide/Guide_Signup";
import Service_development_guide from "../../service_development_guide/Guide_page";
import Support_router from "../../support_sidebar/support_router";
import Forum_router from "../../data_development_forum/development_forum_router";
import Login_page from "../../../Center/login";
import Find_id from "../../../Center/login_find_id";
import Find_pw from "../../../Center/login_find_pw";
import Loading from "../../../Center/Loading";
import Center_dashboard from "../../../Center/Center_Header";
import Tos_header from "../../../Center/Tos_header";
import Header_login from "../../dashboard/components/Header_login";
import Main_page_logo from "../../../../image/Center/Logo/dev_logo.png";
import Dropdown_img from "../../../../image/Dev_Center/Main_header/dropdown.png";
import Setting_router from "../../setting/setting_router";
import Policy from "../../policy";
import Privacy from "../../privacy";
import { useCookies } from "react-cookie";
import Ajax from "../../../../lib/ajax-3rd-custom";
import { Server_ajax_post } from "../../../../server_ajax";

const Context = createContext();
const Navbar = ({ children }) => {
  const [usageInfoFirst, setUsageInfoFirst] = useState(false);
  const [usageInfoSecond, setUsageInfoSecond] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(); // api 모듈
  const path = useLocation().pathname;
  const globals = require("../../../../lib/globals"); //로그인 모듈
  const [userNum, setUserNum] = useState();
  const [logic, setLogic] = useState(false);
  const [agrlogic, setAgrLogic] = useState(false);
  const history = useHistory();
  const [agreeRes, setAgreeRes] = useState([]);
  //wehago_s,  h_portal_id,  h_selected_company_no,  cell_company_no,  AUTH_R_TOKEN,  AUTH_A_TOKEN

  // $(window).scroll(function () {
  //   $(".menuBar").css("left", 0 - $(this).scrollLeft());
  // });
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  // api 모듈
  useEffect(() => {
    if (cookies.wehago_s) {
      call3rdToken();
    }
  }, []);

  //임시 3rd Party 토큰 적용 예제. 위하고 로그인 후 반드시 호출이되어야 하며 공통에 추가하셔야합니다. 오픈시 제거
  const call3rdToken = () => {
    if ($.cookie("backoffice_token") == undefined) {
      Ajax.getToken({ service_code: "backoffice" }, function (result) {
        // if (result.resultCode == 200) {
        //   alert("로그인성공");
        //   // 페이지 이동
        //   // document.location.href = "http://dev.nice.wehago.com";
        // } else {
        //   alert(
        //     "로그인실패-개발시에만 서비스를 배포받아 사용 해주시면됩니다. 추후오픈시 공통로직으로 변경예정"
        //   );
        //   alert(result.resultMsg);
        // }
      });
    }
  };

  const handleLogout = (e) => {
    Object.keys(cookies).forEach((name) =>
      removeCookie(name, { path: "/", domain: ".wehago.com" })
    );
  };

  useEffect(() => {
    if (
      path.indexOf("setting") !== -1 ||
      path.indexOf("datacenter") !== -1 ||
      path.indexOf("svccenter") !== -1 ||
      path.indexOf("question") !== -1
    ) {
      if (!cookies.wehago_s) {
        location.href =
          "https://dataportal.wehago.com/#/login?url=http://developer.wehago.com";
      }
    }
  }, [path]);

  useEffect(() => {
    const idx = cookies.h_selected_company_no;
    if (idx !== undefined) {
      const subUrl = `${globals.wehagoCommonApiUrl}/user/usersimpleinfo`;
      Ajax.get(subUrl)
        .then(function (response) {
          let result = JSON.parse(response);
          setUserNum(result.resultData[0].user_no);
          setLogic(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [cookies, userNum]);

  useEffect(() => {
    if (userNum !== undefined) {
      (async function () {
        try {
          let body = { userNum };
          const result = await Server_ajax_post(
            "admin/agree_cirtification_logic",
            body
          );
          setAgreeRes(result);
          setAgrLogic(true);
          if (result.length === 0 || result[0].term_agree === "0") {
            if (path.indexOf("tos") === -1) {
              history.push(`/tos/intro`);
            }
          }
        } catch (e) {
          return console.error(e);
        }
      })();
    }
  }, [logic === true, userNum]);
  return (
    <React.Fragment>
      <Context.Provider
        value={{
          usageInfoFirst,
          setUsageInfoFirst,
          usageInfoSecond,
          setUsageInfoSecond,
          agreeRes,
          agrlogic,
        }}
      >
        {/* <Route exact path="/" component={Main_header} ></Route> */}
        <Switch>
          <Route path="/datacenter" component={Center_dashboard}></Route>
          <Route path="/svccenter" component={Center_dashboard}></Route>
          <Route path="/header_login" component={Header_login}></Route>
          <Route path="/tos" component={Tos_header}></Route>
          <Route path="/">
            <div className="hidden_box">
              <nav className="menuBar">
                <div className="menu_wrap">
                  <Link to="/" className="router_link">
                    <div className="logo">
                      <img src={Main_page_logo} alt="Logo" />
                    </div>
                  </Link>
                  <div className="menuCon">
                    <div className="rightMenu">
                      <Navbar_ui collapseOnSelect expand="lg" variant="dark">
                        <div id="navbar-nav">
                          <div className="mr-auto nav-list">
                            <Link to="/api" className="router_link">
                              API문서
                            </Link>
                            <NavDropdown
                              title="이용가이드"
                              id="collasible-nav-dropdown"
                            >
                              <Link
                                to={`/data_development_guide/dataDevelopment`}
                                className="router_link"
                              >
                                <NavDropdown.Item href="#action/3.1">
                                  데이터 센터 가이드
                                </NavDropdown.Item>
                              </Link>
                              <Link
                                to="/service_development_guide/svcDevelopment"
                                className="router_link"
                              >
                                <NavDropdown.Item href="#action/3.2">
                                  서비스 센터 가이드
                                </NavDropdown.Item>
                              </Link>
                            </NavDropdown>
                            <img src={Dropdown_img} alt="dropdown" />
                            <NavDropdown
                              title="지원"
                              id="collasible-nav-dropdown"
                            >
                              <Link
                                to="/support/notice"
                                className="router_link"
                              >
                                <NavDropdown.Item href="#action/3.1">
                                  공지사항
                                </NavDropdown.Item>
                              </Link>
                              <Link to="/support/faq">
                                <NavDropdown.Item href="#action/3.2">
                                  FAQ
                                </NavDropdown.Item>
                              </Link>

                              <Link to="/support/question">
                                <NavDropdown.Item href="#action/3.2">
                                  문의하기
                                </NavDropdown.Item>
                              </Link>

                              <Link to="/support/update">
                                <NavDropdown.Item href="#action/3.2">
                                  업데이트
                                </NavDropdown.Item>
                              </Link>
                            </NavDropdown>
                            <img src={Dropdown_img} alt="dropdown" />
                            <NavDropdown
                              title="포럼"
                              id="collasible-nav-dropdown"
                            >
                              <Link to="/forum/data">
                                <NavDropdown.Item href="#action/3.1">
                                  데이터 개발자 포럼
                                </NavDropdown.Item>
                              </Link>
                              <Link to="/forum/service">
                                <NavDropdown.Item href="#action/3.2">
                                  서비스 개발자 포럼
                                </NavDropdown.Item>
                              </Link>
                            </NavDropdown>
                            <img src={Dropdown_img} alt="dropdown" />
                          </div>
                          <Nav>
                            <div className="ellipse nav_href">
                              <Link
                                to="/datacenter/home"
                                className="data_center"
                              >
                                Data Center
                              </Link>

                              <Link
                                to="/svccenter/home"
                                className="Service_center"
                              >
                                Service Center
                              </Link>
                            </div>
                          </Nav>
                          <Nav>
                            {cookies.wehago_s ? (
                              <a
                                href="#"
                                className="ellipse login"
                                onClick={handleLogout}
                              >
                                로그아웃
                              </a>
                            ) : (
                              <a
                                target
                                href="https://dataportal.wehago.com/#/login?url=http://developer.wehago.com"
                                className="ellipse login"
                              >
                                로그인
                              </a>
                            )}
                          </Nav>
                        </div>
                      </Navbar_ui>
                    </div>
                  </div>
                </div>
              </nav>
              <div className="wrapper">
                {/* <Side_nav /> */}
                <div id="content">
                  <div className="container-fluid">
                    <Route exact path="/" component={Main_page}></Route>
                    <Switch>
                      <Route exact path="/api" component={Api_router}></Route>
                      <Route path="/api/:api" component={Api_router}></Route>
                    </Switch>
                    <Switch>
                      <Route
                        exact
                        path="/data_development_guide/:guideList"
                        component={Data_Development_Guide_page}
                      ></Route>
                      <Route
                        path="/data_development_guide/:guideList/:guideCotent"
                        component={Data_Development_Guide_Detail_page}
                      ></Route>
                      <Route
                        exact
                        path="/service_development_guide/:guideList"
                        component={Service_development_guide}
                      ></Route>
                      <Route
                        path="/service_development_guide/:guideList/:guideCotent"
                        component={Data_Development_Guide_Detail_page}
                      ></Route>
                    </Switch>
                    <Route
                      path="/support/:support"
                      component={Support_router}
                    ></Route>
                    <Route
                      path="/forum/:forum"
                      component={Forum_router}
                    ></Route>
                    <Route path="/login" component={Login_page}></Route>
                    <Route path="/findid" component={Find_id}></Route>
                    <Route path="/findpassword" component={Find_pw}></Route>
                    <Route
                      path="/setting/:setting"
                      component={Setting_router}
                    ></Route>
                    <Route path="/Loading" component={Loading}></Route>
                  </div>
                </div>
              </div>
              <Big_Footer />
              <Row gutter={24}>
                <Col xs={24} md={24}>
                  {children}
                </Col>
              </Row>
            </div>
          </Route>
        </Switch>
      </Context.Provider>
    </React.Fragment>
  );
};
export default Navbar;
export function useUsageInfo() {
  return useContext(Context);
}
