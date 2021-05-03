import React from 'react';
import { Button } from 'react-bootstrap';
import Notice_posts_delete_popup from "../../../../popup/Popup_Notice_Management/Notice_detail_delete_popup";

import { Link } from 'react-router-dom';

const Detail_gaci_header = (props) => {
    const { detail_gaci_info } = props;

    const Posts_delete_Click = () => {
        const Posts_delete_popup_bgk = document.getElementById(
          "Admin_user_noticeDelete_popup_bgk"
        );
        Posts_delete_popup_bgk.style.display = "table";
      };

    return (
    <React.Fragment>
      <Notice_posts_delete_popup />
      <div className="Notice_detail_wrap">
        <div className="Notice_detail_big_box">
          <div className="Page_same_text">
            <p className="backoffice_title">공지사항</p>
          </div>
          <div className="Notice_contents_Wrap">
            <div className="Notice_detail_table">
              <div className="notice_title_box" id="gaci_Writer">
                  <p>{detail_gaci_info.ntc_writer}</p>
              </div>
              <div className="notice_title_box">
                <div className="notice_left_text_box">
                  <p className="notice_detail_sp_text">
                    <span className="sp_head_line_color_text">[{detail_gaci_info.ntc_type}]</span>
                  </p>
                  <p>{detail_gaci_info.ntc_title}</p>
                </div>

                <div className="notice_right_text_box">
                  <p>{detail_gaci_info.regDtFormat}</p>
                </div>
              </div>

              <div className="notice_detail_contents_box">
                <div dangerouslySetInnerHTML={{__html: detail_gaci_info.ntc_desc}}></div>
              </div>
            </div>
            <div className="notice_btn_box">
              <Link className="link_style_text" to="/admin/notice/modfiy">
                <button className="table_view_btn">수정</button>
              </Link>
              <button className="table_view_btn" onClick={Posts_delete_Click}>
                삭제
              </button>
              <Link className="link_style_text" to="/admin/notice">
                <button className="table_view_btn">목록</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
    )
}

export default Detail_gaci_header;