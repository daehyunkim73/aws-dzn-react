import React, { useCallback, useEffect, useState } from "react";

// 이미지 import
import close_btn from "../../image/Center/Close_btn/close_btn.png";
import alarm_company from "../../image/Center/Alarm/alarm_company.png";
import { Server_ajax_post } from "../../server_ajax";

const Center_Alarm_table = ({data, cookies, isAllView, setCnt, setNoReadCnt}) => {    
  const [isView, setIsView] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [read, setRead] = useState('alarm_content');

  useEffect(() => {    
    let readStyle = '';
    
    if(isView) readStyle = 'alarm_content read_alarm_content';
    else if(isAllView) readStyle = 'alarm_content read_alarm_content'
    else readStyle = data.is_view === 'N' ? 'alarm_content' : 'alarm_content read_alarm_content';

    setRead(() => readStyle);       
  }, [isView, isAllView])

  // 내용 클릭시 읽음 처리 이벤트
  const readClick = useCallback(async() => {
    try {
      const alamIdx = data.alam_idx;
      const alamView = data.is_view;
      
      if(alamIdx !== '' && alamView === 'N' && isAllView !== 'Y') {
        const mbrId = cookies.h_portal_id;        
        const param = { id: mbrId, alam_idx: alamIdx };
        const url = `Main/update_alam_view`;
        const result = await Server_ajax_post(url, param);
        
        if(result.affectedRows >= 0 && result.warningCount === 0){          
          setIsView(true);
          data.is_view = 'Y';          
          setNoReadCnt((cnt) => cnt-1);          
        }else{
          throw new Error('읽음 처리에 실패하였습니다.')
        }
      }
    } catch(e) {
      console.error(e);
    }
  }, [cookies, Server_ajax_post, setNoReadCnt, setIsView, isAllView]);

  // 삭제버튼 클릭 시 이벤트
  const deleteClick = useCallback(async() => {
    try {
      const alamIdx = data.alam_idx;      
      
      const mbrId = cookies.h_portal_id;        
      const param = { id: mbrId, alam_idx: alamIdx };
      const url = `Main/delete_alam_list`;
      console.log('url',url);
      const result = await Server_ajax_post(url, param);
      console.log('result', result);
      if(result.affectedRows >= 0 && result.warningCount === 0){          
        setIsDelete(true);
        setCnt((cnt) => cnt-1);        
      }else{
        throw new Error('읽음 처리에 실패하였습니다.')
      }
      
    } catch(e) {
      console.error(e);
    }
  }, [cookies, Server_ajax_post, setNoReadCnt, setIsView]);
  

  return (   
    <React.Fragment>
      {!isDelete &&
      <div className={read} onClick={readClick}>
        <div className="alarm_content_img clearfix">
          <div>
            <img src={alarm_company} alt="company" />
          </div>
        </div>
        <div className="alarm_text">
          <div className="alarm_content_title">
            <p className="alarm_content_title_cut">
              관리자
            </p>
            <p>{data.reg_date}</p>
          </div>
          <div className="alarm_content_text">
            <span>{data.alam_main_content}</span>
            {data.alam_sub_content}
          </div>                  
        </div>
        <div className="alarm_close_btn_wrap" onClick={deleteClick}>
          <img src={close_btn} alt="close_btn" />
        </div>
      </div>
    }
    </React.Fragment> 
  );
};

export default Center_Alarm_table;
