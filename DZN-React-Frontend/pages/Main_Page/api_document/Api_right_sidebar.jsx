import React from 'react';
import Api_triangle from '../../../image/Dev_Center/API_Document/triangle.png'

const Api_right_sidebar = () => {
    return (
        <React.Fragment>
            <div className="api_right_sidebar">
                <div><h1>회계 <span className="number_small_text_box">(100)</span></h1></div>
                <div className='right_sidebar_list'>
                    <p><img src={Api_triangle} alt='arrow' /> 회계 관리 API <span className="number_small_text_box">(6)</span></p>
                    <p>재무 관리 API <span className="number_small_text_box">(12)</span></p>
                    <p>경비 청구 API <span className="number_small_text_box">(9)</span></p>
                    <p>전자결제 API <span className="number_small_text_box">(11)</span></p>
                    <p>계약 관리 API <span className="number_small_text_box">(11)</span></p>
                </div>
            </div>
            
        </React.Fragment>
    )
}

export default Api_right_sidebar;