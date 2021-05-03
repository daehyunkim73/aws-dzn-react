import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import { Server_ajax_get } from "../../../server_ajax";

const Data_Guide_Api_sidebar = () => {
  const history = useHistory();
  const [guideSideArray, setGuideSideArray] = useState(); // 가이드 사이드바에 들어가는 내용을 담은 배열
  const [guideSideSubArray, setGuideSideSubArray] = useState(); // 가이드 사이드바에 목차에 들어가는 내용을 담은 배열
  const [guideSideArrayLogic, setGuideSideArrayLogic] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const guideSidebarList = await Server_ajax_get(
          `Data_development_guide/guideSidebarList`
        );
        setGuideSideSubArray(guideSidebarList); // 필터링되지 않은 가이드목록
        // 중복값 필터링
        setGuideSideArray(
          guideSidebarList.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.cate === item.cate)
          )
        );
        setGuideSideArrayLogic(true);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, []);

  // 0909

  return (
    <React.Fragment>
      <div className="guide_sidebar_wrap">
        <div className="guide_sidebar">
          <div id="guide_slide_header">
            <div className="guid_big_api_text_box">
              <h1>데이터센터 가이드</h1>
            </div>
          </div>
          {guideSideArrayLogic === true &&
            guideSideArray.map(
              (item, idx) =>
                item.center_gbn === "D" && (
                  <div key={idx}>
                    <div className="secondHeader">
                      <div className="guid_second_header_Textbox">
                        <h1>{item.cate}</h1>
                      </div>
                    </div>
                    <div className="guid_nav_big_box">
                      <ul className="guid_list_box">
                        <li>
                          <span className="bar_text_span">-</span>
                          <span className="real_bar_import_text">개요</span>
                        </li>

                        {guideSideSubArray.map((subItem, sub_idx) => {
                          if (subItem.cate === item.cate) {
                            return (
                              <li key={sub_idx}>
                                <span className="bar_text_span">-</span>
                                <span className="real_bar_import_text">
                                  {subItem.title}
                                </span>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </div>
                  </div>
                )
            )}

          <div id="service_center_guid_button">
            <Link
              to="/service_development_guide/svcDevelopment"
              className="router_link"
            >
              <Button>서비스센터 가이드</Button>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Data_Guide_Api_sidebar;
