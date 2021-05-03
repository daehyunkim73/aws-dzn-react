import React from "react";
import Form from "react-bootstrap/Form";
import Sale_data_detail_table from "./product_detail_table";
import Service_Approved_judge from "../../popup/Small_popup/Service_Approved_judge";
import close_btn from "../../../image/Center/Close_btn/close_btn.png";
const Sale_judge = () => {
  const Relay_Approved_popup_click = () => {
    const Service_judge_popup_bgk = document.getElementById(
      "Service_judge_popup_bgk"
    );
    Service_judge_popup_bgk.style.display = "table";
  };
  return (
    <React.Fragment>
      <Service_Approved_judge />
      <div className="judge_table_top service_judge_table_top">
        <div className="judge_table_title">승인심사요청</div>
        <div className="judge_table">
          <div className="judge_table_left sale_svc_judge_table_left">
            <div>승인항목</div>
            <div className="judgeReason">사유</div>
            <div className="judgeFileAttachment">파일 첨부</div>
          </div>
          <div className="judge_table_right">
            <div>
              <div className="checkbox_wrap">
                <input type="checkbox" id="judge_check_a" />
                <label className="checkbox_design" htmlFor="judge_check_a">
                  가격정보 수정
                </label>
              </div>
              <div className="checkbox_wrap">
                <input type="checkbox" id="judge_check_b" />
                <label className="checkbox_design" htmlFor="judge_check_b">
                  데이터 수정
                </label>
              </div>
              <div className="checkbox_wrap">
                <input type="checkbox" id="judge_check_c" />
                <label className="checkbox_design" htmlFor="judge_check_c">
                  기타
                </label>
                <input className="judge_check_text_box" type="text" />
              </div>
            </div>
            <div>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="변경 사유 및 변경내용을 상세히 작성하세요."
              />
            </div>
            <div>
              <div className="file_wrap">
                <input type="file" id="file_check" />
                <label className="file_btn" htmlFor="file_check">
                  파일선택
                </label>
              </div>
              <div>
                <p>Asdafdafs.doc</p>
                <img src={close_btn} alt="close" />
              </div>
              <p>※ 기타 심사에 필요한 사항이 있을 경우 파일을 첨부해주세요.</p>
            </div>
          </div>
        </div>
        <div className="judge_table_top_btn judge_table_btn">
          <button onClick={Relay_Approved_popup_click}>
            재승인(판매) 요청
          </button>
        </div>
      </div>
      <div className="judge_table_bottom">
        <Sale_data_detail_table />
        <div className="judge_table_bottom_btn judge_table_btn">
          <button>목록</button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Sale_judge;
