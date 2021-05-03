import React, { useState, useEffect } from "react";
import Infra_approved_management_search from "./components/Infra_approved_management/Infra_approved_management_search";
import Infra_approved_management_table from "./components/Infra_approved_management/Infra_approved_management_table";
import { Server_ajax_post } from "../../../Server_ajax";

const Infra_approved_management = () => {
  const [Svc_infra_popup_save_logic, setSvc_infra_popup_save_logic] = useState(
    false
  ); // 인프라 승인관리 팝업에서 저장 후 true로 변경
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
          "service_center_managment/getInfraInfo",
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
        setSvc_infra_popup_save_logic(false);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, [rending === true, Svc_infra_popup_save_logic]);

  // 최상위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <React.Fragment>
      <div className="Infra_approved_management_wrap">
        <div className="Page_same_text">
          <p className="backoffice_title">인프라 승인관리</p>
        </div>
        <Infra_approved_management_search
          setRending={setRending}
          searchData={searchData}
          setSearchData={setSearchData}
        />

        <Infra_approved_management_table
          searchClick={searchClick}
          setSearchClick={setSearchClick}
          apprvlData={apprvlData}
          setApprvlData={setApprvlData}
          defalutData={defalutData}
          totalCnt={totalCnt}
          Svc_infra_popup_save_logic={Svc_infra_popup_save_logic}
          setSvc_infra_popup_save_logic={setSvc_infra_popup_save_logic}
        />
      </div>
    </React.Fragment>
  );
};

export default Infra_approved_management;
