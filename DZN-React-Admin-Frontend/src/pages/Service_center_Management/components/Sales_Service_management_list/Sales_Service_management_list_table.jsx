import React, { useEffect, useState, useRef, useCallback } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Table_middle from "../../../../../func_src/Table_middle";
import { Link } from "react-router-dom";
import { Roo_pagenation } from "../../../../../Root_component/Post_pagenation";
import Pagenations from "../../../../../Root_component/Post_pagenation";
import { Server_ajax_get } from "../../../../../Server_ajax";
import { Page_nation_post } from "../../../../../func_src/Gaci_page_nation";

const Sales_Service_management_table = ({searchClick, setSearchClick, apprvlData, setApprvlData, defalutData, totalCnt }) => {
  
  const [cate, setCate] = useState('');
  const [exposure, setExposure] = useState('');   // 노출 상태
  const [payment, setPayment] = useState('');     // 요금제
  const [dayOrder, setDayOrder] = useState('');   // 요일순 정렬  
  const [pageListNum, setPageListNum] = useState(50);   // 목록 노출 개수
  const [api_page_nations, setApi_page_nations] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [saleSvcCateList, setSaleSvcCateList] = useState([]);


  useEffect(() => {
    setApprvlData([]);    
    Page_nation_post(
      pageListNum,
      api_page_nations,
      pageData,
      setApprvlData,        
    );  
  }, [api_page_nations])

  useEffect(() => {
    if(cate === '' && exposure === '' && payment === '' && dayOrder === ''){
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
      const newData =  apprvlData.filter(data =>{
        if(cate === '' || cate === '전체') return true;
        else return data.svc_cate === cate;
      }).filter(data => {        
        if(exposure === '') return true;
        else return data.show_gbn === exposure;
      }).filter(data => {   
        let svcFilterStat =
              data.pay_type === 0 ? 0 : data.paid_payment_gbn === 0 ? 1 : 2; // 무료 0  유료 (월정액 1, 라이선스 2)
        if(payment === '') return true;
        else return svcFilterStat === Number(payment);
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
  }, [cate, exposure, payment, dayOrder, pageListNum, searchClick])

  useEffect(()=>{
    (async function () {
      try {
        const getSvcCateInfo = await Server_ajax_get(
          `service_center_managment/getSvcCateInfo`
        );
        setSaleSvcCateList(getSvcCateInfo);
      } catch (e) {
        return console.error(e);
      }
    })();
  },[])

  useEffect(() => {
    setApi_page_nations(1);
  }, [cate, exposure, payment, dayOrder, pageListNum, searchClick])
  
  // 카테고리 변경 이벤트
  const cateChange = (e) => {
    setApprvlData(defalutData);
    const value = e.target.value;    
    setCate(() => value);        
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
              [총 
              <p className="number_data">{totalCnt}</p>건 ]
              검색결과 
              <p className="number_data">{apprvlData.length}</p>건
            </div>
            <div className="tb_select_wrap">
              <Form.Control
                as="select"
                className="table_select tb_select"
                onChange={cateChange}
              >
                <option value="">카테고리 선택</option>
                {
                  saleSvcCateList.map((item, cnt) => {
                    return (
                      <option value={item.sub_cate_name} key={cnt}>
                        {item.sub_cate_name}
                      </option>
                    );
                  })}
              </Form.Control>
              <Form.Control
                as="select"
                className="table_select tb_select"
                onChange={exposureChange}
              >
                <option value="">노출상태 선택</option>
                <option value="Y">노출</option>
                <option value="N">비노출</option>
              </Form.Control>
              <Form.Control
                as="select"
                className="table_select tb_select"
                onChange={paymentChange}
              >
                <option value="">요금제 선택</option>
                <option value="0">무료</option>
                <option value="1">월정액</option>
                <option value="2">라이선스</option>
              </Form.Control>
              <Form.Control
                as="select"
                className="table_select tb_select"
                onChange={dayOrderChange}
              >
                <option value="0">판매 게시일 순</option>
                <option value="1">최종 수정일 순</option>
              </Form.Control>
              <Form.Control
                as="select"
                className="list_select tb_select"
                onChange={listChange}
              >
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
              <th>회원명/아이디</th>
              <th>카테고리</th>
              <th>서비스 제목</th>
              <th>카탈로그</th>
              <th>노출상태</th>
              <th>요금제</th>
              <th>판매 게시일</th>
              <th>최종 수정일</th>
            </tr>
          </thead>
          <tbody>
            {apprvlData.map((item, cnt) => {
              return (
                <tr key={cnt}>
                  <td>
                    <span className="table_href">한기업/datapotal</span>
                  </td>
                  <td>{item.svc_cate}</td>
                  <td className="table_title">
                    <Link
                      className="link_style_text"
                      to={`/admin/svcinfo/${item.pdsvc_idx}`}
                    >
                      <span className="table_href">{item.svc_title}</span>
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="link_style_text"
                      to={`/admin/svcinfo/${item.pdsvc_idx}`}
                    >
                      <button className="table_view_btn">관리</button>
                    </Link>
                  </td>
                  <td>{item.show_gbn === "Y" ? "노출" : "노출안함"}</td>
                  <td>
                    {item.pay_type === 0
                      ? "무료"
                      : item.paid_payment_gbn === 0
                      ? "월정액"
                      : "라이선스"}
                  </td>
                  <td>{item.regDt}</td>
                  <td>{item.uptDt}</td>
                </tr>
              );
            })}
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

export default Sales_Service_management_table;
