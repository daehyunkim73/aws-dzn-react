import React from 'react';
import { Button, Form } from 'react-bootstrap';


const Service_basic_info = () => {
  return (
    <React.Fragment>
      <div className="service_basic_info">
        <div className="exposure_info_title_wrap">
          <p>기본정보</p>
          <span className="exposure_text">
            ※ 필수 입력 정보입니다.
          </span>
        </div>
        <div className="exposure_info_input_wrap">

          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">서비스 제목 <span>*</span></div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control type="text" className="form_input" defaultValue="세금아 안녕" />
              <Button>중복확인</Button>
              <p>※ 서비스명 글자수는 2~8자이며, 최대 30자까지 등록 가능합니다.</p>
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">서비스 URL <span>*</span></div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control type="text" className="form_input" />
              <Button>중복확인</Button>
              <p>※ 서비스하기 위한 URL을 입력해주세요. (프로토콜, 포트의 지정이 필요한 경우 함께 입력해야합니다.</p>
              <p>※ URL 등록 시 https:// 로 입력하셔야 원활한 동작이 가능합니다. 예)https://www.wehago/#/communication</p>
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">URl <span>*</span></div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control type="text" className="form_input" />
              <p>※ 서비스되는 실제 URL을 입력하세요. URL은 반드시 https:// 형태여야 합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Service_basic_info;
