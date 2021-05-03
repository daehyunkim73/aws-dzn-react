import React, { useEffect, useState, createContext, useContext } from "react";
import Pagination from "../../../pages/Root_component/Page_nations";
import Gaci_page_nation_func from "../../../src/Gaci_page_nation";
import UptGroup_main_table from "./Component/UptGroup_main_table";
import axios from "axios";
import { Link } from "react-router-dom";
import { Roo_pagenation } from "../../../pages/Root_component/Page_nations";
import { UncertApi_ajax_get } from "../../../server_ajax";
import Ajax from "../../../lib/ajax-3rd-custom";
import notice_update_all_empty from "../../../image/Center/Empty/notice_update_all_empty.png";

const uptGroup_list = (props) => {
  const [update_main_list, setUpdate_main_list] = useState([]);
  const [
    update_main_list_page_nation,
    setUpdate_main_list_page_nation,
  ] = useState([]);
  const [update_data_yn, setUpdate_data_yn] = useState(false);
  const [update_page_nation, setUpdate_page_nation] = useState(1);
  const [titleValue, setTitleValue] = useState();
  useEffect(() => {
    (async function () {
      try {
        const url = `/developer/support/update?upt_title_desc_code=${props.match.params.upt_title_desc_code}`;
        Ajax.getUncertToken(url, "get", async (signature) => {
          const un_axios = await UncertApi_ajax_get(url, signature);
          setUpdate_main_list(un_axios);
          setUpdate_data_yn(true);
          setTitleValue(un_axios.upt_title_desc);
        });
      } catch (e) {
        return console.error(e);
      }
    })();
  }, []);
  useEffect(() => {
    if (update_data_yn === true) {
      Gaci_page_nation_func(
        update_page_nation,
        update_main_list,
        setUpdate_main_list_page_nation,
        update_main_list_page_nation
      );
    }
  }, [update_data_yn, update_page_nation, update_main_list]);
  return (
    <React.Fragment>
      <div className="page_title_wrap">
        <p className="page_title">{titleValue} 업데이트 내역</p>
        <div className="page_title_btn">
          <p>Home</p>
          <img
            className="caption_img"
            src="../image/Center/Dashboard/view_more.png"
          />
          <p>지원</p>
          <img
            className="caption_img"
            src="../image/Center/Dashboard/view_more.png"
          />
          <p>최신 업데이트</p>
        </div>
      </div>
      <div className="faq_wrap">
        {update_data_yn === true &&
        <div className="faq_table" id="login_api_upade_list_table">
          { update_main_list_page_nation.length !== 0 ? 
             update_main_list_page_nation.map((update_main_lists, index) => {
              return (
                <Link
                  key={index}
                  to={`/support/update/${update_main_lists.upt_title_desc_code}/${update_main_lists.upt_idx}`}
                >
                  <UptGroup_main_table
                    table_key_id={update_main_lists.upt_idx}
                    table_lists_froum={update_main_lists}
                    Rou_history={history}
                  />
                </Link>
              );
            }) : 
            <div className="all_empty">
              <img
                src={notice_update_all_empty}
                alt="notice_update_all_empty"
              />
              <p>등록된 내용이 없습니다.</p>
          </div>
          }
        </div>
        }
      </div>
      { update_main_list_page_nation.length !== 0 && <Pagination />}
      {Roo_pagenation(
        10,
        update_main_list,
        update_main_list_page_nation,
        setUpdate_main_list_page_nation,
        update_page_nation,
        setUpdate_page_nation,
        false,
        null
      )}
    </React.Fragment>
  );
};
export default uptGroup_list;
