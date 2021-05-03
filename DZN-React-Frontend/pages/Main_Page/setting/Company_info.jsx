import React, { useEffect } from "react";
import Company_info_detail from "./Company_info_detail";
import { Route } from "react-router-dom";
import Company_set_detail from "./Company_set_detail";

const Company_info = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <React.Fragment>
      <div className="Company_info_wrap">
        <div className="page_title_wrap">
          <p className="page_title">회사정보</p>
          <div className="page_title_btn">
            <p>Home</p>
            <img
              className="caption_img"
              src="../image/Center/Dashboard/view_more.png"
            />
            <p>회사설정</p>
            <img
              className="caption_img"
              src="../image/Center/Dashboard/view_more.png"
            />
            <p>회사정보</p>
          </div>
        </div>
        <div className="cs">
          <Route
            exact
            path="/setting/coinfo"
            component={Company_info_detail}
          ></Route>
          <Route
            path="/setting/coinfo/revise"
            component={Company_set_detail}
          ></Route>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Company_info;
