import React, { useState, createContext, useContext } from 'react';

const Notice_main_table = (props) => {
    const { table_lists_froum } = props;
   
    return (
        <React.Fragment>
            <div className="faq_table_content_wrap">
                <p className="faq_table_title">[{table_lists_froum.ntc_type}]</p>
                <p>{table_lists_froum.ntc_title}</p>
                <p className="notice_time">{table_lists_froum.regDtFormat}</p>
            </div>
        </React.Fragment>
    )
}

export default Notice_main_table;