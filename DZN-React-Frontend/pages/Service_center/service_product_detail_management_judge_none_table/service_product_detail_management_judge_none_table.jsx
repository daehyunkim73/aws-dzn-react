import React, { useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Certification_info_judge from './judge_none_table';
import view_more from '../../../image/Center/Dashboard/view_more.png';
import Not_img from '../../../image/Service_Center/Service_product/Not_img.png';
import title_list_icon from '../../../image/Center/List_icon/title_list_icon.png';

const Service_product_detail_management_judge_none_table = () => {

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
                        <div>세금아 안녕 <p className="service_title_icon">제작 중</p></div>
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
                    <Tabs defaultActiveKey="judge" id="uncontrolled-tab-example">
                        <Tab eventKey="basic" className="sale_info" title="기본정보" >

                        </Tab>
                        <Tab eventKey="sale" className="sale_info" title="판매정보">

                        </Tab>
                        <Tab eventKey="api" title="API 사용">

                        </Tab>
                        <Tab eventKey="infra" title="인프라 서비스">

                        </Tab>
                        <Tab eventKey="judge" className="sale_info" title="승인심사">
                            <ul>
                                <div className="title_list_icon">
                                    <img src={title_list_icon} alt="" />
                                    <li>테스트 후 WEHAGO 서비스센터에 판매를 원하는 경우 [심사(판매) 요청] 버튼을 클릭하여 심사(판매)요청 할 수 있습니다..</li>
                                </div>
                                <div className="title_list_icon">
                                    <img src={title_list_icon} alt="" />
                                    <li>심사가 원활하게 완료되어 승인되는 경우, 판매상태로 변경하여야 판매가 가능합니다. 판매현황은 매출관리에서 확인할 수 있습니다.</li>
                                </div>
                            </ul>
                            <Certification_info_judge />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Service_product_detail_management_judge_none_table;