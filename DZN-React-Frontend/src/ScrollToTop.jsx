import React from "react";
import { useEffect } from "react";

const ScrollToTop = ({ match }) => {
  const report = _.defaultTo(match.params.report);
  useEffect(() => {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }, []);
  return this.props.children;
};

export default withRouter(ScrollToTop);
