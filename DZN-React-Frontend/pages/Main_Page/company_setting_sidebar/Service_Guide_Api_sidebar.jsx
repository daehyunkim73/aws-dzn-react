import React, { useEffect } from "react";
import { Button } from "react-bootstrap";

const Service_Guide_Api_sidebar = () => {
  return (
    <React.Fragment>
      <div className="guide_sidebar_wrap">
        <div className="guide_sidebar">
          <div id="guide_slide_header">
            <div className="guid_big_api_text_box">
              <h1>서비스 센터 가이드</h1>
            </div>
          </div>
          <div className="secondHeader">
            <div className="guid_second_header_Textbox">
              <h1>서비스 개발 가이드</h1>
            </div>
          </div>
          <div className="guid_nav_big_box">
            <ul className="guid_list_box">
              <li>
                <span className="bar_text_span">-</span>
                <span className="real_bar_import_text">개요</span>
              </li>
              <li>
                <span className="bar_text_span">-</span>
                <span className="real_bar_import_text">서비스 개발사 등록</span>
              </li>
              <li>
                <span className="bar_text_span">-</span>
                <span className="real_bar_import_text">앱(App) 생성하기</span>
              </li>
              <li>
                <span className="bar_text_span">-</span>
                <span className="real_bar_import_text">API 안내</span>
              </li>
              <li>
                <span className="bar_text_span">-</span>
                <span className="real_bar_import_text">
                  개발 인프라 신청 관리
                </span>
              </li>
              <li>
                <span className="bar_text_span">-</span>
                <span className="real_bar_import_text">
                  컴포넌트 및 디자인가이드
                </span>
              </li>
            </ul>
          </div>
          <div className="secondHeader">
            <div className="guid_second_header_Textbox">
              <h1>서비스 출시 가이드</h1>
            </div>
          </div>
          <div className="guid_nav_big_box_v2">
            <ul className="guid_list_box">
              <li>
                <span className="bar_text_span">-</span>
                <span className="real_bar_import_text">개요</span>
              </li>
              <li>
                <span className="bar_text_span">-</span>
                <span className="real_bar_import_text">승인 신청 및 출시</span>
              </li>
              <li>
                <span className="bar_text_span">-</span>
                <span className="real_bar_import_text">판매 및 정산관리</span>
              </li>
            </ul>
          </div>
          <div className="secondHeader">
            <div className="guid_second_header_Textbox">
              <h1>데이터 활용 사례</h1>
            </div>
          </div>
          <div id="service_center_guid_button">
            <Button>서비스센터 가이드</Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Service_Guide_Api_sidebar;
