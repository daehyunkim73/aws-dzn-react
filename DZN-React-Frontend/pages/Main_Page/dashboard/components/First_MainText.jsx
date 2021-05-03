import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataCenterButton from './Data_Center_Button';
import Wise_img from '../../../../image/Dev_Center/DashBoard/Carousel/wise.png';
import Wide_img from '../../../../image/Dev_Center/DashBoard/Carousel/wide.png';

const First_MainText = () => {
  return (
    <React.Fragment>
      <Container fluid>
        <div className="main_text_wrap">
          <Row>
            <div className="text_wrap carousel_text_title w-100">
              <Col><strong>데이터 활용 및 신규 데이터 생성</strong></Col>
            </div>
            <div className="text_wrap carousel_text w-100">
              <Col>WEHAGO 데이터유통포털의 다양한 데이터를 활용하여 <br /> 새로운 가치를 만들어 보세요.</Col>
            </div>
            <div className="text_wrap carousel_ellipse ellipse">
              <Col>
                <div className="elipse_wrap w-100">
                  <div className="wise_wrap carousel_icon">
                    <img className="wise" src={Wise_img} alt='wise_icon' />
                    <p className="wise_text">WISE</p>
                  </div>
                  <div className="wide_wrap carousel_icon">
                    <img className="wide" src={Wide_img} alt='wide_icon' />
                    <p className="wide_text">WIDE</p>
                  </div>
                  <p className="carousel_ellipse_text">
                    데이터 분석 도구를 활용하여 누구나 손쉽게 <br /> 새로운 데이터 및 모델을 생성할 수 있는 환경을 제공합니다.
              </p>
                </div>
              </Col>
            </div>
          </Row>
          <DataCenterButton />
        </div>
      </Container>
    </React.Fragment>
  )
}

export default First_MainText;
