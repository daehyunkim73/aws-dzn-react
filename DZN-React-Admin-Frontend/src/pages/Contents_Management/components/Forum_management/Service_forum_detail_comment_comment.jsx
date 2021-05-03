import React, {useState} from 'react';
import comment_comment_enter from '../../../../../image/Dev_Center/Forum/comment_comment_enter.png';
import profile_comment from '../../../../../image/Dev_Center/Forum/profile_comment.png';

const Service_forum_detail_comment_comment = () => {
    const [Service_admin_data_froum_value_v2, Set_data_froum_value_v2] = useState(0);

    return (
        <React.Fragment>
            <div className="admin_commet_comment_input_gaci_box">
                <div className="admin_comment_enter_img_box" id="admin_sp_comment_enter_img_box">
                    <img src={comment_comment_enter} alt="" />
                </div>
                <div className="big_posts_gaci_comments_box" id="admin_comment_comment_input_gaci_box">
                    <div className="admin_posts_input_gaci_box">
                        <div className="admin_post_comment_input_real_box">
                            <div className="admin_profile_big_box">
                                <div className="admin_profile_box">
                                    <img src={profile_comment} alt="" />
                                </div>
                                <div className="admin_profile_name_box"><p>데이터 도둑</p></div>
                            </div>
                            <div className="admin_uploade_input_typing_uploade_box">
                                <textarea type="text" placeholder="댓글 내용을 입력해주세요."
                                    maxLength="200" />
                            </div>
                            <div className="admin_value_input_comment_box">
                                <div className="admin_number_input_text_upBox">
                                    <p><span id="max_number_gaci">{Service_admin_data_froum_value_v2}</span>
                                        <span>/</span>
                                        <span>200</span></p>
                                </div>
                                <div className="admin_comment_uploade_btn">등록</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="big_admin_comments_box">
                <div className="admin_comment_not_input_box">
                    <div className="admin_comment_enter_img_box">
                        <img src={comment_comment_enter} alt="" />
                    </div>
                    <div className="admin_comment_many_box">
                        <div className="admin_profile_big_box">
                            <div className="admin_profile_box"></div>
                            <div className="admin_profile_name_box"><p>코드 도둑</p></div>
                        </div>
                        <div className="admin_comment_contents_box">
                            <p>저 이미지는 무슨 데이터로 만들었나요?? </p>
                            <div className="admin_comment_comment_date_time_box forum_comments_delete_button_box">
                                <button className="service_post_comments_uploade_btn">답글</button>
                                <button className="service_post_comments_delete_btn">삭제</button>
                                <p>12분전</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="admin_comment_not_input_box">
                    <div className="admin_comment_enter_img_box">
                        <img src={comment_comment_enter} alt="" />
                    </div>
                    <div className="admin_comment_many_box">
                        <div className="admin_profile_big_box">
                            <div className="admin_profile_box"></div>
                            <div className="admin_profile_name_box"><p>코드 도둑</p></div>
                        </div>
                        <div className="admin_comment_contents_box">
                            <p>저 이미지는 무슨 데이터로 만들었나요?? </p>
                            <div className="admin_comment_comment_date_time_box forum_comments_delete_button_box">
                                <button className="service_post_comments_uploade_btn">답글</button>
                                <button className="service_post_comments_delete_btn">삭제</button>
                                <p>12분전</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Service_forum_detail_comment_comment;