import React from "react";
import { useSearchApiAdd } from "../Api_request_step_one";

const api_request_step_one_api_name = (props) => {
  const { CategoryListVal_li } = useSearchApiAdd();
  return (
    <React.Fragment>
      <li ref={CategoryListVal_li.push}>
        <input
          type="checkbox"
          className="svc_checkbox_state"
          id={"check_state" + props.id}
        />
        <label className="checkbox_design " htmlFor={"check_state" + props.id}>
          {props.api_name}
        </label>{" "}
        {props.fare != "" ? <span>{props.fare}</span> : <></>}
      </li>
    </React.Fragment>
  );
};

export default api_request_step_one_api_name;
