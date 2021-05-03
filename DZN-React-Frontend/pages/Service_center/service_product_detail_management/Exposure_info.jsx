import React, { useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Exposure_popup from '../../popup/Small_popup/Data_Exposure_popup_v1';
import Exposure_popup_v2 from '../../popup/Small_popup/Data_Exposure_popup_v2';

const Exposure_info = () => {
  const Exposure_Click = useCallback(() => {
    const Data_list_popup_bgk = document.getElementById("Data_Exposure_popup_v1");
    Data_list_popup_bgk.style.display = "table"
  }, []);

  const Not_Exposure_Click = useCallback(() => {
    const Data_list_popup_bgk_V2 = document.getElementById("Data_Exposure_popup_v2");
    Data_list_popup_bgk_V2.style.display = "table"
  })

  return (
    <React.Fragment>
      <Exposure_popup /> {/* 승인완료가 된 경우 판매노출함으로 변경가능 */}
      <Exposure_popup_v2 /> {/* 노출 안함 설정시 판매 중지됨 판매중 재승인의 경우 승인완료시 해당 내용이 적용 됨 */}
      <div className="exposure_info_wrap">
        <div className="exposure_info_title_wrap">
          <p>노출정보</p>
        </div>
        <div className="exposure_info_input_wrap">
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">스토어 노출 설정 <span>*</span></div>
            <div className="exposure_info_input_right_wrap">
              <form>
                <div className="checkbox_radio_wrap">
                  <input onClick={Exposure_Click} type="radio" name="exposure_check" id="Exposure_check" />
                  <label  className="checkbox_design" htmlFor="Exposure_check">노출함</label>
                </div>
                <div className="checkbox_radio_wrap">
                  <input onClick={Not_Exposure_Click} type="radio" name="exposure_check" id="Exposure_not_check" />
                  <label className="checkbox_design" htmlFor="Exposure_not_check">노출안함</label>
                </div>
              </form>
              <p>※ 승인(판매)심사가 완료된 경우, 서비스마켓에 판매 노출 설정이 가능합니다.</p>
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">서비스 간략 설명 <span>*</span></div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control as="textarea" rows="1" placeholder="최대 100자까지 등록 가능합니다." />
              <p>※ 상품명 하단에 한 줄로 노출됩니다.</p>
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">서비스 소개 <span>*</span></div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control as="textarea" rows="3" placeholder="최대 500자까지 등록 가능합니다." />
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">주요기능 <span>*</span></div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control as="textarea" rows="4" placeholder="최대 1,000자까지 등록 가능합니다." />
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">카테고리 설정 <span>*</span></div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control as="select">
                <option>카테고리 선택</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">키워드 설정 <span>*</span></div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control type="text" className="form_input" placeholder="따옴표(,)로 구분 (예 : 기업, 노동, 비용, 단위노동비용지수)" />
              <p>※ 서비스에 대한 핵심 키워드로 서비스를 표시하는 가장 중요한 항목으로 반드시 10개 이상 작성해 주세요.</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Exposure_info;
