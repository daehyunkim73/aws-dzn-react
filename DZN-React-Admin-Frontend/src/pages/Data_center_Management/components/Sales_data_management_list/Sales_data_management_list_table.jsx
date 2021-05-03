import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Table_middle from "../../../../../func_src/Table_middle";
import { Link } from "react-router-dom";
import Pagenations, { Roo_pagenation } from "../../../../../Root_component/Post_pagenation";
import { Page_nation_post } from "../../../../../func_src/Gaci_page_nation";

const Sales_data_management_list_table = ({searchClick, setSearchClick, apprvlData, setApprvlData, defalutData, totalCnt }) => {  
  const [type, setType] = useState('');
  const [exposure, setExposure] = useState('');   // 노출 상태
  const [payment, setPayment] = useState('');     // 요금제
  const [dayOrder, setDayOrder] = useState('');   // 요일순 정렬  
  const [pageListNum, setPageListNum] = useState(50);   // 목록 노출 개수
  const [api_page_nations, setApi_page_nations] = useState(1);
  const [pageData, setPageData] = useState([]);


  useEffect(() => {    
    setApprvlData([]);    
    Page_nation_post(
      pageListNum,
      api_page_nations,
      pageData,
      setApprvlData,        
    );  
  }, [api_page_nations])

  // 구분 및 승인상태 변경시 데이터 리스트 검색
  /*
   노출상태 => 노출: Y, 미노출: N
   요금제선택 => 일별호출횟수제한: D, 월별호출횟수제한: M
   요일별 정렬 => 판매게시이 순: 0, 최종수정일 순: 1
   */
  useEffect(() => {
    if(type === '' && exposure === '' && payment === '' && dayOrder === ''){
      setApprvlData([]);
      setPageData(defalutData);
      Page_nation_post(
        pageListNum,
        api_page_nations,
        defalutData,
        setApprvlData,        
      );   
    }
    else  {
      const newData =  apprvlData.filter(data => {        
        if(type === '') return true;
        else return data.data_Type === type;        
      }).filter(data => {        
        if(exposure === '') return true;
        else return data.show_gbn === exposure;
      }).filter(data => {
        const fee_type = data.dayMnth_fee_type === null ? 'F' : data.dayMnth_fee_type;        
        if(payment === '') return true;
        else return fee_type === payment;
      }).sort( (a, b) => {        
        //판매게시일 순, 최종 수정일순 필터링
        if (dayOrder === "0") return true;
        else if (dayOrder === "1")
          return new Date(b.uptDt) - new Date(a.uptDt);
      });

      setPageData(newData);
      
      setApprvlData([]);
      Page_nation_post(
        pageListNum,
        api_page_nations,
        newData,
        setApprvlData,        
      );      
    }
    setSearchClick(false);
  }, [type, exposure, payment, dayOrder, pageListNum, searchClick])

  useEffect(() => {
    setApi_page_nations(1);
  }, [type, exposure, payment, dayOrder, pageListNum, searchClick])
  
  // 노출상태 변경 이벤트
  const typeChange = (e) => {
    setApprvlData(defalutData);
    const value = e.target.value;    
    setType(() => value);        
  }

  // 노출상태 변경 이벤트
  const exposureChange = (e) => {
    setApprvlData(defalutData);
    const value = e.target.value;    
    setExposure(() => value);        
  }

  // 요금제 변경 이벤트
  const paymentChange = (e) => {
    setApprvlData(defalutData);
    const value = e.target.value;    
    setPayment(() => value);    
  }

  // 요일별 정렬 변경 이벤트
  const dayOrderChange = (e) => {
    setApprvlData(defalutData);
    const value = e.target.value;    
    setDayOrder(() => value);    
  }

  const listChange = (e) => {
    const cnt = e.target.value;
    setPageListNum(Number(cnt));
  }
  
  useEffect(() => {
    Table_middle();
    return () => {
      Table_middle();
    };
  }, []);

  return (
    <React.Fragment>
      <div className="backoffice_table_wrap">
        <Table responsive>
          <caption className="tb_caption">
            <div className="caption_title bold_none">
              [총 <p className="number_data">{totalCnt}</p>건 ] 
              검색결과 <p className="number_data">{apprvlData.length}</p>건
            </div>
            <div className="tb_select_wrap">
            <Form.Control as="select" className="table_select tb_select" onChange={typeChange}>
                <option value=''>데이터유형 선택</option>
                <option value="D">데이터</option>
                <option value="T">통계</option>
                <option value="M">모델</option>
                <option value="R">리포트</option>
              </Form.Control>
              <Form.Control as="select" className="table_select tb_select" onChange={exposureChange}>
                <option value=''>노출상태 선택</option>
                <option value="Y">노출</option>
                <option value="N">미노출</option>                
              </Form.Control>
              <Form.Control as="select" className="table_select tb_select" onChange={paymentChange}>
                <option value=''>요금제 선택</option>
                <option value="F">무료</option>
                <option value="D">일별 호출횟수 제한</option>
                <option value="M">월별 호출횟수 제한</option>                
              </Form.Control>
              <Form.Control as="select" className="table_select tb_select" onChange={dayOrderChange}>
                <option value="0">판매 게시일 순</option>
                <option value="1">최종 수정일 순</option>                
              </Form.Control>
              <Form.Control as="select" defaultValue="50" className="list_select tb_select" onChange={listChange}>
                <option value='2'>목록 2</option>
                <option value='30'>목록 30</option>
                <option value='50'>목록 50</option>  {/*기본 값*/}
                <option value='70'>목록 70</option>
                <option value='100'>목록 100</option>  
              </Form.Control>
            </div>
          </caption>
          <thead>
            <tr>
              <th>회원명/아이디</th>              
              <th>데이터 제목</th>
              <th>카탈로그</th>
              <th>노출상태</th>
              <th>요금제</th>
              <th>판매 게시일</th>
              <th>최종 수정일</th>
            </tr>
          </thead>
          <tbody>
            {apprvlData.map( (data, idx) =>               
              <tr key={idx}>                
                <td>
                  {`${data.mbr_name}/${data.mbr_id}`}
                </td>              
                <td className="table_title">
                  <Link className="link_style_text" to={`/admin/datainfo/${data.pdbase_idx}`}>
                    <span className="table_href">
                      {data.data_title}
                    </span>
                  </Link>
                </td>
                <td>
                  <Link className="link_style_text" to={`/admin/datainfo/${data.pdbase_idx}`}>
                    <button className="table_view_btn">관리</button>
                  </Link>
                </td>
                <td>{data.show_gbn === 'Y' ? '노출' : '미노출'}</td>
                <td>{data.dayMnth_fee_type === null  ? '무료' : data.dayMnth_fee_type === "M" ? '월별 호출횟수 제한' : '일별 호출횟수 제한'  }</td>
                <td>{data.regDt}</td>
                <td>{data.uptDt}</td>
              </tr>
            )}            
          </tbody>
        </Table>
      </div>
      {Roo_pagenation(
        pageListNum,
        pageData, //전체 게시글
        apprvlData, //페이지 네이션 게시글
        setApprvlData, //페이지 네이션 게시글 func
        api_page_nations, //현재 페이션 네이션
        setApi_page_nations, //현재 페이지 네이션 함수
        false,
        null
      )}
      <Pagenations />
    </React.Fragment>
  );
};

export default Sales_data_management_list_table;
