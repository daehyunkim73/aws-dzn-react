import React from "react";
import { Link } from "react-router-dom";

const Login_find_id = () => {
  return (
    <React.Fragment>
      <div className="login_wrap">
        <div id="container">
          <div id="contnt">
            <div className="content_box login_process">
              <div className="login_form">
                {/* <!-- [D] 패스워드 찾기일 경우 클래스명 변경 className="ico ico_find_passwd" --> */}
                <h2 className="ico ico_find_id">아이디 찾기</h2>
                <p className="info_text">
                  WEHAGO에 등록된 회원정보로 아이디를 찾으실 수 있습니다.
                </p>
                <form action="">
                  <fieldset>
                    <legend className="blind">아이디 찾기</legend>
                    <label htmlFor="user_name" className="blind">
                      이름
                    </label>
                    <div className="LUX_basic_text">
                      {/* <!-- 입력창에 포커스 - inpbx className="on" 추가  --> */}
                      <div className="inpbx">
                        <p className="placeholder">이름을 입력하세요.</p>
                        <input type="text" id="user_name" defaultValue="" />
                        <span className="sp_lux"></span>
                      </div>
                    </div>
                    <div className="app_download how_to_find">
                      <h3>찾으실 방법을 선택하세요</h3>
                      <ul>
                        <li>
                          <a href="#" className="LUX_basic_btn Default basic">
                            <span>휴대전화번호로 찾기</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="LUX_basic_btn Default basic">
                            <span>보조이메일로 찾기</span>
                          </a>
                        </li>
                      </ul>
                      <p>
                        위의 방법으로도 찾기 어려운 경우{" "}
                        <a href="#">본인인증</a>을 통해 찾을 수 있습니다.
                      </p>
                    </div>
                  </fieldset>
                </form>
                <div className="login_info login_info_v2">
                  <Link className="member_join fltrgt" to="/findpassword">
                    비밀번호 찾기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login_find_id;
