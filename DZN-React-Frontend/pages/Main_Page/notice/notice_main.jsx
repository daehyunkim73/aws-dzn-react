import React, { useEffect } from "react";
import Pagination from "../../Main_Page/component/Pagination";
import Notice_list from "./notice_list";
import { Route, Switch } from "react-router-dom";
import Notice_detail from "./notice_detail";
import View_more from "../../../image/Center/Dashboard/view_more.png";

const Notice_main = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <React.Fragment>
      <div className="page_title_wrap">
        <p className="page_title">공지사항</p>
        <div className="page_title_btn">
          <p>Home</p>
            <img className="caption_img" src={View_more} />
          <p>지원</p>
            <img className="caption_img" src={View_more} />
          <p>공지사항</p>
        </div>
      </div>
      <Switch>
        <Route exact path="/support/notice" component={Notice_list}></Route>
        <Route path="/support/notice/content/:id" component={Notice_detail}></Route>
      </Switch>
    </React.Fragment>
  );
};

export default Notice_main;
