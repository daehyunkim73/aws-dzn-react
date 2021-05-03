import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import svccenter_create_icon from "../../../image/Center/Empty/svccenter_create_icon.png"

const Dashboard_main_img = (props) => {
  const { SvrData_posts } = props;
  const { Pluse_service_uploade_Click } = props;

  return (
    <React.Fragment>
      <div className="dashboard_box_wrap clearfix">
        <div className="create_btn dashboard_box svc_dashboard_create_box">
          <img src={svccenter_create_icon} onClick={Pluse_service_uploade_Click} className="svc_dashboard_create_btn" alt="svccenter_create_icon"/>
          <p>서비스 만들기</p>
        </div>
        {SvrData_posts.map(
          (svcData, cnt) =>
            cnt < 11 && (
              <Link to={`/svccenter/product/control/${svcData.pdsvc_idx}`}>
                <div
                  className={
                    svcData.stat === 1
                      ? "service_btn dashboard_box service_create_btn"
                      : svcData.stat === 2
                      ? "service_btn dashboard_box service_judge_btn"
                      : svcData.stat === 3
                      ? "service_btn dashboard_box service_judge_ok_btn"
                      : svcData.stat === 4
                      ? "service_btn dashboard_box service_judge_fail_btn"
                      : svcData.stat === 5
                      ? "service_btn dashboard_box service_sales_btn"
                      : svcData.stat === 6 &&
                        "service_btn dashboard_box service_salse_stop_btn"
                  }
                >
                  <p className="dashboard_box_main_text">{svcData.svc_title}</p>
                  <div className="dashboard_box_sub_text">
                    {svcData.stat === 1 ? (
                      <p>제작중</p>
                    ) : svcData.stat === 2 ? (
                      <p>심사중</p>
                    ) : svcData.stat === 3 ? (
                      <p>승인</p>
                    ) : svcData.stat === 4 ? (
                      <p>심사반려</p>
                    ) : svcData.stat === 5 ? (
                      <p>판매중</p>
                    ) : (
                      svcData.stat === 6 && <p>판매중지</p>
                    )}
                  </div>
                </div>
              </Link>
            )
        )}
      </div>
    </React.Fragment>
  );
};

export default Dashboard_main_img;
