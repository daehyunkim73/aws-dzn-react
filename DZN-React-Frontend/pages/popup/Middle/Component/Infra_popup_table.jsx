import React from 'react';

const Infra_popup_table = (props) => {
    return (
        <React.Fragment>
            <tr>
                <td className="bank_table_text">
                    서비스 명</td>
                <td>{props.popup_table_control.infra_name}</td>
            </tr>
            <tr>
                <td className="bank_table_text" id="sp_double_number">
                    CPU</td>
                <td>{props.popup_table_control.cpu}</td>
            </tr>
            <tr>
                <td className="bank_table_text">
                    MEMORY</td>
                <td>{props.popup_table_control.mmory}</td>
            </tr>
        </React.Fragment>
    )
}

export default Infra_popup_table;