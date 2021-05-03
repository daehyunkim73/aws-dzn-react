import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Guide_Api_sidebar from "../guide_sidebar/Data_Guide_Api_sidebar";
import List_style from "../../../image/Dev_Center/Guide/list_style.png";

const Guide_Newdata = () => {
  return (
    <React.Fragment>
      <div className="guide_wrap guide_wrap_2">
        <div className="page_title_wrap">
          <p className="page_title">신규데이터 정보입력</p>
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
            <p>신규데이터 정보입력</p>
          </div>
        </div>
        <Guide_Api_sidebar />
        <div className="guide_content_wrap">
          <div className="guide_mr_auto">
            <p className="guide_content pt-10">
              데이터 상품을 유통마켓플레이스에 판매하기 위한 정보 등록 및 승인
              신청 절차입니다.
            </p>

            <div className="guide_list_wrap">
              <Jumbotron>
                <p className="guide_list_box_title">목차</p>
                <ul>
                  <li>
                    <img src={List_style} alt="list_stlye" />
                    <p>기본정보등록</p>
                  </li>
                  <li>
                    <img src={List_style} alt="list_stlye" />
                    <p>판매정보등록</p>
                  </li>
                  <li>
                    <img src={List_style} alt="list_stlye" />
                    <p>승인심사요청</p>
                  </li>
                </ul>
              </Jumbotron>
              <div className="guide_join">
                <p className="guide_list_title">기본정보등록</p>
                <ul>
                  <li>
                    <p>신규 데이터에 대한 기본정보를 입력합니다.</p>
                  </li>
                </ul>
              </div>

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

export default Guide_Newdata;
