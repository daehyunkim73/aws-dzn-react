import React from 'react';
import Form from 'react-bootstrap/Form';
import Date_picker from '../../../../Big_component/Date_Picker';


const Api_use_approved_management_search = () => {
    return (
        <React.Fragment>
            <div className="backoffice_search_wrap">
                <div className="input_wrap">
                    <div className="search_wrap">
                        <div className="search_text_wrap">
                            <div className="search_text white_border">검색기간</div>
                            <div className="search_text">검색어</div>
                        </div>
                        <div className="search_form_wrap">
                            <div className="input_form white_border" id="date_picker_sp_box">
                                <select className="search_date_select form-control">
                                    <option>요청일</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                                <div className="back_admin_date_picker_box">
                                    <Date_picker />
                                </div>
                            </div>
                            <div className="input_form" id="search_df_ct_pr">
                                <Form.Control type="text" className="form_input" placeholder="서비스 제목, 회원명, 아이디 검색" />
                            </div>
                        </div>
                    </div>
                    <div className="input_submit_wrap">
                        <button className="search_btn" type="submit"> 검색</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Api_use_approved_management_search;
