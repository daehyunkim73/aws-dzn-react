import React from "react";
import {
  Link,
  Route,
  BrowserRouter,
  useHistory,
  Redirect,
} from "react-router-dom";
import { Row, Col, Switch } from "react-bootstrap";
import Admin_header from "../src/Big_component/Admin_header";
import Admin_footer from "../src/Big_component/Admin_footer";
import Admin_sideb_bar from "../src/Big_component/Admin_sidebar";
import Admin_router from "../src/Big_component/Admin_router";

const Head = ({ children }) => {
  const Big_sidebar_animation = () => {
    const left_side_bar_box = document.querySelector(".sp_left_side_bar");
    const Button_sidebar_animate = document.getElementById(
      "Button_sidebar_animate"
    );
    if (Button_sidebar_animate.textContent === "->") {
      left_side_bar_box.style.width = "50px";
      left_side_bar_box.style.transition = "0.3s all";
      Button_sidebar_animate.textContent = "<-";
    } else if (Button_sidebar_animate.textContent === "<-") {
      left_side_bar_box.style.width = "300px";
      left_side_bar_box.style.transition = "0.3s all";
      Button_sidebar_animate.textContent = "->";
    }
  };

  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="backoffice_href_wrap" style={{ height: "0%" }}>
          <div
            className="left_side_bar_box sp_left_side_bar"
            style={{
              width: "0px",
              height: "0%",
              position: "fixed",
              backgroundColor: "#555555",
              overflow: "scroll",
              right: "0",
              zIndex: "999999",
              paddingBottom: "20px",
            }}
          >
            <button
              style={{
                color: "black",
                background: "white",
                fontSize: "20px",
                cursor: "pointer",
                marginTop: "10px",
                marginLeft: "10px",
              }}
              id="Button_sidebar_animate"
              onClick={Big_sidebar_animation}
            ></button>
            <ul id="first_big_ul">
              <h2 className="Dev_Center_href white_text">
                Dev_Center ????????????
              </h2>
              <h1>??????</h1>
              <Link className="link_style_text" to="/Admin_home">
                <li>???</li>
              </Link>
              <br />
              <h1>????????????</h1>
              <br />
              <h1>?????????????????????</h1>
              <br />
              <h1>?????????????????????</h1>

              <br />
              <h1>??????/????????????</h1>
              <Link
                className="link_style_text"
                to="/Calculate_management_after"
              >
                <li>????????????(???????????????)</li>
              </Link>

              <br />
              <h1>???????????????</h1>

              <br />
              <h1>????????? ??????</h1>
              <br />
              <h1>????????? ??????</h1>
            </ul>
          </div>
          <div className="hidden_box">
            <Admin_header />

            <div className="wrapper">
              <Admin_sideb_bar />

              <div className="backoffice_contents">
                <div className="container-fluid">
                  <Route
                    exact
                    path="/"
                    render={() => <Redirect to="/admin/home" />}
                  />
                  <Route path="/admin" component={Admin_router} />
                </div>
              </div>
            </div>
            <Admin_footer />
            <Row gutter={24}>
              <Col xs={24} md={24}>
                {children}
              </Col>
            </Row>
          </div>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default Head;
