import React, { useState, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Pagination from "../../Big_component/Pagination";
import Data_forum_header from "./components/Forum_management/Data_forum_header";
import Data_forum_table from "./components/Forum_management/Data_forum_table";

import Service_forum_header from "./components/Forum_management/Service_forum_header";
import Service_forum_table from "./components/Forum_management/Service_forum_table";

const Forum_main = () => {
  const [key, setKey] = useState("home");
  const [forum, Setforum] = useState("데이터 개발자 포럼");

  useEffect(() => {
    window.scrollTo(0, 0);

    const tap_text_change = document.querySelectorAll(
      ".forum_main_box .backoffice_tab_wrap > a"
    );

    tap_text_change[0].addEventListener("click", () => {
      Setforum("데이터 개발자 포럼");
    });

    tap_text_change[1].addEventListener("click", () => {
      Setforum("서비스 개발자 포럼");
    });

    return () => {
      tap_text_change;
    };
  }, [forum]);

  return (
    <React.Fragment>
      <div className="forum_main_box">
        <div className="Page_same_text">
          <p className="backoffice_title">{forum}</p>
        </div>
        <Tabs
          className="backoffice_tab_wrap"
          defaultActiveKey="forum"
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="home" title="데이터 개발자 포럼">
            <Data_forum_header />
            <Data_forum_table />
          </Tab>
          <Tab eventKey="service_forum" title="서비스 개발자 포럼">
            <Service_forum_header />
            <Service_forum_table />
          </Tab>
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default Forum_main;
