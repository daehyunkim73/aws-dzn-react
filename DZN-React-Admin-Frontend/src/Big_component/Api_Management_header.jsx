import React from "react";
import { Link } from "react-router-dom";
import profile_dropdown from "../../image/Center/Developers_header/profile_dropdown.png";
import profile_dummy from "../../image/Center/Profile/profile_dummy.jpg";
import Api_Manager_logo from "../../image/Api_Manager/Api_Manager_logo.png";
import bell from "../../image/Center/Developers_header/bell.png";
import setting from "../../image/Center/Developers_header/setting.png";
const Api_Management_header = ({ setStat }) => {
  const admin_href = () => {
    setStat("admin");
  };
  return (
    <React.Fragment>
      <nav className="center_header">
        <div className="center_header_wrap">
          <div className="center_header_left_wrap admin_left_wrap_box">
            <Link to="/admin/home">
              <img
                src={Api_Manager_logo}
                alt=""
                className="center_header_logo"
              />
            </Link>
            <div className="center_header_btn_wrap">
              <Link to="/admin/home">
                <button onClick={admin_href}>관리자 바로가기</button>
              </Link>
            </div>
          </div>
          <div className="center_header_right_wrap">
            <div className="profile_wrap">
              <div className="nickname_wrap">
                <p>123관리자 님</p>
                <img src={profile_dropdown} alt="dropdown" />
              </div>
              <img
                src={profile_dummy}
                className="profile_image profile"
                alt="profile"
              />
            </div>
            <img src={bell} className="center_header_right_icon" alt="bell" />
            <img
              src={setting}
              className="center_header_right_icon"
              alt="setting"
            />
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Api_Management_header;
