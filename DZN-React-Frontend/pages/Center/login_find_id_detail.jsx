import React,{useCallback} from 'react';
import Phone_certification_popup from '../popup/Phone_certification_popup';
import User_none_popup from '../popup/User_none_popup';

const Login_find_id_detail = () => {
    const Phone_certification_Click = () => {
        const Phone_certification_popup_bgk = document.getElementById("Phone_certification_popup_bgk");
        Phone_certification_popup_bgk.style.display="table";
    }
    const User_none_popup_Click = () => {
        const User_none_popup_bgk = document.getElementById("User_none_popup_bgk");
        User_none_popup_bgk.style.display="table";
    }

    return (
        <React.Fragment>
            <Phone_certification_popup />
            <User_none_popup />
            <div className="login_wrap">
                <div id="container">
                    <div id="contnt">
                        <div className="content_box login_process">
                            <div className="login_form">
                                {/* <!-- [D] 패스워드 찾기일 경우 클래스명 변경 className="ico ico_find_passwd" --> */}
                                <h2 className="ico ico_find_id">아이디 찾기</h2>
                                <p className="info_text">WEHAGO에 등록된 회원정보로 아이디를 찾으실 수 있습니다.</p>
                                <form action="">
                                    <fieldset>
                                        <legend className="blind">아이디 찾기</legend>
                                        <label htmlFor="user_name" className="blind">이름</label>
                                        <div className="LUX_basic_text disabled">
                                            {/* <!-- 입력창에 포커스 - inpbx className="on" 추가  --> */}
                                            <div className="inpbx ">
                                                <p className="placeholder">이름을 입력하세요.</p>
                                                <input type="text" id="user_name" defaultValue="성수현" disabled="disabled" />
                                                <span className="sp_lux"></span>
                                            </div>
                                        </div>

                                        {/* <!-- 전화번호 인증 --> */}
                                        <div className="phone_area">
                                            <label htmlFor="user_phone" className="blind">휴대전화번호</label>
                                            <div className="LUX_basic_text error">
                                                {/* <!-- 입력창에 포커스 - inpbx className="on" 추가  --> */}
                                                <div className="inpbx">
                                                    <p className="placeholder">휴대전화번호를 입력하세요</p>
                                                    <input type="text" id="user_phone" defaultValue="" />
                                                    <span className="sp_lux"></span>
                                                </div>
                                                <p className="info">아이디 또는 비밀번호가 일치하지 않습니다.</p>
                                            </div>
                                            <a className="LUX_basic_btn Default basic" onClick={Phone_certification_Click}>인증</a>
                                        </div>
                                        {/* <!-- //전화번호 인증 --> */}

                                        {/* <!-- 이메일 인증 --> */}
                                        <div className="phone_area">
                                            <label htmlFor="email_id" className="blind">이메일 아이디</label>
                                            <div className="LUX_basic_text">
                                                {/* <!-- 입력창에 포커스 - inpbx className="on" 추가  --> */}
                                                <div className="inpbx">
                                                    <p className="placeholder"></p>
                                                    <input type="text" placeholder="이메일주소를 입력하세요." id="email_id" defaultValue="" />
                                                    <span className="sp_lux"></span>
                                                </div>
                                            </div>
                                            <a className="LUX_basic_btn Default basic" onClick={Phone_certification_Click}>인증</a>
                                        </div>
                                        {/* <!-- //이메일 인증 --> */}

                                        <label htmlFor="confirm_num" className="blind">인증번호</label>
                                        <div className="phone_area">
                                            <div className="LUX_basic_text">
                                                {/* <!-- 입력창에 포커스 - inpbx className="on" 추가  --> */}
                                                <div className="inpbx">
                                                    <p className="placeholder">인증번호를 입력하세요.</p>
                                                    <input type="text" id="confirm_num" defaultValue="" />
                                                    <span className="sp_lux"></span>
                                                </div>
                                            </div>
                                            <div className="time_counter">-9:59</div>
                                        </div>
                                        <div className="confirm_area">
                                            <ul>
                                                <li><a className="LUX_basic_btn Confirm basic"><span>취소</span></a></li>
                                                <li onClick={User_none_popup_Click}><a className="LUX_basic_btn Confirm basic2"><span>확인</span></a></li>
                                            </ul>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment >
    )
}

export default Login_find_id_detail;