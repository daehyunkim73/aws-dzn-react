import React from 'react';
import Company_set_detail from './Company_set_detail';
import Personalization_sidebar from '../personalization_sidebar/personalization_sidebar';

const Company_info = () => {

    return (
        <React.Fragment>

            <div className="api_document_wrap Company_info_wrap">
                <Personalization_sidebar />
                <div className="page_title_wrap">
                    <p className="page_title">회사정보</p>
                    <div className="page_title_btn">
                        <p>Home</p>
                        <img className="caption_img" src="../image/Center/Dashboard/view_more.png" />
                        <p>회사설정</p>
                        <img className="caption_img" src="../image/Center/Dashboard/view_more.png" />
                        <p>회사정보</p>

                    </div>

                </div>
                <div className="cs">
                    <Company_set_detail />

                </div>


            </div>

        </React.Fragment>
    )
}

export default Company_info;