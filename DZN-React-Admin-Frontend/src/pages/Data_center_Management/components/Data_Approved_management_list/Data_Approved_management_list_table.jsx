import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Table_middle from "../../../../../func_src/Table_middle";
import { Link } from "react-router-dom";
import Pagenations, { Roo_pagenation } from "../../../../../Root_component/Post_pagenation";
import { Page_nation_post } from "../../../../../func_src/Gaci_page_nation";

const Data_Approved_management_list_table = ({ searchClick, setSearchClick, apprvlData, setApprvlData, defalutData, totalCnt }) => {
  const [type, setType] = useState('');           // 구분
  const [approval, setApproval] = useState('');   // 승인상태
  const [pageListNum, setPageListNum] = useState(50);   // 목록 노출 개수
  const [api_page_nations, setApi_page_nations] = useState(1);
  const [pageData, setPageData] = useState([]);
  
  useEffect(() => {    
    Table_middle();
    return () => {
      Table_middle();
    };
  }, []);

  
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
  useEffect(() => {    
    if(type === '' && approval === ''){
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
        const dataType = data.sales_stat === '5' || data.sales_stat === '6' ? '1' : '0'
        if(type === '') return true;
        else return dataType === type;
      }).filter(data => {
        if(approval === '') return true;
        else return data.stat === approval;
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
  }, [type, approval, pageListNum, searchClick])


  useEffect(() => {
    setApi_page_nations(1);
  }, [type, approval, searchClick, pageListNum])

  // 구분 변경 이벤트
  const typeChange = (e) => {
    setApprvlData(defalutData);
    const value = e.target.value;
    setType(() => value);
  }

  // 승인상태 변경 이벤트
  const apprvChange = (e) => {
    setApprvlData(defalutData);
    const value = e.target.value;    
    setApproval(() => value);    
  }

  const listChange = (e) => {
    const cnt = e.target.value;
    setPageListNum(Number(cnt));
  }

  return (
    <React.Fragment>      
      <div className="backoffice_table_wrap">
        <Table responsive>
          
          <caption className="tb_caption">
            <div className="caption_title bold_none">
              [총 <p className="number_data">{totalCnt}</p>건 ] 
              검색결과 <p className="number_data">{apprvlData && apprvlData.length}</p>건
            </div>
            <div className="tb_select_wrap">
              <Form.Control as="select" id="type_select" className="table_select tb_select" onChange={typeChange}>
                <option value=''>구분 선택</option>
                <option value='0'>제작</option>
                <option value='1'>판매</option>                
              </Form.Control>
              <Form.Control as="select" className="table_select tb_select" onChange={apprvChange}>
                <option value=''>승인상태 선택</option>
                <option value='2'>승인요청</option>
                <option value='3'>승인</option>
                <option value='4'>반려</option>                
              </Form.Control>
              <Form.Control as="select" defaultValue='50' className="list_select tb_select" onChange={listChange}>
                <option value='4'>목록 4</option>
                <option value='10'>목록 10</option>
                <option value='30'>목록 30</option>
                <option value='50'>목록 50</option>  {/*기본 값*/}
                <option value='70'>목록 70</option>
                <option value='100'>목록 100</option>                
              </Form.Control>
            </div>
          </caption>

          <thead>
            <tr>
              <th className="table_min_w">구분</th>
              <th>데이터 제목</th>
              <th>회원명/아이디</th>
              <th>신청정보</th>
              <th>상태</th>
              <th>요청일</th>
              <th>승인일</th>
            </tr>
          </thead>
          <tbody>            
            {apprvlData && apprvlData.map((data, idx)=> (
              <tr key={idx}>
                <td>{data.sales_stat ? '판매' : '제작'}</td>
                <td className="table_title">
                  <Link
                    className="link_style_text"
                    to={`/admin/datainfo/${data.pdbase_idx}`}
                  >
                    <span className="table_href">{data.data_title}</span>
                  </Link>
                </td>
                <td><span>{data.mbr_name}/{data.mbr_id}</span></td>
                <td>
                  <Link
                    className="link_style_text"
                    to={`/admin/datainfo/${data.pdbase_idx}`}
                  >
                    <button className="table_view_btn">보기</button>
                  </Link>
                </td>
                <td>{data.stat === '2' ? '승인요청' : data.stat === '3' ? '승인' : '반려'}</td>
                <td>{data.apprvlreq_dt}</td>
                <td></td>
              </tr>
            )) }
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

export default Data_Approved_management_list_table;
