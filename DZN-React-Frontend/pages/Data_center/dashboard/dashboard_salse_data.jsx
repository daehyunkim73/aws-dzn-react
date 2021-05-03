import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';  //로그인 모듈
import Ajax from '../../../lib/ajax-3rd-custom'    //로그인 모듈
import { Server_ajax_post } from "../../../server_ajax";
import moment from 'moment'

// 이미지 import
import view_more from "../../../image/Center/Dashboard/view_more.png";
import more from "../../../image/Center/Dashboard/more.png";
import sales_info_icon_1 from "../../../image/Center/Dashboard/sales_info_icon_1.png";
import sales_info_icon_2 from "../../../image/Center/Dashboard/sales_info_icon_2.png";
import sales_info_icon_3 from "../../../image/Center/Dashboard/sales_info_icon_3.png";
import datacenter_sale_empty from "../../../image/Center/Empty/datacenter_sale_empty.png"

function table_middle() {
  const td = document.querySelectorAll("table td");
  for (let i = 0; i < td.length; i++) {
    td[i].classList.add("align-middle");
  }
  return td;
}

const dashboard_salse_data_v2 = () => {
  const [list, setList] = useState([]);    
  const [loading, setLoading] = useState(false);
  const [reRend, setReRend] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();  // 쿠키 정보 
  const globals = require("../../../lib/globals");   // API URL 정보
  const [dataStorageInfo, setDataStorageInfo] = useState([]);
  const [dataaWe_drive_api, setDataaWe_drive_api] = useState([]);


  useEffect(() => {
    (async function() {
      try{        
        const datas = {
          compNo: cookies.h_selected_company_no      
        };
        
        // 판매데이터 가져오기
        const result = await Server_ajax_post(`datacenter/getSaleDataList`,datas);
        if(result.length > 0){
        result.map((data) => {
            data.validValue = "1";
            data.detailID = data.pdbase_idx;

            switch(data.stat) {
              case "2": 
                data.validSubIcon = "sales_status sales_status1";
                data.validSubText = "심사중";
              break;
              case "3":
                data.validSubIcon = "sales_status sales_status3";
                data.validSubText = "승인";
              break;
              case "4":
                data.validSubIcon = "sales_status sales_status4";
                data.validSubText = "심사반려";
              break;
            }

            switch(data.sales_stat){
              case "5":
                data.validSalesIcon = "sales_status sales_status0";
                data.validSalesText = "판매중";
              break;
              case "6":
                data.validSalesIcon = "sales_status sales_status2";
                data.validSalesText = "판매정지";
              break;
            }
          })
        }        

        // 데이터 정렬
        const sortedData = getSortData(result, "desc");
                
        // 페이지 내 데이터 가져오기
        const pagenatdData = getPagenate(sortedData, 4, 1);        
        
        for (let i=0; i<pagenatdData.length; i++){
          // 댓글 카운트 조회
          const boardNo = pagenatdData[i].pdbase_idx;
          const mainUrl = `${globals.certApiUrl}/comment/getAllRootList?board_no=${boardNo}&comment_list=T`;
          const minApi = await Ajax.get(mainUrl);
          const mainData = await JSON.parse(minApi);
          
          if (mainData.resultCode === 200) {
            pagenatdData[i].commentCnt = mainData.resultData.count
          } 
        }

        setList(pagenatdData);
        setLoading(true);        
      } catch(e) {
        console.error(e);
      }
    })();    
    setReRend(false);
  },[reRend === true]);

  // 정렬
  const getSortData = (data, order) => {
    let sortedData = [];
    if (order === "asc") {
      sortedData = []
        .concat(data)
        .sort((a, b) =>
            moment(a.regDt).format('YYYY.MM.DD') -
            moment(b.regDt).format('YYYY.MM.DD')            
        );
    } else if (order === "desc") {
      sortedData = []
        .concat(data)
        .sort((a, b) =>
            moment(b.regDt).format('YYYY.MM.DD') -
            moment(a.regDt).format('YYYY.MM.DD')            
        );
    }
    return sortedData;
  };

  // 페이지 개수 가져오기
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


  useEffect(() => {
    table_middle();
    return () => {
      table_middle();
    };
  }, []);



  useEffect(() => {
    const cno = cookies.h_selected_company_no;
    const userId = cookies.h_portal_id;    
    const wide_left_api_url = globals.certApiUrl + '/wide/usage/?user_name=' + userId + '&cno=' + cno;
    const wide_right_api_url = globals.certApiUrl + '/wide/usage/storage/?user_name=' + userId + '&cno=' + cno;
    let wide_left_result_v = [];
    let wide_right_result_v = [];

    new Promise((res, rej) => {
      try {
        Ajax.get(wide_right_api_url).then((response) => {
          const result = JSON.parse(response);
          if (result.code === 200) {
            wide_right_result_v = result.data;
            res('succ')
          } else {            
            rej('ajx_fail')
          }
        })
      } catch (e) {
        return console.error(e)
      }
    })
      .then(() => {
        setDataaWe_drive_api(dataaWe_drive_api => [...dataaWe_drive_api, wide_right_result_v])
      })
      .catch((e) => {
        console.error(e);

      })

    new Promise((res, rej) => {
      try {
        Ajax.get(wide_left_api_url).then(function (response) {
          let result2 = JSON.parse(response);
          if (result2.code == 200) {
            wide_left_result_v = result2.data
            res('ajax_succ')
          } else {            
            rej('ajx_fail')
          }
        }
          .bind(this), function (error) {
            console.error("Failed!", error);
            alert(error);
          }
            .bind(this), function () {
            });
      }
      catch (e) {
        console.error(e);
        return rej('ajx_faile');
      }
    })
      .then(() => {        
        setDataStorageInfo(dataStorageInfo => [...dataStorageInfo, wide_left_result_v])
      })
      .catch((e) => {
        return console.error(e);
      })
  }, [])

  useEffect(()=>{
    if(dataStorageInfo && dataaWe_drive_api && dataStorageInfo.length !== 0 && dataaWe_drive_api.length !== 0){
      const wide_user_graph = parseFloat((dataStorageInfo[0].user_info.user_registered/dataStorageInfo[0].user_info.user_limit) * 100);
      const wide_ram_graph = parseFloat((dataStorageInfo[0].resource_info.ram_usage/dataStorageInfo[0].resource_info.ram_limit) * 100);
      const wide_cpu_graph = parseFloat((dataStorageInfo[0].resource_info.cpu_usage/dataStorageInfo[0].resource_info.cpu_limit) * 100);
      const wide_storage_graph = parseFloat((dataaWe_drive_api[0].storage_info.storage_usage/dataaWe_drive_api[0].storage_info.storage_limit) * 100);
      document.querySelector(".activity_graph1_wide span").style.width = wide_user_graph + "%";
      document.querySelector(".activity_graph2_wide span").style.width = wide_ram_graph + "%";
      document.querySelector(".activity_graph3_wide span").style.width = wide_cpu_graph + "%";
      document.querySelector(".pie_chart_wide").style.background = `conic-gradient(#00a7ff 0% ${wide_storage_graph+"%"}, #eaeaea 0% 100%)`;
      // console.log(`conic-gradient(#00a7ff 0%, ${wide_storage_graph}% #eaeaea 50% 100%)`);
    }
  },[dataStorageInfo, dataaWe_drive_api])

  return (
    <React.Fragment>
      <div className="sub_wrap data_sub_wrap clearfix">
        <div className="use_info_wrap">
          <div className="wrap_title clearfix">
            <p>WIDE 사용현황</p>
            <div className="act_arrow">
              <p>바로가기</p>
              <img className="act_arrow_img" src={view_more} alt="right" />
            </div>
          </div>
          <div className="use_info_box">

            <div className="use_info">
              { dataStorageInfo.length !== 0 ?
                dataStorageInfo.map((item, idx) => {
                  return (
                    <div className="use_progress" key={idx}>
                      <div className="working_activity_graph">
                        <p className="graph_title">사용자수</p>
                        <p className="working_activity_graph_number">{item.user_info.user_registered}명/{item.user_info.user_limit}명</p>
                        <div className="activity_graph1 activity_graph1_wide">
                          <span>&nbsp;</span>
                        </div>
                      </div>
                      <div className="working_activity_graph">
                        <p className="graph_title">RAM</p>
                        <p className="working_activity_graph_number">{item.resource_info.ram_usage}GB/{item.resource_info.ram_limit}GB</p>
                        <div className="activity_graph2 activity_graph2_wide">
                          <span>&nbsp;</span>
                        </div>
                      </div>
                      <div className="working_activity_graph">
                        <p className="graph_title">CPU</p>
                        <p className="working_activity_graph_number">
                          {item.resource_info.cpu_usage}CORE/{item.resource_info.cpu_limit}CORE</p>
                        <div className="activity_graph3_wide">
                          <span>&nbsp;</span>
                        </div>
                      </div>
                    </div>
                  )
                }) 
                
                : 
                <div className="use_progress">
                      <div className="working_activity_graph">
                        <p className="graph_title">사용자수</p>
                        <p className="working_activity_graph_number">0명/0명</p>
                        <div className="activity_graph1 activity_graph1_wide">
                          <span>&nbsp;</span>
                        </div>
                      </div>
                      <div className="working_activity_graph">
                        <p className="graph_title">RAM</p>
                        <p className="working_activity_graph_number">0GB/0GB</p>
                        <div className="activity_graph2 activity_graph2_wide">
                          <span>&nbsp;</span>
                        </div>
                      </div>
                      <div className="working_activity_graph">
                        <p className="graph_title">CPU</p>
                        <p className="working_activity_graph_number">
                          0CORE/0CORE</p>
                        <div className="activity_graph3_wide activity_graph3_wide">
                          <span>&nbsp;</span>
                        </div>
                      </div>
                    </div>
              }

              { dataaWe_drive_api.length !== 0 ?
              dataaWe_drive_api.map((item, idx) => {
                return (
                  <div className="pie_graph" key={idx}>
                     <div className="pie_title">
                       개인WE드라이브
                         <br />
                         ({item.storage_info.storage_usage} KB/{item.storage_info.storage_limit} GB)
                     </div>
                     <div className="pie_cont">

                    <div className="pie_chart pie_chart_wide">
                      <span className="pie_chart_whitebox">{parseFloat((item.storage_info.storage_usage/item.storage_info.storage_limit) * 100)}%</span>
                      </div>
                     </div>
                  </div>
                )
              }) :
                  <div className="pie_graph">
                     <div className="pie_title">
                       개인WE드라이브
                         <br />
                         0KB/0GB)
                     </div>
                     <div className="pie_cont">

                    <div className="pie_chart pie_chart_wide">
                      <span className="pie_chart_whitebox">0%</span>
                      </div>
                     </div>
                  </div> 
              }
              </div>
            </div>

          <div className="wrap_title clearfix">
            <p>WISE 사용현황</p>
            <div className="act_arrow">
              <p>바로가기</p>
              <img className="act_arrow_img" src={view_more} alt="right" />
            </div>
          </div>
          <div className="use_info_box">
            <div className="use_info">
              <div className="use_progress">
                <div className="working_activity_graph">
                  <p className="graph_title">사용자수</p>
                  <p className="working_activity_graph_number">20명/20명</p>
                  <div className="activity_graph1 activity_graph1_wise">
                    <span>&nbsp;</span>
                  </div>
                </div>
                <div className="working_activity_graph">
                  <p className="graph_title">RAM</p>
                  <p className="working_activity_graph_number">50GB/256GB</p>
                  <div className="activity_graph2 activity_graph2_wise">
                    <span>&nbsp;</span>
                  </div>
                </div>
                <div className="working_activity_graph">
                  <p className="graph_title">CPU</p>
                  <p className="working_activity_graph_number">
                    76CORE/128CORE
                  </p>
                  <div className="activity_graph3_wide">
                    <span>&nbsp;</span>
                  </div>
                </div>
              </div>
              <div className="pie_graph">
                <div className="pie_title">
                  개인WE드라이브
                  <br />
                  (149.6 KB/50 GB)
                </div>
                <div className="pie_cont">
                  <div className="donut-chart">
                    <div className="pie_chart1 portion-block">
                      <div className="circle"></div>
                    </div>
                    <p className="center_chart">57%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sales_data_wrap">
          <div className="wrap_title clearfix">
            <p>판매 데이터</p>
            <Link to="/datacenter/saledata">
              <div className="act_arrow">
                <p>더보기</p>
                <img className="act_arrow_img" src={more} alt="more" />
              </div>
            </Link>
          </div>
          {loading &&
          <div className="sales_info_box">
            {
              list.length !== 0 ? ( list.map((listItem, idx) => {                
                return (                  
                  <div className="sales_info" key={idx}>
                    <div className="info_text clearfix">
                      <p className="sales_info_title dc_dashboard_sale_text">
                        {listItem.data_title}
                      </p>
                      <div className="sales_info_i1 clearfix">
                        {/* 상태: 구매완료-0, 제작중-1, 심사중-2, 승인-3, 심사반려-4, 판매중-5, 판매정지-6 */}
                        <p className={`${listItem.validSalesIcon}`}>{listItem.sales_stat === "5" ? '판매중' : '판매중지'}</p>
                        <p className={`${listItem.validSubIcon}`}>{listItem.stat === "2" ? '심사중' : listItem.stat === "3" ? '승인' : '심사반려'}</p>                        
                      </div>
                      <div className="sales_info_i2 clearfix">
                        <div>
                          <img src={sales_info_icon_1} />
                          <p>{listItem.viewCnt}</p>
                        </div>
                        <div>
                          <img src={sales_info_icon_2} />
                          <p>200(유료)</p>
                        </div>
                        <div>
                          <img src={sales_info_icon_3} />
                          <p>{listItem.commentCnt}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }) )
               : 
               (
                <div className="datacenter_sale_empty">
                  <div>
                    <img src={datacenter_sale_empty} alt=""/>
                    <p>판매중인 데이터가 없습니다.</p>
                  </div>
               </div>
               )
               
            }
          </div>
          }
      </div>

      </div>
    </React.Fragment>
  );
};

export default dashboard_salse_data_v2;
