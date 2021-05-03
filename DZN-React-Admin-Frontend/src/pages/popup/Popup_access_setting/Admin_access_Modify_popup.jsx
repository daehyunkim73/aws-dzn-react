import React, { useCallback, useState, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';
import { useEffect } from 'react';
import { Server_ajax_post } from "../../../../Server_ajax";



const Admin_access_modify_popup = (props) => {
    const {  
        curr_adm_grant_idx, 
        setReRenderStatus,
        setPopupGbn,
        popupGbn
    } = props;

    const auth_checkbx_ref = useRef([]);
    const [usr_grantConf_Upt, setUsr_grantConf_Upt] = useState([]);
    const [usrAuthCodeList, setUsrAuthCodeList] = useState([]);
    const [loadStatus_Code, setLoadStatus_Code] = useState(false);
    const [reRenderStatus_Code, setReRenderStatus_Code] = useState(false);

    useEffect(() => {
        const getUsrAuthCodeList = async () => {
            try{
                const datas = {
                };
                const usrAuthCodeList_Data = await Server_ajax_post("admin_Settings/getUserAuthorityCode", {datas});
                console.log('usrAuthCodeList_Data', usrAuthCodeList_Data);
                setUsrAuthCodeList(usrAuthCodeList => usrAuthCodeList_Data);
                setLoadStatus_Code(true);
              }
              catch(e){
                console.log('error',e);
              }
              finally{
                setLoadStatus_Code(false);
                setReRenderStatus_Code(false);
              }
        }
        getUsrAuthCodeList();
    },[curr_adm_grant_idx || reRenderStatus_Code === true])



    const [usrAuthConf_Adm, setUsrAuthConf_Adm] = useState([]);
    const [adm_grant_name, setAdm_grant_name] = useState('');
    const [grant_desc, setGrant_desc] = useState('');
    const [loadStatus_Conf, setLoadStatus_Conf] = useState(false);
    const [reRenderStatus_Conf, setReRenderStatus_Conf] = useState(false);

    useEffect(() => {
        const getUsrAuthConfData = async() => {
            try{
                const datas = {
                    adm_grant_idx : curr_adm_grant_idx,
                };
                const usrAuthConf_Data = await Server_ajax_post("admin_Settings/getUsrAuthConfData", {datas});
                console.log('usrAuthConf_Data[0].adm_grant_value', usrAuthConf_Data[0].adm_grant_value);
                const usrAuthConf_Adm_Arr = usrAuthConf_Data[0].adm_grant_value.split(',');
                console.log('usrAuthConf_Adm_Arr', usrAuthConf_Adm_Arr);
                setAdm_grant_name(adm_grant_name => usrAuthConf_Data[0].adm_grant_name);
                setGrant_desc(grant_desc => usrAuthConf_Data[0].grant_desc);
                setUsrAuthConf_Adm(usrAuthConf_Adm => usrAuthConf_Adm_Arr);
                setUsr_grantConf_Upt(usr_grantConf_Upt => usrAuthConf_Adm_Arr);
                setLoadStatus_Conf(true);
              }
              catch(e){
                console.log('error',e);
              }
              finally{
                setLoadStatus_Conf(false);
                setReRenderStatus_Conf(false);
              }
        }
        getUsrAuthConfData();
    },[curr_adm_grant_idx])
    
    
    const handleEdit_UsrGrant = useCallback((e) => {
        e.persist();
        // const el_chkbx_arr = e.target.name.split("_");
        // const el_seqNum = el_chkbx_arr[el_chkbx_arr.length-1];
        if(e.target.checked) {
            //auth_checkbx_ref.current[el_seqNum-1].checked = true;            
            !usr_grantConf_Upt.includes(e.target.value) && setUsr_grantConf_Upt(usr_grantConf_Upt => [...usr_grantConf_Upt, e.target.value])
        }else{
            //auth_checkbx_ref.current[el_seqNum-1].checked = false;     
            if(usr_grantConf_Upt.includes(e.target.value)){
                const idx = usr_grantConf_Upt.findIndex((item) => item === e.target.value)
                setUsr_grantConf_Upt(usr_grantConf_Upt.splice(usr_grantConf_Upt.splice(idx,1)))
            }
        }
    },[usr_grantConf_Upt]);


    const changeGrantName = (e) => {
        e.persist();
        console.log('changeGrantName', e.target.value);
        setAdm_grant_name(adm_grant_name => e.target.value);
    }


    const changeGrantDesc = (e) => {
        e.persist();
        console.log('changeGrantDesc', e.target.value);
        setGrant_desc(grant_desc => e.target.value);
    }


    useEffect(() => {
        console.log('usrAuthCodeList',usrAuthCodeList);
        console.log('usr_grantConf_Upt',usr_grantConf_Upt);
        console.log('usrAuthConf_Adm',usrAuthConf_Adm);
    },[usr_grantConf_Upt, usrAuthConf_Adm, usrAuthCodeList])


    useEffect(() => {
        //if(popupGbn === ''){
            const Admin_user_access_sign_modify_popup_bgk = document.getElementById("Admin_user_access_sign_modify_popup_bgk");
            Admin_user_access_sign_modify_popup_bgk.style.display = "none";
        //}
    },[popupGbn === '']);


    const Image_close_popup = useCallback(() => {
        setPopupGbn('');
    }, []);


    const handleSetUserGrant_Update = async () => {
        try{
            const datas = {
                adm_grant_name : adm_grant_name,
                grant_desc : grant_desc,
                adm_grant_idx : curr_adm_grant_idx,
                usr_grantConf_Upt : usr_grantConf_Upt.join(',')
            };
            const result = await Server_ajax_post("admin_Settings/setUserGrant_Update", {datas});
            console.log(result)
            setUsrAuthConf_Adm(usrAuthConf_Adm => usr_grantConf_Upt);
            setReRenderStatus_Code(true);
        } 
        catch(e){
            console.log('error',e);
        }
        finally{
            setReRenderStatus_Code(false);
            setReRenderStatus(true);
        }
        Image_close_popup();
    }



    return (
        <React.Fragment>
            <div className="admin_background_same_box" id="Admin_user_access_sign_modify_popup_bgk">
                <div className="admin_pixed_popup_white_box">
                    <div className="admin_service_center_middel_white_box" id="sp_admin_access_white_box">
                        <div className="admin_popup_head_line_box">
                            <h1>관리자 회원등급 수정</h1>
                            <div className="admin_popupClose_box">
                                <img onClick={Image_close_popup}
                                    src={close_btn} alt="" />
                            </div>
                        </div>

                        <div className="admin_big_contents_box">
                            <div className="admin_popup_Contents_box" id="admin_access_big_box">
                                <div className="admin_sign_table_box">
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <td>관리자 권한 명칭</td>
                                                <td><input type="text" defaultValue={adm_grant_name} onChange={changeGrantName}/></td>
                                            </tr>
                                            <tr>
                                                <td>등급 설명</td>
                                                <td>
                                                    <textarea defaultValue={grant_desc}  onChange={changeGrantDesc}></textarea>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>이용권한</td>
                                                <td>
                                                    <div className="checkbox_wrap ">
                                                        {
                                                           Object.values(usrAuthCodeList).map((item, index) => {
                                                                const checked_v = usr_grantConf_Upt.includes(item.sub_cate_code) ? true : false
                                                                return (
                                                                    <div key={index+1}>
                                                                        <input type="checkbox" 
                                                                               ref={(el) => (auth_checkbx_ref.current[index] = el)}
                                                                               name={`admin_access_modif_v_${index+1}`} 
                                                                               id={`admin_access_modif_v${index+1}`} 
                                                                               value={item.sub_cate_code} 
                                                                               onChange={handleEdit_UsrGrant} 
                                                                               checked={checked_v}
                                                                        />
                                                                        <label className="checkbox_design" htmlFor={`admin_access_modif_v${index+1}`}>{item.sub_cate_name}</label>
                                                                        <br />
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>

                            <div className="admin_popup_button_box">
                                <button className="admin_popup_first_btn" onClick={Image_close_popup}>취소</button>
                                <button className="admin_popup_second_btn" id="add_access_sign_btn" onClick={handleSetUserGrant_Update}>수정</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Admin_access_modify_popup;