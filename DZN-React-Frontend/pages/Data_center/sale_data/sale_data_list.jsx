import React, { useEffect, useCallback, useRef } from "react";
import { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Sale_data_list_data from "./sale_data_list_data";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Server_ajax_post } from "../../../server_ajax";
 
  

const sale_data_list = () => {
  /////////////////////////////////////// 
  const [tempData, setTempData] = useState([]);     // 판매 데이터 정보
  const [list, setList] = useState([]);             // 페이지 내의 데이터 정보
  const [lstGbn, setLstGbn] = useState("");         // 탭 정보
  const [currPage, setCurrPage] = useState(1);      // 현재 페이지 위치
  const contentNumPerPage = 4;                      // 한페이지 내 데이터 수  
  const [ttlRowsCnt, setTtlRowsCnt] = useState(0);  // 총 페이지
  const [freeGbn, setFreeGbn] = useState([]);       // 유료, 무료 타입 정보
  const [typeGbn, setTypeGbn] = useState([]);       // 데이터 유형 정보
  const [reRend, setReRend] = useState(false);      // 렌더링 여부 값
  
  const freeRef = useRef('');                       // 구매 데이터 - 무료
  const notFreeRef = useRef('');                    // 구매 데이터 - 유료
  const datatype_d = useRef('');                    // 데이터 유형 - 데이터
  const datatype_t = useRef('');                    // 데이터 유형 - 통계
  const datatype_m = useRef('');                    // 데이터 유형 - 모델
  const datatype_r = useRef('');                    // 데이터 유형 - 리포터
  ///////////////////////////////////////
  const [cookies, setCookie, removeCookie] = useCookies();

  // 페이지 내 데이터 가져오기
  const getPagenate = (datas, contentNumPerPage, pageNum) => {
    setTtlRowsCnt(datas.length);

    const currIndex = (pageNum - 1) * contentNumPerPage;
    return datas.map((data, idx) => {
        return idx >= currIndex && idx < currIndex + contentNumPerPage
          ? data
          : null;
      }).filter((mapData) => {
        return mapData !== null && mapData !== "undifined" && mapData !== "";
      });    
  };
  
  // 정렬 된 데이터 가져오기
  const getSortData = (data, order) => {
    let sortedData = [];
    if (order === "asc") {
      sortedData = sortedData.concat(data).sort(
        (a, b) =>
          a["regDt"].toString().substring(0, 10).replace(/-/g, "") -
          b["regDt"].toString().substring(0, 10).replace(/-/g, "")
        );
    } else if (order === "desc") {
      sortedData = sortedData.concat(data).sort(
        (a, b) =>
          b["regDt"].toString().substring(0, 10).replace(/-/g, "") -
          a["regDt"].toString().substring(0, 10).replace(/-/g, "")
      );
    }
    return sortedData;
  };

  // 초기 데이터 및 렌더링 될 경우 실행
  useEffect(() => {
    // 판매 데이터 가져오기    
    (async function () {
      try {                          
        const datas = {
          compNo: cookies.h_selected_company_no,      
        };        

        const result = await Server_ajax_post(`datacenter/getSaleDataList`,datas);
        if(result.length > 0){
          // 상태 정보에 따라 내용 추가
          result.map(data => {
            data.validValue = "1";          
            switch(data.stat) {
              case "2": 
                data.validSubIcon = "effectiveness_badge";
                data.validSubText = "심사중";
              break;
              case "3":
                data.validSubIcon = "judge_badge";
                data.validSubText = "승인";
              break;
              case "4":
                data.validSubIcon = "approved_badge";
                data.validSubText = "심사반려";
              break;
            }

            switch(data.sales_stat){
              case "5":
                data.validSalesIcon = "purchase_badge";
                data.validSalesText = "판매중";
              break;
              case "6":
                data.validSalesIcon = "none_purchase_badge";
                data.validSalesText = "판매정지";
              break;
            }
          })
          setTempData(() => result);

          // 데이터 정렬
          const sortedData = getSortData(result, "desc");
                
          // 페이지 내 데이터 가져오기
          const pagenatdData = getPagenate(
            sortedData,
            contentNumPerPage,
            currPage
          );            
          setList(pagenatdData); 
        }
      } catch (e) {
        console.error(e); 
      }
    })();

    setReRend(false);
  }, [reRend === true]);

   
  //  구매 데이터에 따른 조회 데이터      
  const getFreeData = useCallback((datas, freeGbnArr) => {    
    let freeGbnArr_value = '';

    if (freeGbnArr.length > 0) {
      return datas.map( data => {
        for (let i = 0; i < freeGbnArr.length; i++) {
          freeGbnArr[i] === 'freeRef' && (freeGbnArr_value = '0')
          || freeGbnArr[i] === 'notFreeRef' && (freeGbnArr_value = '1')
          if (data.pay_type === freeGbnArr_value) {
            return data;
          }
        }
      })
      .filter((val) => {
        return val !== null && val !== undefined && val !== "";
      });      
    } else {
      return datas;
    }
  }, []);

  // 데이터 유형에 따른 조회 데이터
  const getDataTypeFilter = useCallback((datas, typeGbn) => {    
    if (typeGbn.length > 0) {
      return datas.map(data => {
          for (let i = 0; i < typeGbn.length; i++) {
            if (data.data_Type === typeGbn[i]) {
              return data;
            }
          }
        })
        .filter((val) => {
          return val !== null && val !== undefined && val !== "";
        });      
    } else {
      return datas;
    }
  }, []);
  
  //setLstGbn
  useEffect(() => {
    // 선택된 데이터 유형 체크 하기
    typeGbn.length > 0 && typeGbn.map( type => {
      switch(type) {
        case "D": datatype_d.current.checked = true; break;
        case "T": datatype_t.current.checked = true; break;
        case "M": datatype_m.current.checked = true; break;
        case "R": datatype_r.current.checked = true; break;        
      }      
    })
    
    // 선택된 구매 데이터 체크 하기
    freeGbn.length > 0  && freeGbn.map( freeData => {
      switch(freeData){
        case "freeRef": freeRef.current.checked = true; break;
        case "notFreeRef": notFreeRef.current.checked = true; break;
      }      
    })
    
    // 탭 정보에 따라 리스트 정보 처리
    let filterdList = [];

    // 탭 정보에 따른 데이터 정보 저장
    switch(lstGbn){
      case "":
      case "all" :
        // 전체 데이터
        filterdList = tempData;
      break;
      case "sales":
        // 판매중 데이터
        filterdList = tempData.filter(data => data.sales_stat === "5");
      break;
      case "sales_stop":
        // 판매정지 데이터
        filterdList = tempData.filter(data => data.sales_stat === "6");
      break;
    }

    let freeDatas = getFreeData(filterdList, freeGbn);
    let typeDatas = getDataTypeFilter(freeDatas, typeGbn);
    let sortedData = getSortData(typeDatas, "desc");
    //let initPageNum = isNaN(data[2]) ? 1 : data[2];
    let pagenatdData = getPagenate(
      sortedData,
      contentNumPerPage,
      currPage
    );
    setList(list => pagenatdData);
  }, [typeGbn, lstGbn, freeGbn, currPage])


  // 탭 클릭 이벤트
  const tabHandleClick = (eventKey) => {
    if (eventKey !== "all") {      
      const nav_link = document.querySelectorAll(".nav-link");
      const tab_pane = document.querySelectorAll(".tab-pane");

      nav_link[0].setAttribute("aria-selected", "false");
      nav_link[0].setAttribute("tabindex", "-1");
      nav_link[0].classList.remove("active");
      tab_pane[0].classList.remove("active", "show");
      tab_pane[0].setAttribute("aria-hidden", "true");
    }
    // 탭 정보가 바뀔 경우 1페이지로 이동하도록 설정
    if(eventKey !== lstGbn){
      setCurrPage(1);
    }
    // 탭 정보 수정
    setLstGbn(eventKey);
  };

  return (
    <React.Fragment>
      <div className="max_w purchase_create_data_list clearfix">        
        <Tabs 
            defaultActiveKey="all" 
            id="uncontrolled-tab-example"
            onSelect={tabHandleClick}
        >
          <Tab eventKey="all" title="전체">
          {
            (lstGbn === "all" || lstGbn === "") && (            
              <Sale_data_list_data 
                  list={list}
                  ttlRowsCnt={ttlRowsCnt}
                  currPage={currPage}
                  setCurrPage={setCurrPage}
                  eventKey={lstGbn}
                  contentNumPerPage={contentNumPerPage}                  
                  freeGbn={freeGbn}
                  setFreeGbn={setFreeGbn}
                  setTypeGbn={setTypeGbn}
                  typeGbn={typeGbn}
                  datatype_d={datatype_d}
                  datatype_t={datatype_t}
                  datatype_m={datatype_m}
                  datatype_r={datatype_r}
                  notFreeRef={notFreeRef}
                  freeRef={freeRef}
                  setReRend={setReRend}
              />
            )
          }
          </Tab>
          <Tab eventKey="sales" className="sale_info" title="판매 중">
          {
            (lstGbn === "sales") && (              
              <Sale_data_list_data 
                  list={list}
                  ttlRowsCnt={ttlRowsCnt}
                  currPage={currPage}
                  setCurrPage={setCurrPage}
                  eventKey={lstGbn}
                  contentNumPerPage={contentNumPerPage}                  
                  freeGbn={freeGbn}
                  setFreeGbn={setFreeGbn}
                  setTypeGbn={setTypeGbn}
                  typeGbn={typeGbn}
                  datatype_d={datatype_d}
                  datatype_t={datatype_t}
                  datatype_m={datatype_m}
                  datatype_r={datatype_r}
                  notFreeRef={notFreeRef}
                  freeRef={freeRef}
                  setReRend={setReRend}
              />
            )
          }
          </Tab>
          <Tab eventKey="sales_stop" className="sale_info" title="판매정지">
          {
            (lstGbn === "sales_stop") && (             
            <Sale_data_list_data 
                list={list}
                ttlRowsCnt={ttlRowsCnt}
                currPage={currPage}
                setCurrPage={setCurrPage}
                eventKey={lstGbn}
                contentNumPerPage={contentNumPerPage}                
                freeGbn={freeGbn}
                setFreeGbn={setFreeGbn}
                setTypeGbn={setTypeGbn}
                typeGbn={typeGbn}
                datatype_d={datatype_d}
                datatype_t={datatype_t}
                datatype_m={datatype_m}
                datatype_r={datatype_r}
                notFreeRef={notFreeRef}
                freeRef={freeRef}
                setReRend={setReRend}      
              />
              )
            }
          </Tab>
        
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default sale_data_list;
