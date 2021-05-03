import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Server_ajax_post } from '../../../../../../Server_ajax';

const Data_Approved_management_basic_add_info_detail = ({ defaultData }) => {
  const {
          regstr_name, regstr_tel, regstr_email, registr_url,
          data_desc,
          data_Lang,
          data_cate, data_Type,
          keywords,
          landingPage,
          license,
          copyright
        } = defaultData
  const [cateList, setCateList] = useState([]);
  const [typeList, setTypeList] = useState([]);  
  const [cateLoading, setCateLoading] = useState(false);
  const [typeLoading, setTypeLoading] = useState(false);
    
  // 카테고리 정보 가져오기
  useEffect(()=> {
    const getListInfo = async () => {
      try {        
        const getCateDataList = await Server_ajax_post(`data_center_managment/getCateDataList`, {});                
        if(getCateDataList.length > 0) {
          setCateList(getCateDataList);
          setCateLoading(true);
        }

        const getTypeDataList = await Server_ajax_post(`data_center_managment/getTypeDataList`, {});        
        if(getTypeDataList.length > 0){
          setTypeList(getTypeDataList);
          setTypeLoading(true);
        }
          
      } catch (e) {
          return console.error(e);
      }
    };
    getListInfo();
  }, [])

  return (
    <React.Fragment>
      <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">데이터 등록자 <span>*</span></div>
            <div className="exposure_info_input_right_wrap">
              <div className="privacy_wrap">
                <Form.Control type="text" className="form_input" placeholder="이름을 입력하세요." value={regstr_name} readOnly />
                <Form.Control type="text" className="form_input privacy_phone_number " placeholder="전화번호를 입력하세요." value={regstr_tel} readOnly />
                <Form.Control type="text" className="form_input privacy_email" placeholder="이메일 입력하세요." value={regstr_email.split('@')[0]} readOnly />
                <div>@</div>
                <Form.Control type="text" className="privacy_email_address" name="email_address" value={regstr_email.split('@')[1]} readOnly />               
              </div>
              <Form.Control type="text" className="form_input" value={registr_url} readOnly />
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">설명 <span>*</span></div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control as="textarea" rows="5" placeholder="데이터에 대한 설명으로 반드시 상세히 작성하셔야 합니다." value={data_desc} readOnly />
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">사용언어</div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control type="text" className="form_input" placeholder="dataset의 사용언어와 동일하게 입력하세요." value={data_Lang} readOnly/>
            </div>
          </div>
          <div className="exposure_info_input_table_wrap table_flex">
            <div className="exposure_info_input_left_wrap">카테고리</div>
            <div className="exposure_info_input_right_wrap exposure_info_input_right_right_wrap ">              
              <Form.Control as="select" value={data_cate} disabled >                   
                {cateLoading && cateList.map( list =>                 
                  <option key={list.sub_cate_code} value={list.sub_cate_code}>{list.sub_cate_name}</option>
                )}
              </Form.Control>
              <div className="type_select">
                <p>유형<span className="red">*</span></p>
                <Form.Control as="select" value={data_Type} disabled>                                      
                  {typeLoading && typeList.map( list => 
                    <option key={list.sub_cate_code} value={list.sub_cate_code}>{list.sub_cate_name}</option>
                  )}
                </Form.Control>
              </div>
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">키워드<span>*</span></div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control type="text" className="form_input" placeholder="따옴표(,)로 구분 (예 : 기업, 노동, 비용, 단위노동비용지수)" value={keywords} readOnly />
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">랜딩 페이지 <span>*</span></div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control type="text" className="form_input" placeholder="https://developers.wehago.com/" value={landingPage} readOnly />
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">라이선스</div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control type="text" className="form_input" placeholder="라이선스 관련 문구, 특별한 양식 없이 자유 서식이며, 법적인 권리 관계를 설명합니다. (예: by CC)" value={license} readOnly/>
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">권한</div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control type="text" className="form_input" placeholder="Copyright를 입력하세요.(예: Copyright 2020. 더존비즈온)" value={copyright} readOnly />
            </div>
          </div>
    </React.Fragment>
  );
}

export default Data_Approved_management_basic_add_info_detail;
