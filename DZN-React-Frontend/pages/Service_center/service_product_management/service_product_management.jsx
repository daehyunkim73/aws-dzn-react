import React, { useEffect, useState, useCallback } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Service_product_box from "./service_product_box";
import view_more from "../../../image/Center/Dashboard/view_more.png";
import Axios from "axios";
import Service_uploade_list_Page_popup from "../../popup/Middle/Service_uploade_list_page_popup";
import Service_delete_popup_v2 from "../../popup/Small_popup/Service_delete_popup_v2";
import Service_delete_popup_v1 from "../../popup/Small_popup/Service_delete_popup_v1";
import { Server_ajax_get, Server_ajax_post } from "../../../server_ajax";
const Service_product_management = (props) => {
  const [save_logic, setSave_logic] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [SvrData_posts, setSvrData_posts] = useState([]);
  const [dataLogic, setDataLogic] = useState(false);
  const [pullidx, setPullidx] = useState();
  const [pulltitle, setPulltitle] = useState();
  //서비스상품 상태에 따른 state
  const [tabLogic, setTabLogic] = useState("");

  useEffect(() => {
    (async function () {
      try {
        const result = await Server_ajax_get("svccenter/Service_product_list");
        setOriginalData(result);
        tabLogic === "" || tabLogic === 0
          ? setSvrData_posts(result)
          : console.log("");
        setDataLogic(true);
        setSave_logic(false);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, [save_logic === true]);

  useEffect(() => {
    console.log("SvrData_posts", SvrData_posts);
    window.scrollTo(0, 0);
  });
  const tabHandleClick = useCallback((eventKey) => {
    if (eventKey === "creating") {
      setTabLogic(1);
    } else if (eventKey === "all") {
      setTabLogic(0);
    } else if (eventKey === "under_review") {
      setTabLogic(2);
    } else if (eventKey === "judge_ok") {
      setTabLogic(3);
    } else if (eventKey === "judge_return") {
      setTabLogic(4);
    } else if (eventKey === "sale") {
      setTabLogic(5);
    } else if (eventKey === "end_of_sale") {
      setTabLogic(6);
    }
  });

  useEffect(() => {
    if (tabLogic === 0) {
      setSvrData_posts([]);
      setSvrData_posts(originalData);
    } else if (tabLogic === 1) {
      setSvrData_posts([]);
      originalData
        .filter((x) => {
          return x.stat === 1;
        })
        .map((c) => {
          setSvrData_posts((SvrData_posts) => [...SvrData_posts, c]);
        });
    } else if (tabLogic === 2) {
      setSvrData_posts([]);
      originalData
        .filter((x) => {
          return x.stat === 2;
        })
        .map((c) => {
          setSvrData_posts((SvrData_posts) => [...SvrData_posts, c]);
        });
    } else if (tabLogic === 3) {
      setSvrData_posts([]);
      originalData
        .filter((x) => {
          return x.stat === 3;
        })
        .map((c) => {
          setSvrData_posts((SvrData_posts) => [...SvrData_posts, c]);
        });
    } else if (tabLogic === 4) {
      setSvrData_posts([]);
      originalData
        .filter((x) => {
          return x.stat === 4;
        })
        .map((c) => {
          setSvrData_posts((SvrData_posts) => [...SvrData_posts, c]);
        });
    } else if (tabLogic === 5) {
      setSvrData_posts([]);
      originalData
        .filter((x) => {
          return x.stat === 5;
        })
        .map((c) => {
          setSvrData_posts((SvrData_posts) => [...SvrData_posts, c]);
        });
    } else if (tabLogic === 6) {
      setSvrData_posts([]);
      originalData
        .filter((x) => {
          return x.stat === 6;
        })
        .map((c) => {
          setSvrData_posts((SvrData_posts) => [...SvrData_posts, c]);
        });
    }
  }, [tabLogic, save_logic === true]);

  const Pluse_service_uploade_Click = () => {
    const Service_uploade = document.getElementById(
      "ServiceCenter_uploade_list_Page_popup_bgk"
    );
    Service_uploade.style.display = "table";
  };

  const moveDetailPage = (stat, idx, titile) => {
    setPullidx(idx);
    setPulltitle(titile);
    if (stat === 2 || stat === 5) {
      const Service_delete_popup_v2 = document.getElementById(
        "Service_delete_popup_v2"
      );
      Service_delete_popup_v2.style.display = "table";
    } else {
      const Service_delete_popup_v1 = document.getElementById(
        "Service_delete_popup_v1"
      );
      Service_delete_popup_v1.style.display = "table";
    }
  };
  return (
    <React.Fragment>
      <Service_uploade_list_Page_popup setSave_logic={setSave_logic} />{" "}
      <Service_delete_popup_v1
        pullidx={pullidx}
        pulltitle={pulltitle}
        setSave_logic={setSave_logic}
      />{" "}
      {/* 이미지 x클릭시 뜨는 팝업 */}
      <Service_delete_popup_v2 pulltitle={pulltitle} />
      <div className="service_product_management">
        <div className="page_title_wrap">
          <p className="page_title">제작 서비스 관리</p>
          <div className="page_title_btn">
            <p>Home</p>
            <img className="caption_img" src={view_more} />
            <p>Service Center</p>
            <img className="caption_img" src={view_more} />
            <p>제작 서비스 관리</p>
          </div>
        </div>
        <div className="max_w">
          <Tabs
            defaultActiveKey="all"
            id="uncontrolled-tab-example"
            onSelect={tabHandleClick}
          >
            <Tab eventKey="all" title="전체">
              {dataLogic === true && (
                <Service_product_box
                  dataLogic={dataLogic}
                  save_logic={save_logic}
                  setSave_logic={setSave_logic}
                  setSvrData_posts={setSvrData_posts}
                  SvrData_posts={SvrData_posts}
                  Pluse_service_uploade_Click={Pluse_service_uploade_Click}
                  moveDetailPage={moveDetailPage}
                />
              )}
            </Tab>
            <Tab eventKey="creating" className="sale_info" title="제작 중">
              {dataLogic === true && (
                <Service_product_box
                  save_logic={save_logic}
                  setSave_logic={setSave_logic}
                  setSvrData_posts={setSvrData_posts}
                  SvrData_posts={SvrData_posts}
                  Pluse_service_uploade_Click={Pluse_service_uploade_Click}
                  moveDetailPage={moveDetailPage}
                />
              )}
            </Tab>
            <Tab eventKey="under_review" title="심사 중">
              {dataLogic === true && (
                <Service_product_box
                  save_logic={save_logic}
                  setSave_logic={setSave_logic}
                  setSvrData_posts={setSvrData_posts}
                  SvrData_posts={SvrData_posts}
                  Pluse_service_uploade_Click={Pluse_service_uploade_Click}
                  moveDetailPage={moveDetailPage}
                />
              )}
            </Tab>
            <Tab eventKey="judge_ok" title="승인">
              {dataLogic === true && (
                <Service_product_box
                  save_logic={save_logic}
                  setSave_logic={setSave_logic}
                  setSvrData_posts={setSvrData_posts}
                  SvrData_posts={SvrData_posts}
                  Pluse_service_uploade_Click={Pluse_service_uploade_Click}
                  moveDetailPage={moveDetailPage}
                />
              )}
            </Tab>
            <Tab eventKey="judge_return" title="심사반려">
              {dataLogic === true && (
                <Service_product_box
                  save_logic={save_logic}
                  setSave_logic={setSave_logic}
                  setSvrData_posts={setSvrData_posts}
                  SvrData_posts={SvrData_posts}
                  Pluse_service_uploade_Click={Pluse_service_uploade_Click}
                  moveDetailPage={moveDetailPage}
                />
              )}
            </Tab>
          </Tabs>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Service_product_management;
