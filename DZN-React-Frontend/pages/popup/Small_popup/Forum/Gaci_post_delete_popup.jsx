import React, { useCallback } from 'react';
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';
import { Server_ajax_post } from '../../../../server_ajax'

const Gaci_post_delete_popup = (props) => {
    const { Delete_post_info, Ddelete_post_yn, Delete_search_post } = props;
    const Image_close_popup = useCallback(() => {
        const Forum_deleted_popup = document.getElementById("Froum_post_deleted_bgk");
        Forum_deleted_popup.style.display = "none";
    }, []);

    const forum_delete_post_ok = useCallback(() => {
        try {
            let body = {
                post_id: Delete_post_info.forum_idx
            }
            Server_ajax_post('forum/forum_post_deleted', body);
            Image_close_popup();
            Ddelete_post_yn(true);
            Delete_search_post();
        } catch (e) {
            return console.error(e);
        }
    }, [Delete_post_info && Delete_post_info.forum_idx])

    return (
        <React.Fragment>
            <React.Fragment>
                <div className="smae_popup_bgk_big_box" id="Froum_post_deleted_bgk">
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
                                        <p>게시물을 삭제 하시겠습니까?</p>
                                    </div>
                                    <div className="one_ok_button_box">
                                        <button className="fail_btn_popup" onClick={Image_close_popup}>취소</button>
                                        <button
                                            className="ok_popup_btn"
                                            id="gaci_uploade_ok_btn"
                                            onClick={forum_delete_post_ok}
                                        >확인
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </React.Fragment>
    )
}

export default Gaci_post_delete_popup;