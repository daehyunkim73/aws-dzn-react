import React, { useCallback, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Table_middle from "../../../../func_src/Table_middle";
import close_btn from "../../../../image/Center/Close_btn/close_btn.png";
import { useAdminServiceInfraContext } from "../../Service_center_Management/Infra_approved_management";
import axios from "axios";
import { useRef } from "react";
import { Server_ajax_get, Server_ajax_post } from "../../../../Server_ajax";

const Infra_use_approved_mang_admin = ({
  search_array_list,
  Svc_infra_click,
  Svc_infra_click_logic,
  setSvc_infra_popup_save_logic,

  Svc_infra_file_name,
  setSvc_infra_file_name,
  Svc_infra_file_path,
  setSvc_infra_file_path,
}) => {
  const infraApproved_check = useRef();
  const infraApproved_none_check = useRef();
  const return_memo_ref = useRef();
  const [infraFileLogic, setInfraFileLogic] = useState(false);

  const [arpprovedStat, setArpprovedStat] = useState();

  useEffect(() => {
    Table_middle();
    return () => {
      Table_middle();
    };
  }, []);

  const Image_close_popup = useCallback(() => {
    const Admin_user_infra_approved_mangUse_popup_bgk = document.getElementById(
      "Admin_user_infra_approved_mangUse_popup_bgk"
    );
    Admin_user_infra_approved_mangUse_popup_bgk.style.display = "none";
  }, []);

  const uptInfraInfo_ClickEvt = () => {      
    // arpprovedStat => 0 승인, 1 반려
    if (arpprovedStat !== 0 && arpprovedStat !== 1) {
      alert("승인 또는 반려를 체크해주세요.");
    } else if (arpprovedStat === 1 && !return_memo_ref.current.value) {
      alert("반려 사유를 입력해주세요.");
    } else {
      uptInfraInfo_saveEvt();
    }
  };

  const uptInfraInfo_saveEvt = () => {
    let datas = {
      stat:
        infraApproved_check.current.checked === true
          ? 1
          : infraApproved_none_check.current.checked === true
          ? 2
          : 0,
      return_memo: arpprovedStat === 1 ? return_memo_ref.current.value : null,
      add_file_name: arpprovedStat === 1 ? Svc_infra_file_name : null,
      add_file_path: arpprovedStat === 1 ? Svc_infra_file_path : null,
      pdsvc_idx: search_array_list[Svc_infra_click].pdsvc_idx,
      reqsvcinfra_idx: search_array_list[Svc_infra_click].reqsvcinfra_idx,
    };

    (async function () {
      try {
        await Server_ajax_post(`service_center_managment/uptInfraInfo`, datas);
        setSvc_infra_popup_save_logic(true);
        Image_close_popup();

        const { mbr_id } = search_array_list[Svc_infra_click];
        console.log('mbrId',search_array_list[Svc_infra_click] )
        const definitionCode = arpprovedStat === 0 ? 2 : 3;
        const alamParam = {
          id: mbr_id,      // 알림을 보낼 사용자계정 ID
          definitionCode: definitionCode,   // 알림 수신 case 정의 코드
          contentCode: 4,      // 알림 내용 코드
          etc: ''              // 추가 내용 ( 예. 000 서비스가 결제되었습니다. 중 000에 들어갈 문구) 
        }
        await Server_ajax_post(`admin_settings/alarm_regist`, alamParam);

      } catch (e) {
        return console.error(e);
      }
    })();
  };

  const File_Add_Evt = (e) => {
    const fileName = e.target.files[0].name;

    const Form_data = new FormData();
    Form_data.append("InfraFileFormData", e.target.files[0]);
    (async function () {
      try {
        const infraFileAdd = await Server_ajax_post(
          `service_center_managment/infraFileAdd`
        );
        setSvc_infra_file_name(fileName);
        setSvc_infra_file_path(infraFileAdd);
        setInfraFileLogic(true);
      } catch (e) {
        return console.error(e);
      }
    })();
  };

  const arpprovedStatEvt = (e) => {
    if (e.target.id === "admin_approved_first") {
      setArpprovedStat(0);
    } else {
      setArpprovedStat(1);
    }
  };

  const file_remove_evt = () => {
    setInfraFileLogic(false);
    setSvc_infra_file_name(null);
    setSvc_infra_file_path(null);
  };

  return (
    <React.Fragment>
      <div
        className="admin_background_same_box"
        id="Admin_user_infra_approved_mangUse_popup_bgk"
      >
        <div className="admin_pixed_popup_white_box">
          <div
            className="admin_service_center_middel_white_box"
            id="sp_middle_box"
          >
            <div className="admin_popup_head_line_box">
              <h1>인프라 승인관리</h1>
              <div className="admin_popupClose_box">
                <img onClick={Image_close_popup} src={close_btn} alt="" />
              </div>
            </div>

            <div className="admin_big_contents_box">
              <div
                className="admin_popup_Contents_box"
                id="admin_api_Use_sp_box"
              >
                <Table responsive className="admin_infra_contents_table_box">
                  <caption>
                    <p>
                      이름 / 아이디:
                      <span id="table_api_use_name">
                        {Svc_infra_click_logic === true &&
                          search_array_list[Svc_infra_click].mbr_idx}
                      </span>
                    </p>
                  </caption>
                  <tbody>
                    <tr>
                      <td>서비스 명</td>
                      <td>
                        {Svc_infra_click_logic === true &&
                          search_array_list[Svc_infra_click].svc_title}
                      </td>
                    </tr>
                    <tr>
                      <td>사양</td>
                      <td>
                        {Svc_infra_click_logic === true &&
                        search_array_list[Svc_infra_click].svcinfra_idx === 1
                          ? "CPU: 2 / MEMORY: 2 GB / DISK 20 GB"
                          : Svc_infra_click_logic === true &&
                            search_array_list[Svc_infra_click].svcinfra_idx ===
                              2
                          ? "CPU: 2 / MEMORY: 15 GB / DISK 18 GB"
                          : "CPU: 2 / MEMORY: 32 GB / DISK 32 GB"}
                      </td>
                    </tr>
                    <tr>
                      <td>요금제</td>
                      <td>
                        {Svc_infra_click_logic === true &&
                        search_array_list[Svc_infra_click].svcinfra_idx === 1
                          ? "W_1"
                          : Svc_infra_click_logic === true &&
                            search_array_list[Svc_infra_click].svcinfra_idx ===
                              2
                          ? "W_2"
                          : "W_3"}
                      </td>
                    </tr>
                    <tr>
                      <td>이용 기간</td>
                      <td>
                        {Svc_infra_click_logic === true &&
                          search_array_list[Svc_infra_click].use_period +
                            "개월"}
                      </td>
                    </tr>
                    <tr>
                      <td>결제 금액</td>
                      <td>
                        {" "}
                        {Svc_infra_click_logic === true &&
                          search_array_list[Svc_infra_click].use_period *
                            20000 +
                            "원"}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <div className="admin_approved_admin_result_popup_section_box">
                <div
                  className="admin_radio_inputButton_box"
                  id="admin_radio_box"
                >
                  <input
                    type="radio"
                    id="admin_approved_first"
                    name="payment_sale_approved"
                    ref={infraApproved_check}
                    onChange={arpprovedStatEvt}
                    readOnly
                  />
                  <label htmlFor="admin_approved_first">승인</label>
                  <input
                    type="radio"
                    id="admin_approved_second"
                    name="payment_sale_approved"
                    ref={infraApproved_none_check}
                    onChange={arpprovedStatEvt}
                    readOnly
                  />
                  <label htmlFor="admin_approved_second">반려</label>
                  {/* 반려인 경우 승인 심사 결과 팝업 */}
                </div>
                {arpprovedStat === 1 && (
                  <div className="api_Use_approved_text_box">
                    <textarea
                      className="api_Use_approved_textarea"
                      placeholder="반려 사유 입력"
                      ref={return_memo_ref}
                    ></textarea>
                    <div className="admin_file_sp_wrap">
                      <input
                        type="file"
                        id="file_check"
                        onChange={File_Add_Evt}
                      />
                      <label className="file_btn" htmlFor="file_check">
                        파일선택
                      </label>
                      {infraFileLogic === true && (
                        <span className="admin_file_name">
                          {Svc_infra_file_name}
                          <img
                            src={close_btn}
                            className="close_btn"
                            alt="close"
                            onClick={file_remove_evt}
                          />
                        </span>
                      )}

                      <p className="admin_answer_text">
                        반려될 경우 심사한 내용을 첨부하실 수 있습니다.
                      </p>
                    </div>
                  </div>
                )}
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
                  id="infra_use_approved_post"
                  onClick={uptInfraInfo_ClickEvt}
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Infra_use_approved_mang_admin;
