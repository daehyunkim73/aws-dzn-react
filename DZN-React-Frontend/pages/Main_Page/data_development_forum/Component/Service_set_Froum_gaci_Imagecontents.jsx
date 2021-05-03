import React from 'react';
import Forum_gaci_img from '../../../../image/Dev_Center/Forum/gaci_data_img.png';

const Data_set_froum_gaci_Imagecontents = () => {
    return (
        <React.Fragment>
            <div className="dataset_text_box">
                <p><span>[지도 데이터]</span> 멋진 배경이미지</p>
            </div>
            <div className="faq_table_content_wrap notice_dt_content_wrap">
                <div className='notice_dt_title' id="sp_Writer">
                    <p>홍길동</p>
                    <p><span className="dataset_views">조회수: 7</span>
                        <span>|</span>
                        <span className="dataset_date">2019-07-29</span></p>
                </div>
            </div>

            <div className="notice_dt_content_wrap" id="data_set_image_gaci_box">
                <div className="gaci_big_img_box">
                    <p>지도 데이터 이미지....</p>
                    <div className="dataset_froum_imgbox">
                        <img src={Forum_gaci_img} alt="" />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Data_set_froum_gaci_Imagecontents;