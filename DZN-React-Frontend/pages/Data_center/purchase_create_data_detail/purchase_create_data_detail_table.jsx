import React, { useEffect, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import Approved_result_popup from '../../popup/Middle/Data_Approved_result_popup';
import Data_Approved_atuide_popup from '../../popup/Small_popup/Data_Approved_atuide_popup';
import Table_middle from '../../../src/Table_middle';

const purchase_create_data_detail_table = () => {
  useEffect(() => {
    Table_middle();
    return () => {
      Table_middle();
    }
  }, []);

  const Reapproval_popup_Click = useCallback(() => {
    const Data_Approved_result_popup = document.getElementById("Data_Approved_result_popup");
    Data_Approved_result_popup.style.display = "table";
  }, []);

  return (
    <React.Fragment>
      <Data_Approved_atuide_popup />
      <Approved_result_popup /> {/* 결과보기 화면 클릭시 팝업 */}
      <Table responsive>
        <caption className="tb_caption">
          <div className="judge_table_title">승인심사요청</div>
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
            <td>2020-01-13 00:00:30</td>
            <td>신규 판매</td>
            <td>반려<p onClick={Reapproval_popup_Click}
              style={{ cursor: "pointer" }}>결과보기</p></td>
          </tr>
          <tr>
            <td>2020-01-13 00:00:30</td>
            <td>2020-01-13 00:00:30</td>
            <td>재승인 요청</td>
            <td>반려<p onClick={Reapproval_popup_Click}
              style={{ cursor: "pointer" }}>결과보기</p></td>
          </tr>
          <tr>
            <td>2020-01-13 00:00:30</td>
            <td>2020-01-13 00:00:30</td>
            <td>데이터 수정</td>
            <td>승인</td>
          </tr>

        </tbody>
      </Table>
    </React.Fragment>
  );
}

export default purchase_create_data_detail_table;
