import React, { useEffect, useState } from "react";
import Sales_data_management_list_search from "./components/Sales_data_management_list/Sales_data_management_list_search";
import Sales_data_management_list_table from "./components/Sales_data_management_list/Sales_data_management_list_table";
import { Server_ajax_post } from "../../../Server_ajax";

const Sales_data_management_list = () => {

  const [apprvlData, setApprvlData] = useState([]);
  const [defalutData, setDefalutData] = useState([]);
  const [searchData, setSearchData] = useState();
  const [rending, setRending] = useState(false);
  const [totalCnt, setTotalCnt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchClick, setSearchClick] = useState(false);
  const [typeCnt, setTypeCnt] = useState({
    total: 0, data: 0, statistics: 0, model: 0, report: 0  
  });

  // 데이터 불러오기
  useEffect(() => {
    const getData = async () => {
      try {
        const salesDataManagment = await Server_ajax_post("data_center_managment/salesDataManagment", {searchData});
        
        const resData = salesDataManagment;
        setTypeCnt({
          total: resData.length,
          data: resData.filter( data => data.data_Type === "D").length,
          statistics: resData.filter( data => data.data_Type === "T").length,
          model: resData.filter( data => data.data_Type === "M").length,
          report: resData.filter( data => data.data_Type === "R").length,
        })
        if(totalCnt === 0){
          setTotalCnt(resData.length);
        }
        setApprvlData(() => resData);
        setDefalutData(() => resData);        
        setLoading(true);
        setRending(false);
      } catch(e) {
        console.error(e);
      }
    }
    getData();    
  }, [rending===true])


  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <React.Fragment>
      <div className="sales_data_management_list_wrap">
        <div className="Page_same_text">
          <p className="backoffice_title">판매데이터 관리</p>
        </div>        
        <Sales_data_management_list_search setRending={setRending} searchData={searchData} setSearchData={setSearchData}/>
        <div className="sales_data_management_sub">
          <div>
            <p>전체</p>
            <p>{typeCnt.total}</p>
          </div>
          <div>
            <p>데이터</p>
            <p>{typeCnt.data}</p>
          </div>
          <div>
            <p>통계</p>
            <p>{typeCnt.statistics}</p>
          </div>
          <div>
            <p>모델</p>
            <p>{typeCnt.model}</p>
          </div>
          <div>
            <p>리포트</p>
            <p>{typeCnt.report}</p>
          </div>
        </div>
        {loading && <Sales_data_management_list_table searchClick={searchClick} setSearchClick={setSearchClick}  apprvlData={apprvlData} setApprvlData={setApprvlData} defalutData={defalutData} totalCnt={totalCnt} />}
      </div>
    </React.Fragment>
  );
};

export default Sales_data_management_list;
