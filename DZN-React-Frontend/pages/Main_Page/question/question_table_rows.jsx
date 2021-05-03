import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import moment from 'moment';
import Question_aswer_arrow from "../../../image/Dev_Center/question/question_aswer_arrow.png";

//query : quest1

const Question_table_rows = ({list}) => {
  return (
    <React.Fragment>
      <tr>
        <td>
          <div className="checkbox_wrap">
            <input
              type="checkbox"
              className="using_svc_checkbox_state"
              id={list.qstIdx}
              name="apiReaquestStepTwo"
            />
            <label
              className="checkbox_design "
              htmlFor={list.qstIdx}
            ></label>
          </div>
        </td>
        <td>{list.rnum}</td>        
        <td>{moment(list.qstRegDate).format('YYYY-MM-DD')}<br /> {moment(list.qstRegDate).format('hh:mm:ss')}</td>
        <td>{list.qstTypeName}</td>
        <td className="ok_answer">
          <Link
            to={`/support/question/content/list/${list.qstIdx}`}
          >
            {list.qstTitle}
            {
              list.awrIdx !== null && (
              <React.Fragment>
                <br /><img src={Question_aswer_arrow} alt="" />
                <span className="aswer_arrow_text">{list.adminTitle}</span> 
              </React.Fragment>
              )
            }
          </Link>          
        </td>        
        {
          list.awrIdx === null ? 
          <td className="not_answer">답변미등록</td>  :
          <td className="button_time_answer"><Button>답변완료</Button>
            <div className="answer_time_btn">            
              {moment(list.adminReq).format('YYYY-MM-DD')} <br />
              {moment(list.adminReq).format('hh:mm:ss')}            
          </div>
        </td>
        }
        
      </tr>
    </React.Fragment>
  );
};

export default Question_table_rows;
