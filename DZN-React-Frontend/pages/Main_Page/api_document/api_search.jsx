import React from "react";
import Search_arrow from "../../../image/Dev_Center/API_Document/search_arrow.png";
import Search_icon from "../../../image/Dev_Center/API_Document/search.png";

const Api_search = () => {
  return (
    <React.Fragment>
      <div className="api_content_wrap api_search_content_wrap">
        <div className="api_search">
          <p>WEHAGO API 라이브러리</p>
          <input type="text" placeholder="API 제목을 입력해주세요." />
          <img src={Search_icon} alt="search" />
        </div>
        <div className="api_content_title">
          <p>'세금' 검색 API 내용(14)</p>
        </div>
        <div
          className="api_content api_content_list"
          id="api_search_hover_text"
        >
          <p>
            전자세금계산서 API > 세금정보 등록 API{" "}
            <img src={Search_arrow} alt="search" />
          </p>
          <p>
            전자세금계산서 API > 세금정보 수정 API{" "}
            <img src={Search_arrow} alt="search" />
          </p>
          <p>
            전자세금계산서 API > 전자세금계산서 삭제 API{" "}
            <img src={Search_arrow} alt="search" />
          </p>
          <p>
            rp세금정보 등록 API <img src={Search_arrow} alt="search" />
          </p>
          <p>
            세금정보 수정 API <img src={Search_arrow} alt="search" />
          </p>
          <p>
            전자세금계산서 삭제 API <img src={Search_arrow} alt="search" />
          </p>
          <p>
            세금정보 등록 API <img src={Search_arrow} alt="search" />
          </p>
          <p>
            세금정보 수정 API <img src={Search_arrow} alt="search" />
          </p>
          <p>
            전자세금계산서 삭제 API <img src={Search_arrow} alt="search" />
          </p>
          <p>
            세금정보 등록 API <img src={Search_arrow} alt="search" />
          </p>
          <p>
            세금정보 수정 API <img src={Search_arrow} alt="search" />
          </p>
          <p>
            전자세금계산서 삭제 API <img src={Search_arrow} alt="search" />
          </p>
          <p>
            세금정보 등록 API <img src={Search_arrow} alt="search" />
          </p>
          <p>
            세금정보 수정 API <img src={Search_arrow} alt="search" />
          </p>
          <p>
            전자세금계산서 삭제 API <img src={Search_arrow} alt="search" />
          </p>
          <p>
            세금정보 등록 API
            <img src={Search_arrow} alt="search" />
          </p>
          <p>
            세금정보 수정 API <img src={Search_arrow} alt="search" />
          </p>
          <p>
            전자세금계산서 삭제 API <img src={Search_arrow} alt="search" />
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Api_search;
