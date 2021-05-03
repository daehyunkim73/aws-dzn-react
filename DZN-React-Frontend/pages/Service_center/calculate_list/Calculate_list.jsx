import React, { useEffect, useState } from "react";
// import Sales_calculate_info_search from "./Calculate_list_search";
import Sales_calculate_info_table from "./Calculate_list_table";
import Pagenations from "../../Root_component/Page_nations";
import view_more from "../../../image/Center/Dashboard/view_more.png";

const Calculate_list = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <React.Fragment>
      <div className="search_page sales_calculate_info Calculate_list_wrap">
        <div className="page_title_wrap">
          <p className="page_title">정산내역</p>
          <div className="page_title_btn">
            <p>Home</p>
            <img className="caption_img" src={view_more} />
            <p>Service Center</p>
            <img className="caption_img" src={view_more} />
            <p>정산내역</p>
          </div>
        </div>
        <div className="max_w">
          {/* <Sales_calculate_info_search /> */}
          <Sales_calculate_info_table />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Calculate_list;
