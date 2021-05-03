import React from 'react';
import Forum_comment_comment from "../../../../image/Dev_Center/Forum/comment_comment_enter.png";

const Comment_comment_lists = (props) => {
    const { comment_comment_same } = props
    return (
        <React.Fragment>
            <div className="comment_double_comments_big_box">
                <div className="comment_not_input_box">
                    <div className="comment_enter_img_box">
                        <img src={Forum_comment_comment} alt="" />
                    </div>
                    <div className="comment_many_box">
                        <div className="profile_big_box">
                            <div className="profile_box"></div>
                            <div className="profile_name_box">
                                <p>코드 도둑</p>
                            </div>
                        </div>
                        <div className="comment_contents_box">
                            <div dangerouslySetInnerHTML={{ __html: comment_comment_same.desc }}></div>
                            <div className="comment_comment_date_time_box">
                                <button>답글</button>
                                <p>12분전</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Comment_comment_lists;