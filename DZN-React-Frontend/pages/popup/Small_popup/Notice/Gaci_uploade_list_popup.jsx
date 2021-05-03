import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

// 이미지 import
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';

/* 필수 항목들을 다 안적었을 때 뜨는 팝업 PPT 페이지 96페이지  */

const Gaci_upload_list_popup = () => {
    const Image_close_popup = useCallback(() => {
        const Froum_Data_Approved_uploade_popup_bgk = document.getElementById("Froum_Data_Approved_uploade_popup_bgk");
        Froum_Data_Approved_uploade_popup_bgk.style.display = "none";
    }, []);

    const Delete_popup = useCallback(() => {
        const Delete_popup_bgk = document.getElementById("Delete_popup_bgk");
        Delete_popup_bgk.style.display = "none";
    }, []);
    return (
        <React.Fragment>
            <div className="smae_popup_bgk_big_box" id="Froum_Data_Approved_uploade_popup_bgk">
                <div className="Buy_make_popup_white_box">
                    <div className="popup_small_white_box" id="froum_popup_box">
                        <div className="Small_popup_box">
                            <div className="Buy_popup_head_line_box">
                                <div className="Buy_popupClose_box">
                                    <img onClick={Image_close_popup}
                                        src={close_btn} alt="" />
                                </div>
                            </div>
                            <div className="small_Popup_text" id="Buy_popupClose_nav_box">
                                <div className="popup_Contents_box">
                                    <p>아직 작성 중 입니다.
                                    <br />목록으로 가시겠습니까?</p>
                                </div>
                                <div className="one_ok_button_box">
                                    <button className="fail_btn_popup" onClick={Image_close_popup}>취소</button>
                                    <Link to="/admin/notice" className="router_link">
                                        <button className="ok_popup_btn">확인</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Gaci_upload_list_popup;