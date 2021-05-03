import React, { useState, useEffect, useCallback, useRef } from "react";
import Detail_gaci_header from "./Component/Detail_gaci_header";
import { Server_ajax_get } from "../../../server_ajax";

const Question_main_Page = ({ match }) => {
  const [gaci_user_info, setGaci_user_info] = useState();  

  useState(() => {
    window.scrollTo(0, 0);
  });  

  useEffect(() => {    
    (async () => {
      try{
        const idx = match.params.qst_idx        
        const url = `support/question/content/list?qst_idx=${idx}`;
        const result = await Server_ajax_get(url);
        
        setGaci_user_info(result);
        
      }catch(e) {
        console.error(e);
      }
    })();    
  }, []);

  return (
    <React.Fragment>
      {gaci_user_info &&
        gaci_user_info.map((Gaci_main_con) => {
          return (
            <Detail_gaci_header
              detail_gaci_info={Gaci_main_con}
              search_file_id={match}
              key={Gaci_main_con.qst_idx}
            />
          );
        })}
    </React.Fragment>
  );
};

export default Question_main_Page;
