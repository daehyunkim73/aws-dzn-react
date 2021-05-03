import React, { useState, useCallback } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Data_app_first from "../../../image/Dev_Center/DashBoard/Section_Img/data_app_first.png";
import { useEffect } from "react";
import { usesettingContext } from "./Authority_setting";
import { Server_ajax_post } from "../../../server_ajax";

const Authority_setting_detail_first = () => {
  const {
    originalSvcData,
    setOriginalSvcData,
    authInfo,
    setAuthInfo,
    setAuthorityLogic,
    authorityLogic,
    setPrdSelect,
    originalPrdData,
    menuList,
    selectMenu,
    selectDev,
    selectSvc,
    svcClassify,
    setSvcClassify,
    devClassify,
    setDevClassify,
    menuClassify,
    setMenuClassify,
  } = usesettingContext();

  return (
    <React.Fragment>
      <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
        <Tab eventKey="all" title="메뉴권한설정">
          <div>
            {menuList.map((menu) => (
              <div
                className={
                  menuClassify === menu.menu_code
                    ? "select_all_authority select_all_authority_active"
                    : "select_all_authority"
                }
                key={menu.menu_code}
                onClick={() => {
                  selectMenu(menu.menu_code);
                }}
              >
                <p>{menu.menu_name}</p>
              </div>
            ))}
          </div>
        </Tab>
        <Tab eventKey="data" title="데이터권한설정">
          <div>
            {originalPrdData.map((dataPrd) => (
              <div
                className={
                  devClassify === dataPrd.pdbase_idx
                    ? "select_all_authority select_all_authority_active"
                    : "select_all_authority"
                }
                key={dataPrd.pdbase_idx}
                onClick={() => {
                  selectDev(dataPrd.pdbase_idx);
                }}
              >
                <p>{dataPrd.data_title}</p>
                <span>
                  {dataPrd.data_Type === "D"
                    ? "데이터"
                    : dataPrd.data_Type === "T"
                    ? "통계"
                    : dataPrd.data_Type === "M"
                    ? "모델"
                    : dataPrd.data_Type === "R" && "리포트"}
                </span>
              </div>
            ))}
          </div>
        </Tab>
        <Tab eventKey="service" title="서비스권한설정">
          <div>
            {originalSvcData.map((svcData) => (
              <div
                className={
                  svcClassify === svcData.pdsvc_idx
                    ? "select_all_authority select_service_authority select_all_authority_active"
                    : "select_all_authority select_service_authority"
                }
                key={svcData.pdsvc_idx}
                onClick={() => {
                  selectSvc(svcData.pdsvc_idx);
                }}
              >
                {svcData.iconPath !== null ? (
                  <img
                    src={`http://localhost:8081/${svcData.iconPath}`}
                    alt=""
                  />
                ) : (
                  <img src={Data_app_first} alt="" />
                )}
                <p>{svcData.svc_title}</p>
              </div>
            ))}
          </div>
        </Tab>
      </Tabs>
    </React.Fragment>
  );
};

export default Authority_setting_detail_first;
