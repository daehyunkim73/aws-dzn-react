import React, { useState, useEffect } from "react";
import Notice_box_view from "./Notice_box_view";
import { UncertApi_ajax_get } from "../../../../server_ajax";
import Ajax from "../../../../lib/ajax-3rd-custom";
const Notice_box = () => {
  const [boxes, setBoxes] = useState([]);
  useEffect(() => {
    const url = "/developer/support/notice_main_list";
    Ajax.getUncertToken(url, "get", async (signature) => {
      const un_axios = await UncertApi_ajax_get(url, signature);
      setBoxes(un_axios);
    });
  }, []);
  return (
    <React.Fragment>       
      {boxes.length === 0 ?
          <Notice_box_view
            boxes_length={boxes.length}
          /> :
          [...Array(4)].map((n, i) => {
            return  (
              <Notice_box_view
                index={i}
                boxes_length={boxes.length}
                boxes_lists={boxes}
                key={i}
              />
            )
          })
      }
    </React.Fragment>
  );
};
export default Notice_box;