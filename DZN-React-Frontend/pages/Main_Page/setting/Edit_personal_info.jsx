import React from "react";
import Edit_personal_info_management from "./Edit_personal_info_management";
import Personalization_sidebar from "../personalization_sidebar/personalization_sidebar";

const Edit_personal_info = () => {
  return (
    <React.Fragment>
      <div className="api_document_wrap Edit_personal_info_wrap">
        <Personalization_sidebar />
        <div className="page_title_wrap">
          <p className="page_title">회원정보관리</p>
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
            <p>회원정보관리</p>
          </div>
        </div>
        <div className="ua">
          <Edit_personal_info_management />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Edit_personal_info;
