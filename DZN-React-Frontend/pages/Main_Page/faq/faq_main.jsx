import React, { useEffect } from "react";
import Faq_list from "./faq_list";
import Faq_detail from "./faq_detail";
import { Route, Switch, Link } from "react-router-dom";
import View_more from "../../../image/Center/Dashboard/view_more.png";

const Faq_main_Page = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <React.Fragment>
      <div className="page_title_wrap">
        <p className="page_title">FAQ</p>
        <div className="page_title_btn">
          <Link to="">
            <p>Home</p>
          </Link>
          <img className="caption_img" src={View_more} />
          <Link to="/support/notice">
            <p>지원</p>
          </Link>
          <img className="caption_img" src={View_more} />
          <Link to="/support/faq">
            <p>FAQ</p>
          </Link>
        </div>
      </div>
      <Switch>
        <Route exact path="/support/faq" component={Faq_list}></Route>
        <Route path="/support/faq/not_detected" component={Faq_list}></Route>
        <Route path="/support/faq/content/:category" component={Faq_list}></Route>
      </Switch>
    </React.Fragment>
  );
};

export default Faq_main_Page;
