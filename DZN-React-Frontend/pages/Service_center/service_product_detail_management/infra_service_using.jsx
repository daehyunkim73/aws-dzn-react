import React, { useEffect, useState, useCallback } from "react";
import infra_using_main from "../../../image/Service_Center/Service_product/infra_using_main.png";
import Table from "react-bootstrap/Table";
import Infra_service_table from "./component/infra_service_table";
import Use_infra_apprvl_table from "./component/use_infra_apprvl_table";
import { useServiceSalesContext } from "./service_product_detail_management";
import { Server_ajax_get, Server_ajax_post } from "../../../server_ajax";
const Infra_service_using = () => {
  const { dataSave, setInfraLogic, infraLogic } = useServiceSalesContext();
  const [Infra_posts, setInfra_posts] = useState([]);
  const [infra_reqres, setInfra_reqres] = useState([]);
  const [infra_req_list, Infra_req_list] = useState([]);
  const [Infra_posts_Logic, setInfra_posts_Logic] = useState(false);
  useEffect(() => {
    (async function () {
      try {
        const result = await Server_ajax_get(`svccenter/infra_apply_list`);
        setInfra_posts(result);
        setInfra_posts_Logic(true);
      } catch (e) {
        return console.error(e);
      }
    })();
    setInfra_posts_Logic(false);
  }, []);

  useEffect(() => {
    const pdsvc_idx = dataSave[0].pdsvc_idx;
    let body = {
      pdsvc_idx: pdsvc_idx,
    };
    (async function () {
      try {
        const result = await Server_ajax_post(`svccenter/infra_req_list`, body);
        setInfra_reqres(result);
        setInfraLogic(false);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, [infraLogic === true]);
  return (
    <React.Fragment>
      <div>
        <div className="infra_service_using_guide">
          <div className="infra_service_using_guide_top">
            <img src={infra_using_main} alt="img" />
            <p>서비스 공통 가이드</p>
          </div>
          <div className="infra_service_using_guide_bottom">
            <ul>
              <li>&#183; 5,000개 이하의 노드를 넘지 않아야 합니다.</li>
              <li>&#183; 총 포드 수는 150,000개를 넘지 않아야 합니다.</li>
              <li>&#183; 노드 당 100개 이하의 포드를 사용해야 합니다.</li>
              <li>&#183; kube-1.2 노드당 110개의 포드 제한</li>
            </ul>
          </div>
        </div>
        {Infra_posts_Logic === true &&
          Infra_posts.map((c) => (
            <Infra_service_table Infra_post={c} key={c.svcinfra_idx} />
          ))}
        <Table responsive>
          <caption className="tb_caption">
            <div className="judge_table_title">신청 인프라</div>
            <div>
              승인 완료 된 인프라는 사용 인프라 서비스 목록에서 확인 할 수
              있습니다.
            </div>
          </caption>
          <thead>
            <tr>
              <th>서비스 이름</th>
              <th>서버타입</th>
              <th>승인요청일자</th>
              <th>이용기간</th>
              <th>승인여부</th>
            </tr>
          </thead>
          <tbody>
            {infra_reqres.map((infra_list) => {
              return <Use_infra_apprvl_table infra_list={infra_list} />;
            })}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default Infra_service_using;
