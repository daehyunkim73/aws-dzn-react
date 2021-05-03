import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Infra_service_using from "./infra_service_using";
import Using_infra from "./Using_infra";
import { useUsageInfo } from "../../Center/Service_center_router";

const Infra_service = () => {
  const { salesInfraTabReqVal, setSalesInfraTabReqVal } = useUsageInfo();

  const salesInfraTabReqValEvt = (e) => {
    setSalesInfraTabReqVal(e);
  };
  return (
    <React.Fragment>
      <div className="infra_service_wrap api_info">
        <Tabs
          defaultActiveKey="infra_req"
          activeKey={salesInfraTabReqVal}
          id="uncontrolled-tab-example"
          onSelect={salesInfraTabReqValEvt}
        >
          <Tab
            eventKey="infra_req"
            title="인프라 서비스 신청하기"
            className="infra_using_wrap"
          >
            <ul>
              <li>
                WEHAGO 인프라 서비스를 이용하여 편리한 개발환경을 제공합니다.
              </li>
            </ul>
            <Infra_service_using />
          </Tab>
          <Tab eventKey="infra_using" title="사용 인프라 서비스">
            <Using_infra />
          </Tab>
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default Infra_service;
