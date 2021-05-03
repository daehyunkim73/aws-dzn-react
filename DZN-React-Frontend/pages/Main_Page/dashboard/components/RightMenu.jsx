import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const RightMenu = () => {
  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <div id="navbar-nav">
          <div className="mr-auto nav-list">
            <Nav.Link>API문서</Nav.Link>
            <NavDropdown title="이용가이드" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                데이터 센터 가이드
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                서비스 센터 가이드
              </NavDropdown.Item>
            </NavDropdown>
            <img
              src="../image/Dev_Center/Main_header/dropdown.png"
              alt="dropdown"
            />
            <NavDropdown title="지원" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">공지사항</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">FAQ</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">문의하기</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">업데이트</NavDropdown.Item>
            </NavDropdown>
            <img
              src="../image/Dev_Center/Main_header/dropdown.png"
              alt="dropdown"
            />
            <NavDropdown title="포럼" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                데이터 활용 포럼
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                서비스 개발자 포럼
              </NavDropdown.Item>
            </NavDropdown>
            <img
              src="../image/Dev_Center/Main_header/dropdown.png"
              alt="dropdown"
            />
          </div>
          <Nav>
            <div className="ellipse nav_href">
              <a
                href="https://dscenter-3a104.firebaseapp.com/"
                className="data_center"
              >
                Data Center
              </a>
              <a
                href="https://dscenterp2.firebaseapp.com/"
                className="Service_center"
              >
                Service Center
              </a>
            </div>
          </Nav>
          <Nav>
            <a className="ellipse login" href="">
              로그인
            </a>
          </Nav>
        </div>
      </Navbar>
    </React.Fragment>
  );
};

export default RightMenu;
