import React, { useCallback, useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Table_middle from "../../../src/Table_middle";
import Pagenations from "../../Root_component/Page_nations";
import Date_search_picker from "../../Root_component/Date_search";
import { Page_nation_factory } from "../../../src/Gaci_page_nation";
import { Roo_pagenation } from "../../Root_component/Page_nations";
import breakdown_empty from "../../../image/Center/Empty/breakdown_empty.png";
import top_arrow from "../../../image/Center/Alarm/top_arrow.png";
import list_icon from "../../../image/Center/List_icon/large_list_icon.png";

let dummy_data = [
  {
    date: "2020-01-29 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "15000",
    point: "54000",
  },
  {
    date: "2020-02-29 13:48",
    pdsvc_idx: "992",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "25000",
    point: "15000",
  },
  {
    date: "2020-03-29 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "35000",
    point: "25000",
  },
  {
    date: "2020-04-29 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "45000",
    point: "35000",
  },
  {
    date: "2020-05-29 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "55000",
    point: "45000",
  },
  {
    date: "2020-06-29 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "65000",
    point: "55000",
  },
  {
    date: "2020-07-29 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "75000",
    point: "65000",
  },
  {
    date: "2020-08-29 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "85000",
    point: "75000",
  },
  {
    date: "2020-09-29 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "95000",
    point: "85000",
  },
  {
    date: "2020-09-29 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "105000",
    point: "95000",
  },
  {
    date: "2020-09-29 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "115000",
    point: "5000",
  },
  {
    date: "2020-09-29 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "205000",
    card_plan: "125000",
    point: "155000",
  },
  {
    date: "2020-09-23 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "129000",
    point: "105000",
  },
  {
    date: "2020-12-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "125000",
    point: "105000",
  },
  {
    date: "2020-09-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "195000",
    point: "105000",
  },
  {
    date: "2020-07-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "125000",
    point: "105000",
  },
  {
    date: "2020-09-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "195000",
    point: "105000",
  },
  {
    date: "2020-07-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "125000",
    point: "105000",
  },
  {
    date: "2020-09-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "195000",
    point: "105000",
  },
  {
    date: "2020-07-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "125000",
    point: "105000",
  },
  {
    date: "2020-09-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "195000",
    point: "105000",
  },
  {
    date: "2020-07-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "125000",
    point: "105000",
  },
  {
    date: "2020-09-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "195000",
    point: "105000",
  },
  {
    date: "2020-07-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "125000",
    point: "105000",
  },
  {
    date: "2020-09-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "195000",
    point: "105000",
  },
  {
    date: "2020-07-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "125000",
    point: "105000",
  },
  {
    date: "2020-09-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "195000",
    point: "105000",
  },
  {
    date: "2020-07-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "125000",
    point: "105000",
  },
  {
    date: "2020-09-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "195000",
    point: "105000",
  },
  {
    date: "2020-07-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "125000",
    point: "105000",
  },
  {
    date: "2020-09-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "195000",
    point: "105000",
  },
  {
    date: "2020-07-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "125000",
    point: "105000",
  },
  {
    date: "2020-09-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "195000",
    point: "105000",
  },
  {
    date: "2020-07-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "125000",
    point: "105000",
  },
  {
    date: "2020-09-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "195000",
    point: "105000",
  },
  {
    date: "2020-07-21 13:48",
    pdsvc_idx: "895",
    total: "200000",
    fee: "20000",
    all_by: "200000",
    card_plan: "125000",
    point: "105000",
  },
];
const Calculate_list_table = () => {
  const test = useRef();
  const [sales_main_data, setSales_main_data] = useState([]); //?????? ??????
  const [sales_search_data, setSales_search_data] = useState([]); //?????? ??????
  const [sales_post_data, setSales_post_data] = useState([]); //?????? ????????? ?????????
  const [search_post_data, setSearch_post_data] = useState([]); //?????? ????????? ?????????

  const [search_yn_state, setSearch_yn_state] = useState(false); //?????? off, on ?????????
  const [post_pagenation, setpost_pagenation] = useState(1);
  const [find_post_date, setFind_post_date] = useState([]); //?????? ???????????? ????????? ??????
  const [post_page_list, setPost_page_list] = useState(10);
  const [filterLogic, setFilterLogic] = useState(false);
  const [textboxState, setTextboxState] = useState();
  const body = document.querySelector("body");

  function post_factory(page_nation, post, field_list = 10) {
    const result = new Page_nation_factory(page_nation, post, field_list);
    if (result.resultPageing) {
      return result.resultPageing;
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
    setSearch_post_data(search_result);
  }, [search_yn_state === true && post_pagenation, sales_search_data]);

  useEffect(() => {
    setSales_main_data(dummy_data);
    setFilterLogic(true);
  }, []);

  useEffect(() => {
    const date_result = [];
    sales_main_data.map((result) =>
      find_post_date.map((date_list) => {
        if (result.date.split(" ")[0] === date_list) {
          date_result.push(result);
        }
      })
    );
    setSales_search_data(date_result);
  }, [find_post_date, filterLogic]);

  useEffect(() => {
    setpost_pagenation(1);
  }, [search_yn_state]);

  useEffect(() => {
    const result = post_factory(
      post_pagenation,
      sales_main_data,
      post_page_list
    );
    setSales_post_data(result);
    setFilterLogic(false);
  }, [post_page_list, filterLogic, search_yn_state]);

  const field_list_pageing = useCallback(
    (e) => {
      if (e.target.value === "??????") {
        return setPost_page_list(10);
      } else {
        setPost_page_list(Number(e.target.value));
      }
      setpost_pagenation(1);
    },
    [post_page_list]
  );

  const filterEvt = (e) => {
    const newData = sales_main_data.sort((a, b) => {
      if (e.target.value === "????????? ???")
        return new Date(b.date) - new Date(a.date);
      else if (e.target.value === "??? ???????????? ???")
        return Number(b.total) - Number(a.total);
      else if (e.target.value === "???????????? ???")
        return Number(b.card_plan) - Number(a.card_plan);
      else if (e.target.value === "????????? ???")
        return Number(b.point) - Number(a.point);
      else if (e.target.value === "???????????? ???")
        return Number(b.all_by) - Number(a.all_by);
      else if (e.target.value === "????????? ???")
        return Number(b.fee) - Number(a.fee);
    });
    setSales_main_data(newData);
    setFilterLogic(true);
  };

  useEffect(() => {
    Table_middle();
    return () => {
      Table_middle();
    };
  }, []);
  const viewSvcInfo = (index) => () => {
    setTextboxState();
    const calculate_textbox = document.querySelectorAll(`.calculate_textbox`);
    for (let i = 0; i < calculate_textbox.length; i++) {
      calculate_textbox[i].style.display = "none";
    }
    if (textboxState !== index) {
      document.querySelector(`#calculate_textbox_${index}`).style.display =
        "block";
      setTextboxState(index);
    }
  };

  const handleClickOutside = (e) => {
    const className = e.target.className;
    console.log("???");
    if (
      className !== "calculate_textbox" &&
      className !== "calculate_textbox_in" &&
      className !== "table_view_btn"
    ) {
      setTextboxState();
      const calculate_textbox = document.querySelectorAll(`.calculate_textbox`);
      for (let i = 0; i < calculate_textbox.length; i++) {
        calculate_textbox[i].style.display = "none";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // const clickBodyEvent = (event) => {
  //   setTextboxState();
  //   const target = event.target;
  //   console.log(target,"?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????");
  //   if(target === event.currentTarget.querySelector(".calculate_textbox") )
  //       return ;
  //   else if (target === event.currentTarget.querySelector(".calculate_textbox p"))
  //       return ;
  //   else if (target === event.currentTarget.querySelector(".calculate_textbox img"))
  //       return ;

  //     const calculate_textbox  = document.querySelectorAll(`.calculate_textbox`);
  //       for(let i = 0; i < calculate_textbox.length; i++) {
  //         calculate_textbox[i].style.display = "none";
  //       }
  // }

  //   useEffect(()=>{
  //     body.addEventListener('click', clickBodyEvent);
  //   },[])
  return (
    <React.Fragment>
      <Date_search_picker
        search_yn_state={search_yn_state}
        setSearch_yn_state={setSearch_yn_state}
        find_post_date={find_post_date}
        setFind_post_date={setFind_post_date}
      />
      <div className="Calculate_list_table_box Calculate_list_table_responsive_box">
        <Table responsive>
          <caption className="tb_caption">
            <div className="caption_title bold_none">
              [?????<p className="number_data">{sales_main_data.length}</p>??? ]
              ??????????????
              <p className="number_data">{search_post_data.length}</p>???
            </div>
            <div className="tb_select_wrap">
              <Form.Control
                as="select"
                className="table_select tb_select"
                onChange={filterEvt}
              >
                <option>????????? ???</option>
                <option>???????????? ???</option>
                <option>????????? ???</option>
                <option>??? ???????????? ???</option>
                <option>???????????? ???</option>
                <option>????????? ???</option>
              </Form.Control>
              <Form.Control
                as="select"
                className="list_select tb_select"
                onChange={field_list_pageing}
                ref={test}
              >
                <option>??????</option>
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
              <th>?????????</th>
              <th>??? ????????????(???)</th>
              <th colSpan="2">
                <p>????????????</p>
                <div className="th_double_wrap">
                  <p>??????(???)</p>
                  <p>?????????</p>
                </div>
              </th>
              <th>?????????</th>
              <th>????????????</th>
              <th>????????? ??????</th>
            </tr>
          </thead>
          {(search_yn_state === false && sales_main_data.length !== 0) ||
          (search_yn_state === true && search_post_data.length !== 0) ? (
            <tbody>
              {search_yn_state === false
                ? sales_post_data.map((result, index) => {
                    return (
                      <tr>
                        <td>{result.date}</td>
                        <td>{result.total}</td>
                        <td>{result.card_plan}</td>
                        <td>{result.point}</td>
                        <td>{result.fee}</td>
                        <td>{result.all_by}</td>
                        <td className="calculateBtn">
                          <button
                            className="table_view_btn"
                            onClick={viewSvcInfo(index)}
                          >
                            ??????
                          </button>
                          <div
                            id={`calculate_textbox_${index}`}
                            className="calculate_textbox"
                          >
                            <img
                              src={top_arrow}
                              className="calculate_textbox_in"
                              alt="top_arrow"
                            />
                            <p className="calculate_textbox_in">
                              <img
                                src={list_icon}
                                alt={list_icon}
                                className="calculate_textbox_in"
                              />{" "}
                              ???????????? (?????? ??????,?????? ?????? ???????????????)
                            </p>
                            <p className="calculate_textbox_in">
                              <img
                                src={list_icon}
                                alt={list_icon}
                                className="calculate_textbox_in"
                              />{" "}
                              ???????????????????????? ????????? ??????????????????
                            </p>
                            <p className="calculate_textbox_in">
                              <img
                                src={list_icon}
                                alt={list_icon}
                                className="calculate_textbox_in"
                              />{" "}
                              ?????????????????????(??????????????? ??????????????? ??????, ??????
                              ?????????????????????)
                            </p>
                            <p className="calculate_textbox_in">
                              <img
                                src={list_icon}
                                alt={list_icon}
                                className="calculate_textbox_in"
                              />{" "}
                              ????????????????????????
                            </p>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : search_post_data.map((result, index) => {
                    return (
                      <tr>
                        <td>{result.date}</td>
                        <td>{result.total}</td>
                        <td>{result.card_plan}</td>
                        <td>{result.point}</td>
                        <td>{result.fee}</td>
                        <td>{result.all_by}</td>
                        <td className="calculateBtn">
                          <button
                            className="table_view_btn"
                            onClick={viewSvcInfo(index)}
                          >
                            ??????
                          </button>
                          <div
                            id={`calculate_textbox_${index}`}
                            className="calculate_textbox"
                          >
                            <img
                              src={top_arrow}
                              className="calculate_textbox_in"
                              alt="top_arrow"
                            />
                            <p className="calculate_textbox_in">
                              <img
                                src={list_icon}
                                alt={list_icon}
                                className="calculate_textbox_in"
                              />{" "}
                              ???????????? (?????? ??????,?????? ?????? ???????????????)
                            </p>
                            <p className="calculate_textbox_in">
                              <img
                                src={list_icon}
                                alt={list_icon}
                                className="calculate_textbox_in"
                              />{" "}
                              ???????????????????????? ????????? ??????????????????
                            </p>
                            <p className="calculate_textbox_in">
                              <img
                                src={list_icon}
                                alt={list_icon}
                                className="calculate_textbox_in"
                              />{" "}
                              ?????????????????????(??????????????? ??????????????? ??????, ??????
                              ?????????????????????)
                            </p>
                            <p className="calculate_textbox_in">
                              <img
                                src={list_icon}
                                alt={list_icon}
                                className="calculate_textbox_in"
                              />{" "}
                              ????????????????????????
                            </p>
                          </div>
                        </td>
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
                  <span>????????? ????????????.</span>
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
};

export default Calculate_list_table;
