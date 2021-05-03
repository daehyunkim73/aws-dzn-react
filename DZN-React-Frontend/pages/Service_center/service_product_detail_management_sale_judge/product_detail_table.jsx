import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Service_Approved_result_popup from "../../popup/Middle/Service_Approved_result_popup";
import { useServiceSalesContext_sale } from "../../Service_center/service_sale_product_detail_management/service_product_detail_management";
import Axios from "axios";
import { Server_ajax_post } from "../../../server_ajax";
function table_middle() {
  const td = document.querySelectorAll("table td");
  for (let i = 0; i < td.length; i++) {
    td[i].classList.add("align-middle");
  }
  return td;
}

const Product_detail_table = ({approval_review, user_apprvl}) => {
  useEffect(() => {
    table_middle();
    return () => {
      table_middle();
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
          <div className="judge_table_title">승인심사결과이력</div>
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

export default Product_detail_table;
