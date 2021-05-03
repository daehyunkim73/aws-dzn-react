import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <React.Fragment>
      <div id="container" className="login_wrap">
        <div id="contnt">
          <div className="content_box login_process">
            <div className="login_form">
              <h2>로그인</h2>
              <p className="info_text">
                WEHAGO Developers에서 다양한 데이터 저작도구 및 오픈소스를
                활용하여 <br />
                새로운 가치를 만들어 보세요.
              </p>
              <form action="">
                <fieldset>
                  <legend className="blind">로그인폼</legend>
                  <label htmlFor="user_id" className="blind">
                    아이디
                  </label>
                  <div className="LUX_basic_text">
                    <div className="inpbx">
                      <p className="placeholder">아이디를 입력하세요.</p>
                      <input type="text" id="user_id" defaultValue="" />
                      <span className="sp_lux"></span>
                    </div>
                  </div>
                  <label htmlFor="user_passwd" className="blind">
                    비밀번호
                  </label>
                  <div className="LUX_basic_text">
                    <div className="inpbx">
                      <p className="placeholder">비밀번호를 입력하세요.</p>
                      <input type="password" id="user_passwd" defaultValue="" />
                      <span className="sp_lux"></span>
                    </div>
                    <p className="info">
                      비밀번호는 영문과 숫자를 조합한 6자리 이상의 텍스트로
                      구성하세요
                    </p>
                  </div>
                  <button
                    type="button"
                    className="LUX_basic_btn login_basic_btn basic2 disable"
                  >
                    <span>로그인</span>
                  </button>
                  <div className="checkbx_area">
                    <span className="LUX_basic_switch">
                      <span className="LUXckbx">
                        <input type="checkbox" id="input_forid_ckbox1" />
                        <span className="sp_lux"></span>
                        <label htmlFor="input_forid_ckbox1">아이디 저장</label>
                      </span>
                    </span>
                  </div>
                </fieldset>
              </form>
              <div className="login_info login_info_v2">
                <ul>
                  <li>
                    <Link to="/findid">아이디 찾기</Link>
                  </li>
                  <li>
                    <Link to="/findpassword">비밀번호 찾기</Link>
                  </li>
                </ul>
                <a href="#" className="member_join fltrgt">
                  회원가입
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
