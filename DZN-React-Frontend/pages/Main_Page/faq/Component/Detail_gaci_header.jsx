import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Detail_gaci_header = (props) => {
    const { detail_gaci_info } = props;
    return (
        <React.Fragment>
            <div className='notice_dt_title'>
                <p className="faq_table_title">[{detail_gaci_info.faq_type_code}]</p>
                <p>{detail_gaci_info.faq_title}</p>
                <p></p>
            </div>
            <div className="notice_dt_content_wrap" id="data_set_image_gaci_box">
                <div className="gaci_big_img_box">
                    <div dangerouslySetInnerHTML={{__html: detail_gaci_info.faq_desc}}></div>
                </div>
            </div>
            <div className="list_button_box notice_btn">
                <Link to="/support/faq" className="router_link">
                    <p><Button>목록</Button></p>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default Detail_gaci_header;