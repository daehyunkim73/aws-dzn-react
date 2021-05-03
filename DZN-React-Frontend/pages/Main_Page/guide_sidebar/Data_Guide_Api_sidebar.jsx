import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import { Server_ajax_get, UncertApi_ajax_get } from "../../../server_ajax";
import Ajax from "../../../lib/ajax-3rd-custom";

const Data_Guide_Api_sidebar = (props) => {
  const history = useHistory();
  const guide_path = useLocation().pathname;
  const giudeGbn =
    history.location.pathname.indexOf("data_development_guide") <= -1
      ? "S"
      : "D";
  const [guideSideArray, setGuideSideArray] = useState(); // 가이드 사이드바에 들어가는 내용을 담은 배열
  const [guideSideSubArray, setGuideSideSubArray] = useState(); // 가이드 사이드바에 목차에 들어가는 내용을 담은 배열
  const [guideSideArrayLogic, setGuideSideArrayLogic] = useState(false);

  useEffect(() => {
    try {
      const url = `/developer/Data_development_guide/guideSidebarList`;
      Ajax.getUncertToken(url, "get", async (signature) => {
        const guideSidebarList = await UncertApi_ajax_get(url, signature);
        setGuideSideSubArray(guideSidebarList); // 필터링되지 않은 가이드목록
        const filterArray = guideSidebarList.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.cate === item.cate)
        );
        // 중복값 필터링
        setGuideSideArray(filterArray);
        setGuideSideArrayLogic(true);
      });
    } catch (e) {
      return console.error(e);
    }
  }, []);

  return (
    <React.Fragment>
      <div className="guide_sidebar_wrap">
        <div className="guide_sidebar">
          <div id="guide_slide_header">
            <div className="guid_big_api_text_box">
              <h1>
                {guideSideArrayLogic === true && giudeGbn === "S"
                  ? "서비스센터 가이드"
                  : "데이터센터 가이드"}
              </h1>
            </div>
          </div>
          {guideSideArrayLogic === true &&
            guideSideArray.map(
              (item, idx) =>
                item.center_gbn === giudeGbn && (
                  <div key={idx}>
                    <div className="secondHeader">
                      <div className="guid_second_header_Textbox">
                        <h1>{item.cate}</h1>
                      </div>
                    </div>
                    <div className="guid_nav_big_box">
                      <ul className="guid_list_box">
                        <Link
                          to={`/${
                            giudeGbn === "D"
                              ? "data_development_guide"
                              : "service_development_guide"
                          }/${item.cate_code}`}
                        >
                          {guide_path ===
                          `/${
                            giudeGbn === "D"
                              ? "data_development_guide"
                              : "service_development_guide"
                          }/${item.cate_code}` ? (
                            <li className="guideSideBarClass sidebar_click">
                              {"- 개요"}
                            </li>
                          ) : (
                            <li className="guideSideBarClass">{"- 개요"}</li>
                          )}
                        </Link>

                        {guideSideSubArray.map((subItem, sub_idx) => {
                          if (subItem.cate === item.cate) {
                            return guide_path ===
                              `/${
                                giudeGbn === "D"
                                  ? "data_development_guide"
                                  : "service_development_guide"
                              }/${subItem.cate_code}/${subItem.title_code}` ? (
                              <Link
                                to={`/${
                                  giudeGbn === "D"
                                    ? "data_development_guide"
                                    : "service_development_guide"
                                }/${subItem.cate_code}/${subItem.title_code}`}
                              >
                                <li
                                  key={sub_idx}
                                  className="guideSideBarClass sidebar_click"
                                >
                                  {"- " + subItem.title}
                                </li>
                              </Link>
                            ) : (
                              <Link
                                to={`/${
                                  giudeGbn === "D"
                                    ? "data_development_guide"
                                    : "service_development_guide"
                                }/${subItem.cate_code}/${subItem.title_code}`}
                              >
                                <li key={sub_idx} className="guideSideBarClass">
                                  {"- " + subItem.title}
                                </li>
                              </Link>
                            );
                          }
                        })}
                      </ul>
                    </div>
                  </div>
                )
            )}

          <div id="service_center_guid_button">
            {giudeGbn === "D" ? (
              <Link
                to="/service_development_guide/svcDevelopment"
                className="router_link"
              >
                <Button>서비스센터 가이드</Button>
              </Link>
            ) : (
              <Link
                to="/data_development_guide/dataDevelopment"
                className="router_link"
              >
                <Button>데이터센터 가이드</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Data_Guide_Api_sidebar;
