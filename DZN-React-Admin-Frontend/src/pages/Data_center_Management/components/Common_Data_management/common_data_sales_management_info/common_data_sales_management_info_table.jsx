import React, { useEffect, useCallback, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useCookies } from "react-cookie";
import Table_middle from "../../../../../../func_src/Table_middle";
import Page_nations, {
  Roo_pagenation,
} from "../../../../../../Root_component/Post_pagenation";
import { Page_nation_data } from "../../../../../../func_src/Gaci_page_nation";

const Sales_data_management_sales_info_table = ({
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

  useEffect(() => {
    Table_middle();
    return () => {
      Table_middle();
    };
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
    const newData = salesData.sort((a, b) => {
      if (orderBy === "0") return new Date(b.date) - new Date(a.date);
      else if (orderBy === "1") return b.totalPrice - a.totalPrice;
      else if (orderBy === "2") return b.card - a.card;
      else if (orderBy === "3") return b.point - a.point;
    });

    const req_post = Page_nation_data(api_page_nations, newData, listCnt);
    setPageData(req_post);
  }, [orderBy, listCnt]);

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
                onChange={orderChange}
              >
                <option value="0">최근 결제 순</option>
                <option value="1">실 결제금액 순</option>
                <option value="2">카드 금액</option>
                <option value="3">포인트 순</option>
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
              <th>구매자</th>
              <th>요금제</th>
              <th>결제일</th>
              <th>총 결제금액(원)</th>
              <th colSpan="2">
                <p>결제수단</p>
                <div className="th_double_wrap">
                  <p>카드(원)</p>
                  <p>포인트</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.payment}</td>
                  <td>{data.date}</td>
                  <td>{data.totalPrice}</td>
                  <td>{data.card}</td>
                  <td>{data.point}</td>
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

export default Sales_data_management_sales_info_table;
