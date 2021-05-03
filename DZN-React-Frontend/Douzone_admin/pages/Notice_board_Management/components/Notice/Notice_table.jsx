import React, { useEffect, useState, createContext, useContext } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Table_middle from "../../../../../src/Table_middle";
import { Link, Route, Switch } from "react-router-dom";
import Gaci_page_nation_func from '../../../../../src/Gaci_page_nation';
import Notice_list from "./Component/Notice_list";
import { Server_ajax_get } from '../../../../../server_ajax';

const Notice_table = () => {
  const [notice_main_list, setNotice_main_list] = useState();
  const [notice_main_list_page_nation, setNotice_main_list_page_nation] = useState([]);
  const [notice_data_yn, setNotice_data_yn] = useState(false);
  const [notice_page_nation, setNotice_page_nation] = useState(1);

  useEffect(() => {
    if (notice_data_yn === true) {
      Gaci_page_nation_func(notice_page_nation, notice_main_list, setNotice_main_list_page_nation, notice_main_list_page_nation)
    }
  }, [notice_data_yn]);

  useEffect(() => {
    new Promise((res, rej) => {
      Server_ajax_get(
        'support/notice_main_list',
        setNotice_main_list,
      )
      res(true);
    })
    .then(() => {
      setNotice_data_yn(true);
    })
    .catch((e) => {
      console.error(e);
    })
  }, []);

  useEffect(() => {
    Table_middle();
    return () => {
      Table_middle();
    };
  });
  return (
    <React.Fragment>
      
      <Table responsive id="Notice_table_box">
        <caption className="tb_caption">
          <div className="table_result_number_box">
            <div className="tb_select_wrap" id="select_result_delete_btn_box">
              <button id="notice_delete_btn">삭제</button>
              <div className="caption_title bold_none">
            [총 <p className="number_data"></p>건 ] 검색결과
                <p className="number_data">00</p>건
              </div>
            </div>
            <div className="tb_select_wrap" id="select_cpation_uploade_box">
              <button id="notice_uploade_btn">
                <Link className="link_style_text" to="/admin/notice/modfiy">
                  등록
                </Link>
              </button>

              <Form.Control as="select" className="table_select tb_select">
                <option>최종수정일 순</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
              <Form.Control as="select" className="list_select tb_select">
                <option>목록 50</option>
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
            <th>
              <div className="checkbox_wrap" id="sp_table_none_head">
                <input type="checkbox" id="Notice_table_one" />
                <label
                  className="checkbox_design"
                  htmlFor="Notice_table_one"
                ></label>
              </div>
            </th>
            <th>등록일시</th>
            <th>제목</th>
            <th>작성자</th>
            <th>수정</th>
          </tr>
        </thead>
        <tbody>
          {
            notice_main_list_page_nation().map((notice_main_lists) => {  // const shortIdHash = shortId.generate(notice_main_lists.notice_idx);
              return (
                  <Notice_list
                    table_key_id={notice_main_lists.ntc_idx}
                    table_lists_froum={notice_main_lists}
                    key={notice_main_lists.ntc_idx}
                    Rou_history={history}
                  />
              )
            })
          }
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default Notice_table;
