import React from 'react';
import { useEffect } from 'react';
import Table_Middle from '../../../../src/Table_middle';

const Sales_table = ({ sales_table_contents }) => {
    useEffect(() => {
        Table_Middle();
    }, []);
    
    return (
        <React.Fragment>
            <tr>
                <td>{sales_table_contents.id}</td>
                <td>{sales_table_contents.user_By_name}</td>
                <td>{sales_table_contents.user_Plan}</td>
                <td>{sales_table_contents.user_Payment_date}</td>
                <td>{sales_table_contents.user_Total_payment_amount}</td> 
                <td>{sales_table_contents.Method_of_payment.card_plan}</td>
                <td>{sales_table_contents.Method_of_payment.point}</td>
            </tr>
        </React.Fragment>
    )
}

export default Sales_table;