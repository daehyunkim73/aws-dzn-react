import React, { useCallback, useEffect } from 'react';
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';
import moment from 'moment';
import { Server_ajax_post } from '../../../../Server_ajax';
import { useCookies } from 'react-cookie';

const Faq_posts_posts_uploade_popup = (props) => {
    const {
        category,
        title,
        content,
        history
    } = props
    const [cookies, setCookie, removeCookie] = useCookies();  

    const Image_close_popup = useCallback(() => {
        const Admin_user_faq_post_popup_bgk = document.getElementById("Admin_user_faq_post_popup_bgk");
        Admin_user_faq_post_popup_bgk.style.display = "none";
        
        history.push('/admin/faq');
    }, []);

    const Image_ok_popup = () => {
        (async () => {
            try {
                let body = {
                    faq_title: title,
                    faq_category: category,
                    faq_content: content,
                    faq_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    faq_writer: cookies.h_portal_id,
                    faq_data_imfl: null
                }
                
                await Server_ajax_post(`contents_management/faq_writing_save`, body);
                Image_close_popup();
              history.push('/admin/faq');
            } catch (e) {
              return console.error(e);
            }
          })();
        
    }

    return (
        <React.Fragment>
            <div className="admin_background_same_box" id="Admin_user_faq_post_popup_bgk">
                <div className="admin_pixed_popup_white_box">
                    <div className="admin_small_white_box">
                        <div className="admin_popup_head_line_box">
                            <h1>게시물 등록</h1>
                            <div className="admin_popupClose_box">
                                <img onClick={Image_close_popup} 
                                src={close_btn} alt="" />
                            </div>
                        </div>

                        <div className="admin_big_contents_box">
                            <div className="admin_popup_Contents_box" id="admin_popup_sp_text_box">
                                <p>게시물을 등록을 확정하시겠습니까?</p>
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

export default Faq_posts_posts_uploade_popup;