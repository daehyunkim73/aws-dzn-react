import React, { useEffect } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

const Api_sidebar = (props) => {
  const api = _.defaultTo(props.api_sidebar);

  const getFunction = () => {
    api_sidebar_click();
  };

  function api_sidebar_click() {
    const api_sibebar_btn_list = document.getElementsByClassName(
      "nav_small_text_box"
    );
    const api_sibebar_btn_target = document.getElementsByClassName(
      "nav_small_text_box_" + api
    );

    for (let i = 0; i < api_sibebar_btn_list.length; i++) {
      api_sibebar_btn_list[i].classList.remove("sidebar_click");
      if (api_sibebar_btn_target[0]) {
        api_sibebar_btn_target[0].classList.add("sidebar_click");
      }
    }
  }

  useEffect(() => {
    getFunction(api);
  });
  
  return (
    <React.Fragment>
      <div className="api_sidebar_wrap">
        <div className="api_sidebar">
          <div id="slide_header">
            <div className="big_api_text_box">
              <h1>API 카테고리</h1>
            </div>
          </div>
          <div className="nav_big_box">
            <div className="small_nav_box">
              <div className="nav_small_text_box nav_small_text_box_accounting">
                <Link to="/api/accounting" className="router_link">
                  <p>
                    회계 <span className="number_small_text_box">(100)</span>
                  </p>
                </Link>
              </div>
            </div>
            <div className="small_nav_box">
              <div className="nav_small_text_box">
                <p>
                  로그인/회원가입{" "}
                  <span className="number_small_text_box">(15)</span>
                </p>
              </div>
            </div>
            <div className="small_nav_box">
              <div className="nav_small_text_box">
                <p>일정관리</p>
              </div>
            </div>
            <div className="small_nav_box">
              <div className="nav_small_text_box">
                <p>
                  조직관리 <span className="number_small_text_box">(25)</span>
                </p>
              </div>
            </div>
            <div className="small_nav_box">
              <div className="nav_small_text_box">
                <p>
                  업무관리 <span className="number_small_text_box">(45)</span>
                </p>
              </div>
            </div>
            <div className="small_nav_box">
              <div className="nav_small_text_box">
                <p>
                  뉴스 <span className="number_small_text_box">(17)</span>
                </p>
              </div>
            </div>
            <div className="small_nav_box">
              <div className="nav_small_text_box">
                <p>
                  기타 <span className="number_small_text_box">(150)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Api_sidebar;
