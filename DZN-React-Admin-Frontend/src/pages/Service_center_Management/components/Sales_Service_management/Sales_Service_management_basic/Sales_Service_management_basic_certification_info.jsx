import React from "react";

const Sales_Service_management_basic_add_info_detail = ({
  basicInfoArray,
  basicInfoArrayLogic,
}) => {
  return (
    <React.Fragment>
      <div className="judge_table_top">
        <div className="judge_table_title">인증정보</div>
        <div className="judge_table">
          <div className="judge_table_left basic_judge_table_left">
            <div>서비스 유형</div>
            <div>서비스 ID</div>
            <div>서비스 Key</div>
            <div>Secret key</div>
          </div>
          <div className="judge_table_right basic_judge_table_right">
            <div>
              {basicInfoArrayLogic === true &&
              basicInfoArray[0].svc_type === "0"
                ? "Web Servcie"
                : "Mobile Servcie (모바일 서비스의 경우 마켓에 노출되지 않습니다.)"}
            </div>
            <div className="service_key">
              <div>
                <input
                  type="textarea"
                  className="keyStyle"
                  value={
                    basicInfoArrayLogic === true && basicInfoArray[0].svc_id
                  }
                  readOnly
                />
              </div>
              <div>
                <p className="service_key_time" readOnly>
                  (
                  {basicInfoArrayLogic === true &&
                  basicInfoArray[0].svc_id_dt === null
                    ? ""
                    : basicInfoArrayLogic === true &&
                      basicInfoArray[0].svc_id_dt.substring(0, 10)}
                  생성)
                  {/* {basicInfoArray[0].svc_id} */}
                </p>
              </div>
            </div>
            <div className="service_key">
              <div>
                <input
                  type="textarea"
                  className="keyStyle"
                  readOnly
                  value={
                    basicInfoArrayLogic === true && basicInfoArray[0].svc_key
                  }
                />
              </div>
            </div>
            <div className="service_key">
              <div>
                <input
                  type="textarea"
                  className="keyStyle"
                  readOnly
                  value={
                    basicInfoArrayLogic === true && basicInfoArray[0].secret_key
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sales_Service_management_basic_add_info_detail;
