import React from 'react';

const Service_detail_post_info = (props) => {
    const { detail_post_info } = props;

    return (
        <React.Fragment>
            <div className="dataset_text_box">
                <p><span>[{detail_post_info.cate_code}]</span> {detail_post_info.title}</p>
            </div>
            <div className="faq_table_content_wrap notice_dt_content_wrap">
                <div className='notice_dt_title' id="sp_Writer">
                    <p>홍길동</p>
                    <p><span className="dataset_views">조회수: {detail_post_info.vw_cnt}</span>
                        <span>|</span>
                        <span className="dataset_date">{detail_post_info.mast_forum_regdt}</span></p>
                </div>
            </div>

            <div className="notice_dt_content_wrap" id="data_set_image_gaci_box">
                <div className="gaci_big_img_box">
                    <div dangerouslySetInnerHTML={{ __html: detail_post_info.forum_post_desc }}></div>
                </div>

                <div style={{
                    cursor: 'pointer',
                    color: "#6495ED",
                    display: "inline-block",
                    marginLeft: "10px",
                    marginTop: "5px"
                }}>이미지</div>
            </div>
        </React.Fragment>
    )
}

export default Service_detail_post_info;