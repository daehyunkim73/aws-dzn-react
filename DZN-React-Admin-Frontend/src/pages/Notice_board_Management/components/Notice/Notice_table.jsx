import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Notice_posts_delete_popup from "../../../popup/Popup_Notice_Management/Notice_detail_delete_popup";
import { Link } from "react-router-dom";
import Notice_main_table from "./Component/Notice_list";
import Pagenations from "../../../../../Root_component/Post_pagenation";
import { Roo_pagenation } from "../../../../../Root_component/Post_pagenation";
import { Page_nation_post } from "../../../../../func_src/Gaci_page_nation";

const Notice_table = ({
  searchClick,
  setSearchClick,
  apprvlData,
  setApprvlData,
  defalutData,
  totalCnt,
  setRending,
}) => {
  const [dayOrder, setDayOrder] = useState(""); // 구분
  const [pageListNum, setPageListNum] = useState(10); // 목록 노출 개수
  const [api_page_nations, setApi_page_nations] = useState(1);
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    setApprvlData([]);
    Page_nation_post(pageListNum, api_page_nations, pageData, setApprvlData);
  }, [api_page_nations]);

  // 구분 및 승인상태 변경시 데이터 리스트 검색
  useEffect(() => {
    if (dayOrder === "") {
      setApprvlData([]);
      setPageData(defalutData);
      Page_nation_post(
        pageListNum,
        api_page_nations,
        defalutData,
        setApprvlData
      );
    } else {
      const newData = apprvlData.sort((a, b) => {
        if (dayOrder === "0") return new Date(b.uptDt) - new Date(a.uptDt);
        else if (dayOrder === "1") return b.ntc_vw_cnt - a.ntc_vw_cnt;
      });
      setPageData(newData);

      setApprvlData([]);
      Page_nation_post(pageListNum, api_page_nations, newData, setApprvlData);
    }
    setSearchClick(false);
  }, [dayOrder, pageListNum, searchClick]);

  useEffect(() => {
    setApi_page_nations(1);
  }, [dayOrder, searchClick, pageListNum]);

  // 요일별 정렬 변경 이벤트
  const dayOrderChange = (e) => {
    setApprvlData(defalutData);
    const value = e.target.value;
    setDayOrder(() => value);
  };

  const listChange = (e) => {
    const cnt = e.target.value;
    setPageListNum(Number(cnt));
  };

  const notice_delete_btn = () => {
    const Admin_user_noticeDelete_popup_bgk = document.getElementById(
      "Admin_user_noticeDelete_popup_bgk"
    );
    Admin_user_noticeDelete_popup_bgk.style.display = "table";
  };

  const selectAll_btn = () => {
    let selectAll = document.querySelector("#step_two_api_a");
    let objs = document.querySelectorAll(".using_svc_checkbox_state");
    if (selectAll.checked === true) {
      for (let i = 0; i < objs.length; i++) {
        objs[i].checked = false;
      }
    } else if (selectAll.checked === false) {
      for (let i = 0; i < objs.length; i++) {
        objs[i].checked = true;
      }
    }
  };

  return (
    <React.Fragment>
      <Notice_posts_delete_popup setRending={setRending} />
      <Table responsive id="Notice_table_box">
        <caption className="tb_caption">
          <div className="table_result_number_box">
            <div className="tb_select_wrap" id="select_result_delete_btn_box">
              <button id="notice_delete_btn" onClick={notice_delete_btn}>
                삭제
              </button>
              <div className="caption_title bold_none">
                [총 
                <p className="number_data">{totalCnt === 0 ? 0 : totalCnt}</p>건
                ] 검색결과
                <p className="number_data">{apprvlData && apprvlData.length}</p>
                건
              </div>
            </div>
            <div className="tb_select_wrap" id="select_cpation_uploade_box">
              <Link className="link_style_text" to="/admin/notice/write">
                <button id="notice_uploade_btn">등록</button>
              </Link>

              <Form.Control
                as="select"
                className="table_select tb_select"
                onChange={dayOrderChange}
              >
                <option value="0">최종 수정일 순</option>
                <option value="1">최다 조회 순</option>
              </Form.Control>
              <Form.Control
                as="select"
                className="list_select tb_select"
                onChange={listChange}
              >
                <option value="10">목록 10</option>
                <option value="30">목록 30</option>
                <option value="50">목록 50</option>
              </Form.Control>
            </div>
          </div>
        </caption>
        <thead>
          <tr>
            <th>
              <div className="checkbox_wrap" id="sp_table_none_head">
                <input type="checkbox" id="step_two_api_a" />
                <label
                  onClick={selectAll_btn}
                  className="checkbox_design"
                  htmlFor="step_two_api_a"
                ></label>
              </div>
            </th>
            <th>등록일시</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>수정</th>
          </tr>
        </thead>
        <tbody>
          {apprvlData &&
            apprvlData.map((notice_main_lists) => {
              return (
                <Notice_main_table
                  table_key_id={notice_main_lists.ntc_idx}
                  table_lists_froum={notice_main_lists}
                  key={notice_main_lists.ntc_idx}
                />
              );
            })}
        </tbody>
      </Table>
      {Roo_pagenation(
        pageListNum,
        pageData, //전체 게시글
        apprvlData, //페이지 네이션 게시글
        setApprvlData, //페이지 네이션 게시글 func
        api_page_nations, //현재 페이션 네이션
        setApi_page_nations, //현재 페이지 네이션 함수
        false,
        null
      )}
      <Pagenations />
    </React.Fragment>
  );
};

export default Notice_table;
