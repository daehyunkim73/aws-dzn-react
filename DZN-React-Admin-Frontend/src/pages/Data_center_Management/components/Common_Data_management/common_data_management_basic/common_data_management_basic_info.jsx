import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Data_Approved_management_basic_add_info from './common_data_management_basic_add_info';
import Data_Approved_management_basic_add_info_detail from './common_data_management_basic_add_info_detail';
import { Link } from "react-router-dom";


const Data_Approved_management_basic_info = ({ defaultData }) => {
  const { 
          data_title, 
          accss_grant, 
          mangr_name, mangr_tel, mangr_email, 
          creatr_name, creatr_tel, creatr_email, creatr_url 
        } = defaultData;
  const [dataTitle, setDataTitle] = useState('');

  useEffect(() => {    
    setDataTitle(data_title);
  }, [])

  return (
    <React.Fragment>
      <div className="exposure_info_wrap">
        <div className="exposure_info_title_wrap">
          <p>기본정보</p>
          <span className="exposure_text">
            ※ 필수 입력 정보입니다.
        </span>
        </div>
        <div className="exposure_info_input_wrap">

          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">제목 <span>*</span></div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control type="text" className="form_input" placeholder="최대 100자까지 등록 가능합니다." value={dataTitle} readOnly />
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">접근권한</div>
            <div className="exposure_info_input_right_wrap">              
              <Form.Control as="select" defaultValue={accss_grant} disabled >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Commercial">Commercial</option>                
              </Form.Control>
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">담당자 연락처 <span>*</span></div>
            <div className="exposure_info_input_right_wrap">
              <div className="privacy_wrap">
                <Form.Control type="text" className="form_input" placeholder="이름을 입력하세요." value={mangr_name} readOnly />
                <Form.Control type="text" className="form_input privacy_phone_number " placeholder="전화번호를 입력하세요." value={mangr_tel} readOnly />
                <Form.Control type="text" className="form_input privacy_email" placeholder="이메일 입력하세요." value={mangr_email.split('@')[0]} readOnly />
                <div>@</div>
                <Form.Control type="text"  className="privacy_email_address" name="email_address" value={mangr_email.split('@')[1]} readOnly/>                
              </div>

            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">데이터 생성자 <span>*</span></div>
            <div className="exposure_info_input_right_wrap">
              <div className="privacy_wrap">
                <Form.Control type="text" className="form_input" placeholder="이름을 입력하세요." value={creatr_name} readOnly />
                <Form.Control type="text" className="form_input privacy_phone_number " placeholder="전화번호를 입력하세요." value={creatr_tel} readOnly />
                <Form.Control type="text" className="form_input privacy_email" placeholder="이메일 입력하세요." value={creatr_email.split('@')[0]} readOnly />
                <div>@</div>
                <Form.Control type="text"  className="privacy_email_address" name="email_address" value={creatr_email.split('@')[1]} readOnly />                
              </div>
              <Form.Control type="text" className="form_input" value={creatr_url} readOnly/>

            </div>
          </div>
          <Data_Approved_management_basic_add_info_detail defaultData={defaultData}/>
        </div>
        <Data_Approved_management_basic_add_info defaultData={defaultData}/>
        <div className="button_s_box" id="sale_make_box_button">
        <Link to="/admin/dataapproval">
          <button className="not_search_btn" type="submit">
            목록
          </button>
        </Link>
      </div>
      </div>
    </React.Fragment>
  );
}

export default Data_Approved_management_basic_info;
