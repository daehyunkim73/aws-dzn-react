import React, { useEffect } from "react";
import Qr_code_detail from "./Qr_code_detail";
import Qr_code_popup from "../../popup/Qr_code_popup";

const Qr_code = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <React.Fragment>
      <Qr_code_popup />

      <div className="Qr_code_wrap">
        <div className="page_title_wrap">
          <p className="page_title">QR코드인증 설정</p>
          <div className="page_title_btn">
            <p>Home</p>
            <img
              className="caption_img"
              src="../image/Center/Dashboard/view_more.png"
            />
            <p>개인설정</p>
            <img
              className="caption_img"
              src="../image/Center/Dashboard/view_more.png"
            />
            <p>QR코드인증 설정</p>
          </div>
        </div>
        <div className="ua">
          <Qr_code_detail />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Qr_code;
