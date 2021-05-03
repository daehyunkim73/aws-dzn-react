import React, { useEffect, useState } from "react";
import Dashboard_main_img from "./dashboard_main_img";
import Dashboard_act from "./dashboard_act";
import Dashboard_production_activity from "./dashboard_production_activity";
import Dashboard_salse_data from "./dashboard_salse_data";
import Service_uploade_list_Page_popup from "../../popup/Middle/Service_uploade_list_page_popup";
import view_more from "../../../image/Center/Dashboard/view_more.png";
import { Server_ajax_get } from "../../../server_ajax";
import svccenter_create_icon from "../../../image/Center/Empty/svccenter_create_icon.png"
import svccenter_create_btn from "../../../image/Center/Empty/svccenter_create_btn.png"

const Dashboard_v99DD = () => {
  const [SvrData_posts, setSvrData_posts] = useState([]);
  const [dataSetting, setDataSetting] = useState(false);
  const [dataLogic, setDataLogic] = useState(false);
  const [save_logic, setSave_logic] = useState(false);
  const [creating, setCreating] = useState([]);
  const [sale, setSale] = useState([]);

  const [use_api_list, setUse_api_list] = useState([]); //사용 API 배열

  useEffect(() => {
    (async function () {
      try {
        const Service_product_list = await Server_ajax_get(
          `svccenter/Service_product_list`
        );
        setSvrData_posts(Service_product_list);
        setDataSetting(true);
        setDataLogic(true);
        setSave_logic(false);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, [save_logic === true]);

  useEffect(() => {
    SvrData_posts.filter((x) => {
      return x.stat === 1;
    }).map((c) => {
      setCreating((creating) => [...creating, c]);
    });
    SvrData_posts.filter((x) => {
      return x.stat === 5;
    }).map((c) => {
      setSale((sale) => [...sale, c]);
    });
  }, [dataSetting === true]);

  useEffect(() => {
    console.log("show", SvrData_posts);
    console.log("sale", sale);
    window.scrollTo(0, 0);
  });
  const Pluse_service_uploade_Click = () => {
    const Servcie_uploade = document.getElementById(
      "ServiceCenter_uploade_list_Page_popup_bgk"
    );
    Servcie_uploade.style.display = "table";
  };

  return (
    <React.Fragment>
      <Service_uploade_list_Page_popup setSave_logic={setSave_logic} />
      <div id="content">
        <div className="container-fluid">
          {/* <Route exact path="/Main_page" component={Main_page}></Route> */}

          <div className="dashboard service_dashboard">
            <div className="page_title_wrap">
              <p className="page_title">HOME</p>
              <div className="page_title_btn">
                <p>Home</p>
                <img className="caption_img" src={view_more} />
                <p>Service Center</p>
              </div>
            </div>

            <div className="dashboard_wrap max_w">
              {dataLogic === true && (
                <div>
                  {SvrData_posts.length !== 0 ? (
                    <Dashboard_main_img
                      SvrData_posts={SvrData_posts}
                      Pluse_service_uploade_Click={Pluse_service_uploade_Click}
                      setSave_logic={setSave_logic}
                    />
                  ) : (
                    <div className="svccenter_main_empty">
                      <div>
                        <img
                          src={svccenter_create_icon}
                          alt="svccenter_create_icon"
                        />
                        <p>새로운 작업을 시작해 보세요.</p>
                        <button onClick={Pluse_service_uploade_Click}>
                          서비스 만들기
                          <img
                            src={svccenter_create_btn}
                            alt="svccenter_create_btn"
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {SvrData_posts.length !== 0 && (
                <>
                  <Dashboard_act use_api_list={use_api_list} setUse_api_list={setUse_api_list} />
                  <Dashboard_production_activity creating={creating} />
                  {
                    use_api_list.length !== 0 && <Dashboard_salse_data />
                  }
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard_v99DD;
