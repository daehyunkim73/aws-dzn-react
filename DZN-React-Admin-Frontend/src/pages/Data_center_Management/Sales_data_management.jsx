import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Sales_data_management_basic_info from "./components/Sales_data_management/Sales_data_management_basic/Sales_data_management_basic_info";
import Sales_data_management_sales_info_search from "./components/Sales_data_management/Sales_data_management_sales_info/Sales_data_management_sales_info_search";
import Sales_data_management_sales_info_table from "./components/Sales_data_management/Sales_data_management_sales_info/Sales_data_management_sales_info_table";
import Sales_data_management_sale_detail from "./components/Sales_data_management/Sales_data_management_sale_info/data_sale_main";
import Sales_data_management_judge from "./components/Sales_data_management/Sales_data_management_judge/Sales_data_management_judge";

import Pagination from "../../Big_component/Pagination";

const Sales_data_management = () => {
  return (
    <React.Fragment>
      <div className="Sales_data_management_wrap">
        <div className="Page_same_text">
          <p className="backoffice_title">데이터 상세정보</p>
        </div>
        <div className="service_title_wrap">
          <div className="service_title_wrap_left">
            <div>
              전자세금계산서(홈택스에서 스크래핑한 매출, 매입 전자세금계산서)
              {/* <p className="create_badge">신규 제작</p> */}
              <p className="sales_badge">판매중</p>
              {/* <p className="sales_stop_badge">판매중지</p> */}
              {/* <p className="judge_ok_badge">승인</p> */}
              {/* <p className="judge_badge">승인요청</p> */}
              {/* <p className="judge_return_badge">반려</p> */}
              <p className="id_badge">한기업/datapotal</p>
            </div>
          </div>
        </div>
        <Tabs
          className="backoffice_tab_wrap"
          defaultActiveKey="basic"
          id="uncontrolled-tab-example"
        >
          <Tab
            eventKey="basic"
            title="기본정보"
            className="Sales_data_management_basic_tab_wrap"
          >
            <Sales_data_management_basic_info />
          </Tab>
          <Tab
            eventKey="sale"
            className="calculate_registration Data_Approved_management_sale_tab_wrap"
            title="판매정보"
          >
            <Sales_data_management_sale_detail />
          </Tab>
          <Tab
            eventKey="sales"
            className="calculate_registration"
            title="매출 정보"
          >
            <Sales_data_management_sales_info_search />
            <Sales_data_management_sales_info_table />
            <Pagination />
          </Tab>
          <Tab
            eventKey="judge"
            className="calculate_registration"
            title="승인 심사"
          >
            <Sales_data_management_judge />
          </Tab>
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default Sales_data_management;
