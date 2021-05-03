import React, { useCallback } from "react";
import Sidebar_data_center from "./Sidebar_data_center";
import Sidebar_service_center from "./Sidebar_service_center";
import dc from "../../src/center_sidebar_dc";
import sc from "../../src/center_sidebar_sc";

// 이미지 import
import side_data_center from "../../image/Center/sidebar_icon/data_center.png";
import service_menu_bar from "../../image/Center/sidebar_icon/service_menu_bar.png";

const Side_nav = (props) => {
  const Data_center_menu = useCallback(() => {
    dc();
    props.setTest(false);
  }, [props.setData]);

  const Service_center_menu = useCallback(() => {
    sc();
    props.setTest(true);
  }, [props.setData]);
  return (
    <React.Fragment>
      <nav id="sidebar" className="sidebar">
        <div className="big_ul_list">
          <div className="sidebar-header">
            <div className="data_center_big_box">
              <div className="data_center_box" onClick={Data_center_menu}>
                <h3 className="data_big_text">
                  <img src={side_data_center} alt="" />
                  <span>Data Center</span>
                </h3>
              </div>
              <div className="service_center_box" onClick={Service_center_menu}>
                <h3 className="data_big_text">
                  <img src={service_menu_bar} alt="" />
                  <span>Service Center</span>
                </h3>
              </div>
            </div>
          </div>

          {(function () {
            if (props.setData === false) {
              return <Sidebar_data_center />;
            } else return <Sidebar_service_center />;
          })()}
          <div id="data_button_box">
            <a
              href="https://datastore.wehago.com/#/datastore/landing"
              target="_blank"
            >
              <div>
                데이터유통포털 <br />
                바로가기
              </div>
            </a>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Side_nav;
