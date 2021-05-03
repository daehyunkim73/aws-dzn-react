import React, { useCallback, useRef, useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';
import { Server_ajax_post } from "../../../../Server_ajax";





const Admin_access_sign_add_popup = (props) => {
    const {  
        setReRenderStatus,
        setPopupGbn,
        popupGbn 
    } = props;


    const Image_close_popup = useCallback(() => {
        setPopupGbn('');

    }, []);


    useEffect(() => {
        //if(popupGbn === 'A'){
            const Admin_user_access_sign_add_popup_bgk = document.getElementById("Admin_user_access_sign_add_popup_bgk");
            Admin_user_access_sign_add_popup_bgk.style.display = "none";
        //}
    },[popupGbn === 'A']);


    /*
    MM-회원관리
    DC-데이터센터 관리
    SC-서비스센터 관리
    MJ-매출/정산 관리
    GM-게시판 관리
    CM-콘테츠 관리
    AC-관리자 설정
    AM-API 매니저
    AD-API 문서 */
    const MM = useRef('MM');
    const DC = useRef('DC');
    const SC = useRef('SC');
    const MJ = useRef('MJ');
    const GM = useRef('GM');
    const CM = useRef('CM');
    const AC = useRef('AC');
    const AM = useRef('AM');
    const AD = useRef('AD');

    const auth_checkbx_ref = useRef([]);
    const [usr_grantConf_Upt2, setUsr_grantConf_Upt2] = useState([]);
    const [usrAuthCodeList2, setUsrAuthCodeList2] = useState([]);
    const [loadStatus_Code, setLoadStatus_Code] = useState(false);
    const [reRenderStatus_Code, setReRenderStatus_Code] = useState(false);

    useEffect(() => {
        const getUsrAuthCodeList2 = async () => {
            try{
                const datas = {
                };
                const usrAuthCodeList_Data = await Server_ajax_post("admin_Settings/getUserAuthorityCode", {datas});
                console.log('usrAuthCodeList_Data', usrAuthCodeList_Data);
                setUsrAuthCodeList2(usrAuthCodeList2 => usrAuthCodeList_Data);
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
        getUsrAuthCodeList2();
    },[])




    const [adm_grant_name, setAdm_grant_name] = useState('');
    const [grant_desc, setGrant_desc] = useState('');

    
    const handleEdit_UsrGrant_forIns = useCallback((e) => {
        e.persist();
        // const el_chkbx_arr = e.target.name.split("_");
        // const el_seqNum = el_chkbx_arr[el_chkbx_arr.length-1];
        if(e.target.checked) {
            //auth_checkbx_ref.current[el_seqNum-1].checked = true;            
            !usr_grantConf_Upt2.includes(e.target.value) && setUsr_grantConf_Upt2(usr_grantConf_Upt2 => [...usr_grantConf_Upt2, e.target.value])
        }else{
            //auth_checkbx_ref.current[el_seqNum-1].checked = false;     
            if(usr_grantConf_Upt2.includes(e.target.value)){
                const idx = usr_grantConf_Upt2.findIndex((item) => item === e.target.value)
                setUsr_grantConf_Upt2(usr_grantConf_Upt2.splice(usr_grantConf_Upt2.splice(idx,1)))
            }
        }
    },[usr_grantConf_Upt2]);


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
        console.log('usrAuthCodeList2',usrAuthCodeList2);
        console.log('usr_grantConf_Upt2',usr_grantConf_Upt2);
    },[usr_grantConf_Upt2, usrAuthCodeList2])




    const handleSetUserGrant_Insert = async () => {
        try{
            const datas = {
                adm_grant_name : adm_grant_name,
                grant_desc : grant_desc,
                usr_grantConf_Upt : usr_grantConf_Upt2.join(',')
            };
            const result = await Server_ajax_post("admin_Settings/setUserGrant_Insert", {datas});
            console.log(result)
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
            <div className="admin_background_same_box" id="Admin_user_access_sign_add_popup_bgk">
                <div className="admin_pixed_popup_white_box">
                    <div className="admin_service_center_middel_white_box" id="sp_admin_access_white_box">
                        <div className="admin_popup_head_line_box">
                            <h1>관리자 회원등급 추가</h1>
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
                                                           Object.values(usrAuthCodeList2).map((item, index) => {
                                                                const checked_v2 = usr_grantConf_Upt2.includes(item.sub_cate_code) ? true : false
                                                                return (
                                                                    <div key={index+1}>
                                                                        <input type="checkbox" 
                                                                               ref={(el) => (auth_checkbx_ref.current[index] = el)}
                                                                               name={`admin_access_modif_v_${index+1}`} 
                                                                               id={`admin_access_modif_v${index+1}`} 
                                                                               value={item.sub_cate_code} 
                                                                               onChange={handleEdit_UsrGrant_forIns} 
                                                                               checked={checked_v2}
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
                                <button className="admin_popup_second_btn" id="add_access_sign_btn" onClick={handleSetUserGrant_Insert}>추가</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Admin_access_sign_add_popup;