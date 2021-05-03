import React, { useCallback, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Sale_data_detail_table from "./product_detail_table";
import Service_Approved_judge from "../../popup/Small_popup/Service_Approved_judge";
import close_btn from "../../../image/Center/Close_btn/close_btn.png";
import { useServiceSalesContext_sale } from "../service_sale_product_detail_management/service_product_detail_management";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Server_ajax_post, Image_download } from "../../../server_ajax";
const Sale_judge = () => {
  const [upload_file, setUpload_file] = useState("");
  const [upload_file_name, setUpload_file_name] = useState("");
  const [fileLogic, setFileLogic] = useState(false);
  const [deleteLogic, setDeleteLogic] = useState(false);
  const [memo_req, setMemo_req] = useState("");
  const [priceCheck, setPriceCheck] = useState(false);
  const [etcCheck, setEtcCheck] = useState(false);
  const [rereq_reason_p, setRereq_reason_p] = useState("");
  const [rereq_reason_e, setRereq_reason_e] = useState();
    const [user_apprvl, setUser_apprvl] = useState(false);
  const [approval_review, setApproval_review] = useState([]);
  const {
    dataSave,
    apprvLogic,
    pay_cate_state,
    pay_type,
    svc_cate,
  } = useServiceSalesContext_sale();

  useEffect(() => {
    const pdsvc_idx = dataSave[0].pdsvc_idx;

    let body = {
      pdsvc_idx: pdsvc_idx,
    };

    (async function () {
      try {
        const service_goods_management_judgetable_sale = await Server_ajax_post(
          `svccenter/service_goods_management_judgetable_sale`,
          body
        );
        setUpload_file_name(service_goods_management_judgetable_sale[0].add_file_name)
        setApproval_review(service_goods_management_judgetable_sale);
        setUser_apprvl(true);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, [apprvLogic === true]);

  const reason_memo = (e) => {
    setMemo_req(e.target.value);
  };
  const onSortPrice = () => {
    setPriceCheck(!priceCheck);
  };
  const onSortEtc = () => {
    setEtcCheck(!etcCheck);
  };
  useEffect(() => {
    priceCheck === true ? setRereq_reason_p("1") : setRereq_reason_p("0");
    etcCheck === true ? setRereq_reason_e("1") : setRereq_reason_e("0");
  });
  const Relay_Approved_popup_click = () => {
    if (priceCheck === false && etcCheck === false) {
      alert("승인항목을 1개이상 선택해주세요");
    } else if (memo_req === "") {
      alert("재승인 사유를 작성해주세요");
    } else {
      const Service_judge_popup_bgk = document.getElementById(
        "Service_judge_popup_bgk"
      );
      Service_judge_popup_bgk.style.display = "table";
    }
  };
  const input_file_names = useCallback((e) => {
    if (upload_file_name !== "") {
      alert("파일첨부는 1개까지 업로드가 가능합니다.");
    } else {
      setUpload_file(e.target.files[0]);
      setUpload_file_name(e.target.files[0].name);
      setFileLogic(true);
    }
  });
  const deletefile = useCallback(() => {
    setUpload_file([]);
    setUpload_file_name("");
    setDeleteLogic(true);
    setFileLogic(false);
  });

  const file_download = (file_info) => () => {
    Image_download(
      file_info[0].add_file_name, 
      file_info[0].addFile,
      'backoffice', //service_code
      'C' // S: 서비스, C: 회사, U: 사용자
      );
  }

  return (
    <React.Fragment>
      <Service_Approved_judge
        upload_file={upload_file}
        upload_file_name={upload_file_name}
        memo_req={memo_req}
        rereq_reason_p={rereq_reason_p}
        rereq_reason_e={rereq_reason_e}
      />
      <div className="judge_table_top service_judge_table_top">
        <div className="judge_table_title">승인심사요청</div>
        <div className="judge_table">
          <div className="judge_table_left judge_table_Floatleft">
            <div>승인항목</div>
            <div className="judgeReason">사유</div>
            <div className="judgeFileAttachment">파일 첨부</div>
          </div>
          <div className="judge_table_right">
            <div>
              <div className="checkbox_wrap">
                <input
                  type="checkbox"
                  id="judge_check_b"
                  checked={priceCheck}
                  onChange={onSortPrice}
                />
                <label className="checkbox_design" htmlFor="judge_check_b">
                  가격 수정
                </label>
              </div>
              <div className="checkbox_wrap">
                <input
                  type="checkbox"
                  id="judge_check_c"
                  checked={etcCheck}
                  onChange={onSortEtc}
                />
                <label className="checkbox_design" htmlFor="judge_check_c">
                  기타
                </label>
              </div>
            </div>
            <div>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="변경 사유 및 변경내용을 상세히 작성하세요."
                onChange={reason_memo}
              />
            </div>
            <div>
              <div className="file_wrap">
                <input
                  type="file"
                  id="file_check"
                  onChange={input_file_names}
                />
                {dataSave[0].judge_stat !== 1 && (
                  <label className="file_btn" htmlFor="file_check">
                    파일선택
                  </label>
                )}
              </div>

              <div>
                {approval_review.length !== 0 && upload_file_name && upload_file_name !== "" &&
                  <p className="curser_pointer" onClick={file_download(approval_review)}>{upload_file_name}</p>
                }
                {(deleteLogic === true || fileLogic === true) &&
                upload_file_name !== "" ? (
                  <>
                  <p>{upload_file_name}</p>
                  <img src={close_btn} onClick={deletefile} alt="close" />
                  </>
                ) : (
                  <></>
                )}
              </div>
              <p>※ 기타 심사에 필요한 사항이 있을 경우 파일을 첨부해주세요.</p>
            </div>
          </div>
        </div>
        <div className="judge_table_top_btn judge_table_btn">
          {dataSave[0].judge_stat !== 1 && (
            <button onClick={Relay_Approved_popup_click}>
              재승인(판매) 요청
            </button>
          )}
          {dataSave[0].judge_stat === null ? (
            <Link to="/svccenter/saleproduct">
              <button>목록</button>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="judge_table_bottom">
        {dataSave[0].judge_stat === null ? <></> : <Sale_data_detail_table approval_review={approval_review} user_apprvl={user_apprvl} />}
        <div className="judge_table_bottom_btn judge_table_btn">
          {dataSave[0].judge_stat === null ? (
            <></>
          ) : (
            <Link to="/svccenter/saleproduct">
              <button>목록</button>
            </Link>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sale_judge;
