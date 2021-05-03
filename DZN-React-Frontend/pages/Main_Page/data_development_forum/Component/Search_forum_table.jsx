import React, { useState, useEffect } from 'react';
import Forum_file from "../../../../image/Dev_Center/Forum/file.png";
import Forum_profile from "../../../../image/Center/Developers_header/profile.png";

const Search_forum_table = (props) => {
    const { Search_table_data, table_comments_forum, forum_state_add_file } = props;
    const [comment_lists_box, setComment_lists_box] = useState([]);
    const [forum_addfile, setForum_addfile] = useState();

    useEffect(() => {
        const filter_idx = table_comments_forum && table_comments_forum.filter((comment_item) => {
            return comment_item.forum_idx === Search_table_data.forum_idx
        });
        const forum_file_idx = forum_state_add_file && forum_state_add_file.filter((file_idx) => {
            return Number(file_idx.forum_post_idx) === Number(Search_table_data.forum_idx)
        });
        setForum_addfile(forum_file_idx);
        setComment_lists_box(filter_idx)
    }, []);


    return (
        <React.Fragment>
            <div className="forum_post_table_wrap">
                <div className="forum_post_table_title">
                    <img src={Forum_profile} alt="profile" />
                    <p className="forum_post_category">[{Search_table_data.cate_code}]</p>
                    <p>{Search_table_data.title}</p>
                </div>
                <div className="forum_post_table_content">
                    <div dangerouslySetInnerHTML={{ __html: Search_table_data.desc }}></div>
                </div>
                <div className="forum_post_table_footer">
                    <div>
                        <p>작성자:</p>
                        <p className="forum_footer_content">홍길동</p>
                    </div>
                    <div>
                        <p>작성일:</p>
                        <p className="forum_footer_content">{Search_table_data.regDt}</p>
                    </div>
                    <div>
                        <p>답변 수:</p>
                        <p className="forum_footer_content">{comment_lists_box && comment_lists_box.length}</p>
                    </div>
                    <div>
                        <p>조회:</p>
                        <p className="forum_footer_content">{Search_table_data.vw_cnt}</p>
                        {forum_addfile && forum_addfile.length !== 0 ? <img src={Forum_file} alt="file" /> : <p>&nbsp;</p>}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Search_forum_table;