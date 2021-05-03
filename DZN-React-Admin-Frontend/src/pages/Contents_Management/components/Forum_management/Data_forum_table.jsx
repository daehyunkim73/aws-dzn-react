import React, { useEffect, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Data_table_popup_delete from "../../../popup/Popup_forum_Management/Data_posts_delete_popup";
import { Link } from "react-router-dom";
import file from "../../../../../image/Dev_Center/Forum/file.png";
import { useCallback } from "react";
import { Server_ajax_get } from '../../../../../Server_ajax';
import { Page_nation_factory } from '../../../../../func_src/Gaci_page_nation';
import { Roo_pagenation } from "../../../../../Root_component/Post_pagenation";
import Pagenations from "../../../../../Root_component/Post_pagenation";

const Data_forum_table = () => {
  const cate_search_ref = useRef();

  const [forum_postList, setForum_postList] = useState([]); //전체 게시글
  const [forum_page_post_list, setForum_page_post_list] = useState([]);

  const [search_forum_postList, setSearch_forum_postList] = useState([]); //검색 게시글
  const [search_forum_page_post_list, setSearch_orum_page_post_list] = useState([]); 

  const [forum_delete, setForum_delete] = useState([]);
  const [forum_remove_yn, setForum_remove_yn] = useState(false);
  const [search_forum_yn, setSearch_forum_yn] = useState(false);
  const [forum_page_nation, setForum_page_nation] = useState(1);
  const [page_list_num, setPage_list_num] = useState(10);

  function Post_factory(post_pagenation, post) {
    const result = new Page_nation_factory(post_pagenation, post);
    if (result.resultPageing) {
      return result.resultPageing;
    } else {
      return [];
    }
  }

  useEffect(() => {
    const factory_result = Post_factory(forum_page_nation, forum_postList);
    setForum_page_post_list(factory_result);
  }, [forum_remove_yn === false && forum_page_nation, forum_postList]);

  useEffect(() => {
    const factory_result = Post_factory(forum_page_nation, search_forum_postList);
    setSearch_orum_page_post_list(factory_result);
  }, [forum_remove_yn === false && forum_page_nation, search_forum_postList])

  useEffect(() => {
    (async function () {
      try {
        const axios_host = await Server_ajax_get(
          'contents_management/admin_forum_post_list'
        )
        const filter_result = axios_host.filter((item, index, self) => { //배열 증복객체 제거
          return index === self.findIndex((find_self) => (
            find_self.forum_idx === item.forum_idx
          ))
        });
        setForum_postList(filter_result);
      } catch (e) {
        return console.error(e);
      }
    })()
  }, [forum_remove_yn === true]);

  const forum_list_remove = useCallback((fourm_item) => () => {
    const Admin_user_data_forum_delete_popup_bgk = document.getElementById(
      "Admin_user_data_forum_delete_popup_bgk"
    );

    Admin_user_data_forum_delete_popup_bgk.style.display = "table";
    setForum_delete(forum_delete => [...forum_delete, fourm_item]);
  }, [forum_delete]);

  const cate_search = useCallback(() => {

  }, []);

  return (
    <React.Fragment>
      <Data_table_popup_delete
        Forum_delete={forum_delete}
        Forum_delete_func={setForum_delete}
        Forum_remove_func={setForum_remove_yn}
      />
      <div
        className="backoffice_table_wrap data_sp_table"
        id="big_admin_table_box"
      >
        <Table responsive id="question_table">
          <caption className="tb_caption">
            <div className="table_result_number_box">
              <div className="tb_select_wrap" id="select_result_delete_btn_box">
                <div className="caption_title bold_none">
                  [총 <p className="number_data">{forum_postList.length}</p>건 ] 검색결과
                  <p className="number_data">{search_forum_yn === false ? forum_postList.length : search_forum_postList.length}</p>건
                </div>
              </div>
              <div className="tb_select_wrap" id="select_cpation_uploade_box">
                <Form.Control as="select" className="list_select tb_select" onChange={cate_search}>
                  <option>카테고리 전체</option>
                  <option>사용 방법</option>
                  <option>문제해결</option>
                  <option>자유 토론</option>
                  <option>데이터 분석</option>
                </Form.Control>
                <Form.Control as="select" className="table_select tb_select">
                  <option>최종 게시 순</option>
                  <option>죄다 조회 순(인기 순)</option>
                </Form.Control>
                <Form.Control as="select" className="list_select tb_select">
                  <option>목록 50</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </div>
            </div>
          </caption>
          <thead>
            <tr>
              <th>회원명/아이디</th>
              <th>카테고리</th>
              <th>제목</th>
              <th>삭제</th>
              <th>게시일</th>
            </tr>
          </thead>
          <tbody>
            {
              forum_page_post_list.map((item, index) => {
                return (
                  <tr key={item.forum_idx}>
                    <td>
                      <span className="table_href">{item.post_writer}</span>
                    </td>
                    <td>{item.cate_code}</td>
                    <td>
                      <Link
                        className="link_style_text"
                        to={`/admin/forum/${item.forum_idx}`}
                      >
                        {item.title}
                        {
                          item.forum_file_path && <img className="table_image" src={file} alt="file" />
                        }
                      </Link>
                    </td>
                    <td className="delete_posts_btn">
                      <button className="table_view_btn" type="button" onClick={forum_list_remove(item)}>
                        삭제
                  </button>
                    </td>
                    <td>{item.regDt}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </div>
      {search_forum_yn === false
        ? Roo_pagenation(
            page_list_num,
            forum_postList, //전체 게시글
            forum_page_post_list, //페이지 네이션 게시글
            setForum_page_post_list, //페이지 네이션 게시글 func
            forum_page_nation, //현재 페이션 네이션
            setForum_page_nation, //현재 페이지 네이션 함수
            false,
            null
          )
        : Roo_pagenation(
            page_list_num,
            search_forum_postList, //전체 게시글
            search_forum_page_post_list, //페이지 네이션 게시글
            setSearch_orum_page_post_list, //페이지 네이션 게시글 func
            forum_page_nation, //현재 페이션 네이션
            setForum_page_nation, //현재 페이지 네이션 함수
            false,
            null
          )}
      <Pagenations />
    </React.Fragment>
  );
};

export default Data_forum_table;
