import React from 'react';
import Form from 'react-bootstrap/Form';
import Date_picker from '../../../../Big_component/Date_Picker_v2';

const Service_forum_header = () => {
    return (
        <React.Fragment>
            <div className="admin_user_list_wrap" id="big_admin_headerText_box">
                <div className="admin_user_list_header" id="notice_input_box_header">
                    <div className="notice_input_box notice_white_border">검색기간</div>
                    <div className="notice_input_box">검색창</div>
                </div>
                <div className="Notice_from_wrap">
                    <div className="faq_input_form faq_white_border" id="date_picker_sp_box">
                        <Date_picker />
                    </div>
                    <div className="faq_input_form" id="Notice_input_box">
                        <Form.Control type="text" placeholder="제목 및 아이디를 입력해주세요." />
                    </div>
                </div>
                <div className="backoffice_search_wrap">
                    <div className="input_wrap">
                        <div className="input_submit_wrap">
                            <button className="search_btn" type="submit">검색</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Service_forum_header;