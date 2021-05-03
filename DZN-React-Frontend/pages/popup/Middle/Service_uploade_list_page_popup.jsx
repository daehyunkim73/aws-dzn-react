import React, { useCallback, useEffect, useState } from "react";
import { FormControl, Table } from "react-bootstrap";
import Table_middle from "../../../src/Table_middle";

// 이미지 import
import close_btn from "../../../image/Center/Close_btn/close_btn.png";
import Axios from "axios";
import { Next } from "react-bootstrap/PageItem";
import { Server_ajax_get, Server_ajax_post } from "../../../server_ajax";
/* 개인설정>개인권한관리 정산계좌등록 팝업 메인  */

const Service_uploade_list_Page_popup = (props) => {
  const { setSave_logic } = props;
  const [svc_url, setSvc_url] = useState("https://");
  const [svc_title, setSvc_title] = useState("");
  const [svc_type, setSvc_type] = useState("");
  const onChangeSvcName = (e) => setSvc_title(e.target.value);
  const onChangeSvcUrl = (e) => setSvc_url(e.target.value);
  const onChangeSvcType = (e) => setSvc_type(e.target.value);
  // const Logic_trigger = () => {
  //   props.setSave_logic(true);
  //   Image_close_popup();
  // };
  const handleSubmit = () => {
    let body = {
      svc_title: svc_title,
      svc_url: svc_url,
      svc_type: svc_type,
    };
    if (svc_title === "") {
      alert("서비스 제목을 입력해주세요.");
    } else if (svc_url.substring(0, 8) !== "https://") {
      alert("URL은 반드시 https:// 형태여야 합니다.");
    } else if (svc_url === "https://") {
      alert("URL을 입력해주세요.");
    } else if (svc_type === "") {
      alert("서비스 유형을 선택해주세요");
    } else {
      (async function () {
        try {
          const result = await Server_ajax_post(
            "svccenter/Service_product_add",
            body
          );
          const data = JSON.stringify(result);
          if (data === "1") {
            alert("중복된 서비스 제목입니다.");
          } else if (data === "2") {
            alert("중복된 URL 입니다.");
          } else {
            props.setSave_logic(true);
            initContents();
            Image_close_popup();
          }
        } catch (e) {
          return console.error(e);
        }
      })();
    }
  };
  const initContents = useCallback(() => {
    console.log("hi");
    setSvc_title("");
    setSvc_url("");
    setSvc_type("");
  }, []);
  const Image_close_popup = () => {
    initContents();
    console.log("imgpop");
    const ServiceCenter_uploade_list_Page_popup_bgk = document.getElementById(
      "ServiceCenter_uploade_list_Page_popup_bgk"
    );
    ServiceCenter_uploade_list_Page_popup_bgk.style.display = "none";
  };

  useEffect(() => {
    Table_middle();
    return () => {
      Table_middle();
    };
  });
  return (
    <React.Fragment>
      <div
        className="smae_popup_bgk_big_box"
        id="ServiceCenter_uploade_list_Page_popup_bgk"
      >
        <div className="Buy_make_popup_white_box">
          <div
            className="service_center_delete_middel_white_box"
            id="sp_service_center_delete_middel_white_box"
          >
            <div className="Buy_popup_head_line_box">
              <div className="Small_popup_box">
                <div className="Buy_popup_head_line_box">
                  <h1>서비스 등록하기</h1>
                  <div className="Buy_popupClose_box">
                    <img onClick={Image_close_popup} src={close_btn} alt="" />
                  </div>
                </div>

                <div className="question_uploade_nav_box">
                  <Table id="service_uploade_table_box">
                    <tbody>
                      <tr>
                        <td>서비스 제목</td>
                        <td>
                          <div>
                            <FormControl
                              name="svc_title"
                              value={svc_title}
                              aria-label="Text input with checkbox"
                              maxLength="15"
                              onChange={onChangeSvcName}
                            />
                          </div>
                          <div className="popuup_Danger_text_box">
                            <p>
                              ※ 서비스명 글자수는 2~8자이며, 최대 30자 까지 등록
                              가능합니다.
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>서비스 URL</td>
                        <td>
                          <div>
                            <FormControl
                              name="svc_url"
                              value={svc_url}
                              aria-label="Text input with checkbox"
                              onChange={onChangeSvcUrl}
                            />
                          </div>
                          <div className="popuup_Danger_text_box">
                            <p>※ 서비스하기 위한 URL을 입력해 주세요.</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>서비스 유형</td>
                        <td className="service_type_box">
                          <div className="servcie_Type_box">
                            <div className="radio_inputButton_box">
                              <input
                                type="radio"
                                id="payment_uploade_first"
                                name="payment_uploade_main"
                                value="0"
                                onChange={onChangeSvcType}
                              />
                              <label htmlFor="payment_uploade_first">
                                Web Service
                              </label>

                              <input
                                type="radio"
                                id="payment_uploade_second"
                                name="payment_uploade_main"
                                value="1"
                                onChange={onChangeSvcType}
                              />
                              <label htmlFor="payment_uploade_second">
                                Mobile Service
                              </label>
                            </div>
                            <div className="popuup_Danger_text_box">
                              <p>
                                ※ 모바일 서비스의 경우 마켓에 노출되지 않습니다.
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <div className="one_ok_button_box" id="bank_button_box">
                    <button
                      className="fail_btn_popup"
                      onClick={Image_close_popup}
                    >
                      취소
                    </button>
                    <button
                      className="ok_btn_popup"
                      onClick={handleSubmit}
                      id="save_pluse_button"
                    >
                      저장
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

export default Service_uploade_list_Page_popup;
