import React, { useCallback, useState, createContext } from "react";
import { Table } from "react-bootstrap";
import { useSearchApiAdd } from "../../Service_center/service_product_detail_management/Api_request_step_one";
import { useSearchApiAdd_sale } from "../../Service_center/service_sale_product_detail_management/Api_request_step_one";
import axios from "axios";
import { useServiceSalesContext } from "../../Service_center/service_product_detail_management/service_product_detail_management";
import { useServiceSalesContext_sale } from "../../Service_center/service_sale_product_detail_management/service_product_detail_management";

// 이미지 import
import close_btn from "../../../image/Center/Close_btn/close_btn.png";
import Service_Api_apply_popup_table from "./Component/Service_Api_apply_popup_table";
import Service_yn_step_one from "../../Service_center/service_product_detail_management/Api_request_step_one";
import { useEffect } from "react";
import { useApiPopup } from "../../Service_center/service_product_detail_management/Api_request";
import { useApiPopup_sale } from "../../Service_center/service_sale_product_detail_management/Api_request";
import { useHistory } from "react-router";

import { func_date } from "../../../src/now_date";
import { Server_ajax_post, Server_ajax_get } from "../../../server_ajax";

const Api_yn_list = createContext();

const Api_apply_popup = () => {
  const [req_date, setReq_date] = useState();
  const svc_url = useHistory();
  const { dataSave, setService_pop_yn_state, service_pop_yn_state } =
    svc_url.location.pathname.indexOf("saleproduct") !== -1
      ? useServiceSalesContext_sale()
      : useServiceSalesContext();

  const { apiCheckPopup, setApiCheckPopup, checkValState } =
    svc_url.location.pathname.indexOf("saleproduct") !== -1
      ? useApiPopup_sale()
      : useApiPopup();

  const Image_close_popup = useCallback(() => {
    setApiCheckPopup([]);
    setService_pop_yn_state(false);
    const Service_Buy_apply_popup_bgk = document.getElementById(
      "Service_Buy_apply_popup_bgk"
    );
    Service_Buy_apply_popup_bgk.style.display = "none";
  }, [apiCheckPopup]);

  useEffect(() => {
    if (service_pop_yn_state === true) {
      setService_pop_yn_state(false);
    }
  }, [service_pop_yn_state]);

  useEffect(() => {
    func_date(setReq_date);
  }, [req_date]);

  const api_approved_btn = useCallback( async () => {
    setApiCheckPopup([]);

    let popup_list_apprvl_data = null;
    popup_list_apprvl_data = Array.prototype.slice.call(apiCheckPopup);
      try {
        const result = await Server_ajax_get(`svccenter/use_api_list`);
        new Promise( async (res, rej) => {
          for (let j = 0; j < popup_list_apprvl_data.length; j++) {
            for (let i = 0; i < result.length; i++) {
              if (
                Number(dataSave[0].pdsvc_idx) === Number(result[i].pdsvc_idx)
              ) {
                if (popup_list_apprvl_data[j].id === result[i].main_cate_code) {
                  if (result[i].stat === 2) {
                    let body = {
                      service_companion_id: result[i].svcapi_idx,
                    };
                    await Server_ajax_post(
                      `svccenter/update_use_api_approved`,
                      body
                    );
                    return;
                  } else {
                     alert("이미 신청하신 API가있습니다.");
                     return res("status2");
                  }
                }
              }
            }
          }
          res("status0");
        }).then(async(result) => {
          if (result === "status2") {
            return;
          } else {
            let body = {
              api_data_group: popup_list_apprvl_data,
              regDt: req_date,
              svc_idx: dataSave[0].pdsvc_idx,
            };
            await Server_ajax_post(`svccenter/api_approved`, body);
            const Service_Buy_apply_popup_bgk = document.getElementById(
              "Service_Buy_apply_popup_bgk"
            );
            Service_Buy_apply_popup_bgk.style.display = "none";
            // let selectAll = document.getElementById("api_check_a");
            // selectAll.checked = false;
            setService_pop_yn_state(true);
            Object.values(checkValState).map(() => {
              checkValState.splice(0, 1);
            });
          }
        });
      } catch (e) {
        return console.error(e);
      }
  }, [apiCheckPopup, req_date]);

  return (
    <React.Fragment>
      <div className="smae_popup_bgk_big_box" id="Service_Buy_apply_popup_bgk">
        <div className="Buy_make_popup_white_box">
          <div
            className="service_center_delete_middel_white_box"
            id="Question_sp_middle_box"
          >
            <div className="Buy_popup_head_line_box">
              <div className="Small_popup_box">
                <div className="Buy_popup_head_line_box">
                  <h1>API 신청</h1>
                  <div className="Buy_popupClose_box">
                    <img onClick={Image_close_popup} src={close_btn} alt="" />
                  </div>
                </div>

                <div className="question_uploade_nav_box">
                  <div className="Approved_Popup_text_box">
                    <Table responsive className="api_contents_table_box">
                      <caption>
                        총 {Object.keys(apiCheckPopup).length}건의 API를 제휴
                        신청합니다.
                        <br />
                        과금은 서비스를 마켓에 판매 시작 시점으로 진행됩니다.
                      </caption>
                      <thead>
                        <tr>
                          <th>신청 API</th>
                          <th>과금</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.values(apiCheckPopup).map((item) => {
                          return (
                            <Service_Api_apply_popup_table
                              api={item.api}
                              fare={item.fare}
                              key={item.id}
                            />
                          );
                        })}
                        {/* <tr>
                          <td>기업재무데이터를 활용한 부도예측 API</td>
                          <td>
                            100,000회/일 무료 <br />
                            200,000회/일 10,000원 / 월
                          </td>
                        </tr>
                        <tr>
                          <td>뉴스 칼럼 API</td>
                          <td>10,000원/100,000회(월)</td>
                        </tr> */}
                      </tbody>
                    </Table>

                    <div className="wehago_developers_box">
                      <div className="wehago_developers_text_box">
                        <h1>Wehago Developers API 이용목적</h1>
                      </div>
                      <div className="api_service_select_box">
                        <div className="service_small_text_box">
                          <p>서비스</p>
                          <span className="apiPopup_serviceName">
                            세금아 안녕
                          </span>
                          {/* <Form.Control as="select">
                            <option></option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Form.Control> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="one_ok_button_box">
                    <button
                      className="fail_btn_popup"
                      onClick={Image_close_popup}
                    >
                      취소
                    </button>
                    <button
                      className="ok_btn_popup"
                      id="using_apply_btn"
                      onClick={api_approved_btn}
                    >
                      사용 신청
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Api_apply_popup;
