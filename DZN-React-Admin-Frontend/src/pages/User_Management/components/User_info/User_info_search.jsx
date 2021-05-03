import React from 'react';
import Form from 'react-bootstrap/Form';
import Date_picker from '../../../../Big_component/Date_Picker'

const User_info_search = (props) => {
    const {
        setReRenderStatus,
        searchData,
        setSearchData,
        setCertUsrDescList
    } = props;


    const handleTitle = (e) => {
        setSearchData({
            ...searchData,
            searchTerm: e.target.value,
        });
    }

    const handleDateGbn = (e) => {
        setSearchData({
            ...searchData,
            searchDateGbn: e.target.value,
        })
    }

    const searchCilck = (e) => {
        e.preventDefault();        
        const [start, end] = document.querySelectorAll('.picker-input__text');
        if(!(start.value === '' || end.value === '')) {
            setSearchData({
                ...searchData,
                searchStartDate: start.value,
                searchEndDate: end.value,
            })
        }  
        setReRenderStatus(true);
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
                                <select className="search_date_select form-control" onChange={handleDateGbn}>
                                    <option value="">일자구분</option>
                                    <option value="0">가입일</option>
                                    <option value="1">최근접속일</option>
                                </select>
                                <div className="back_admin_date_picker_box">
                                    <Date_picker />
                                </div>
                            </div>
                            <div className="input_form" id="search_df_ct_pr">
                                <Form.Control type="text" className="form_input" placeholder="검색어를 입력하세요.(회원명, 아이디, 핸드폰)"  onChange={handleTitle} />
                            </div>
                        </div>
                    </div>
                    <div className="input_submit_wrap">
                        <button className="search_btn" type="button"  onClick={searchCilck}> 검색</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default User_info_search;
