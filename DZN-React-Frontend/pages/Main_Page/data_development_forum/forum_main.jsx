import React, { useEffect, useState, useRef, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Forum_notice from "./Component/forum_notice";
import { Link } from "react-router-dom";
import Forum_check_blue from "../../../image/Dev_Center/Forum/check_blue.png";
import Forum_check_gray from "../../../image/Dev_Center/Forum/check_gray.png";
import Forum_main_table from "./Component/Forum_main_table";
import { Page_nation_factory } from "../../../src/Gaci_page_nation";
import Pagenations from "../../../pages/Root_component/Page_nations";
import { Roo_pagenation } from "../../../pages/Root_component/Page_nations";
import { Server_ajax_get, UncertApi_ajax_get, Server_ajax_post } from "../../../server_ajax";
import Ajax from "../../../lib/ajax-3rd-custom";
import Data_forum_search_non from './data_forum_main_search_none';
import { useCookies } from "react-cookie";
import { User_info } from '../../../server_ajax';
import Gaci_post_delete_popup from "../../popup/Small_popup/Forum/Gaci_post_delete_popup";
import { portalUrl } from "../../../lib/globals";
import Axios from "axios";

const Forum_main = (props) => {
  const select_change = useRef();
  const text_title_desc_search = useRef();
  const post_user_ifno = useRef();

  const [Main_forum, setMain_forum] = useState([]); //메인 전체 게시물
  const [search_forum, setSearch_forum] = useState([]); //검색 전체 게시물
  const [forum_main_list, setForum_main_list] = useState([]); //메인 페이지네이션 게시물
  const [search_lists, setSearch_lists] = useState([]); //검색 페이지네이션 게시물

  const [forum_page_nation, setForum_page_nation] = useState(1); //페이지 네이션 번호
  const [search_yn_lie, setSearch_yn_lie] = useState(false); //검색 구별
  const [user_my_post_yn, setUser_my_Post] = useState(false); //내가 쓴글보기
  const [comment_lists, setComment_list] = useState([]); //댓글
  const [forum_add_file, setForum_add_file] = useState([]); //파일
  const [cookies, setCookie, removeCookie] = useCookies();
  const [delete_post, setDelete_post] = useState();
  const [delete_post_yn, setDelete_post_yn] = useState(false);
  const [user_search_result_value, setUser_search_result_value] = useState({
    cate_value: "",
    title_value: ""
  }); //검색 정보

  function Post_factory(post_pagenation, post) {
    const result = new Page_nation_factory(post_pagenation, post);
    if (result.resultPageing) {
      return result.resultPageing;
    } else {
      return [];
    }
  }

  useEffect(() => {
    const search_title_desc_value = text_title_desc_search.current.value;
    const search_select_value = select_change.current.value;

    setUser_search_result_value({
      cate_value: search_select_value,
      title_value: search_title_desc_value,
    })
  }, [search_forum])

  useEffect(() => {
    setForum_page_nation(1);
  }, [search_yn_lie, search_forum, user_my_post_yn]);

  useEffect(() => {
    const factory_result = Post_factory(forum_page_nation, Main_forum);
    setForum_main_list(factory_result);
  }, [search_yn_lie === false && forum_page_nation, Main_forum]);

  useEffect(() => {
    const factory_result = Post_factory(forum_page_nation, search_forum);
    setSearch_lists(factory_result);
  }, [search_yn_lie === true && forum_page_nation, search_forum]);

  useEffect(() => {
    try {
      if (user_my_post_yn === false || delete_post_yn === true) {
        const post_url = `/developer/forum/data_forum_main_list?forum_gbn=D`;
        const comment_url = '/developer/forum/data_forum_comment_lists';

        Ajax.getUncertToken(post_url, "get", async (signature) => { //메인
          const Main_forum_post = await UncertApi_ajax_get(post_url, signature);
          setMain_forum(Main_forum_post);
          setDelete_post_yn(false);
          post_user_ifno.current.className = "forum_post_btn";
          setUser_my_Post(false);
        });

        Ajax.getUncertToken(comment_url, "get", async (signature) => { //댓글 수정(예정)
          const Main_forum_comments_post = await UncertApi_ajax_get(comment_url, signature);
          setComment_list(Main_forum_comments_post);
        });
      }
    } catch (e) {
      return console.error(e);
    }
  }, [user_my_post_yn, delete_post_yn]);

  const select_func_chage = useCallback(async () => {  //카테고리 검색
    try {
      setUser_my_Post(false);
      post_user_ifno.current.className = "forum_post_btn";
      const select_value = select_change.current.value;
      if (select_value === '카테고리 선택') {
        return setSearch_yn_lie(false);
      }
      setSearch_yn_lie(true);
      text_title_desc_search.current.value = ''

      let body = {
        Developement_division: 'D',
        category_data: select_value
      }

      const ajax_post_result = await Server_ajax_post('forum/forum_post_search', body);
      setSearch_forum(ajax_post_result);
    } catch (e) {
      return console.error(e);
    }
  }, [search_yn_lie, user_my_post_yn]);

  const search_input_click = useCallback(async () => { //카테고리 + 문자열 검색, 문자열 검색
    try {
      setUser_my_Post(false);
      post_user_ifno.current.className = "forum_post_btn";
      const search_title_desc_value = text_title_desc_search.current.value;
      if (!search_title_desc_value || !search_title_desc_value.trim()) {
        alert('글을 입력해주세요.');
        return setSearch_yn_lie(false);
      }
      setSearch_yn_lie(true);
      search_post();
    } catch (e) {
      return console.error(e);
    }
  }, [search_yn_lie, search_forum, user_my_post_yn]);

  const search_post = async () => {
    try {
      const search_title_desc_value = text_title_desc_search.current.value;
      const search_select_value = select_change.current.value;

      let body = {
        Developement_division: 'D',
        category_data: search_select_value,
        post_title_desc: search_title_desc_value,
      }

      const ajax_post_result = await Server_ajax_post('forum/forum_post_search', body);
      setSearch_forum(ajax_post_result);
    } catch (e) {
      return console.error(e);
    }
  }

  async function user_info_data(data) {
    const User_psot = await Server_ajax_post(`forum/user_writing_post`, data);
    setUser_my_Post(true);
    return User_psot
  }

  const user_writing_post = async () => {
    try {
      if (!cookies.wehago_s) {
        alert('로그인을 먼저 해주세요.')
        return setUser_my_Post(false);
      }
      const post_user_infos = post_user_ifno.current;
      const search_title_desc_value = text_title_desc_search.current.value;
      const search_select_value = select_change.current.value;
      const user_info_cno_result = await User_info();

      let body = {
        forum_gbn: 'D',
        user_cno: user_info_cno_result.resultData[0].user_no
      }

      if (post_user_infos.className === "forum_post_btn forum_post_btn_active") {
        post_user_infos.className = 'forum_post_btn';
        if (search_yn_lie === true) {
          search_post();
        }
        return setUser_my_Post(false);
      }
      post_user_infos.className = "forum_post_btn forum_post_btn_active";

      if (search_yn_lie === true) {
        body.search_title_desc_value = search_title_desc_value;
        body.search_select_value = search_select_value;
        const result = await user_info_data(body);
        setSearch_forum(result);
      } else {
        const result = await user_info_data(body);
        setMain_forum(result);
      }
    } catch (e) {
      return console.error(e);
    }
  }

  const Forum_post_delete = (post_data) => () => {
    const Forum_deleted_popup = document.getElementById("Froum_post_deleted_bgk");
    Forum_deleted_popup.style.display = "table";
    setDelete_post(post_data);
  }
  
  const HrefnotWorking = (e) => {
    if(e.target.tagName === "IMG" && e.target.id === "delete_post_icon") {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }

  return (
    <React.Fragment>
      <div className="data_forum_wrap">
        <Gaci_post_delete_popup
          Delete_post_info={delete_post}
          Ddelete_post_yn={setDelete_post_yn}
          Delete_search_post={search_post}
        />
        <div className="data_forum_input">
          <Form.Control
            as="select"
            className="search_select"
            ref={select_change}
            onChange={select_func_chage}
          >
            <option>카테고리 선택</option>
            <option>사용방법</option>
            <option>문제해결</option>
            <option>자유토론</option>
            <option>데이터분석</option>
            <option>빅 데이터</option>
          </Form.Control>
          <Form.Control
            type="text"
            className="form_input"
            placeholder="제목 및 내용을 입력해주세요."
            ref={text_title_desc_search}
          />
          <Link to="/forum/data/write">
            <button>글 쓰기</button>
          </Link>
          <button className="forum_search" onClick={search_input_click}>
            검색
          </button>
        </div>
        <Forum_notice />
        <div className="data_forum_post">
          <div className="forum_post_title_wrap">
            <p>
              게시글 [총{" "}
              <span>
                {search_yn_lie === false ?
                  Main_forum.length
                  : search_forum.length}
              </span>
              건]
            </p>
            <div className="forum_post_btn_wrap">
              <div className="forum_post_btn" ref={post_user_ifno} onClick={user_writing_post}>
                <img src={user_my_post_yn === false ? Forum_check_gray : Forum_check_blue}
                  alt={user_my_post_yn === false ? "check_gray" : "check_blue"} />
                <p>내가 쓴 글 보기</p>
              </div>
            </div>
          </div>
          {search_yn_lie === false ?
            Main_forum.length === 0 ? 
            <Data_forum_search_non Search_value={user_search_result_value} />
              :
              forum_main_list.map((forum_main_lists) => {
                return (
                  <div key={forum_main_lists.forum_idx}>
                    <Link to={`/forum/data/content/${forum_main_lists.forum_idx}`} onClick={HrefnotWorking}>
                      <Forum_main_table
                        table_lists_froum={forum_main_lists}
                        table_comments_forum={comment_lists}
                        forum_state_add_file={forum_add_file}
                        user_my_post_yn={user_my_post_yn}
                        Forum_post_delete={Forum_post_delete}
                      />
                    </Link>
                  </div>
                );
              })
            :
            search_forum.length === 0 ? 
            <Data_forum_search_non Search_value={user_search_result_value} />
              :
              search_lists.map((search_list) => {
                return (
                  <div key={search_list.forum_idx}>
                    <Link to={`/forum/data/content/${search_list.forum_idx}`} onClick={HrefnotWorking}>
                      <Forum_main_table
                        table_lists_froum={search_list}
                        table_comments_forum={comment_lists}
                        forum_state_add_file={forum_add_file}
                        User_post_yn={user_my_post_yn}
                        Forum_post_delete={Forum_post_delete}
                      />
                    </Link>
                  </div>
                );
              })}
        </div>
      </div>
      {
        search_yn_lie === false
          ? Roo_pagenation(
            10,
            Main_forum, //전체 게시글
            forum_main_list, //페이지 네이션 게시글
            setForum_main_list, //페이지 네이션 게시글 func
            forum_page_nation, //현재 페이션 네이션
            setForum_page_nation, //현재 페이지 네이션 함수
            false,
            null
          )
          :
          Roo_pagenation(
            10,
            search_forum,
            search_lists,
            setSearch_lists,
            forum_page_nation,
            setForum_page_nation,
            false,
            null
          )
      }

      {search_yn_lie === false ? (
        Main_forum.length === 0 ? (
          <></>
        ) :
          (
            <Pagenations />
          )
      ) : search_forum.length === 0 ? (
        <></>
      ) :
          (
            <Pagenations />
          )}
    </React.Fragment>
  );
};

export default Forum_main;
