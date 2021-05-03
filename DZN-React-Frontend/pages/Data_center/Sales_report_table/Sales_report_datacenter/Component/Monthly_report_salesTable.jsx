import React from 'react';
import { Table } from 'react-bootstrap'; 


const Monthly_report_salesTable = () => {
    return (
        <React.Fragment>
            <Table striped bordered hover className="sales_report_table_report_v2" >
                <thead>
                    <tr className="report_date_box">
                        <th></th>
                        <th>일</th>
                        <th>월</th>
                        <th>화</th>
                        <th>수</th>
                        <th>목</th>
                        <th>금</th>
                        <th>토</th>
                        <th>합계</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bgk_date">
                        <td>날짜</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>데이터 판매건수</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>2</td>
                        <td>10</td>
                        <td>0</td>
                        <td>6</td>
                        <td>18</td>
                    </tr>
                    <tr className="bgk_not_date">
                        <td>데이터 호출건수</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>200,000</td>
                        <td>500,000</td>
                        <td>20,000</td>
                        <td>50,000</td>
                        <td>320,000</td>
                    </tr>
                    <tr className="sales_td_table">
                        <td>매출 (원)</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>1,000</td>
                        <td>50,000</td>
                        <td>2,000</td>
                        <td>200</td>
                        <td>53,200</td>
                    </tr>

                    <tr className="bgk_date">
                        <td>날짜</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
                        <td>10</td>
                        <td>11</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>데이터 판매건수</td>
                        <td>2</td>
                        <td>10</td>
                        <td>0</td>
                        <td>6</td>
                        <td>20</td>
                        <td>11</td>
                        <td>10</td>
                        <td>38</td>
                    </tr>
                    <tr className="bgk_not_date">
                        <td>데이터 호출건수</td>
                        <td>200,000</td>
                        <td>500,000</td>
                        <td>20,000</td>
                        <td>50,000</td>
                        <td>0</td>
                        <td>300,000</td>
                        <td>20,000</td>
                        <td>1,090,000</td>
                    </tr>
                    <tr className="sales_td_table">
                        <td>매출 (원)</td>
                        <td>1,000</td>
                        <td>50,000</td>
                        <td>2,000</td>
                        <td>200</td>
                        <td>10,000</td>
                        <td>500,000</td>
                        <td>20,000</td>
                        <td>573,000</td>
                    </tr>

                    <tr className="bgk_date">
                        <td>날짜</td>
                        <td>12</td>
                        <td>13</td>
                        <td>14</td>
                        <td>15</td>
                        <td>16</td>
                        <td>17</td>
                        <td>18</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>데이터 판매건수</td>
                        <td>2</td>
                        <td>10</td>
                        <td>0</td>
                        <td>6</td>
                        <td>20</td>
                        <td>11</td>
                        <td>10</td>
                        <td>38</td>
                    </tr>
                    <tr className="bgk_not_date">
                        <td>데이터 호출건수</td>
                        <td>200,000</td>
                        <td>500,000</td>
                        <td>20,000</td>
                        <td>50,000</td>
                        <td>0</td>
                        <td>300,000</td>
                        <td>20,000</td>
                        <td>1,090,000</td>
                    </tr>
                    <tr className="sales_td_table"> 
                        <td>매출 (원)</td>
                        <td>1,000</td>
                        <td>50,000</td>
                        <td>2,000</td>
                        <td>200</td>
                        <td>10,000</td>
                        <td>500,000</td>
                        <td>20,000</td>
                        <td>573,000</td>
                    </tr>

                    <tr className="bgk_date">
                        <td>날짜</td>
                        <td>19</td>
                        <td>20</td>
                        <td>21</td>
                        <td>22</td>
                        <td>23</td>
                        <td>24</td>
                        <td>25</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>데이터 판매건수</td>
                        <td>2</td>
                        <td>10</td>
                        <td>0</td>
                        <td>6</td>
                        <td>20</td>
                        <td>11</td>
                        <td>10</td>
                        <td>38</td>
                    </tr>
                    <tr className="bgk_not_date">
                        <td>데이터 호출건수</td>
                        <td>200,000</td>
                        <td>500,000</td>
                        <td>20,000</td>
                        <td>50,000</td>
                        <td>0</td>
                        <td>300,000</td>
                        <td>20,000</td>
                        <td>1,090,000</td>
                    </tr>
                    <tr className="sales_td_table">
                        <td>매출 (원)</td>
                        <td>1,000</td>
                        <td>50,000</td>
                        <td>2,000</td>
                        <td>200</td>
                        <td>10,000</td>
                        <td>500,000</td>
                        <td>20,000</td>
                        <td>573,000</td>
                    </tr>
                    <tr className="bgk_date">
                        <td>날짜</td>
                        <td>26</td>
                        <td>27</td>
                        <td>28</td>
                        <td>29</td>
                        <td>30</td>
                        <td>31</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>데이터 판매건수</td>
                        <td>2</td>
                        <td>10</td>
                        <td>0</td>
                        <td>6</td>
                        <td>20</td>
                        <td>11</td>
                        <td>10</td>
                        <td>38</td>
                    </tr>
                    <tr className="bgk_not_date">
                        <td>데이터 호출건수</td>
                        <td>200,000</td>
                        <td>500,000</td>
                        <td>20,000</td>
                        <td>50,000</td>
                        <td>0</td>
                        <td>300,000</td>
                        <td>20,000</td>
                        <td>1,090,000</td>
                    </tr>
                    <tr className="sales_td_table">
                        <td>매출 (원)</td>
                        <td>1,000</td>
                        <td>50,000</td>
                        <td>2,000</td>
                        <td>200</td>
                        <td>10,000</td>
                        <td>500,000</td>
                        <td>20,000</td>
                        <td>573,000</td>
                    </tr>
                </tbody>
            </Table>
        </React.Fragment>
    )
}

export default Monthly_report_salesTable;