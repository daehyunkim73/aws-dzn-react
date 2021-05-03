import React, { useCallback } from 'react';
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';

const Quest_posts_uploade_popup = ({ setConfirm, isEdit }) => {
    const Image_close_popup = useCallback(() => {
        const Admin_user_notice_post_popup_bgk = document.getElementById("Admin_user_post_uploade_popup_bgk");
        Admin_user_notice_post_popup_bgk.style.display = "none";
    }, []);

    const Image_ok_popup = useCallback(() => {
        setConfirm(true)
    }, [setConfirm]);

    return (
        <React.Fragment>
            <div className="admin_background_same_box" id="Admin_user_post_uploade_popup_bgk">
                <div className="admin_pixed_popup_white_box">
                    <div className="admin_small_white_box">
                        <div className="admin_popup_head_line_box">
                            <h1>게시물 {isEdit ? '수정' : '등록'}</h1>
                            <div className="admin_popupClose_box">
                                <img onClick={Image_close_popup}
                                     src={close_btn} alt="" />
                            </div>
                        </div>

                        <div className="admin_big_contents_box">
                            <div className="admin_popup_Contents_box" id="admin_popup_sp_text_box">
                                <p>답변을 {isEdit ? '수정' : '등록'}하시겠습니까?</p>
                            </div>

                            <div className="admin_popup_button_box">
                            <button className="admin_popup_first_btn" onClick={Image_close_popup}>취소</button>
                                <button className="admin_popup_second_btn" id="notice_gaci_uploade_btn" onClick={Image_ok_popup}>확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Quest_posts_uploade_popup;