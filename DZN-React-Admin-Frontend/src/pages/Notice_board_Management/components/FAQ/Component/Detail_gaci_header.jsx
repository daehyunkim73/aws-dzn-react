import React from 'react';
import Faq_posts_delete_popup from "../../../../popup/Popup_FAQ_Management/Faq_posts_delete_popup";
import { Link } from "react-router-dom";

const Detail_gaci_header = (props) => {
    const { detail_gaci_info } = props;
    console.log('props',props);

    const Faq_detail_delete_Click = () => {
      const Admin_user_faq_delete_popup_bgk = document.getElementById(
        "Admin_user_faq_delete_popup_bgk"
      );
      Admin_user_faq_delete_popup_bgk.style.display = "table";
    };

    return (
    <React.Fragment>
      <Faq_posts_delete_popup faq_key={detail_gaci_info.faq_idx}/>
      <div className="faq_detail_wrap">
        <div className="Notice_detail_big_box">
          <div className="Page_same_text">
            <p className="backoffice_title">FAQ</p>
          </div>
          <div className="Notice_contents_Wrap">
            <div className="Notice_detail_table">
              <div className="notice_title_box" id="gaci_Writer">
                  <p>{detail_gaci_info.mbr_id}</p>
              </div>
              <div className="notice_title_box">
                <div className="notice_left_text_box">
                  <p className="notice_detail_sp_text">
                    <span className="sp_head_line_color_text">[{detail_gaci_info.faq_type_code}]</span>
                  </p>
                  <p>{detail_gaci_info.faq_title}</p>
                </div>

                <div className="notice_right_text_box">
                  <p>{detail_gaci_info.regDt}</p>
                </div>
              </div>

              <div className="notice_detail_contents_box">
                <div dangerouslySetInnerHTML={{__html: detail_gaci_info.faq_desc}}></div>
              </div>
            </div>
            <div className="notice_btn_box">
              <Link className="link_style_text" to={`/admin/faq/modify/${detail_gaci_info.faq_idx}`}>
                <button className="table_view_btn">수정</button>
              </Link>
                <button
                  className="table_view_btn"
                  onClick={Faq_detail_delete_Click}
                >
                  삭제
                </button>
              <Link to="/admin/faq">
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