import React, { useEffect } from "react";
import Sales_calculate_info_search from "./Sales_calculate_info_search";
import Sales_calculate_info_table from "./Sales_calculate_info_table";
import Pagination_ui from "../../Main_Page/component/Pagination";

// 이미지 import
import view_more from "../../../image/Center/Dashboard/view_more.png";

const Sales_calculate_info = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <React.Fragment>
      <div className="search_page sales_calculate_info">
        <div className="page_title_wrap">
          <p className="page_title">매출정보</p>
          <div className="page_title_btn">
            <p>Home</p>
            <img className="caption_img" src={view_more} />
            <p>Data Center</p>
            <img className="caption_img" src={view_more} />
            <p>매출정보</p>
          </div>
        </div>
        <div className="max_w">
          <Sales_calculate_info_search />
          <Sales_calculate_info_table />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sales_calculate_info;
