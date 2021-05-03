import React, { useEffect, useRef, useState, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Excel_download from '../../Root_component/Excel_download';
import Date_search_text_search from '../../Root_component/Date_search_text_search';
import { Page_nation_factory } from '../../../src/Gaci_page_nation';
import { Roo_pagenation } from '../../Root_component/Page_nations'
import Pagenations from "../../Root_component/Page_nations";
import breakdown_empty from "../../../image/Center/Empty/breakdown_empty.png"

let dummy_data = [
  {
    date: '2020-01-29 13:48', api_title: '세금아 안녕', by_user: '홍길동[wehagodev]',
    plan: '200000회 / 일', all_by: '200000', card_plan: '15000', point: '54000'
  },
  {
    date: '2020-02-29 13:48', api_title: '전표야 나와라', by_user: '세종대왕[wehagodev]',
    plan: '200000회 / 일', all_by: '200000', card_plan: '25000', point: '15000'
  },
  {
    date: '2020-03-29 13:48', api_title: '쉽게 알아보는 통계 분석', by_user: '홍길동[wehagodev]',
    plan: '200000회 / 일', all_by: '200000', card_plan: '35000', point: '25000'
  },
  {
    date: '2020-04-29 13:48', api_title: '거래처 관리', by_user: '세종대왕[wehagodev]',
    plan: '200000회 / 일', all_by: '200000', card_plan: '45000', point: '35000'
  },
  {
    date: '2020-05-29 13:48', api_title: '사내 SNS', by_user: '홍길동[wehagodev]',
    plan: '200000회 / 일', all_by: '200000', card_plan: '55000', point: '45000'
  },
  {
    date: '2020-06-29 13:48', api_title: '지식인 무엇이든 물어보세요', by_user: '세종대왕[wehagodev]',
    plan: '200000회 / 일', all_by: '200000', card_plan: '65000', point: '55000'
  },
  {
    date: '2020-07-29 13:48', api_title: '세금아 안녕', by_user: '홍길동[wehagodev]',
    plan: '200000회 / 일', all_by: '200000', card_plan: '75000', point: '65000'
  },
  {
    date: '2020-08-29 13:48', api_title: '전표야 나와라', by_user: '세종대왕[wehagodev]',
    plan: '200000회 / 일', all_by: '200000', card_plan: '85000', point: '75000'
  },
  {
    date: '2020-09-29 13:48', api_title: '전표야 나와라', by_user: '홍길동[wehagodev]',
    plan: '200000회 / 일', all_by: '200000', card_plan: '95000', point: '85000'
  },
  {
    date: '2020-09-29 13:48', api_title: '전표야 나와라', by_user: '세종대왕[wehagodev]',
    plan: '200000회 / 일', all_by: '200000', card_plan: '105000', point: '95000'
  },
  {
    date: '2020-09-29 13:48', api_title: '거래처 관리', by_user: '홍길동[wehagodev]',
    plan: '200000회 / 일', all_by: '200000', card_plan: '115000', point: '5000'
  },
  {
    date: '2020-09-29 13:48', api_title: '거래처 관리', by_user: '세종대왕[wehagodev]',
    plan: '200000회 / 일', all_by: '205000', card_plan: '125000', point: '155000'
  },
  {
    date: '2020-09-23 13:48', api_title: '거래처 관리', by_user: '세종대왕2[wehagodev',
    plan: '200000회 / 일', all_by: '200000', card_plan: '129000', point: '105000'
  },
  {
    date: '2020-12-21 13:48', api_title: '쉽게 알아보는 통계 분석', by_user: '세종대왕3[wehagodev]',
    plan: '200000회 / 일', all_by: '200000', card_plan: '125000', point: '105000'
  },
  {
    date: '2020-09-21 13:48', api_title: '쉽게 알아보는 통계 분석', by_user: '세종대왕3[wehagodev]',
    plan: '200000회 / 일', all_by: '200000', card_plan: '195000', point: '105000'
  },
  {
    date: '2020-07-21 13:48', api_title: '쉽게 알아보는 통계 분석', by_user: '세종대왕3[wehagodev]',
    plan: '200000회 / 일', all_by: '200000', card_plan: '125000', point: '105000'
  },
]

const Payment_info_table = () => {

  const test = useRef();
  const [csvData, setCsvdata] = useState([]); //excel 다운로드

  const [sales_main_data, setSales_main_data] = useState([]); //기존 배열
  const [sales_search_data, setSales_search_data] = useState([]); //검색 배열
  const [sales_post_data, setSales_post_data] = useState([]); //메인 페이지 네이션
  const [search_post_data, setSearch_post_data] = useState([]); //검색 페이지 네이션

  const [search_yn_state, setSearch_yn_state] = useState(false); //검색 off, on 상태값
  const [post_pagenation, setpost_pagenation] = useState(1);
  const [find_post_date, setFind_post_date] = useState([]); //날짜 리스트를 담아서 보낼
  const [post_page_list, setPost_page_list] = useState(10);
  const [filterLogic, setFilterLogic] = useState(false);

  const [searchVal, setSearchVal] = useState();

  function post_factory(page_nation, post, field_list = 10) {
    const result = new Page_nation_factory(page_nation, post, field_list);
    if (result.resultPageing) {
      return result.resultPageing
    } else {
      return [];
    }
  }

  useEffect(() => {
    const result = post_factory(post_pagenation, sales_main_data);
    setSales_post_data(result);
  }, [search_yn_state === false && post_pagenation, sales_main_data]);

  useEffect(() => {
    const search_result = post_factory(post_pagenation, sales_search_data);
    setSearch_post_data(search_result)
  }, [search_yn_state === true && post_pagenation, sales_search_data])

  useEffect(() => {
    dummy_data.map((c) => { //excel 배열
      return setCsvdata(csvData => [
        ...csvData,
        {
          '결제일': c.date,
          '데이터 제목': c.api_title,
          '구매자': c.by_user,
          '요금제': c.plan,
          '총 결제 금액(원)': c.all_by,
          '카드(원)': c.card_plan,
          '포인트': c.point
        }
      ]);
    });
    setSales_main_data(dummy_data);
    setFilterLogic(true);
  }, []);

  useEffect(() => {
    let date_result = [];
    if(find_post_date.length === 0) date_result = sales_main_data;
    sales_main_data.map(result =>
      find_post_date.map((date_list) => {
        if (result.date.split(' ')[0] === date_list) {
          date_result.push(result);
        }
      })
    );
    const newData = date_result.filter((data) => {
      if(data.api_title.indexOf(searchVal) > -1 ) return true
    })
    setSales_search_data(newData)
  }, [find_post_date, filterLogic, searchVal]);

  useEffect(() => {
    setpost_pagenation(1);3
  }, [search_yn_state]);

  useEffect(() => {
    const result = 
    post_factory(
      post_pagenation,
      sales_main_data, 
      post_page_list
    )
    setSales_post_data(result);
    setFilterLogic(false);
  }, [post_page_list, filterLogic, search_yn_state])

  const field_list_pageing = useCallback((e) => {
    if(e.target.value === "목록") {
      return setPost_page_list(10);
    } else {
      setPost_page_list(Number(e.target.value));
    }
    setpost_pagenation(1);

  }, [post_page_list])

  const filterEvt = (e) => {
    const newData = sales_main_data
    .sort((a, b) => {
      if (e.target.value === "최신 결제 순") return new Date(b.date) - new Date(a.date);
      else if (e.target.value === "총 결제금액 순")
        return Number(b.all_by) - Number(a.all_by);
      else if (e.target.value === "카드 금액")
        return Number(b.card_plan) - Number(a.card_plan);
      else if (e.target.value === "포인트 순")
        return Number(b.point) - Number(a.point);
    });
    setSales_main_data(newData);
    setFilterLogic(true);
  };

  return (
    <React.Fragment>
      <Date_search_text_search
        search_yn_state={search_yn_state}
        setSearch_yn_state={setSearch_yn_state}
        find_post_date={find_post_date}
        setFind_post_date={setFind_post_date}
        setSearchVal={setSearchVal}
      />
      <div className="Payment_info_table">
        <Table responsive>
          <caption className="tb_caption">
            <div className="caption_title bold_none">[총 <p className="number_data">{sales_main_data.length}</p>건 ] 검색결과               
            <p className="number_data">
                {search_yn_state === false
                  ? sales_main_data.length
                  : sales_search_data.length}
              </p>건</div>
            <div className="tb_select_wrap">
            <Form.Control
                as="select"
                className="table_select tb_select"
                onChange={filterEvt}
              >
                <option>최신 결제 순</option>
                <option>총 결제금액 순</option>
                <option>카드 금액</option>
                <option>포인트 순</option>
              </Form.Control>
              <Form.Control
                as="select"
                className="list_select tb_select"
                onChange={field_list_pageing}
                ref={test}
              >
                <option>목록</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
                <option>50</option>
                <option>100</option>
              </Form.Control>
            </div>
          </caption>
          <thead>
            <tr>
              <th>결제일</th>
              <th>사용 API</th>
              <th>요금제</th>
              <th>총 결제금액(원)</th>
              <th>카드(원)</th>
              <th>포인트</th>
            </tr>
          </thead>
          {search_yn_state === false && sales_post_data.length !== 0 || search_yn_state === true && search_post_data.length !== 0 ? (
            console.log(sales_post_data.length,"sales_post_data.length"),
            console.log(search_post_data.length,"search_post_data.length"),
            <tbody>
                {search_yn_state === false
                  ? sales_post_data.map((result) => {
                      return (
                        <tr>
                          <td>{result.date}</td>
                          <td>{result.api_title}</td>
                          <td>{result.plan}</td>
                          <td>{result.all_by}</td>
                          <td>{result.card_plan}</td>
                          <td>{result.point}</td>
                        </tr>
                      );
                    })
                  : search_post_data.map((result) => {
                      return (
                        <tr>
                          <td>{result.date}</td>
                          <td>{result.api_title}</td>
                          <td>{result.plan}</td>
                          <td>{result.all_by}</td>
                          <td>{result.card_plan}</td>
                          <td>{result.point}</td>
                        </tr>
                      );
                    })}
            </tbody>
          ) : (
            <tbody className="question_none">
              <tr>
                <td className="border_r" colspan="6">
                  <img src={breakdown_empty} alt="breakdown_empty" />
                  <br />
                  <span>내역이 없습니다.</span>
                </td>
              </tr>
            </tbody>
          )}
        </Table>
      </div>
      {search_yn_state === false
        ? Roo_pagenation(
            post_page_list,
            sales_main_data,
            sales_post_data,
            setSales_post_data,
            post_pagenation,
            setpost_pagenation,
            false,
            null
          )
        : Roo_pagenation(
            post_page_list,
            sales_search_data,
            search_post_data,
            setSearch_post_data,
            post_pagenation,
            setpost_pagenation,
            false,
            null
          )}
      {search_yn_state === false ? (
        sales_main_data.length === 0 ? (
          <></>
        ) : (
          <Pagenations />
        )
      ) : sales_search_data.length === 0 ? (
        <></>
      ) : (
        <Pagenations />
      )}
    </React.Fragment>
  );
}

export default Payment_info_table;
