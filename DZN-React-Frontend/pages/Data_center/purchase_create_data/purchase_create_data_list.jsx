import React, { useEffect, useCallback, useRef } from "react";
import { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Working_activity from "./working_activity";
import Purchase_create_data_list_data from "./purchase_create_data_list_data";
import { useCookies } from "react-cookie";
import moment from "moment";
import Ajax from "../../../lib/ajax-3rd-custom"; //로그인 모듈
import { Server_ajax_get } from "../../../server_ajax";

const purchase_create_data_list = () => {
  const [list, setList] = useState([]);
  const [renderPermit, setRenderPermit] = useState(false);
  const [lstGbn, setLstGbn] = useState("");
  const [contentNumPerPage, setContentNumPerPage] = useState(4);
  const [ttlRowsCnt, setTtlRowsCnt] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [validGbn, setValidGbn] = useState([]);
  const [validDataLength, setValidDataLength] = useState(0);
  const [tempData, setTempData] = useState([]);
  const [typeGbn, setTypeGbn] = useState([]);
  const currValidGbn = useRef([]);
  const currLstGbn = useRef();
  const currTypeGbn = useRef([]);

  const validRef = useRef("");
  const invalidRef = useRef("");
  const datatype_d = useRef("");
  const datatype_t = useRef("");
  const datatype_m = useRef("");
  const datatype_r = useRef("");

  const [reRend, setReRend] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  //wehago_s,  h_portal_id,  h_selected_company_no,  cell_company_no,  AUTH_R_TOKEN,  AUTH_A_TOKEN
  const globals = require("../../../lib/globals"); //로그인 모듈

  useEffect(() => {
    currValidGbn.current = validGbn;
    currLstGbn.current = lstGbn;
    currTypeGbn.current = typeGbn;
  }, [validGbn, lstGbn, typeGbn]);

  // PageNation
  const getPagenate = (data, contentNumPerPage, pageNum) => {
    let arrPagedData = [];
    setTtlRowsCnt(data.length);
    let currIndex = (pageNum - 1) * contentNumPerPage;
    arrPagedData = data
      .map((item, idx) => {
        return idx >= currIndex && idx < currIndex + contentNumPerPage
          ? item
          : null;
      })
      .filter((val) => {
        return val !== null && val !== "undifined" && val !== "";
      });
    return arrPagedData;
  };

  // 정렬 함수
  const getSortData = (data, order) => {
    let sortedData = [];
    if (order === "asc") {
      sortedData = []
        .concat(data)
        .sort(
          (a, b) => {
            return moment(a.regDt).format('YYYYMMDDhhmmss') - moment(b.regDt).format('YYYYMMDDhhmmss');
          }            
        );
    } else if (order === "desc") {
      sortedData = []
        .concat(data)
        .sort(
          (a, b) => {
            return moment(b.regDt).format('YYYYMMDDhhmmss') - moment(a.regDt).format('YYYYMMDDhhmmss');
          }            
        );
    }
    return sortedData;
  };

  useEffect(() => {
    const compNo = cookies.h_selected_company_no;
    
    (async function () {
      try {                
          const axios_host = await Server_ajax_get(`datacenter/purchase_create_data_lists?compNo=${compNo}`);        
          let array = [];

          axios_host && axios_host.filter((item) => {
            return item.stat === "1" || item.stat === "2" || item.stat === "3" || item.stat === "4"
          }).map((result) => {
            result.validValue = "1";
            result.detailID = result.pdbase_idx;
            if (result.stat === "1") {
              result.validSubIcon = "create_badge";
              result.validSubText = "제작중";
            } else if (result.stat === "2") {
              result.validSubIcon = "judge_badge";
              result.validSubText = "심사중";
            } else if (result.stat === "3") {
              result.validSubIcon = "approved_badge";
              result.validSubText = "승인";
            } else if (result.stat === "4") {
              result.validSubIcon = "not_effectiveness_badge";
              result.validSubText = "심사반려";
            }
          })

          // API 를 통해 구매완료 정보 가져오기
          const url = `${globals.certApiUrl}/dataportal/purchase/meta-list?cno=${compNo}`;    
          const currDate = moment(new Date()).format('YYYYMMDD');
          
          const apiData = new Promise((res, rej) => {        
            Ajax.get(url).then((response) => {
              const apiResult = JSON.parse(response);
              if (apiResult.resultCode == 200) {          
                array = apiResult.resultData.metaDataList.map((item, idx) => {
                  // 최종 데이터 세팅 정보
                  const reutnData = {
                    pdbase_idx: '', dzon_data_idx: '', data_title: '', data_cate: '', data_Type: '', stat: '',
                    valid: '', validValue: '', detailID: '', validSubIcon: '', validSubText: '', regDt: '',
                  }
                  
                  // 데이터 타입 셋팅
                  let dataType = '';                
                  switch(item.metadata_type){
                    case '데이터': dataType = 'D'; break;
                    case '모델': dataType = 'M'; break;
                    case '리포트': dataType = 'R'; break;
                    case '통계': dataType = 'T'; break;
                  }
                  
                  // 공통 정보 저장
                  reutnData.pdbase_idx = `bc${idx}`;
                  reutnData.detailID =  `bc${idx}`;
                  reutnData.dzon_data_idx =  item.employee_no;
                  reutnData.data_title = item.title;
                  reutnData.data_Type = dataType;
                  reutnData.stat = '0';
                  reutnData.regDt = item.service_start_date;
    
                  // 사용여부에 대한 처리 정보 저장
                  // 종료기간이 지났거나, 사용가능한 수를 초과 하였을 떄 사용 불가
                  if (Number((item.service_end_date).replace(/-/gi, '')) >= Number(currDate) 
                      && Number(item.usage_count) < Number(item.usage_limit)) {
                    reutnData.valid = 'Y';
                    reutnData.validValue = '1';                    
                    reutnData.validSubIcon = 'effectiveness_badge';
                    reutnData.validSubText = '사용가능';
                  } else {
                    reutnData.valid = 'N';
                    reutnData.validValue = '0';                    
                    reutnData.validSubIcon = 'not_effectiveness_badge';
                    reutnData.validSubText = '사용불가';
                  }
                  return reutnData
                });
                res(array);
              } else {              
                rej(`resultMsg: ${apiResult.resultMsg} (${apiResult.resultCode})`);            
              }
            });      
          })
          
          apiData.then((result) => {        
            // 구매완료 데이터(유통포털 데이터)와 [와이즈, 와드이] 데이터            
            const newData = [...axios_host, ...result];
            
            // 등록일 기준 재정렬
            const sortedData = getSortData(newData, "desc");
            setTempData(newData);
            
            // 데이터 개수 저장
            setValidDataLength(() => sortedData.length);
    
            // 페이지
            const pagenatdData = getPagenate(sortedData, contentNumPerPage, 1);        
            
            setList(() => pagenatdData);
            setRenderPermit(true);
          })
          
          // 실패시
          apiData.catch(e => {
            throw new Error(`API Error: ${e}`);
          })          
                    
      } catch (e) {
          return console.error(`Error: ${e}`);
      }
    })();    
  }, [reRend===true]);

  // 탭 클릭 이벤트
  const tabHandleClick = (e) => {
    if (e !== lstGbn) {
      setCurrPage(1);
    }
    setLstGbn(e);
  };

  // 탭 클릭시 구매데이터, 데이터유형 초기화
  useEffect(() => {
    setValidGbn([]);
    setTypeGbn([]);
  }, [lstGbn]);

  // 구매데이터, 데이터유형, 페이지이동, 탭 이동시
  useEffect(() => {
    let filterdList = [];
    try {
      // 필터 처리
      filterdList = tempData
        .filter((list) => {
          if (lstGbn === "all" || lstGbn === "") return true;
          else if (lstGbn === "sale") return list.stat === "0";
          else if (lstGbn === "create") return list.stat === "1";
          else if (lstGbn === "judge") return list.stat === "2";
          else if (lstGbn === "approve") return list.stat === "3";
          else if (lstGbn === "judge_return") return list.stat === "4";
        })
        // 구매데이터 선택시 필터
        .filter((list) => {
          if (validGbn.length === 0) return true;
          else return validGbn.includes(list.validValue) && list.stat === "0";
        })
        // 데이터 유형 선택시 필터
        .filter((list, idx) => {
          if (typeGbn.length === 0) return true;
          else return typeGbn.includes(list.data_Type);
        });

      // 데이터 개수
      setValidDataLength(filterdList.length);

      // 재정렬
      const sortedData = getSortData(filterdList, "desc");

      // pagenation
      const pagenatdData = getPagenate(sortedData, contentNumPerPage, currPage);
      setList(pagenatdData);
    } catch (e) {
      console.error(e);
    }
  }, [lstGbn, typeGbn, validGbn, currPage]);

  return (
    <React.Fragment>
      <div className="max_w purchase_create_data_list clearfix">        
        <Working_activity />
        <Tabs
          defaultActiveKey="all"
          id="uncontrolled-tab-example"
          onSelect={tabHandleClick}
        >
          <Tab eventKey="all" title="전체">
            {renderPermit === true && (lstGbn === "all" || lstGbn === "") && (
              <Purchase_create_data_list_data
                purchase_create_data_list={list}
                ttlRowsCnt={ttlRowsCnt}
                currPage={currPage}
                setCurrPage={setCurrPage}
                eventKey={lstGbn}
                contentNumPerPage={contentNumPerPage}
                validDataLength={validDataLength}
                validGbn={validGbn}
                setValidGbn={setValidGbn}
                setTypeGbn={setTypeGbn}
                typeGbn={typeGbn}
                datatype_d={datatype_d}
                datatype_t={datatype_t}
                datatype_m={datatype_m}
                datatype_r={datatype_r}
                validRef={validRef}
                invalidRef={invalidRef}
                setReRend={setReRend}
              />
            )}
          </Tab>
          <Tab eventKey="sale" className="sale_info" title="구매완료">
            {renderPermit === true && lstGbn === "sale" && (
              <Purchase_create_data_list_data
                purchase_create_data_list={list}
                ttlRowsCnt={ttlRowsCnt}
                currPage={currPage}
                setCurrPage={setCurrPage}
                eventKey={lstGbn}
                contentNumPerPage={contentNumPerPage}
                validDataLength={validDataLength}
                validGbn={validGbn}
                setValidGbn={setValidGbn}
                setTypeGbn={setTypeGbn}
                typeGbn={typeGbn}
                datatype_d={datatype_d}
                datatype_t={datatype_t}
                datatype_m={datatype_m}
                datatype_r={datatype_r}
                validRef={validRef}
                invalidRef={invalidRef}
                setReRend={setReRend}
              />
            )}
          </Tab>
          <Tab eventKey="create" className="sale_info" title="제작 중">
            {renderPermit === true && lstGbn === "create" && (
              <Purchase_create_data_list_data
                purchase_create_data_list={list}
                ttlRowsCnt={ttlRowsCnt}
                currPage={currPage}
                setCurrPage={setCurrPage}
                eventKey={lstGbn}
                contentNumPerPage={contentNumPerPage}
                validDataLength={validDataLength}
                validGbn={validGbn}
                setValidGbn={setValidGbn}
                setTypeGbn={setTypeGbn}
                typeGbn={typeGbn}
                datatype_d={datatype_d}
                datatype_t={datatype_t}
                datatype_m={datatype_m}
                datatype_r={datatype_r}
                validRef={validRef}
                invalidRef={invalidRef}
                setReRend={setReRend}
              />
            )}
          </Tab>
          <Tab eventKey="judge" className="sale_info" title="심사 중">
            {renderPermit === true && lstGbn === "judge" && (
              <Purchase_create_data_list_data
                purchase_create_data_list={list}
                ttlRowsCnt={ttlRowsCnt}
                currPage={currPage}
                setCurrPage={setCurrPage}
                eventKey={lstGbn}
                contentNumPerPage={contentNumPerPage}
                validDataLength={validDataLength}
                validGbn={validGbn}
                setValidGbn={setValidGbn}
                setTypeGbn={setTypeGbn}
                typeGbn={typeGbn}
                datatype_d={datatype_d}
                datatype_t={datatype_t}
                datatype_m={datatype_m}
                datatype_r={datatype_r}
                validRef={validRef}
                invalidRef={invalidRef}
                setReRend={setReRend}
              />
            )}
          </Tab>
          <Tab eventKey="approve" className="sale_info" title="승인">
            {renderPermit === true && lstGbn === "approve" && (
              <Purchase_create_data_list_data
                purchase_create_data_list={list}
                ttlRowsCnt={ttlRowsCnt}
                currPage={currPage}
                setCurrPage={setCurrPage}
                eventKey={lstGbn}
                contentNumPerPage={contentNumPerPage}
                validDataLength={validDataLength}
                validGbn={validGbn}
                setValidGbn={setValidGbn}
                setTypeGbn={setTypeGbn}
                typeGbn={typeGbn}
                datatype_d={datatype_d}
                datatype_t={datatype_t}
                datatype_m={datatype_m}
                datatype_r={datatype_r}
                validRef={validRef}
                invalidRef={invalidRef}
                setReRend={setReRend}
              />
            )}
          </Tab>
          <Tab eventKey="judge_return" className="sale_info" title="심사반려">
            {renderPermit === true && lstGbn === "judge_return" && (
              <Purchase_create_data_list_data
                purchase_create_data_list={list}
                ttlRowsCnt={ttlRowsCnt}
                currPage={currPage}
                setCurrPage={setCurrPage}
                eventKey={lstGbn}
                contentNumPerPage={contentNumPerPage}
                validDataLength={validDataLength}
                validGbn={validGbn}
                setValidGbn={setValidGbn}
                setTypeGbn={setTypeGbn}
                typeGbn={typeGbn}
                datatype_d={datatype_d}
                datatype_t={datatype_t}
                datatype_m={datatype_m}
                datatype_r={datatype_r}
                validRef={validRef}
                invalidRef={invalidRef}
                setReRend={setReRend}
              />
            )}
          </Tab>
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default purchase_create_data_list;
