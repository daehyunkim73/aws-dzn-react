import React from "react";
import Form from "react-bootstrap/Form";
import Forum_notice from "./forum_notice";
import Forum_search_none from "../../../image/Dev_Center/question/search_none.png";
import { Link } from "react-router-dom";

const Forum_main_search_none = () => {
  return (
    <React.Fragment>
      <div className="data_forum_wrap">
        <div className="data_forum_input">
          <Form.Control as="select" className="search_select">
            <option>카테고리 선택</option>
            <option>사용방법</option>
            <option>문제해결</option>
            <option>자유토론</option>
            <option>데이터분석</option>
            <option>빅 데이터</option>
          </Form.Control>
          <Form.Control
            type="text"
            className="form_input"
            placeholder="제목 및 내용을 입력해주세요."
          />
          <Link to="/forum/service/write">
            <button>글 쓰기</button>
          </Link>
        </div>
        <Forum_notice />
        <div className="data_forum_post">
          <div className="faq_content_title">
            <p>'OO' 검색 결과</p>
          </div>

          <div className="faq_table">
            <div className="content_list_none">
              <img src={Forum_search_none} />
              <br />
              <span>검색된 결과가 없습니다.</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Forum_main_search_none;
