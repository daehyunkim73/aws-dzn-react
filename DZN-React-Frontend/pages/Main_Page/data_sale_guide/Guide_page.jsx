import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Guide_Api_sidebar from "../guide_sidebar/Data_Guide_Api_sidebar";
import List_style from "../../../image/Dev_Center/Guide/list_style.png";
import Data_sale_step from "../../../image/Dev_Center/Guide/data_sale_step.png";

const Data_sale_Guide_page = () => {
  return (
    <React.Fragment>
      <div className="guide_wrap guide_wrap_1">
        <div className="page_title_wrap">
          <p className="page_title">데이터 판매가이드</p>
          <div className="page_title_btn">
            <p>Home</p>
            <img
              className="caption_img"
              src="../image/Center/Dashboard/view_more.png"
            />
            <p>이용 가이드</p>
            <img
              className="caption_img"
              src="../image/Center/Dashboard/view_more.png"
            />
            <p>데이터센터 가이드</p>
            <img
              className="caption_img"
              src="../image/Center/Dashboard/view_more.png"
            />
            <p>데이터 판매가이드</p>
          </div>
        </div>
        <Guide_Api_sidebar />
        <div className="guide_content_wrap">
          <div className="guide_mr_auto">
            <p className="guide_content_title">데이터 개발/판매 절차</p>
            <p className="guide_content">
              데이터를 개발/판매하기 위해서는 단계별 절차를 거쳐야 합니다.
            </p>
            <Jumbotron>
              <img src={Data_sale_step} alt="" />
              <div>
                <p>
                  데이터개발사 <br />
                  등록
                </p>
                <p>
                  WISE,WIDE
                  <br />
                  데이터 가공 개발
                </p>
                <p>
                  WISE,WIDE
                  <br />
                  신규데이터 생성
                </p>
                <p>
                  데이터정보 입력 및<br /> 판매신청
                </p>
                <p>판매 및 정산</p>
              </div>
            </Jumbotron>
            <div className="guide_list_wrap">
              <p className="guide_list_title">판매 가이드 목차</p>
              <p className="guide_list_content">
                본 문서는 실제 개발 과정과 유사하게 진행되므로, 순차적으로
                확인하시는 것을 권장합니다.
              </p>
              <Jumbotron>
                <ul>
                  <li>
                    <img src={List_style} alt="list_stlye" />
                    <p>신규데이터 정보입력</p>
                  </li>
                  <li>
                    <img src={List_style} alt="list_stlye" />
                    <p>판매 및 정산관리</p>
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

export default Data_sale_Guide_page;
