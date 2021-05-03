import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Guide_Api_sidebar from "../guide_sidebar/Service_Guide_Api_sidebar";

import View_more from "../../../image/Center/Dashboard/view_more/png";
import Service_release_step from "../../../image/Dev_Center/Guide/service_release_step.png";
import List_style from "../../../image/Dev_Center/Guide/list_style.png";

const Service_release_Guide_page = () => {
  return (
    <React.Fragment>
      <div className="guide_wrap service_guide_wrap2">
        <div className="page_title_wrap">
          <p className="page_title">서비스 출시 가이드</p>
          <div className="page_title_btn">
            <p>Home</p>
            <img className="caption_img" src={View_more} />
            <p>이용 가이드</p>
            <img className="caption_img" src={View_more} />
            <p>서비스 출시 가이드</p>
          </div>
        </div>
        <Guide_Api_sidebar />
        <div className="guide_content_wrap">
          <div className="guide_mr_auto">
            <p className="guide_content_title">서비스 등록/판매 절차</p>
            <p className="guide_content">
              앞서 앱 개발을 완료한 후, 서비스를 출시하기 위한 테스트,
              심사과정을 거쳐 서비스 스토어에 출시합니다.
            </p>
            <Jumbotron>
              <img src={Service_release_step} alt="" />
              <div>
                <p>
                  앱 생성 및 <br />
                  기본정보 등록
                </p>
                <p>판매정보 입력</p>
                <p>
                  API 제휴 신청 및 <br /> 사용 설정
                </p>
                <p>승인 신청 및 출시</p>
                <p>판매 및 정산</p>
              </div>
            </Jumbotron>
            <div className="guide_list_wrap">
              <p className="guide_list_title">서비스 가이드 문서에서는</p>
              <p className="guide_list_content">
                위의 절차 중 푸른색으로 표시된 등록 및 판매 영역에서 필요한
                개념과 상세한 방법을 안내합니다.
              </p>
              <Jumbotron>
                <ul>
                  <li>
                    <img src={List_style} alt="list_stlye" />
                    <p>승인 신청 및 서비스 출시</p>
                  </li>
                  <li>
                    <img src={List_style} alt="list_stlye" />
                    <p>판매 및 정산</p>
                  </li>
                </ul>
              </Jumbotron>
              <div className="guide_list_btn">
                <button>문의하기</button>
                <button>다음 문서</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Service_release_Guide_page;
