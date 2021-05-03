import React from 'react';

const Login_confirm_id = () => {

    return (
        <React.Fragment>
            <div className="login_wrap">
                <div id="container">
                    <div id="contnt">
                        <div className="content_box login_process">
                            <div className="login_form login_form_v2">
                                <h2 className="ico ico_confirm_id">아이디 확인</h2>
                                <p className="info_text">찾으신 회원님의 아이디를 확인하세요</p>
                                <div className="confirm_id">
                                    <p className="confirm_title">&quot;<em>성수현</em> 회원님의 아이디는 <em>suhyun0201</em> 입니다.&quot;</p>
                                    <p className="confirm_notice">가입 시 입력하신 정보는<br />로그인 후 [개인설정]에서 확인하실 수 있습니다</p>
                                </div>
                                <button type="button" className="LUX_basic_btn login_basic_btn basic2 disable"><span>로그인</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment >
    )
}

export default Login_confirm_id;