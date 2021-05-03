import React, { useEffect, useState } from 'react';
import { Image_download } from '../../../../server_ajax';

const Detail_gaci_header = (props) => {
    const { detail_gaci_info, detail_gaci_file_info } = props;

    const download_file = (file_info, file_idx) => () => {
        Image_download(
            file_info.forum_post_file_name, //image 이름
            file_info.forum_file_path, //image 주소
            'backoffice', //service_code
            'C' // S: 서비스, C: 회사, U: 사용자
          );
    }

    return (
        <React.Fragment>
            <div className="dataset_text_box">
                <p><span>[{detail_gaci_info.cate_code}]</span> {detail_gaci_info.title}</p>
            </div>
            <div className="faq_table_content_wrap notice_dt_content_wrap">
                <div className='notice_dt_title' id="sp_Writer">
                    <p>{detail_gaci_info.post_writer}</p>
                    <p><span className="dataset_views">조회수: {detail_gaci_info.vw_cnt}</span>
                        <span>|</span>
                        <span className="dataset_date">{detail_gaci_info.mast_forum_regdt}</span></p>
                </div>
            </div>

            <div className="notice_dt_content_wrap" id="data_set_image_gaci_box">
                <div className="gaci_big_img_box">
                    <div dangerouslySetInnerHTML={{ __html: detail_gaci_info.forum_post_desc }}></div>
                </div>
                {
                    detail_gaci_file_info.filter((file_item) => {
                        return Number(file_item.forum_post_idx) === detail_gaci_info.mast_forum_idx
                    }).map((result, result_idx) => {
                        return (
                            <div key={result.forum_file_idx}
                                style={{
                                    cursor: 'pointer',
                                    color: "#6495ED",
                                    display: "inline-block",
                                    marginLeft: "10px",
                                    marginTop: "5px"
                                }} onClick={download_file(result, result_idx)}>{result.forum_post_file_name}</div>
                        )
                    })
                }
                {/* {
                    use_download_file.map((c, i) => {
                        return (
                            <div key={i}
                                style={{
                                    cursor: 'pointer',
                                    color: "#6495ED",
                                    display: "inline-block",
                                    marginLeft: "10px",
                                    marginTop: "5px"
                                }} onClick={download_file(i)}>{c}</div>
                        )
                    })
                } */}

            </div>
        </React.Fragment>
    )
}

export default Detail_gaci_header;