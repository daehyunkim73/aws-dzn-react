import React, { useCallback, useEffect, useState } from "react";
import moment from 'moment';

// 이미지 import
import top_arrow from "../../image/Center/Alarm/top_arrow.png";
import company from "../../image/Center/Alarm/company.png";
import close_btn from "../../image/Center/Close_btn/close_btn.png";
import Ico_nodata from '../../image/Center/Alarm/ico_nodata.png';
import { Server_ajax_post } from "../../server_ajax";
import Center_Alarm_table from './Center_Alarm_table';

const Center_Alarm = ({alamList, setCnt, cookies}) => {  
  const [noReadCnt, setNoReadCnt] = useState(0);
  const [dateAlamList, setDateAlamList] = useState();
  const [loading, setLoading] = useState(false);
  const [isAllView, setIsAllRead] = useState(false);

  // 모두 읽음 버튼 이벤트
  const readAllClick = useCallback(async() => {
    try {
      const mbrId = cookies.h_portal_id;        
      const param = { id: mbrId, alam_idx: '' };
      const url = `Main/update_alam_view`;
      const result = await Server_ajax_post(url, param);

      if(result.affectedRows >= 0 && result.warningCount === 0){
        setIsAllRead('Y');
        setNoReadCnt(0);
      }else{
        throw new Error('모두 읽음 처리에 실패하였습니다.')
      }
    } catch(e) {
      console.error(e);
    }
  }, [cookies, Server_ajax_post]);
  
  // 모두 삭제 버튼 이벤트
  const deleteAllClick = useCallback(async() => {
    try{
      const mbrId = cookies.h_portal_id;        
      const param = { id: mbrId, alam_idx: '' };
      const url = `Main/delete_alam_list`;
      const result = await Server_ajax_post(url, param);

      if(result.affectedRows >= 0 && result.warningCount === 0){
        setDateAlamList([]);
        setNoReadCnt(0);
        setCnt(0);
      }else{
        throw new Error('모두 삭제 처리에 실패하였습니다.')
      }
    }catch(e){
      console.error(e)
    }
  }, [])

  const renewalContent = useCallback((data) => {
    switch(data.alam_definition_code) {
      case "1":
        if(data.alam_content_code === '2') {
          data.alam_sub_content = `${data.etc}${data.alam_sub_content}`
        }
        break;
      case "2":        
      case "3":
        data.alam_sub_content = `${moment(data.reg_date).format('YYYY월 MM일')} ${data.alam_sub_content}`
        break;      
      case "5":
        const date = moment(data.etc).format('MM월 DD일');
        data.alam_sub_content = `${data.alam_sub_content} ${date} ${data.defEtc}`;
        break;
      case "6":
        data.alam_sub_content = `${data.etc} ${data.alam_sub_content}`;
        break;        
    }    
  }, [])
 
  useEffect(() => {    
    (async () => {      
      let cnt = 0;
      let dateList = [];  
      let dateObject = {};      
      let compDate = ''
      let date = ''

      await alamList.forEach((data) => {          
        date = moment(data.reg_date).format('YYYY년 MM일');
        if(data.is_view === "N"){
          cnt++;
          setNoReadCnt(cnt);
        }

        if(compDate !== date){
          dateList = [];
          compDate = date;
        }
        renewalContent(data);        
        
        dateList = [...dateList, data];        
        dateObject[moment(data.reg_date).format('YYYY년 MM일')] = dateList;                 
      })            
      setDateAlamList(dateObject);   
      setLoading(true); 
    })();
  }, [alamList.length > 0]);

  return (
    <div className="alarm_wrap">
      <img src={top_arrow} alt="" />
      <div className="clearfix">
        <div className="alarm_top_wrap">
          <div className="alarm_title">
            <img src={company} alt="company" />
            <p>데이터개발자센터</p>
          </div>
          <div className="alarm_number">
            <p>안읽은 알림</p>
            <span>{noReadCnt} </span>
          </div>
          <div className="alarm_btn">
            <button onClick={readAllClick}>모두읽음</button>
            <button onClick={deleteAllClick}>모두삭제</button>
          </div>
          <div className="alarm_close">
            <img src={close_btn} alt="close_btn" />
          </div>
        </div>
        <div className="alarm_bottom_wrap">
          {loading && Object.keys(dateAlamList).length !== 0 ? Object.keys(dateAlamList).map((sort, index) => {            
          return (            
          <div className="alarm_month_wrap" key={index}>
            <div className="alarm_month">
              <p>{sort}</p>
            </div>
            {dateAlamList[sort].map((data, idx) => 
              <Center_Alarm_table key={idx} data={data} isAllView={isAllView} cookies={cookies} setCnt={setCnt} setNoReadCnt={setNoReadCnt}/> 
            )}
          </div>
          )}
          ) 
          :          
          <div className="alarm_nodata">
            <div className="alarm_nodata_wrap">
                <img src={Ico_nodata} alt="ico_nodata"/>
                <p>데이터가 없습니다.</p>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Center_Alarm;
