import React, { useEffect, useState, createContext, useContext } from "react";
import Pagination from "../../../pages/Root_component/Page_nations";
import { Roo_pagenation } from "../../../pages/Root_component/Page_nations";
import { Link, Route, Switch } from "react-router-dom";
import Gaci_page_nation_func from "../../../src/Gaci_page_nation";
import Notice_main_table from "./Component/Notice_main_table";
import { UncertApi_ajax_get } from "../../../server_ajax";
import Ajax from "../../../lib/ajax-3rd-custom";
import notice_update_all_empty from "../../../image/Center/Empty/notice_update_all_empty.png";

const Notice_content = () => {
  const [notice_main_list, setNotice_main_list] = useState([]);
  const [
    notice_main_list_page_nation,
    setNotice_main_list_page_nation,
  ] = useState([]);
  const [notice_data_yn, setNotice_data_yn] = useState(false);
  const [notice_page_nation, setNotice_page_nation] = useState(1);

  useEffect(() => {
    if (notice_data_yn === true) {
      Gaci_page_nation_func(
        notice_page_nation,
        notice_main_list,
        setNotice_main_list_page_nation,
        notice_main_list_page_nation
      );
    }
  }, [notice_data_yn, notice_page_nation, notice_main_list]);

  useEffect(() => {
    try {
      const url = "/developer/support/notice_main_list";
      Ajax.getUncertToken(url, "get", async (signature) => {
        const un_axios = await UncertApi_ajax_get(url, signature);
        setNotice_main_list(un_axios);
        setNotice_data_yn(true);
      });
    } catch (e) {
      return console.error(e);
    }
  }, []);

  return (
    <React.Fragment>
      <div className="faq_wrap">
        {notice_data_yn === true && (
          <div className="faq_table" id="login_api_upade_list_table">
            {notice_main_list.length !== 0 ? (
              notice_main_list_page_nation.map((notice_main_lists) => {
                // const shortIdHash = shortId.generate(notice_main_lists.notice_idx);
                return (
                  <Link
                    to={`/support/notice/content/${notice_main_lists.ntc_idx}`}
                  >
                    <Notice_main_table
                      table_key_id={notice_main_lists.ntc_idx}
                      table_lists_froum={notice_main_lists}
                      key={notice_main_lists.ntc_idx}
                      Rou_history={history}
                    />
                  </Link>
                );
              })
            ) : (
              <div className="all_empty">
                <img
                  src={notice_update_all_empty}
                  alt="notice_update_all_empty"
                />
                <p>등록된 내용이 없습니다.</p>
              </div>
            )}
          </div>
        )}
      </div>
      {notice_data_yn === true && notice_main_list.length !== 0 && (
        <Pagination />
      )}
      {Roo_pagenation(
        10,
        notice_main_list,
        notice_main_list_page_nation,
        setNotice_main_list_page_nation,
        notice_page_nation,
        setNotice_page_nation,
        false,
        null
      )}
    </React.Fragment>
  );
};

export default Notice_content;
