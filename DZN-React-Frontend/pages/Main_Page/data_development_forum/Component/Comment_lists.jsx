import React, { useState, useCallback } from 'react';
import Comment_comment_form from '../Component/Comment_comment_form';
import Comment_comments_list from './Comment_comments_list';

const Comment_lists = (props) => {
    const { list_comments, all_gaci_comment, setComment_uploade } = props;
    const [comment_comment_form, setComment_comment_form] = useState(false);

    const comment_form_btn = useCallback(() => {
        setComment_comment_form((prev) => (!prev));
    }, [comment_comment_form]);

    return (
        <React.Fragment>
            <div>
                <div className="comment_many_box">
                    <div className="profile_big_box" id="sp_profile_box">
                        <div className="profile_box" ></div>
                        <div className="profile_name_box">
                            <p>코드 도둑{list_comments.frm_awr_idx}</p>
                            <p>{list_comments.regDt}</p>
                        </div>
                    </div>
                    <div className="comment_contents_box">
                        <div dangerouslySetInnerHTML={{ __html: list_comments.desc }}></div>
                        <div className="comment_comment_date_time_box">
                            <button onClick={comment_form_btn}>답글</button>
                        </div>
                    </div>
                </div>
                {
                    comment_comment_form === true &&
                    <Comment_comment_form
                        Comment_info={list_comments}
                        setComment_uploade={setComment_uploade}
                    />
                }
                {
                    all_gaci_comment.filter((com_com_lis) => {
                        return list_comments.frm_awr_idx === com_com_lis.forum_idx
                    }).map((com_com_lis) => {
                        return (
                            <Comment_comments_list
                                key={com_com_lis.frm_awr_idx}
                                com_com_lis={com_com_lis}
                                comment_idx={list_comments}
                                setComment_uploade={setComment_uploade}
                            />
                        )
                    })
                }
            </div>
        </React.Fragment>
    )
}

export default Comment_lists;