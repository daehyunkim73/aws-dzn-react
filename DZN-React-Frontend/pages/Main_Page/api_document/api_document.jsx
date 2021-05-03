import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Api_logo from "../../../image/Dev_Center/API_Document/wehago_logo.png";
import Api_search from "../../../image/Dev_Center/API_Document/search.png";

const Api_document = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <React.Fragment>
      <div className="api_content_wrap">
        <div className="api_content_title">
          <p>기업에 필요한 다양한 업무환경을</p>
          <p>제공하는 비즈니스 플랫폼WEHAGO의 다양한 기능을 이용해보세요.</p>
        </div>
        <div className="wehago_logo">
          <img src={Api_logo} alt="wehagologo" />
        </div>
        <div className="api_content">
          <p>
            더존 API는 WEHAGO 서비스마켓에 연동하여 서비스를 제공하기 위한
            개발사,
          </p>
          <p>서드파티 솔루션 제공자 등에 제공하는 API입니다.</p>
          <p>
            전문적인 경영관리와 쉽고 편리한 협업 등 기업 업무환경에 적합한 API로
            다양한 서비스 런칭을 도와 드립니다.
          </p>
        </div>
        <div className="api_search">
          <input type="text" placeholder="API 제목을 입력해주세요." />
          <img src={Api_search} alt="search" />
        </div>
        <div className="api_category">
          <p>API 카테고리</p>
          <div>
            <Link className="router_link" exact to="/api/accounting">
              <button>회계</button>
            </Link>
            <button>로그인/회원가입</button>
            <button>일정관리</button>
            <button>조직관리</button>
            <button>업무관리</button>
            <button>뉴스</button>
            <button>기타</button>
            <button>기타</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Api_document;
