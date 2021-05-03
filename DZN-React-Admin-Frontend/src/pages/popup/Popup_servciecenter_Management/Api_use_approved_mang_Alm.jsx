import React, { useCallback, useEffect, useState } from 'react';
import close_btn from "../../../../image/Center/Close_btn/close_btn.png";
import Table from "react-bootstrap/Table";
import axios from 'axios';
import { func_date } from '../../../../func_src/admin_now_date';
import { Server_ajax_post } from '../../../../Server_ajax';

const Api_use_approved_mang_Alm = (props) => {
    const { Ack_not_Companion_data, Ack_not_Companion_data_func, Checked_all, Data_end_func } = props;
    const [req_appr_api_yn, setReq_appr_api_yn] = useState(false);
    const [mbrList, setMbrList] = useState([]);

    const Image_close_popup = useCallback(() => {
        const Admin_user_api_approved_mangUse_popup_comapin_bgk = document.getElementById(
            "Admin_user_api_approved_mangUse_popup_comapin_bgk",
        );
        Admin_user_api_approved_mangUse_popup_comapin_bgk.style.display = "none";
    }, []);

    const Appr_act_req = useCallback(() => {
        const result = new func_date();
        let body = {
            api_info: Ack_not_Companion_data,
            state_act_info: 1,
            admin_arr_reg_dt: result.alm_date
        }
        
        async function post_api() {
            try {
                await Server_ajax_post('service_center_managment/svc_use_api_update_res', body);
                const Admin_user_api_approved_mangUse_popup_comapin_bgk = document.getElementById(
                    "Admin_user_api_approved_mangUse_popup_comapin_bgk",
                );
                Admin_user_api_approved_mangUse_popup_comapin_bgk.style.display = "none";
                Ack_not_Companion_data_func([]);
                Checked_all.filter((c) => {
                    return c !== null
                }).map((result) => {
                    result.checked = false;
                })

                let mbrList = [];
                Ack_not_Companion_data.map(data => {
                    const {mbr_id} = data;
                    mbrList = mbrList.concat(mbr_id);
                })        
                mbrList = [...new Set(mbrList)];
                
                const alamParam = {
                    id: mbrList,      // 알림을 보낼 사용자계정 ID
                    definitionCode: 2,   // 알림 수신 case 정의 코드
                    contentCode: 3,      // 알림 내용 코드
                    etc: ''              // 추가 내용 ( 예. 000 서비스가 결제되었습니다. 중 000에 들어갈 문구) 
                  }                
                await Server_ajax_post(`admin_settings/alarm_regist`, alamParam);
        
                setReq_appr_api_yn(false);
                Data_end_func(false);
            } catch(e) {
                return console.error(e)
            }
        }
        post_api();
    }, [Ack_not_Companion_data]);

    useEffect(() => {
           
    }, [req_appr_api_yn]);

    return (
        <React.Fragment>
            <div
                className="admin_background_same_box"
                id="Admin_user_api_approved_mangUse_popup_comapin_bgk"
            >
                <div className="admin_pixed_popup_white_box">
                    <div className="admin_service_center_middel_white_box" id="sp_middle_box">
                        <div className="admin_popup_head_line_box">
                            <h1>API 사용 승인관리</h1>
                            <div className="admin_popupClose_box">
                                <img onClick={Image_close_popup} src={close_btn} alt="" />
                            </div>
                        </div>

                        <div className="admin_big_contents_box">
                            <div className="admin_popup_Contents_box" id="admin_api_Use_sp_box">
                                <Table responsive className="admin_api_contents_table_box" >
                                    <thead>
                                        <tr>
                                            <th>신청 API</th>
                                            <th>과금</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Ack_not_Companion_data.map((item, idx) => {
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
                                <p>해당 API에 대한 사용을 승인하시겠습니까?</p>
                            </div>

                            <div className="admin_popup_button_box">
                                <button
                                    className="admin_popup_first_btn"
                                    onClick={Image_close_popup}>
                                    취소
                                </button>
                                <button
                                    className="admin_popup_second_btn"
                                    id="api_use_approved_post"
                                    onClick={Appr_act_req}
                                >
                                    승인하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Api_use_approved_mang_Alm;