import React, { useRef, useCallback } from 'react';
import Forum_profile_comment from '../../../../image/Dev_Center/Forum/profile_comment.png';
import Forum_comment_comment from "../../../../image/Dev_Center/Forum/comment_comment_enter.png";
import { Server_ajax_post } from "../../../../server_ajax";
import { test } from '../../../../src/now_date';
import { User_info } from '../../../../server_ajax'
import { useCookies } from 'react-cookie';

const Comment_comment_from = (props) => {
    const { Comment_info, setComment_uploade } = props;
    const comment_comment_text = useRef();
    const [cookies, setCookie, removeCookie] = useCookies();

    const comment_comment_uploade = useCallback(async () => {
        try {
            if (!cookies.wehago_s) {
                return alert('로그인을 먼저 해주세요.')
            }
            const comment_comment_date = new test();
            const User_comment_comment_info = await User_info();

            let body = {
                gaci_idx_comment: Comment_info.frm_awr_idx,
                comment_contents: `<p>${comment_comment_text.current.value.replace(/(\n|\r\n)/g, '<br>')}</p>`,
                comment_date: comment_comment_date.date,
                comment_mbr_idx: User_comment_comment_info.resultData[0].user_no
            }

            await Server_ajax_post('forum/forum_comment_up', body)
            await setComment_uploade(true);
            comment_comment_text.current.value = "";
        } catch (e) {
            return console.error(e);
        }
    }, [setComment_uploade, Comment_info && Comment_info.frm_awr_idx])

    return (
        <React.Fragment>
            <div className="commet_comment_input_gaci_box">
                <div className="comment_enter_img_box" id="sp_comment_enter_img_box">
                    <img src={Forum_comment_comment} alt="" />
                </div>
                <div className="input_gaci_box" id="comment_comment_input_gaci_box">
                    <div className="small_input_gaci_uploade_box">
                        <div className="comment_input_real_box">
                            <div className="profile_big_box">
                                <div className="profile_box">
                                    <img src={Forum_profile_comment} alt="" />
                                </div>
                                <div className="profile_name_box">
                                    <p>데이터 도둑</p>
                                </div>
                            </div>
                            <div className="input_typing_uploade_box">
                                <textarea
                                    type="text"
                                    placeholder="댓글 내용을 입력해주세요."
                                    maxLength="200"
                                    ref={comment_comment_text}
                                />
                            </div>
                            <div className="value_input_comment_box">
                                <div className="number_input_text_upBox">
                                    <p>
                                        <span>0</span> <span>/</span>
                                        <span>200</span>
                                    </p>
                                </div>
                                <div className="comment_uploade_btn" onClick={comment_comment_uploade}>등록</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Comment_comment_from;