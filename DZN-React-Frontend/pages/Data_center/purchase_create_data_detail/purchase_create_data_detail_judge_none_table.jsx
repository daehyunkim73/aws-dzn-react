import React, { useCallback } from "react";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Judge_none_table from "./judge_none_table";
import Data_sale_main from "./data_sale_main";

// 이미지 import
import title_list_icon from "../../../image/Center/List_icon/title_list_icon.png";
import view_more from "../../../image/Center/Dashboard/view_more.png";

const purchase_create_data_detail_judge_none_table = () => {
  return (
    <React.Fragment>
      <div className="sale_create_data_detail_wrap">
        <div className="page_title_wrap">
          <p className="page_title">구매/제작 데이터</p>
          <div className="page_title_btn">
            <p>Home</p>
            <img className="caption_img" src={view_more} />
            <p>Data Center</p>
            <img className="caption_img" src={view_more} />
            <p>구매제작데이터</p>
          </div>
        </div>
        <div className="max_w">
          <div className="service_title_wrap">
            <div className="service_title_wrap_left">
              <p>기업재무데이터를 활용한 부도예측모형</p>
              <div className="service_title_icon">제작중</div>
            </div>
            <div className="service_title_wrap_right">
              <Form.Control as="select">
                <option>다른 제작데이터 선택하기</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </div>
          </div>

          <Tabs defaultActiveKey="judge" id="uncontrolled-tab-example">
            <Tab eventKey="basic" title="기본정보"></Tab>
            <Tab eventKey="sale" className="sale_info" title="판매정보"></Tab>
            <Tab eventKey="judge" title="승인심사">
              <ul>
                <div className="title_list_icon">
                  <img src={title_list_icon} alt="" />
                  <li>
                    승인 이후, 가격정보 수정 및 데이터 수정의 경우 재승인 요청을
                    하셔야 합니다.
                  </li>
                </div>
                <div className="title_list_icon">
                  <img src={title_list_icon} alt="" />
                  <li>
                    심사가 원활하게 완료되어 승인되는 경우, 판매상태로 변경하여
                    판매가 가능합니다. 판매현황은 매출관리에서 확인할 수
                    있습니다.
                  </li>
                </div>
              </ul>
              <Judge_none_table />
            </Tab>
          </Tabs>
        </div>
      </div>
    </React.Fragment>
  );
};

export default purchase_create_data_detail_judge_none_table;
