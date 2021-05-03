import React, { useState, useEffect, useCallback } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Table_middle from "../../../../../func_src/Table_middle";
import { Link } from "react-router-dom";
import Pagenations, { Roo_pagenation } from "../../../../../Root_component/Post_pagenation";
import { Page_nation_post } from "../../../../../func_src/Gaci_page_nation";
import Update_posts_delete_popup from "../../../popup/Popup_update_Management/Update_posts_delete_popup";
import { Server_ajax_post } from "../../../../../Server_ajax";

const update_table = ({searchClick, setSearchClick, updateList, setUpdateList, defalutData, setRending}) => {  
  const [dayOrder, setDayOrder] = useState('');   // 승인상태
  const [pageListNum, setPageListNum] = useState(50);   // 목록 노출 개수
  const [api_page_nations, setApi_page_nations] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [confirm, setConfirm] = useState(false);
    
  useEffect(() => {
      Table_middle();
    return () => {
      Table_middle();
    };
  });

  // 페이지 네이션 (페이지 변경 시)
  useEffect(() => {
    setUpdateList([]);    
    Page_nation_post(
      pageListNum,
      api_page_nations,
      pageData,
      setUpdateList,        
    );  
  }, [api_page_nations])

  // 필터 기능
  useEffect(() => {
    if(dayOrder === ''){
      setUpdateList([]);
      setPageData(defalutData);
      Page_nation_post(
        pageListNum,
        api_page_nations,
        defalutData,
        setUpdateList,        
      );   
    }
    else  {      
      const newData =  updateList.sort( (a, b) => {                
        //최종 수정일 순, 최다 조회순 필터링
        if (dayOrder === "0"){           
          return new Date(b.upt_dt) - new Date(a.upt_dt);
        }
        else if (dayOrder === "1")
          return Number(b.upt_vw_cnt) - Number(a.upt_vw_cnt);
      });

      setPageData(newData);
      
      setUpdateList([]);
      Page_nation_post(
        pageListNum,
        api_page_nations,
        newData,
        setUpdateList,        
      );      
    }
    setSearchClick(false);
    setApi_page_nations(1);
  }, [dayOrder, pageListNum, searchClick])

  // 요일별 정렬 변경 이벤트
  const dayOrderChange = (e) => {
    setUpdateList(defalutData);
    const value = e.target.value;    
    setDayOrder(() => value);    
  }

  // 목록 변경
  const listChange = (e) => {
    const cnt = e.target.value;
    setPageListNum(Number(cnt));
  }

  // 삭제 버튼 클릭 시 이벤트
  const deleteBtnClick = useCallback(() => {
    let checkCnt = 0;
    const objs = document.querySelectorAll(".using_svc_checkbox_state");
    for (let i = 0; i < objs.length; i++) {
      if (objs[i].checked === true) {
        checkCnt++;
      }
    }

    if(checkCnt === 0) return alert('선택된 게시물이 없습니다.');    

    const Admin_user_update_delete_popup_bgk = document.getElementById(
      "Admin_user_update_delete_popup_bgk"
    );
    Admin_user_update_delete_popup_bgk.style.display = "table";
  });
  // 삭제 버튼 확인 눌렀을 시
  useEffect(() => {
    const Admin_user_update_delete_popup_bgk = document.getElementById(
      "Admin_user_update_delete_popup_bgk"
    );
    Admin_user_update_delete_popup_bgk.style.display = "none";

    const deleteData = async () => {
      try{
        if(confirm){                 
          const objs = document.querySelectorAll(".using_svc_checkbox_state");
          let deleteIdxs = [];
          
          for (let i = 0; i < objs.length; i++) {
            if (objs[i].checked === true) {
              deleteIdxs = deleteIdxs.concat(objs[i].id);
            }
          }
                    
          const url = 'contents_management/update_delete_checked';
          const param = { deleteIdxs:  deleteIdxs.join(",")};
          const uptDelete = await Server_ajax_post(url, param);
          if(uptDelete.affectedRows > 0) {
            setRending(true);            
          } else {
            throw new Error('삭제에 실패하여습니다.')
          }          
        } 
      } catch(e) {
        console.error(e);
      }            
    }
    deleteData();
    setConfirm(false);
  }, [confirm])

  
  const selectAll_btn = () => {
    let selectAll = document.querySelector("#step_two_api_a");
    let objs = document.querySelectorAll(".using_svc_checkbox_state");
    if (selectAll.checked === true) {
      for (let i = 0; i < objs.length; i++) {
        objs[i].checked = false;
      }
    } else if (selectAll.checked === false) {
        for (let i = 0; i < objs.length; i++) {
          objs[i].checked = true;
        }
    }
  };

  return (
    <React.Fragment>
      <Update_posts_delete_popup setConfirm={setConfirm} />
        <Table responsive id="uploade_talbe_box">
          <caption className="tb_caption">
            <div className="table_result_number_box">
              <div className="tb_select_wrap" id="select_result_delete_btn_box">
                <button id="update_delete_btn" onClick={deleteBtnClick}>
                  삭제
                </button>
                <div className="caption_title bold_none">
                  [총 <p className="number_data">{defalutData.length === 0 ? 0 : defalutData.length}</p>건 ] 검색결과
                  <p className="number_data">{updateList ? updateList.length : 0}</p>건
                </div>
              </div>
              <div className="tb_select_wrap" id="select_cpation_uploade_box">
                <button id="update_uploade_btn">
                  <Link className="link_style_text" to='/admin/update/write'>
                    등록
                  </Link>
                </button>
                <Form.Control as="select" className="table_select tb_select" onChange={dayOrderChange} >
                  <option value='0'>최종 수정일 순</option>
                  <option value='1'>최다 조회 순</option>
                </Form.Control>
                <Form.Control as="select" className="list_select" onClick={listChange}>                  
                  <option value='50'>목록 50</option>
                  <option value='100'>목록 100</option>
                  <option value='200'>목록 200</option>
                  <option value='300'>목록 300</option>
                  <option value='400'>목록 400</option>
                </Form.Control>
              </div>
            </div>
          </caption>
          <thead>
            <tr>
              <th>
                <div className="checkbox_wrap" id="sp_table_none_head">
                  <input type="checkbox" id="step_two_api_a" />
                  <label
                    onClick={selectAll_btn}
                    className="checkbox_design"
                    htmlFor="step_two_api_a"
                  ></label>
                </div>
              </th>              
              <th>제목</th>
              <th>작성자</th>
              <th>수정일</th>
              <th>조회수</th>
              <th>수정</th>
            </tr>
          </thead>

          <tbody>
            {              
              updateList.map((list, index) =>                 
              <tr key={index}>
                <td>
                  <div className="checkbox_wrap" id="sp_table_none_head">
                    <input type="checkbox" className="using_svc_checkbox_state" id={list.upt_idx} name="apiReaquestStepTwo" />
                    <label className="checkbox_design" htmlFor={list.upt_idx}></label>
                  </div>
                </td>                                             
                <td>
                  <Link className="link_style_text" to={`/admin/update/detail/${list.upt_idx}`}>
                    {list.upt_title}
                  </Link>
                </td>                
                <td>{list.adm_id}</td>
                <td>{list.upt_dt}</td>
                <td>{list.upt_vw_cnt}</td>
                <td>
                  <div className="modify_btn_box">
                    <Link className="link_style_text" 
                          to={`/admin/update/modify/${list.upt_idx}`}
                    >
                      <button>수정</button>
                    </Link>
                  </div>
                </td>
              </tr>   
              )              
            }
          </tbody>
        </Table>
        {Roo_pagenation(
          pageListNum,
          pageData, //전체 게시글
          updateList, //페이지 네이션 게시글
          setUpdateList, //페이지 네이션 게시글 func
          api_page_nations, //현재 페이션 네이션
          setApi_page_nations, //현재 페이지 네이션 함수
          false,
          null
        )}
        <Pagenations />
    </React.Fragment>
  );
};

export default update_table;