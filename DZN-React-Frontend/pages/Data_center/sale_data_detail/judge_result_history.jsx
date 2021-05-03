import React, { useEffect, useCallback, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Data_Approved_result_popup from '../../popup/Middle/Data_Approved_result_popup';
import { Link } from "react-router-dom";

const judge_result_history = ({resultData}) => {    
    const [adminResMemo, setAdminResMemo] = useState('');
    
    const Result_popup_Click = useCallback((e) => {     
        const Data_Approved_result_popup = document.getElementById("Data_Approved_result_popup_v2");
        for(let i=0; i<resultData.length; i++){            
            if(Number(resultData[i].data_apprvlreq_idx) ===  Number(e.target.parentNode.parentNode.id)){                
                setAdminResMemo(resultData[i].admin_memo);                
                Data_Approved_result_popup.style.display="table";
            }
        }
    }, [resultData])
    
    return (
        <React.Fragment>            
            <Data_Approved_result_popup approval_review={[{memo: adminResMemo}]} />
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
                    {resultData.map(data => (
                    <tr id={data.data_apprvlreq_idx} key={data.data_apprvlreq_idx}>                        
                        <td>{moment(data.apprvlreq_dt).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>{data.apprvlres_dt === null ? '' : moment(data.apprvlres_dt).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>{data.admin_memo}</td>
                        <td>{data.apprvl_state === '2' ? '승인대기' : data.apprvl_state === '3' ? '승인' : '반려'}
                        {data.apprvl_state === '4' ? <p onClick={Result_popup_Click} style={{cursor:"pointer"}}>결과보기</p> : null }
                        </td>
                    </tr>
                    ))}
                </tbody>
          </Table>

          <div className="judge_table_bottom_btn judge_table_btn">
          <Link to="/datacenter/saledata">
            <button>목록</button>
          </Link>
        </div>
        </React.Fragment>
      );
}

export default judge_result_history;