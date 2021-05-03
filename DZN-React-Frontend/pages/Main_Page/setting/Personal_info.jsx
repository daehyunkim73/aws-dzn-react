import React, { useEffect } from "react";
import Personal_info_management from "./Personal_info_management";
import Edit_personal_info from "./Edit_personal_info_management";
import { Route, Switch } from "react-router";

const Personal_info = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <React.Fragment>
      <div className=" Personal_info_wrap Edit_personal_info_wrap">
        <div className="page_title_wrap">
          <p className="page_title">회원정보관리</p>
          <div className="page_title_btn">
            <p>Home</p>
            <img
              className="caption_img"
              src="../image/Center/Dashboard/view_more.png"
            />
            <p>개인설정</p>
            <img
              className="caption_img"
              src="../image/Center/Dashboard/view_more.png"
            />
            <p>회원정보관리</p>
          </div>
        </div>
        <div className="ua">
          <Switch>
            <Route
              exact
              path="/setting/userinfo"
              component={Personal_info_management}
            ></Route>
            <Route
              exact
              path="/setting/userinfo/change"
              component={Edit_personal_info}
            ></Route>
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Personal_info;
