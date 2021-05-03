import React, { useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Date_picker from '../../../../Big_component/Date_Picker';

const Question_header = ({setRending, searchData, setSearchData}) => {
    const onKeyPress = (e) => {
        if(e.key == 'Enter') {
          searchCilck();
        }
    }    

    const inputChange = (e) => {
        setSearchData({
            ...searchData,
            searchTerm: e.target.value
        })
    }

    const searchCilck = (e) => {
        const [start, end] = document.querySelectorAll('.picker-input__text');
        
        if(!(start.value === '' || end.value === '')) {
            setSearchData({
                ...searchData,
                searchStartDate: start.value,
                searchEndDate: end.value,
            })
        }
        setRending(true);
    }

    return (
        <React.Fragment>
            <div className="admin_user_list_header" id="notice_input_box_header">
                <div className="notice_input_box notice_white_border">검색기간</div>
                <div className="notice_input_box">검색창</div>
            </div>
            <div className="Notice_from_wrap">
                <div className="faq_input_form faq_white_border" id="date_picker_sp_box">
                    <Date_picker />
                </div>
                <div className="faq_input_form" id="Notice_input_box">
                    <Form.Control type="text" placeholder="문의제목 및 아이디를 입력해주세요." onChange={inputChange} onKeyPress={onKeyPress}/>
                </div>
            </div>
            <div className="backoffice_search_wrap">
                <div className="input_wrap">
                    <div className="input_submit_wrap">
                        <button className="search_btn" type="submit" onClick={searchCilck}> 검색</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Question_header;