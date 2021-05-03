import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { usesettingContext } from "./Authority_setting";
const globals = require("../../../lib/globals");
const Authority_setting_detail_three = () => {
  const {
    filterCrueInfo,
    setFilterCrueInfo,
    setAuthorityLogic,
    authorityLogic,
    saveAuth,
    deletArray,
    setDeletArray,
    crueInfo,
    saveArray,
    setSaveArray,
    setSaveDataSetting,
    saveDataSetting,
  } = usesettingContext();
  const cancel = useCallback(() => {
    setAuthorityLogic(!authorityLogic);
    setDeletArray([]);
  }, [setAuthorityLogic, authorityLogic, setDeletArray]);
  const deleteCrue = useCallback(
    (id) => {
      setFilterCrueInfo(filterCrueInfo.filter((c) => c.portal_id !== id));
      let found = deletArray.find((a) => a.portal_id === id);
      console.log("found", deletArray.indexOf(found));
      if (filterCrueInfo.indexOf(found) === -1) {
        crueInfo
          .filter((x) => {
            return x.portal_id === id;
          })
          .map((c) => {
            setDeletArray((deletArray) => [...deletArray, c.portal_id]);
          });
        setSaveDataSetting(!saveDataSetting);
      }
    },
    [
      setFilterCrueInfo,
      filterCrueInfo,
      deletArray,
      crueInfo,
      setDeletArray,
      setSaveDataSetting,
      saveDataSetting,
    ]
  );

  return (
    <React.Fragment>
      <div className="set_admin_data">
        <div className="service_title noborder">
          <h3 className="title">관리자 리스트</h3>
        </div>
        <div className="admin_user_list">
          {/* <!-- Empty set --> */}
          {filterCrueInfo.length === 0 ? (
            <div className="nodata_area" style={{ padding: "210px 0 45px" }}>
              <p className="nodata_text">데이터가 없습니다.</p>
            </div>
          ) : (
            <></>
          )}
          {/* <!-- //Empty set --> */}
          <div className="scroll">
            <ul>
              {filterCrueInfo.map((c) => {
                return (
                  <li key={c.user_no}>
                    <div className="admin_card admin_card_v2">
                      <div className="LS_profile_image is_border">
                        <div
                          className="image_box"
                          style={{
                            backgroundImage:
                              c.profile_url !== ""
                                ? `url(${globals.portalUrl}${c.profile_url})`
                                : `url(https://static.wehago.com/imgs/dummy/@dummy_02.jpg)`,
                          }}
                        ></div>
                      </div>
                      <div className="default_info">
                        <p className="user_name ellipsis">
                          <strong>{c.user_name}</strong>{" "}
                        </p>
                        <div
                          className="LUX_basic_tooltip"
                          style={{ verticalAlign: "top" }}
                        >
                          <span className="LUX_basic_switch">
                            <span className="LUXstarbx">
                              {/* <!-- 동일한 구조 input type checkbox LUXckbx LUXstarbx / radio LUXrabx LUXonoffbx 로 이이지 변경 --> */}
                              <input type="checkbox" id="input_forid_ckbox13" />
                              {/* <!-- 이미지 --> */}
                              <span className="sp_lux"></span>
                              {/* <!-- input id 값과 label htmlFor 값을 동일하게 연결 --> */}
                              <label htmlFor="input_forid_ckbox13">
                                {c.rank_name}
                              </label>
                            </span>
                          </span>
                          {/* <!--<div className="tooltip_msg top top_left" style={{width:"220px",marginLeft:"-17px"}}>
                                                 대표관리자 설정<br />- 서비스에서 관리자 정보가 제공이 필요한 화면이 있는경우 대표관리자로 설정된 관리자의 정보가 제공됩니다.
                                             </div>--> */}
                        </div>
                        <p className="user_department ellipsis">
                          {c.full_path}
                        </p>
                      </div>
                      <dl className="more_info">
                        <dt>
                          <span className="blind">전화번호</span>
                          <span className="sp_lux sp_phone"></span>
                        </dt>
                        <dd className="tel ellipsis">{c.user_contact}</dd>
                        <dt>
                          <span className="blind">이메일</span>
                          <span className="sp_lux sp_mail"></span>
                        </dt>
                        <dd className="mail ellipsis">
                          {c.user_default_email}
                        </dd>
                      </dl>
                      <button
                        type="button"
                        className="LUX_basic_btn btn_del"
                        onClick={() => {
                          deleteCrue(c.portal_id);
                        }}
                      >
                        <span className="sp_lux">삭제</span>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="btn_group">
          <button
            type="button"
            className="LUX_basic_btn SAOverConfirm basic"
            style={{ margin: "0 2px" }}
            onClick={cancel}
          >
            <span>취소</span>
          </button>
          <button
            type="button"
            className="LUX_basic_btn SAOverConfirm basic2"
            style={{ margin: "0 2px" }}
            onClick={saveAuth}
          >
            <span>저장</span>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Authority_setting_detail_three;
