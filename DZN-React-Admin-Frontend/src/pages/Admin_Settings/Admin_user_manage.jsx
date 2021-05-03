import React, { useEffect, useState, useCallback, useRef, useContext, createContext } from "react";
import Table from "react-bootstrap/Table";
import Table_middle from "../../../func_src/Table_middle";
import Pagination from "../../Big_component/Pagination";
import Admin_access_authority_mdify_popup from "../popup/Popup_access_setting/Admin_authority_modify_popup";
import Ajax from "../../../lib/ajax-3rd-custom";
import globals from "../../../lib/globals";
import moment from 'moment';
import * as CryptoJS from 'crypto-js';
import { Server_ajax_post, Server_ajax_get } from "../../../Server_ajax";


function Admin_authority_modify_ff() {
  const authority_modify_btn = document.querySelectorAll(
    ".admin_user_manage_table_wrap .table .table_view_btn"
  );
  const Admin_user_access_authority_modify_popup_bgk = document.getElementById(
    "Admin_user_access_authority_modify_popup_bgk"
  );

  for (let i = 0; i < authority_modify_btn.length; i++) {
    authority_modify_btn[i].addEventListener("click", () => {
      Admin_user_access_authority_modify_popup_bgk.style.display = "table";
    });
  }

  return {
    authority_modify_btn: authority_modify_btn,
    Admin_user_access_authority_modify_popup_bgk: Admin_user_access_authority_modify_popup_bgk,
  };
}

const Admin_user_manage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    Admin_authority_modify_ff();
    Table_middle();
    return () => {
      Admin_authority_modify_ff();
      Table_middle();
    };
  }, []);

  
  const [grantUsrDescList, setGrantUsrDescList] = useState([]);
  const [loadStatus, setLoadStatus] = useState(false);
  const [renderStatus, setRenderStatus] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [contentNumPerPage, setContentNumPerPage] = useState(2);
  const [mbrIdxNoCmpNo, setMbrIdxNoCmpNo] = useState('');


  console.log('moment(new Date()).format(YYYYMMDDhhmmss)', moment(new Date()).format('YYYYMMDDhhmmss'));

  

  useEffect(() => {
    const get_certUsrList = async () => {
      try{
          //Ajax.getToken({service_code: "backoffice"}, function (result){});
          new Promise( async (res, rej) => {

            const datas = {
            };
            const aesEncryptCode = await  Server_ajax_post("user_management/get_aes_encrypto", {datas});
            console.log('aesEncryptCode',aesEncryptCode.result);
  
            let tmpArr = [];
            const grantUsrList_data = await Server_ajax_post("user_management/get_grantUsrList", {datas});
            console.log('grantUsrList_data', grantUsrList_data);
            
            
            await grantUsrList_data.map(async (item, index) => {          
              const ajax_host = await Ajax.get(`${globals.certApiUrl}/common/user/backoffice/info?companyNo=${item.comp_no}&user_no=${item.mbr_no}&service_code=backoffice&security_key=${aesEncryptCode.result}`);
              const usrDescInfo = JSON.parse(ajax_host);

              //if(usrDescInfo.resultData !== null){
                tmpArr = tmpArr.concat({
                  mbrIdx: item.mbr_idx,
                  mbrNo: item.mbr_no,
                  comp_no: item.comp_no,
                  mbrType: usrDescInfo.resultData !== null ? usrDescInfo.resultData.member_type : '',
                  mbrName: usrDescInfo.resultData !== null ? usrDescInfo.resultData.user_name : '',
                  id: usrDescInfo.resultData !== null ? usrDescInfo.resultData.portal_id : '',
                  hp: usrDescInfo.resultData !== null ? usrDescInfo.resultData.user_contact : '',
                  joinDt: usrDescInfo.resultData !== null ? usrDescInfo.resultData.join_date : '',
                  currLogDt: usrDescInfo.resultData !== null ? usrDescInfo.resultData.last_access_date : '',
                  adm_grant_idx: item.adm_grant_idx, 
                  adm_grant_name: item.adm_grant_name, 
                  grant_desc: item.grant_desc, 
                  adm_grant_value: item.adm_grant_value
                })
              //}
              
              Number(grantUsrList_data.length) === Number(tmpArr.length) && 
              res(tmpArr);
            })
          })
          .then((result) => {
            if(result.length > 0){
              setLoadStatus(true);
              setGrantUsrDescList(result);
            }
          });
      }
      catch(e){
        console.log('error',e);
      }
      setRenderStatus(false); 
    }
    get_certUsrList();
  },
  [
    renderStatus === true,
    currPage,
  ])



  const GrandthandelClick = (e) => {
    console.log('GrandthandelClick', e.target.value);
    setMbrIdxNoCmpNo(e.target.value);

    const Admin_user_access_authority_modify_popup_bgk = document.getElementById("Admin_user_access_authority_modify_popup_bgk");
    Admin_user_access_authority_modify_popup_bgk.style.display = "table";
  }



  return (
    <React.Fragment>
      <Admin_access_authority_mdify_popup setRenderStatus_main={setRenderStatus} mbrIdxNoCmpNo={mbrIdxNoCmpNo}/>
      <div className="admin_user_manage_wrap">
        <div className="Page_same_text clearfix">
          <p className="backoffice_title">관리자 회원관리</p>
        </div>
        <div className="backoffice_table_wrap admin_user_manage_table_wrap">
          <Table responsive>
            <caption className="tb_caption clearfix">
              <p className="caption_title bold_none">
                [총 <span className="number_data">00</span>건 ]
              </p>
              <p className="caution_txt">
                &#8251; 관리자 권한 삭제는 회원정보화면에서 설정 변경
              </p>
            </caption>
            <thead>
              <tr>
                <th>NO</th>
                <th>회원명/아이디</th>
                <th>가입일</th>
                <th>최근접속일</th>
                <th>관리자 권한 명칭</th>
                <th>관리자 권한</th>
              </tr>
            </thead>
            <tbody>
              
            {
              grantUsrDescList.map((item, idx) => {
                let seqNum = ((grantUsrDescList.length - (( currPage -1) * contentNumPerPage)) - idx)
                return (
                    <tr>
                      <td>{seqNum}</td>
                      <td>
                        <span className="table_href">{item.mbrName}/{item.id}</span>
                      </td>
                      <td>{item.joinDt}</td>
                      <td>{item.currLogDt}</td>
                      <td>{item.adm_grant_name}</td>
                      <td>
                        <button className="table_view_btn" value={`${item.mbrIdx}-${item.mbrNo}-${item.comp_no}`} onClick={GrandthandelClick} >수정</button>
                      </td>
                    </tr>
                )
              })
            }

            </tbody>
          </Table>
        </div>
        <Pagination />
      </div>
    </React.Fragment>
  );
};

export default Admin_user_manage;
