import React, { useEffect } from "react";
import Sales_info_management from "./Sales_info_management";

const Sales_info = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <React.Fragment>
      <div className="salse_info_wrap">
        <div className="page_title_wrap">
          <p className="page_title">정산정보관리</p>
          <div className="page_title_btn">
            <p>Home</p>
            <img
              className="caption_img"
              src="../image/Center/Dashboard/view_more.png"
            />
            <p>회사설정</p>
            <img
              className="caption_img"
              src="../image/Center/Dashboard/view_more.png"
            />
            <p>정산정보관리</p>
          </div>
          <div className="search_page">
            <Sales_info_management />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sales_info;
