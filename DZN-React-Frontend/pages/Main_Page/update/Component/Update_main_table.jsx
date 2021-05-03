import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';
import { Page_nation_data } from '../../../../src/Gaci_page_nation';
import Page_nations, { Roo_pagenation } from '../../../Root_component/Page_nations';
import notice_update_all_empty from "../../../../image/Center/Empty/notice_update_all_empty.png";

const Update_main_table = ( { mainList } ) => {    
    const dateTime = moment(mainList.UPT_DATE).format('YYYY-MM-DD HH:mm:ss');    
    const [pageData, setPageData] = useState([]);
    const [api_page_nations, setApi_page_nations] = useState(1);

    useEffect(() => {
        const req_Post_factory = Page_nation_data(api_page_nations, mainList, 10);
        setPageData(()=>req_Post_factory);        
      }, [api_page_nations]);
    
    return (
        <React.Fragment>            
            <div className="faq_wrap">
                <div className="faq_table" id="login_api_upade_list_table">
                    {pageData.length > 0 ?  pageData.map((list, index) => 
                    <Link key={index} to={`/support/update/${list.UPT_MAIN_CODE}`}>
                        <div className="faq_table_content_wrap">
                            <p className="faq_table_title">[{dateTime}]</p>
                            <p>{list.UPT_MAIN_NAME}</p>
                        </div>
                    </Link>
                    )
                    :
                    <div className="all_empty">
                        <img 
                            src={notice_update_all_empty}
                            alt="notice_update_all_empty"
                        />
                        <p>등록된 내용이 없습니다.</p>
                    </div>
                    } 
                </div>               
            </div>            
            {Roo_pagenation(
                10,
                mainList, //전체 게시글
                pageData, //페이지 네이션 게시글
                setPageData, //페이지 네이션 게시글 func
                api_page_nations, //현재 페이션 네이션
                setApi_page_nations, //현재 페이지 네이션 함수
                false,
                null
            )}
            { mainList.length !== 0 && <Page_nations />}
        </React.Fragment>
    )
}

export default Update_main_table; 