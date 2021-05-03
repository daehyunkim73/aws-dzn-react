import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Talbe_middle from "../../../src/Table_middle";
import Service_Approved_result_popup from "../../popup/Middle/Service_Approved_result_popup";
import { Server_ajax_post } from "../../../server_ajax";

const Service_product_judge_table = () => {
  const [approval_review, setApproval_review] = useState([]);
  const [user_apprvl, setUser_apprvl] = useState(false);

  useEffect(() => {
    Talbe_middle();
    return () => {
      Talbe_middle();
    };
  }, []);

  useEffect(() => {
    Server_ajax_post(
      "https://api.wehago.com/developer/svccenter/service_goods_management",
      setApproval_review
    );
  }, []);

  const Approved_result_popup_Click = () => {
    const Service_Approved_result_popup = document.getElementById(
      "Service_Approved_result_popup"
    );
    Service_Approved_result_popup.style.display = "table";
  };

  return (
    <React.Fragment>
      <Service_Approved_result_popup />
      <Table responsive>
        <caption className="tb_caption">
          <div className="judge_table_title">승인심사요청이력</div>
        </caption>
        <thead>
          <tr>
            <th>승인요청일</th>
            <th>승인완료일</th>
            <th>사유</th>
            <th>심사결과</th>
          </tr>
        </thead>
        <tbody>
          {approval_review.map((c) => (
            <tr>
              <td>{c.apprvlreq_dt}</td>
              <td>{c.apprvlreq_dt}</td>
              <td>{c.memo}</td>
              <td>
                {c.stat_gbn === "1" ? "판매중" : "제작중"}
                {user_apprvl === true && (
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={Approved_result_popup_Click}
                  ></p>
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
