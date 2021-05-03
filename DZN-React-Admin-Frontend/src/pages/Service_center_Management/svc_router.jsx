import React from "react";
import { Route } from "react-router";
import Sales_Service_management from "./Sales_Service_management";
let svcinfo_value,
  svcinfo_side = "";
const svc_router = () => {
  return (
    <React.Fragment>
      <Route
        exact
        path="/admin/svcinfo/:id"
        render={() => (
          <Sales_Service_management
            scm_value={svcinfo_value}
            scm_side={svcinfo_side}
          />
        )}
      />
    </React.Fragment>
  );
};

export default svc_router;
