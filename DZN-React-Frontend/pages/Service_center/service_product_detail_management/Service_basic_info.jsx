import React, { useCallback, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Service_Title_popup from "../../popup/Small_popup/service_Product_management/Service_title_v1";
import Service_Title_popup_v2 from "../../popup/Small_popup/service_Product_management/Service_title_v2";
import Service_url_popup from "../../popup/Small_popup/service_Product_management/Service_url_popup_v1";
import Service_url_popup_v2 from "../../popup/Small_popup/service_Product_management/Service_url_popup_v2";
import { Link } from "react-router-dom";
import Certification_info from "./certification_info";
import { Server_ajax_post } from "../../../server_ajax";

const Service_basic_info = (props) => {
  const { save_logic2 } = props;
  const pdsvc_idx = props.serviceID;
  const { svr_yn_stat } = props;
  const { SvrData } = props;
  const { setSave_logic } = props;
  const { setSvr_info_stat } = props;
  const { svr_info_stat } = props;
  const { setSave_logic2 } = props;
  const { setSalesReqVal } = props;
  const [overlapping_titile, setOverlapping_titile] = useState(0);
  const [overlapping_URL, setOverlapping_URL] = useState(0);
  const [basicFind, setBasicFind] = useState(false);

  useEffect(() => {
    setOverlapping_titile(2);
    setOverlapping_URL(2);
  }, []);
  //서비스ID생성함수, 서비스Key생성함수
  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  //secretkey생성함수
  function makekey(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const [svc_url, setSvc_url] = useState(
    SvrData[0].svc_url == "" ? "" : SvrData[0].svc_url
  );
  const [svc_title, setSvc_title] = useState(
    SvrData[0].svc_title == "" ? "" : SvrData[0].svc_title
  );
  const [svc_uri, setSvc_uri] = useState(
    SvrData[0].svc_uri == null || SvrData[0].svc_uri == ""
      ? "https://"
      : SvrData[0].svc_uri
  );
  //onChange value
  const onChangeSvcName = (e) => {
    setOverlapping_titile(0);
    setSvc_title(e.target.value);
  };
  const onChangeSvcUrl = (e) => {
    setOverlapping_URL(0);
    setSvc_url(e.target.value);
  };
  const onChangeSvcUri = (e) => setSvc_uri(e.target.value);

  //최초 기본정보 저장 버튼 이벤트
  const handleSubmit = (e) => {
    e.preventDefault();

    if (overlapping_titile !== 2) {
      alert("서비스제목 중복확인을 해주세요.");
    } else if (overlapping_URL !== 2) {
      alert("서비스URL 중복확인을 해주세요.");
    } else if (svc_url.substring(0, 8) !== "https://") {
      alert("URL은 반드시 https:// 형태여야 합니다.");
    } else if (svc_uri.substring(0, 8) !== "https://") {
      alert("URI은 반드시 https:// 형태여야 합니다.");
    } else if (svc_uri === "https://" || svc_uri === "") {
      alert("URI정보를 입력해주세요");
    } else {
      console.log("svc_title", svc_title);
      console.log("svc_url", svc_url);
      console.log("svc_uri", svc_uri);
      console.log("pdsvc_idx", pdsvc_idx);
      let svc_id = makeid(20);
      let svc_key = makeid(20);
      let secret_key = makekey(25);
      let svc_id_dt = new Date().toISOString().slice(0, 10);
      let body = {
        pdsvc_idx: pdsvc_idx,
        svc_title: svc_title,
        svc_url: svc_url,
        svc_uri: svc_uri,
        svc_id: svc_id,
        svc_id_dt: svc_id_dt,
        svc_key: svc_key,
        secret_key: secret_key,
      };
      console.log("ch", body);
      (async function () {
        try {
          const result = await Server_ajax_post(
            `svccenter/product/control/edit_first`,
            body
          );
          const data = JSON.stringify(result);
          if (data === "1") {
            console.log("lolol");
            setSvr_info_stat(true);
            setSave_logic(true);
          }
        } catch (e) {
          return console.error(e);
        }
      })();
    }
  };

  const saveData = () => {
    if (overlapping_titile !== 2) {
      alert("서비스제목 중복확인을 해주세요.");
    } else if (overlapping_URL !== 2) {
      alert("서비스URL 중복확인을 해주세요.");
    } else if (svc_url.substring(0, 8) !== "https://") {
      alert("URL은 반드시 https:// 형태여야 합니다.");
    } else if (svc_uri.substring(0, 8) !== "https://") {
      alert("URI은 반드시 https:// 형태여야 합니다.");
    } else if (svc_uri === "https://" || svc_uri === "") {
      alert("URI정보를 입력해주세요");
    } else {
      console.log("svc_title", svc_title);
      console.log("svc_url", svc_url);
      console.log("svc_uri", svc_uri);
      console.log("pdsvc_idx", pdsvc_idx);
      let uptDt = new Date().toISOString().slice(0, 10);
      console.log("asdasd", uptDt);
      let body = {
        pdsvc_idx: pdsvc_idx,
        svc_title: svc_title,
        svc_url: svc_url,
        svc_uri: svc_uri,
        uptDt: uptDt,
      };
      console.log("ch", body);
      (async function () {
        try {
          const result = await Server_ajax_post(
            `svccenter/product/control/edit_second`,
            body
          );
          const data = JSON.stringify(result);
          if (data === "1") {
            alert("수정된 정보가 저장되었습니다.");
          }
        } catch (e) {
          return console.error(e);
        }
      })();
    }
  };
  //서비스 제목 중복확인 이벤트
  const Service_Title_popup_Click = () => {
    if (svc_title === "") {
      alert("서비스 제목을 입력해주세요");
    } else {
      let body = {
        svc_title: svc_title,
        pdsvc_idx: pdsvc_idx,
      };
      (async function () {
        try {
          const result = await Server_ajax_post(
            `svccenter/product/control/checkOverlappingTitle`,
            body
          );
          const data = JSON.stringify(result);
          if (data === "1") {
            setOverlapping_titile(1); //중복
            const ServiceCenter_title_popup_bgk = document.getElementById(
              "ServiceCenter_title_popup_bgk"
            );
            ServiceCenter_title_popup_bgk.style.display = "table";
          } else if (data === "2") {
            setOverlapping_titile(2); //중복X
            const ServiceCenter_title_popup_bgk = document.getElementById(
              "ServiceCenter_title_popup_bgk_v2"
            );
            ServiceCenter_title_popup_bgk.style.display = "table";
          } else {
            alert("중복확인을 해주세요.");
          }
        } catch (e) {
          return console.error(e);
        }
      })();
    }
  };

  //서비스 URL 중복확인 이벤트
  const Service_url_popup_Click = () => {
    if (svc_url === "https://" || svc_url === "") {
      alert("서비스 URL 정보를 입력해주세요");
    } else {
      let body = {
        svc_url: svc_url,
        pdsvc_idx: pdsvc_idx,
      };
      (async function () {
        try {
          const result = await Server_ajax_post(
            `svccenter/product/control/checkOverlappingURL`,
            body
          );
          const data = JSON.stringify(result);
          if (data === "1") {
            setOverlapping_URL(1); //중복
            const Service_product_url_popup = document.getElementById(
              "ServiceCenter_url_popup_bgk_v1"
            );
            Service_product_url_popup.style.display = "table";
          } else if (data === "2") {
            setOverlapping_URL(2); //중복X
            const Service_product_url_popup = document.getElementById(
              "ServiceCenter_url_popup_bgk_v2"
            );
            Service_product_url_popup.style.display = "table";
          } else {
            alert("중복확인을 해주세요.");
          }
        } catch (e) {
          return console.error(e);
        }
      })();
    }
  };

  // 판매정보등록하기 버튼 이벤트
  const saleAddEvt = () => {
    setSalesReqVal("sale");
  };

  return (
    <React.Fragment>
      {/* 서비스 제목 증복 확인 팝업 */}
      <Service_Title_popup /> {/* 증복되는 제목 팝업 */}
      <Service_Title_popup_v2 /> {/* 사용 가능한 제목 팝업 */}
      {/* 서비스 url 증복 확인 팝업 */}
      <Service_url_popup /> {/* 증복되는 URL 팝업 */}
      <Service_url_popup_v2 /> {/* 사용가능 URL 팝업 */}
      <div className="service_basic_info">
        <form onSubmit={handleSubmit}>
          <div className="exposure_info_title_wrap">
            <p>기본정보</p>
            <span className="exposure_text">※ 필수 입력 정보입니다.</span>
          </div>
          <div className="exposure_info_input_wrap">
            <div className="exposure_info_input_table_wrap">
              <div className="exposure_info_input_left_wrap">
                서비스 제목 <span>*</span>
              </div>
              <div className="exposure_info_input_right_wrap">
                <Form.Control
                  name="svc_title"
                  type="text"
                  className="form_input"
                  value={svc_title}
                  onChange={onChangeSvcName}
                  maxLength="15"
                />
                {(() => {
                  if (SvrData[0].stat !== 2 && SvrData[0].stat !== 3) {
                    return (
                      <Button onClick={Service_Title_popup_Click}>
                        중복확인
                      </Button>
                    );
                  }
                })()}

                <p>※ 서비스명 글자수는 최대 15자까지 등록 가능합니다.</p>
              </div>
            </div>
            <div className="exposure_info_input_table_wrap">
              <div className="exposure_info_input_left_wrap">
                서비스 URL <span>*</span>
              </div>
              <div className="exposure_info_input_right_wrap">
                <Form.Control
                  name="svc_url"
                  type="text"
                  className="form_input"
                  value={svc_url}
                  onChange={onChangeSvcUrl}
                />
                {(() => {
                  if (SvrData[0].stat !== 2 && SvrData[0].stat !== 3) {
                    return (
                      <Button onClick={Service_url_popup_Click}>
                        중복확인
                      </Button>
                    );
                  }
                })()}
                <p>
                  ※ 서비스하기 위한 URL을 입력해주세요. (프로토콜, 포트의 지정이
                  필요한 경우 함께 입력해야합니다.
                </p>
                <p>
                  ※ URL 등록 시 https:// 로 입력하셔야 원활한 동작이 가능합니다.
                  예)https://www.wehago/#/communication
                </p>
              </div>
            </div>
            <div className="exposure_info_input_table_wrap">
              <div className="exposure_info_input_left_wrap">
                URl <span>*</span>
              </div>
              <div className="exposure_info_input_right_wrap">
                <Form.Control
                  name="svc_uri"
                  type="text"
                  className="form_input"
                  value={svc_uri}
                  onChange={onChangeSvcUri}
                />
                <p>
                  ※ 서비스되는 실제 URL을 입력하세요. URL은 반드시 https://
                  형태여야 합니다.
                </p>
              </div>
            </div>
          </div>
          {svr_info_stat === true || SvrData[0].secret_key !== null ? (
            <></>
          ) : (
            <div className="judge_table_top_btn judge_table_btn">
              <Link to="/svccenter/product">
                <button className="listGoBtn">목록</button>
              </Link>
              <button type="submit">저장</button>
            </div>
          )}
        </form>
        {svr_info_stat === true || SvrData[0].secret_key !== null ? (
          <Certification_info
            SvrData={SvrData}
            setSave_logic2={setSave_logic2}
            svr_yn_stat={svr_yn_stat}
          />
        ) : (
          <></>
        )}
        {svr_info_stat === true || SvrData[0].secret_key !== null ? (
          <div className="judge_table_top_btn judge_table_btn">
            <Link to="/svccenter/product">
              <button className="listGoBtn">목록</button>
            </Link>
            {(() => {
              if (SvrData[0].stat !== 2 && SvrData[0].stat !== 3) {
                return <button onClick={saveData}>저장</button>;
              }
            })()}

            <button className="saleInfoAdd" onClick={saleAddEvt}>
              판매정보등록하기 {">"}
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </React.Fragment>
  );
};

export default Service_basic_info;
