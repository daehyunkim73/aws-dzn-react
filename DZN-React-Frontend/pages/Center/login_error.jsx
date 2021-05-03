import React from 'react';

const Login_error = () => {

    return (
        <React.Fragment>
            <div className="login_wrap">
                <div id="container">
                    <div id="contnt">
                        <div className="content_box login_process login_error_wrap">
                            <div className="login_form">
                                <h2 className="login_error">로그인 오류 횟수 초과</h2>
                                <form action="">
                                    <fieldset>
                                        <legend className="blind">로그인폼</legend>
                                        <label htmlFor="user_id" className="blind">아이디</label>
                                        <div className="LUX_basic_text">
                                            {/* <!-- 입력창에 포커스 - inpbx className="on" 추가  --> */}
                                            <div className="inpbx on">
                                                <p className="placeholder">아이디를 입력하세요.</p>
                                                <input type="text" id="user_id" defaultValue="Suhyunkim2324" />
                                                <span className="sp_lux"></span>
                                            </div>
                                        </div>
                                        <label htmlFor="user_passwd" className="blind">비밀번호</label>
                                        <div className="LUX_basic_text password">
                                            {/* <!-- 입력창에 포커스 - inpbx className="on" 추가  --> */}
                                            <div className="inpbx on">
                                                <p className="placeholder">비밀번호를 입력하세요.</p>
                                                <input type="password" id="user_passwd" defaultValue="testtest" />
                                                <span className="sp_lux"></span>
                                            </div>
                                            <p className="info" style={{display:"none"}}>비밀번호는 영문과 숫자를 조합한 6자리 이상의 텍스트로 구성하세요</p>
                                        </div>
                                        <div className="error_info">
                                            <ul>
                                                <li>개인정보 도용으로 인해 발생할 수 있는 피해를 방지하고자 로그인 오류 허용 횟수를 5회로 제한하고 있습니다.</li>
                                                <li>정보보호를 위해 자동입력 방지 문자를 순서대로 추가입력해주시기 바랍니다.</li>
                                            </ul>
                                        </div>
                                        <div className="capcha_area">
                                            <div className="capcha_img">
                                                <img src="http://placehold.it/350x150" width="100%" height="100%" alt="capcha 이미지" />
                                            </div>
                                            <button type="button" className="LUX_basic_btn Default basic btn_refresh"><span>새로고침</span></button>
                                            <button type="button" className="LUX_basic_btn Default basic btn_sound"><span>음성듣기</span></button>
                                        </div>
                                        <label htmlFor="capcha" className="blind">자동입력 방지문자</label>
                                        <div className="LUX_basic_text error">
                                            {/* <!-- 입력창에 포커스 - inpbx className="on" 추가  --> */}
                                            <div className="inpbx on">
                                                <p className="placeholder">자동입력 방지문자</p>
                                                <input type="text" id="capcha" defaultValue="Bfjsfoefsfs" />
                                                <span className="sp_lux"></span>
                                            </div>
                                            <p className="info">등록되지 않은 아이디거나 아이디,비밀번호 또는 자동입력 방지문자를 잘못 입력하셨습니다.</p>
                                        </div>
                                        <button type="button" className="LUX_basic_btn login_basic_btn basic2 disable"><span>로그인</span></button>
                                        <div className="checkbx_area">
                                            <span className="LUX_basic_switch">
                                                <span className="LUXckbx">
                                                    {/* <!-- 동일한 구조 input type checkbox LUXckbx LUXstarbx / radio LUXrabx LUXonoffbx 로 이이지 변경 --> */}
                                                    <input type="checkbox" id="input_forid_ckbox1" />
                                                    {/* <!-- 이미지 --> */}
                                                    <span className="sp_lux"></span>
                                                    {/* <!-- input id 값과 label htmlFor 값을 동일하게 연결 --> */}
                                                    <label htmlFor="input_forid_ckbox1">아이디 저장</label>
                                                </span>
                                            </span>
                                        </div>
                                    </fieldset>
                                </form>
                                <div className="login_info">
                                    <ul>
                                        <li><a href="#">아이디 찾기</a></li>
                                        <li><a href="#">비밀번호 찾기</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment >
    )
}

export default Login_error;