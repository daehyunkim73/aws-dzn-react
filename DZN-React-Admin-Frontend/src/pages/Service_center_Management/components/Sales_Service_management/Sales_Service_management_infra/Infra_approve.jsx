import React, { useState, useEffect } from "react";
import { Server_ajax_post } from "../../../../../../Server_ajax";

const Using_infra = (props) => {
  const [infra_reqres, setInfra_reqres] = useState([]);
  const [infra_use_logic, setInfra_use_logic] = useState(false);
  const { dataSave } = props;
  useEffect(() => {
    const pdsvc_idx = dataSave[0].pdsvc_idx;

    let body = {
      pdsvc_idx: pdsvc_idx,
    };
    (async function () {
      try {
        const result = await Server_ajax_post(
          "service_center_managment/infra_req_list_judged_ok",
          body
        );
        setInfra_reqres(result);
        setInfra_use_logic(true);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, []);
  return (
    <React.Fragment>
      <div className="Infra_approve_wrap">
        <div className="judge_table_title">사용 인프라 서비스</div>
        <div className="judge_table">
          {infra_reqres.map((c) => {
            return (
              <>
                {" "}
                <div key={c.reqsvcinfra_idx}>
                  <div className="judge_table_left">
                    <div>신청일</div>
                    <div>서비스 명</div>
                    <div>요금제</div>
                  </div>
                  <div className="judge_table_right">
                    <div>
                      {" "}
                      {c.req_dt !== null ? (
                        ` ${c.req_dt.substring(0, 10)} ${c.req_dt.substring(
                          11,
                          19
                        )} `
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      {c.svcinfra_idx === 1
                        ? "W_1"
                        : c.svcinfra_idx === 2
                        ? "W_2"
                        : c.svcinfra_idx === 3 && "W_3"}
                    </div>
                    <div>
                      {" "}
                      {c.svcinfra_idx === 1
                        ? "월 20000원"
                        : c.svcinfra_idx === 2
                        ? "월 20000원"
                        : c.svcinfra_idx === 3 && "월 20000원"}
                    </div>
                  </div>
                  <div className="judge_table_left">
                    <div>승인일</div>
                    <div>서버 타입</div>
                    <div>서비스 만료일</div>
                  </div>
                  <div className="judge_table_right">
                    <div>
                      {c.res_dt !== null ? (
                        ` ${c.res_dt.substring(0, 10)} ${c.res_dt.substring(
                          11,
                          19
                        )} `
                      ) : (
                        <></>
                      )}
                      <button className="infra_btn infra_submit">승인</button>
                    </div>
                    <div>
                      {c.svcinfra_idx === 1
                        ? "CPU 2개, MEMORY 2GB, DISK 20GB"
                        : c.svcinfra_idx === 2
                        ? "CPU 2개, MEMORY 15GB, DISK 18GB"
                        : c.svcinfra_idx === 3 &&
                          "CPU 4개, MEMORY 32GB, DISK 32GB"}
                    </div>
                    <div>2020년 9월 24일 00:00</div>
                  </div>{" "}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Using_infra;
