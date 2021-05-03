import React, { useEffect, useState, useRef } from "react";
import { Server_ajax_post } from "../../../Server_ajax";
import Question_header from "./components/Question/question_header";
import Question_table from "./components/Question/question_table";

const Question_main = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const [rending ,setRending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchData ,setSearchData] = useState([]); 
  const [questionData, setQuestionData] = useState([]);
  const [defaultData, setDefaultData] = useState([]);  
  const [searchClick, setSearchClick] = useState(false);
  const [totalCnt, setTotalCnt] = useState(0);
  

  useEffect(() => {
    (async function() {
      try {
        const axios_host = await Server_ajax_post(
          "contents_management/question_main_list", 
          searchData
        )                   
        
        if(totalCnt === 0){
          setTotalCnt(axios_host.length);
        }
        
        setQuestionData(() => axios_host);
        setDefaultData(() => axios_host);        
        setLoading(true);
        setRending(false);
        setSearchClick(true);
      } catch(e) {
        return console.error(e);
      }
    })();
  }, [rending === true]);

  return (
    <React.Fragment>
      <div className="question_wrap">
        <div className="Noice_big_box">
          <div className="Page_same_text">
            <p className="backoffice_title">문의하기</p>
          </div>
          <div className="admin_user_list_wrap" id="big_admin_headerText_box">
            <Question_header  
              setRending={setRending}
              searchData={searchData}
              setSearchData={setSearchData}                              
            />
          </div>

          <div className="backoffice_table_wrap" id="big_admin_table_box">
            {loading && <Question_table 
              searchClick={searchClick}
              setSearchClick={setSearchClick}
              questionData={questionData}
              setQuestionData={setQuestionData}
              defaultData={defaultData}
              totalCnt={totalCnt}                          
            />
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Question_main;
