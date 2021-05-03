import React, { useState, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import close_btn from "../../../../../../image/Center/Close_btn/close_btn.png";
import { Server_ajax_post } from "../../../../../../Server_ajax";
import Judget_result_popup from "../../../../popup/Popup_datacenter_Management/Judge_result_popup";
import { useCookies } from "react-cookie";

const Data_Approved_management_judge = ({pdbaseIdx, setRending, setState, mbr_id}) => {  
  const [apprvl, setApprvl] = useState('');
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState({});
  const [confrim, setConfirm] = useState(false);
  const [adminMemo, setAdminMemo] = useState('');
  const [dataPpprvlreqIdx, setDataPpprvlreqIdx] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies();

  // 승인 타입 클릭 이벤트
  const apprvlCahnge = (e) => {
    const apprvlValue = e.target.value
    setApprvl(apprvlValue);

    if(apprvlValue === 'accept'){
      setAdminMemo('');
    }
  }

  // 파일 선택 시 이벤트
  const inputFileChange = (e) => {       
    setFilePath(e.target.files[0]);        
    setFileName(e.target.files[0].name);
  }

  // 파일 삭제 이벤트
  const deleteFileClick = (e) => {
    setFilePath({});
    setFileName('');
  }

  // 반려 메세지 변경 이벤트
  const adminMemoChange = (e) => {
    setAdminMemo(e.target.value);
  }

  // 심사 중인 데이터 가져오기 (1건만 존재)
  useEffect(() => {
    const datas = {
      pdbase_idx: pdbaseIdx
    }

    const getData = async () => {
      try {
          const getApprovedingData = await Server_ajax_post(`data_center_managment/getApprovedingData`, {datas});
        
          if(getApprovedingData && getApprovedingData.length > 0){
            const {data_apprvlreq_idx} = getApprovedingData[0];
            setDataPpprvlreqIdx(data_apprvlreq_idx);
          }          
      } catch (e) {
          return console.error(e);
      }
    }
    getData();
  }, [])

  // 알람 메세지 등록
  const alamReg = useCallback(async (apprvState) => {    
    const alamParam = {
      id: mbr_id,      
      etc: ''
    }                
  // 승인일 때 
    if(apprvState) {
      alamParam.definitionCode = 2;
      alamParam.contentCode = 1;
    }
    // 반려일 때
    else {
      alamParam.definitionCode = 3;
      alamParam.contentCode = 1;
    }
    await Server_ajax_post(`admin_settings/alarm_regist`, alamParam);
  },[]);


  // 심사 중인 데이터 심사 처리
  useEffect(() => {
    if(confrim) {      
      let datas = {
        dataPpprvlreqIdx: dataPpprvlreqIdx,
        pdbaseIdx,
        adminMbrId: cookies.h_portal_id,
        apprvlState: apprvl === "accept" ? '3' : '4',
        adminMemo: adminMemo.replace(/\n/g, '<br />')        
      }
      
      const setData = async () => {
        try {
          if(fileName){
            const formData = new FormData();                                   
            formData.append('file_data', filePath);
            
            const getApprovedingData = await Server_ajax_post(`data_center_managment/setApprovedInfo_imgUpload`, formData);
  
            if(getApprovedingData){
              datas = {...datas, filePath: getApprovedingData.path};              
              const getApprovedingData = await Server_ajax_post(`data_center_managment/setApprovedingUpdate`, {datas});

              if(getApprovedingData.affectedRows > 0){
                console.log('승인/반려 처리가 되었습니다.(이미지첨부)');
                await alamReg(apprvl === "accept");
                setState(apprvl === "accept" ? '3' : '4');                
                setRending(true);
              }
            }
          } else {                        
            const getApprovedingData = await Server_ajax_post(`data_center_managment/setApprovedingUpdate`, {datas});

            if(getApprovedingData.affectedRows > 0){
              console.log('승인/반려 처리가 되었습니다.');
              await alamReg(apprvl === "accept");
              setState(apprvl === "accept" ? '3' : '4');              
              setRending(true);
            }
          }
          
          alert('심사결과서 제출 처리가 완료 되었습니다.');
          window.scrollTo(0, 0);
        } catch (e) {
            return console.error(e);
        }
      }
      setData();
    }    
    
    setConfirm(false);
  }, [confrim === true])

  // 심사결과서 제출 클릭시 노출
  const Data_appproved_mang_Click = () => {
    if(apprvl === '') {
      alert(`'승인/반려'를 선택 후 심사결과서 제출해주시기 바랍니다.`);
      return;
    }
    
    if(apprvl === 'reject' && adminMemo === ''){
      alert(`'반려'인 경우 반려 사유를 작성해야 합니다.`);
      return;
    }

    const Admin_user_datacenter_approved_popup_bgk = document.getElementById(
      "Admin_user_datacenter_judge_popup_bgk"
    );
    Admin_user_datacenter_approved_popup_bgk.style.display = "table";
  };

  return (
    <React.Fragment>
      <Judget_result_popup setConfirm={setConfirm} />
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
              value="accept"
              checked={apprvl==="accept"}
              onChange={apprvlCahnge}   
            />
            <label htmlFor="back_radio_one">승인(합격)</label>
          </div>
          <div className="radio_inputButton_box">
            <input
              type="radio"
              id="back_radio_two"
              name="User_info_table_radio"
              value="reject"
              checked={apprvl==="reject"}
              onChange={apprvlCahnge}
            />
            <label htmlFor="back_radio_two">반려(불합격)</label>
          </div>
          <Form.Control
            placeholder="반려 될 경우 회원에게 전달될 코멘트를 작성하세요."
            as="textarea"
            rows="5"
            value={adminMemo}
            onChange={adminMemoChange}
            disabled={apprvl==="accept"}
          />
          <div className="backoffice_file_wrap">
            <div className="file_wrap">
              <input type="file" id="file_check" name="file_check" onChange={inputFileChange} />
              <label className="file_btn" htmlFor="file_check">파일선택</label>
              </div>
            <div className="backoffice_file_name">
              <p>{fileName}</p>
              <img src={close_btn} alt="close" onClick={deleteFileClick}/>
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
    </React.Fragment>
  );
};

export default Data_Approved_management_judge;
