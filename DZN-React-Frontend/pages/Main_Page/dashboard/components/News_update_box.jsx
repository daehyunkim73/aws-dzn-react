import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import News_update_box_view from "./News_update_box_view";
import { UncertApi_ajax_get } from "../../../../server_ajax";
import Ajax from "../../../../lib/ajax-3rd-custom";
const News_update_box = () => {
  const [boxes, setBoxes] = useState([
  ]);
  useEffect(() => {
    try {
      const url = "/developer/support/update_main_list";
      Ajax.getUncertToken(url, "get", async (signature) => {
        const un_axios = await UncertApi_ajax_get(url, signature);
        setBoxes(un_axios);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);
  return (
    <React.Fragment>
      {boxes.length === 0 ?
          <News_update_box_view
            boxes_length={boxes.length}
          /> :
          [...Array(4)].map((n, i) => {
            return  (
              <News_update_box_view
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
export default News_update_box;
