import React, { useCallback } from 'react';
import Faq_posts_delete_category from "./Faq_posts_delete_category";


const Category_list = (props) => {
    const { table_lists_froum, index, category_length, add_row_true, setAdd_row_true } = props;

    const Image_delete_popup = useCallback(() => {
        const Admin_user_faq_delete_popup_bgk = document.getElementById("Admin_user_faq_delete_popup_bgk");
        Admin_user_faq_delete_popup_bgk.style.display = "table";
        Admin_user_faq_delete_popup_bgk.style.zIndex = "9999";
    }, []);

    const add_row_true_button = useCallback(() => {
        setAdd_row_true(true);
    }, []);

    return (
        <React.Fragment>
            <Faq_posts_delete_category input={table_lists_froum.sub_cate_name}/>
                <div className="category_input_box">
            <input type="text" placeholder={table_lists_froum.sub_cate_name} />
                <div className="category_button_box">
                    {
                        category_length === index && add_row_true === false?
                            <button onClick={add_row_true_button}>행 추가</button>
                            :
                            ''
                    }
                    <button onClick={Image_delete_popup}>삭제</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Category_list;