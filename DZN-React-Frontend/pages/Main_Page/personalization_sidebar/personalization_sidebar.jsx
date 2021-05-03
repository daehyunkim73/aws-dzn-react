import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Personalization_sidebar = (props) => {
  const setting = _.defaultTo(props.setting_sidebar);

  const getFunction = () => {
    setting_sidebar_click();
  };

  function setting_sidebar_click() {
    const setting_sidebar_btn_list = document.getElementsByClassName(
      "guid_list_box_btn"
    );
    const setting_sidebar_btn_target = document.getElementsByClassName(
      "guid_list_box_" + setting
    );

    for (let i = 0; i < setting_sidebar_btn_list.length; i++) {
      setting_sidebar_btn_list[i].classList.remove("sidebar_click");
      setting_sidebar_btn_target[0].classList.add("sidebar_click");
    }
  }

  useEffect(() => {
    getFunction(setting);
  });
  return (
    <React.Fragment>
      <div className="guide_sidebar_wrap">
        <div className="guide_sidebar">
          <div id="guide_slide_header">
            <div className="guid_big_api_text_box">
              <h1>설정</h1>
            </div>
          </div>
          <div className="secondHeader">
            <div className="guid_second_header_Textbox">
              <h1>개인설정</h1>
            </div>
          </div>
          <div className="guid_nav_big_box">
            <ul className="guid_list_box">
              <Link to="/setting/userinfo">
                <li className="guid_list_box_btn guid_list_box_userinfo">
                  <span className="bar_text_span">-</span>
                  <span className="real_bar_import_text">개인정보</span>
                </li>
              </Link>
              {/* <Link to="/setting/pwchange">
                <li className="guid_list_box_btn guid_list_box_pwchange">
                  <span className="bar_text_span">-</span>
                  <span className="real_bar_import_text">비밀번호 변경</span>
                </li>
              </Link>
              <Link to="/setting/qrcode">
                <li className="guid_list_box_btn guid_list_box_qrcode">
                  <span className="bar_text_span">-</span>
                  <span className="real_bar_import_text">QR코드인증 설정</span>
                </li>
              </Link> */}
            </ul>
          </div>
          <div className="secondHeader">
            <div className="guid_second_header_Textbox">
              <h1>회사설정</h1>
            </div>
          </div>
          <div className="guid_nav_big_box">
            <ul className="guid_list_box">
              <Link to="/setting/coinfo">
                <li className="guid_list_box_btn guid_list_box_coinfo">
                  <span className="bar_text_span">-</span>
                  <span className="real_bar_import_text">회사정보</span>
                </li>
              </Link>
              <Link to="/setting/authority">
                <li className="guid_list_box_btn guid_list_box_authority">
                  <span className="bar_text_span">-</span>
                  <span className="real_bar_import_text">권한관리</span>
                </li>
              </Link>
              <Link to="/setting/settlement">
                <li className="guid_list_box_btn per_info1 guid_list_box_settlement">
                  <span className="bar_text_span">-</span>
                  <span className="real_bar_import_text">정산정보관리</span>
                </li>
              </Link>
              <Link to="/setting/payment">
                <li className="guid_list_box_btn per_info2 guid_list_box_payment">
                  <span className="bar_text_span">-</span>
                  <span className="real_bar_import_text">결제정보관리</span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Personalization_sidebar;
