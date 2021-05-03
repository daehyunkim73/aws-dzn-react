import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

const Forum_sidebar = (props) => {
  const forum = _.defaultTo(props.forum_sidebar);

  const getFunction = () => {
    forum_sidebar_click();
  };

  function forum_sidebar_click() {
    const forum_sidebar_btn_list = document.getElementsByClassName(
      "nav_small_text_box"
    );
    const forum_sidebar_btn_target = document.getElementsByClassName(
      "nav_small_text_box_" + forum
    );
    for (let i = 0; i < forum_sidebar_btn_list.length; i++) {
      forum_sidebar_btn_list[i].classList.remove("sidebar_click");
      forum_sidebar_btn_target[0].classList.add("sidebar_click");
    }
  }

  useEffect(() => {
    getFunction(forum);
  });
  return (
    <React.Fragment>
      <div className="forum_sidebar">
        <div className="api_sidebar">
          <div id="slide_header">
            <div className="big_api_text_box">
              <h1>포럼</h1>
            </div>
          </div>
          <div className="nav_big_box">
            <div className="small_nav_box">
              <div className="nav_small_text_box nav_small_text_box_data">
                <Link to="/forum/data" className="router_link">
                  <p>데이터 개발자 포럼</p>
                </Link>
              </div>
            </div>
            <div className="small_nav_box">
              <div className="nav_small_text_box nav_small_text_box_service">
                <Link to="/forum/service" className="router_link">
                  <p>서비스 개발자 포럼</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Forum_sidebar;
