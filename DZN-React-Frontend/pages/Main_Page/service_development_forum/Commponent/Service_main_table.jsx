import React from 'react';
import Forum_profile from "../../../../image/Center/Developers_header/profile.png";
import Forum_file from "../../../../image/Dev_Center/Forum/file.png";

const Service_main_table = (props) => {
    const { Service_post_info, table_comments_forum } = props;
    return (
        <React.Fragment>
            <div className="forum_post_table_wrap">
                <div className="forum_post_table_title">
                    <img src={Forum_profile} alt="profile" />
                    <p className="forum_post_category">[{Service_post_info.cate_code}]</p>
                    <p>{Service_post_info.title}</p>
                </div>
                <div className="forum_post_table_content">
                    <div dangerouslySetInnerHTML={{ __html: Service_post_info.desc }}></div>
                </div>
                <div className="forum_post_table_footer">
                    <div>
                        <p>작성자:</p>
                        <p className="forum_footer_content">{Service_post_info.post_writer}</p>
                    </div>
                    <div>
                        <p>작성일:</p>
                        <p className="forum_footer_content">{Service_post_info.regDt}</p>
                    </div>
                    <div>
                        <p>답변 수:</p>
                        <p className="forum_footer_content">
                            {table_comments_forum.filter((result) => {
                                return result.mast_forum_idx === Service_post_info.forum_idx
                            }).map((comment_result, comment_result_index, comment_result_self) => {
                                if (comment_result_index < 1) {
                                    if (comment_result.forum_idx !== null) {
                                        return comment_result_self.length;
                                    } else {
                                        return 0;
                                    }
                                }
                            })}
                        </p>
                    </div>
                    <div>
                        <p>조회:</p>
                        <p className="forum_footer_content">{Service_post_info.vw_cnt}</p>
                        {/* <img src={Forum_file} alt="file" /> */}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Service_main_table;