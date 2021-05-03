import React, { useState, useEffect } from 'react';
import Forum_profile from "../../../../image/Center/Developers_header/profile.png";
import Forum_file from "../../../../image/Dev_Center/Forum/file.png";
import { Link } from 'react-router-dom';
import Delete_btn from "../../../../image/Center/Close_btn/Close_btn.png"
import search from "../../../../image/Dev_Center/API_Document/search.png"
const Forum_main_table = (props) => {
    const { table_lists_froum, table_comments_forum, User_post_yn, user_my_post_yn, Forum_post_delete } = props;

    return (
        <React.Fragment>
            <div className="forum_post_table_wrap" >
                <div className="forum_post_table_title">
                    <img src={Forum_profile} alt="profile" />
                    <p className="forum_post_category">[{table_lists_froum.cate_code}]</p>
                    <p>{table_lists_froum.title}</p>
                    {
                      user_my_post_yn === true ?
                        <span className="float_right">
                          <Link to={`/forum/data/update/${table_lists_froum.forum_idx}`}><img src={search} alt=""/></Link>
                          <img src={Delete_btn} id="delete_post_icon" alt="Delete_btn" onClick={Forum_post_delete(table_lists_froum)} />
                        </span>
                        : <></>
                    }
                </div>
                <div className="forum_post_table_content">
                    <div dangerouslySetInnerHTML={{ __html: table_lists_froum.desc }}></div>
                </div>
                <div className="forum_post_table_footer">
                    <div>
                        <p>작성자:</p>
                        <p className="forum_footer_content">{table_lists_froum.post_writer}</p>
                    </div>
                    <div>
                        <p>작성일:</p>
                        <p className="forum_footer_content">{table_lists_froum.regDt}</p>
                    </div>
                    <div>
                        <p>답변 수:</p>
                        <p className="forum_footer_content">{
                            table_comments_forum.filter((result) => {
                                return result.mast_forum_idx === table_lists_froum.forum_idx
                            }).map((comment_result, comment_result_index, comment_result_self) => {
                                if (comment_result_index < 1) {
                                    if (comment_result.forum_idx !== null) {
                                        return comment_result_self.length;
                                    } else {
                                        return 0;
                                    }
                                }
                            })
                        }</p>
                    </div>
                    <div>
                        <p>조회:</p>
                        <p className="forum_footer_content">{table_lists_froum.vw_cnt}</p>
                        {/* {forum_addfile && forum_addfile.length !== 0 ? <img src={Forum_file} alt="file" /> : <></>} 수정(예정) */}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Forum_main_table;