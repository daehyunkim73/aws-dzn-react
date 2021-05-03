import React, { useState, useEffect, useCallback, useRef } from 'react';
import Detail_gaci_header from './components/Notice/Component/Detail_gaci_header';
import { Server_ajax_get, Server_ajax_post } from '../../../server_ajax';
import axios from 'axios';

const Notice_detail = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const [gaci_user_info, setGaci_user_info] = useState();

  useEffect(() => {
      const result = await Server_ajax_get(
        `admin/notice/content/${props.match.params.ntc_idx}`,
      )
  }, []);

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
