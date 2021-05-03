import React, { useEffect, useState } from "react";
import Data_sales_management_search from "./components/Data_sales_management/Data_sales_management_search";
import Data_sales_management_table from "./components/Data_sales_management/Data_sales_management_table";
import dummyData from "./components/Data_sales_management/Data_sales_management_dummy_data.json";
import moment from "moment";

const Data_sales_management = () => {
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
            startDate <= moment(data.date).format("YYYY-MM-DD") &&
            moment(data.date).format("YYYY-MM-DD") <= endDate
          );
      })
      .filter((d) => {
        if (content === "") {
          return true;
        } else {
          return d.title.indexOf(content) > -1 || d.name.indexOf(content) > -1;
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
      <div className="data_sales_management_wrap">
        <div className="Page_same_text">
          <p className="backoffice_title">데이터 매출관리</p>
        </div>
        <Data_sales_management_search
          setSearchData={setSearchData}
          setRending={setRending}
          setIsSearch={setIsSearch}
        />
        {loading && (
          <Data_sales_management_table
            salesData={salesData}
            totalCnt={totalCnt}
            isSearch={isSearch}
            setIsSearch={setIsSearch}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default Data_sales_management;
