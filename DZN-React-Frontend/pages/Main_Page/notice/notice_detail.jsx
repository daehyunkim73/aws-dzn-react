import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Detail_gaci_header from "./Component/Detail_gaci_header";
import axios from "axios";
import Ajax from "../../../lib/ajax-3rd-custom";
import { UncertApi_ajax_get } from "../../../server_ajax";

const Notice_detail = (props) => {
  const [gaci_user_info, setGaci_user_info] = useState();

  useEffect(() => {
    try {
      const url = `/developer/support/notice/content?id=${props.match.params.id}`;
      Ajax.getUncertToken(url, "get", async (signature) => {
        const un_axios = await UncertApi_ajax_get(url, signature);
        setGaci_user_info(un_axios);
      });
    } catch (e) {
      return console.error(e);
    }
  }, []);

  return (
    <React.Fragment>
      <div className="faq_wrap">
        <div className="faq_table notice_table">
          <div className="faq_table_content_wrap notice_dt_content_wrap">
            {gaci_user_info &&
              gaci_user_info.map((Gaci_main_con) => {
                return (
                  <Detail_gaci_header
                    detail_gaci_info={Gaci_main_con}
                    key={Gaci_main_con.ntc_idx}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Notice_detail;
