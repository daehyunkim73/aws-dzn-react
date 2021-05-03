import React from "react";

const Api_request_step_one_sub_category = (props) => {
  return (
    <React.Fragment>
      <li className="category_select_evt_sub_category">
        <p>{props.sub_category}</p>({props.apiCnt})
      </li>
    </React.Fragment>
  );
};

export default Api_request_step_one_sub_category;
