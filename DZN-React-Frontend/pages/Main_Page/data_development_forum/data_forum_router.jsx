import React, { useEffect } from "react";
import _ from "lodash";
import Data_forum_list from "./forum_main";
import Data_forum_content from "./data_forum_in";
import Data_forum_writing from "./data_forum_writing";
import { Route, Switch } from "react-router-dom";
import View_more from "../../../image/Center/Dashboard/view_more.png";
import Data_Forum_main_search_none from "./data_forum_main_search_none";
import Data_forum_update from './forum_update';

const Data_forum_router = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <React.Fragment>
      <div className="page_title_wrap">
        <p className="page_title">데이터 개발자 포럼</p>
        <div className="page_title_btn">
          <p>Home</p>
          <img className="caption_img" src={View_more} />
          <p>포럼</p>
          <img className="caption_img" src={View_more} />
          <p>데이터 개발자 포럼</p>
        </div>
      </div>
      <Switch>
        <Route exact path="/forum/data" component={Data_forum_list}></Route>
        <Route
          exact
          path="/forum/data/write"
          component={Data_forum_writing}
        ></Route>
        <Route
          exact
          path="/forum/data/content/:id"
          component={Data_forum_content}
        ></Route>
        <Route
          exact
          path="/forum/data/:id"
          component={Data_forum_list}
        ></Route>
        <Route
          exact
          path="/forum/data/update/:id"
          component={Data_forum_update}
        ></Route>
        <Route
          path="/forum/data/forum_search_none"
          component={Data_Forum_main_search_none}
        ></Route>
      </Switch>
    </React.Fragment>
  );
};

export default Data_forum_router;
