import React, { useEffect, useState } from "react";
import Support_sidebar from "../support_sidebar/support_sidebar";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Detail_gaci_header from "./Component/Detail_gaci_header";
import axios from "axios";
import { UncertApi_ajax_get } from "../../../server_ajax";
import Ajax from "../../../lib/ajax-3rd-custom";

const Faq_detail = (props) => {
  const [gaci_user_info, setGaci_user_info] = useState();
  useEffect(() => {
    try {
      const url = `/developer/support/faq/content/list?id=${props.match.params.id}`;
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
                    key={Gaci_main_con.faq_idx}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Faq_detail;
