import React, { useEffect, useState, useRef, useCallback } from "react";
import { useCookies } from "react-cookie";
import Question_select from "./question_select";
import Question_table from "./question_table";
import { Server_ajax_get } from "../../../server_ajax";

//query : quest1

const Question_list = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [rending, setRending] = useState(false);
  const [loading, setLoading] = useState(false);    
  const [questionData, setQuestionData] = useState([]);
  const [defalutData, setDefalutData] = useState([]);
  const [searchClick, setSearchClick] = useState(false);
  const [searchData, setSearchData] = useState({
    type: "",
    state: "",
    search: "",
  });

  // 문의 데이터 가져오기
  useEffect(() => {
    const getData = async () => {
      try {
        const mbr_id = cookies.h_portal_id;
        const { type, state, search } = searchData;        
        const url = `support/question_main_list?mbr_id=${mbr_id}&type=${type}&state=${state}&search=${search}`;        
        const result = await Server_ajax_get(url);    
        
        setQuestionData(() => result);
        setDefalutData(() => result);
        setLoading(true);        
        setSearchClick(true);
      } catch (e) {
        console.error(e);
      }
    }
    getData();  
    setRending(false);
  }, [rending === true]);

  return (
    <React.Fragment>
      {/* <Question_delete_popup />
      <Question_popup setRending={setRending} /> */}
      <div className="question_wrap">        
        <Question_select
          setSearchData={setSearchData}
          setRending={setRending}          
        />        
      {           
        loading && (          
        <Question_table
          searchClick={searchClick}
          setSearchClick={setSearchClick}
          questionData={questionData}
          setQuestionData={setQuestionData}
          defalutData={defalutData}
          setRending={setRending}
        />
      )}
      </div>
    </React.Fragment>
  );
};

export default Question_list;
