import React from 'react';
import Forum_profile_comment from '../../../../image/Dev_Center/Forum/profile_comment.png';

const Comment_form = (props) => {
    const { Change_ev, Text_ch, Comment_uplode, Text_info } = props

    return (
        <React.Fragment>
            <div className="big_input_gaci_box">
                <div className="input_gaci_box">
                    <div className="small_input_gaci_uploade_box">
                        <div className="comment_input_real_box">
                            <div className="profile_big_box">
                                <div className="profile_box">
                                    <img src={Forum_profile_comment} alt="Forum_profile_comment" />
                                </div>
                                <div className="profile_name_box"><p>데이터 도둑</p></div>
                            </div>
                            <div className="input_typing_uploade_box">
                                <textarea type="text" ref={Text_info} onChange={Change_ev} placeholder="댓글 내용을 입력해주세요."
                                    maxLength="200" />
                            </div>
                            <div className="value_input_comment_box">
                                <div className="number_input_text_upBox">
                                    <p><span>{Text_ch}</span> <span>/</span> <span>200</span></p>
                                </div>
                                <div className="comment_uploade_btn" onClick={Comment_uplode}>등록</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Comment_form;