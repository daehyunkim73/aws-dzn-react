import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Detail_gaci_header = (props) => {
    const { detail_gaci_info } = props;
    return (
        <React.Fragment>
            <div className="faq_table_content_wrap notice_dt_content_wrap">
                <div className='notice_dt_title' id="sp_Writer">
                <p><span>[{detail_gaci_info.ntc_type}]</span> {detail_gaci_info.ntc_title}</p>
                    <p><span className="dataset_views">조회수: {detail_gaci_info.ntc_vw_cnt}</span>
                        <span>|</span>
                        <span className="dataset_date">{detail_gaci_info.regDtFormat}</span></p>
                </div>
            </div>
            
            <div className="notice_dt_content_wrap" id="data_set_image_gaci_box">
                <div className="gaci_big_img_box">
                    <div dangerouslySetInnerHTML={{__html: detail_gaci_info.ntc_desc}}></div>
                </div>
                <div className="list_button_box notice_btn">
                    <Link to="/support/notice" className="router_link">
                        <Button>목록</Button>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Detail_gaci_header;