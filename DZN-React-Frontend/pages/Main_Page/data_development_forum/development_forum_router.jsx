import React from "react";
import _ from "lodash";
import Forum_sidebar from "../Forum_sidebar/forum_sidebar";
import Data_forum from "./data_forum_router";
import Service_forum from "../service_development_forum/service_forum_router";
import { Route, Switch } from "react-router";

const Development_forum_router = ({ match }) => {
  const forum = _.defaultTo(match.params.forum);
  return (
    <React.Fragment>
      <div className="api_document_wrap forum_wrap1">
        <Forum_sidebar forum_sidebar={forum} />
        <Switch>
          <Route path="/forum/data" component={Data_forum}></Route>
          <Route path="/forum/service" component={Service_forum}></Route>
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default Development_forum_router;
