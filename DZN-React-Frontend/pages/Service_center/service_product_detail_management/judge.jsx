import React, { useEffect, useCallback, useState } from "react";
import Service_product_judge_table from "./service_product_judge_table";
import Data_Approved_req_popup from "../../popup/Small_popup/Data_Approved_req_popup";
import close_btn from "../../../image/Center/Close_btn/close_btn.png";
import { Link } from "react-router-dom";
import { useServiceSalesContext } from "./service_product_detail_management";
import { Server_ajax_post, Image_download } from "../../../server_ajax";

const judge_approved = () => {
  const {
    dataSave,
    pay_cate_state,
    pay_type,
    svc_cate,
    apprvLogic,
  } = useServiceSalesContext();
  const [upload_file, setUpload_file] = useState("");
  const [upload_file_name, setUpload_file_name] = useState("");
  const [fileLogic, setFileLogic] = useState(false);
  const [deleteLogic, setDeleteLogic] = useState(false);
  const [popupLogic, setPopupLogic] = useState(false);
  const [approval_review, setApproval_review] = useState([]);
  const [user_apprvl, setUser_apprvl] = useState(false);

  useEffect(() => {
    const pdsvc_idx = dataSave[0].pdsvc_idx;
    let body = {
      pdsvc_idx: pdsvc_idx,
    };
    (async function () {
      try {
        const result = await Server_ajax_post(
          `svccenter/service_goods_management_judgetable`,
          body
        );
        console.log(result);
        setUpload_file_name(result[0].add_file_name);
        setApproval_review(result);
        setUser_apprvl(true);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, [apprvLogic === true]);


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

  const Relay_Approved_popup_click = () => {
    const Data_Approved_Req_popup = document.getElementById(
      "Data_Approved_Req_popup"
    );
    Data_Approved_Req_popup.style.display = "table";
  };

  
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
      <Data_Approved_req_popup
        upload_file={upload_file}
        upload_file_name={upload_file_name}
      />

      <div className="judge_table_top">
        <div className="judge_table_title">승인심사요청</div>
        <div className="judge_table">
          <div className="judge_table_left judge_table_float_left">
            <div>제목</div>
            <div>카테고리/유형</div>
            <div>결제방식</div>
            <div>문의/안내 연락처</div>
            <div>파일 첨부</div>
          </div>
          <div className="judge_table_right">
            <div>{dataSave[0].svc_title}</div>
            <div>
              {svc_cate}/
              {dataSave[0].svc_type === "0" ? "Web Service" : "Mobile Service"}
            </div>
            <div>
              {pay_type === 0 ? "무료" : "유료"} /{" "}
              {pay_cate_state === 0 ? "요금제 방식" : "라이센스 방식"}{" "}
            </div>
            <div>1588-1234</div>
            <div>
              <div className="file_wrap">
                <input
                  type="file"
                  id="file_check"
                  name="fileupload"
                  onChange={input_file_names}
                />
                {dataSave[0].stat !== 2 ? (
                  <label className="file_btn" htmlFor="file_check">
                    파일선택
                  </label>
                ) : (
                  <></>
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
          {dataSave[0].stat === 1 ? (
            <button
              id="relay_uploade_req_btn"
              onClick={Relay_Approved_popup_click}
            >
              승인 요청
            </button>
          ) : (
            <></>
          )}
          {dataSave[0].stat === 4 ? (
            <button
              id="relay_uploade_req_btn"
              onClick={Relay_Approved_popup_click}
            >
              재승인 요청
            </button>
          ) : (
            <></>
          )}
          {dataSave[0].stat === 1 ? (
            <Link to="/svccenter/product">
              <button>목록</button>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="judge_table_bottom">
        {dataSave[0].stat === 1 ? <></> : <Service_product_judge_table   approval_review={approval_review} user_apprvl={user_apprvl} />}
        <div className="judge_table_bottom_btn judge_table_btn">
          {dataSave[0].stat === 1 ? (
            <></>
          ) : (
            <Link to="/svccenter/product">
              <button>목록</button>
            </Link>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default judge_approved;
