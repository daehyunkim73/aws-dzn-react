import React, { useEffect, useState, useCallback, useRef } from "react";
import Pagenations, { Roo_pagenation } from "../question/Component/Page_nations";
import Gaci_page_nation_func from "../../../src/Gaci_page_nation";
import { Link } from "react-router-dom";
import FAQ_main_table from "./Component/FAQ_main_table";
import Faq_search_icon from "../../../image/Dev_Center/API_Document/search.png";
import None_search from "../../../image/Dev_Center/question/search_none.png";
import Ajax from "../../../lib/ajax-3rd-custom";
import { UncertApi_ajax_get, Server_ajax_get } from "../../../server_ajax";
import Page_nation_post from "../question/Component/Gaci_page_nation";

const Faq_list_content = () => {
  const [data_end, setData_end] = useState(false);
  const [svc_array_list, setSvc_array_list] = useState([]);
  const [defalut_array_list, setDefalut_array_list] = useState([]);
  const [page_nations_state, setPage_nations_state] = useState(1); // 페이지 위치
  const [pageData, setPageData] = useState([]);

  const search_ref = useRef();
  const [searchData, setSearchData] = useState({
    cate: "",
    search: "",
  });
  const [searchState, setSearchState] = useState(false);

  const [faqCategory, setFaqCategory] = useState([]);

  useEffect(() => {
    (async function () {
      try {
      const { cate, search } = searchData; 
      console.log("ㅋㅋㅋㅋㅋㅋㅋㅋ");
      const url = `/developer/support/faq_all_list?search=${search}&cate=${cate}`;
      // Ajax.getUncertToken(url, "get", async (signature) => {
        // const un_axios = await UncertApi_ajax_get(url, signature);
        const un_axios = await Server_ajax_get(`support/faq_all_list?search=${search}&cate=${cate}`);
        setSvc_array_list(un_axios);
        setDefalut_array_list(un_axios);
        setSearchState(true);
        setData_end(false);
        faqFilterEvt();
      // });
    } catch (e) {
      return console.error(e);
    } })();
  }, [data_end]);

    useEffect(() => {
    (async function () {
      try {
        const categoryList = await Server_ajax_get(`support/faq/category`);
        setFaqCategory(categoryList);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    // 게시물 페이지네이션
    setSvc_array_list([]);
    Page_nation_post(10, page_nations_state, pageData, setSvc_array_list);    
  }, [page_nations_state]);

    // 목록 개수 변경 시 1페이지로 초기화
    useEffect(() => {
      setSvc_array_list([]);
      setPageData(defalut_array_list);
      Page_nation_post(10, page_nations_state, defalut_array_list, setSvc_array_list);      
  
      setPage_nations_state(1);    
      setSearchState(false);
    }, [searchState])

  const faqFilterEvt = (code) => (e) => {
    const obj = document.querySelectorAll(".btn-outline-primary");
    for(let i = 0; i < obj.length; i++) {
      obj[i].classList.remove("active");
    }
    e.target.classList.add("active");
    setSearchData((data) => {
      return { ...data, cate: code };
    });
    setData_end(true);    
  };

  const searchClick = useCallback(() => {
    const contents = search_ref.current.value;
    setSearchData((data) => {
      return { ...data, search: contents };
    });
    setData_end(true);    
  });


  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      searchClick();
    }
  };

  return (
    <React.Fragment>
      <div className="faq_select_btn_wrap">
        <div
          className="btn btn-outline-primary active"
          onClick={faqFilterEvt(0)}
        >
          전체
        </div>
        {faqCategory.map((item, cnt) => {
          return (
            <div
              key={cnt}
              className="btn btn-outline-primary"
              onClick={faqFilterEvt(item.sub_cate_name)}
            >
              {item.sub_cate_name}
            </div>
          );
        })}
      </div>

      <div className="api_search">
        <input
          type="text"
          placeholder="검색어를 입력해 주세요."
          onKeyPress={onKeyPress}
          ref={search_ref}
        />
        <img src={Faq_search_icon} alt="search" onClick={searchClick} />
      </div>

      {svc_array_list.length === 0 ? (
        <div className="faq_none_wrap">
          <div className="faq_table">
            <div className="content_list_none">
              <img src={None_search} />
              <br />
              <span>등록된 내용이 없습니다.</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="faq_wrap">
          <div className="faq_table" id="login_api_upade_list_table">
            {svc_array_list.map((faq_main_lists, idx) => {
              return (
                <Link
                  key={idx}
                  to={`/support/faq/content/list/${faq_main_lists.faq_idx}`}
                >
                  <FAQ_main_table
                    table_key_id={faq_main_lists.faq_idx}
                    table_lists_froum={faq_main_lists}
                    key={faq_main_lists.faq_idx}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      )}
      {Roo_pagenation(
        10,
        pageData, //전체 게시글
        svc_array_list, //페이지 네이션 게시글
        setSvc_array_list, //페이지 네이션 게시글 func
        page_nations_state, //현재 페이션 네이션
        setPage_nations_state, //현재 페이지 네이션 함수
        false,
        null
      )}
      {svc_array_list.length !== 0 && <Pagenations />}
    </React.Fragment>
  );
};
export default Faq_list_content;
