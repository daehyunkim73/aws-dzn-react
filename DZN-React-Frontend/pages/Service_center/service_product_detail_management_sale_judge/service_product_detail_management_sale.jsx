import React, { useCallback } from "react";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Certification_info_judge from "./sale_judge";
import view_more from "../../../image/Center/Dashboard/view_more.png";
import Not_img from "../../../image/Service_Center/Service_product/Not_img.png";
import title_list_icon from "../../../image/Center/List_icon/title_list_icon.png";

const Service_product_detail_management_sale = () => {
  return (
    <React.Fragment>
      <div className="service_product_wrap service_product_wrap_judge">
        <div className="page_title_wrap">
          <p className="page_title">서비스 상품 관리</p>
          <div className="page_title_btn">
            <p>Home</p>
            <img className="caption_img" src={view_more} />
            <p>Service Center</p>
            <img className="caption_img" src={view_more} />
            <p>서비스 상품 관리</p>
          </div>
        </div>
        <div className="max_w">
          <div className="service_title_wrap">
            <div className="service_title_wrap_left">
              <img src={Not_img} alt="logo" />
              <div>
                세금아 안녕 <p className="service_title_icon">제작 중</p>
              </div>
            </div>
            <div className="service_title_wrap_right">
              <Form.Control as="select">
                <option>서비스 상품 선택하기</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </div>
          </div>
          <Tabs defaultActiveKey="judge" id="uncontrolled-tab-example">
            <Tab eventKey="basic" className="sale_info" title="기본정보"></Tab>
            <Tab eventKey="sale" className="sale_info" title="판매정보"></Tab>
            <Tab eventKey="api" title="API 사용"></Tab>
            <Tab eventKey="infra" title="인프라 서비스"></Tab>
            <Tab eventKey="sale_management" title="매출관리"></Tab>
            <Tab eventKey="judge" className="sale_info" title="승인심사">
              <ul>
                <div className="title_list_icon">
                  <img src={title_list_icon} alt="" />
                  <li>
                    승인 이후, 가격정보 수정 및 데이터 수정의 경우 재승인 요청을
                    하셔야 합니다.
                  </li>
                  <Certification_info_judge />
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
              <Certification_info_judge />
            </Tab>
          </Tabs>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Service_product_detail_management_sale;
