import React, { useEffect, useState } from "react";
import Sales_Service_management_list_search from "./components/Sales_Service_management_list/Sales_Service_management_list_search";
import Sales_Service_management_list_table from "./components/Sales_Service_management_list/Sales_Service_management_list_table";
import { Server_ajax_post } from "../../../Server_ajax";

const Sales_Service_management_list = () => {
  const [apprvlData, setApprvlData] = useState([]);
  const [defalutData, setDefalutData] = useState([]);
  const [searchData, setSearchData] = useState();
  const [rending, setRending] = useState(false);
  const [totalCnt, setTotalCnt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchClick, setSearchClick] = useState(false);
  const [typeCnt, setTypeCnt] = useState([]);

  // 데이터 불러오기
  useEffect(() => {
    const getData = async () => {
      try {
        const salesDataManagment = await Server_ajax_post(
          "service_center_managment/getSvcSaleInfo",
          { searchData }
        );

        const resData = salesDataManagment;
        setTypeCnt(
          resData.reduce((item, obj) => {
            let objectFound;
            if (
              (objectFound = item.find(
                (arrItem) => arrItem.svc_cate === obj.svc_cate
              ))
            ) {
              objectFound.cateCnt++;
            } else {
              obj.cateCnt = 1;
              item.push(obj);
            }
            return item;
          }, [])
        );

        if (totalCnt === 0) {
          setTotalCnt(resData.length);
        }
        setApprvlData(() => resData);
        setDefalutData(() => resData);
        setLoading(true);
        setRending(false);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, [rending === true]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <React.Fragment>
      <div className="Sales_Service_management_list_wrap">
        <div className="Page_same_text">
          <p className="backoffice_title">판매서비스 승인관리</p>
        </div>
        <Sales_Service_management_list_search
          setRending={setRending}
          searchData={searchData}
          setSearchData={setSearchData}
        />
        <div className="sales_data_management_sub">
          <div>
            <p>전체</p>
            <p>{totalCnt}</p>
          </div>
          {typeCnt.map((item, cnt) => {
            return (
              <div key={cnt}>
                <p>{item.svc_cate}</p>
                <p>{item.cateCnt}</p>
              </div>
            );
          })}
        </div>
        {
          loading && 
          <Sales_Service_management_list_table
            searchClick={searchClick}
            setSearchClick={setSearchClick}
            apprvlData={apprvlData}
            setApprvlData={setApprvlData}
            defalutData={defalutData}
            totalCnt={totalCnt}
          />
        }
      </div>
    </React.Fragment>
  );
};

export default Sales_Service_management_list;
