import React, { useEffect, useState, useRef } from "react";
import Table from "react-bootstrap/Table";
import Service_buy_api_popup from "../../popup/Middle/Service_Buy_Api_popup";
import Service_api_delete from "../../popup/Small_popup/Service_api_delete_popup";
import Api_usage_popup from "../../popup/Middle/Service_Api_usage_popup";
import { useServiceSalesContext } from "../service_product_detail_management/service_product_detail_management";
import { useCallback } from "react";

const Api_using = () => {
  const { use_api_list, cate_list, serviceID } = useServiceSalesContext();
  const [apiRandomKeyArray, setApiRandomKeyArray] = useState();
  const [api_use_info, setApi_use_info] = useState([]);
  const [use_api_lengs, setSuse_api_lengs] = useState([]);
  const usingApiRandomKey = useRef();
  const input_label = useRef([]);

  useEffect(() => {
    const use_api_leng = use_api_list.filter((item, idx) => {
      return Number(item.pdsvc_idx) === Number(serviceID) && item.stat === 1;
    });

    setSuse_api_lengs(use_api_leng);
  }, [use_api_list]);

  const Selection_api_delete_Click = () => {
    const Service_buy_api_popup_bgk = document.getElementById(
      "Service_api_delete_popup_bgk"
    );
    Service_buy_api_popup_bgk.style.display = "table";
  };

  const Using_api_get_Click = () => {
    const Service_Buy_Api_popup_bgk = document.getElementById(
      "Service_Buy_Api_popup_bgk"
    );
    Service_Buy_Api_popup_bgk.style.display = "table";
  };

  const Daily_usage_Click = () => {
    const Service_api_usage_popup_bgk = document.getElementById(
      "Service_api_usage_popup_bgk"
    );
    Service_api_usage_popup_bgk.style.display = "table";
  };

  useEffect(() => {
    const randomKey = Math.random().toString(36).substring(2, 11);
    setApiRandomKeyArray(randomKey);
  }, []);

  const apiRandomKeyCopyBtn = (e) => {
    usingApiRandomKey.current.select();
    document.execCommand("copy");
    e.target.focus();
  };

  const select_change = (api_appr_list) => (e) => {
    let body = {
      use_api_yn: e.target.value,
      use_api_id: api_appr_list.svcapi_idx,
    };
    (async function () {
      try {
        await Server_ajax_post(`svccenter/service_use_api_approved`, body);
      } catch (e) {
        return console.error(e);
      }
    })();
  };

  const api_list_click = useCallback(
    (api_info, api_appr_index) => () => {
      if (input_label.current[api_appr_index].checked === true) {
        setApi_use_info((api_use_info) => [...api_use_info, api_info]);
      } else if (input_label.current[api_appr_index].checked === false) {
        api_use_info.filter((item, idx) => {
          return (
            api_use_info.indexOf(api_info) === idx &&
            setApi_use_info(
              api_use_info.splice(
                api_use_info.splice(api_use_info.indexOf(api_info), 1)
              )
            )
          );
        });
      }
    },
    [api_use_info]
  );

  return (
    <React.Fragment>
      <Service_buy_api_popup />{" "}
      {/* ?????? ??? ????????? ????????? api ????????? ?????? ????????? ???????????? ??? ?????? ????????? */}
      <Service_api_delete
        Delete_api_info={api_use_info}
        Delete_api_info_func={setApi_use_info}
        Delete_api_checked={input_label}
      />{" "}
      {/* ?????? / ???????????? ?????? ?????? ?????? */}
      <Api_usage_popup />{" "}
      {/* ?????? API ???????????? ???????????? ?????? ??? ?????? api ???????????? ?????? */}
      <div className="service_basic_info api_using_info">
        <div className="exposure_info_title_wrap clearfix">
          <div className="api_search_text">
            <ul>
              <li>
                WEHAGO API??? ????????? ?????????. ?????? API??? ??????, ???????????? API???
                ????????? ????????????, ?????? ?????? ??? ????????? ???????????????.
              </li>
            </ul>
            <div className="api_key">
              <p>API ???</p>
              <input
                type="textarea"
                className="keyStyle"
                ref={usingApiRandomKey}
                defaultValue={apiRandomKeyArray}
                readOnly
              />
              {/* <p ref={usingApiRandomKey}>{apiRandomKeyArray}</p> */}
              <button onClick={apiRandomKeyCopyBtn}>??????</button>
            </div>
          </div>
        </div>
        <div className="api_request_list_wrap clearfix">
          <Table responsive>
            <caption className="tb_caption clearfix">
              <div className="judge_table_title">?????? API</div>
              <div>[??? {use_api_lengs.length}] 2020.01.30</div>
              <div className="api_using_btn">
                <button onClick={Selection_api_delete_Click}>
                  ?????? API ?????? ??????
                </button>
                <button onClick={Using_api_get_Click}>?????? API ????????????</button>
              </div>
            </caption>
            <thead>
              <tr>
                <th>??????</th>
                <th>????????????</th>
                <th>API</th>
                <th>??????</th>
                <th>??????</th>
                <th onClick={Daily_usage_Click} style={{ cursor: "pointer" }}>
                  ????????????
                </th>
                <th>????????????</th>
              </tr>
            </thead>
            <tbody>
              {use_api_list &&
                use_api_list.map((api_appr_list, api_appr_index) => {
                  return (
                    Number(api_appr_list.pdsvc_idx) === Number(serviceID) &&
                    api_appr_list.stat === 1 && (
                      <>
                        <tr>
                          <td>WEHAGO API</td>
                          {cate_list &&
                            cate_list.map((c) => {
                              return (
                                <>
                                  {c.wehago_cate_idx ===
                                    api_appr_list.main_cate_code && (
                                    <td>
                                      {c.main_cate_name} {">"} {c.sub_cate_name}
                                    </td>
                                  )}
                                </>
                              );
                            })}
                          <td>
                            <ul className="checkbox_wrap">
                              <li>
                                <input
                                  type="checkbox"
                                  id={`use_api_a${api_appr_index}`}
                                  onClick={api_list_click(
                                    api_appr_list,
                                    api_appr_index
                                  )}
                                  ref={(el) =>
                                    (input_label.current[api_appr_index] = el)
                                  }
                                />
                                <label
                                  className="checkbox_design"
                                  htmlFor={`use_api_a${api_appr_index}`}
                                >
                                  {api_appr_list.wehago_api_name}
                                </label>
                              </li>
                            </ul>
                          </td>
                          <td>
                            <ul>
                              <li>1.0</li>
                            </ul>
                          </td>
                          <td>
                            <ul>
                              <li>??????</li>
                            </ul>
                          </td>
                          <td>
                            <ul>
                              <li>100,000</li>
                            </ul>
                          </td>
                          <td>
                            <ul>
                              <li>
                                <select
                                  className="form-control"
                                  onChange={select_change(api_appr_list)}
                                >
                                  {api_appr_list.use_gbn === null ? (
                                    <option>???????????? ??????</option>
                                  ) : (
                                    <></>
                                  )}
                                  <option>
                                    {api_appr_list.use_gbn === "Y"
                                      ? "??????"
                                      : "????????????"}
                                  </option>
                                  <option>
                                    {api_appr_list.use_gbn === "Y"
                                      ? "????????????"
                                      : "??????"}
                                  </option>
                                </select>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      </>
                    )
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Api_using;
