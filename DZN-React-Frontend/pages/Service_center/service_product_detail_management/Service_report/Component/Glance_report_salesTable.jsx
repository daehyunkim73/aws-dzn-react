import React from 'react';
import { Table } from 'react-bootstrap';

const Glance_report_salesTable = () => {
    return (
        <React.Fragment>
            <Table striped bordered hover className="sales_report_table_report_v2" >
                <thead>
                    <tr className="report_date_box">
                        <th>월</th>
                        <th>서비스 판매건수</th>
                        <th>서비스 호출건수</th>
                        <th>매출금액 (원)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>합계</td>
                        <td>1,500</td>
                        <td>100,000,000</td>
                        <td>100,000,000</td>
                    </tr>
                    <tr>
                        <td>01월</td>
                        <td>400</td>
                        <td>60,000</td>
                        <td>60,000</td>
                    </tr>
                    <tr>
                        <td>02월</td>
                        <td>400</td>
                        <td>60,000</td>
                        <td>60,000</td>
                    </tr>
                    <tr>
                        <td>03월</td>
                        <td>400</td>
                        <td>60,000</td>
                        <td>60,000</td>
                    </tr>
                    <tr>
                        <td>04월</td>
                        <td>400</td>
                        <td>60,000</td>
                        <td>60,000</td>
                    </tr>
                    <tr>
                        <td>05월</td>
                        <td>400</td>
                        <td>60,000</td>
                        <td>60,000</td>
                    </tr>
                    <tr>
                        <td>06월</td>
                        <td>400</td>
                        <td>60,000</td>
                        <td>60,000</td>
                    </tr>
                    <tr>
                        <td>07월</td>
                        <td>400</td>
                        <td>60,000</td>
                        <td>60,000</td>
                    </tr>
                    <tr>
                        <td>08월</td>
                        <td>400</td>
                        <td>60,000</td>
                        <td>60,000</td>
                    </tr>
                    <tr>
                        <td>09월</td>
                        <td>400</td>
                        <td>60,000</td>
                        <td>60,000</td>
                    </tr>
                    <tr>
                        <td>10월</td>
                        <td>400</td>
                        <td>60,000</td>
                        <td>60,000</td>
                    </tr>
                    <tr>
                        <td>11월</td>
                        <td>400</td>
                        <td>60,000</td>
                        <td>60,000</td>
                    </tr>
                    <tr>
                        <td>12월</td>
                        <td>400</td>
                        <td>60,000</td>
                        <td>60,000</td>
                    </tr>
                </tbody>
            </Table>
        </React.Fragment>
    )
}

export default Glance_report_salesTable;