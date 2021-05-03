import React from 'react';
import Notice_box from '../components/Notice_box';
import { Link } from 'react-router-dom';
import View_more_icon from '../../../../image/Dev_Center/DashBoard/Section_sub/view_more.png';

const Notice = () => {
    return (
        <React.Fragment>
            <div className="big_section_same_box">
                <div className="section_wrap">
                    <div className="news_update_header_box">
                        <div className="title_box">
                            <h2 className="news_text strong" >공지사항</h2>
                            <Link to="/support/notice" className="router_link">
                                <h4 className="right_text">더보기<img src={View_more_icon} /></h4>
                            </Link>
                        </div>
                        <Notice_box />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Notice;