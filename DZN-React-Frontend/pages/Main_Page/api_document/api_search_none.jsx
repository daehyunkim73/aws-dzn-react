import React from "react";
import Search_icon from "../../../image/Dev_Center/API_Document/search.png";
import Search_none_icon from "../../../image/Dev_Center/question/search_none.png";

const Api_search_none = () => {
  return (
    <React.Fragment>
      <div className="api_content_wrap api_search_content_wrap">
        <div className="api_search">
          <p>WEHAGO API 라이브러리</p>
          <input type="text" placeholder="API 제목을 입력해주세요." />
          <img src={Search_icon} alt="search" />
        </div>
        <div className="api_content_title">
          <p>'OO' 검색 API 내용</p>
        </div>
        <div className="api_content api_content_list api_list_none">
          <div className="content_list_none">
            <img src={Search_none_icon} />
            <br />
            <span>검색된 결과가 없습니다.</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Api_search_none;
