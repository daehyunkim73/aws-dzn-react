import React, { useEffect, useState } from "react";
import Table_middle from "../../../func_src/Table_middle";
import Notice_table from "./components/Notice/Notice_table";
import Notice_header from "./components/Notice/Notice_header";
import { Server_ajax_post } from "../../../Server_ajax";

const Notice_main = () => {
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
          "contents_management/notice_main_list",
          { searchData }
        );

        setTotalCnt(getInfo.length);
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
      <div className="Notice_information_wrap">
        <div className="Noice_big_box">
          <div className="Page_same_text">
            <p className="backoffice_title">공지사항</p>
          </div>
          <div className="admin_user_list_wrap" id="big_admin_headerText_box">
            <Notice_header
              setRending={setRending}
              searchData={searchData}
              setSearchData={setSearchData}
            />
          </div>

          <div className="backoffice_table_wrap" id="big_admin_table_box">
            <Notice_table
            setRending={setRending}
              searchClick={searchClick}
              setSearchClick={setSearchClick}
              apprvlData={apprvlData}
              setApprvlData={setApprvlData}
              defalutData={defalutData}
              totalCnt={totalCnt}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Notice_main;
