import React, { useState, createContext, useContext } from 'react';
import { Link, Route, Switch } from "react-router-dom";


const question_main_table = (props) => {
  const { quest } = props

   
    return (
        <React.Fragment>
          <thead>
            <tr>
              <th>
                <div className="checkbox_wrap">
                  <input type="checkbox" id="question_th_first" />
                  <label
                    className="checkbox_design"
                    htmlFor="question_th_first"
                  ></label>
                </div>
              </th>
              <th>No</th>
              <th>등록일시</th>
              <th>문의유형</th>
              <th>제목</th>
              <th>답변상태</th>
            </tr>
          </thead>
        </React.Fragment>
    )
}

export default question_main_table;