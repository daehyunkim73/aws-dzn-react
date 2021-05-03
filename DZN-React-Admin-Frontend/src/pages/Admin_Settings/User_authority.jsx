import React, { useEffect, useState, useCallback } from "react";
import Table from "react-bootstrap/Table";
import Table_middle from "../../../func_src/Table_middle";
import Admin_access_setting_popup from "../popup/Popup_access_setting/Admin_access_setting_popup";
import Admin_sign_add_popup from "../popup/Popup_access_setting/Admin_sign_add_popup";
import Admin_access_modify_popup from "../popup/Popup_access_setting/Admin_access_Modify_popup";
import { Server_ajax_post } from "../../../Server_ajax";



function Access_delete_popup() {
  const access_delete_Click = document.querySelectorAll(
    ".user_authority_wrap .backoffice_table_wrap .table .delete_Click_admin"
  );
  const access_modify_Click = document.querySelectorAll(
    ".user_authority_wrap .backoffice_table_wrap .table .modify_Click_admin"
  );
  const Admin_user_access_setting_popup_bgk = document.getElementById(
    "Admin_user_access_setting_popup_bgk"
  );
  const Admin_User_access_modify_popup_bgk = document.getElementById(
    "Admin_user_access_sign_modify_popup_bgk"
  );

  for (let i = 0; i < access_delete_Click.length; i++) {
    access_delete_Click[i].addEventListener("click", () => {
      Admin_user_access_setting_popup_bgk.style.display = "table";
    });

    access_modify_Click[i].addEventListener("click", () => {
      Admin_User_access_modify_popup_bgk.style.display = "table";
    });
  }

  return {
    access_delete_Click: access_delete_Click,
    Admin_user_access_setting_popup_bgk: Admin_user_access_setting_popup_bgk,
  };
}

const User_authority = () => {
  const [curr_adm_grant_idx, setCurr_adm_grant_idx] = useState('');
  const [popupGbn, setPopupGbn] = useState('');


  useEffect(() => {
    window.scrollTo(0, 0);
    Table_middle();
    Access_delete_popup();
    return () => {
      Table_middle();
      Access_delete_popup();
    };
  }, []);

  const Admin_sign_upgrade_add_Click = () => {
    setPopupGbn('A');
  };

  
  const [usrGrantList, setUsrGrantList] = useState([]);
  const [loadStatus, setLoadStatus] = useState(false);
  const [reRenderStatus, setReRenderStatus] = useState(false);
  
  useEffect(() => {
    const getMbrGrant = async () => {
      try{
        const datas = {
        };
        const usrGrantList_Data = await Server_ajax_post("admin_Settings/getUsrGrantList", {datas});
        console.log('usrGrantList_Data', usrGrantList_Data);
        setUsrGrantList(usrGrantList => usrGrantList_Data);
        setLoadStatus(true);
      }
      catch(e){
        console.log('error',e);
      }
      finally{
        setLoadStatus(false);
        setReRenderStatus(false);
      }
    }
    getMbrGrant();
  },[reRenderStatus === true])

  
  useEffect(() => {
    if(popupGbn === 'A'){
      const Admin_user_access_sign_add_popup_bgk = document.getElementById("Admin_user_access_sign_add_popup_bgk");
      Admin_user_access_sign_add_popup_bgk.style.display = "table";
    }
    else if(popupGbn === 'R'){
      const Admin_user_access_setting_popup_bgk = document.getElementById("Admin_user_access_setting_popup_bgk");
      Admin_user_access_setting_popup_bgk.style.display = "table";
    }
    else if(popupGbn === 'E'){
      const Admin_User_access_modify_popup_bgk = document.getElementById("Admin_user_access_sign_modify_popup_bgk");
      Admin_User_access_modify_popup_bgk.style.display = "table";
    }
  },[popupGbn])


  const handleEdit_Grant = (e) => {
    console.log('handleEdit_Grant',e.target.value);
    setPopupGbn('E');
    setCurr_adm_grant_idx(e.target.value);
  };


  const handleRemove_Grant = (e) => {
    console.log('handleRemove_Grant',e.target.value);
    setPopupGbn('R');
    setCurr_adm_grant_idx(e.target.value);
  }


  useEffect(() => {
    console.log('popupGbn', popupGbn);

  },[popupGbn])


  return (
    <React.Fragment>
      
      {popupGbn === 'R' && <Admin_access_setting_popup popupGbn={popupGbn} setPopupGbn={setPopupGbn} curr_adm_grant_idx={curr_adm_grant_idx} setReRenderStatus={setReRenderStatus}/> }
      {popupGbn === 'A' && <Admin_sign_add_popup popupGbn={popupGbn} setPopupGbn={setPopupGbn} setReRenderStatus={setReRenderStatus}/> }
      {popupGbn === 'E' && <Admin_access_modify_popup popupGbn={popupGbn} setPopupGbn={setPopupGbn} curr_adm_grant_idx={curr_adm_grant_idx} setReRenderStatus={setReRenderStatus}/> }

      <div className="user_authority_wrap">
        <div className="Page_same_text clearfix">
          <p className="backoffice_title">회원권한설정</p>
        </div>
        <div className="backoffice_table_wrap user_authority_table_wrap">
          <Table responsive>
            <caption className="tb_caption">
              <div className="tb_select_wrap">
                <button onClick={Admin_sign_upgrade_add_Click}>
                  관리자 회원등급 추가
                </button>
              </div>
            </caption>
            <thead>
              <tr>
                <th>관리자 권한 명칭</th>
                <th>등급설명</th>
                <th>수정/삭제</th>
              </tr>
            </thead>
            <tbody>
              
              {
                Object.values(usrGrantList).map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <span>{item.adm_grant_name}</span>
                      </td>
                      <td className="table_title">{item.grant_desc}</td>
                      <td>
                        <button className="table_view_btn modify_Click_admin" value={item.adm_grant_idx} onClick={handleEdit_Grant}>
                          수정
                        </button>
                        <button className="table_view_btn delete_Click_admin" value={item.adm_grant_idx} onClick={handleRemove_Grant}>
                          삭제
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default User_authority;
