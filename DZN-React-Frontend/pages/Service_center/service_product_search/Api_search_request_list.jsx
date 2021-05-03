import React from "react";

const Api_search_request_list = (props) => {
  return (
    <React.Fragment>
      <li>
        <input
          type="checkbox"
          id={"api_check_" + props.id}
          className="svc_checkbox_state"
          value={props.id}
        />
        <label className="checkbox_design" htmlFor={"api_check_" + props.id}>
          {props.category} {">"} {props.api}
        </label>{" "}
        {props.fare !== "" ? <span> {props.fare} </span> : <></>}
      </li>
    </React.Fragment>
  );
};

export default Api_search_request_list;
