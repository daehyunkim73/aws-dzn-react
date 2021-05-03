import React, { useEffect, useCallback } from "react";
import View_more from "../../../image/Center/Dashboard/view_more.png";
import { Route, Switch } from "react-router";
import Question_list from "./question_list";
import Question_detail from "./question_detail";
import Question_none from "./question_gaci_Table_none";

const Question_gaci_page = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <React.Fragment>
      <div className="page_title_wrap">
        <p className="page_title">문의하기</p>
        <div className="page_title_btn">
          <p>Home</p>
          <img className="caption_img" src={View_more} />
          <p>지원</p>
          <img className="caption_img" src={View_more} />
          <p>문의하기</p>
        </div>
      </div>
      <Switch>
        <Route exact path="/support/question" component={Question_list}></Route>
      </Switch>
      <Switch>
        <Route
          exact
          path="/support/question/content/list/:qst_idx"
          component={Question_detail}
        ></Route>
      </Switch>
      <Switch>
        <Route
          exact
          path="/support/question/question_none"
          component={Question_none}
        ></Route>
      </Switch>
    </React.Fragment>
  );
};
export default Question_gaci_page;
