import React from "react";

// 이미지 import
import profile_logout from "../../image/Center/Profile/profile_logout.png";
import profile_dummy from "../../image/Center/Profile/profile_dummy.jpg";
import profile_mail from "../../image/Center/Profile/profile_mail.png";
import profile_platform from "../../image/Center/Profile/profile_platform.png";
import Profile_logout_active from "../../image/Center/Profile/profile_logout_active.png";
import { useCookies } from "react-cookie";
import Ajax from "../../lib/ajax-3rd-custom";
import { useEffect, useState, useRef } from "react";
import globals from "../../lib/globals";
import { Alert } from "react-bootstrap";

const Center_Profile = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  //wehago_s,  h_portal_id,  h_selected_company_no,  cell_company_no,  AUTH_R_TOKEN,  AUTH_A_TOKEN
  const [mbrInfo, setMbrInfo] = useState([]);
  const [loadStat, setLoadStat] = useState(false);
  const mbrInfoLayerPop = useRef("");

  useEffect(() => {
    const get_mbrInfo = () => {
      let cno = cookies.h_selected_company_no;
      let url = globals.wehagoCommonApiUrl + "/user/userinfo/detail?cno=" + cno;
      console.log("url", url);
      Ajax.get(url).then(
        function (response) {
          let result = JSON.parse(response);
          if (result.resultCode == 200) {
            setMbrInfo(() => result.resultData);
            //  mbrInfo.employee_list[0].company_name_kr
            setLoadStat(true);
          } else {
            console.error("Error: ", result.resultMsg);
          }
        }.bind(this),
        function (error) {
          console.error("Failed!", error);
          alert(error);
          handleLogout();
        }.bind(this)
      );
    };

    try {
      cookies.wehago_s && get_mbrInfo();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleLogout = () => {
    Object.keys(cookies).forEach((name) =>
      removeCookie(name, { path: "/", domain: ".wehago.com" })
    );
    mbrInfoLayerPop.current.style.display = "none";
  };

  return (
    <div className="profile_active_wrap" ref={mbrInfoLayerPop}>
      <div className="profile_bg">
        <div>
          <img
            src={profile_logout}
            alt="profile_logout"
            onClick={handleLogout}
          />
        </div>
      </div>
      <div className="profile_img">
        <div>
          <img src={profile_dummy} alt="profile_dummy" />
        </div>
        <p>{cookies.wehago_s ? mbrInfo.user_name : "User 님"}</p>
      </div>
      <div className="profile_content">
        <div>
          <div className="profile_mail">
            <img src={profile_mail} alt="profile_mail" />
          </div>
          <span>
            {cookies.wehago_s ? mbrInfo.user_email : "user@wehago.com"}
          </span>
        </div>

        <div>
          <div className="profile_platform">
            <img src={profile_platform} alt="profile_platform" />
          </div>
          <span>
            {cookies.wehago_s
              ? loadStat === true && mbrInfo.employee_list[0].company_name_kr
              : "소속없음"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Center_Profile;
