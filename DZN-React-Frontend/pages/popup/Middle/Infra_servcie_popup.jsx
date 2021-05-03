import React, { useCallback, useState, createRef, useEffect } from "react";
import { Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Table_Middel from "../../../src/Table_middle";
import { useServiceSalesContext } from "../../Service_center/service_product_detail_management/service_product_detail_management";
import { useServiceSalesContext_sale } from "../../Service_center/service_sale_product_detail_management/service_product_detail_management";
// 이미지 import
import close_btn from "../../../image/Center/Close_btn/close_btn.png";
import Infra_popup_table from "./Component/Infra_popup_table";
import { useHistory } from "react-router";
import { Server_ajax_post } from "../../../server_ajax";
/* 승인(판매) 요청 팝업  */
const Infra_service_popup = (props) => {
  const svc_url = useHistory();

  const { dataSave, setInfraLogic } =
    svc_url.location.pathname.indexOf("saleproduct") !== -1
      ? useServiceSalesContext_sale()
      : useServiceSalesContext();

  // const { dataSave, setInfraLogic } = useServiceSalesContext();
  const [select_vlaue, setSelect_value] = useState(() => createRef());
  const [infra_props_list, setInfra_props_list] = useState([]);
  const [pric_dom, setPric_dom] = useState("20,000");
  const [usePeriod, setUsePeriod] = useState("1");
  useEffect(() => {
    Table_Middel();
  });

  useEffect(() => {
    setInfra_props_list(props.post_infra_idx_post_list);
  }, [props.post_infra_idx_post_list || infra_props_list]);

  useEffect(() => {
    if (props.post_setInfra_yn_state === false) {
      const infra_service_popup_bgk = document.getElementById(
        "infra_service_popup_bgk"
      );
      infra_service_popup_bgk.style.display = "none";
    }
  }, [props.post_setInfra_yn_state === false]);

  const imageclose_click = useCallback(() => {
    props.post_setInfra_yn_state(false);
  }, [props.post_setInfra_yn_state]);

  const priceInfra = useCallback(
    (e) => {
      const select_big_value = select_vlaue.current; //createRef를 이용한 dom 접근
      const select_value_pric =
        select_big_value.options[select_big_value.selectedIndex].text;
      select_value_pric === "1개월" && setPric_dom("20,000");
      select_value_pric === "3개월" && setPric_dom("60,000");
      select_value_pric === "6개월" && setPric_dom("120,000");
      select_value_pric === "12개월" && setPric_dom("240,000");
      select_value_pric === "1개월" && setUsePeriod("1");
      select_value_pric === "3개월" && setUsePeriod("3");
      select_value_pric === "6개월" && setUsePeriod("6");
      select_value_pric === "12개월" && setUsePeriod("12");
    },
    [pric_dom]
  );
  useEffect(() => {
    console.log("hihihih", usePeriod);
    console.log("ss", dataSave[0].pdsvc_idx);
  });
  const infra_apply_btn = () => {
    const pdsvc_idx = dataSave[0].pdsvc_idx;
    let infra_infor_data = {};

    infra_props_list.map((infra_info) => {
      infra_infor_data = infra_info;
    });

    let body = {
      usePeriod: usePeriod,
      pdsvc_idx: pdsvc_idx,
      infra_infor_data_idx: infra_infor_data.svcinfra_idx,
    };

    (async function () {
      try {
        await Server_ajax_post(`svccenter/infra_apply_info`, body);
        setInfraLogic(true);
        console.log(service_by_id, "=======================");
      } catch (e) {
        return console.error(e);
      }
    })();
    props.post_setInfra_yn_state(false);
  };

  return (
    <React.Fragment>
      <div className="smae_popup_bgk_big_box" id="infra_service_popup_bgk">
        <div className="Buy_make_popup_white_box">
          <div className="service_center_delete_middel_white_box">
            <div className="Buy_popup_uploda_headLine_box">
              <div className="Buy_popup_head_line_box">
                <h1>인프라 서비스 신청</h1>
                <div className="Buy_popupClose_box">
                  <img
                    onClick={imageclose_click}
                    src={close_btn}
                    alt="close_img"
                  />
                </div>
              </div>
            </div>
            <div
              className="question_uploade_nav_box"
              id="Buy_popupClose_nav_box"
            >
              <div className="infra_contetns_box">
                <p>관리자 서비스 승인 후 사용 가능합니다.</p>
                <p>승인일부터 서비스가 개시됩니다.</p>
              </div>
              <div className="infra_service_big_box">
                <Table responsive className="infra_table">
                  <tbody>
                    {props.post_infra_yn_state === true &&
                      infra_props_list.map((popup_control) => {
                        return (
                          <Infra_popup_table
                            popup_table_control={popup_control}
                            key={popup_control.svcinfra_idx}
                          />
                        );
                      })}
                    <tr>
                      <td className="bank_table_text">DISK</td>
                      <td>월 20,000원</td>
                    </tr>
                    <tr>
                      <td className="bank_table_text">이용기간</td>
                      <td>
                        <Form.Control
                          as="select"
                          onChange={priceInfra}
                          ref={select_vlaue}
                        >
                          <option>1개월</option>
                          <option>3개월</option>
                          <option>6개월</option>
                          <option>12개월</option>
                        </Form.Control>
                      </td>
                    </tr>
                    <tr>
                      <td className="bank_table_text">가격</td>
                      <td>{pric_dom}원</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="one_ok_button_box">
                <button onClick={imageclose_click} className="fail_btn_popup">
                  취소
                </button>
                <button
                  className="ok_btn_popup"
                  id="infra_approved_btn"
                  onClick={infra_apply_btn}
                >
                  신청
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Infra_service_popup;
