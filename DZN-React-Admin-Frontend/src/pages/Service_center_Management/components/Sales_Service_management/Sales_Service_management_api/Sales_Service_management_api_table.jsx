import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Table_middle from "../../../../../../func_src/Table_middle";
import { useServiceSalesContext } from "../../../Sales_Service_management";
import {
  Server_ajax_post,
  Server_ajax_get,
} from "../../../../../../Server_ajax";
const Sales_Service_management_api_table = () => {
  const { dataSave } = useServiceSalesContext();
  const [use_api_list, setUse_api_list] = useState([]);
  const [cate_list, setCate_list] = useState();
  useEffect(() => {
    Table_middle();
    return () => {
      Table_middle();
    };
  }, []);

  useEffect(() => {
    const pdsvc_idx = dataSave[0].pdsvc_idx;

    let body = {
      pdsvc_idx: pdsvc_idx,
    };
    (async function () {
      try {
        const result = await Server_ajax_post(
          "service_center_managment/use_api_list_using",
          body
        );
        setUse_api_list(result);
        const result2 = await Server_ajax_get(
          "service_center_managment/cate_list_using"
        );
        setCate_list(result2);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, []);

  return (
    <React.Fragment>
      <div className="Page_same_sub_text">
        <p className="backoffice_title_sub">사용 API</p>
      </div>
      <div className="backoffice_table_wrap">
        <Table responsive>
          <caption className="tb_caption">
            <div className="caption_title bold_none">
              [총 <p className="number_data">{use_api_list.length}</p>건 ]
            </div>
          </caption>
          <thead>
            <tr>
              <th>분류</th>
              <th>카테고리</th>
              <th>API</th>
              <th>버전</th>
              <th>당일 사용량</th>
              <th>당월 사용량</th>
            </tr>
          </thead>
          <tbody>
            {use_api_list &&
              use_api_list.map((api_appr_list) => {
                return (
                  <>
                    <tr>
                      <td>WEHAGO API</td>
                      {cate_list &&
                        cate_list.map((c) => {
                          return (
                            <>
                              {c.wehago_cate_idx ===
                                api_appr_list.main_cate_code && (
                                <td>
                                  {c.main_cate_name} {">"} {c.sub_cate_name}
                                </td>
                              )}
                            </>
                          );
                        })}
                      <td className="table_title">
                        {api_appr_list.wehago_api_name}
                      </td>
                      <td>1.0</td>
                      <td className="table_number">10/1,000</td>
                      <td className="table_number">100/30,000</td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default Sales_Service_management_api_table;
