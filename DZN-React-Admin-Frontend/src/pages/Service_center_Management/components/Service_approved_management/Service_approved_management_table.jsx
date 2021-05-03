import React, { useEffect, useRef, useCallback } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Table_middle from "../../../../../func_src/Table_middle";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Server_ajax_get } from "../../../../../Server_ajax";
import { Roo_pagenation } from "../../../../../Root_component/Post_pagenation";
import Pagenations from "../../../../../Root_component/Post_pagenation";
import { Page_nation_post } from "../../../../../func_src/Gaci_page_nation";

const Service_approved_management_table = ({
  searchClick,
  setSearchClick,
  apprvlData,
  setApprvlData,
  defalutData,
  totalCnt,
}) => {

  const [dayOrder, setDayOrder] = useState(""); // 구분
  const [approval, setApproval] = useState(""); // 승인상태
  const [pageListNum, setPageListNum] = useState(10); // 목록 노출 개수
  const [api_page_nations, setApi_page_nations] = useState(1);
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    setApprvlData([]);
    Page_nation_post(pageListNum, api_page_nations, pageData, setApprvlData);
  }, [api_page_nations]);

  // 구분 및 승인상태 변경시 데이터 리스트 검색
  useEffect(() => {
    if (dayOrder === "" && approval === "") {
      setApprvlData([]);
      setPageData(defalutData);
      Page_nation_post(
        pageListNum,
        api_page_nations,
        defalutData,
        setApprvlData
      );
    } else {
      console.log("apprvlData",apprvlData)
      const newData = apprvlData
        .filter((data) => {
          if (approval === "") return true;
          else return data.stat === approval;
        })
        .sort((a, b) => {
          if (dayOrder === "0") return true;
          else if (dayOrder === "1") return new Date(b.apprvlres_dt) - new Date(a.apprvlres_dt);
        });
      setPageData(newData);

      setApprvlData([]);
      Page_nation_post(pageListNum, api_page_nations, newData, setApprvlData);
    }
    setSearchClick(false);
  }, [dayOrder, approval, pageListNum, searchClick]);

  useEffect(() => {
    setApi_page_nations(1);
  }, [dayOrder, approval, searchClick, pageListNum]);

  // 요일별 정렬 변경 이벤트
  const dayOrderChange = (e) => {
    setApprvlData(defalutData);
    const value = e.target.value;
    setDayOrder(() => value);
  };

  // 승인상태 변경 이벤트
  const apprvChange = (e) => {
    setApprvlData(defalutData);
    const value = e.target.value;
    setApproval(() => value);
  };

  const listChange = (e) => {
    const cnt = e.target.value;
    setPageListNum(Number(cnt));
  };

  return (
    <React.Fragment>
      <div className="backoffice_table_wrap">
        <Table responsive>
          <caption className="tb_caption">
            <div className="caption_title bold_none">
              [총 
              <p className="number_data">{totalCnt}</p>건 ]
              검색결과 
              <p className="number_data">{apprvlData && apprvlData.length}</p>건
            </div>
            <div className="tb_select_wrap">
              <Form.Control
                as="select"
                className="table_select tb_select"
                onChange={apprvChange}
              >
                <option value="">승인상태 선택</option>
                <option value="0">미승인</option>
                <option value="1">승인</option>
                <option value="2">반려</option>
              </Form.Control>
              <Form.Control
                as="select"
                className="table_select tb_select"
                onChange={dayOrderChange}
              >
                <option value="0">요청일 순</option>
                <option value="1">승인일 순</option>
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
          </caption>
          <thead>
            <tr>
              <th>회원명/아이디</th>
              <th>서비스 제목</th>
              <th>신청정보</th>
              <th className="table_min_w">상태</th>
              <th>요청일</th>
              <th>승인일</th>
              <th>승인 관리자</th>
            </tr>
          </thead>
          <tbody>
            {apprvlData && apprvlData.map((item, cnt) => {
              return (
                <tr key={cnt}>
                  <td>
                    <span className="table_href">{item.mbr_idx}</span>
                  </td>
                  <td className="table_title">
                    <Link to={`/admin/svcinfo/${item.pdsvc_idx}`}>
                      <span className="table_href">{item.svc_title}</span>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/admin/svcinfo/${item.pdsvc_idx}`}>
                      <button className="table_view_btn">보기</button>
                    </Link>
                  </td>
                  <td>
                    {item.stat === "0"
                      ? "미승인"
                      : item.stat === "1"
                      ? "승인"
                      : "반려"}
                  </td>
                  <td>{item.apprvlreq_dt}</td>
                  <td>{item.apprvlres_dt}</td>
                  <td>{item.admin_idx}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
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

export default Service_approved_management_table;
