import React, { useCallback } from 'react';
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';
import axios from 'axios';
import { Server_ajax_post } from '../../../../Server_ajax';

const Dataforum_posts_delete_popup = (props) => {
    const { Forum_delete, Forum_delete_func, Forum_remove_func, History_back } = props;

    const Image_close_popup = useCallback(() => {
        const Admin_user_data_forum_delete_popup_bgk = document.getElementById(
            "Admin_user_data_forum_delete_popup_bgk"
        );
        Admin_user_data_forum_delete_popup_bgk.style.display = "none";
        Forum_remove_func && Forum_delete_func([]);
    }, []);

    const forum_delete = useCallback( async () => {
        try {
            let body = {
                forum_delete_idx: null
            }

            Forum_delete.map((item) => {
                return body.forum_delete_idx = item
            })

            await Server_ajax_post(
                'contents_management/admin_forum_post_delete',
                body
            )
            Forum_delete_func && Forum_delete_func([]);
            Forum_remove_func && Forum_remove_func(true);
            const Admin_user_data_forum_delete_popup_bgk = document.getElementById(
                "Admin_user_data_forum_delete_popup_bgk"
            );
            Admin_user_data_forum_delete_popup_bgk.style.display = "none";
            History_back && History_back.push("/admin/forum");
            Forum_remove_func && Forum_remove_func(false);
        } catch (e) {
            return console.error(e);
        }
    }, [Forum_delete]);

    return (
        <React.Fragment>
            <div className="admin_background_same_box" id="Admin_user_data_forum_delete_popup_bgk">
                <div className="admin_pixed_popup_white_box">
                    <div className="admin_small_white_box">
                        <div className="admin_popup_head_line_box">
                            <h1>게시물 삭제</h1>
                            <div className="admin_popupClose_box">
                                <img onClick={Image_close_popup}
                                    src={close_btn} alt="" />
                            </div>
                        </div>

                        <div className="admin_big_contents_box">
                            <div className="admin_popup_Contents_box" id="admin_popup_sp_text_box">
                                <p>게시물을 삭제하시겠습니까?</p>
                            </div>

                            <div className="admin_popup_button_box">
                                <button className="admin_popup_first_btn" onClick={Image_close_popup}>취소</button>
                                <button className="admin_popup_second_btn" id="data_forum_delete"
                                    onClick={forum_delete}
                                >확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Dataforum_posts_delete_popup;