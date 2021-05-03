import React, { useEffect, useCallback, useState } from "react";
import Pagination from "../../Main_Page/component/Pagination";
import First_member_popup from "../../popup/Small_popup/Data_delete_popup_v1";
import Second_member_popup from "../../popup/Small_popup/Data_delete_popup_v2";
import { Link } from "react-router-dom";
// 이미지 import
import data_icon from "../../../image/Data_Center/Purchase_create_data_list/data_icon.png";
import user_add from "../../../image/Data_Center/Purchase_create_data_list/user_add.png";
import model from "../../../image/Data_Center/Purchase_create_data_list/model.png";
import report from "../../../image/Data_Center/Purchase_create_data_list/report.png";
import sidebar_btn_all_select from "../../../image/Data_Center/Purchase_create_data_list/sidebar_btn_all_select.png";
import sidebar_btn_none_select from "../../../image/Data_Center/Purchase_create_data_list/sidebar_btn_none_select.png";
import danger from "../../../image/Data_Center/Purchase_create_data_list/alert.png";
import production_activity2 from "../../../image/Center/Dashboard/production_activity2.png";
import { Server_ajax_post } from "../../../server_ajax";




const purchase_create_data_list_data = (props) => {
  const { purchase_create_data_list,
    ttlRowsCnt,
    currPage,
    setCurrPage,
    contentNumPerPage,
          pageNumHandler,
          tabHandleClick,
          validList,
          validData,
          validDataLength,
          validGbn,
          setValidGbn,
          setTypeGbn,
          typeGbn,
          datatype_d,
          datatype_t,
          datatype_m,
          datatype_r,
          validRef,
          invalidRef,
          setReRend
        } = props;
  
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const Delete_btn_Click = useCallback((e) => {
    const id = e.target.id.split('_')[2];
    setDeleteId(id);
    const first_member_popup = document.getElementById("Data_delete_popup_v1");
    first_member_popup.style.display = "table";
  }, []);

  useEffect(() => {
    const first_member_popup = document.getElementById("Data_delete_popup_v1");
    const deleteData = async () => {
      try {        
        if(deleteConfirm === true){          
          const param = { pdbaseIdx: deleteId}
          const deleteDataCenter = await Server_ajax_post("datacenter/deleteDataCenter", param);
          
          if(deleteDataCenter.affectedRows > 0) {
            alert('삭제되었습니다.');
            setReRend(true);
          }
        }
        first_member_popup.style.display = "none";
        setDeleteConfirm(false);        
      }catch(e) {
        console.error(e);
      }
    }
    deleteData();    
  }, [deleteConfirm===true])

  const Delete_btn_Click_v2 = useCallback(() => {
    const second_member_popup = document.getElementById("Data_delete_popup_v2");
    second_member_popup.style.display = "table";
  }, []);

 
  let validIcon = '';
  const getStateMain = (state) => {
    return (
      state === "0" &&
      <p className='purchase_badge'>구매완료</p>
      ||
      <p className='new_create_badge'>신규제작</p>
    )
  }


  const getFormattedDate = (date) => {
    let tmpDt = new Date(date);
    let formattedDate = tmpDt.toISOString().slice(0,10)//.replace(/-/g,"");
    return formattedDate
  }

  const setDataValidFilter = (e) => {
    let chkdVal = [];
    const validChkbx = document.getElementsByName("data_valid");    
    for (let i = 0; i < validChkbx.length; i++) {
      if(validChkbx[i].checked) { 
        chkdVal = chkdVal.concat(validChkbx[i].value);
      }
    }
    setValidGbn(chkdVal);
  }


  const setDataTypeFilter = (e) => {
    let chkdVal = [];    
    const typeChkbx = document.getElementsByName("data_type_check");    
    for (let i = 0; i < typeChkbx.length; i++) {
      if(typeChkbx[i].checked) { 
        chkdVal = chkdVal.concat(typeChkbx[i].value);
      }
    }        
    setTypeGbn(chkdVal);
  }


  const getAllSelect = (e) => {
    const validChkbx = document.getElementsByName("data_valid");
    const typeChkbx = document.getElementsByName("data_type_check");
    let valid_chkdVal = [];
    let type_chkdVal = [];

    if(e.currentTarget.value === '1'){
      for (let i = 0; i < validChkbx.length; i++) {
        validChkbx[i].checked = true;
        valid_chkdVal[i] = validChkbx[i].value
      }
      for (let i = 0; i < typeChkbx.length; i++) {
        typeChkbx[i].checked = true;
        type_chkdVal[i] = typeChkbx[i].value
      }
      setValidGbn(valid_chkdVal);
      setTypeGbn(type_chkdVal);
    }
    else{
      for (let i = 0; i < validChkbx.length; i++) {
        validChkbx[i].checked = false;
      }
      for (let i = 0; i < typeChkbx.length; i++) {
        typeChkbx[i].checked = false;
      }
      setValidGbn([]);
      setTypeGbn([]);
    }
    //getTypeGbnData([]);
  }  
  
  return (
    <React.Fragment>
      <First_member_popup setConfirm={setDeleteConfirm} />
      {/* 삭제 버튼 클릭시 팝업 유료 회원이 있을 경우 삭제 */}
      <Second_member_popup />
      {/* 삭제 버튼 클릭시 팝업 유료 회원이 있을 경우 삭제 */}
      <div className="purchase_create_data_list_data">
        <p>[총 {validDataLength}건]</p>  
        <div className="purchase_create_data_list_border_all">

        {
          purchase_create_data_list.map((listItem, idx) => {
              let date_v = getFormattedDate(listItem.regDt);
              let urlPath = '';
              
              validIcon = '';
              if(listItem.stat == '0'){
                if(listItem.validValue == '1'){
                  validIcon = <p className='effectiveness_badge'>사용가능</p>
                }else if(listItem.validValue == '0'){
                  validIcon = <p className='not_effectiveness_badge'>사용불가</p>
                } 
              }else{ 
                validIcon = <p className={listItem.validSubIcon}>{listItem.validSubText}</p>
              }
              
              return (
                <div id='listcls' className="purchase_create_data_list_border_wrap clearfix" key={listItem.pdbase_idx}>
                  <Link to={{pathname: listItem.stat !== '0' ? `/datacenter/purchasedata/detail/${listItem.pdbase_idx}` : '' }}>
                    <div className="purchase_create_data_list_data_wrap">
                      <div>
                        <div className="badge_wrap">
                          {getStateMain(listItem.stat)}
                          {validIcon}
                        </div>
                        <div className="purchase_create_data_list_data_text">
                          
                          <p className="purchase_create_data_list_data_title">
                            {/*구매 제작 데이터 제목4*/}
                            {listItem.data_title} 
                          </p>
                          <p className="purchase_create_data_list_data_date">
                            {/*구매일: 2020-08-03*/}
                            구매일: {getFormattedDate(listItem.regDt)}
                          </p>
                        </div>
                      </div>
                      <div className="purchase_create_data_list_data_type purchase_create_data_list_data_data">
                        {
                          listItem.data_Type === 'D' &&
                          <div><img src={data_icon} alt='data_icon' /><p>데이터</p></div>
                          || listItem.data_Type === 'T' &&
                          <div><img src={production_activity2} alt='data_icon' /><p>통계</p></div>
                          || listItem.data_Type === 'M' &&
                          <div><img src={model} alt='data_icon' /><p>모델</p></div>
                          || listItem.data_Type === 'R' &&
                          <div><img src={report} alt='report' /><p>리포트</p></div>
                        }
                      </div>
                    </div>
                  </Link>
                  <div className="purchase_create_data_list_data_btn_big_wrap">

                    {
                      listItem.stat === '0' && (
                        <>
                        <Link to="/setting/authority">
                          <div className="purchase_create_data_list_data_btn">
                            <img src={user_add} alt="user_add" />
                            <p>사용자 추가</p>
                          </div>
                        </Link>
                        </>
                      )
                      || listItem.stat !== '0' && (
                        <>
                        <Link to="/setting/authority">
                          <div className="purchase_create_data_list_data_btn">
                            <img src={user_add} alt="user_add" />
                            <p>사용자 추가</p>
                          </div>
                        </Link>
                        <div className="purchase_create_data_list_data_btn_wrap">
                          <Link to={{pathname: `/datacenter/purchasedata/detail/${listItem.detailID}`}}>
                            <button>입력</button>
                          </Link>
                          <button
                            id={`delete_btn_${listItem.detailID}`}
                            className="purchase_create_data_list_data_delete_btn"
                            onClick={Delete_btn_Click}
                            >
                            삭제
                          </button>
                        </div>
                        </>
                      )
                    }
                    
                  </div>
                </div>
              )
          })
        }
        </div>


        
        <div className="purchase_create_data_list_data_sidebar">
          <div className="sidebar_btn_wrap">
            <button className="sidebar_btn_all_select" value='1' onClick={getAllSelect}>
              <img src={sidebar_btn_all_select} />
              전체선택
            </button>
            <button className="sidebar_btn_none_select" value='0' onClick={getAllSelect}>
              <img
                src={sidebar_btn_none_select}
                alt="sidebar_btn_none_select"
              />
              선택해제
            </button>
          </div>

          <div className="sidebar_jumbo sidebar_jumbo_sale_data">
            <div className="sale_data">
              <p>구매 데이터</p>
            </div>
            <div className="checkbox_wrap" id="sp_check_box_radio_box">
              <input
                ref={validRef} 
                type="checkbox"
                name="data_valid"
                id="valid"
                value='1'
                onChange={setDataValidFilter}
              />
              <label className="checkbox_design" htmlFor="valid">
              사용가능
              </label>
            </div>
            <div className="checkbox_wrap" id="sp_check_box_radio_box">
              <input
                ref={invalidRef}
                type="checkbox"
                name="data_valid"
                id="notValid"
                value='0'
                onChange={setDataValidFilter}
              />
              <label className="checkbox_design" htmlFor="notValid">
              사용불가
              </label>
            </div>
          </div>
        


          <div className="sidebar_jumbo sidebar_jumbo_data_type sp_check_box_radio_box">
            <div className="sale_data">
              <p>데이터 유형</p>
            </div>
            <div className="checkbox_wrap" id="sp_check_box_radio_box">
              <input
                ref={datatype_d} 
                type="checkbox"
                name="data_type_check"
                id="data_type_data"
                value='D'
                onChange={setDataTypeFilter}
              />
              <label className="checkbox_design" htmlFor="data_type_data">
                데이터
              </label>
            </div>
            <div className="checkbox_wrap" id="sp_check_box_radio_box">
              <input
                ref={datatype_t}
                type="checkbox"
                name="data_type_check"
                id="data_type_statistics"
                value='T'
                onChange={setDataTypeFilter}
              />
              <label className="checkbox_design" htmlFor="data_type_statistics">
                통계
              </label>
            </div>
            <div className="checkbox_wrap" id="sp_check_box_radio_box">
              <input
                ref={datatype_m}
                type="checkbox"
                name="data_type_check"
                id="data_type_model"
                value='M'
                onChange={setDataTypeFilter}
              />
              <label className="checkbox_design" htmlFor="data_type_model">
                모델
              </label>
            </div>
            <div className="checkbox_wrap" id="sp_check_box_radio_box">
              <input
                ref={datatype_r}
                type="checkbox"
                name="data_type_check"
                id="data_type_report"
                value='R'
                onChange={setDataTypeFilter}
              />
              <label className="checkbox_design" htmlFor="data_type_report">
                리포트
              </label>
            </div>
          </div>
        </div>

        <div className="purchase_create_data_list_pagination">
          <Pagination  
            ttlRowsCnt={ttlRowsCnt} 
            currPage={currPage} 
            setCurrPage={setCurrPage} 
            contentNumPerPage={contentNumPerPage} 
            setReRend={setReRend}
          />
        </div>
      </div>
    </React.Fragment>
  );


};

export default purchase_create_data_list_data;
