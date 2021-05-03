import React, { useCallback, useEffect, useState } from "react";
import first_btn from "../../image/Center/Pagination/first_btn.png";
import prev_btn from "../../image/Center/Pagination/prev_btn.png";
import Pagenation_link from "./pagenation_link";
import {
  Same_page_nation_next,
  Same_page_nation_prev,
} from "../../src/Same_page_nation";

let init_state = {
  page_field_list: 10,
  page_all_gaci: null,
  gaci_post: null,
  func_gaci_post: null,
  gaci_page_nation_num: null,
  func_page_nation_num: null,
  yn_state: null,
  search_date_state: null,
};

export function Roo_pagenation(page_field_list=10, page_all_gaci, gaci_post, func_gaci_post, gaci_page_nation_num, func_page_nation_num, yn_state, search_date_state) {
  init_state.page_field_list = page_field_list,
  init_state.page_all_gaci = page_all_gaci,
  init_state.gaci_post = gaci_post,
  init_state.func_gaci_post = func_gaci_post,
  init_state.gaci_page_nation_num = gaci_page_nation_num,
  init_state.func_page_nation_num = func_page_nation_num,
  init_state.yn_state = yn_state,
  init_state.search_date_state = search_date_state
}

const Page_nations = () => {
  const [number_array, setNumber_array] = useState([]);

  let {
    page_field_list,
    page_all_gaci,
    gaci_post,
    func_gaci_post,
    gaci_page_nation_num,
    func_page_nation_num,
    yn_state,
    search_date_state,
  } = init_state;

  const same_page_prev_nation = useCallback((page_nation_state) => () => {
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

  const same_page_next_nation = useCallback((page_nation_state) => () => {
      if (page_nation_state === "big_next_nation" || "next_nation_staton") {
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
        } else if (yn_state === true) {
          if (
            search_date_state[search_date_state.length - 1] ===
            gaci_post[gaci_post.length - 1]
          ) {
            return gaci_post;
          } else {
            if (page_nation_state === "big_next_nation") {
              search_date_state.map((v, i) => {
                setNumber_array([]);
                if (i < search_date_state.length / 10) {
                  i++;
                  setNumber_array(number_array.push(i));
                }
              });
              const page_last_number = number_array[number_array.length - 1];
              func_page_nation_num(page_last_number);
            }
            if (page_nation_state === "next_nation") {
              func_page_nation_num(gaci_page_nation_num + 1);
            }
          }
        }
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
          {
            page_all_gaci &&
            page_all_gaci.map((v, i) => {
              if (i < page_all_gaci.length / Number(page_field_list)) {
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
           }
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
