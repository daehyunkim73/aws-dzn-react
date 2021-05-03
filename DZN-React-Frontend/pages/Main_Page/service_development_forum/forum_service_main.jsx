import React, { useEffect, useState, useCallback, useRef } from "react";
import Form from "react-bootstrap/Form";
// import Pagination from "../../Main_Page/component/Pagination";
import Forum_notice from "./Commponent/forum_service_notice";
import { Link } from "react-router-dom";
import Forum_check_blue from "../../../image/Dev_Center/Forum/check_blue.png";
import Forum_check_gray from "../../../image/Dev_Center/Forum/check_gray.png";
import { Server_ajax_get, UncertApi_ajax_get, Server_ajax_post, User_info } from '../../../server_ajax';
import Service_main_table from "./Commponent/Service_main_table";
import { Page_nation_factory } from "../../../src/Gaci_page_nation";
import Pagenations from "../../../pages/Root_component/Page_nations";
import { Roo_pagenation } from "../../../pages/Root_component/Page_nations";
import { useCookies } from "react-cookie";
import Gaci_post_delete_popup from "../../popup/Small_popup/Forum/Gaci_post_delete_popup";
import Service_forum_main_search_none from './service_forum_main_search_none';
import Ajax from "../../../lib/ajax-3rd-custom";

