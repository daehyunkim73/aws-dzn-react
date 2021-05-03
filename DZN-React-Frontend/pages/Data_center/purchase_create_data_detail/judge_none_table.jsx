import React, { useEffect, useState, useCallback } from "react";
import Data_Apprvoed_judge from "../../popup/Small_popup/Data_Approved_judge_req";
import Table_middle from "../../../src/Table_middle";
import axios from "axios";
import { Link } from "react-router-dom";

// 이미지 import
import close_btn from "../../../image/Center/Close_btn/close_btn.png";
import { Server_ajax_post } from "../../../server_ajax";

function judge_none_table({
  judgeData,
  setJudgeClick,
  resultData,
  resultCnt,
  setJudge_cnt,
  setState,
  state,
}) {
  const Data_Approved_judge_bgk_popup = document.getElementById(
    "Data_Approved_judge_bgk_popup"
  );

  // Props 정보 객체비구조화 할당
  const [fileName, setFileName] = useState(""); // 파일명만 보여주는 State
  const [filePath, setFilePath] = useState(); // 업로드 시 정보가 담긴 State
  const [confirm, setConfirm] = useState(false); // 팝업창에서 확인 여부

  // 파일 첨부 이벤트
  const input_file_names = (e) => {
    setFilePath(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  // 파일 등록 후 파일명 옆 닫기 버튼 클릭시 이벤트
  const close_file_click = (e) => {
    setFileName("");
    setFilePath();
  };

  // 승인심사요청 최종 등록
  useEffect(() => {
    // 팝업창에서 확인 버튼 클릭 시 진행
    if (confirm === true) {
      let param = {};
      // 파일이 있을 경우 파일 등록 후 승인 정보 등록
      if (fileName) {
        const formData = new FormData();
        formData.append("file_data", filePath);

        (async function () {
          try {
            await Server_ajax_post(`datacenter/judgeInfo_imgUpload`, formData);
            param = { ...judgeData, addFile: res.data.path };

            await Server_ajax_post(`datacenter/setDataJudgeInfo`, param);
          } catch (e) {
            return console.error(e);
          }
        })();
      } else {
        // 승인 정보 등록
        param = { ...judgeData, addFile: null };
        (async function () {
          try {
            await Server_ajax_post(`datacenter/setDataJudgeInfo`, param);
          } catch (e) {
            return console.error(e);
          }
        })();
      }

      // 그 외 데이터 담아서 axios 로 전송
      setConfirm(false); // 확인버튼 여부는 다시 'N'으로 설정
      setJudgeClick(true);
      setState("2");
      Data_Approved_judge_bgk_popup.style.display = "none";
    }
  }, [confirm === true]);

  useEffect(() => {
    if (resultData.length > 0) {
      resultData.forEach((data) => {
        if (data.apprvl_state === "2") {
          setJudge_cnt(1);
        }
      });
    }
  }, [resultData]);

  // 승인(판매) 요청 버튼 시 팝업
  const Approved_req_Click = () => {
    Data_Approved_judge_bgk_popup.style.display = "table";
  };

  useEffect(() => {
    Table_middle();
    return () => {
      Table_middle();
    };
  }, []);

  return (
    <React.Fragment>
      <Data_Apprvoed_judge setConfirm={setConfirm} />
      {/* 데이터 센터의 기본정보에 기본정보, 판매정보의 필수 항목을 모두 입력하여야 승인심사로 이동 */}
      <div className="judge_table_top">
        <div className="judge_table_title">승인심사요청</div>
        <div className="judge_table">
          <div className="judge_table_left judge_table_float_left">
            <div>제목</div>
            <div>카테고리/유형</div>
            <div>결제방식</div>
            <div>문의/안내 연락처</div>
            <div>파일 첨부</div>
          </div>
          <div className="judge_table_right">
            <div>{judgeData && judgeData.data_title}</div>
            <div>
              {judgeData && judgeData.cate_name} /{" "}
              {judgeData && judgeData.type_name}
            </div>
            <div>
              {judgeData && judgeData.pay_type === "0" ? "무료" : "유료"}
              {judgeData &&
                judgeData.pay_type === "1" &&
                judgeData.dayMnth_fee_type === "D" &&
                " / 일별 호출횟수 제한 요금제"}
            </div>
            <div>{judgeData && judgeData.tel}</div>
            <div>
              <div className="file_wrap">
                <input
                  type="file"
                  id="file_check"
                  name="file_check"
                  onChange={input_file_names}
                />
                <label className="file_btn" htmlFor="file_check">
                  파일선택
                </label>
              </div>
              <div>
                <p>{fileName}</p>
                <img src={close_btn} alt="close" onClick={close_file_click} />
              </div>
              <p>※ 기타 심사에 필요한 사항이 있을 경우 파일을 첨부해주세요.</p>
            </div>
          </div>
        </div>
        <div className="button_s_box" id="sale_make_box_button">
          <Link to="/datacenter/purchasedata">
            <button className="not_search_btn" type="button">
              목록
            </button>
          </Link>
          {state === "1" || state === "4" ? (
            <button className="search_btn" onClick={Approved_req_Click}>
              {resultCnt === 0 ? "승인(판매) 요청" : "재승인 요청"}
            </button>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
}

export default judge_none_table;
