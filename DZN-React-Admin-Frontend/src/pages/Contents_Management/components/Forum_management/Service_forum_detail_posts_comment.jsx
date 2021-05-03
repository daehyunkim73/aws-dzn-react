import React, {useState} from 'react';
import profile_comment from '../../../../../image/Dev_Center/Forum/profile_comment.png';

const Service_forum_detail_posts_comment = () => {
    const [service_admin_data_froum_value, Set_service_admin_data_froum_value] = useState(0);

    return (
        <React.Fragment>
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
                            <p><span id="max_number_gaci">{service_admin_data_froum_value}</span>
                                <span>/</span>
                                <span>200</span></p>
                        </div>
                        <div className="admin_comment_uploade_btn">등록</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Service_forum_detail_posts_comment;