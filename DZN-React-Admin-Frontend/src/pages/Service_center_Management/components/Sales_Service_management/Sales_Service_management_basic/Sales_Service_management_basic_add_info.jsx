import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Info_modify_popup_v2 from "../../../../popup/Popup_servciecenter_Management/Info_modify_popup_v2";
import { Link } from "react-router-dom";

const Sales_Service_management_basic_add_info = () => {
  const service_modify_btn_Click = () => {
    const Admin_user_info_modify_v2_popup_bgk = document.getElementById(
      "Admin_user_info_modify_v2_popup_bgk"
    );
    Admin_user_info_modify_v2_popup_bgk.style.display = "table";
  };

  return (
    <React.Fragment>
      <Info_modify_popup_v2 />
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
              />
            </div>
          </div>
          <div className="exposure_info_input_table_wrap">
            <div className="exposure_info_input_left_wrap">배포주기</div>
            <div className="exposure_info_input_right_wrap">
              <div className="sp_select_input_box">
                <Form.Control as="select">
                  <option>배포주기 선택</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
                <div className="checkbox_wrap" id="sp_add_import_check">
                  <input type="checkbox" id="delete_center_check_3" />
                  <label
                    className="checkbox_design"
                    htmlFor="delete_center_check_3"
                  >
                    직접 입력
                  </label>
                </div>
                <Form.Control type="text" className="form_input" />
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="button_s_box" id="sale_make_box_button">
        <Link to="/admin/salesvc">
          <button className="not_search_btn" type="submit">
            목록
          </button>
        </Link>
        <button
          className="search_btn"
          type="submit"
          onClick={service_modify_btn_Click}
        >
          수정
        </button>
        <button className="search_btn" type="submit">
          판매정보 보기 〉
        </button>
      </div>
    </React.Fragment>
  );
};

export default Sales_Service_management_basic_add_info;
