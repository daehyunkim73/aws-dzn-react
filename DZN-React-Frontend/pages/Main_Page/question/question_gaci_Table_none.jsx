import React from "react";
import None_search from "../../../image/Dev_Center/question/search_none.png";

const Question_gaci_Table_Page_none = () => {
  return (
    <React.Fragment>
      <tbody className="question_none">
        <tr>
          <td colSpan="6">
            <img src={None_search} />
            <br />
            <span>등록된 내용이 없습니다.</span>
          </td>
        </tr>
      </tbody>
    </React.Fragment>
  );
};

export default Question_gaci_Table_Page_none;
