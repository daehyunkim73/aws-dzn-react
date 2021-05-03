import React, { useEffect, useState } from "react";
import Detail_gaci_header from './components/FAQ/Component/Detail_gaci_header';
import { Server_ajax_get } from "../../../Server_ajax";

const Faq_detail = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
    const [gaci_user_info, setGaci_user_info] = useState();
    
    useEffect(() => {
      (async () => {
        try {
          const getSalesDataInfo = await Server_ajax_get(`contents_management/admin/faq/detail/${props.match.params.id}`);
          setGaci_user_info(getSalesDataInfo);
        } catch(e){
          return console.error(e);
        }
      })();
      
    },[])

    return (
        <React.Fragment>
            <div className="faq_wrap">
                <div className="faq_table notice_table">
                    <div className="faq_table_content_wrap notice_dt_content_wrap">
                        {
                            gaci_user_info && gaci_user_info.map((Gaci_main_con) => {
                                return (
                                    <Detail_gaci_header detail_gaci_info={Gaci_main_con} key={Gaci_main_con.faq_idx} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Faq_detail;