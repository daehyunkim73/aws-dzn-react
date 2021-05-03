import React, { useCallback, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Table_Middle from "../../../src/Table_middle";
import more from "../../../image/Center/Dashboard/more.png";
import { useState } from "react";
import { useHistory } from "react-router";
import { Server_ajax_get } from "../../../server_ajax";
import svccenter_api_update_empty from "../../../image/Center/Empty/svccenter_api_update_empty.png";

const Dashboard_table = () => {
  const [apiUptList, setApiUptList] = useState([]);
  const [apiUptListLogic, setApiUptListLogic] = useState(false);
  const history = useHistory();

  useEffect(() => {
    Table_Middle();
    return () => {
      Table_Middle();
    };
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const Uptapilist = await Server_ajax_get(`svccenter/Uptapilist`);
        setApiUptList(Uptapilist);
        setApiUptListLogic(true);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, []);

  const moreViewEvt = () => {
    history.push("/support/update");
  };

  return (
    <React.Fragment>
      <Table responsive>
        <caption className="tb_caption">
          <p className="caption_title">API 업데이트</p>
          {apiUptList.length !== 0 && (
            <div className="caption_btn" onClick={moreViewEvt}>
              <p>더보기</p>
              <img className="caption_img" src={more} />
            </div>
          )}
        </caption>
        {apiUptListLogic === true && (
          <>
            {apiUptList.length !== 0 ? (
              <>
                <thead>
                  <tr>
                    <th>API 제목</th>
                    <th>날짜</th>
                  </tr>
                </thead>
                <tbody>
                  {apiUptList.map((item, cnt) => {
                    return (
                      cnt < 5 && (
                        <tr key={cnt}>
                          <td>{item.upt_title}</td>
                          <td>{item.upt_dt}</td>
                        </tr>
                      )
                    );
                  })}
                </tbody>
              </>
            ) : (
              <div className="svccenter_api_update_empty">
                <div>
                  <img src={svccenter_api_update_empty} alt="" />
                  <p>업데이트 내역이 없습니다.</p>
                </div>
              </div>
            )}
          </>
        )}
      </Table>
    </React.Fragment>
  );
};

export default Dashboard_table;
