import React, { useEffect, useState, useRef, useCallback } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Question_delete_popup from "../../popup/Small_popup/Dev_question_delete_popup";
import Question_popup from "../../popup/Middle/Question/question_popup";
import Question_table_rows from "./question_table_rows";
import Question_gaci_Table_none from "./question_gaci_Table_none";

import Page_nation_post from "./Component/Gaci_page_nation";
import Pagenations, { Roo_pagenation } from "./Component/Page_nations";
import { Server_ajax_post } from "../../../server_ajax";

const Question_table = ({ searchClick, setSearchClick, questionData, setQuestionData, defalutData, setRending }) => {
  // const pageListNum = useRef(2); //목록 노출 개수
  const [pageListNum, setPageListNum] = useState(10); // 목록 노출 개수
  const [api_page_nations, setApi_page_nations] = useState(1); // 페이지 위치
  const [pageData, setPageData] = useState([]);
  const [deleteIDs, setDeleteIDs] = useState([]);
  const [isDeleteConfrim, setIsDeleteConfirm] = useState(false);

  // 페이지 네이션
  useEffect(() => {          
    setQuestionData([]);    
    Page_nation_post(pageListNum, api_page_nations, pageData, setQuestionData);    
    select_all_btn(false);
  }, [api_page_nations]);

  // 등록 버튼 클릭시 등록 페이지 오픈
  const regClick = useCallback(() => {
    const questionPopupBgk = document.getElementById("Question_popup_bgk");
    questionPopupBgk.style.display = "table";
  }, []);

  // 목록 개수 변경 시 1페이지로 초기화
  useEffect(() => {
    setQuestionData([]);
    setPageData(defalutData);
    Page_nation_post(
      pageListNum,
      api_page_nations,
      defalutData,
      setQuestionData,        
    );    

    setApi_page_nations(1);    
    select_all_btn(false);
    setSearchClick(false);
  }, [pageListNum, searchClick])

  // 삭제 확인 눌렀을 때 
  useEffect(() => {
    const deleteData = async  () => {      
      try{
        if(isDeleteConfrim === true) {
          const url = `support/quest_delete_checked`;        
          const result = await Server_ajax_post(url, deleteIDs);
  
          if(result.affectedRows > 0) {                   
            setRending(true);
          }else{
            throw new Error('삭제 실패')
          }
        }
      }      
      catch(e) {
        console.error(e);
      }
    };    
    deleteData();    
    setIsDeleteConfirm(false);
  }, [isDeleteConfrim === true])

  // 삭제 버튼 클릭시 삭제 팝업 오픈 (답변 달려있으면 삭제 불가)
  const deleteClick = useCallback(() => {       
    const objs = document.querySelectorAll(".using_svc_checkbox_state");
    let deleteCnt = 0;
    let notDelete = 0;
    let ids = [];
    // 삭제할 데이터 iD 저장
    objs.forEach((data, idx) => {
      if(idx === 0 ){ 
        console.log(data)
      }
      if(data.checked) {
        deleteCnt++;
        ids = [...ids, data.id];        
      }      
    });
    setDeleteIDs(ids);

    ids.forEach(id => {
      questionData.forEach(data => {
        
        if(Number(id) === Number(data.qstIdx)){
          if(data.awrIdx) {
            notDelete++;
          }          
          return;
        }                
      })
      if(notDelete) return;
    })    
    
    if(notDelete > 0) {
      alert('삭제할 수 없는 문의글이 있습니다.')
      return; 
    }
    
    if(deleteCnt === 0){
      alert('선택된 문의글이 없습니다.');
      return;
    }    

    const devQuestionDeletePopupBgk = document.getElementById(
      "Dev_Question_delete_popup_bgk"
    );
    // 삭제 팝업 열기    
    devQuestionDeletePopupBgk.style.display = "table";    
  }, [setDeleteIDs, questionData]);

  // 리스트 목록 개수 변경시 이벤트
  const listChange = useCallback((e) => {
    const cnt = e.target.value;
    setPageListNum(cnt);
  }, [setPageListNum]);

  // 체크 박스 전체 선택 이벤트
  const checkboxAllClick = useCallback(() => {
    select_all_btn(true);
  }, [select_all_btn]);
  
  // 선택 이벤트 처리
  const select_all_btn = useCallback((isClear) => {
    let selectAll = document.querySelector("#step_two_api_a");
    let objs = document.querySelectorAll(".using_svc_checkbox_state");

    if(isClear) {
      if (selectAll.checked === true) {
        for (let i = 0; i < objs.length; i++) {
          objs[i].checked = false;
        }
      } else if (selectAll.checked === false) {
        for (let i = 0; i < objs.length; i++) {
          objs[i].checked = true;
        }
      }
    }
    else {
      selectAll.checked = false;
      for (let i = 0; i < objs.length; i++) {
        objs[i].checked = false;
      }
    }
  }, []);

  return (
    <React.Fragment>
      <Question_delete_popup setConfirm={setIsDeleteConfirm} />
      <Question_popup setRending={setRending} />

      <Table responsive>
        <caption className="tb_caption" id="input_btn_caption_question">
          {/* 게시글 [총 <span>{questionData.length}</span> 건] */}          
          <p className="caption_question bold_none">
            <span id="choice_select">선택한 문의</span>
            <Button onClick={deleteClick}>X 삭제</Button>
          </p>
          <Form.Control
            as="select"
            className="list_select"
            defaultValue="10"
            onClick={listChange}
          >                        
            <option value="10">10개씩 보기</option>
            <option value="20">20개씩 보기</option>
            <option value="30">30개씩 보기</option>
            <option value="40">40개씩 보기</option>
            <option value="50">50개씩 보기</option>
            <option value="100">100개씩 보기</option>
          </Form.Control>
          <div className="question_upload_btn_box">            
            <Button onClick={regClick}>문의등록</Button>
          </div>
        </caption>
        <thead id="question_uploade_box">
          <tr>
            <th>
              <div className="checkbox_wrap">
                <input type="checkbox" id="step_two_api_a" />
                <label
                  className="checkbox_design"
                  htmlFor="step_two_api_a"
                  onClick={checkboxAllClick}
                ></label>
              </div>
            </th>
            <th>No</th>
            <th>등록일시</th>
            <th>문의유형</th>
            <th>제목</th>
            <th>답변상태</th>
          </tr>
        </thead>
        {questionData.length === 0 ? (
          <Question_gaci_Table_none />
        ) : (
          <tbody>
            {questionData.map((list, idx) => {
              return (
                <Question_table_rows
                  key={idx}                  
                  list={list}                  
                />
              );
            })}
          </tbody>
        )}
      </Table>

      {Roo_pagenation(
        pageListNum,
        pageData, //전체 게시글
        questionData, //페이지 네이션 게시글
        setQuestionData, //페이지 네이션 게시글 func
        api_page_nations, //현재 페이션 네이션
        setApi_page_nations, //현재 페이지 네이션 함수
        false,
        null
      )}
      <Pagenations />
    </React.Fragment>
  );
};

export default Question_table;
