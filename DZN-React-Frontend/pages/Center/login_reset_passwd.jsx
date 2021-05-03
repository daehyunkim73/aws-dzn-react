import React from 'react';
import Login_reset_passwd_popup from '../popup/Login_reset_passwd_popup'

const Login_reset_passwd = () => {
    const Login_reset_passwd_popup_Click = () => {
        const Login_reset_passwd_popup_bgk = document.getElementById("Login_reset_passwd_popup_bgk");
        Login_reset_passwd_popup_bgk.style.display="table";
    }
    return (
        
        <React.Fragment>
            <Login_reset_passwd_popup />
            <div id="container" className="login_wrap">
                <div id="contnt">
                    <div className="content_box login_process">
                        <div className="login_form">
                            <h2 className="ico ico_reset_passwd">비밀번호 재설정</h2>
                            <p className="info_text info_text_v2">보안을 위해 비밀번호를 다시 설정해 주세요.<br />6~16자의 영문 대소문자, 숫자, 특수문자를 조합하여 비밀번호를 입력하세요</p>
                            <div className="confirm_id reset_passwd">
                                <p className="confirm_title">&quot;<em>성수현</em> 회원님의 새 비밀번호를 입력해 주세요.&quot;</p>
                            </div>
                            <form action="">
                                <fieldset>
                                    <legend className="blind">비밀번호 재설정</legend>
                                    <label htmlFor="user_name" className="blind">이름</label>
                                    <div className="LUX_basic_text">
                                        {/* <!-- 입력창에 포커스 - inpbx className="on" 추가  --> */}
                                        <div className="inpbx on">
                                            <p className="placeholder">이름을 입력하세요.</p>
                                            <input type="text" id="user_name" defaultValue="성수현" />
                                            <span className="sp_lux"></span>
                                        </div>
                                    </div>
                                    <label htmlFor="new_passwd" className="blind">새 비밀번호 확인</label>
                                    <div className="LUX_basic_text error">
                                        {/* <!-- 입력창에 포커스 - inpbx className="on" 추가  --> */}
                                        <div className="inpbx">
                                            <p className="placeholder">새 비밀번호 확인을 입력하세요</p>
                                            <input type="text" id="new_passwd" defaultValue="" />
                                            <span className="sp_lux"></span>
                                        </div>
                                        <p className="info">새 비밀번호 확인을 입력해 주세요</p>
                                    </div>
                                    <button onClick={Login_reset_passwd_popup_Click} type="button" className="LUX_basic_btn login_basic_btn basic2 disable"><span>비밀번호 재설정</span></button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default Login_reset_passwd;