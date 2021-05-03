import React from 'react';

const Login_error = () => {

    return (
        <React.Fragment>
            <div className="login_wrap">
                <div id="container">
                    <div id="contnt">
                        <div className="content_box login_process login_authentication">
                            <div className="login_form login_form_v2">
                                <h2 className="ico ico_qr">WEHAGO 로그인 2차 인증</h2>
                                <p className="info_text">로그인 보안을 위해 2차 인증을 수행합니다.<br />아래 두가지 방법 중 하나를 선택하여 인증해주세요.</p>
                                <ul className="auth_list clearfix">
                                    <li>
                                        <a href="#">
                                            <div className="qr_area">
                                                <div className="qr_img">
                                                    <img src="https://static.wehago.com/imgs/main/ico_wehago_128.png" width="92" height="92" alt="" />
                                                </div>
                                                <div className="qr_time">
                                                    WEHAGO앱으로 인증
                                                    </div>

                                            </div>
                                        </a>
                                        <p className="cancle_qr">WEHAGO앱 사용자(권장)</p>
                                    </li>
                                    <li>
                                        <div className="qr_area">
                                            <div className="qr_img">
                                                <img src="https://static.wehago.com/imgs/ll/img_qr.png" width="92" height="92" alt="QR코드" />
                                                <div className="qr_time">
                                                    남은 시간 <em>02:23</em>
                                                </div>
                                            </div>
                                            <p className="cancle_qr"><a href="#">QR CODE 인증 취소</a></p>
                                        </div>
                                    </li>
                                </ul>
                                <div className="change_device">
                                    <h3>휴대폰을 변경하셨나요?</h3>
                                    <a href="#" className="LUX_basic_btn Default basic"><span>인증기기 변경</span></a>
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