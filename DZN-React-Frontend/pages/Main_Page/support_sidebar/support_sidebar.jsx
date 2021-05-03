import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

const Support_sidebar = (props) => {
  const support = _.defaultTo(props.support_sidebar);
  const getFunction = () => {
    support_sidebar_click();
  };

  function support_sidebar_click() {
    const support_sidebar_btn_list = document.getElementsByClassName(
      "nav_small_text_box"
    );
    const support_sidebar_btn_target = document.getElementsByClassName(
      "nav_small_text_box_" + support
    );

    for (let i = 0; i < support_sidebar_btn_list.length; i++) {
      support_sidebar_btn_list[i].classList.remove("sidebar_click");
      support_sidebar_btn_target[0].classList.add("sidebar_click");
    }
  }

  useEffect(() => {
    getFunction(support);
  });

  return (
    <React.Fragment>
      <div className="support_sidebar">
        <div className="api_sidebar">
          <div id="slide_header">
            <div className="big_api_text_box">
              <h1>지원</h1>
            </div>
          </div>
          <div className="nav_big_box">
            <div className="small_nav_box">
              <div className="nav_small_text_box nav_small_text_box_notice">
                <Link to="/support/notice" className="router_link">
                  <p>공지사항</p>
                </Link>
              </div>
            </div>
            <div className="small_nav_box">
              <div className="nav_small_text_box nav_small_text_box_faq">
                <Link to="/support/faq" className="router_link">
                  <p>FAQ</p>
                </Link>
              </div>
            </div>
            <div className="small_nav_box">
              <div className="nav_small_text_box nav_small_text_box_question">
                <Link to="/support/question" className="router_link">
                  <p>문의하기</p>
                </Link>
              </div>
            </div>
            <div className="small_nav_box">
              <div className="nav_small_text_box nav_small_text_box_update">
                <Link to="/support/update" className="router_link">
                  <p>업데이트</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Support_sidebar;
