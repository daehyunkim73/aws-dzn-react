import React from "react";
import Form from "react-bootstrap/Form";
import Forum_notice from "./Component/forum_notice";
import Forum_search_none from "../../../image/Dev_Center/question/search_none.png";
import { Link } from "react-router-dom";

const Forum_main_search_none = (props) => {
  const { Search_value } = props;
  return (
    <React.Fragment>
      <div className="data_forum_wrap">
        <div className="data_forum_post">
          <div className="faq_table">
            <div className="content_list_none">
              <img src={Forum_search_none} />
              <br />
              <span>검색된 결과가 없습니다.</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Forum_main_search_none;
