import React, { useState, useEffect, memo } from 'react';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Question_aswer_arrow from "../../../../image/Dev_Center/question/question_aswer_arrow.png";
import Quest_file from "../../../../image/Dev_Center/Forum/file.png";

//query : quest1


const quest_main_table = (props) => {
  const { table_lists_froum, quest_state_add_file } = props;
  const [quest_addfile, setQuest_addfile] = useState();
  let answerTime = null;
  let answerTitle = null;
  
  
  useEffect(() => {
    const quest_file_idx = quest_state_add_file && quest_state_add_file.filter((file_idx) => {
      return Number(file_idx.quest_post_idx) === Number(table_lists_froum.tqIdx);
    });
    setQuest_addfile(quest_file_idx);
    }, []);

  //답변완료 / 미등록
  if(table_lists_froum.stat === '답변미등록') {
    answerTime = (
      <td className="not_answer">{table_lists_froum.stat}</td>
    )
  }
  else if(table_lists_froum.stat === '답변등록'){
    answerTime = (
      <td className="button_time_answer">
        <Button>답변완료</Button> <br />
        <span className="answer_time_btn">
          {table_lists_froum.taRegDt} <br />
          {table_lists_froum.taTime}
        </span>
      </td>
    )
    answerTitle = (
      <div>
        <br /><img src={Question_aswer_arrow} alt="" />
        <span className="aswer_arrow_text">
        {quest_addfile && quest_addfile.length !== 0 ? <img src={Quest_file} alt="file" /> : ''}&nbsp;{table_lists_froum.taTitle}
        </span>
      </div>
    )
  }

    return (
      <React.Fragment>
          <tr>
            <td>
            <div className="checkbox_wrap">
                <input
                  type="checkbox"
                  className="using_svc_checkbox_state"
                  id={table_lists_froum.tqIdx}
                  name="apiReaquestStepTwo"
                />
                <label
                  className="checkbox_design "
                  htmlFor={table_lists_froum.tqIdx}
                ></label>
              </div>
            </td>
            <td>{table_lists_froum.tqIdx}</td>
            <td>
              {table_lists_froum.tqRegDt}
            </td>
            <td>{table_lists_froum.tqTypeCode}</td>
            <td className="ok_answer">
              <Link to={`/support/question/content/list/${table_lists_froum.tqIdx}`}>
                {quest_addfile && quest_addfile.length !== 0 ? <img src={Quest_file} alt="file" /> : ''}&nbsp;{table_lists_froum.tqTitle}
              </Link>
              <Link to={`/support/question/content/list/${table_lists_froum.tqIdx}`}>
                {answerTitle}
              </Link>
            </td>
              {answerTime}
            
          </tr>
      </React.Fragment>
    )
}

export default quest_main_table;