import React, { useEffect, useState, useCallback, useRef } from "react";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Basic_info from "./Basic_info";
import Judge from "./judge";
import Data_sale_main from "./data_sale_main";
import { Server_ajax_post } from "../../../server_ajax";

const purchase_create_data_detail = (props) => {
  const { detailID, dzonID } = props.match.params;
  const [detailData, setDetailData] = useState([]);
  const [createData, setCreateData] = useState([]); // 리스트 랜딩
  const [dtailDataLoadState, setDtailDataLoadState] = useState(false);
  const [createDataLoadState, setCreateDataLoadState] = useState(false);
  const [reRend, setReRend] = useState(false);
  const [mainTitle, setMainTitle] = useState("");
  const [tabGbn, setTabGbn] = useState("");
  const [basic_cnt, setBasic_cnt] = useState("");
  const [sale_cnt, setSale_cnt] = useState("");
  const [judge_cnt, setJudge_cnt] = useState(""); // 승인 심사 데이터 개수
  const [judgeClick, setJudgeClick] = useState(false);
  const [currCnt, setCurrCnt] = useState(0);
  const [currTab, setCurrTab] = useState("");
  const [tabRerend, setTabRerend] = useState(false);
  const [state, setState] = useState(0);

  // 우측 상단 제작데이터 바로가기
  useEffect(() => {
    (async function () {
      try {
        let data = {
          pdbase_idx: detailID,          
          stat: "1",
          sales_stat: "",
        };
        const getCreateDataList = await Server_ajax_post(
          `datacenter/getCreateDataList`,
          data
        );
        setCreateData(() => getCreateDataList);
        setCreateDataLoadState(false);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, [createDataLoadState === true]);

  // 구매/제작 데이터 가져오기
  useEffect(() => {
    (async function () {
      try {
        let data = {
          pdbase_idx: detailID,          
        };
        const get_dataDescInfo = await Server_ajax_post(
          `datacenter/get_dataDescInfo`,
          data
        );
        setDetailData(() => get_dataDescInfo);
        setState(() => get_dataDescInfo.stat);
        setMainTitle(() => get_dataDescInfo.data_title);
        setBasic_cnt("1");
        setSale_cnt(get_dataDescInfo.SALE_CNT);
        setJudge_cnt(get_dataDescInfo.JUDGE_CNT);
        setDtailDataLoadState(true);
      } catch (e) {
        return console.error(e);
      }
    })();

    setDtailDataLoadState(false);
    setCreateDataLoadState(true);
    setReRend(false);
  }, [reRend === true]);

  // 우측 상단 제작데이터 바로가기
  useEffect(() => {
    (async function () {
      try {
        let data = {
          pdbase_idx: detailID,          
          stat: "1",
          sales_stat: "",
        };
        const service_by_id = await Server_ajax_post(
          `datacenter/getCreateDataList`,
          data
        );
        setCreateData(() => service_by_id);
        setCreateDataLoadState(false);        
      } catch (e) {
        return console.error(e);
      }
    })();
  }, [createDataLoadState === true]);

  const getStateName = (stat) => {
    const state = {
      name: "",
      style: "",
    };
    switch (stat) {
      case "0":
        state.name = "구매완료";
        state.style = "";
        break;
      case "1":
        state.name = "제작중";
        state.style = "service_title_icon";
        break;
      case "2":
        state.name = "심사중";
        state.style = "service_title_icon_judge_btn";
        break;
      case "3":
        state.name = "승인";
        state.style = "service_title_icon_judge_ok_btn";
        break;
      case "4":
        state.name = "심사반려";
        state.style = "service_title_icon_judge_fail_btn";
        break;
    }
    return state;
  };

  // 다른 제작데이터 선택 시 이벤트
  const onChangeCreateDataMove = (e) => {
    let params = e.target.value;
    let paramsArr = params.split(",");
    if (Array.isArray(paramsArr) === true) {
      setReRend(true);
      props.history.push(
        `/datacenter/purchasedata/detail/${paramsArr[0]}`
      );
    }
  };

  const tabHandleSelect = (eventKey) => {    
    let MenuArr = [
      { menuNm: "basic", cnt: basic_cnt },
      { menuNm: "sale", cnt: sale_cnt },
      { menuNm: "judge", cnt: judge_cnt },
    ];
    let cnt = MenuArr.map((item, idx) => {
      return item.menuNm === eventKey && item.cnt;
    }).filter((val) => {
      return val !== false;
    });
    
    setCurrCnt(Number(cnt[0]));
    setCurrTab(eventKey);
    setTabRerend(true);
  };

  useEffect(() => {
    const bt = document.getElementById("uncontrolled-tab-example-tab-basic");
    const bt_tab = document.getElementById(
      "uncontrolled-tab-example-tabpane-basic"
    );
    const st = document.getElementById("uncontrolled-tab-example-tab-sale");
    const st_tab = document.getElementById(
      "uncontrolled-tab-example-tabpane-sale"
    );
    const jt = document.getElementById("uncontrolled-tab-example-tab-judge");
    const jt_tab = document.getElementById(
      "uncontrolled-tab-example-tabpane-judge"
    );

    if (Number(currCnt) > 0) {
      //해당탭메뉴 테이블에 데이터가 존재할 경우
      const nav_link = document.querySelectorAll(".nav-link");
      const tab_pane = document.querySelectorAll(".tab-pane");

      let MenuArr = [
        { menuNm: "basic", cnt: basic_cnt },
        { menuNm: "sale", cnt: sale_cnt },
        { menuNm: "judge", cnt: judge_cnt },
      ];
      let idx = MenuArr.map((item, idx) => {
        return item.menuNm === currTab && idx;
      }).filter((val) => {
        return val !== false;
      });

      for (let i = 0; i < nav_link.length; i++) {
        nav_link[i].setAttribute("aria-selected", "false");
        nav_link[i].setAttribute("tabindex", "-1");
        nav_link[i].classList.remove("active");
        tab_pane[i].setAttribute("aria-hidden", "true");
        tab_pane[i].classList.remove("active", "show");
      }
      currTab === "" && setTabGbn("basic");
      if (currTab === "basic") {
        bt.setAttribute("aria-selected", "true");
        bt.removeAttribute("tabindex");
        bt.classList.add("active");
        bt_tab.setAttribute("aria-hidden", "false");
        bt_tab.classList.add("active", "show");
      } else if (currTab === "sale") {
        st.setAttribute("aria-selected", "true");
        st.removeAttribute("tabindex");
        st.classList.add("active");
        st_tab.setAttribute("aria-hidden", "false");
        st_tab.classList.add("active", "show");
      } else if (currTab === "judge") {
        jt.setAttribute("aria-selected", "true");
        jt.removeAttribute("tabindex");
        jt.classList.add("active");
        jt_tab.setAttribute("aria-hidden", "false");
        jt_tab.classList.add("active", "show");
      }
      setTabGbn(currTab);
    } else {
      //데이터가 미존재할 경우
      const nav_link = document.querySelectorAll(".nav-link");
      const tab_pane = document.querySelectorAll(".tab-pane");

      for (let i = 0; i < nav_link.length; i++) {
        nav_link[i].setAttribute("aria-selected", "false");
        nav_link[i].setAttribute("tabindex", "-1");
        nav_link[i].classList.remove("active");
        tab_pane[i].setAttribute("aria-hidden", "true");
        tab_pane[i].classList.remove("active", "show");
      }
      tabGbn === "" && setTabGbn("basic");
      if (tabGbn === "basic") {
        bt.setAttribute("aria-selected", "true");
        bt.removeAttribute("tabindex");
        bt.classList.add("active");
        bt_tab.setAttribute("aria-hidden", "false");
        bt_tab.classList.add("active", "show");
      } else if (tabGbn === "sale") {
        st.setAttribute("aria-selected", "true");
        st.removeAttribute("tabindex");
        st.classList.add("active");
        st_tab.setAttribute("aria-hidden", "false");
        st_tab.classList.add("active", "show");
      } else if (tabGbn === "judge") {
        jt.setAttribute("aria-selected", "true");
        jt.removeAttribute("tabindex");
        jt.classList.add("active");
        jt_tab.setAttribute("aria-hidden", "false");
        jt_tab.classList.add("active", "show");
      }
    }
    setTabRerend(false);
  }, [tabRerend === true]);

  return (
    dtailDataLoadState === true && (
      <React.Fragment>
        <div className="max_w">
          <div className="service_title_wrap">
            <div className="service_title_wrap_left">
              <p>{mainTitle}</p>
              <div className={getStateName(state).style}>
                <div>{getStateName(state).name}</div>
              </div>
            </div>
            <div className="service_title_wrap_right">
              <Form.Control
                as="select"
                value={detailID + "," + dzonID}
                onChange={onChangeCreateDataMove}
              >
                <option>다른 제작데이터 선택하기</option>
                {createData &&
                  createData.map((data, idx) => (
                    <option
                      key={idx}
                      value={data.pdbase_idx + "," + data.dzon_data_idx}
                    >
                      {data.data_title}
                    </option>
                  ))}
              </Form.Control>
            </div>
          </div>

          <Tabs
            defaultActiveKey="basic"
            id="uncontrolled-tab-example"
            onSelect={tabHandleSelect}
          >
            <Tab eventKey="basic" title="기본정보">
              {dtailDataLoadState === true && (
                <Basic_info
                  detailData={detailData}
                  detailID={detailID}
                  dzonID={dzonID}
                  dtailDataLoadState={dtailDataLoadState}
                  setReRend={setReRend}
                  setMainTitle={setMainTitle}
                  state={state}
                />
              )}
            </Tab>
            <Tab eventKey="sale" className="sale_info" title="판매정보">
              {
                <Data_sale_main
                  detailID={detailID}
                  dzonID={dzonID}
                  setJudgeClick={setJudgeClick}
                  state={state}
                />
              }
            </Tab>
            <Tab eventKey="judge" title="승인심사">
              {
                // 승인을 처음 진행할 경우
                <Judge
                  detailID={detailID}
                  dzonID={dzonID}
                  judgeClick={judgeClick}
                  setJudgeClick={setJudgeClick}
                  setJudge_cnt={setJudge_cnt}
                  setState={setState}
                  state={state}
                />
              }
            </Tab>
          </Tabs>
        </div>
      </React.Fragment>
    )
  );
};

export default purchase_create_data_detail;
