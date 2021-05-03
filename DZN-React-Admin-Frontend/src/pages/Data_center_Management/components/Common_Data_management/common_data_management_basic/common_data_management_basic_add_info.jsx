import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Server_ajax_post } from "../../../../../../Server_ajax";
import Info_modify_popup from "../../../../popup/Popup_datacenter_Management/Data_Info_modify_popup";

const Data_Approved_management_basic_add_info = ({ defaultData }) => {

  const {
      endPointUrl, endPointDesc,
      deployPeroid, deployPeroid_desc,
      space_resolution, time_resolution,
      space_info, time_info
    } = defaultData;
  
  const [deployCycleList, setDeployCycleList] = useState([]);  
  const [deploySelect, setDeploySelect] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const getDeployPeroid = await Server_ajax_post(`data_center_managment/getDeployPeroid`, {});
        if(getDeployPeroid.length > 0){
          setDeployCycleList(getDeployPeroid);   
          setLoading(true);
    
          if(deployPeroid_desc === '') {
            setDeploySelect(deployPeroid);
          }
        }          
      } catch (e) {
          return console.error(e);
      }
    }
    getData();
  }, [])

  return (
    <React.Fragment>
      <Info_modify_popup />
      <div className="exposure_info_wrap">
        <div className="exposure_info_title_wrap">
          <p>추가정보</p>
        </div>
        <div className="exposure_info_input_wrap">
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">엔드포인트URL</div>
            <div className="exposure_info_input_right_wrap">
              <div className="sp_endpoint_box_url">
                <p>https://developers.wehago.com/</p>
                <Form.Control
                  type="text"
                  className="form_input"
                  placeholder="API 호출 URL은 제공 뒷부분에 호출되는 정보입니다."
                  value={endPointUrl}
                  readOnly
                />
                <Button>증복확인</Button>
              </div>
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">엔드포인트 설명</div>
            <div className="exposure_info_input_right_wrap">
              <Form.Control
                as="textarea"
                rows="5"
                placeholder="API 호출과 관련한 부가 설명을 작성하세요."
                value={endPointDesc}
                readOnly
              />
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">배포주기</div>
            <div className="exposure_info_input_right_wrap">
              <div className="sp_select_input_box">
                <Form.Control as="select" value={deploySelect} disabled>
                  <option value=''>배포주기 선택</option>
                  {loading && deployCycleList.map((list) => 
                    <option key={list.sub_cate_code} value={list.sub_cate_code}>{list.sub_cate_name}</option>
                  )}
                </Form.Control>
                <div className="checkbox_wrap" id="sp_add_import_check">
                  <input type="checkbox" id="delete_center_check_3" checked={deployPeroid_desc !== ''} disabled />
                  <label
                    className="checkbox_design"
                    htmlFor="delete_center_check_3"
                  >
                    직접 입력
                  </label>
                </div>
                <Form.Control type="text" className="form_input" value={deployPeroid_desc} readOnly/>
              </div>
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">공간해상도</div>
            <div className="exposure_info_input_right_wrap">
              <div className="same_sp_input_box">
                <Form.Control
                  type="text"
                  className="form_input"
                  placeholder="공간정보가 있는 경우 작성하세요."
                  value={space_resolution}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">시간해상도</div>
            <div className="exposure_info_input_right_wrap">
              <div className="same_sp_input_box">
                <Form.Control
                  type="text"
                  className="form_input"
                  placeholder="예: PnYnMnDTnHnsMnS 형식으로 PT130S면 130초"
                  value={time_resolution}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">공간정보</div>
            <div className="exposure_info_input_right_wrap">
              <div className="same_sp_input_box">
                <Form.Control
                  type="text"
                  className="form_input"
                  placeholder="자유양식으로 위경도 정도 작성하세요."
                  value={space_info}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">시간정보</div>
            <div className="exposure_info_input_right_wrap">
              <div className="same_sp_input_box">
                <Form.Control
                  type="text"
                  className="form_input"
                  placeholder="예: start YYY-MM-DD, end YYY-MM-DD"
                  value={time_info}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>      
    </React.Fragment>
  );
};

export default Data_Approved_management_basic_add_info;
