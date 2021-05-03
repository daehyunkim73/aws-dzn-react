import React, { useState, createContext, useContext } from 'react';
import { Link, Route, Switch } from "react-router-dom";


const Notice_list = (props) => {
  const { table_lists_froum } = props;

   
    return (
      <React.Fragment>
        <tr>
          <td>
            <div className="checkbox_wrap" id="sp_table_none_head">
              {/* <input type="checkbox" id="Notice_table_two" /> */}
              <input
                  type="checkbox"
                  className="using_svc_checkbox_state"
                  id={table_lists_froum.ntc_idx}
                  name="apiReaquestStepTwo"
                />
                <label
                  className="checkbox_design"
                  htmlFor={table_lists_froum.ntc_idx}
                ></label>
            </div>
          </td>
            <td>{table_lists_froum.regDt}</td>
          <td>
            <Link className="link_style_text" to={`/admin/notice/content/${table_lists_froum.ntc_idx}`}>
              <span className="admin_sp_text">[{table_lists_froum.ntc_type}] </span>
              {table_lists_froum.ntc_title}
            </Link>
          </td>
          <td>{table_lists_froum.adm_id}</td>
          <td>{table_lists_froum.ntc_vw_cnt}</td>
          <td>
            <Link className="link_style_text" to={`/admin/notice/modify/${table_lists_froum.ntc_idx}`}>
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