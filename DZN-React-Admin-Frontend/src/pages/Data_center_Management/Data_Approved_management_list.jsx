import React, { useEffect, useState } from "react";
import Data_Approved_management_list_search from "./components/Data_Approved_management_list/Data_Approved_management_list_search";
import Data_Approved_management_list_table from "./components/Data_Approved_management_list/Data_Approved_management_list_table";
import { Server_ajax_post } from "../../../Server_ajax";

const Data_Approved_management_list = () => {
  const [apprvlData, setApprvlData] = useState([]);
  const [defalutData, setDefalutData] = useState([]);
  const [searchData, setSearchData] = useState({});
  const [rending, setRending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchClick, setSearchClick] = useState(false);
  const [totalCnt, setTotalCnt] = useState(0);

  // 데이터 불러오기
  useEffect(() => {
    const getData = async () => {
      try {
        const dataApprvlManagment = await Server_ajax_post(
          "data_center_managment/dataApprvlManagment",
          { searchData }
        );

        if (totalCnt === 0) {
          setTotalCnt(dataApprvlManagment.length);
        }
        setApprvlData(() => dataApprvlManagment);
        setDefalutData(() => dataApprvlManagment);
        setRending(false);
        setLoading(true);
        setSearchClick(true);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, [rending === true]);

  // 최상위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <React.Fragment>
      <div className="Data_Approved_management_list_wrap">
        <div className="Page_same_text">
          <p className="backoffice_title">데이터 승인관리</p>
        </div>
        <Data_Approved_management_list_search
          setRending={setRending}
          searchData={searchData}
          setSearchData={setSearchData}
        />
        {loading && (
          <Data_Approved_management_list_table
            searchClick={searchClick}
            setSearchClick={setSearchClick}
            apprvlData={apprvlData}
            setApprvlData={setApprvlData}
            defalutData={defalutData}
            totalCnt={totalCnt}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default Data_Approved_management_list;
