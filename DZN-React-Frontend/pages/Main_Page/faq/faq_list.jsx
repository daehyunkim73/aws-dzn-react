import React, { useEffect, useState } from "react";
import Pagination from "../../Main_Page/component/Pagination";
import Faq_search_none from "./faq_search_none";
import Faq_list_content from "./faq_list_content";
import Faq_detail from "./faq_detail";
import { Link, Route, Switch } from "react-router-dom";
import Faq_search_icon from "../../../image/Dev_Center/API_Document/search.png";

const Faq_list_page = () => {

  return (
    <React.Fragment>
      <div className="faq_wrap faq_list_line">
        <Switch>
          <Route exact path="/support/faq" component={Faq_list_content}></Route>
          <Route
            path="/support/faq/not_detected"
            component={Faq_search_none}
          ></Route>
          <Route
            path="/support/faq/content/list/:id"
            component={Faq_detail}
          ></Route>
          <Route
            path="/support/faq/content/:category"
            component={Faq_list_content}
          ></Route>
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default Faq_list_page;
