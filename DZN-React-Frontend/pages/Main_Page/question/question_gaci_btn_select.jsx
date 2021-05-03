import React from 'react';
import { FormControl } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const Question_gaci_btn_select_page = () => {
    return (
        <React.Fragment>
            <div className="input_select_btn_box">
                <div className="select_input_box">
                    <Form.Control as="select" className="search_select_first">
                        <option>문의 유형 전체</option>
                        <option>이용문의</option>
                        <option>오류신고</option>
                        <option>건의사항(API관련)</option>
                        <option>기술지원</option>
                        <option>법률상담</option>
                        <option>기타</option>
                    </Form.Control>
                    <Form.Control as="select" className="search_select_second">
                        <option>처리상태 전체</option>
                        <option>문의접수</option>
                        <option>답변완료</option>
                    </Form.Control>
                </div>
                <div className="search_input_box">
                    <FormControl
                        placeholder="검색할 내용 및 제목을 입력해 주세요"
                        aria-label="Amount (to the nearest dollar)"
                    />
                </div>
                <div className="search_input_btn_box">
                    <Link to="/support/question/not_detected"><button>검색</button></Link>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Question_gaci_btn_select_page;