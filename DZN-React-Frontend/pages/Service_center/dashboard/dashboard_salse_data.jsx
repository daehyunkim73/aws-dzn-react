import React, { useEffect } from "react";
import Api_update_table from "./dashboard_table";
import more from "../../../image/Center/Dashboard/more.png";
import not_image from "../../../image/Center/Dashboard/not_image.png";
import sales_info_icon_1 from "../../../image/Center/Dashboard/sales_info_icon_1.png";
import sales_info_icon_2 from "../../../image/Center/Dashboard/sales_info_icon_2.png";
import { useHistory } from "react-router";
import { useState } from "react";
import Axios from "axios";
import { Server_ajax_get } from "../../../server_ajax";
import svccenter_sale_empty from "../../../image/Center/Empty/datacenter_sale_empty.png"

const Dashboard_sales_data = () => {
  const history = useHistory();
  const [svcSaleList, setSvcSaleList] = useState([]);
  const [svcSaleListLogic, setSvcSaleListLogic] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const svcSaleList = await Server_ajax_get(`svccenter/svcSaleList`);
        setSvcSaleList(svcSaleList);
        setSvcSaleListLogic(true);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, []);

  const moreViewEvt = () => {
    history.push("/svccenter/saleproduct");
  };
  return (
    <React.Fragment>
      <div className="sub_wrap clearfix">
        <div className="use_info_wrap">
          <Api_update_table />
          <div className="use_info_box"></div>
        </div>
        <div className="sales_data_wrap">
          <div className="wrap_title clearfix">
            <p>서비스 판매 활동</p>
            {svcSaleList.length !== 0 && (
              <div className="act_arrow" onClick={moreViewEvt}>
                <p>더보기</p>
                <img className="act_arrow_img" src={more} alt="more" />
              </div>
            )}
          </div>
          {svcSaleListLogic === true &&
          <div className="sales_info_box">
            {svcSaleList.length !== 0 ? (
              svcSaleList.map((item, cnt) => {
                return (
                  cnt < 3 && (
                    <div className="sales_info" key={cnt}>
                      <div className="info_text clearfix">
                        <div className="production_img_wrap">
                          <img
                            className="iconPreview"
                            src={`http://localhost:8081/${item.svc_icon_path_1}`}
                            alt="not_img"
                          />
                        </div>
                        <p className="sales_info_title">{item.svc_title}</p>
                        <div className="sales_info_i1 clearfix">
                          {item.judge_stat === 1 ? (
                            <p className="sales_status sales_status1">심사중</p>
                          ) : item.judge_stat === 2 ? (
                            <p className="sales_status sales_status0">승인</p>
                          ) : (
                            item.judge_stat === 3 && (
                              <p className="sales_status sales_status3">
                                심사반려
                              </p>
                            )
                          )}

                          <p className="sales_status sales_status2">결제</p>
                        </div>
                        <div className="sales_info_i2 clearfix">
                          <div>
                            <img src={sales_info_icon_1} />
                            <p>50,000</p>
                          </div>
                          <div>
                            <img src={sales_info_icon_2} />
                            <p>200(유료)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                );
              })
            ) : (
              <div className="svccenter_api_update_empty">
                <div>
                  <img src={svccenter_sale_empty} alt="svccenter_sale_empty"/>
                  <p>서비스 판매활동내역이 없습니다.</p>
                </div>
              </div>
            )}
          </div>
          }
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard_sales_data;
