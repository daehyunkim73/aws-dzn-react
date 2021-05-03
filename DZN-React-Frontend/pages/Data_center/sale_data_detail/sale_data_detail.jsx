
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Basic_info from "./Basic_info";
import Judge from "./judge";
import Data_sale_main from "./data_sale_main";
import Sales_management from "./Sales_management";
import Sale_data_comment from "./sale_data_comment";

//로그인 모듈
import Ajax from '../../../lib/ajax-3rd-custom'    
import globals from "../../../lib/globals"
import { useCookies  } from 'react-cookie';

// 이미지 import
import view_more from "../../../image/Center/Dashboard/view_more.png";
import { Server_ajax_post } from "../../../server_ajax";

const sale_create_data_v99 = (props) => {
  const {detailID, dzonID} = props.match.params;  
  const [detailData, setDetailData] = useState([]);
  const [createData, setCreateData] = useState([]);
  const [dtailDataLoadState, setDtailDataLoadState] = useState(false);
  const [createDataLoadState, setCreateDataLoadState] = useState(false);
  const [mainTitle, setMainTitle] = useState('');
  const [reRend, setReRend] = useState(false);    
  const [currTab, setCurrTab] = useState('');
  const [tabRerend, setTabRerend] = useState(false);
  const [state, setState] = useState(0);  
  const [salesState, setSalesState] = useState(0); 
  const [salesStateSetting, setSalesStateSetting] = useState({name: '', sytle: ''})
  const [userInfo, setUserInfo] = useState([]);

  const [cookies, setCookie, removeCookie] = useCookies();

  // 사용자 정보 가져오기
  useEffect(() => {
    let cno = cookies.h_selected_company_no;
    const userAPI = `${globals.certApiUrl}/common/user/userinfo/detail?cno=${cno}`;
    const main = new Promise((res, rej) => {
        Ajax.get(userAPI).then(function (response) {
            const resultData = JSON.parse(response);                
            if(resultData.resultCode === 200) {                    
                res(resultData.resultData);
            }
            else rej(`${resultData.resultCode}: ${resultData.errorMsg}`);
        }).catch(e => {
          rej('API 오류');
        });
    });

    main.then(res => {
      setUserInfo(() => res);
    })
    main.catch(error => {
      console.error(error);
    })
  }, [])

  // 구매 제작 데이터 정보 가져오기
  useEffect(() => {
    (async function () {
      try {
        const param = {
          pdbase_idx: detailID          
        }
        const axios_host = await Server_ajax_post(`datacenter/get_dataDescInfo`, param);

        if(axios_host){          
          setDetailData(() => axios_host);
          setState(() => axios_host.stat);
          setSalesState(() => axios_host.sales_stat);
          setMainTitle(() => axios_host.data_title);      
          setDtailDataLoadState(true);          
        }
      } catch (e) {
          console.error(e);
      }
    })();
    setCreateDataLoadState(true);
    setReRend(false);   
  }, [reRend === true]);


  // 우측 다른 제작 데이터 정보 가져오기
  useEffect(() => {
    (async function () {
      try {
        const param = {
          pdbase_idx: detailID,          
          stat: '',
          sales_stat: '5'
        }
        const axios_host = await Server_ajax_post(`datacenter/getCreateDataList`, param);
        setCreateData(() => axios_host);        
      } catch (e) {
          return console.error(e);
      }
    })();
    setCreateDataLoadState(false);
  }, [createDataLoadState === true]);


  // 상태 정보에 따른 스타일 및 상태명
  const getStateName = (stat) => {        
    const state = {
      name:'',
      style:''
    }        
    switch(stat) {
      case "0": 
        state.name = '구매완료';
        state.style = "";
      break;
      case "1": 
        state.name = '제작중';
        state.style = "service_title_icon";
      break;
      case "2": 
        state.name = '심사중';
        state.style = "service_title_icon_judge_btn";        
      break;
      case "3": 
        state.name = '승인';
        state.style = "service_title_icon_judge_ok_btn";
      break;
      case "4": 
        state.name = '심사반려';
        state.style = "service_title_icon_judge_fail_btn";
      break;
    }
    return state;
  }
  
  useEffect(() => {    
    switch(salesState){
      case "5":
        setSalesStateSetting({
          name: '판매중',
          style: 'service_title_icon_sales_btn'
        })
      break;
      case "6":
        setSalesStateSetting({
          name: '판매정지',
          style: 'service_title_icon_sales_stop_btn'
        })
      break;
    }
  }, [salesState])

  
  // 다른 제작데이터 선택하기 시 이동
  const onChangeCreateDataMove = (e) => {    
    let params = e.target.value;
    let paramsArr = params.split(',');
    if(Array.isArray(paramsArr) === true){
      setReRend(true); 
      props.history.push(`/datacenter/saledata/control/${paramsArr[0]}`);
    }
  }

  // 탭 클릭 시 useState 정보 변경
  const tabHandleSelect = (eventKey) => {    
    setCurrTab(eventKey);
    setTabRerend(true);
  }
 

  // 탭 클릭시 탭에 대한 속성 변경 이벤트
  useEffect(() => {
    const tab_datas = ['basic','sale','comments','opening_sales','judge']
    const [basic, sale, comments, openingSales, judge] = tab_datas.map((data) => {
      return document.getElementById(`uncontrolled-tab-example-tab-${data}`);
    })
    const [basicTab, saleTab, commentsTab, openingSalesTab, judgeTab] = tab_datas.map((data) => {
      return document.getElementById(`uncontrolled-tab-example-tabpane-${data}`);
    })
    
    const nav_link = document.querySelectorAll(".nav-link");
    const tab_pane = document.querySelectorAll(".tab-pane");
        
    nav_link.forEach(link => {
      link.setAttribute("aria-selected", "false");
      link.setAttribute("tabindex", "-1");
      link.classList.remove("active");              
    });

    tab_pane.forEach(pane => {
      pane.setAttribute("aria-hidden", "true");
      pane.classList.remove("active", "show");
    })

    // 초기 진입시 탭정보가 없을 경우 기본정보로 설정
    if(currTab === 'basic'){
      basic.setAttribute("aria-selected", "true");
      basic.removeAttribute("tabindex");
      basic.classList.add("active");
      basicTab.setAttribute("aria-hidden", "false");
      basicTab.classList.add("active", "show");
    }else if(currTab === 'sale'){
      sale.setAttribute("aria-selected", "true");
      sale.removeAttribute("tabindex");
      sale.classList.add("active");
      saleTab.setAttribute("aria-hidden", "false");
      saleTab.classList.add("active", "show");
    }else if(currTab === 'comments'){
      comments.setAttribute("aria-selected", "true");
      comments.removeAttribute("tabindex");
      comments.classList.add("active");
      commentsTab.setAttribute("aria-hidden", "false");
      commentsTab.classList.add("active", "show");
    }else if(currTab === 'opening_sales'){
      openingSales.setAttribute("aria-selected", "true");
      openingSales.removeAttribute("tabindex");
      openingSales.classList.add("active");
      openingSalesTab.setAttribute("aria-hidden", "false");
      openingSalesTab.classList.add("active", "show");
    }else if(currTab === 'judge'){
      judge.setAttribute("aria-selected", "true");
      judge.removeAttribute("tabindex");
      judge.classList.add("active");
      judgeTab.setAttribute("aria-hidden", "false");
      judgeTab.classList.add("active", "show");
    }    

    setTabRerend(false);
  },[tabRerend === true])


  return (
    (dtailDataLoadState === true) && (
    <React.Fragment>
      <div className="max_w">
        <div className="service_title_wrap">
          <div className="service_title_wrap_left">
            <p>
            { mainTitle }
            </p>
            <div className={salesStateSetting.style} >
              <div>{salesStateSetting.name}</div>
            </div>
            <div className={getStateName(state).style} >
              <div>{getStateName(state).name}</div>
            </div>
            
          </div>
          <div className="service_title_wrap_right">
          <Form.Control as="select" value={detailID+','+dzonID} onChange={onChangeCreateDataMove}>
              <option>다른 판매데이터 선택하기</option>
              {
                createData  && (
                  createData.map((data, idx) =>
                    <option key={idx} value={data.pdbase_idx+','+data.dzon_data_idx}  >{data.data_title}</option>                    
                  )
                )
              }
            </Form.Control>
          </div>
        </div>
        <Tabs defaultActiveKey="basic" id="uncontrolled-tab-example" onSelect={tabHandleSelect}>
          <Tab eventKey="basic" title="기본정보">
          {
              dtailDataLoadState === true && 
              <Basic_info detailData={detailData} 
                          detailID={detailID} 
                          dzonID={dzonID} 
                          dtailDataLoadState={dtailDataLoadState} 
                          setReRend={setReRend}
                          setMainTitle={setMainTitle}                            
                          state={state}
              />              
            } 
          </Tab>
          <Tab eventKey="sale" className="sale_info" title="판매정보">            
              <Data_sale_main detailID={detailID} dzonID={dzonID} setSalesState={setSalesState}  />            
          </Tab>
          <Tab eventKey="comments" className="sale_info" title="댓글관리">
            <Sale_data_comment detailID={detailID} userInfo={userInfo} />
          </Tab>
          <Tab eventKey="opening_sales" className="sale_info" title="매출관리">
            <Sales_management />
          </Tab>
          <Tab eventKey="judge" title="승인심사">            
            <Judge detailID={detailID} dzonID={dzonID} state={state} setState={setState} />
          </Tab>
        </Tabs>
      </div>
    </React.Fragment>
        )
  );
};

export default sale_create_data_v99;
