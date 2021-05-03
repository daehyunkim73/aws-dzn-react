import React from 'react';

const Service_forum_detail_comment = () => {
    return (
        <React.Fragment>
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

            <div className="admin_comment_many_box">
                <div className="admin_profile_big_box">
                    <div className="admin_profile_box"></div>
                    <div className="admin_profile_name_box"><p>코드 도둑</p></div>
                </div>
                <div className="admin_comment_contents_box">
                    <p>react natvie에서는 expo가 편리하고 앱 만들기도 쉬운거같아요. ㅎㅎ </p>
                    <div className="admin_comment_comment_date_time_box forum_comments_delete_button_box">
                        <button className="service_post_comments_uploade_btn">답글</button>
                        <button className="service_post_comments_delete_btn">삭제</button>
                        <p>18분전</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Service_forum_detail_comment;