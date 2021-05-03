import React, { useState, createContext, useContext } from 'react';

const UptGroup_main_table = (props) => {
    const { table_lists_froum } = props;
    const time = moment(table_lists_froum.regDt).format('YYYY-MM-DD HH:mm:ss');
    
    return (
        <React.Fragment>
            <div className="faq_table_content_wrap">
                <p className="faq_table_title">[{time}]</p>
                <p>{table_lists_froum.upt_title}</p>
            </div>
        </React.Fragment>
    )
}

export default UptGroup_main_table;