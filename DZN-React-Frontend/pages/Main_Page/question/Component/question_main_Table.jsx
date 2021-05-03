import React, { useState, createContext, useContext } from 'react';

const Faq_main_table = (props) => {
    const { table_lists_froum } = props;
   
    return (
        <React.Fragment>
            <div className="faq_table_content_wrap">
                <p className="faq_table_title">[{table_lists_froum.faq_type_code}]</p>
                <p>{table_lists_froum.faq_title}</p>
                <p className="faq_time">{table_lists_froum.regDt}</p>
            </div>
        </React.Fragment>
    )
}

export default Faq_main_table;