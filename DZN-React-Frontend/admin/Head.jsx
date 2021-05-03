import React, { useCallback, useEffect, useState } from "react";
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
// 메인페이지 Start

import Main_header from "../pages/Main_Page/dashboard/components/Header";
import sidebar_block_none from "../src/Sidebar_block_none";

const Head = ({ children }) => {
  useEffect(() => {
    sidebar_block_none();
  }, []);

  const Big_sidebar_animation = () => {
    const left_side_bar_box = document.querySelector(".left_side_bar_box");
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
        <div className="Davcenter_href_wrap" style={{ height: "100%" }}>
          <div
            className="left_side_bar_box"
            style={{
              width: "300px",
              height: "100%",
              backgroundColor: "#555555",
              position: "fixed",
              overflow: "scroll",
              zIndex: "999999",
              right: "0",
              display: "none",
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
            <ul>
              <ul id="first_big_ul">
                <h1>DevCenter</h1>
                <Link className="link_style_text router_link" to="/">
                  <li>메인</li>
                </Link>
                <Link to="/header_login">header_login</Link>
                <br />
                <Link to="/tos/intro">login_intro</Link>
                <br />
                <Link to="/api/api_search">api_search</Link>
                <br />
                <Link to="/api/api_search_none">api_search_none</Link>
                <br />
                <Link to="/support/faq/not_detected">faq_search_none</Link>
                <br />
                <Link to="/support/question/not_detected">question_none</Link>
                <br />
                <Link to="/forum/data/forum_search_none">
                  data_forum_search_none
                </Link>
                <br />
                <Link to="/forum/service/forum_search_none">
                  service_forum_search_none
                </Link>
                <br />

                <Link to="/svccenter/product/product_detail_certification_none">
                  Service_product_detail_certification_none
                </Link>
                <br />
                <Link to="/svccenter/product/product_search">
                  Service_product_search
                </Link>
                <br />
                <Link to="/svccenter/product/product_detail_management_judge_none_table">
                  Service_product_detail_management_judge_none_table
                </Link>
                <br />
                <Link to="/svccenter/product/product_detail_management_sale_management">
                  Service_product_detail_management_sale_management
                </Link>
                <br />
                <Link to="/svccenter/product/product_detail_management_sale">
                  Service_product_detail_management_sale
                </Link>
                <br />
                <Link to="/Loading">Loading</Link>
              </ul>
            </ul>
          </div>
          <Main_header />
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default Head;
