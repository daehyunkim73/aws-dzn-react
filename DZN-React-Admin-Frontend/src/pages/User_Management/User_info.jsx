import React, { useEffect, useState, useCallback, useRef, useContext, createContext } from "react"; 
import User_info_search from "./components/User_info/User_info_search";
import User_info_table from "./components/User_info/User_info_table";
import Pagination from "./components/Pagination";
import { Server_ajax_post, Server_ajax_get } from "../../../Server_ajax";
import Ajax from "../../../lib/ajax-3rd-custom";
import globals from "../../../lib/globals";
import moment from 'moment';
import * as CryptoJS from 'crypto-js';



const UserInfoContext = createContext();
const User_info = () => { 
  useEffect(() => { 
    window.scrollTo(0, 0);
  });
 


  const [certUsrDescList, setCertUsrDescList] = useState([]);
  const [searchData, setSearchData] = useState({});
  const [loadStatus, setLoadStatus] = useState(false);
  const [reRenderStatus, setReRenderStatus] = useState(false);
  const [ttlCnt, setTtlCnt] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [contentNumPerPage, setContentNumPerPage] = useState(2);

  const [mbrType, setMbrType] = useState('');           // 구분
  const [joinDtOrderGbn, setJoinDtOrderGbn] = useState('');   // 가입일자 순서
  const [pageListNum, setPageListNum] = useState(50);   // 목록 노출 개수





  console.log('moment(new Date()).format(YYYYMMDDhhmmss)', moment(new Date()).format('YYYYMMDDhhmmss'));

  

  useEffect(() => {
    const get_certUsrList = () => {
      try{
        new Promise( async (res0, rej0) => {
            const datas = {
            };
            const aesEncryptCode =  Server_ajax_post("user_management/get_aes_encrypto", {datas});
            console.log('aesEncryptCode',aesEncryptCode.result);
            res0(aesEncryptCode.result);
        })
        .then( async (result0) => {
          const datas = {
          };
          let tmpArr = [];
          const certUsrList_data = Server_ajax_post("user_management/get_certUsrList", {datas});
          console.log('certUsrList_data', certUsrList_data);
          
          //Ajax.getToken({service_code: "backoffice"}, function (result){});
          new Promise( async (res, rej) => {
            await certUsrList_data.map(async (item, index) => {          
              const ajax_host = await Ajax.get(`${globals.certApiUrl}/common/user/backoffice/info?companyNo=${item.comp_no}&user_no=${item.mbr_no}&service_code=backoffice&security_key=${result0}`);
              const usrDescInfo = JSON.parse(ajax_host);

              if(usrDescInfo.resultData !== null){
                console.log(`${globals.certApiUrl}/common/user/backoffice/info?companyNo=${item.comp_no}&user_no=${item.mbr_no}&service_code=backoffice&security_key=${result0}`);
                console.log('usrDescInfo,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',usrDescInfo);
              }
  
              const datas = {
                mbrIdx: item.dzon_mbr_idx,
              };
              const data_svc_cnt = await Server_ajax_post("user_management/get_data_svc_cnt", {datas});
              console.log('data_svc_cnt', data_svc_cnt);
              
              //if(usrDescInfo.resultData !== null){
                tmpArr = tmpArr.concat({
                  mbrIdx: item.mbr_no,
                  comp_no: item.comp_no,
                  mbrType: usrDescInfo.resultData !== null ? usrDescInfo.resultData.member_type : '',
                  mbrName: usrDescInfo.resultData !== null ? usrDescInfo.resultData.user_name : '',
                  id: usrDescInfo.resultData !== null ? usrDescInfo.resultData.portal_id : '',
                  hp: usrDescInfo.resultData !== null ? usrDescInfo.resultData.user_contact : '',
                  joinDt: usrDescInfo.resultData !== null ? usrDescInfo.resultData.join_date : '',
                  currLogDt: usrDescInfo.resultData !== null ? usrDescInfo.resultData.last_access_date : '',
                  dataSaleCnt: data_svc_cnt[0].data_cnt || '',
                  svcSaleCnt: data_svc_cnt[0].svc_cnt || '',
                })
              //}
              
              Number(certUsrList_data.length) === Number(tmpArr.length) && 
              res(tmpArr);
            })
          })
          .then((result) => {
            if(result.length > 0){
              setLoadStatus(true);
              setCertUsrDescList(result);
            }
          });
        });
      }
      catch(e){
        console.log('error',e);
      }
      setReRenderStatus(false); 
    }
    get_certUsrList();
  },
  [
    reRenderStatus === true,
    currPage,
    mbrType,
    joinDtOrderGbn,
    pageListNum,
  ])



  

// business_format: "전문, 과학 및 기술 서비스업"
// business_reg_no: ""
// business_type: "세무사업(기장대리)"
// business_type_code: "741203"
// ceo_name_kr: "박용민"
// company_name_kr: "테스트_박용민_931"
// company_reg_no: "1111111119"
// company_sub_reg_no: "3123"
// company_tel1: "02"
// company_tel2: "6233"
// company_tel3: "0401"
// company_type: "법인"
// join_date: "2020-07-01 09:07:39"
// last_access_date: "2020-07-02 05:36:14"
// member_type: "기업회원"
// portal_id: "ympark422"
// user_contact: "01028899587"
// user_default_email: "ympark422@wehago.com"
// user_email: "dydqkffp@naver.com"
// user_name: "박용민"



  
  const [certPubList, setCertPubList] = useState([]);
  const [srchResultCnt, setSrchResultCnt] = useState(0);
  const [pageGbn, setPageGbn] = useState(false);
  
  useEffect(() => {
    setTtlCnt(certUsrDescList.length);
    let srchResult = certUsrDescList.filter( item => {
      if(typeof searchData.searchDateGbn === "undefined" || typeof searchData.searchStartDate === "undefined" || typeof searchData.searchEndDate === "undefined"){
        return true;
      }else if(searchData.searchDateGbn === '0' && searchData.searchStartDate !== undefined && searchData.searchEndDate !== undefined){   //가입일 기준
        return Number(moment(item.joinDt).format('YYYYMMDD')) >= Number(moment(searchData.searchStartDate).format('YYYYMMDD')) && Number(moment(item.joinDt).format('YYYYMMDD')) <= Number(moment(searchData.searchEndDate).format('YYYYMMDD'));
      }else if(searchData.searchDateGbn === '1'  && searchData.searchStartDate !== undefined && searchData.searchEndDate !== undefined){   //최근 접속일 기준
        return Number(moment(item.currLogDt).format('YYYYMMDD')) >= Number(moment(searchData.searchStartDate).format('YYYYMMDD')) && Number(moment(item.currLogDt).format('YYYYMMDD')) <= Number(moment(searchData.searchEndDate).format('YYYYMMDD'));
      }
    })
    .filter( term => {
      if(typeof searchData.searchTerm === "undefined"){
        return true;
      }else{
        return term.mbrName.indexOf(searchData.searchTerm) !== -1 || term.id.indexOf(searchData.searchTerm) !== -1 || term.hp.indexOf(searchData.searchTerm) !== -1;
      }
    })
    .filter( type => {
      let mbrType_v = '';
      switch(mbrType) {
        case "": mbrType_v = ''; break;
        case "0": mbrType_v = '기업무료';  break;
        case "1": mbrType_v = '기업유료';  break;
        case "2": mbrType_v = '센터사업자';  break;
        case "3": mbrType_v = '개인무료';  break;
        case "4": mbrType_v = '개인유료';  break;
      }
      if(mbrType_v === ""){
        return true;
      }else{
        return type.mbrType.indexOf(mbrType_v) !== -1;
      }
    })
    .sort((a, b) => {
      //요청일순, 승인일순 필터링
      if (joinDtOrderGbn === "0") //가입일순
        return new Date(b.joinDt) - new Date(a.joinDt);
      else if (joinDtOrderGbn === "1") //최근접속일순
        return new Date(b.currLogDt) - new Date(a.currLogDt);
    });
    setSrchResultCnt(srchResult.length);
    console.log('--------------------------------------------',srchResultCnt);

    let result = srchResult.map((item, idx) => {
      let currIndex = (currPage - 1) * contentNumPerPage;
      return idx >= currIndex && idx < currIndex + contentNumPerPage
        ? item : null;
    })
    .filter((val) => {
      return val !== null && val !== "undifined" && val !== "";
    });
      
    setCertPubList(result)
    setLoadStatus(false);
    setPageGbn(false);
  },[
    loadStatus === true,
    //currPage,
  ])



  useEffect(() => {
    console.log('certPubList------------------',certPubList)
    console.log('ttlCnt',ttlCnt)
    console.log('contentNumPerPage',contentNumPerPage)
    console.log('srchResultCnt---------------------',srchResultCnt)

  },[certPubList, ttlCnt, contentNumPerPage, srchResultCnt])


  return (
    <React.Fragment>
      <UserInfoContext.Provider
        value={{

        }}
      >
    
      <div className="user_info_wrap">
        <div className="Page_same_text">
          <p className="backoffice_title">회원정보</p>
          <div className="user_number_bar">
            <p>전체 회원 </p>
            <p>{ certUsrDescList.length }</p>
            <p>명[기업회원(유료) </p>
            <p>10,000</p>
            <p>명/기업회원(무료) </p>
            <p>10,000</p>
            <p>명/센터사업자</p>
            <p>10</p>
            <p>명]</p>
          </div>
        </div>
        <User_info_search 
          setReRenderStatus={setReRenderStatus}
          searchData={searchData}
          setSearchData={setSearchData}
          setCertUsrDescList={setCertUsrDescList}
        />
        <User_info_table 
          setReRenderStatus={setReRenderStatus}
          certPubList={certPubList}
          ttlCnt={ttlCnt}
          setContentNumPerPage={setContentNumPerPage}
          srchResultCnt={srchResultCnt}

          mbrType={mbrType}
          joinDtOrderGbn={joinDtOrderGbn}
          pageListNum={pageListNum}
          setMbrType={setMbrType}
          setJoinDtOrderGbn={setJoinDtOrderGbn}
          setPageListNum={setPageListNum}
        />
        {
          ttlCnt > 0 && srchResultCnt > 0 &&
          <Pagination 
          ttlRowsCnt={srchResultCnt}
          currPage={currPage}
          setCurrPage={setCurrPage}
          contentNumPerPage={contentNumPerPage}
          setReRend={setReRenderStatus}
        />
        }
      </div>
      </UserInfoContext.Provider>
    </React.Fragment>
  );
};

export default User_info;
export function useUserInfoContext() {
  return useContext(UserInfoContext);
}
