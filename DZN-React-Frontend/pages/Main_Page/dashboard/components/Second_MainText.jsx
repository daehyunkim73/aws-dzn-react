import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ServiceCenterButton from './Service_Center_Button';
import Carousel_api_icon from '../../../../image/Dev_Center/DashBoard/Carousel/api.png';
import Carousel_setting_icon from '../../../../image/Dev_Center/DashBoard/Carousel/setting.png';

const Second_MainText = () => {
  return (
    <React.Fragment>
      <Container fluid>
        <div className="main_text_wrap">
          <Row>
            <div className="text_wrap carousel_text_title w-100">
              <Col><strong>APP 서비스 및 개발환경 지원</strong></Col>
            </div>
            <div className="text_wrap carousel_text w-100">
              <Col>WEHAGO의 다양한 오픈소스로 <br /> 편리한 앱 서비스 개발 환경을 지원합니다.</Col>
            </div>
            <div className="text_wrap carousel_ellipse ellipse second_carousel_ellipse">
              <Col>
                <div className="elipse_wrap w-100">
                  <div className="api_wrap carousel_icon">
                    <img className="api" src={Carousel_api_icon} alt='api_icon' />
                    <p className="api_text">API</p>
                  </div>
                  <div className="setting_wrap carousel_icon">
                    <img className="setting" src={Carousel_setting_icon} alt='setting_icon' />
                    <p className="setting_text">개발환경</p>
                  </div>
                  <p className="carousel_ellipse_text">
                    새롭고 다양한 개발이 가능하도록 많은 API와 개발 인프라 환경을 제공합니다. <br /> 지금 바로 새로운 비즈니스를 만들어보세요.
              </p>
                </div>
              </Col>
            </div>
          </Row>
          <ServiceCenterButton />
        </div>
      </Container>
    </React.Fragment>
  )
}

export default Second_MainText;
