import React,  {useCallback, useState} from 'react';
import Forum_comment_comment from "../../../../image/Dev_Center/Forum/comment_comment_enter.png";
import Comment_comment_form from './Service_comment_comment_form';

const Comment_comments_list = (props) => {
    const { com_com_lis, comment_idx, setComment_uploade } = props
    const [comment_comment_form, setComment_comment_form] = useState(false);

    const comment_comment_form_btn = useCallback(() => {
        setComment_comment_form((prev) => (!prev));
    }, [comment_comment_form]);

    return (
        <React.Fragment>
            <div>
                <div className="comment_double_comments_big_box">
                    <div className="comment_not_input_box">
                        <div className="comment_enter_img_box">
                            <img src={Forum_comment_comment} alt="" />
                        </div>
                        <div className="comment_many_box">
                            <div className="profile_big_box" id="sp_profile_box">
                                <div className="profile_box"></div>
                                <div className="profile_name_box">
                                    <p>코드 도둑{com_com_lis.frm_awr_idx}</p>
                                    <p>{com_com_lis.regDt}</p>
                                </div>
                            </div>
                            <div className="comment_contents_box">
                                <div dangerouslySetInnerHTML={{ __html: com_com_lis.desc }}></div>
                                <div className="comment_comment_date_time_box">
                                    <button onClick={comment_comment_form_btn}>답글</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                comment_comment_form === true &&
                <Comment_comment_form
                    Comment_info={comment_idx}
                    setComment_uploade={setComment_uploade}
                />
            }
        </React.Fragment>
    )
}

export default Comment_comments_list;