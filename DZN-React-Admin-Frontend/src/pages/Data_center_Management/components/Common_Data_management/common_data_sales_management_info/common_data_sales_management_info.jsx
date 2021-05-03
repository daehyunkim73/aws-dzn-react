import React, { useEffect, useState } from "react";
import CommonDataSalesManagementInfoSearch from "./common_data_sales_management_info_search";
import CommonDataSalesManagementInfoTable from "./common_data_sales_management_info_table";
import moment from "moment";
import dummyData from "./Sales_management_dummy_data.json";

const Common_data_sales_management_info = () => {
  const [salesData, setSalesData] = useState();
  const [searchData, setSearchData] = useState({ startDate: "", endDate: "" });
  const [loading, setLoading] = useState(false); // API 통해서 처리 했을 경우 사용
  const [rending, setRending] = useState(false);
  const [totalCnt, setTotalCnt] = useState(0);
  const [isSearch, setIsSearch] = useState(false);

  // 더미데이터로 처리
  useEffect(() => {
    const datas = dummyData.data;
    const { startDate, endDate } = searchData;

    const filterData = datas.filter((data, i) => {
      if (startDate === "" && endDate === "") return true;
      else
        return (
          startDate <= moment(data.date).format("YYYY-MM-DD") &&
          moment(data.date).format("YYYY-MM-DD") <= endDate
        );
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
      <CommonDataSalesManagementInfoSearch
        setSearchData={setSearchData}
        setRending={setRending}
        setIsSearch={setIsSearch}
      />
      {loading && (
        <CommonDataSalesManagementInfoTable
          salesData={salesData}
          totalCnt={totalCnt}
          isSearch={isSearch}
          setIsSearch={setIsSearch}
        />
      )}
    </React.Fragment>
  );
};

export default Common_data_sales_management_info;
