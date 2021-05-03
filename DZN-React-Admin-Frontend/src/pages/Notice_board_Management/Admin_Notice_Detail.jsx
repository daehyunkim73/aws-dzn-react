import React, { useState, useEffect } from 'react';
import Detail_gaci_header from './components/Notice/Component/Detail_gaci_header';
import { Server_ajax_get } from '../../../Server_ajax';

const Notice_detail = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const [gaci_user_info, setGaci_user_info] = useState();

    useEffect(() => {
      (async () => {
        try {
          const contentInfo = await Server_ajax_get(`contents_management/admin/notice/content/${props.match.params.id}`);
          setGaci_user_info(contentInfo);
        } catch(e){
          return console.error(e);
        }
      })();
    },[])

  return (
    <React.Fragment>
      {
          gaci_user_info && gaci_user_info.map((Gaci_main_con) => {
              return (
                  <Detail_gaci_header detail_gaci_info={Gaci_main_con} key={Gaci_main_con.ntc_idx} />
              )
          })
      }
    </React.Fragment>
  );
};

export default Notice_detail;
