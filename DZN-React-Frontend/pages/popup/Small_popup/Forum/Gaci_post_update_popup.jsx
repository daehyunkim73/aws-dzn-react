import React, { useCallback } from 'react';
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';
import { Server_ajax_post } from '../../../../server_ajax';

const Gaci_post_update_popup = (props) => {
    const { Forum_update_info, Redirection } = props;
    const Image_close_popup = () => {
        const forum_update_none_bgk = document.getElementById("Froum_Data_Approved_gaci_update_popup_bgk");
        forum_update_none_bgk.style.display = "none";
    }

    const update_gaci_btn = useCallback(async () => {
        await Server_ajax_post('forum/forum_post_updated', Forum_update_info);
        Image_close_popup();
        if (Forum_update_info.forum_update_gbn === 'D') {
            Redirection.push("/forum/data");
        } else if (Forum_update_info.forum_update_gbn === 'S') {
            Redirection.push("/forum/service");
        }
    }, [Forum_update_info]);

    return (
        <React.Fragment>
            <div className="smae_popup_bgk_big_box" id="Froum_Data_Approved_gaci_update_popup_bgk">
                <div className="Buy_make_popup_white_box">
                    <div className="popup_small_white_box" id="froum_popup_box">
                        <div className="Small_popup_box" id="froum_popup_box">
                            <div className="Buy_popup_head_line_box">
                                <div className="Buy_popupClose_box">
                                    <img onClick={Image_close_popup} src={close_btn} alt="" />
                                </div>
                            </div>
                            <div className="small_Popup_text" id="Buy_popupClose_nav_box">
                                <div className="popup_Contents_box">
                                    <p>게시물을 수정하시겠습니까?</p>
                                </div>
                                <div className="one_ok_button_box">
                                    <button className="fail_btn_popup" onClick={Image_close_popup}>취소</button>
                                    <button
                                        className="ok_popup_btn"
                                        id="gaci_uploade_ok_btn"
                                        onClick={update_gaci_btn}>확인
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Gaci_post_update_popup;