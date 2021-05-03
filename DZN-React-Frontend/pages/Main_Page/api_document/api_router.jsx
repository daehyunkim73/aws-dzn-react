import React from "react";
import _ from "lodash";

import Api_sidebar from "./Api_sidebar";
import Api_category from "./api_category";
import Api_document_router from "./api_document_router";
const Api_router = ({ match }) => {
  const api = _.defaultTo(match.params.api);
  const getContainer = (api) => {
    switch (api) {
      case "accounting":
        return <Api_category />;
      default:
        return <Api_document_router />;
    }
  };
  return (
    <React.Fragment>
      <div className="api_document_wrap api_document_cg_wrap">
        <Api_sidebar api_sidebar={api} />
        <>{getContainer(api)}</>
      </div>
    </React.Fragment>
  );
};

export default Api_router;
