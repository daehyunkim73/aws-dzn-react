import React from "react";

const Api_request_step_two_list = (props) => {
  return (
    <React.Fragment>
      <tr>
        <td>
          <ul className="checkbox_wrap">
            <li>
              <span className="request_api_list_label">{props.api_name}</span>
              <input
                type="checkbox"
                className="using_svc_checkbox_state"
                id={props.id + "_list"}
                name="apiReaquestStepTwo"
              />
              <label
                className="checkbox_design "
                htmlFor={props.id + "_list"}
              ></label>
            </li>
          </ul>
        </td>
        <td className="request_api_list_td">
          {props.category} {">"} {props.sub_category}
        </td>
        <td className="request_api_list_td request_api_list_td_name">
          {props.api_name}
        </td>
        <td className="request_api_list_td">{props.fare}</td>
      </tr>
    </React.Fragment>
  );
};

export default Api_request_step_two_list;
