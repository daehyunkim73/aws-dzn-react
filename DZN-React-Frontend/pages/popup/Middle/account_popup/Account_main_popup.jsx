import React, { useCallback } from "react";
import { Table, FormControl } from "react-bootstrap";
import Account_uploade_error from "./Account_uploade_error";
import Account_uploade_fail from "./Account_uploade_fail";
import Account_uploade_success from "./Account_uploade_success";

// 이미지 import
import close_btn from "../../../../image/Center/Close_btn/close_btn.png";
import { useRef } from "react";
import { Server_ajax_post } from "../../../../server_ajax";
import { test } from "../../../../src/now_date";

/* 개인설정>개인권한관리 정산계좌등록 팝업 메인  */

const Account_Main_popup = ({ companyInfo, setAccountInfoLogic, accountInfo }) => {
  const bankName_ref = useRef();
  const accountNumber_ref = useRef();
  const accountHolder_ref = useRef();
  const result = new test();

  const Account_Add_Evt = () => {
    if (!bankName_ref.current.value) {
      alert("은행명을 작성해주세요.");
    } else if (!accountNumber_ref.current.value) {
      alert("계좌번호를 작성해주세요.");
    } else if (!accountHolder_ref.current.value) {
      alert("예금주명을 작성해주세요.");
    } else {
      (async function () {
        try {
          let body = {
            comp_idx: companyInfo.employee_list[0].company_no,
            bank_name: bankName_ref.current.value,
            accnt_num: accountNumber_ref.current.value,
            accnt_ownr_name: accountHolder_ref.current.value,
            biz_num: 123456789,
            accnt_date: result.date,
          };
          if(accountInfo.length === 0) {
            await Server_ajax_post(`setting/account_save`, body);
          } else {
            await Server_ajax_post(`setting/account_upt`, body);
          }
          await setAccountInfoLogic(true);
          await Image_close_popup();
        } catch (e) {
          return console.error(e);
        }
      })();
    }
  };

  const Image_close_popup = useCallback(() => {
    const Account_main_popup_bgk = document.getElementById(
      "Account_main_popup_bgk"
    );
    Account_main_popup_bgk.style.display = "none";
  }, []);

  return (
    <React.Fragment>
      <Account_uploade_error /> {/* 계좌정보가 유효하지 않을 때  */}
      <Account_uploade_fail /> {/* 예금주명 에러 팝업 */}
      <Account_uploade_success /> {/* 정상적으로 등록이 완료될 때 */}
      <div className="smae_popup_bgk_big_box" id="Account_main_popup_bgk">
        <div className="Buy_make_popup_white_box">
          <div
            className="service_center_delete_middel_white_box"
            id="account_popup_box"
          >
            <div className="Buy_popup_head_line_box">
              <div className="Small_popup_box">
                <div className="Buy_popup_head_line_box">
                  <h1>정산계좌등록</h1>
                  <div className="Buy_popupClose_box">
                    <img onClick={Image_close_popup} src={close_btn} alt="" />
                  </div>
                </div>

                <div className="question_uploade_nav_box">
                  <div className="Approved_Popup_text_box">
                    <Table responsive className="bank_big_table">
                      <tbody>
                        <tr>
                          <td className="bank_table_text">은행명</td>
                          <td>
                            {" "}
                            <FormControl
                              aria-label="Text input with checkbox"
                              placeholder="은행명을 입력하세요."
                              ref={bankName_ref}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="bank_table_text" id="sp_double_number">
                            계좌번호
                          </td>
                          <td>
                            <FormControl
                              aria-label="Text input with checkbox"
                              type="number"
                              placeholder="'-' 없이 계좌번호를 입력하세요."
                              ref={accountNumber_ref}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="bank_table_text">예금주명</td>
                          <td>
                            <FormControl
                              aria-label="Text input with checkbox"
                              placeholder="예금주명을 입력하세요."
                              ref={accountHolder_ref}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="bank_table_text">사업자등록번호</td>
                          <td className="number_account">123-456-789</td>
                        </tr>
                        <tr>
                          <td className="bank_table_text">첨부파일</td>
                          <td className="number_account">
                            <div className="file_sp_wrap">
                              <input type="file" id="file_check" />
                              <label className="file_btn" htmlFor="file_check">
                                파일선택
                              </label>
                            </div>
                            * 통장사본 이미지를 등록하세요. jpg, png
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <div className="one_ok_button_box">
                    <button
                      className="fail_btn_popup"
                      onClick={Image_close_popup}
                    >
                      취소
                    </button>
                    <button
                      className="ok_btn_popup"
                      id="Account_uploade_btn"
                      onClick={Account_Add_Evt}
                    >
                      정산계좌 등록
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Account_Main_popup;
