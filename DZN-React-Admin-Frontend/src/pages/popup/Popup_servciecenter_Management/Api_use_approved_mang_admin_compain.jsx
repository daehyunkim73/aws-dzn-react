import React, { useCallback, useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import close_btn from "../../../../image/Center/Close_btn/close_btn.png";
import axios from 'axios'
import { Server_ajax_post } from "../../../../Server_ajax";

const Api_use_approved_mang_popup = (props) => {
  const { Ack_Companion_data, Ack_not_Companion_data_func, Checked_all, Data_end_func } = props //api 정보
  const compaion_explan = useRef(); //사유 이유 text
  const [fl_form, setFl_form] = useState([]); //이미지 데이터

  const compation_change = useCallback((e) => {
    setFl_form([]);
    const fi_data = new FormData();
    fi_data.append('admin_image', e.target.files[0]);

    axios.post('https://api.wehago.com/service_center_managment/svc_use_api_form_data_res', fi_data)
      .then((result) => {
        setFl_form(fl_form => [...fl_form, result.data]);
      })
  }, [fl_form]);

  const compaion_fl_remove = useCallback((api_remove_info) => () => {
    setFl_form(fl_form.splice(fl_form.splice(fl_form.indexOf(api_remove_info), 1)))
  }, [fl_form]);

  const Image_close_popup = useCallback(() => {
    const Admin_user_api_approved_mangUse_popup_bgk = document.getElementById(
      "Admin_user_api_approved_mangUse_popup_bgk"
    );
    Admin_user_api_approved_mangUse_popup_bgk.style.display = "none";
  }, []);

  const Compation_pop_req = async () => {
    let fl_data = null;

    fl_form.map((item) => {
      return fl_data = item.path
    })

    let body = {
      fl_req_data: fl_data,
      companion_text: `<p>${compaion_explan.current.value.replace(/(\n|\r\n)/g, '<br>')}</p>`,
      api_info: Ack_Companion_data,
      api_compaion_stat: 2
    }

    try {
      await Server_ajax_post('service_center_managment/svc_use_api_compation_fl_res', body);
      const Admin_user_api_approved_mangUse_popup_bgk = document.getElementById(
        "Admin_user_api_approved_mangUse_popup_bgk"
      );
      Admin_user_api_approved_mangUse_popup_bgk.style.display = "none";
      Ack_not_Companion_data_func([]);
      setFl_form([]);
      compaion_explan.current.value = "";
      Checked_all.filter((c) => {
        return c !== null
      }).map((result) => {
        result.checked = false;
      })

      let mbrList = [];
      Ack_Companion_data.map(data => {
          const {mbr_id} = data;
          mbrList = mbrList.concat(mbr_id);
      })        
      mbrList = [...new Set(mbrList)];
      
      const alamParam = {
          id: mbrList,      // 알림을 보낼 사용자계정 ID
          definitionCode: 3,   // 알림 수신 case 정의 코드
          contentCode: 3,      // 알림 내용 코드
          etc: ''              // 추가 내용 ( 예. 000 서비스가 결제되었습니다. 중 000에 들어갈 문구) 
        }                
      await Server_ajax_post(`admin_settings/alarm_regist`, alamParam);
                
      Data_end_func(false);
    } catch (e) {
      return console.error(e);
    }
  }

  return (
    <React.Fragment>
      <div
        className="admin_background_same_box"
        id="Admin_user_api_approved_mangUse_popup_bgk"
      >
        <div className="admin_pixed_popup_white_box">
          <div
            className="admin_service_center_middel_white_box"
            id="sp_middle_box"
          >
            <div className="admin_popup_head_line_box">
              <h1>API 사용 승인관리</h1>
              <div className="admin_popupClose_box">
                <img onClick={Image_close_popup} src={close_btn} alt="" />
              </div>
            </div>

            <div className="admin_big_contents_box">
              <div
                className="admin_popup_Contents_box"
                id="admin_api_Use_sp_box"
              >
                <Table responsive className="admin_api_contents_table_box">
                  <thead>
                    <tr>
                      <th>신청 API</th>
                      <th>과금</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      Ack_Companion_data.map((item, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{item.wehago_api_name}</td>
                            <td>{item.free_gbn === "1" ? "유료" : "무료"}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </div>

              <div className="admin_approved_admin_result_popup_section_box">
                <div className="api_Use_approved_text_box">
                  <textarea
                    className="api_Use_approved_textarea"
                    placeholder="반려 사유 입력"
                    ref={compaion_explan}
                  ></textarea>
                  <div className="admin_file_sp_wrap">
                    <input type="file" id="file_check"
                      onChange={compation_change}
                    />
                    <label className="file_btn" htmlFor="file_check">
                      파일선택
                    </label>
                    <span className="admin_file_name">
                      {
                        fl_form.map((item, index) => {
                          return (
                            <div key={index} style={{ display: "inline-block" }}>
                              <b >{item.filename}</b>
                              <img src={close_btn} onClick={compaion_fl_remove(item)} alt="" />
                            </div>
                          )
                        })
                      }
                    </span>
                    <p className="admin_answer_text">
                      반려될 경우 심사한 내용을 첨부하실 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="admin_popup_button_box">
                <button
                  className="admin_popup_first_btn"
                  onClick={Image_close_popup}
                >
                  취소
                </button>
                <button
                  className="admin_popup_second_btn"
                  id="api_use_approved_post"
                  onClick={Compation_pop_req}
                >
                  반려하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Api_use_approved_mang_popup;
