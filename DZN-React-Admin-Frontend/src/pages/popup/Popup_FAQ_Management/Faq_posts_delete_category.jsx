import React, { useCallback, useState } from 'react';
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Server_ajax_post } from '../../../../Server_ajax';

const Faq_posts_delete_popup = (props) => {
    const {input} = props;

    const history = useHistory();

    const Image_close_popup = useCallback(() => {
        const Admin_user_faq_delete_category_bgk = document.getElementById("Admin_user_faq_delete_category_bgk");
        Admin_user_faq_delete_category_bgk.style.display = "none";
    }, []);

    const delete_popup = useCallback(async() => {
        let body = {
            faq_cate_name: input
        }
        const getSalesDataInfo = await Server_ajax_post(`contents_management/delete_category`, body);

        history.push('/admin/faq');
        console.log('deleted OK');

        Image_close_popup();
      }, []);

    return (
        <React.Fragment>
            <div className="admin_background_same_box" id="Admin_user_faq_delete_category_bgk">
                <div className="admin_pixed_popup_white_box">
                    <div className="admin_small_white_box">
                        <div className="admin_popup_head_line_box">
                            <h1>게시물 삭5제</h1>
                            <div className="admin_popupClose_box">
                                <img onClick={Image_close_popup}
                                     src={close_btn} alt="" />
                            </div>
                        </div>

                        <div className="admin_big_contents_box">
                            <div className="admin_popup_Contents_box" id="admin_popup_sp_text_box">
                                <p>카테고리를 삭제하시겠습니까?</p>
                            </div>

                            <div className="admin_popup_button_box">
                            <button className="admin_popup_first_btn" onClick={Image_close_popup}>취소</button>
                                <button className="admin_popup_second_btn" id="faq_posts_delete_ok_btn" onClick={delete_popup}>확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Faq_posts_delete_popup;