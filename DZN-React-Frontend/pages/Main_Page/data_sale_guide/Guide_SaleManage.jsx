import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Guide_Api_sidebar from "../guide_sidebar/Data_Guide_Api_sidebar";
import List_style from "../../../image/Dev_Center/Guide/list_stlye.png";

const Guide_SaleManage = () => {
  return (
    <React.Fragment>
      <div className="guide_wrap guide_wrap_3">
        <div className="page_title_wrap">
          <p className="page_title">판매 및 정산관리</p>
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
            <p>판매 및 정산관리</p>
          </div>
        </div>
        <Guide_Api_sidebar />
        <div className="guide_content_wrap">
          <div className="guide_mr_auto">
            <p className="guide_content pt-10">
              유통 마켓 플레이스에 판매되는 데이터 상품 관리 및 정산관리에 대한
              가이드입니다.
            </p>

            <div className="guide_list_wrap">
              <Jumbotron>
                <p className="guide_list_box_title">목차</p>
                <ul>
                  <li>
                    <img src={List_style} alt="list_stlye" />
                    <p>판매관리</p>
                  </li>
                  <li>
                    <img src={List_style} alt="list_stlye" />
                    <p>정산관리</p>
                  </li>
                </ul>
              </Jumbotron>
              <div className="guide_join">
                <p className="guide_list_title">판매관리</p>
                <ul>
                  <li>
                    <p>신규데이터에 대한 기본정보를 입력합니다.</p>
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

export default Guide_SaleManage;
