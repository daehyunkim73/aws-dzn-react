import React, { useEffect } from "react";
import Service_forum_list from "./forum_service_main";
import Service_forum_content from "./service_forum_in";
import { Route, Switch } from "react-router-dom";
import View_more from "../../../image/Center/Dashboard/view_more.png";
import Service_forum_main_search_none from "./service_forum_main_search_none";
import Data_forum_writing from "./data_forum_writing";

const Service_forum_router = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <React.Fragment>
      <div className="page_title_wrap">
        <p className="page_title">서비스 개발자 포럼</p>
        <div className="page_title_btn">
          <p>Home</p>
          <img className="caption_img" src={View_more} />
          <p>포럼</p>
          <img className="caption_img" src={View_more} />
          <p>서비스 개발자 포럼</p>
        </div>
      </div>
      <Switch>
        <Route
          exact
          path="/forum/service"
          component={Service_forum_list}
        ></Route>
        <Route
          exact
          path="/forum/service/content"
          component={Service_forum_content}
        ></Route>
        <Route
          exact
          path="/forum/service/write"
          component={Data_forum_writing}
        ></Route>
        <Route
          path="/forum/service/forum_search_none"
          component={Service_forum_main_search_none}
        ></Route>
      </Switch>
    </React.Fragment>
  );
};

export default Service_forum_router;
