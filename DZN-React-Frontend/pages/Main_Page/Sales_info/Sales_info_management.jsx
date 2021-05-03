import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import Account_main_popup from "../../popup/Middle/account_popup/Account_main_popup";
import Not_img_icon from "../../../image/Dev_Center/Forum/not_img.png";
import Ajax from "../../../lib/ajax-3rd-custom";
import globals from "../../../lib/globals";
import { useCookies } from "react-cookie";
import { Server_ajax_post } from "../../../server_ajax";

const Sales_info_management = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [companyInfo, setCompanyInfo] = useState([]);
  const [companyInfoLogic, setCompanyInfoLogic] = useState(false);
  const [accountInfo, setAccountInfo] = useState([]);
  const [accountInfoLogic, setAccountInfoLogic] = useState(false);

  useEffect(() => {
    const get_mbrInfo = () => {
      let cno = cookies.h_selected_company_no;
      let url = globals.wehagoCommonApiUrl + "/user/userinfo/detail?cno=" + cno;
      console.log("url", url);
      Ajax.get(url).then(
        function (response) {
          let result = JSON.parse(response);
          if (result.resultCode == 200) {
            setCompanyInfo(result.resultData);
            setCompanyInfoLogic(true);
          } else {
            console.error("Error: ", result.resultMsg);
          }
        }.bind(this),
        function (error) {
          console.error("Failed!", error);
          alert(error);
          handleLogout();
        }.bind(this)
      );
    };

    try {
      cookies.wehago_s && get_mbrInfo();
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (companyInfoLogic === true) {
      (async function () {
        try {
          let data = { company_no: companyInfo.employee_list[0].company_no };
          const account_list = await Server_ajax_post(
            `setting/account_list`,
            data
          );
          setAccountInfo(account_list);
          setAccountInfoLogic(false);
        } catch (e) {
          return console.error(e);
        }
      })();
    }
  }, [companyInfoLogic, accountInfoLogic]);

  const Account_uploade_Click = () => {
    const Account_main_popup_bgk = document.getElementById(
      "Account_main_popup_bgk"
    );
    Account_main_popup_bgk.style.display = "table";
  };

  return (
    <React.Fragment>
      <Account_main_popup companyInfo={companyInfo} accountInfo={accountInfo} setAccountInfoLogic={setAccountInfoLogic} />
      <div className="clearfix sales_info_guide_big_wrap">
        <Table className="sales_info_guide_table" responsive>
          <caption className="tb_caption" id="input_btn_caption_question">
            <span id="choice_select">정기정산안내</span>
          </caption>
        </Table>
        <div className="sales_info_guide_date_wrap">
          정기정산일
          <div className="sales_info_guide_date">매월 26일</div>
        </div>
      </div>

      <Table responsive>
        <caption className="tb_caption" id="input_btn_caption_question">
          <span id="choice_select">정산계좌관리</span>
          <div className="question_upload_btn_box">
            {accountInfo.length !== 0 ? 
            <Button onClick={Account_uploade_Click}>계좌변경</Button>
              :
              <Button onClick={Account_uploade_Click}>계좌등록</Button>
            
            }

          </div>
        </caption>
        <thead id="question_uploade_box">
          <tr>
            <th>은행/계좌정보</th>
            <th>첨부파일</th>
          </tr>
        </thead>
        <tbody>
          {accountInfo.length !== 0 && (
            <tr>
              <td>
                {accountInfo[0].bank_name} / {accountInfo[0].accnt_num}
              </td>
              <td>
                <img src={Not_img_icon} alt="not_img" />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="sales_info_notice_text">
        <p>※ 정산계좌를 등록하신 경우 해당 계좌를 통하여 정산이 진행됩니다.</p>
        <p>
          ※ 휴대전화번호 등으로 만든 평생계좌번호 및 가상계좌,
          펀드/적금/정기예금 등의 계좌는 등록이 불가합니다.
        </p>
      </div>
    </React.Fragment>
  );
};

export default Sales_info_management;
