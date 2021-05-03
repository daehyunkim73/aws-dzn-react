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

  return (
    <React.Fragment>
      {/* 서비스 제목 증복 확인 팝업 */}
      <Service_Title_popup /> {/* 증복되는 제목 팝업 */}
      <Service_Title_popup_v2 /> {/* 사용 가능한 제목 팝업 */}
      {/* 서비스 url 증복 확인 팝업 */}
      <Service_url_popup /> {/* 증복되는 URL 팝업 */}
      <Service_url_popup_v2 /> {/* 사용가능 URL 팝업 */}
      <div className="service_basic_info">
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
                readOnly
              />
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
                readOnly
              />
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
                readOnly
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
            <Link to="/svccenter/saleproduct">
              <button className="listGoBtn">목록</button>
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </React.Fragment>
  );
};

export default Service_basic_info;
