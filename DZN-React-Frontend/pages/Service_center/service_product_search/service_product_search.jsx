import React, { useCallback } from "react";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Api_request from "./Api_request";
import view_more from "../../../image/Center/Dashboard/view_more.png";
import Not_img from "../../../image/Service_Center/Service_product/Not_img.png";

const Service_product_search = () => {
  return (
    <React.Fragment>
      <div className="service_product_wrap">
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
        <div className="max_w">
          <Tabs defaultActiveKey="api" id="uncontrolled-tab-example">
            <Tab eventKey="basic" className="sale_info" title="기본정보"></Tab>
            <Tab eventKey="sale" className="sale_info" title="판매정보"></Tab>
            <Tab eventKey="api" className="sale_info api_info" title="API 사용">
              <Tabs
                defaultActiveKey="api_request"
                id="uncontrolled-tab-example"
              >
                <Tab eventKey="api_request" title="API 신청하기">
                  <Api_request />
                </Tab>
                <Tab eventKey="api_using" title="사용 API"></Tab>
              </Tabs>
            </Tab>
            <Tab eventKey="infra" title="인프라 서비스"></Tab>
            <Tab eventKey="judge" className="sale_info" title="승인심사"></Tab>
          </Tabs>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Service_product_search;
