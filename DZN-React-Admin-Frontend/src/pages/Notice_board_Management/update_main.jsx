import React, { useEffect, useState } from "react";
import { Server_ajax_post } from "../../../Server_ajax";
import Update_header from "./components/Update/update_header";
import Update_table from "./components/Update/update_table";

const Update_main = () => {
  const [updateList, setUpdateList] = useState([]);
  const [defalutData, setDefalutData] = useState([]);
  const [searchData ,setSearchData] = useState([]);
  const [rending ,setRending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchClick ,setSearchClick] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    (async function() {
      try {        
        const axios_host = await Server_ajax_post(
          "contents_management/update_main_list", 
          searchData
        )        

        setUpdateList(() => axios_host);
        setDefalutData(() => axios_host);        
        setLoading(true);
        setSearchClick(true);
      } catch(e) {        
        return console.error(e);
      }
    })();
    setRending(false);
  }, [rending === true]);

  return (
    <React.Fragment>
      <div className="update_wrap">
        <div className="Noice_big_box">
          <div className="Page_same_text">
            <p className="backoffice_title">업데이트</p>
          </div>
          <div className="admin_user_list_wrap" id="big_admin_headerText_box">
            <Update_header setRending={setRending}
                           searchData={searchData}
                           setSearchData={setSearchData}                           
            />
          </div>

          <div className="backoffice_table_wrap" id="big_admin_table_box">
            {loading && <Update_table  searchClick={searchClick}
                            setSearchClick={setSearchClick}
                            updateList={updateList}
                            setUpdateList={setUpdateList}
                            defalutData={defalutData}
                            setRending={setRending}                            
            />}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Update_main;