const Forum_service_main = () => {
  const select_change = useRef();
  const text_title_desc_search = useRef();
  const post_user_ifno = useRef();

  const [service_forum_main, setService_forum_main] = useState([]);
  const [service_forum_main_pagenation, setService_forum_main_pagenation] = useState([]);
  const [service_forum_search, setService_forum_search] = useState([]);
  const [service_forum_search_pagenation, setService_forum_search_pagenation] = useState([]);

  const [service_forum_comments, setService_forum_comments] = useState([]);
  const [forum_page_nation, setForum_page_nation] = useState(1);
  const [search_yn_lie, setSearch_yn_lie] = useState(false); //검색 구별
  const [user_my_post_yn, setUser_my_Post] = useState(false); //내가 쓴글보기
  const [cookies, setCookie, removeCookie] = useCookies();
  const [delete_post, setDelete_post] = useState();
  const [delete_post_yn, setDelete_post_yn] = useState(false);
  const [user_search_result_value, setUser_search_result_value] = useState({}); //검색 정보

  function Post_factory(post_pagenation, post) {
    const result = new Page_nation_factory(post_pagenation, post);
    if (result.resultPageing) {
      return result.resultPageing;
    } else {
      return [];
    }
  }

  useEffect(() => {
    setForum_page_nation(1);
  }, [search_yn_lie, service_forum_main_pagenation]);

  useEffect(() => {
    const req_Post_factory = Post_factory(forum_page_nation, service_forum_main);
    setService_forum_main_pagenation(req_Post_factory);
  }, [search_yn_lie === false && forum_page_nation, service_forum_main]);

  useEffect(() => {
    const req_Post_factory = Post_factory(forum_page_nation, service_forum_search);
    setService_forum_search_pagenation(req_Post_factory);
  }, [search_yn_lie === true && forum_page_nation, service_forum_search]);

  useEffect(() => {
    if (user_my_post_yn === false || delete_post_yn === true) {
       const post_url = `/developer/forum/data_forum_main_list?forum_gbn=S`;
      const comment_url = '/developer/forum/data_forum_comment_lists';

        Ajax.getUncertToken(post_url, "get", async (signature) => { //메인
          const Service_result = await UncertApi_ajax_get(post_url, signature);
          setService_forum_main(Service_result);
          setDelete_post_yn(false);
          post_user_ifno.current.className = "forum_post_btn";
          setUser_my_Post(false);
        });

        Ajax.getUncertToken(comment_url, "get", async (signature) => { //댓글 수정(예정)
          const Main_forum_comments_post = await UncertApi_ajax_get(comment_url, signature);
          setService_forum_comments(Main_forum_comments_post);
        });
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

      let body = {
        Developement_division: 'S',
        category_data: select_value
      }

      const ajax_post_result = await Server_ajax_post('forum/forum_post_search', body);
      setService_forum_search(ajax_post_result);
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
  }, [search_yn_lie, service_forum_search, user_my_post_yn]);

  const search_post = async () => {
    try {
      const search_title_desc_value = text_title_desc_search.current.value;
      const search_select_value = select_change.current.value;

      let body = {
        Developement_division: 'S',
        category_data: search_select_value,
        post_title_desc: search_title_desc_value,
      }

      const ajax_post_result = await Server_ajax_post('forum/forum_post_search', body);
      setService_forum_search(ajax_post_result);
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
        setService_forum_main(result);
      } else {
        const result = await user_info_data(body);
        setService_forum_search(result);
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

  return (
    <React.Fragment>
      <Gaci_post_delete_popup 
         Delete_post_info={delete_post}
         Ddelete_post_yn={setDelete_post_yn}
         Delete_search_post={search_post}
      />
      <div className="data_forum_wrap">
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
          <Link to="/forum/service/write">
            <button>글 쓰기</button>
          </Link>
          <button className="forum_search" onClick={search_input_click}>검색</button>
        </div>
        <Forum_notice />
        <div className="data_forum_post">
          <div className="forum_post_title_wrap">
            <p>
              게시글 [총 <span>
                {search_yn_lie === false ?
                  service_forum_main.length
                  : service_forum_search.length}</span>건]
            </p>
            <div className="forum_post_btn_wrap">
              <div className="forum_post_btn" ref={post_user_ifno} onClick={user_writing_post}>
                <img src={user_my_post_yn === false ? Forum_check_gray : Forum_check_blue}
                  alt={user_my_post_yn === false ? "check_gray" : "check_blue"} />
                <p>내가 쓴 글 보기</p>
              </div>
            </div>
          </div>
          {
            search_yn_lie === false ?
            service_forum_main.length === 0 ? 
            <Service_forum_main_search_none Search_value={user_search_result_value} />
              :
              service_forum_main_pagenation.map((service_main_item) => {
                return (
                  <div key={service_main_item.forum_idx}>
                    {
                      user_my_post_yn === true ?
                        <div>
                          <Link to={`/forum/service/update/${service_main_item.forum_idx}`}><button>수정</button></Link>
                          <button onClick={Forum_post_delete(service_main_item)}>삭제</button>
                        </div>
                        : <></>
                    }
                    <Link to={`/forum/service/content/${service_main_item.forum_idx}`}>
                      <Service_main_table
                        table_comments_forum={service_forum_comments}
                        Service_post_info={service_main_item}
                      />
                    </Link>
                  </div>

                )
              })
              :
              service_forum_search.length === 0 ? 
              <Service_forum_main_search_none Search_value={user_search_result_value} />
              :
              service_forum_search_pagenation.map((service_search_item) => {
                return (
                  <div>
                    {
                      user_my_post_yn === true ?
                        <div>
                          <Link to={`/forum/service/update/${service_search_item.forum_idx}`}><button>수정</button></Link>
                          <button onClick={Forum_post_delete(service_search_item)}>삭제</button>
                        </div>
                        : <></>
                    }
                    <Link to={`/forum/service/content/${service_search_item.forum_idx}`}
                      key={service_search_item.forum_idx}
                    >
                      <Service_main_table
                        table_comments_forum={service_forum_comments}
                        Service_post_info={service_search_item}
                      />
                    </Link>
                  </div>

                )
              })
          }
        </div>
      </div>
      {
        search_yn_lie === false
          ? Roo_pagenation(
            10,
            service_forum_main, //전체 게시글
            service_forum_main_pagenation, //페이지 네이션 게시글
            setService_forum_main_pagenation, //페이지 네이션 게시글 func
            forum_page_nation, //현재 페이션 네이션
            setForum_page_nation, //현재 페이지 네이션 함수
            false,
            null
          )
          :
          Roo_pagenation(
            10,
            service_forum_search,
            service_forum_main_pagenation,
            setService_forum_main_pagenation,
            forum_page_nation,
            setForum_page_nation,
            false,
            null
          )
      }
      {search_yn_lie === false ? (
        service_forum_main.length === 0 ? (
          <></>
        ) :
          (
            <Pagenations />
          )
      ) : service_forum_search.length === 0 ? (
        <></>
      ) :
          (
            <Pagenations />
          )}
    </React.Fragment>
  );
};

export default Forum_service_main;
