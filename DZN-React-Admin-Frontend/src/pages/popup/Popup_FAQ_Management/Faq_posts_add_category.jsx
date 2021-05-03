import React, { useCallback, useState } from 'react';
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';
import axios from 'axios';

const Faq_posts_add_popup = (props) => {
    const { category, setCategoryClick } = props;
    console.log('category?',category.sub_cate_code);

    const Image_close_popup = useCallback(() => {
        const Admin_user_faq_add_popup_bgk = document.getElementById("Admin_user_faq_add_popup_bgk");
        Admin_user_faq_add_popup_bgk.style.display = "none";
    }, []);

    const ok_popup = useCallback(() => {

        let body = {
            faq_gbn_en: 'faq_gbn_cate',
            faq_gbn_kr: 'FAQ카테고리',
            cate_code: '111',
            cate_name: category.sub_cate_name
        }
        
        axios.post("http://localhost:7081/contents_management/delete_category")
        .then(() => {       
            axios.post("http://localhost:7081/contents_management/add_category",body)
            console.log(body);
        }).catch(e => {
            console.error(e);
        })
        Image_close_popup();
        
      const Admin_user_faq_category_popup_bgk = document.getElementById("Admin_user_faq_category_popup_bgk");
      Admin_user_faq_category_popup_bgk.style.display = "none";
      }, []);

    return (
        <React.Fragment>
            <div className="admin_background_same_box" id="Admin_user_faq_add_popup_bgk">
                <div className="admin_pixed_popup_white_box">
                    <div className="admin_small_white_box">
                        <div className="admin_popup_head_line_box">
                            <h1>카테고리 추가</h1>
                            <div className="admin_popupClose_box">
                                <img onClick={Image_close_popup}
                                     src={close_btn} alt="" />
                            </div>
                        </div>

                        <div className="admin_big_contents_box">
                            <div className="admin_popup_Contents_box" id="admin_popup_sp_text_box">
                                <p>카테고리를 추가하시겠습니까?</p>
                            </div>

                            <div className="admin_popup_button_box">
                            <button className="admin_popup_first_btn" onClick={Image_close_popup}>취소</button>
                                <button className="admin_popup_second_btn" id="faq_posts_delete_ok_btn" 
                                        onClick={ok_popup}>확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Faq_posts_add_popup;