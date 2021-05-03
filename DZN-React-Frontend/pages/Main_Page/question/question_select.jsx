import React, { useCallback, useRef } from "react";
import { FormControl } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const Question_gaci_btn_select_page = ({ setSearchData, setRending }) => {
  const text_title_desc_search = useRef();

  const typeChange = useCallback((e) => {
    const selectType = e.target.value;
    setSearchData((filterData) => {
      return { ...filterData, type: selectType };
    });
  }, [setSearchData]);

  const stateChange = useCallback((e) => {
    const selectState = e.target.value;
    setSearchData((data) => {
      return { ...data, state: selectState };
    });
  }, [setSearchData]);

  const searchClick = useCallback(() => {
    const contents = text_title_desc_search.current.value;
    setSearchData((data) => {
      return { ...data, search: contents };
    });
    setRending(true);    
  }, [setSearchData, setRending]);

  return (
    <React.Fragment>
      <div className="question_input">
        <Form.Control
          as="select"
          className="search_select"
          onChange={typeChange}
        >
          <option value="">문의 유형 전체</option>
          <option value="1">이용문의</option>
          <option value="2">오류신고</option>
          <option value="3">건의사항(API관련)</option>
          <option value="4">기술지원</option>
          <option value="5">법률상담</option>
          <option value="6">기타</option>
        </Form.Control>
        <Form.Control
          as="select"
          className="search_select"
          onChange={stateChange}
        >
          <option value="">처리상태 전체</option>
          <option value="0">문의접수</option>
          <option value="1">답변완료</option>
        </Form.Control>

        <FormControl
          type="text"
          ref={text_title_desc_search}
          className="form_input"
          placeholder="검색할 내용 및 제목을 입력해 주세요"
        />
        <button className="quest_search" onClick={searchClick}>
          검색
        </button>
      </div>
    </React.Fragment>
  );
};

export default Question_gaci_btn_select_page;
