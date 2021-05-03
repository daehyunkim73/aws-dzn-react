import React, { useEffect, useState, useRef, useCallback } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Table_middle from "../../../../../func_src/Table_middle";
import Faq_category_popup from "../../../popup/Popup_FAQ_Management/Faq_category_popup";
import Faq_posts_delete_popup from "../../../popup/Popup_FAQ_Management/Faq_posts_delete_popup";
import { Link } from "react-router-dom";
import Pagination, {
  Roo_pagenation,
} from "../../../../../Root_component/Post_pagenation";
import Gaci_page_nation_func from "../../../../../src/Gaci_page_nation_cnt";
import axios from "axios";
import Faq_main_table from "./Component/Faq_list";
import faq_main from "../../Faq_main";
import { Page_nation_post } from "../../../../../func_src/Gaci_page_nation";

const faq_table = ({
  searchClick,
  setSearchClick,
  apprvlData,
  setApprvlData,
  defalutData,
  totalCnt,
  cateList,
  setRending,
}) => {
  const [cate, setCate] = useState('');
  const [dayOrder, setDayOrder] = useState(""); // 구분
  const [pageListNum, setPageListNum] = useState(10); // 목록 노출 개수
  const [api_page_nations, setApi_page_nations] = useState(1);
  const [pageData, setPageData] = useState([]);

  
  const [categoryClick, setCategoryClick] = useState(false);

  useEffect(() => {
    setApprvlData([]);
    Page_nation_post(pageListNum, api_page_nations, pageData, setApprvlData);
  }, [api_page_nations]);

  // 구분 및 승인상태 변경시 데이터 리스트 검색
  useEffect(() => {
    if (dayOrder === "" && cate === "") {
      setApprvlData([]);
      setPageData(defalutData);
      Page_nation_post(
        pageListNum,
        api_page_nations,
        defalutData,
        setApprvlData
      );
    } else {
      const newData = apprvlData.filter((data) => {
        if(cate === '') return true
        else return data.faq_type_code === cate
      }).sort((a, b) => {
          if (dayOrder === "0") return new Date(b.uptDt) - new Date(a.uptDt);
          else if (dayOrder === "1")
            return new Date(b.faq_vw_cnt) - new Date(a.faq_vw_cnt);
        });
      setPageData(newData);

      setApprvlData([]);
      Page_nation_post(pageListNum, api_page_nations, newData, setApprvlData);
    }
    setSearchClick(false);
  }, [cate,dayOrder, pageListNum, searchClick]);

  useEffect(() => {
    setApi_page_nations(1);
  }, [cate,dayOrder, searchClick, pageListNum]);

    // 카테고리 변경 이벤트
    const cateChange = (e) => {
      setApprvlData(defalutData);
      const value = e.target.value;    
      setCate(() => value);        
    }
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

  const faq_category_Click = () => {
    const Admin_user_faq_category_popup_bgk = document.getElementById(
      "Admin_user_faq_category_popup_bgk"
    );
    Admin_user_faq_category_popup_bgk.style.display = "table";
    setCategoryClick(true);
  };

  const faq_delete_btn = () => {
    const Admin_user_faq_delete_popup_bgk = document.getElementById(
      "Admin_user_faq_delete_popup_bgk"
    );
    Admin_user_faq_delete_popup_bgk.style.display = "table";
  };
  return (
    <React.Fragment>
      <Faq_category_popup
        categoryClick={categoryClick}
        setCategoryClick={setCategoryClick}
      />
      <Faq_posts_delete_popup setRending={setRending} />
      <Table responsive id="faq_table_box">
        <caption className="tb_caption">
          <div className="table_result_number_box">
            <div className="tb_select_wrap" id="select_result_delete_btn_box">
              <button id="faq_delete_btn" onClick={faq_delete_btn}>
                삭제
              </button>
              <div className="caption_title bold_none">
                [총 
                <p className="number_data">{totalCnt === 0 ? 0 : totalCnt}</p>건
                ] 검색결과
                <p className="number_data">
                  {apprvlData.length}
                </p>
                건
              </div>
            </div>
            <div className="tb_select_wrap" id="select_cpation_uploade_box">
            <Link className="link_style_text" to="/admin/faq/write">
                <button id="faq_uploade_btn">등록</button>
              </Link>
              <button id="faq_category_add_btn" onClick={faq_category_Click}>
                카테고리 추가
              </button>
              <Form.Control
                as="select"
                className="table_select tb_select"
                onChange={cateChange}
              >
                <option value="">카테고리 선택</option>
                {
                  cateList.map((item, cnt) => {
                    return (
                      <option value={item.sub_cate_name} key={cnt}>
                        {item.sub_cate_name}
                      </option>
                    );
                  })}
              </Form.Control>
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
                  // onClick={selectAll_btn}
                  className="checkbox_design"
                  htmlFor="step_two_api_a"
                ></label>
              </div>
            </th>
            <th>카테고리</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>등록일시</th>
            <th>수정</th>
          </tr>
        </thead>
        <tbody>
          {apprvlData && apprvlData.map((faq_main_lists) => {
            return (
              <Faq_main_table
                table_key_id={faq_main_lists.faq_idx}
                table_lists_froum={faq_main_lists}
                key={faq_main_lists.faq_idx}
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
      <Pagination />
    </React.Fragment>
  );
};

export default faq_table;
