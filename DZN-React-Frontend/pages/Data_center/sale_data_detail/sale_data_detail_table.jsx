import React, { useEffect, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import Data_Approved_result_popup from '../../popup/Middle/Data_Approved_result_popup';

function table_middle() {
  const td = document.querySelectorAll('table td');
  for (let i = 0; i < td.length; i++) {
    td[i].classList.add('align-middle');
  }
  return td;
}

const Profile_Table = () => {

  useEffect(() => {
    table_middle();
    return () => {
      table_middle();
    }
  }, []);

  const Result_popup_Click = useCallback(() => {
      const Data_Approved_result_popup = document.getElementById("Data_Approved_result_popup");
      Data_Approved_result_popup.style.display="table";
  }, [])

  return (
    <React.Fragment>
      <Data_Approved_result_popup />
      <Table responsive>
        <caption className="tb_caption">
          <div className="judge_table_title">승인심사결과이력</div>
        </caption>
        <thead>
          <tr>
            <th>승인요청일</th>
            <th>승인완료일</th>
            <th>사유</th>
            <th>심사결과</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2020-01-13 00:00:30</td>
            <td>2020-03-30 12:00:30</td>
            <td>신규 판매</td>
            <td>반려<p onClick={Result_popup_Click} style={{cursor:"pointer"}}>결과보기</p></td>
          </tr>
          <tr>
            <td>2020-01-13 00:00:30</td>
            <td>2020-03-30 12:00:30</td>
            <td>재승인 요청</td>
            <td>반려<p style={{cursor:"pointer"}}>결과보기</p></td>
          </tr>
          <tr>
            <td>2020-01-13 00:00:30</td>
            <td>2020-03-30 12:00:30</td>
            <td>가격정보 수정</td>
            <td>승인</td>
          </tr>
          <tr>
            <td>2020-01-13 00:00:30</td>
            <td>2020-03-30 12:00:30</td>
            <td>데이터 수정</td>
            <td>승인</td>
          </tr>

        </tbody>
      </Table>
    </React.Fragment>
  );
}

export default Profile_Table;
