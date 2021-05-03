import React, { useCallback, useState } from 'react';
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';
import { useEffect } from 'react';
import { Server_ajax_post } from "../../../../Server_ajax";



const Admin_access_setting_popup = (props) => {
    const {
        curr_adm_grant_idx,
        setReRenderStatus,
        setPopupGbn
    } = props;


    const Image_close_popup = useCallback(() => {
        setPopupGbn('');
        const Admin_user_access_setting_popup_bgk = document.getElementById("Admin_user_access_setting_popup_bgk");
        Admin_user_access_setting_popup_bgk.style.display = "none";
    }, []);


    const [usrAuthDesc, setUsrAuthDesc] = useState({
        adm_grant_idx: '',
        adm_grant_name: '',
        grant_desc: '',
    });
    const [loadStatus_Desc, setLoadStatus_Desc] = useState(false);
    const [reRenderStatus_Desc, setReRenderStatus_Desc] = useState(false);

    useEffect(() => {
        const getUsrAuthDesc = async () => {
            try{
                const datas = {
                    adm_grant_idx: curr_adm_grant_idx,
                };
                const usrAuth_Data = await Server_ajax_post("admin_Settings/getUsrAuthDesc", {datas});
                console.log('usrAuth_Data', usrAuth_Data);
                setUsrAuthDesc({
                    adm_grant_idx: usrAuth_Data[0].adm_grant_idx,
                    adm_grant_name: usrAuth_Data[0].adm_grant_name,
                    grant_desc: usrAuth_Data[0].grant_desc
                });
                setLoadStatus_Desc(true);
              }
              catch(e){
                console.log('error',e);
              }
              finally{
                setLoadStatus_Desc(false);
                setReRenderStatus_Desc(false);
              }
        }
        getUsrAuthDesc();
    },[curr_adm_grant_idx, reRenderStatus_Desc === true])


    useEffect(() => {
        console.log('loadStatus_Desc.adm_grant_name', loadStatus_Desc.adm_grant_name);

    },[loadStatus_Desc])


    const handleDeleteUserGrant  = () => {
        const setUsrAuthDelete = async () => {
            try{
                const datas = {
                    adm_grant_idx: usrAuthDesc.adm_grant_idx,
                };
                const result = await Server_ajax_post("admin_Settings/setUsrAuthDelete", {datas});
                console.log('result', result);
              }
              catch(e){
                console.log('error',e);
              }
              finally{
                setReRenderStatus(true);
              }
        }
        setUsrAuthDelete();
        Image_close_popup();
    }


    return (
        <React.Fragment>
            <div className="admin_background_same_box" id="Admin_user_access_setting_popup_bgk">
                <div className="admin_pixed_popup_white_box">
                    <div className="admin_service_center_middel_white_box">
                        <div className="admin_popup_head_line_box">
                            <h1>관리자 권한 삭제</h1>
                            <div className="admin_popupClose_box">
                                <img onClick={Image_close_popup}
                                    src={close_btn} alt="" />
                            </div>
                        </div>

                        <div className="admin_big_contents_box">
                            <div className="admin_popup_Contents_box" id="admin_access_big_box">
                                <div className="access_settings_headLine_box">
                                    <p>회원 권한 명칭: {usrAuthDesc.adm_grant_name}</p>
                                </div>

                                <div className="admin_access_setting_contents_box">
                                    <p>해당 권한의 관리자로 지정된 관리자는 모두 관리자에서 삭제 됩니다.</p>
                                    <p>삭제하시 겠습니까?</p>
                                </div>
                            </div>

                            <div className="admin_popup_button_box">
                                <button className="admin_popup_first_btn" onClick={Image_close_popup}>취소</button>
                                <button className="admin_popup_second_btn" id="delete_access_settings_delete_btn" onClick={handleDeleteUserGrant}>삭제</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Admin_access_setting_popup; 

