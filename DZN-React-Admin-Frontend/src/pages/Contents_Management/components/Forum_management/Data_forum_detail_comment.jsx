import React, { useState, useCallback } from 'react';

const Data_forum_detail_comment = (props) => {
    const { Forum_comments_ifno } = props;
    const [comment_comment_form, setComment_comment_form] = useState(false);

    const admin_comment_delete = (comment_info_data) => () => {
        console.log("comment_info_data", comment_info_data);
    }

    const admin_comment_uplaode = useCallback(() => {
        setComment_comment_form((prev) => (!prev));
    }, [comment_comment_form]);

    return (
        <React.Fragment>
            <div className="admin_comment_many_box">
                <div className="admin_profile_big_box">
                    <div className="admin_profile_box"></div>
                    <div className="admin_profile_name_box"><p>{Forum_comments_ifno.mbr_idx}</p></div>
                </div>
                <div className="admin_comment_contents_box">
                    <div dangerouslySetInnerHTML={{ __html: Forum_comments_ifno.desc }}></div>
                    <div className="admin_comment_comment_date_time_box forum_comments_delete_button_box">
                        <button className="data_post_comments_uploade_btn" onClick={admin_comment_uplaode}>답글</button>
                        <button className="data_post_comments_delete_btn" onClick={admin_comment_delete(Forum_comments_ifno)}>삭제</button>
                        <p>12분전</p>
                    </div>
                </div>
            </div>
            {/* {
                comment_comment_form === true &&
                <Comment_comment_form
                    Comment_info={list_comments}
                    setComment_uploade={setComment_uploade}
                />
            } */}
        </React.Fragment>
    )
}

export default Data_forum_detail_comment;