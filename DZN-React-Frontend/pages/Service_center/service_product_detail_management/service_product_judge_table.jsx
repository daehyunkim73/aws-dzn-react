import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Talbe_middle from "../../../src/Table_middle";
import Service_Approved_result_popup from "../../popup/Middle/Service_Approved_result_popup";
import { useServiceSalesContext } from "./service_product_detail_management";
import { Server_ajax_post } from "../../../server_ajax";
const Service_product_judge_table = ({user_apprvl, approval_review}) => {

  useEffect(() => {
    Talbe_middle();
    return () => {
      Talbe_middle();
    };
  }, []);


  const Approved_result_popup_Click = () => {
    const Service_Approved_result_popup = document.getElementById(
      "Service_Approved_result_popup"
    );
    Service_Approved_result_popup.style.display = "table";
  };

  return (
    <React.Fragment>
      {user_apprvl === true && (
        <Service_Approved_result_popup approval_review={approval_review} />
      )}
      <Table responsive>
        <caption className="tb_caption">
          <div className="judge_table_title">승인심사요청이력</div>
        </caption>
        <thead>
          <tr>
            <th>승인요청일</th>
            <th>승인완료일</th>
            <th>심사결과</th>
          </tr>
        </thead>
        <tbody>
          {approval_review.map((c) => (
            <tr>
              <td>{c.apprvlreq_dt.substring(0, 10)}</td>
              <td>
                {c.apprvlres_dt !== null ? c.apprvlres_dt.substring(0, 10) : ""}
              </td>
              <td>
                {c.stat === "0"
                  ? "심사중"
                  : c.stat === "1"
                  ? "승인완료"
                  : c.stat === "2" && "심사반려"}

                {c.stat === "2" && (
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={Approved_result_popup_Click}
                  >
                    반려사유
                  </p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default Service_product_judge_table;
