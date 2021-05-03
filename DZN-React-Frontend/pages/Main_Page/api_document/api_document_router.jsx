import React from "react";

import Api_document from "./api_document";
import Api_search from "./api_search";
import Api_search_none from "./api_search_none";
import { Route, Switch } from "react-router";

const Api_document_router = () => {
  return (
    <React.Fragment>
      <div className="page_title_wrap">
        <p className="page_title">API 문서</p>
        <div className="page_title_btn">
          <p>Home</p>
          <img
            className="caption_img"
            src="../image/Center/Dashboard/view_more.png"
          />
          <p>API 문서</p>
        </div>
      </div>
      <Switch>
        <Route path="/api/api_search" component={Api_search}></Route>
        <Route path="/api/api_search_none" component={Api_search_none}></Route>
        <Route path="/api" component={Api_document}></Route>
      </Switch>
    </React.Fragment>
  );
};

export default Api_document_router;
