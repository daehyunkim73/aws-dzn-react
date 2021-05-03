import React, { useState, useEffect } from "react";
import Judge_result_history from "./judge_result_history";
import Judge_request from "./judge_request";
import title_list_icon from "../../../image/Center/List_icon/title_list_icon.png";
import { Server_ajax_post } from "../../../server_ajax";

const judge = ({detailID:pdbase_idx, dzonID: mbr_idx, state, setState}) => {

  const [reRend, setReRend] = useState(false);  
  const [resultData, setResultData] = useState([]);  // 승인 결과 데이터
  
  // 심사 데이터 가져오기
  useEffect(() => {
    (async function () {
      try {
        const param = {pdbase_idx };
        const axios_host = await Server_ajax_post(`datacenter/getJudgeResultInfo`, param);
                
        if(axios_host.length > 0) {
          setReRend(false);
          setResultData(axios_host);
        }
        
      } catch (e) {
          return console.error(e);
      }
    })();
  }, [reRend===true])

  return (
    <React.Fragment>
      <ul>
        <div className="title_list_icon">
          <img className="title_list_icon_img" src={title_list_icon} alt=""/>
          <li>
            가격정보 및 데이터 정보를 수정할 경우 반드시 승인심사를 거처야
            합니다. 승인심사를 하지 않는 경우 해당 정보는 적용되지 않습니다.
          </li>
        </div>
      </ul>
      <div className="judge_table_top">
        <Judge_request setReRend={setReRend} pdbase_idx={pdbase_idx} mbr_idx={mbr_idx} state={state} setState={setState} />
      </div>
      <div className="judge_table_bottom">        
        <Judge_result_history resultData={resultData} />        
      </div>
    </React.Fragment>
  );
};

export default judge;
