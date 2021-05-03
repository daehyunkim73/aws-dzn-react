import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const certification_info = (props) => {
  const { setSave_logic2 } = props;
  const { SvrData } = props;
  const { svr_yn_stat } = props;
  const svc_id = useRef();
  const svc_key = useRef();
  const secret_key = useRef();

  const svcidCopyBtn = (e) => {
    svc_id.current.select();
    document.execCommand("copy");
    e.target.focus();
    alert("복사되었습니다.");
  };
  const svcKeyCopyBtn = (e) => {
    svc_key.current.select();
    document.execCommand("copy");
    e.target.focus();
    alert("복사되었습니다.");
  };
  const secretKeyCopyBtn = (e) => {
    secret_key.current.select();
    document.execCommand("copy");
    e.target.focus();
    alert("복사되었습니다.");
  };

  const saveBasic = () => {
    setSave_logic2(true);
  };
  return (
    <React.Fragment>
      <div className="judge_table_top">
        <div className="judge_table_title">인증정보</div>
        <div className="judge_table">
          <div className="judge_table_left">
            <div>서비스 유형</div>
            <div>서비스 ID</div>
            <div>서비스 Key</div>
            <div>Secret key</div>
          </div>
          <div className="judge_table_right">
            <div>
              {SvrData[0].svc_type === "0"
                ? "Web Servcie"
                : "Mobile Servcie (모바일 서비스의 경우 마켓에 노출되지 않습니다.)"}
            </div>
            <div className="service_key">
              <div>
                <input
                  type="textarea"
                  className="keyStyle"
                  ref={svc_id}
                  value={SvrData[0].svc_id}
                  readOnly
                />
              </div>
              <button onClick={svcidCopyBtn}>복사</button>
              <div>
                <p className="service_key_time" readOnly>
                  (
                  {SvrData[0].svc_id_dt === null
                    ? ""
                    : SvrData[0].svc_id_dt.substring(0, 10)}
                  생성)
                </p>
              </div>
            </div>
            <div className="service_key">
              <div>
                <input
                  type="textarea"
                  className="keyStyle"
                  ref={svc_key}
                  value={SvrData[0].svc_key}
                  readOnly
                />
              </div>
              <button onClick={svcKeyCopyBtn}>복사</button>
            </div>
            <div className="service_key">
              <div>
                <input
                  type="textarea"
                  className="keyStyle"
                  ref={secret_key}
                  value={SvrData[0].secret_key}
                  readOnly
                />
              </div>
              <button onClick={secretKeyCopyBtn}>복사</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default certification_info;
