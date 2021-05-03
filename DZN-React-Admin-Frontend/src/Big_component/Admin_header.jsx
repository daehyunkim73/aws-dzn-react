import React from "react";
import { Link } from "react-router-dom";
import profile_dropdown from "../../image/Center/Developers_header/profile_dropdown.png";
import profile_dummy from "../../image/Center/Profile/profile_dummy.jpg";
import developers_logo from "../../image/Center/Developers_header/developers_logo.png";
import bell from "../../image/Center/Developers_header/bell.png";
import setting from "../../image/Center/Developers_header/setting.png";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import Ajax from '../../lib/ajax-3rd-custom'  // api 모듈

const Admin_header = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    // if (!cookies.wehago_s) {
    //   alert("로그인 후 접근이 가능합니다.");
    //   return (document.location = "https://dataportal.wehago.com/#/login");
    // }
  }, []);


    // api 모듈
    useEffect(() => {
      if(cookies.wehago_s){
        console.log('call call3rdToken()');
        call3rdToken();
      }
    },[])
  
  
    //임시 3rd Party 토큰 적용 예제. 위하고 로그인 후 반드시 호출이되어야 하며 공통에 추가하셔야합니다. 오픈시 제거
    const call3rdToken = () => {
        if ($.cookie("backoffice_token") == undefined) {
            Ajax.getToken({ service_code: "backoffice" }, function (result) {
                console.log('result',result);
                if (result.resultCode == 200) {
                    alert("로그인성공");
                    // 페이지 이동
                    //document.location.href = "http://dev.nice.wehago.com";
                } else {
                    alert("로그인실패-개발시에만 서비스를 배포받아 사용 해주시면됩니다. 추후오픈시 공통로직으로 변경예정");
                    alert(result.resultMsg);
                }
            });
        }
    }
    const handleLogout = (e) => {
      Object.keys(cookies).forEach(name => removeCookie(name, { path: '/', domain: '.wehago.com' }))
    }

  return (
    <React.Fragment>
      <nav className="center_header">
        <div className="center_header_wrap">
          <div className="center_header_left_wrap admin_left_wrap_box">
            <Link to="/admin/home">
              <img
                src={developers_logo}
                alt=""
                className="center_header_logo"
              />
            </Link>
            <div className="center_header_btn_wrap">
              <Link to="/api/home">
                <button>API 매니저</button>
              </Link>
              <Link to="/Service_center">
                <button>API 문서</button>
              </Link>
            </div>
          </div>
          <div className="center_header_right_wrap">
            <div className="profile_wrap">
              <div className="nickname_wrap">
                {/* {cookies.wehago_s ? (
                  <p>{cookies.h_portal_id}</p>
                ) : (
                  <p>로그인을하세요.</p>
                )} */}
                {
                  (cookies.wehago_s) ?
                    <a href="#" className="ellipse login" onClick={handleLogout}>로그아웃</a>
                  :
                    <a target href="https://www.wehago.com/#/login?url=http://backoffice.wehago.com/admin/home" className="ellipse login">로그인</a>
                }
                {
                  //console.log('cookies.wehago_s',cookies.wehago_s)
                }
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

export default Admin_header;
 