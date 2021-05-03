import React, { useState, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Sales_Service_management_judge_table from "./Sales_Service_management_judge_table";
import Approved_req_contents_popup from "../../../../popup/Popup_datacenter_Management/Approved_req_contents_popup";
import close_btn from "../../../../../../image/Center/Close_btn/close_btn.png";
import { Link } from "react-router-dom";
import Judge_result_popup from "../../../../popup/Popup_servciecenter_Management/Judge_result_propup_serviceCenter";
import { useServiceSalesContext } from "../../../Sales_Service_management";
import { useEffect } from "react";
const Sales_Service_management_judge = () => {
  const [JudegeRes, setJudegeRes] = useState("");
  const [upload_file, setUpload_file] = useState("");
  const [upload_file_name, setUpload_file_name] = useState("");
  const [fileLogic, setFileLogic] = useState(false);
  const [deleteLogic, setDeleteLogic] = useState(false);
  const [memo_req, setMemo_req] = useState("");
  const { dataSave } = useServiceSalesContext();

  const Data_appproved_mang_Click = () => {
    if (dataSave[0].stat !== 2) {
      if (dataSave[0].judge_stat !== 1) {
        alert("승인요청이 존재하지 않습니다.");
      } else if (JudegeRes === "") {
        alert("승인상태를 선택해주세요");
      } else if (JudegeRes === 2 && memo_req === "") {
        alert("반려사유를 입력해주세요");
      } else {
        const Admin_user_servicecenter_judge_popup_bgk = document.getElementById(
          "Admin_user_servicecenter_judge_popup_bgk"
        );
        Admin_user_servicecenter_judge_popup_bgk.style.display = "table";
      }
    } else {
      if (JudegeRes === "") {
        alert("승인상태를 선택해주세요");
      } else if (JudegeRes === 2 && memo_req === "") {
        alert("반려사유를 입력해주세요");
      } else {
        const Admin_user_servicecenter_judge_popup_bgk = document.getElementById(
          "Admin_user_servicecenter_judge_popup_bgk"
        );
        Admin_user_servicecenter_judge_popup_bgk.style.display = "table";
      }
    }
  };
  const changeRadioValue = (e) => {
    if (e.target.value === "apprv") {
      setJudegeRes(1);
    } else {
      setJudegeRes(2);
    }
  };
  const text = (e) => {
    setMemo_req(e.target.value);
  };
  const input_file_names = useCallback((e) => {
    if (upload_file_name !== "") {
      alert("파일첨부는 1개까지 업로드가 가능합니다.");
    } else {
      setUpload_file(e.target.files[0]);
      setUpload_file_name(e.target.files[0].name);
      setFileLogic(true);
    }
  });
  const deletefile = useCallback(() => {
    setUpload_file([]);
    setUpload_file_name("");
    setDeleteLogic(true);
    setFileLogic(false);
  });
  return (
    <React.Fragment>
      <Judge_result_popup
        upload_file={upload_file}
        upload_file_name={upload_file_name}
        JudegeRes={JudegeRes}
        memo_req={memo_req}
      />
      {/* <Approved_req_contents_popup /> */}
      {/* 데이터 센터의 기본정보에 기본정보, 판매정보의 필수 항목을 모두 입력하여야 승인심사로 이동 */}
      <div className="judge_table_top">
        <div className="exposure_info_title_wrap">
          <p>승인심사 검증 보고서</p>
        </div>
        <div className="judge_table Data_Approved_management_judge">
          <p>
            * 반려될 경우 코멘트를 작성하시고 해당 내용에 대한 파일을 첨부하여
            보낼 수 있습니다.
          </p>
          <div className="radio_inputButton_box">
            <input
              type="radio"
              id="back_radio_one"
              name="User_info_table_radio"
              value={"apprv"}
              onChange={changeRadioValue}
            />
            <label htmlFor="back_radio_one">승인(합격)</label>
          </div>
          <div className="radio_inputButton_box">
            <input
              type="radio"
              id="back_radio_two"
              name="User_info_table_radio"
              value={"deny"}
              onChange={changeRadioValue}
            />
            <label htmlFor="back_radio_two">반려(불합격)</label>
          </div>
          <Form.Control
            placeholder="반려 될 경우 회원에게 전달될 코멘트를 작성하세요."
            as="textarea"
            rows="5"
            onChange={text}
          />
          <div className="backoffice_file_wrap">
            <div className="file_wrap">
              <input type="file" id="file_check" onChange={input_file_names} />
              <label className="file_btn" htmlFor="file_check">
                파일선택
              </label>
            </div>
            <div className="backoffice_file_name">
              <p>{upload_file_name}</p>
              {(deleteLogic === true || fileLogic === true) &&
              upload_file_name !== "" ? (
                <img src={close_btn} onClick={deletefile} alt="close" />
              ) : (
                <></>
              )}
            </div>
          </div>
          <p className="red">
            ※ 기타 심사에 필요한 사항이 있을 경우 파일을 첨부해주세요.
          </p>
        </div>
        <div className="judge_table_top_btn judge_table_btn">
          <button onClick={Data_appproved_mang_Click}>심사결과서 제출</button>
        </div>
      </div>
      <div className="judge_table_bottom">
        <Sales_Service_management_judge_table />
        <div className="judge_table_bottom_btn judge_table_btn">
          <Link to="/admin/salesvc">
            <button>목록</button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sales_Service_management_judge;
