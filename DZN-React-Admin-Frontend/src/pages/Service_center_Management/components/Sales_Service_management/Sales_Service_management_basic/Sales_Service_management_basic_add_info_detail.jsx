import React from 'react';
import Form from 'react-bootstrap/Form';

const Sales_Service_management_basic_add_info_detail = () => {
  return (
    <React.Fragment>
      <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">데이터 등록자 <span>*</span></div>
            <div className="exposure_info_input_right_wrap">
              <div className="privacy_wrap">
                <Form.Control type="text" className="form_input" placeholder="이름을 입력하세요." />
                <Form.Control type="text" className="form_input privacy_phone_number " placeholder="전화번호를 입력하세요." />
                <Form.Control type="text" className="form_input privacy_email" placeholder="이메일 입력하세요." />
                <div>@</div>
                <input list="email_address" className="privacy_email_address" name="email_address" />
                <datalist id="email_address">
                  <option defaultValue="직접입력" />
                  <option defaultValue="naver.com" />
                  <option defaultValue="nate.com" />
                  <option defaultValue="hanmail.net" />
                  <option defaultValue="gmail.com" />
                  <option defaultValue="empal.com" />
                  <option defaultValue="netian.com" />
                  <option defaultValue="dreamwiz.com" />
                  <option defaultValue="hitel.net" />
                </datalist>
              </div>
              <Form.Control type="text" className="form_input" placeholder="홈페이지 주소입력(예:https://" />
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">설명 <span>*</span></div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control as="textarea" rows="5" placeholder="데이터에 대한 설명으로 반드시 상세히 작성하셔야 합니다." />
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">사용언어</div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control type="text" className="form_input" placeholder="dataset의 사용언어와 동일하게 입력하세요." />
            </div>
          </div>
          <div className="exposure_info_input_table_wrap table_flex">
            <div className="exposure_info_input_left_wrap">카테고리</div>
            <div className="exposure_info_input_right_wrap exposure_info_input_right_right_wrap">
              <Form.Control as="select">
                <option>카테고리 선택</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
              <div className="type_select">
                <p>유형<span className="red">*</span></p>
                <Form.Control as="select">
                  <option>유형 선택</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </div>
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">키워드<span>*</span></div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control type="text" className="form_input" placeholder="따옴표(,)로 구분 (예 : 기업, 노동, 비용, 단위노동비용지수)" />
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">랜딩 페이지 <span>*</span></div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control type="text" className="form_input" placeholder="https://developers.wehago.com/" />
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">라이선스</div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control type="text" className="form_input" placeholder="라이선스 관련 문구, 특별한 양식 없이 자유 서식이며, 법적인 권리 관계를 설명합니다. (예: by CC)" />
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">권한</div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control type="text" className="form_input" placeholder="Copyright를 입력하세요.(예: Copyright 2020. 더존비즈온)" />
            </div>
          </div>
    </React.Fragment>
  );
}

export default Sales_Service_management_basic_add_info_detail;
