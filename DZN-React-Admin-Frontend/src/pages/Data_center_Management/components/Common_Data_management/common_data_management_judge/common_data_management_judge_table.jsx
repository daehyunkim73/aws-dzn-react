import React, { useEffect, useState, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import Table_middle from '../../../../../../func_src/Table_middle';
import { Server_ajax_post } from '../../../../../../Server_ajax';
import Approved_req_contents_popup from "../../../../popup/Popup_datacenter_Management/Approved_req_contents_popup2";
import Approved_result_contents_popup from '../../../../popup/Popup_datacenter_Management/Approved_result_popup_admin2';

const Data_Approved_management_judge_table = ({pdbaseIdx, rending}) => {
  const [apprvlData, setApprvlData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectApprvlData, setSelectApprvlData] = useState([]);

  const Result_popup_Click = useCallback((e) => {     
    const Data_Approved_result_popup = document.getElementById("Admin_user_datacenter_approved_result_popup_bgk");
    apprvlData.map((data) => {
      if(data.data_apprvlreq_idx ===  Number(e.target.parentNode.parentNode.id)){            
        Data_Approved_result_popup.style.display="table";
        setSelectApprvlData(data);        
      }
    });    
}, [apprvlData])

const Request_popup_Click = useCallback((e) => {     
  const Data_Approved_result_popup = document.getElementById("Admin_user_datacenter_approved_popup_bgk");
  apprvlData.map((data) => {
    if(data.data_apprvlreq_idx ===  Number(e.target.parentNode.parentNode.id)){            
      Data_Approved_result_popup.style.display="table";
      setSelectApprvlData(data);      
    }
  });    
}, [apprvlData])

  useEffect(() => {
    const getData = async () => {
      try {
        const datas = {pdbaseIdx};
        const getApprovedData = await Server_ajax_post(`data_center_managment/getApprovedData`, {datas});        
        setApprvlData(getApprovedData);
        setLoading(true);
      } catch (e) {
          return console.error(e);
      }
    }
    getData();
  }, [rending===true]);
  
  useEffect(() => {
    Table_middle();    
    return () => {
      Table_middle();      
    }
  }, [loading]);  

  return (
    <React.Fragment>
      {loading && <Approved_req_contents_popup reqInfo={selectApprvlData} /> }
      {loading && <Approved_result_contents_popup returnInfo={selectApprvlData} />}
      <Table responsive id="approved_judge_table">
        <caption className="tb_caption">
          <div className="judge_table_title">?????????????????? ??????</div>
        </caption>
        <thead>
          <tr>
            <th>???????????????</th>
            <th>???????????????</th>
            <th>??????</th>
            <th>????????????</th>
            <th>?????? ?????????</th>
          </tr>
        </thead>
        <tbody>
        {loading && apprvlData.map((data, index) =>           
          <tr key={index} id={data.data_apprvlreq_idx}>
            <td>{data.apprvlreq_dt}</td>
            <td>{data.apprvlres_dt}</td>
            <td className="table_title">{data.memo} <p onClick={Request_popup_Click} style={{ cursor: "pointer", textAlign: "center" }}>????????????</p></td>
            <td className="result_apprvoed_btn">{data.apprvl_state === "2" ? '?????????' : data.apprvl_state === "3" ? "??????" : "??????"}
              {data.apprvl_state === "4" && <p onClick={Result_popup_Click} style={{ cursor: "pointer" }}>????????????</p>}
            </td>
            <td>{data.mbr_name}</td>
          </tr>
        )} 
        </tbody>
      </Table>
    </React.Fragment>
  );
}

export default Data_Approved_management_judge_table;


