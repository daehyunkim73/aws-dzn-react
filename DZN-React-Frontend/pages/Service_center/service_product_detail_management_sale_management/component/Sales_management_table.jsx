import React, {
  useEffect,
  useState,
  useCallback,
  createContext,
  useMemo,
  useContext,
} from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Pagenation_link from "./pagenation_link";
import Sales_table from "./sales_table";
import Gaci_page_nation_func from "../../../../src/Gaci_page_nation";
import Pagenations from "../../../../pages/Root_component/Page_nations";
import { Admin_fun } from "../../../../admin/_app";
import { Roo_pagenation } from "../../../Root_component/Page_nations";

let searchd_post_data = [];
const Sales_management_table = (props) => {
  const [post_data, setPost_data] = useState([]); //페이지네이션 게시글 데이터
  const [page_nation_num, setPage_nation_num] = useState(1);
  const [yn_find_post, setYn_find_post] = useState(false); //기존 전체 게시글, 검색 게시글 나누는 상태값

  const { initialGaciState } = Admin_fun();
  const { get_dumy_sale_dummy_data } = initialGaciState;

  useEffect(() => {
    //날짜 검색
    if (props.post_find_data === undefined) {
      //on은 데이터가 들어오고 false는 데이터가 없어지고 undefined가 들어옴 막기
      searchd_post_data = [];
      setPost_data(post_data.splice(10));
      setPage_nation_num(1); //true => false로 바뀔때 맨 처음 페이지 보여주기
      return setYn_find_post(false);
    } else {
      if (props.post_find_data.length === 0) {
        //처음에는 빈 배열이 날라와서 그거또 false 살태로
        return setYn_find_post(false);
      }
      setYn_find_post(true);
      searchd_post_data = []; //데이터 중첩 방지를 위한
      setPage_nation_num(1);
      setPost_data(post_data.splice(10));
      for (let i = 0; i < props.post_find_data.length; i++) {
        props.post_find_data[i].map((list_v) => {
          for (let j = 0; j < get_dumy_sale_dummy_data.sale_posts.length; j++) {
            // 현재 데이터의 날짜리스트
            let Search_post_find = get_dumy_sale_dummy_data.sale_posts[j];
            if (list_v === Search_post_find.user_Payment_date) {
              //둘다 검사해서 서로 맞는 날짜만 검사
              searchd_post_data.push(Search_post_find);
            }
          }
        });
      }
    }
  }, [props.post_find_data]);

  useEffect(() => {
    if (yn_find_post === false) {
      Gaci_page_nation_func(
        page_nation_num,
        get_dumy_sale_dummy_data.sale_posts,
        setPost_data,
        post_data
      );
    }
  }, [yn_find_post || page_nation_num]);

  useEffect(() => {
    if (yn_find_post === true) {
      setPost_data(post_data.splice(10));
      Gaci_page_nation_func(
        page_nation_num,
        searchd_post_data,
        setPost_data,
        post_data
      );
    }
  }, [(yn_find_post && page_nation_num) || (post_data && post_data.id)]);

  return (
    <React.Fragment>
      <div className="Sales_managment_talbe_box">
        <Table responsive>
          <caption className="tb_caption">
            <div className="caption_title bold_none">
              {"["}총 
              <p className="number_data">
                {get_dumy_sale_dummy_data.sale_posts.length}
              </p>
              건 {"]"} 검색결과
              <p className="number_data">
                {yn_find_post === true ? searchd_post_data.length : 0}
              </p>
              건
            </div>
            <div className="tb_select_wrap">
              <Form.Control as="select" className="table_select tb_select">
                <option>최근 결제 순</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
              <Form.Control as="select" className="list_select tb_select">
                <option>목록 20</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </div>
          </caption>
          <thead>
            <tr>
              <th>ID</th>
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
            {yn_find_post === false
              ? post_data.map((v) => {
                  return <Sales_table sales_table_contents={v} key={v.id} />;
                })
              : post_data.map((list_v) => {
                  return (
                    <Sales_table
                      sales_table_contents={list_v}
                      key={list_v.id}
                    />
                  );
                })}
          </tbody>
        </Table>
        {Roo_pagenation(
          get_dumy_sale_dummy_data.sale_posts,
          post_data,
          setPost_data,
          page_nation_num,
          setPage_nation_num,
          yn_find_post,
          searchd_post_data
        )}
        <Pagenations />
      </div>
    </React.Fragment>
  );
};

export default Sales_management_table;
