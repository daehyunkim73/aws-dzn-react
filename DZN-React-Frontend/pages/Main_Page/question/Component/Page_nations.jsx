import React, { useCallback, useEffect, useState } from "react";

import first_btn from "../../../../image/Center/Pagination/first_btn.png";
import prev_btn from "../../../../image/Center/Pagination/prev_btn.png";
import Pagenation_link from "./Post_pagenation_link";
import {
  Same_page_nation_next,
  Same_page_nation_prev,
} from "../../../../src/Same_page_nation";

let init_state = {
  oper_page_num: null,
  page_all_gaci: null,
  gaci_post: null,
  func_gaci_post: null,
  gaci_page_nation_num: null,
  func_page_nation_num: null,
  yn_state: null,
  search_date_state: null,
};

export function Roo_pagenation(
  page_oper_num,
  page_all_gaci,
  gaci_post,
  func_gaci_post,
  gaci_page_nation_num,
  func_page_nation_num,
  yn_state,
  search_date_state
) {
  init_state.oper_page_num = page_oper_num;
  (init_state.page_all_gaci = page_all_gaci),
    (init_state.gaci_post = gaci_post),
    (init_state.func_gaci_post = func_gaci_post),
    (init_state.gaci_page_nation_num = gaci_page_nation_num),
    (init_state.func_page_nation_num = func_page_nation_num),
    (init_state.yn_state = yn_state),
    (init_state.search_date_state = search_date_state);
}

const Page_nations = () => {
  const [number_array, setNumber_array] = useState([]);
  let {
    oper_page_num,
    page_all_gaci,
    gaci_post,
    func_gaci_post,
    gaci_page_nation_num,
    func_page_nation_num,
    yn_state,
    search_date_state,
  } = init_state;

  const same_page_prev_nation = useCallback(
    (page_nation_state) => () => {
      Same_page_nation_prev(
        page_nation_state,
        gaci_page_nation_num,
        func_gaci_post,
        gaci_post,
        func_page_nation_num
      );
    },
    [gaci_page_nation_num && gaci_post]
  );

  const same_page_next_nation = useCallback(
    (page_nation_state) => () => {            
      if (yn_state === false) {
        Same_page_nation_next(
          page_all_gaci, //전체 게시물
          gaci_post, //페이지네이션 게시물
          func_gaci_post,
          page_nation_state,
          setNumber_array,
          number_array,
          func_page_nation_num,
          gaci_page_nation_num
        );
      }      
    },
    [(gaci_page_nation_num && number_array && gaci_post) || yn_state]
  );

  return (
    <React.Fragment>
      <div className="pagination_wrap">
        <div className="pagination_btn_wrap">
          <div className="prev_btn_wrap">
            <img
              src={first_btn}
              alt="prev"
              onClick={same_page_prev_nation("big_prev_nation")}
            />
            <img
              src={prev_btn}
              alt="last_prev"
              onClick={same_page_prev_nation("prev_nation")}
            />
          </div>
          {yn_state === false
            ? page_all_gaci &&
              page_all_gaci.map((v, i) => {
                if (i < page_all_gaci.length / Number(oper_page_num)) {
                  i++;
                  return (
                    <Pagenation_link                      
                      link_index={i}
                      post_data={gaci_post}
                      setPost_data={func_gaci_post}
                      page_nation_num={gaci_page_nation_num}
                      setPage_nation_num={func_page_nation_num}
                      key={v.id}
                    />
                  );
                }
              })
            : search_date_state &&
              search_date_state.map((search_list_v, search_list_i) => {
                if (
                  search_list_i <
                  search_date_state.length / Number(oper_page_num)
                ) {
                  search_list_i++;
                  return (
                    <Pagenation_link                      
                      link_index={search_list_i}
                      post_data={gaci_post}
                      setPost_data={func_gaci_post}
                      page_nation_num={gaci_page_nation_num}
                      setPage_nation_num={func_page_nation_num}
                      key={search_list_v.id}
                    />
                  );
                }
              })}
          <div className="next_btn_wrap">
            <img
              src={prev_btn}
              alt="next"
              onClick={same_page_next_nation("next_nation")}
            />
            <img
              src={first_btn}
              alt="last_next"
              onClick={same_page_next_nation("big_next_nation")}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Page_nations;
