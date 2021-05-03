import React, { useCallback } from 'react';
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';
import { Link } from 'react-router-dom';

const Faq_Posts_popup_fail_popup = () => {
    const Image_close_popup = useCallback(() => {
        const Admin_user_Faq_post_fail_popup_bgk = document.getElementById("Admin_user_Faq_post_fail_popup_bgk");
        Admin_user_Faq_post_fail_popup_bgk.style.display = "none";
    }, []);
    return (
        <React.Fragment>
            <div className="admin_background_same_box" id="Admin_user_Faq_post_fail_popup_bgk">
                <div className="admin_pixed_popup_white_box">
                    <div className="admin_small_white_box">
                        <div className="admin_popup_head_line_box">
                            <h1>게시물 취소</h1>
                            <div className="admin_popupClose_box">
                                <img onClick={Image_close_popup} 
                                src={close_btn} alt="" />
                            </div>
                        </div>

                        <div className="admin_big_contents_box">
                            <div className="admin_popup_Contents_box" id="admin_popup_sp_text_box">
                                <p>게시물 작성을 취소하시겠습니까?</p>
                            </div>

                            <div className="admin_popup_button_box">
                            <button className="admin_popup_first_btn" onClick={Image_close_popup}>취소</button>
                            <Link to={"/admin/faq"}>
                                <button className="admin_popup_second_btn" id="notice_gaci_fail_btn">확인</button>
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Faq_Posts_popup_fail_popup;