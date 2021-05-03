import React from 'react';

const Login_passwd_change_input = () => {
    return (
        <React.Fragment>
            <div className="ua_container">
						<div className="passwrodbx">
							<div className="dl_style1">
								<dl>
									<dt>현재 비밀번호</dt>
									<dd>
										<div className="LUX_basic_text error">
											{/* <!-- 입력창에 포커스 - inpbx className="on" 추가  --> */}
											<div className="inpbx">
												<p className="placeholder">비밀번호를 입력하세요.</p>
												<input type="password" id="textField_text" defaultValue="" />
												<span className="sp_lux"></span>
												<div className="tool_tip">caps lock이 켜져있습니다.</div>
											</div>
											<p className="info">비밀번호가 일치하지 않습니다.</p>
										</div>
									</dd>
									<dt>새 비밀번호</dt>
									<dd>
										<div className="LUX_basic_text">
											{/* <!-- 입력창에 포커스 - inpbx className="on" 추가  --> */}
											<div className="inpbx">
												<p className="placeholder">새 비밀번호를 입력하세요.</p>
												<input type="password" id="textField_text1" defaultValue="" />
												<span className="sp_lux"></span>
												<div className="tool_tip">caps lock이 켜져있습니다.</div>
											</div>
										</div>
									</dd>
									<dt>새 비밀번호 확인</dt>
									<dd>
										<div className="LUX_basic_text">
											{/* <!-- 입력창에 포커스 - inpbx className="on" 추가  --> */}
											<div className="inpbx">
												<p className="placeholder">새 비밀번호를 한번 더 입력하세요.</p>
												<input type="password" id="textField_text2" defaultValue="" /> 
												<span className="sp_lux"></span>
												<div className="tool_tip">caps lock이 켜져있습니다.</div>
											</div>
										</div>
									</dd>
								</dl>
							</div>

                            <ul className="guide_lst">
								<li>6~16자의 영문 대/소문자, 숫자, 특수기호 조합 사용할 수 있습니다.</li>
								<li>생년월일, 전화번호 등 개인정보와 관련된 숫자, 연속된 숫자, 연속된 키보드배열과 같이 쉬운 비밀번호는 타인이 쉽게 알아낼 수 있으니 사용을 자제해 주세요.</li>
								<li>이전에 사용했던 비밀번호나 타 사이트와 다른 비밀번호를 사용하고 비밀번호는 주기적으로 변경해 주세요.</li>
							</ul>
							<button type="button" className="LUX_basic_btn Confirm basic2"><span>확인</span></button>
						</div>
					</div>
        </React.Fragment>
    )
}

export default Login_passwd_change_input;