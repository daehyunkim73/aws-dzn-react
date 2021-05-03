import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Table_middle from "../../../../../func_src/Table_middle";
import Service_table_popup_delete from "../../../popup/Popup_forum_Management/Service_forum_delete_popup";
import { Link } from "react-router-dom";
import file from "../../../../../image/Dev_Center/Forum/file.png";

function Big_Forum_delete() {
  const Forum_delete = document.querySelectorAll(
    ".service_sp_table .table .table_view_btn"
  );
  const Admin_user_service_forum_delete_popup_bgk = document.getElementById(
    "Admin_user_service_forum_delete_popup_bgk"
  );

  for (let i = 0; i < Forum_delete.length; i++) {
    Forum_delete[i].addEventListener("click", () => {
      Admin_user_service_forum_delete_popup_bgk.style.display = "table";
    });
  }

  return {
    Forum_delete: Forum_delete,
    Admin_user_service_forum_delete_popup_bgk: Admin_user_service_forum_delete_popup_bgk,
  };
}

const Service_forum_table = () => {
  useEffect(() => {
    Table_middle();
    Big_Forum_delete();
    return () => {
      Table_middle();
      Big_Forum_delete();
    };
  });

  return (
    <React.Fragment>
      <Service_table_popup_delete />
      <div
        className="backoffice_table_wrap service_sp_table"
        id="big_admin_table_box"
      >
        <Table responsive id="question_table">
          <caption className="tb_caption">
            <div className="table_result_number_box">
              <div className="tb_select_wrap" id="select_result_delete_btn_box">
                <div className="caption_title bold_none">
                  [총 <p className="number_data">00</p>건 ] 검색결과
                  <p className="number_data">00</p>건
                </div>
              </div>
              <div className="tb_select_wrap" id="select_cpation_uploade_box">
                <Form.Control as="select" className="list_select tb_select">
                  <option>카테고리 전체</option>
                  <option>사용 방법</option>
                  <option>문제해결</option>
                  <option>자유 토론</option>
                  <option>데이터 분석</option>
                </Form.Control>
                <Form.Control as="select" className="table_select tb_select">
                  <option>최종 게시 순</option>
                  <option>죄다 조회 순(인기 순)</option>
                </Form.Control>
                <Form.Control as="select" className="list_select tb_select">
                  <option>목록 50</option>
                  <option>1</option>
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
              <th>회원명/아이디</th>
              <th>카테고리</th>
              <th>제목</th>
              <th>삭제</th>
              <th>게시일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className="table_href">한기업/datapotal</span>
              </td>
              <td>사용방법</td>
              <td>
                <Link className="link_style_text" to={"/admin/forum/svcdetail"}>
                  개발자센터 이용관련 문의 드립니다.
                  <img className="table_image" src={file} alt="file" />
                </Link>
              </td>
              <td className="delete_posts_btn">
                <button className="table_view_btn" type="button">
                  삭제
                </button>
              </td>
              <td>2020-02-02</td>
            </tr>
            <tr>
              <td>
                <span className="table_href">한기업/datapotal</span>
              </td>
              <td>빅 데이터</td>
              <td>
                API를 어떻게 이용할 수 있는 건가요?
                <img className="table_image" src={file} alt="file" />
              </td>
              <td className="delete_posts_btn">
                <button className="table_view_btn" type="button">
                  삭제
                </button>
              </td>
              <td>2020-02-02</td>
            </tr>
            <tr>
              <td>
                <span className="table_href">한기업/datapotal</span>
              </td>
              <td>문제해결</td>
              <td>개발자센터 이용관련 건의 드립니다.</td>
              <td className="delete_posts_btn">
                <button className="table_view_btn" type="button">
                  삭제
                </button>
              </td>
              <td>2020-02-02</td>
            </tr>
            <tr>
              <td>
                <span className="table_href">한기업/datapotal</span>
              </td>
              <td>사용방법</td>
              <td>
                API를 기술지원 문의 드립니다.
                <img className="table_image" src={file} alt="file" />
              </td>
              <td className="delete_posts_btn">
                <button className="table_view_btn" type="button">
                  삭제
                </button>
              </td>
              <td>2020-02-02</td>
            </tr>
            <tr>
              <td>
                <span className="table_href">한기업/datapotal</span>
              </td>
              <td>자유토론</td>
              <td>데이터 제휴 법률 자문 구합니다.</td>
              <td className="delete_posts_btn">
                <button className="table_view_btn" type="button">
                  삭제
                </button>
              </td>
              <td>2020-02-02</td>
            </tr>
            <tr>
              <td>
                <span className="table_href">한기업/datapotal</span>
              </td>
              <td>데이터 분석</td>
              <td>WIDE리소스 결제 문의</td>
              <td className="delete_posts_btn">
                <button className="table_view_btn" type="button">
                  삭제
                </button>
              </td>
              <td>2020-02-02</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default Service_forum_table;
