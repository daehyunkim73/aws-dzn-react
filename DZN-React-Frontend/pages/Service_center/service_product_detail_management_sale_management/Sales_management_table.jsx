import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Table_Middle from '../../../src/Table_middle'

const dumy_sale_dummy_data = {
  sale_posts: [{
    user_By_name: '홍길동',
    user_Plan: '200,000회 / 일',
    user_Payment_date: '2020-01-29 13:48',
    user_Total_payment_amount: '200,000원',
    Method_of_payment: {
      card_plan: 15000,
      point: 5000,
    }
  },
  {
    user_By_name: '세종대왕',
    user_Plan: '300,000회 / 일',
    user_Payment_date: '2020-01-29 13:48',
    user_Total_payment_amount: '300,000원',
    Method_of_payment: {
      card_plan: 15000,
      point: 5000,
    }
  }]
}

const Sales_management_table = () => {
  useEffect(() => {
    Table_Middle();
    return () => {
      Table_Middle();
    }
  }, []);

  return (
    <React.Fragment>
      <div className="Sales_managment_talbe_box">
        <Table responsive>
          <caption className="tb_caption">
            <div className="caption_title bold_none">[총 <p className="number_data">00</p>건 ] 검색결과 <p className="number_data">00</p>건</div>
            <div className="tb_select_wrap">
              <Form.Control as="select" className="table_select tb_select">
                <option>최근 결제 순</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
              <Form.Control as="select" className="list_select tb_select">
                <option>목록 20</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </div>
          </caption>
          <thead>
            <tr>
              <th>구매자</th>
              <th>요금제</th>
              <th>결제일</th>
              <th>총 결제금액(원)</th>
              <th colSpan="2">
                <p>결제수단</p>
                <div className="th_double_wrap">
                  <p>카드(원)</p>
                  <p>포인트</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              dumy_sale_dummy_data.sale_posts.map((v) => {
                return (
                  <tr>
                    <td>{v.user_By_name}</td>
                    <td>{v.user_Plan}</td>
                    <td>{v.user_Payment_date}</td>
                    <td>{v.user_Total_payment_amount}</td>
                    <td>{v.Method_of_payment.card_plan}</td>
                    <td>{v.Method_of_payment.point}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
}

export default Sales_management_table;
