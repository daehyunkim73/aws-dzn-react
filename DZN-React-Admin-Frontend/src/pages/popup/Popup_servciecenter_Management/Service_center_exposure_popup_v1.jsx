import React, { useCallback } from 'react';
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';

const Service_center_exposure_popup_v1 = () => {
    const Image_close_popup = useCallback(() => {
        const Admin_user_Service_mang_popup_bgk_v1 = document.getElementById("Admin_user_Service_mang_popup_bgk_v1");
        Admin_user_Service_mang_popup_bgk_v1.style.display = "none";
    }, []);
    return (
        <React.Fragment>
            <div className="admin_background_same_box" id="Admin_user_Service_mang_popup_bgk_v1">
                <div className="admin_pixed_popup_white_box">
                    <div className="admin_small_white_box">
                        <div className="admin_popup_head_line_box">
                            <h1>노출 설정</h1>
                            <div className="admin_popupClose_box">
                                <img onClick={Image_close_popup}
                                    src={close_btn} alt="" />
                            </div>
                        </div>

                        <div className="admin_big_contents_box">
                            <div className="admin_popup_Contents_box" id="admin_popup_sp_text_box">
                                <p>노출함을 설정할 경우 데이터유통포털에<br />
                                    <span>판매가 게시됩니다.</span> 설정하시겠습니까?</p>
                            </div>

                            <div className="admin_popup_button_box">
                                <button className="admin_popup_first_btn"
                                    onClick={Image_close_popup} >취소</button>
                                <button className="admin_popup_second_btn" id="contents_post_btn_v1">확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Service_center_exposure_popup_v1;