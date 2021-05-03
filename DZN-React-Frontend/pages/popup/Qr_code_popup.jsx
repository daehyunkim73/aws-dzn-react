import React,{useCallback} from 'react';

const Qr_code_popup = () => {
    const sadasdasd = useCallback(() => {
        const qr_code_popup = document.getElementById("qr_code_popup");
        qr_code_popup.style.display = "none";
    }, []);
    return (
        <React.Fragment>
            <div className="LUX_basic_dialog admin_background_same_box" id="qr_code_popup">
                <div className="dialog_wrap Buy_make_popup_white_box">
                    <div className="service_center_delete_middel_white_box">


                        <div className="dialog_content sm">
                            <div className="dialog_data">
                                <div className="dialog_data_tit clearbx">
                                    <h1>모바일 앱 내 폰에 설치</h1>
                                </div>
                                <div className="dialog_data_area">
                                    <p className="title_desc" style={{ marginTop: "-3px" }}>편리하게 <span className="point_color">WEHAGO</span> 모바일 앱을 설치하세요.</p>
                                    <ul className="apps_list">
                                        <li>
                                            <div className="list_title">스토어에서 설치</div>
                                            <div className="app_links">
                                                <a href="#" className="app_google">구글 Play Store</a>
                                                <a href="#" className="app_apple">애플 App Store</a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="list_title">설치 URL 문자로 받기</div>
                                            <div className="input_bx">
                                                <div className="LUX_basic_text error">
                                                    {/* <!-- 입력창에 포커스 - inpbx className="on" 추가  --> */}
                                                    <div className="inpbx">
                                                        <p className="placeholder">휴대전화번호를 입력하세요.('-' 제외)</p>
                                                        <input type="text" id="textField_text3" defaultValue="000-000-000000" />
                                                        <span className="sp_lux"></span>
                                                    </div>
                                                    <p className="info">올바른 휴대전화번호를 입력하세요.</p>
                                                </div>
                                                <button type="button" className="LUX_basic_btn Default basic"><span>전송</span></button>
                                            </div>
                                            <p className="sms_info">입력하신 번호는 저장되지 않습니다.</p>
                                            <p className="sms_info">SMS전송은 무료입니다.</p>
                                            <p className="sms_info">같은 번호로 하루에 최대 3번까지 발송 가능합니다.</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="dialog_btnbx">
                            <div onClick={sadasdasd}>
                                <a className="LUX_basic_btn SAOverConfirm basic" ><span>취소</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default Qr_code_popup;