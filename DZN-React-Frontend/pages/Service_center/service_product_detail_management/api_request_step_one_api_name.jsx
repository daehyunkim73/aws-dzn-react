import React from "react";
import { useSearchApiAdd } from "./Api_request_step_one";

const api_request_step_one_api_name = (props) => {
  let { objCheck, setObjCheck } = useSearchApiAdd();
  const handleChange = (e) => {
    let fruites = objCheck;
    e.target.value === setObjCheck((objCheck = !objCheck));
  };
  return (
    <React.Fragment>
      <li>
        <input
          type="checkbox"
          className="svc_checkbox_state"
          id={"check_state" + props.id}
          value={props.id}
          // checked={objCheck}
          // onChange={handleChange}
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
