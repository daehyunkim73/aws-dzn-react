import React, { useEffect, useState, useCallback, useRef } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Pagenations, { Roo_pagenation } from "../../../../../Root_component/Post_pagenation";
import { Page_nation_post } from "../../../../../func_src/Gaci_page_nation";


const Question_table = ({searchClick, setSearchClick, questionData, setQuestionData, defaultData, totalCnt}) => {
  const [type, setType] = useState('');   // 문의 유형
  const [answer, setAnswer] = useState('');   // 답변처리 상태  
  const [dayOrder, setDayOrder] = useState('');   // 요일순 정렬  
  const [pageListNum, setPageListNum] = useState(50);   // 목록 노출 개수
  const [api_page_nations, setApi_page_nations] = useState(1);
  const [pageData, setPageData] = useState([]);

  // 페이지 네이션 데이터
  useEffect(() => {    
    setQuestionData([]);        
    Page_nation_post(
      pageListNum,
      api_page_nations,
      pageData,
      setQuestionData,        
    );  
  }, [api_page_nations])


  // 필터 기능 
  useEffect(() => {
    if(type === '' && answer === '' && dayOrder === ''){
      setQuestionData([]);
      setPageData(defaultData);
      Page_nation_post(
        pageListNum,
        api_page_nations,
        defaultData,
        setQuestionData,        
      );   
    }
    else  {
      let dataAnswer = '';
      let dateType = '';
      const newData =  questionData.filter(data => {                
        if(type === '') return true;
        else return data.tq_type_code === type;        
      }).filter(data => {        
        dataAnswer = data.awr_idx ? '1' : '0'
        if(answer === '') return true;
        else return dataAnswer === answer;
      }).sort( (a, b) => {
        //문의게시일 순, 답변등록일 순 필터링
        if (dayOrder === "0") return true;
        else if (dayOrder === "1")
          return new Date(a.tq_regDt) - new Date(b.tq_regDt);
      });

      setPageData(newData);
      
      setQuestionData([]);
      Page_nation_post(
        pageListNum,
        api_page_nations,
        newData,
        setQuestionData,        
      );      
    }
    setSearchClick(false);
  }, [type, answer, dayOrder, pageListNum, searchClick])  

  useEffect(() => {
    setApi_page_nations(1);
  }, [type, answer, dayOrder, pageListNum, searchClick])

  // 문의유형 변경 이벤트
  const typeChange = (e) => {
    setQuestionData(defaultData);
    const value = e.target.value;        
    setType(() => value);        
  }

  // 처리상태 변경 이벤트
  const answerChange = (e) => {
    setQuestionData(defaultData);
    const value = e.target.value;    
    setAnswer(() => value);        
  }

  // 요일별 정렬 변경 이벤트
  const dayOrderChange = (e) => {
    setQuestionData(defaultData);
    const value = e.target.value;    
    setDayOrder(() => value);    
  }

  const listChange = (e) => {
    const cnt = e.target.value;
    setPageListNum(Number(cnt));
  }

  return (
    <React.Fragment>
      <div className="backoffice_table_wrap">
        <Table responsive id="question_table">
          <caption className="tb_caption">
            <div className="table_result_number_box">
              <div className="tb_select_wrap" id="select_result_delete_btn_box">
                <div className="caption_title bold_none">
                  [총 <p className="number_data">{totalCnt === 0 ? 0 : totalCnt}</p>건 ] 검색결과
                  <p className="number_data">{questionData ? questionData.length : 0}</p>건
                </div>
              </div>
              <div className="tb_select_wrap" id="select_cpation_uploade_box">
                <Form.Control as="select" className="table_select tb_select" defaultValue='' onChange={typeChange} >
                  <option value=''>문의유형 전체</option>
                  <option value='1'>이용문의</option>
                  <option value='2'>오류신고</option>
                  <option value='3'>건의사항(API관련)</option>
                  <option value='4'>기술지원</option>
                  <option value='5'>법률상담</option>
                  <option value='6'>기타</option>
                </Form.Control>
                <Form.Control as="select" className="list_select tb_select" defaultValue='' onChange={answerChange} >
                  <option value=''>처리상태 전체</option>
                  <option value='0'>답변미등록</option>
                  <option value='1'>답변완료</option>                  
                </Form.Control>
                <Form.Control as="select" className="table_select tb_select" defaultValue='0' onChange={dayOrderChange} >
                  <option value="0">문의게시일 최신순</option>
                  <option value="1">문의게시일 오래된순</option>
                </Form.Control>
                <Form.Control as="select" className="list_select tb_select" defaultValue='50' onChange={listChange}>
                  <option value='30'>목록 30</option>
                  <option value='50'>목록 50</option>
                  <option value='100'>목록 100</option>
                  <option value='150'>목록 150</option>                
                  <option value='200'>목록 200</option>                
                </Form.Control>
              </div>
            </div>
          </caption>

          <thead>
            <tr>
              <th>회원명/아이디</th>
              <th>유형</th>
              <th width="30%">문의제목</th>
              <th>답변상태</th>
              <th>답변자</th>
              <th>문의 개시일</th>
              <th>답변 등록일</th>
            </tr>
          </thead>
          <tbody>
            {
              questionData.map((data, idx) => {      
                return (
                <tr key={idx}>
                  <td>{data.tq_id}</td>
                  <td>{data.tq_type_name}</td>
                  <td>
                    <Link className="table_href" to={`/admin/question/detail/${data.tq_idx}`}>
                      {data.tq_title}
                    </Link>
                  </td>                
                  <td className={data.awr_idx === null ? 'fail_answer' : 'success_answer'}>
                    {data.awr_idx === null ? '답변미등록' : '답변등록'}
                  </td>                
                  <td>{data.ta_name ? data.ta_name : ''}</td>
                  <td>{data.tq_regDt}</td>
                  <td>{data.ta_regDt ? data.ta_regDt : ''}</td>
                </tr>
                )
              })
            }
          </tbody>
        </Table>      
      </div>  
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
