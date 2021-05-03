import React from 'react';
import { Link } from "react-router-dom";


const Notice_list = (props) => {
  const { table_lists_froum } = props;
    return (
      <React.Fragment>
        <tr>
          <td>
            <div className="checkbox_wrap" id="sp_table_none_head">
              <input type="checkbox" id="Notice_table_two" />
                <input
                  type="checkbox"
                  className="using_svc_checkbox_state"
                  id={table_lists_froum.faq_idx}
                  name="apiReaquestStepTwo"
                />
                <label
                  className="checkbox_design"
                  htmlFor={table_lists_froum.faq_idx}
                ></label>
            </div>
          </td>
            <td>{table_lists_froum.faq_type_code}</td>
          <td>
            <Link className="link_style_text" to={`/admin/faq/detail/${table_lists_froum.faq_idx}`}>
              <span className="admin_sp_text">[{table_lists_froum.faq_type_code}] </span>
              {table_lists_froum.faq_title}
            </Link>
          </td>
          <td>{table_lists_froum.adm_id}</td>
          <td>{table_lists_froum.faq_vw_cnt}</td>
            <td>{table_lists_froum.regDt}</td>
          <td>
            <Link className="link_style_text" to={`/admin/faq/modify/${table_lists_froum.faq_idx}`}>
              <div className="modify_btn_box">
                <button>수정</button>
              </div>
            </Link>
          </td>
        </tr>
      </React.Fragment>
    )
}

export default Notice_list;