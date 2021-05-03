import React, { useEffect, useCallback, useRef } from "react";
import { useState } from "react";
import Dashboard_main_img from "./dashboard_main_img";
import Dashboard_act from "./dashboard_act";
import Dashboard_sales_data from "./dashboard_salse_data";
import Dashboard_production_activity from "./dashboard_production_activity";
// 이미지 import
import view_more from "../../../image/Center/Dashboard/view_more.png";

const Dashboard_v2 = () => {
  const [wise_Wide_List, setWise_Wide_List] = useState(
      {
      0: {
        id: "기업재무데이터 API",
        date: "2020.08.01.07.58",
        type: "WISE",
        title: "현재 기업재무데이터를 활용한 부도예측모형 진행 중입니다.",
        progress: 100,
      },
      1: {
        id: "세금데이터",
        date: "2020.08.01.18.12",
        type: "WIDE",
        title: "현재 세금데이터를 활용한 세금 계산 도우미 진행 중입니다.",
        progress: 80,
      },
      2: {
        id: "인사데이터",
        date: "2020.09.01.07.58",
        type: "WIDE",
        title: "현재 인사데이터를 활용한 인사관리 진행 중입니다.",
        progress: 60,
      },
      3: {
        id: "회계데이터",
        date: "2020.09.04.17.50",
        type: "WIDE",
        title: "현재 회계데이터를 활용한 회계 지원 도구 진행 중입니다.",
        progress: 40,
      },
    }
    ); //사용 API 배열

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <React.Fragment>
      <div id="content">
        <div className="container-fluid">
          {/* <Route exact path="/Main_page" component={Main_page}></Route> */}

          <div className="dashboard Data_center_dashboard">
            <div className="page_title_wrap home_title_wrap">
              <p className="page_title">HOME</p>
              <div className="page_title_btn">
                <p>Home</p>
                <img className="caption_img" src={view_more} />

                <p>Data Center</p>
              </div>
            </div>
            <Dashboard_main_img />
            <div className="max_w">
              <Dashboard_act wise_Wide_List={wise_Wide_List} setWise_Wide_List={setWise_Wide_List} />
              <Dashboard_production_activity />
              {wise_Wide_List.length !== 0 && <Dashboard_sales_data /> }
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard_v2;
