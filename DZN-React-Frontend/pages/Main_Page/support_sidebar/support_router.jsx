import React from "react";
import _ from "lodash";

import Support_sidebar from "../support_sidebar/support_sidebar";
import Notice_main from "../notice/notice_main";
import Faq_main from "../faq/faq_main";
import Question_main from "../question/question_router";
import Update_router from "../update/update_router";

const Support_router = ({ match }) => {
  const support = _.defaultTo(match.params.support);
  const getContainer = (support) => {
    switch (support) {
      case "notice":
        return <Notice_main />;
      case "faq":
        return <Faq_main />;
      case "question":
        return <Question_main />;
      default:
        return <Update_router 
                match={match}
              />;
    }
  };

  return (
    <React.Fragment>
      <div className="api_document_wrap update_login_list notice_wrap1">
        <Support_sidebar support_sidebar={support} />
        <>{getContainer(support)}</>
      </div>
    </React.Fragment>
  );
};

export default Support_router;
