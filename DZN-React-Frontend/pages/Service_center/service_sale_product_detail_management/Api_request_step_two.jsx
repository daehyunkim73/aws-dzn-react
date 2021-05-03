import React, { useCallback } from "react";
import Table from "react-bootstrap/Table";
import Service_Api_apply_popup from "../../popup/Middle/Service_Api_apply_popup";
import Api_request_step_two_list from "./Api_request_step_two_list";
import { useApiPopup_sale } from "./Api_request";
import { useState } from "react";
import { useEffect } from "react";

const Api_request_step_two = (props) => {
  const array_val = props.checkValState; //props로 받은 오브젝트 값
  const set_array_val = props.setCheckValState; //props로 받은 set 값
  const twoCheckApiName = props.checkApiName;

  const { apiCheckPopup, setApiCheckPopup } = useApiPopup_sale();
  const [step_two_array_val, setStep_Two_Array_val] = useState(
    props.checkValState
  );

  const test_del = useCallback(() => {
    let objs = document.querySelectorAll(".using_svc_checkbox_state");
    for (let i = 0; i < objs.length; i++) {
      // API 수만큼 for문
      if (objs[i].checked === true) {
        // 체크되어 있는 것만
        for (let jj = 0; jj < array_val.length; jj++) {
          // array안에 오브젝트
          if (
            objs[i].previousSibling.innerText === array_val[jj].api &&
            objs.length != 0
          ) {
            // console.log("1.JSON.stringify",JSON.stringify(array_val));
            // const td_remove =
            //   objs[i].parentNode.parentNode.parentNode.parentNode;
            array_val[jj].checked = false; // 오브젝트 안에 checked 속성을 false로 변경
            // console.log("삭제 !!", array_val[jj]);
            array_val.splice(jj, 1); // 오브젝트 안에 있는 체크된 값을 삭제
            twoCheckApiName.splice(jj, 1); // api 이름 state 값 안에 들어있는 체크된 값 삭제
            // console.log("2.JSON.stringify",JSON.stringify(array_val));
            // td_remove.parentNode.removeChild(td_remove);
            set_array_val((array_val) => [...array_val]); // 있는 값으로 넣어주며 useEffect를 작동시킴
          }
        }
      }
    }
    if (document.getElementById("step_two_api_a")) {
      document.getElementById("step_two_api_a").checked = false;
    }
    for (let i = 0; i < objs.length; i++) {
      objs[i].checked = false;
    }
  }, [array_val]);

  const Choice_Api_use_apply_Click = useCallback(() => {
    let objs = document.querySelectorAll(".using_svc_checkbox_state");

    for (let i = 0; i < objs.length; i++) {
      // API 수만큼 for문
      if (objs[i].checked === true) {
        // 체크되어 있는 것만
        for (let jj = 0; jj < array_val.length; jj++) {
          // array안에 오브젝트
          if (
            objs[i].previousSibling.innerText === array_val[jj].api &&
            objs.length != 0
          ) {
            setApiCheckPopup((apiCheckPopup) => [
              ...apiCheckPopup,
              array_val[jj],
            ]);
          }
        }
        const Service_Buy_apply_popup_bgk = document.getElementById(
          "Service_Buy_apply_popup_bgk"
        );
        Service_Buy_apply_popup_bgk.style.display = "table";
      }
    }
  }, [array_val]);

  const selectAll_btn = () => {
    let selectAll = document.querySelector("#step_two_api_a");
    let objs = document.querySelectorAll(".using_svc_checkbox_state");
    if (selectAll.checked === true) {
      for (let i = 0; i < objs.length; i++) {
        objs[i].checked = false;
      }
    } else if (selectAll.checked === false) {
      for (let i = 0; i < objs.length; i++) {
        objs[i].checked = true;
      }
    }
  };

  return (
    <React.Fragment>
      <Service_Api_apply_popup />
      <div className="api_request_list_wrap api_request_list_table_wrap clearfix">
        <div className="list_title clearfix">
          <p>STEP 2 사용 신청</p>
        </div>
        <div className="api_list_content clearfix">
          <div className="api_request_list_wrap clearfix">
            <Table responsive>
              <caption className="tb_caption clearfix">
                <div className="judge_table_title">사용 신청할 API</div>
                <div className="step_two_btn_wrap">
                  <button onClick={test_del}>X 선택 삭제</button>
                  <div className="caption_title bold_none">
                    [총 
                    <p className="number_data">
                      {Object.keys(array_val).length}
                    </p>
                    건 ]
                  </div>
                  <button
                    className="step_two_btn_right"
                    onClick={Choice_Api_use_apply_Click}
                  >
                    선택 API 사용 신청
                  </button>
                </div>
              </caption>
              <thead>
                <tr>
                  <th>
                    <ul className="checkbox_wrap">
                      <li>
                        <input type="checkbox" id="step_two_api_a" />
                        <label
                          onClick={selectAll_btn}
                          className="checkbox_design"
                          htmlFor="step_two_api_a"
                        ></label>
                      </li>
                    </ul>
                  </th>
                  <th>카테고리</th>
                  <th>API</th>
                  <th>요금제</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(array_val).map((item) => {
                  return (
                    <Api_request_step_two_list
                      sub_category={item.sub_category}
                      category={item.category}
                      api_name={item.api}
                      fare={item.fare}
                      id={item.id}
                      key={item.id}
                    />
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Api_request_step_two;
