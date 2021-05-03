import React, { useState, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Data_Apprvoed_judge from "../../popup/Small_popup/Data_Approved_judge_req";
import axios from 'axios';

// 이미지 import
import close_btn from "../../../image/Center/Close_btn/close_btn.png";
import { Server_ajax_post } from "../../../server_ajax";

const judge_request = ({setReRend, pdbase_idx, mbr_idx, state, setState}) => {

    // Props 정보 객체비구조화 할당
    const [fileName, setFileName] = useState('');   // 파일명만 보여주는 State
    const [filePath, setFilePath] = useState();     // 업로드 시 정보가 담긴 State   
    const [confirm, setConfirm] = useState(false);    // 팝업창에서 확인 여부
    const [textAreaValue, setTextAreaValue] = useState(''); 
    const [judgeData, setJudgeData] = useState({
        pdbase_idx: pdbase_idx,
        mbr_idx: mbr_idx,
        price_gbn: false,
        data_gbn: false,
        etc_gbn: false,
        etc_memo: '',
        memo: '',        
        addFile: '',
    });

    // 가격정보 수정, 데이터 수정, 기타 체크박스
    const onClick = (e) => {        
        const {id, checked} = e.target;        
        setJudgeData({
            ...judgeData,
            [id]: checked
        })
    }

    // 기타 사유, 사유 입력
    const onBlur = (e) => {
        const {id, value} = e.target;        
        setJudgeData({
            ...judgeData,
            [id]: value.replace(/\n/g, '<br />')
        })
    }

    // 파일 첨부 이벤트
    const input_file_names = (e) => {          
        setFilePath(e.target.files[0]);        
        setFileName(e.target.files[0].name);
    }

    // 파일 등록 후 파일명 옆 닫기 버튼 클릭시 이벤트
    const close_file_click = (e) => {        
        setFileName('');
        setFilePath();
    }

    // 승인심사요청 최종 등록
    useEffect(() => {
        // 팝업창에서 확인 버튼 클릭 시 진행
        if(confirm === true){  
            let param = {};

            (async function () {
                try {
                    // 파일이 있을 경우 파일 등록 후 승인 정보 등록
                    if(fileName){
                        const formData = new FormData();
                        formData.append('file_data', filePath);

                        const fileUpload = await Server_ajax_post(`datacenter/judgeInfo_imgUpload`, formData);

                        if(fileUpload) {
                            param = {...judgeData, addFile: axios_host.path};
                            const axios_host = await Server_ajax_post(`datacenter/setSalesDataJudgeInfo`, param);
                            if(axios_host.affectedRows > 0){
                                console.log('승인 정보(이미지첨부) 요청 되었습니다.');
                                setReRend(true);
                            } else {
                                throw new Error('승인 심사 요청에 실패하였습니다.')
                            }
                        }else {
                            throw new Error('이미지 등록에 실패하였습니다.');
                        }                        
                    }else{
                        // 승인 정보 등록
                        param = {...judgeData, addFile: null};
                        const axios_host = await Server_ajax_post(`datacenter/setSalesDataJudgeInfo`, param);
                                                
                        if(axios_host.affectedRows > 0){
                            console.log('승인 정보가 정상적으로 요청 되었습니다.');
                            setReRend(true);
                        }else{
                            throw new Error('승인 심사 요청에 실패하였습니다.')
                        }
                    }
                } catch (e) {
                    return console.error(e);
                }
            })();            

            // 그 외 데이터 담아서 axios 로 전송
            setConfirm(false); // 확인버튼 여부는 다시 'N'으로 설정            
            setState('2');

            const Data_Approved_judge_bgk_popup = document.getElementById(
                "Data_Approved_judge_bgk_popup"
              );
              
            Data_Approved_judge_bgk_popup.style.display = "none";
        }        
    }, [confirm===true])

    const relay_Approved_sales_req_btn = useCallback(() => {
        const Data_Approved_judge_bgk_popup = document.getElementById(
            "Data_Approved_judge_bgk_popup"
          );

        if(!(judgeData.price_gbn || judgeData.data_gbn || judgeData.etc_gbn)){
            alert('재승인 요청 시 승인항목을 선택 후 사유 또는 파일 첨부를 하셔야 합니다.');
            Data_Approved_judge_bgk_popup.style.display = "none";
            setConfirm(false);
            return;
        }else{
            if(judgeData.etc_gbn && judgeData.etc_memo === ''){
                alert(`승인항목-기타'의 입력항목을 입력하지 않았습니다.`);                    
                Data_Approved_judge_bgk_popup.style.display = "none";
                setConfirm(false);
                return;
            }

            if(judgeData.memo === ''){
                alert(`사유를 입력하지 않았습니다.`);                    
                Data_Approved_judge_bgk_popup.style.display = "none";
                setConfirm(false);
                return;
            }

            if(judgeData.price_gbn && fileName === ''){
                alert(`가격정보 수정을 하실 경우 파일 첨부를 하셔야 합니다.`);                    
                Data_Approved_judge_bgk_popup.style.display = "none";
                setConfirm(false);
                return;                    
            }                
        }

        Data_Approved_judge_bgk_popup.style.display = "table";
      }, [judgeData]);

    return (
        <React.Fragment>
            <Data_Apprvoed_judge setConfirm={setConfirm} />
            <div className="judge_table_title">승인심사요청</div>
            <div className="judge_table">
            <div className="judge_table_left judge_table_floatleft">
                <div className="ds_judge_check_title ds_judge_check_approval">
                승인항목
                </div>
                <div className="ds_judge_check_title ds_judge_check_reason">
                사유
                </div>
                <div className="ds_judge_check_title ds_judge_check_file">
                파일 첨부
                </div>
            </div>
            <div className="judge_table_right judge_table_floatleft">
                <div className="ds_judge_check_content ds_judge_check_content_approval">
                <div className="checkbox_wrap dc_judge_check">
                    <input type="checkbox" id="price_gbn" onClick={onClick}/>
                    <label className="checkbox_design" htmlFor="price_gbn">
                        가격정보 수정
                    </label>
                </div>
                <div className="checkbox_wrap dc_judge_check">
                    <input type="checkbox" id="data_gbn" onClick={onClick} />
                    <label className="checkbox_design" htmlFor="data_gbn">
                        데이터 수정
                    </label>
                </div>
                <div className="checkbox_wrap dc_judge_check">
                    <input type="checkbox" id="etc_gbn" onClick={onClick} />
                    <label className="checkbox_design" htmlFor="etc_gbn">
                        기타
                    </label>
                    <input className="judge_check_text_box" id="etc_memo"  type="text" onBlur={onBlur} />
                </div>
                </div>
                <div className="ds_judge_check_content ds_judge_check_content_reason">
                <Form.Control
                    as="textarea"
                    rows="4"
                    placeholder="변경 사유 및 변경내용을 상세히 작성하세요."
                    id="memo"
                    onBlur={onBlur}                                      
                />
                </div>                

                <div className="ds_judge_check_content ds_judge_check_content_file">
                    <div className="file_wrap">
                        <input type="file" id="file_check" name="file_check" onChange={input_file_names} />
                        <label className="file_btn" htmlFor="file_check">파일선택</label>
                    </div>
                    <div>
                        <p>{fileName}</p>
                        <img src={close_btn} alt="close" onClick={close_file_click} />
                    </div>
                    <p>※ 기타 심사에 필요한 사항이 있을 경우 파일을 첨부해주세요.</p>
                </div>


            </div>
            </div>
            {state === '2' ? null : 
            <div className="judge_table_top_btn judge_table_btn">
                <button onClick={relay_Approved_sales_req_btn}>
                    재승인(판매) 요청
                </button>
            </div>
            }
        </React.Fragment>
    )
}

export default judge_request;