import React from 'react';
import Form from 'react-bootstrap/Form';
import Date_Picker from '../../Main_Page/component/datapicker_calendar';

const Sales_management_search = () => {
  return (
    <React.Fragment>
      <div className="input_wrap sales_management_wrap">
        <div className="user_list_wrap">
          <div className="input_box_wrap">
            <div className="input_box">검색기간</div>
          </div>
          <div className="input_form_wrap">
            <div className="input_form date_Picer_input">
            <Date_Picker />
              <Form>
              <div className="service_key">
                          <button>7일</button>
                          <button className="search_active">1개월</button>
                          <button>3개월</button>
                          <button>6개월</button>
                          <button>1년</button>
                          <button>전체</button>
                      </div>
                
              </Form>
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

export default Sales_management_search;
