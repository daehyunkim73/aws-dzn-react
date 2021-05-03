import React, { useEffect, useState } from "react";
import Api_sales_management_search from "./components/Api_sales_management/Api_sales_management_search";
import Api_sales_management_table from "./components/Api_sales_management/Api_sales_management_table";
import moment from "moment";
import dummyData from "./components/api_info.json";
const Api_sales_management = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
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
        console.log("d", d);
        if (content === "") {
          return true;
        } else {
          return d.titile.indexOf(content) > -1 || d.name.indexOf(content) > -1;
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
      <div className="Api_sales_management_wrap">
        <div className="Page_same_text">
          <p className="backoffice_title">API 매출 관리</p>
        </div>
        <Api_sales_management_search
          setSearchData={setSearchData}
          setRending={setRending}
          setIsSearch={setIsSearch}
        />
        {loading && (
          <Api_sales_management_table
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

export default Api_sales_management;
