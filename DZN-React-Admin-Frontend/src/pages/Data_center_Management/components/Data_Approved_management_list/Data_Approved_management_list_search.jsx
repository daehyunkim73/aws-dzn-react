import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Date_picker from '../../../../Big_component/Date_Picker'

const Data_Approved_management_list_search = ({setRending, searchData, setSearchData}) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // 기본 검색 정보
    useEffect(() => {        
        setSearchData({
            searchDateType: '0'
        })
    }, [])

    const dateTypeChange = (e) => {
        setStartDate('');
        setEndDate('');
        setSearchData({
            ...searchData,
            searchDateType: e.target.value
        })
    }
    
    const inputChange = (e) => {
        setSearchData({
            ...searchData,
            searchTerm: e.target.value
        })
    }

    const searchCilck = (e) => {
        const [start, end] = document.querySelectorAll('.picker-input__text');
        setStartDate(start.value);
        setEndDate(end.value);
        
        setSearchData({
            ...searchData,
            searchStartDate: start.value,
            searchEndDate: end.value,
        })
        
        setRending(true);        
    }

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
                                <select className="search_date_select form-control" onChange={dateTypeChange}>
                                    <option value="0">요청일</option>
                                    <option value="1">승인일</option>
                                </select>
                                <div className="back_admin_date_picker_box">
                                    <Date_picker start={startDate} end={endDate}/>
                                </div>
                            </div>
                            <div className="input_form" id="search_df_ct_pr">
                                <Form.Control type="text" className="form_input" placeholder="데이터 제목을 선택하세요." onChange={inputChange} />
                            </div>
                        </div>
                    </div>
                    <div className="input_submit_wrap">
                        <button className="search_btn" type="submit" onClick={searchCilck}> 검색</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Data_Approved_management_list_search;
