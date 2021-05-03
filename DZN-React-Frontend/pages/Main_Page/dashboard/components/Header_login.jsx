import React, { useEffect } from "react";
import Navbar_ui from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, Route, Switch } from "react-router-dom";
import Big_Footer from "../Page/big_Footer";
import Center_Profile from "../../../Center/Center_Profile";
import Header_Click_Event from "../../../../src/Header_Click_Event_Login";

import Center_dashboard from "../../../Center/Center_Header";
import Setting from "../../setting/Personal_info";

import Main_page_logo from "../../../../image/Center/Logo/dev_logo.png";
import Dropdown_img from "../../../../image/Dev_Center/Main_header/dropdown.png";
import header_setting from "../../../../image/Dev_Center/Main_header/setting2.png";
import profile_dropdown from "../../../../image/Center/Developers_header/profile_dropdown.png";
import profile_dummy from "../../../../image/Center/Profile/profile_dummy.jpg";

const Navbar = ({ children }) => {
  // $(window).scroll(function () {
  //   $(".menuBar").css("left", 0 - $(this).scrollLeft());
  // });

  useEffect(() => {
    Header_Click_Event();
  }, []);

  return (
    <React.Fragment>
      {/* <Route exact path="/" component={Main_header} ></Route> */}
      <Switch>
        <Route path="/datacenter/home" component={Center_dashboard}></Route>
        <Route path="/datacenter/home" component={Center_dashboard}></Route>
        <Route path="/header_login/setting" component={Setting}></Route>
        {/* <Route path="/Back_Office_Page" component={Center_dashboard} ></Route> */}
        <Route path="/header_login">
          <div className="hidden_box">
            <nav className="menuBar">
              <div className="menu_wrap">
                <Link to="/header_login" className="router_link">
                  <div className="logo">
                    <img src={Main_page_logo} alt="Logo" />
                  </div>
                </Link>

                <div className="menuCon header_login">
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
                              to="/data_development_guide"
                              className="router_link"
                            >
                              <NavDropdown.Item href="#action/3.1">
                                데이터 센터 가이드
                              </NavDropdown.Item>
                            </Link>
                            <Link
                              to="/service_development_guide"
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
                            <Link to="/support/notice" className="router_link">
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
                            <Link to="/datacenter/home" className="data_center">
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

                        <Nav className="profile">
                          <div>
                            <div className="profile_wrap">
                              <div className="nickname_wrap">
                                <img
                                  src={profile_dummy}
                                  className="profile_image profile"
                                  alt="profile"
                                />
                                <p>USER 님</p>
                                <img
                                  className="dropdown"
                                  src={profile_dropdown}
                                  alt="dropdown"
                                />
                              </div>
                            </div>
                            <Center_Profile />
                          </div>
                        </Nav>

                        <Nav>
                          <Link to="/setting/userinfo" className="router_link">
                            <img
                              src={header_setting}
                              className="center_header_right_icon main_header_setting"
                              alt="setting"
                            />
                          </Link>
                        </Nav>
                      </div>
                    </Navbar_ui>
                  </div>
                </div>
              </div>
            </nav>

            <div className="wrapper"></div>
          </div>
          <Big_Footer />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default Navbar;
