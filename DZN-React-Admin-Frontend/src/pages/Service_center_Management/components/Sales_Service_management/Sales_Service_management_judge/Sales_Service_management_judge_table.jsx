import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Table_middle from "../../../../../../func_src/Table_middle";
import Approved_result_contents_popup from "../../../../popup/Popup_datacenter_Management/Approved_result_popup_admin";
import { useServiceSalesContext } from "../../../Sales_Service_management";
import Approved_req_contents_popup from "../../../../popup/Popup_datacenter_Management/Approved_req_contents_popup";
import { Server_ajax_post } from "../../../../../../Server_ajax";
function Service_aprroved_req_Big() {
  const table_title_req_btn = document.querySelectorAll(
    "#service_approved_mang .table_title p"
  );
  const Admin_user_datacenter_judge_popup_bgk = document.getElementById(
    "Admin_user_datacenter_approved_popup_bgk"
  );

  for (let i = 0; i < table_title_req_btn.length; i++) {
    table_title_req_btn[i].addEventListener("click", () => {
      Admin_user_datacenter_judge_popup_bgk.style.display = "table";
    });
  }

  return {
    table_title_req_btn: table_title_req_btn,
    Admin_user_datacenter_judge_popup_bgk: Admin_user_datacenter_judge_popup_bgk,
  };
}

const Sales_Service_management_judge_table = () => {
  const { dataSave, apprvLogic } = useServiceSalesContext();
  const [user_apprvl, setUser_apprvl] = useState(false);
  const [approval_review, setApproval_review] = useState([]);
  const [returnInfo, setReturnInfo] = useState([]);
  const [infoLogic, setInfoLogic] = useState(false);
  const [reqInfo, setReqInfo] = useState([]);
  const [reqLogic, setReqLogic] = useState(false);

  useEffect(() => {
    Table_middle();
    Service_aprroved_req_Big();
    return () => {
      Table_middle();
      Service_aprroved_req_Big();
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
          "service_center_managment/service_goods_management_judgetable",
          body
        );
        setApproval_review(result);
        setUser_apprvl(true);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, [apprvLogic === true]);

  const resultView = (idx) => {
    let body = {
      idx: idx,
    };
    (async function () {
      try {
        const result = await Server_ajax_post(
          "service_center_managment/judegeReturn",
          body
        );
        console.log("fffffffffffffffffffffffffffffff", result);
        setReturnInfo(result);
        setInfoLogic(true);

        const Admin_user_datacenter_approved_result_popup_bgk = document.getElementById(
          "Admin_user_datacenter_approved_result_popup_bgk"
        );

        Admin_user_datacenter_approved_result_popup_bgk.style.display = "table";
      } catch (e) {
        return console.error(e);
      }
    })();
    setInfoLogic(false);
  };
  const reqInform = (idx) => {
    let body = {
      idx: idx,
    };
    (async function () {
      try {
        const result = await Server_ajax_post(
          "service_center_managment/judegeReq",
          body
        );
        setReqInfo(result);
        setReqLogic(true);

        const Admin_user_datacenter_approved_popup_bgk = document.getElementById(
          "Admin_user_datacenter_approved_popup_bgk"
        );

        Admin_user_datacenter_approved_popup_bgk.style.display = "table";
      } catch (e) {
        return console.error(e);
      }
    })();
    setReqLogic(false);
  };
  return (
    <React.Fragment>
      {reqLogic === true && <Approved_req_contents_popup reqInfo={reqInfo} />}
      {infoLogic === true && (
        <Approved_result_contents_popup returnInfo={returnInfo} />
      )}
      <Table responsive id="service_approved_mang">
        <caption className="tb_caption">
          <div className="judge_table_title">승인심사요청 이력</div>
        </caption>
        <thead>
          <tr>
            <th>승인요청일</th>
            <th>승인완료일</th>
            <th>사유</th>
            <th>심사결과</th>
            <th>승인 관리자</th>
          </tr>
        </thead>
        <tbody>
          {approval_review.map((c) => (
            <tr key={c.svc_apprvlreq_idx}>
              <td>
                {c.apprvlreq_dt !== null ? c.apprvlreq_dt.substring(0, 10) : ""}
              </td>
              <td>
                {c.apprvlres_dt !== null ? c.apprvlres_dt.substring(0, 10) : ""}
              </td>
              <td className="table_title">
                {c.stat_gbn === "0" ? "신규승인" : "정보변경승인"}
                <p
                  style={{ cursor: "pointer", textAlign: "center" }}
                  onClick={() => {
                    reqInform(c.svc_apprvlreq_idx);
                  }}
                >
                  요청내용
                </p>
              </td>
              <td className="result_apprvoed_btn">
                {c.stat === "0"
                  ? "심사중"
                  : c.stat === "1"
                  ? "승인완료"
                  : c.stat === "2" && "심사반려"}
                {c.stat === "2" ? (
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      resultView(c.svc_apprvlreq_idx);
                    }}
                  >
                    결과보기
                  </p>
                ) : (
                  <></>
                )}
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default Sales_Service_management_judge_table;
