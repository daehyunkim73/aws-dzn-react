import React, { useEffect, useState, useRef, useCallback } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Infra_use_approved_mang_admin from "../../../popup/Popup_servciecenter_Management/Infra_use_approved_mang_admin";
import Infra_approved_result_popup_admin from "../../../popup/Popup_servciecenter_Management/Infra_approved_result_popup_admin";
import Pagenations from "../../../../../Root_component/Post_pagenation";
import { Roo_pagenation } from "../../../../../Root_component/Post_pagenation";
import { Page_nation_post } from "../../../../../func_src/Gaci_page_nation";
import Infra_approved_management_table_content from "./Infra_approved_management_table_content";

const Infra_approved_management_table = ({
  searchClick,
  setSearchClick,
  apprvlData,
  setApprvlData,
  defalutData,
  totalCnt,
  setSvc_infra_popup_save_logic,
}) => {
  const [Svc_infra_click, setSvc_infra_click] = useState(); // 인프라 승인관리 신청정보 클릭 한 대상 값
  const [Svc_infra_click_logic, setSvc_infra_click_logic] = useState(false); // 인프라 승인관리 신청정보 클릭 한 대상 값
  const [Svc_infra_file_name, setSvc_infra_file_name] = useState(); // 인프라 승인관리 첨부파일 이름
  const [Svc_infra_file_path, setSvc_infra_file_path] = useState(); // 인프라 승인관리 첨부파일 경로

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
      const newData = apprvlData
        .filter((data) => {
          if (approval === "") return true;
          else return data.stat === approval;
        })
        .sort((a, b) => {
          if (dayOrder === "0") return true;
          else if (dayOrder === "1")
            return new Date(b.res_dt) - new Date(a.res_dt);
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
      <Infra_approved_result_popup_admin
        search_array_list={pageData}
        Svc_infra_click={Svc_infra_click}
        Svc_infra_click_logic={Svc_infra_click_logic}
      />
      <Infra_use_approved_mang_admin
        search_array_list={pageData}
        Svc_infra_click={Svc_infra_click}
        setSvc_infra_click={setSvc_infra_click}
        Svc_infra_click_logic={Svc_infra_click_logic}
        setSvc_infra_click_logic={setSvc_infra_click_logic}
        setSvc_infra_popup_save_logic={setSvc_infra_popup_save_logic}
        Svc_infra_file_name={Svc_infra_file_name}
        setSvc_infra_file_name={setSvc_infra_file_name}
        Svc_infra_file_path={Svc_infra_file_path}
        setSvc_infra_file_path={setSvc_infra_file_path}
      />
      <div className="backoffice_table_wrap sp_infra_approved_wrap_box">
        <Table responsive>
          <caption className="tb_caption">
            <div className="caption_title bold_none">
              [총 
              <p className="number_data">{totalCnt}</p>건 ] 검색결과 
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
              <th>서비스 상태</th>
              <th>요금제</th>
              <th>신청정보</th>
              <th className="table_min_w">상태</th>
              <th>요청일</th>
              <th>승인일</th>
              <th>승인 관리자</th>
            </tr>
          </thead>
          <tbody>
            {apprvlData &&
              apprvlData.map((item, cnt) => {
                return (
                  <Infra_approved_management_table_content
                    key={cnt}
                    item={item}
                    cnt={cnt}
                    setSvc_infra_click={setSvc_infra_click}
                    setSvc_infra_click_logic={setSvc_infra_click_logic}
                  />
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

export default Infra_approved_management_table;
