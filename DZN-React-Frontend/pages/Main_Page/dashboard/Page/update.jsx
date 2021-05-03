import React from 'react';
import News_update_box from '../components/News_update_box';
import { Link } from 'react-router-dom';
import View_more_icon from '../../../../image/Dev_Center/DashBoard/Section_sub/view_more.png';

const Update = () => {
    return (
        <React.Fragment>
            <div className="big_section_same_box" id="background_color_update">
                <div className="section_wrap">
                    <div className="news_update_header_box">
                        <div className="title_box">
                            <h2 className="news_text strong" >최신 업데이트</h2>
                            <Link to="/support/update" className="router_link">
                                <h4 className="right_text">더보기<img src={View_more_icon} /></h4>
                            </Link>
                        </div>
                        <News_update_box />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Update;