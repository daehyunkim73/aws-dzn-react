import React from "react";

const Api_request_step_one_category = (props) => {
  return (
    <React.Fragment>
      <li className="category_select_evt_category">
        <p className="category_select_evt_category_p">{props.category}</p>(
        {props.apiCnt})
      </li>
    </React.Fragment>
  );
};

export default Api_request_step_one_category;
