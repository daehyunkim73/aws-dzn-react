import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Table_middle from '../../../../../func_src/Table_middle';

const Date_sale_Table = () => {
    useEffect(() => {
        Table_middle();
        return () => {
            Table_middle();
        }
    }, []);

    return (
        <React.Fragment>
            <div className="backoffice_table_wrap calculate_table_wrap">
                <Table responsive>
                    <caption className="tb_caption">
                        <p className="caption_title bold_none">[총 <span className="number_data">00</span>건 ]</p>
                    </caption>
                    <thead>
                        <tr>
                            <th>판매유형(수)</th>
                            <th>총 결제금액(원)</th>
                            <th colSpan='2'>
                                <p>결제수단</p>
                                <div className='th_double_wrap'>
                                    <p>카드(원)</p>
                                    <p>포인트</p>
                                </div>
                            </th>
                            <th>수수료</th>
                            <th>정산금액</th>
                            <th>정산기간</th>
                            <th>정산일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>서비스(5)</td>
                            <td>200,000</td>
                            <td>15,000</td>
                            <td>5,000</td>
                            <td>20,000</td>
                            <td>150,000</td>
                            <td>2020-03-01 ~ 2020-03-31</td>
                            <td>2020-04-29 15:39:05</td>
                        </tr>
                        <tr>
                            <td>데이터(2)</td>
                            <td>10,000,000</td>
                            <td>9,000,000</td>
                            <td>1,000,000</td>
                            <td>20,000</td>
                            <td>150,000</td>
                            <td>2020-03-01 ~ 2020-03-31</td>
                            <td>2020-04-29 15:39:05</td>
                        </tr>
                        <tr>
                            <td>서비스(2)</td>
                            <td>200,000</td>
                            <td>15,000</td>
                            <td>5,000</td>
                            <td>20,000</td>
                            <td>150,000</td>
                            <td>2020-03-01 ~ 2020-03-31</td>
                            <td>2020-04-29 15:39:05</td>
                        </tr>
                        <tr>
                            <td>데이터(1)</td>
                            <td>100,000,000</td>
                            <td>90,000,000</td>
                            <td>10,000,000</td>
                            <td>20,000</td>
                            <td>150,000</td>
                            <td>2020-03-01 ~ 2020-03-31</td>
                            <td>2020-04-29 15:39:05</td>
                        </tr>
                        <tr>
                            <td>서비스(5)</td>
                            <td>200,000</td>
                            <td>15,000</td>
                            <td>5,000</td>
                            <td>20,000</td>
                            <td>150,000</td>
                            <td>2020-03-01 ~ 2020-03-31</td>
                            <td>2020-04-29 15:39:05</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </React.Fragment>
    );
}

export default Date_sale_Table;
