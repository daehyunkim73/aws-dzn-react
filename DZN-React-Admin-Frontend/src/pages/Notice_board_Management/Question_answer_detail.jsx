import React, { useEffect, useState } from "react";
import Detail_gaci_header from './components/Question/Component/Detail_gaci_header';
import { Server_ajax_get } from "../../../Server_ajax";

const Question_answer_detail = ({match}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const id = match.params.id;
  const [qusetionData, setQusetionData] = useState();  
  const [loading, setLoading] = useState(false);
  const [rending, setRending] = useState(false);

  useEffect(() => {
    (async function() {
      try {
        const axios_host = await Server_ajax_get(
          `contents_management/question_detail/${id}`
        )
        setQusetionData(axios_host);
        setLoading(true);
      } catch(e) {
        console.error(e);
      }
    })();
    setRending(false);
  }, [rending===true]);

  return (
    <React.Fragment>
      <div className="question_detail">        
        { loading && <Detail_gaci_header info={qusetionData} setRending={setRending} setLoading={setLoading}/> }
      </div>
    </React.Fragment>
  );
};

export default Question_answer_detail;
