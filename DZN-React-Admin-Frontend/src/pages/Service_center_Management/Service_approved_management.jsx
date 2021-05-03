import React, { useEffect, useState } from "react";
import Service_approved_management_search from "./components/Service_approved_management/Service_approved_management_search";
import Service_approved_management_table from "./components/Service_approved_management/Service_approved_management_table";
import { Server_ajax_post } from "../../../Server_ajax";

const Service_approved_management = () => {
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
        const getInfo = await Server_ajax_post(
          "service_center_managment/getSvcInfo",
          { searchData }
        );

        if (totalCnt === 0) {
          setTotalCnt(getInfo.length);
        }
        setApprvlData(() => getInfo);
        setDefalutData(() => getInfo);
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
      <div className="Service_approved_management_wrap">
        <div className="Page_same_text">
          <p className="backoffice_title">서비스 승인관리</p>
        </div>
        <Service_approved_management_search
          setRending={setRending}
          searchData={searchData}
          setSearchData={setSearchData}
        />
        <Service_approved_management_table
          searchClick={searchClick}
          setSearchClick={setSearchClick}
          apprvlData={apprvlData}
          setApprvlData={setApprvlData}
          defalutData={defalutData}
          totalCnt={totalCnt}
        />
      </div>
    </React.Fragment>
  );
};

export default Service_approved_management;
