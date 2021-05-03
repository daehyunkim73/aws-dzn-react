import React, { useEffect, useState, createContext, useContext } from "react";
import Update_main_table from "./Component/Update_main_table";
import { UncertApi_ajax_get, Server_ajax_get } from "../../../server_ajax";
import ajax3rdCustom from "../../../lib/ajax-3rd-custom";

const Update_list = () => {
  const [mainList, setMainList] = useState();  
  const [loading, setLoading] = useState(false);
  const [update_page_nation, setUpdate_page_nation] = useState(1);

  
   useEffect(() => {
     // 로컬로 작업 할 떄
  //   const url = "support/update_main_list";   
    
  //   const aa = async () => {
  //     const dd = await Server_ajax_get(url);
  //     setMainList(dd);
  //     setLoading(true);
  //   }
  //   aa();
  // 서버에 배포된 경우
    const url = "/developer/support/update_main_list";
    ajax3rdCustom.getUncertToken(url, "get", async (signature) => {
      const mainList = await UncertApi_ajax_get(url, signature);    
      setMainList(mainList);    
      setLoading(true);
    });
  }, []);

  return (
    <React.Fragment>
      <div className="page_title_wrap">
        <p className="page_title">최신 업데이트</p>
        <div className="page_title_btn">
          <p>Home</p>
          <img
            className="caption_img"
            src="../image/Center/Dashboard/view_more.png"
          />
          <p>지원</p>
          <img
            className="caption_img"
            src="../image/Center/Dashboard/view_more.png"
          />
          <p>최신 업데이트</p>
        </div>
      </div>      
      {loading && <Update_main_table mainList={mainList} />}        
     
    </React.Fragment>
  );
};
export default Update_list;
