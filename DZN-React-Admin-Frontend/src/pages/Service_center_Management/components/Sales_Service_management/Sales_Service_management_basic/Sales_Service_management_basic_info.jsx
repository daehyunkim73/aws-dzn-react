import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Sales_Service_management_basic_certification_info from "./Sales_Service_management_basic_certification_info";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Server_ajax_post } from "../../../../../../Server_ajax";

const Sales_Service_management_basic_info = ({ serviceID }) => {
  const [basicInfoArray, setBasicInfoArray] = useState();
  const [basicInfoArrayLogic, setBasicInfoArrayLogic] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const result = await Server_ajax_post(
          "service_center_managment/getBasicInfo",
          {
            pdsvc_idx: serviceID,
          }
        );
        setBasicInfoArray((basicInfoArray) => result);
        setBasicInfoArrayLogic(true);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, []);

  return (
    <React.Fragment>
      <div className="service_basic_info">
        <form>
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
                  maxLength="15"
                  value={
                    basicInfoArrayLogic === true && basicInfoArray[0].svc_title
                  }
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
                  value={
                    basicInfoArrayLogic === true && basicInfoArray[0].svc_url
                  }
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
                  value={
                    basicInfoArrayLogic === true && basicInfoArray[0].svc_uri
                  }
                  readOnly
                />
                <p>
                  ※ 서비스되는 실제 URL을 입력하세요. URL은 반드시 https://
                  형태여야 합니다.
                </p>
              </div>
            </div>
          </div>
        </form>

        <Sales_Service_management_basic_certification_info
          basicInfoArrayLogic={basicInfoArrayLogic}
          basicInfoArray={basicInfoArray}
        />
        <div className="judge_table_top_btn judge_table_btn">
          <Link to="/svccenter/saleproduct">
            <button className="listGoBtn">목록</button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sales_Service_management_basic_info;
