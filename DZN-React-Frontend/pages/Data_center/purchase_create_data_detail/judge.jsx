import React, { useState, useEffect } from "react";
import axios from "axios";
import Judge_none_table from "./judge_none_table";
import Judge_result_data from "./judge_result_data";

// 이미지 import
import title_list_icon from "../../../image/Center/List_icon/title_list_icon.png";
import { Server_ajax_post } from "../../../server_ajax";

/*
  detailID : 성택한 구매/제작 데이터의 ID
  dzonID : 회사 or 유저의 고유 ID
  judgeClick : 승인 검사 클릭 여부 정보
  setJudgeClick : 승인 검사 클릭 여부 정보 수정
 */
const judge = ({
  detailID,
  dzonID,
  judgeClick,
  setJudgeClick,
  setJudge_cnt,
  setState,
  state,
}) => {
  const [loading, setLoding] = useState(false); // 로딩 상태 정보 (true=로딩완료, false=로딩중)
  const [judgeData, setJudgeData] = useState({}); // 기본정보 및 판매정보에 등록 된 데이터
  const [resultCnt, setResultCnt] = useState(0); // 승인 결과 데이터 카운터
  const [resultData, setResultData] = useState([]); // 승인 결과 데이터 카운터

  // 구매제작 데이터 > 판매정보 > 승인(판매) 요청하기 클릭시 렌더링 되도록 처리

  useEffect(() => {
    (async function () {
      try {
        const result = await Server_ajax_post(`datacenter/getJudgeDataInfo`, {
          pdbase_idx: detailID,
        });
        
        const fileData = result[0].addFile ? result[0].addFile.split("\\") : "";
        
        setJudgeData({
          ...result[0],
          pdbase_idx: detailID,
          mbr_idx: dzonID,
          addFile: fileData ? fileData[fileData.length - 1] : '',
        });
        const result2 = await Server_ajax_post(
          `datacenter/getJudgeResultInfo`,
          {
            pdbase_idx: detailID,
          }
        );
        if (result2.length > 0) {
          setResultData(result2);
          setResultCnt(result2.length);
        }
      } catch (e) {
        return console.error(e);
      }
    })();

    setLoding(true);
    setJudgeClick(false);
  }, [judgeClick === true]);

  return (
    <React.Fragment>
      {loading && (
        <ul>
          <div className="title_list_icon">
            <img src={title_list_icon} alt="" />
            <li>
              승인 이후, 가격정보 수정 및 데이터 수정의 경우 재승인 요청을
              하셔야 합니다.
            </li>
          </div>
          <div className="title_list_icon">
            <img src={title_list_icon} alt="" />
            <li>
              심사가 원활하게 완료되어 승인되는 경우, 판매상태로 변경하여 판매가
              가능합니다. 판매현황은 매출관리에서 확인할 수 있습니다.
            </li>
          </div>
        </ul>
      )}      
      {loading && (
        <Judge_none_table
          judgeData={judgeData}
          setJudgeClick={setJudgeClick}
          resultData={resultData}
          resultCnt={resultCnt}
          setJudge_cnt={setJudge_cnt}
          setState={setState}
          state={state}
        />
      )}
      {resultCnt > 0 && <Judge_result_data resultData={resultData} />}
    </React.Fragment>
  );
};

export default judge;
