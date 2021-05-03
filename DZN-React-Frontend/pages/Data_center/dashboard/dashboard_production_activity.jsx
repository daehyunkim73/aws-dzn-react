import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie"; //로그인 모듈
import Ajax from "../../../lib/ajax-3rd-custom"; //로그인 모듈
import { Server_ajax_get } from "../../../server_ajax";
import moment from 'moment';

// 이미지 import
import production_activity1 from "../../../image/Center/Dashboard/production_activity1.png";
import production_activity2 from "../../../image/Center/Dashboard/production_activity2.png";
import production_activity3 from "../../../image/Center/Dashboard/production_activity3.png";
import report from "../../../image/Data_Center/Purchase_create_data_list/report.png";
import user_add from "../../../image/Center/Dashboard/user_add.png";
import more from "../../../image/Center/Dashboard/more.png";
import datacenter_sales_data_empty from "../../../image/Center/Empty/datacenter_sales_data_empty.png";


const dashboard_production_activity = () => {
  const [list, setList] = useState([]);  
  const [tempData, setTempData] = useState([]);  
  const [loading, setLoading] = useState(false);  
  const [cookies, setCookie, removeCookie] = useCookies(); //로그인 모듈
  const globals = require("../../../lib/globals"); //로그인 모듈

  useEffect(() => {
    (async function () {
      try {                
        const compNo = cookies.h_selected_company_no;                
        const axios_host = await Server_ajax_get(`datacenter/purchase_create_data_lists?compNo=${compNo}`);        
        let array = [];

        axios_host && axios_host.filter((item) => {
          return item.stat === "1" || item.stat === "2" || item.stat === "3" || item.stat === "4"
        }).map((result) => {
          result.validValue = "1";
          result.detailID = result.pdbase_idx;         
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
                  pdbase_idx: '',  data_title: '', data_cate: '', data_Type: '', stat: '',
                  valid: '', validValue: '', detailID: '', regDt: '',
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
                reutnData.pdbase_idx = `${idx}`;
                reutnData.detailID =  `${idx}`;                
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
                } else {
                  reutnData.valid = 'N';
                  reutnData.validValue = '0';
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
          const newData = tempData.concat([...axios_host, ...result]);
          
          // 등록일 기준 재정렬
          const sortedData = getSortData(newData);
          setTempData(newData);            
  
          // 페이지
          const pagenatdData = getPagenate(sortedData, 4, 1);
          
          setList(() => pagenatdData);
          setLoading(true);
        })
          
        // 실패시
        apiData.catch(e => {
          throw new Error(`API Error: ${e}`);
        })          
                    
      } catch (e) {
          return console.error(`Error: ${e}`);
      }
    })();    
  }, []);

  // 정렬 함수
  const getSortData = (data) => {
    return data.sort((a, b) =>            
      moment(b.regDt).format('YYYYMMDD') - moment(a.regDt).format('YYYYMMDD')      
    );    
  };

  // 페이지 네이션 함수
  const getPagenate = (data, contentNumPerPage, pageNum) => {
    let arrPagedData = [];    
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

  // 구매 상태에 따른 UI
  const getProductionState = (state) => {
    switch(state) {
      case "0":
        return (
          <span className="dc_purchasedata_icon dc_purchasedata_icon_buy">
            구매 완료 
          </span>
        )
      default: 
        return (
          <span className="dc_purchasedata_icon dc_purchasedata_icon_new">
            신규 제작
          </span>
        )
    }       
  };

  const getState = (listItem) => {
    let validIcon = "";              
    if (listItem.stat === "0") {
      if (listItem.validValue === "1") {
        validIcon = (
          <span className="dc_purchasedata_icon dc_purchasedata_icon_effective">
            사용가능
          </span>
        );
      } else if (listItem.validValue === "0") {
        validIcon = (
          <span className="dc_purchasedata_icon dc_purchasedata_icon_not_valid">
            사용불가
          </span>
        );
      }
    } else {
      //상태: 구매완료-0, 제작중-1, 심사중-2, 승인-3, 심사반려-4
      if(listItem.stat === "1") {
        validIcon = (
          <span className="dc_purchasedata_icon dc_purchasedata_icon_production">
            제작 중
          </span>
        )
      } else if (listItem.stat === "2") {
        validIcon = (
          <span className="dc_purchasedata_icon dc_purchasedata_icon_judge">
            심사 중
          </span>
        )
      } else if (listItem.stat === "3") {
        validIcon = (
          <span className="dc_purchasedata_icon dc_purchasedata_icon_approval">
            승인
          </span>
        )
      } else {
        validIcon = (
          <span className="dc_purchasedata_icon dc_purchasedata_icon_companion">
            심사반려
          </span>
        )
      }
    }
    return validIcon;
  }

  return (
    <React.Fragment>
      <div className="act_title create_act_title clearfix">
        <p>구매 제작 데이터</p>
        {list.length !== 0 &&
        <Link to="/datacenter/purchasedata">
          <div className="act_arrow">
            <p>더보기</p>
            <img className="act_arrow_img" src={more} alt="more" />
          </div>
        </Link>}
      </div>
      {loading === true &&
      <div className="dc_home_purchasedata_wrap">
        {list.length !== 0 ? (
          loading &&
          list.map((listItem, idx) => {
            return (
              <div className="dc_purchasedata_wrap" key={idx}>
                <div className="dc_purchasedata_first_wrap">
                  <div className="dc_purchasedata_icon_wrap">
                    {getProductionState(listItem.stat)}
                    {getState(listItem)}
                  </div>
                  <div className="dc_purchasedata_content">
                    <p className="dc_purchasedata_title">
                      {listItem.data_title}
                    </p>
                    <p className="dc_purchasedata_date_wrap">
                      구매일 :
                      <span className="dc_purchasedata_date">
                        {moment(listItem.regDt).format("YYYY-MM-DD")}
                      </span>
                    </p>
                  </div>
                  {(listItem.data_Type === "D" && (
                    <div className="dc_purchasedata_category_wrap dc_purchasedata_category_data">
                      <div className="dc_purchasedata_category ">
                        <img src={production_activity1} alt="데이터" />
                        <p>데이터</p>
                      </div>
                    </div>
                  )) ||
                    (listItem.data_Type === "T" && (
                      <div className="dc_purchasedata_category_wrap dc_purchasedata_category_statistics">
                        <div className="dc_purchasedata_category ">
                          <img src={production_activity2} alt="통계" />
                          <p>통계</p>
                        </div>
                      </div>
                    )) ||
                    (listItem.data_Type === "M" && (
                      <div className="dc_purchasedata_category_wrap dc_purchasedata_category_model">
                        <div className="dc_purchasedata_category ">
                          <img src={production_activity3} alt="모델" />
                          <p>모델</p>
                        </div>
                      </div>
                    )) ||
                    (listItem.data_Type === "R" && (
                      <div className="dc_purchasedata_category_wrap dc_purchasedata_category_report">
                        <div className="dc_purchasedata_category ">
                          <img src={report} alt="리포트" />
                          <p>리포트</p>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="dc_purchasedata_second_wrap">
                  <div className="dc_purchasedata_second_top">
                    <div className="dc_purchasedata_time_wrap">
                      <p className="dc_purchasedata_time">2020.02.01 00:00</p>
                    </div>
                    <div className="dc_purchasedata_user_add_btn">
                      <Link to="/setting/authority">
                        <img src={user_add} alt="user_add" />
                      </Link>
                    </div>
                  </div>
                  <div className="dc_purchasedata_second_bottom">
                    <div className="dc_purchasedata_name_wrap">
                      <p className="dc_purchasedata_name">관리자</p>
                    </div>
                    <div className="dc_purchasedata_text_wrap">
                      <p className="dc_purchasedata_text">사용자 추가</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="data_center_act_empty data_center_act_empty_production">
            <div className="data_center_act_empty_left">
              <img src={datacenter_sales_data_empty} alt="datacenter_sales_data_empty" />
              <p>
                구매 또는 제작 중인 데이터가 없습니다.
              </p>
            </div>
            <div className="data_center_act_empty_production_btn">
              <button>데이터 유통포털 바로가기</button>
            </div>
          </div>
        )}
      </div>
    }
    </React.Fragment>
  );
};

export default dashboard_production_activity;
