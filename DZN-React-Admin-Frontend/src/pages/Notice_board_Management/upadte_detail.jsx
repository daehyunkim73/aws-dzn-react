import React, { useState, useEffect } from 'react';
import Detail_gaci_header from './components/Update/Component/Detail_gaci_header';
import { Server_ajax_get } from '../../../Server_ajax';

const Update_detail = ({ match }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const detailId = match.params.id;
  const [updateInfo, setUpdateInfo] = useState();
  const [loading, setLoading] = useState();
  
  // 상세 페이지 정보 가져오기
  useEffect(() => {
      (async function() {
        try {
          const axios_host = await Server_ajax_get(
            `contents_management/admin/update/detail/${detailId}`
          )
          setUpdateInfo(axios_host);
          setLoading(true);
        } catch(e) {
          return console.error(e);
        }
      })();
    }, []);

  return (
    <React.Fragment>
      {loading && 
        <Detail_gaci_header updateInfo={updateInfo} detailId={detailId} />
      }
    </React.Fragment>
  );
};

export default Update_detail;
