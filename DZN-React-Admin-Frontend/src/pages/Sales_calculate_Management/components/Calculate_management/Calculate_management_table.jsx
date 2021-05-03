import React, { useEffect, useState, useRef, useCallback } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Table_middle from "../../../../../func_src/Table_middle";
import { Server_ajax_get } from "../../../../../Server_ajax";
import Page_nations from "../../../../../Root_component/Post_pagenation";
import { useCookies } from "react-cookie";
import { Roo_pagenation } from "../../../../../Root_component/Post_pagenation";
import { Page_nation_data } from "../../../../../func_src/Gaci_page_nation";
const Calculate_management_table = ({
  salesData,
  totalCnt,
  isSearch,
  setIsSearch,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(); // 쿠키 정보
  const [pageData, setPageData] = useState([]);
  const [api_page_nations, setApi_page_nations] = useState(1);
  const [listCnt, setListCnt] = useState(20);
  const [orderBy, setOrderBy] = useState("");
  const [cateBy, setCateBy] = useState("a");
  const [csvData, setCsvdata] = useState([]); //excel 다운로드
  useEffect(() => {
    Table_middle();
    return () => {
      Table_middle();
    };
  }, []);
  useEffect(() => {
    salesData.map((c) => {
      //excel 배열
      return setCsvdata((csvData) => [
        ...csvData,
        {
          결제일: c.date,
          "데이터 제목": c.svc_title,
          구매자: c.by_user,
          요금제: c.plan,
          "총 결제 금액(원)": c.all_by,
          "카드(원)": c.card_plan,
          포인트: c.point,
        },
      ]);
    });
  }, []);
  useEffect(() => {
    const req_Post_factory = Page_nation_data(
      api_page_nations,
      salesData,
      listCnt
    );
    setPageData(() => req_Post_factory);
    setIsSearch(false);
  }, [api_page_nations, isSearch === true]);

  useEffect(() => {
    const newData = salesData
      .sort((a, b) => {
        if (orderBy === "0")
          return new Date(b.Calculdate) - new Date(a.Calculdate);
        else if (orderBy === "1") return b.totalPrice - a.totalPrice;
        else if (orderBy === "2") return b.caculMoney - a.caculMoney;
        else if (orderBy === "3") return b.fee - a.fee;
      })
      .filter((data) => {
        if (cateBy === "a") {
          return true;
        } else if (cateBy === "d") {
          return data.saleCate.indexOf("데이터") > -1;
        } else if (cateBy === "s") {
          return data.saleCate.indexOf("서비스") > -1;
        }
      });

    const req_post = Page_nation_data(api_page_nations, newData, listCnt);
    setPageData(req_post);
  }, [orderBy, listCnt, cateBy]);

  const cateChange = useCallback((e) => {
    setApi_page_nations(1);
    setCateBy(e.target.value);
  }, []);
  const orderChange = useCallback((e) => {
    setApi_page_nations(1);
    setOrderBy(e.target.value);
  }, []);

  const listChange = useCallback((e) => {
    setApi_page_nations(1);
    setListCnt(e.target.value);
  }, []);

  return (
    <React.Fragment>
      <div className="backoffice_table_wrap">
        <Table responsive>
          <caption className="tb_caption">
            <div className="caption_title bold_none">
              [총 <p className="number_data">{totalCnt}</p>건 ] 검색결과 
              <p className="number_data">{salesData.length}</p>건
            </div>
            <div className="tb_select_wrap">
              <Form.Control
                as="select"
                className="table_select tb_select"
                onChange={cateChange}
              >
                <option value="a">판매유형 선택</option>
                <option value="d">데이터</option>
                <option value="s">서비스</option>
              </Form.Control>
              <Form.Control
                as="select"
                className="table_select tb_select"
                onChange={orderChange}
              >
                <option value="0">정산일 순</option>
                <option value="1">결제금액 순</option>
                <option value="2">정산금액 순</option>
                <option value="3">수수료 순</option>
              </Form.Control>
              <Form.Control
                as="select"
                className="list_select tb_select"
                onChange={listChange}
              >
                <option value="20">목록 20</option>
                <option value="30">목록 30</option>
                <option value="40">목록 40</option>
                <option value="50">목록 50</option>
                <option value="100">목록 100</option>
              </Form.Control>
            </div>
          </caption>
          <thead>
            <tr>
              <th>회원명/아이디</th>
              <th>판매유형(수)</th>
              <th>총 결제금액(원)</th>
              <th colSpan="2">
                <p>결제수단</p>
                <div className="th_double_wrap">
                  <p>카드(원)</p>
                  <p>포인트</p>
                </div>
              </th>
              <th>수수료</th>
              <th>정산금액</th>
              <th>정산기간</th>
              <th>정산일자</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{`${data.saleCate}(${data.saleNum})`}</td>
                  <td>{data.totalPrice}</td>
                  <td>{data.card}</td>
                  <td>{data.point}</td>
                  <td>{data.fee}</td>
                  <td>{data.caculMoney}</td>
                  <td>{data.period}</td>
                  <td>{data.Calculdate}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {Roo_pagenation(
        listCnt,
        salesData, //전체 게시글
        pageData, //페이지 네이션 게시글
        setPageData, //페이지 네이션 게시글 func
        api_page_nations, //현재 페이션 네이션
        setApi_page_nations, //현재 페이지 네이션 함수
        false,
        null
      )}
      {salesData.length !== 0 && <Page_nations />}
    </React.Fragment>
  );
};

export default Calculate_management_table;
