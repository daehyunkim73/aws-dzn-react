import React, { useCallback } from "react";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Service_basic_info from "./Service_basic_info";
import view_more from "../../../image/Center/Dashboard/view_more.png";
import Not_img_icon from "../../../image/Service_Center/Service_product/Not_img.png";
import Title_list_icon from "../../../image/Center/List_icon/title_list_icon.png";

const Service_product_detail_management_certification_none = () => {
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
        <div className="max_w">
          <div className="service_title_wrap">
            <div className="service_title_wrap_left">
              <img src={Not_img_icon} alt="" />
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
          <Tabs defaultActiveKey="basic" id="uncontrolled-tab-example">
            <Tab eventKey="basic" className="sale_info" title="기본정보">
              <ul>
                <div className="title_list_icon">
                  <img src={Title_list_icon} alt="" />
                  <li>
                    서비스의 기본정보(이름, 서비스URL)과 API를 사용하기 위해
                    필요한 정보(Redirect URI(s), 권한(Scope) 등)을 입력하거나
                    수정할 수 있습니다.
                  </li>
                </div>
                <div className="title_list_icon">
                  <img src={Title_list_icon} alt="" />
                  <li>
                    서비스의 인증정보 (API key, API secret key, API token 정보는
                    App의 인증 및 동작에 중요한 정보이오니 관리에 주의해야
                    합니다.
                  </li>
                </div>
              </ul>
              <Service_basic_info />
              <div className="judge_table_top_btn judge_table_btn">
                <button>목록</button>
                <button>저장</button>
              </div>
            </Tab>
            <Tab eventKey="sale" className="sale_info" title="판매정보"></Tab>
            <Tab eventKey="api" title="API 사용"></Tab>
            <Tab eventKey="infra" title="인프라 서비스"></Tab>
            <Tab eventKey="judge" title="승인심사"></Tab>
          </Tabs>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Service_product_detail_management_certification_none;
