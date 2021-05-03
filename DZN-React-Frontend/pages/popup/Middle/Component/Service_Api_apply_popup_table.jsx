import React from "react";

const Service_Api_apply_popup_table = (props) => {
  return (
    <React.Fragment>
      <tr>
        <td>{props.api}</td>
        <td>{props.fare}</td>
      </tr>
    </React.Fragment>
  );
};

export default Service_Api_apply_popup_table;
