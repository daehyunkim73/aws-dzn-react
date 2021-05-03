import React, { useEffect } from "react";
import Login_passwd_change_input from "./Login_passwd_change_input";

// 이미지 import
import view_more from "../../image/Center/Dashboard/view_more.png";

const Login_passwd_change = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <React.Fragment>
      <div className="Login_passwd_change_wrap">
        <div className="page_title_wrap">
          <p className="page_title">비밀번호변경</p>
          <div className="page_title_btn">
            <p>Home</p>
            <img className="caption_img" src={view_more} />
            <p>개인설정</p>
            <img className="caption_img" src={view_more} />
            <p>비밀번호변경</p>
          </div>
          <div className="search_page ua">
            <Login_passwd_change_input />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login_passwd_change;
