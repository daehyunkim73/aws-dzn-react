import React, { useEffect, useState, useCallback, useRef, useContext, createContext } from "react";
import Form from 'react-bootstrap/Form';
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';
import Ajax from "../../../../lib/ajax-3rd-custom";
import globals from "../../../../lib/globals";
import moment from 'moment';
import * as CryptoJS from 'crypto-js';
import { Server_ajax_post, Server_ajax_get } from "../../../../Server_ajax";




const Admin_access_authority_mdify_popup = (props) => {
    const {
        setRenderStatus_main,
        mbrIdxNoCmpNo,
    } = props;


    const Image_close_popup = useCallback(() => {
        const Admin_user_access_authority_modify_popup_bgk = document.getElementById("Admin_user_access_authority_modify_popup_bgk");
        Admin_user_access_authority_modify_popup_bgk.style.display = "none";
    }, []);



    const [grantUsrDescInfo, setGrantUsrDescInfo] = useState({});
    const [loadStatus, setLoadStatus] = useState(false);
    const [renderStatus, setRenderStatus] = useState(false);

    useEffect(() => {
        const get_grantUsrInfo = async () => {
            try{
                let mbrInfoArr = mbrIdxNoCmpNo.split('-');
                new Promise( async (res, rej) => {
                const datas1 = { };
                const aesEncryptCode = await  Server_ajax_post("user_management/get_aes_encrypto", {datas1});
                console.log('aesEncryptCode',aesEncryptCode.result);
        

                const datas2 = { mbrIdx: mbrInfoArr[0], };
                const grantUsrInfo_data = await Server_ajax_post("user_management/get_grantUsrInfo", {datas2});
                console.log('grantUsrInfo_data',grantUsrInfo_data);
        
                const ajax_host = await Ajax.get(`${globals.certApiUrl}/common/user/backoffice/info?companyNo=${grantUsrInfo_data[0].comp_no}&user_no=${grantUsrInfo_data[0].mbr_no}&service_code=backoffice&security_key=${aesEncryptCode.result}`);
                const usrDescInfo = JSON.parse(ajax_host);
                console.log('usrDescInfo', usrDescInfo);

                setGrantUsrDescInfo({
                    mbrIdx: grantUsrInfo_data[0].mbr_idx,
                    mbrNo: grantUsrInfo_data[0].mbr_no,
                    comp_no: grantUsrInfo_data[0].comp_no,
                    comp_name: usrDescInfo.resultData.company_name_kr,
                    mbrType: usrDescInfo.resultData !== null ? usrDescInfo.resultData.member_type : '',
                    mbrName: usrDescInfo.resultData !== null ? usrDescInfo.resultData.user_name : '',
                    id: usrDescInfo.resultData !== null ? usrDescInfo.resultData.portal_id : '',
                    hp: usrDescInfo.resultData !== null ? usrDescInfo.resultData.user_contact : '',
                    joinDt: usrDescInfo.resultData !== null ? usrDescInfo.resultData.join_date : '',
                    currLogDt: usrDescInfo.resultData !== null ? usrDescInfo.resultData.last_access_date : '',
                    adm_grant_idx: grantUsrInfo_data[0].adm_grant_idx, 
                    adm_grant_name: grantUsrInfo_data[0].adm_grant_name, 
                    grant_desc: grantUsrInfo_data[0].grant_desc, 
                    adm_grant_value: grantUsrInfo_data[0].adm_grant_value
                })
                setRenderStatus(true);
                res('success');
            })
            .then(() =>{

            })
            }
            catch(e){
            console.log('error',e);
            }
            setRenderStatus(false); 
        }
        get_grantUsrInfo();
    },
    [
        mbrIdxNoCmpNo,
    ])



    useEffect(() => {
        console.log('grantUsrDescInfo', grantUsrDescInfo);

    },[grantUsrDescInfo])



    const [loadStatus2, setLoadStatus2] = useState(false);
    const [grantList, setGrantList] = useState([]);
    const [grantSelect, setGrantSelect] = useState('');
    // const select_change = useRef(); 

    useEffect(() => {
        const get_grantList = async () => {
            try{
                new Promise( async (res, rej) => {
                  const datas = { };
                  const grantUsrList_data = await Server_ajax_post("user_management/get_grantList", {datas});
                  console.log('grantUsrList_data', grantUsrList_data);
                                    
                  await grantUsrList_data.map(async (item, index) => {          
                    setGrantList(grantList => [...grantList, {
                        adm_grant_idx: item.adm_grant_idx, 
                        adm_grant_name: item.adm_grant_name, 
                        grant_desc: item.grant_desc, 
                        adm_grant_value: item.adm_grant_value
                      }
                    ]);
                    res('success');
                  })
                })
                .then(() => {
                });
            }
            catch(e){
              console.log('error',e);
            }
            setLoadStatus2(false);
          }
          get_grantList();
    },[]);




    useEffect(() => {
        console.log('grantList', grantList);

    },[grantList])




    const GrantHandleChange = (e) => {
        console.log('GrantHandleChange', e.target.value);
        const selected_V = e.target.value;
        setGrantUsrDescInfo(data => {
            return {...data, adm_grant_idx: selected_V}
        })
    }



    const GrantSaveHandleClick = (e) => {
        try{
            let mbrInfoArr = mbrIdxNoCmpNo.split('-');
            let mbrIdx = mbrInfoArr[0];
            let mbrNo = mbrInfoArr[1];
            let compNo = mbrInfoArr[2];

            new Promise( async (res, rej) => {
              const datas = { 
                mbrIdx,
                mbrNo,
                compNo,
                grantIdx: grantUsrDescInfo.adm_grant_idx,
              };
              const result_v = await Server_ajax_post("user_management/set_grantInfoUpdate", {datas});
              console.log('result_v', result_v);
              res('success');

            })
            .then(() => {
            });
        }
        catch(e){
          console.log('error',e);
        }

        setRenderStatus_main(true);
        Image_close_popup();
    }



    return (
        <React.Fragment>
            <div className="admin_background_same_box" id="Admin_user_access_authority_modify_popup_bgk">
                <div className="admin_pixed_popup_white_box">
                    <div className="admin_service_center_middel_white_box">
                        <div className="admin_popup_head_line_box">
                            <h1>관리자 권한 수정</h1>
                            <div className="admin_popupClose_box">
                                <img onClick={Image_close_popup}
                                    src={close_btn} alt="" />
                            </div>
                        </div>

                        <div className="admin_big_contents_box">
                            <div className="admin_popup_Contents_box" id="admin_access_big_box">
                                <div className="admin_authority_modify_bigBox">
                                    <p>관리자 아이디: <span>{grantUsrDescInfo.comp_name} / {grantUsrDescInfo.id}</span></p>
                                    <p>관리자명: <span>{grantUsrDescInfo.mbrName}</span></p>
                                    <div className="sp_modfiy_amdin_box">
                                        <p>관리자 등급:
                                            <span>
                                                <Form.Control as="select" className="list_select tb_select" 
                                                value={grantUsrDescInfo.adm_grant_idx} 
                                                onChange={GrantHandleChange}>
                                                    <option>관리자 권한 선택</option>
                                                    {
                                                        grantList.map((item, idx) => {
                                                            return (
                                                            <option value={item.adm_grant_idx}>{item.adm_grant_name}</option>
                                                            )
                                                        })
                                                    }

                                                </Form.Control>
                                            </span>
                                        </p>

                                    </div>
                                </div>
                            </div>

                            <div className="admin_popup_button_box">
                                <button className="admin_popup_first_btn" onClick={Image_close_popup}>취소</button>
                                <button className="admin_popup_second_btn" id="admin_authority_modify" onClick={GrantSaveHandleClick}>수정</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Admin_access_authority_mdify_popup;