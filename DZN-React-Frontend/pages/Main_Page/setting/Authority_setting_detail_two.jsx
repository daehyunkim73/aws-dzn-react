import React, { createContext, useContext, useState } from "react";
import { usesettingContext } from "./Authority_setting";
import { useCallback } from "react";
import Tree from "./Tree";
import SubTree from "./subTree";
import { useEffect } from "react";
import Ajax from "../../../lib/ajax-3rd-custom"; //로그인 모듈
const settingContext2 = createContext();
const Authority_setting_detail_two = () => {
  const {
    treeOrigin,
    setTreeOrigin,
    treeLogic,
    crueInfo,
    setCrueInfo,
    filterCrueInfo,
    setFilterCrueInfo,
    prdSelect,
    saveArray,
    setSaveArray,
    setSaveDataSetting,
    saveDataSetting,
    cno,
  } = usesettingContext();
  // useEffect(() => {
  //   console.log("treeOrigin", treeOrigin);
  //   console.log("crueInfo", crueInfo);
  // });
  const globals = require("../../../lib/globals"); //로그인 모듈
  const [crueList, setCrueList] = useState([]);
  const [userid, setUserid] = useState("");
  const [boldSelect, setBoldSelect] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchReuslt, setSearchReuslt] = useState([]);
  const onChangeKeyword = (e) => setSearchKeyword(e.target.value);
  const selectAuthList = (id) => {
    //클릭직원구분state
    setUserid(id);
  };
  const addAuthList1 = useCallback(
    (id) => {
      //관리자 리스트에 직원 추가 (관리자 추가 버튼사용)
      if (prdSelect === "") {
        alert("권한설정을 할 대상을 선택해 주세요.");
      } else {
        let found = filterCrueInfo.find((a) => a.portal_id === id);
        console.log("found", filterCrueInfo.indexOf(found));
        if (filterCrueInfo.indexOf(found) === -1) {
          crueInfo
            .filter((x) => {
              return x.portal_id === id;
            })
            .map((c) => {
              setFilterCrueInfo((filterCrueInfo) => [...filterCrueInfo, c]);
            });

          setUserid("");
          setSaveDataSetting(!saveDataSetting);
        } else {
          alert("이미 관리자로 설정된 사용자 입니다.");
          setUserid("");
        }
      }
    },
    [
      prdSelect,
      filterCrueInfo,
      crueInfo,
      setFilterCrueInfo,
      setUserid,
      setSaveDataSetting,
    ]
  );
  const addAuthList = useCallback(
    (id) => {
      //관리자리스트에 직원 추가
      if (prdSelect === "") {
        alert("권한설정을 할 대상을 선택해 주세요.");
      } else {
        setUserid(id);
        let found = filterCrueInfo.find((a) => a.portal_id === id);
        console.log("found", filterCrueInfo.indexOf(found));
        if (filterCrueInfo.indexOf(found) === -1) {
          crueInfo
            .filter((x) => {
              return x.portal_id === id;
            })
            .map((c) => {
              setFilterCrueInfo((filterCrueInfo) => [...filterCrueInfo, c]);
            });
          setUserid("");
          setSaveDataSetting(!saveDataSetting);
        } else {
          alert("이미 관리자로 설정된 사용자 입니다.");
          setUserid("");
        }
      }
    },
    [
      prdSelect,
      setUserid,
      filterCrueInfo,
      crueInfo,
      setFilterCrueInfo,
      setUserid,
      setSaveDataSetting,
    ]
  );
  const searchCrue = () => {
    if (searchKeyword !== "") {
      const subUrl = `${globals.wehagoCommonApiUrl}/company/organizationmanagement/tree/employee/search?searchKeyword=${searchKeyword}`;
      Ajax.get(subUrl)
        .then(function (response) {
          let result = JSON.parse(response);
          console.log("result.resultData", result.resultData);
          setSearchReuslt(result.resultData);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  // const test = () => {
  //   const subUrl = `${globals.wehagoCommonApiUrl}/company/organizationmanagement/tree/employee/search?searchKeyword=한기업`;
  //   Ajax.get(subUrl)
  //     .then(function (response) {
  //       let result = JSON.parse(response);
  //       console.log("result.resultData", result.resultData);
  //       setSearchReuslt(result.resultData);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
  useEffect(() => {
    setCrueList([]);
    searchReuslt.map((s) => {
      crueInfo
        .filter((x) => {
          return (
            x.user_no === s.user_no && x.organization_no === s.organization_no
          );
        })
        .map((c) => {
          setCrueList((crueList) => [...crueList, c]);
        });
    });
  }, [searchReuslt]);
  return (
    <React.Fragment>
      <settingContext2.Provider
        value={{ setCrueList, boldSelect, setBoldSelect }}
      >
        <div className="service_detail">
          <div className="service_box">
            <div className="left_section">
              <div className="LUX_basic_treeview_wrap LUX_basic_treeview_wrap_v2">
                {/* <!--
                                                [D] 조직도 형태에 따른 클래스 추가
                                                    조직도 1단 : step_1
                                                    조직도 2단 : step_2
                                                    ** 조직도 연결, 미연결코드 등 하단에 커스터마이징 되는 부분이 있다면 클래스를 붙이지 않는다.
                                            --> */}
                <div className="LUX_basic_treeview step_1">
                  <div className="treeview_tit">
                    <h2>조직도</h2>
                  </div>
                  {/* <!--
                                                    선택모드 chart_ckmord 추가
                                                    편집모드 chart_setmord 추가
                                                --> */}
                  <div className="chart_lst">
                    <div className="chart_wrap">
                      {/* <!-- 조직도 콤포넌트 --> */}
                      {/* <!-- [D] 본점 혹은 지점 아래의 트리를 열어야 할 때 chart_open 클래스 추가 --> */}
                      <div className="chart_tit chart_open">
                        <span className="sp_lux"></span>
                        <span>
                          {treeLogic && treeOrigin[0].organization_name}
                          <span className="num">
                            {treeLogic && treeOrigin[0].employee_count}
                          </span>
                        </span>
                      </div>

                      {/* <!-- [D]회사코드, 사원코드, 미연결 표시 시 code_view 클래스 추가 --> */}
                      <div className="chart_tree">
                        {/* <!-- 그룹 수정 treebx_set 추가 --> */}
                        <div className="treebx">
                          <span className="LUX_basic_switch">
                            <span className="LUXckbx">
                              <input
                                type="checkbox"
                                id="input_forid_treebx_set2"
                              />
                              <span className="sp_lux"></span>
                              <label htmlFor="input_forid_treebx_set2">
                                &nbsp;
                              </label>
                            </span>
                          </span>
                          {treeLogic &&
                            treeOrigin[0].children.map((data, idx) => (
                              <Tree data={data} key={idx} />
                            ))}
                        </div>
                      </div>
                    </div>

                    <div className="chart_member">
                      {crueList.map((c) => (
                        <div
                          className={
                            c.portal_id === userid
                              ? "memberbx memberbx_select"
                              : "memberbx"
                          }
                          key={c.user_no}
                          onClick={() => {
                            selectAuthList(c.portal_id);
                          }}
                          onDoubleClick={() => {
                            addAuthList(c.portal_id);
                          }}
                        >
                          <span className="LUX_basic_switch">
                            <span className="LUXckbx">
                              <input
                                type="checkbox"
                                id="input_forid_chart_member1"
                              />
                              <span className="sp_lux"></span>
                              <label htmlFor="input_forid_chart_member1">
                                &nbsp;
                              </label>
                            </span>
                          </span>
                          <div className="memberin">
                            <div className="name">
                              <span className="sp_lux"></span>
                              {c.user_name}
                            </div>
                            <div className="elpbx">{c.user_email}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="chart_search">
                      <div className="LUX_basic_submit">
                        <div className="searchbx">
                          <span className="inpbx">
                            <input
                              type="text"
                              id="btn_submit"
                              onChange={onChangeKeyword}
                            />
                            <span className="placeholder">
                              {searchKeyword === ""
                                ? "조직 또는 사용자 이름으로 검색하세요."
                                : ""}
                            </span>
                          </span>
                          <button
                            type="button"
                            className="btn"
                            onClick={searchCrue}
                          >
                            <span className="sp_lux">검색</span>
                          </button>
                        </div>
                        <div className="resultbx">
                          <div
                            className="result_scrall"
                            style={{ maxHeight: "100px" }}
                          >
                            {/* <!-- 스크롤 생성 height 높이값 제어 --> */}
                            {/* <div className="result_scrallin">
                              <ul className="result_lst">
                                <li>
                                  <a href="#">
                                    <div>
                                      <span>검색결과</span>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <div>
                                      <span>검색결과</span> 리스트
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <div>
                                      <span>검색결과</span> 리스트리스트
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <div>
                                      <span>검색결과</span> 리스트리스트
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <div>
                                      <span>검색결과</span> 리스트리스트
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <div>
                                      <span>검색결과</span> 리스트리스트
                                    </div>
                                  </a>
                                </li>
                              </ul>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bt_btnbx">
                      <button
                        type="button"
                        className="LUX_basic_btn Default basic"
                        style={{ width: "100%" }}
                        onClick={() => {
                          addAuthList1(userid);
                        }}
                      >
                        <span>관리자추가</span>
                      </button>
                      {/* <button
                        type="button"
                        className="LUX_basic_btn Default basic"
                        style={{ width: "100%" }}
                        onClick={test}
                      >
                        <span>test</span>
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </settingContext2.Provider>
    </React.Fragment>
  );
};

export default Authority_setting_detail_two;
export function usesettingContext2() {
  return useContext(settingContext2);
}
