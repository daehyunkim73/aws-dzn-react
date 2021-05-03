import React from 'react';
import Form from 'react-bootstrap/Form';

const Calculate_list_search = () => {
  return (
    <React.Fragment>
      <div className="input_wrap sales_management_wrap">
        <div className="user_list_wrap">
          <div className="input_box_wrap">
            <div className="input_box">검색기간</div>
          </div>
          <div className="input_form_wrap">
            <div className="input_form calculate_list_search_input_wrap">
              <Form.Control as="select" className="table_select tb_select">
                <option>2020</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
              <span>년</span>
              <Form.Control as="select" className="table_select tb_select">
                <option>월 선택</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
              <span>월</span>
              <span className="to_to">~</span>
              <Form.Control as="select" className="table_select tb_select">
                <option>2020</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
              <span>년</span>
              <Form.Control as="select" className="table_select tb_select">
                <option>월 선택</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
              <span>월</span>
            </div>
          </div>
        </div>
        <div className="input_submit_wrap">
          <button className="search_btn" type="submit">
            검색
        </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Calculate_list_search;
