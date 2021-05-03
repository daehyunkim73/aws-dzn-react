import React, { useEffect, useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Calculate_management_search from "./components/Calculate_management/Calculate_management_search";
import Calculate_management_table from "./components/Calculate_management/Calculate_management_table";
import Calculate_entry from "./components/Calculate_management/Calculate_entry";
import moment from "moment";
import dummyData from "./components/CalculateData.json";
import { useUserInfo } from "../../Big_component/Admin_router";

const Calculate_management = () => {
  const {calculateTabVal} = useUserInfo();
  const [salesData, setSalesData] = useState();
  const [searchData, setSearchData] = useState({
    startDate: "",
    endDate: "",
    content: "",
  });
  const [loading, setLoading] = useState(false); // API 통해서 처리 했을 경우 사용
  const [rending, setRending] = useState(false);
  const [totalCnt, setTotalCnt] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  // 더미데이터로 처리
  useEffect(() => {
    const datas = dummyData.data;
    const { startDate, endDate, content } = searchData;

    const filterData = datas
      .filter((data, i) => {
        if (startDate === "" && endDate === "") return true;
        else
          return (
            startDate <= moment(data.Calculdate).format("YYYY-MM-DD") &&
            moment(data.Calculdate).format("YYYY-MM-DD") <= endDate
          );
      })
      .filter((d) => {
        if (content === "") {
          return true;
        } else {
          return d.name.indexOf(content) > -1;
        }
      });

    if (totalCnt === 0) {
      setTotalCnt(filterData.length);
    }

    filterData.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    setSalesData(() => filterData);
    setRending(false);
    setLoading(true);
  }, [rending === true]);
  // useEffect(() => {
  //     // 매출 데이터 받아 왔을 때 처리
  //     (async() => {
  //         try {

  //         } catch(e) {
  //             console.error(e);
  //         }
  //     })
  // }, [])
  return (
    <React.Fragment>
      <div className="Calculate_management_wrap">
        <div className="Page_same_text">
          <p className="backoffice_title">정산관리</p>
        </div>
        <Tabs
          className="backoffice_tab_wrap"
          defaultActiveKey={calculateTabVal}
          id="uncontrolled-tab-example"
        >
          <Tab eventKey="calculate_history" title="정산내역">
            <Calculate_management_search
              setSearchData={setSearchData}
              setRending={setRending}
              setIsSearch={setIsSearch}
            />
            {loading && (
              <Calculate_management_table
                salesData={salesData}
                totalCnt={totalCnt}
                isSearch={isSearch}
                setIsSearch={setIsSearch}
              />
            )}
          </Tab>
          <Tab
            eventKey="sale"
            className="calculate_registration"
            title="정산등록"
          >
            <Calculate_entry />
          </Tab>
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default Calculate_management;
