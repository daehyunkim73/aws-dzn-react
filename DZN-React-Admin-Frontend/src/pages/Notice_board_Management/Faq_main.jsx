import React, { useEffect, useState } from "react";
import Faq_table from "./components/FAQ/faq_table";
import Faq_header from "./components/FAQ/faq_header";
import { Server_ajax_post, Server_ajax_get } from "../../../Server_ajax";

const faq_main = () => {
  const [apprvlData, setApprvlData] = useState([]);
  const [defalutData, setDefalutData] = useState([]);
  const [searchData, setSearchData] = useState({});
  const [rending, setRending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchClick, setSearchClick] = useState(false);
  const [totalCnt, setTotalCnt] = useState(0);
  const [cateList, setCateList] = useState([]);

  // 데이터 불러오기
  useEffect(() => {
    const getData = async () => {
      try {
        const getInfo = await Server_ajax_post(
          "contents_management/faq_main_list",
          { searchData }
        );
        const cateGetInfo = await Server_ajax_get(
          "contents_management/faq_category_list"
        );
        if (totalCnt === 0) {
          setTotalCnt(getInfo.length);
        }
        setApprvlData(() => getInfo);
        setDefalutData(() => getInfo);
        setCateList(() => cateGetInfo);
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
      <div className="faq_main">
        <div className="Page_same_text">
          <p className="backoffice_title">FAQ</p>
        </div>
        <div className="faq_header_list_box">
          <Faq_header
            setRending={setRending}
            searchData={searchData}
            setSearchData={setSearchData}
          />
        </div>
        <div className="backoffice_table_wrap" id="big_admin_table_box">
          {
            <Faq_table
            searchClick={searchClick}
            setSearchClick={setSearchClick}
            apprvlData={apprvlData}
            setApprvlData={setApprvlData}
            defalutData={defalutData}
            totalCnt={totalCnt}
            cateList={cateList}
            setRending={setRending}
            />
          }
        </div>
      </div>
    </React.Fragment>
  );
};

export default faq_main;
