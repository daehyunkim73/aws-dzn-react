import React, { useEffect, useState, useRef, useCallback } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Table_middle from "../../../../../func_src/Table_middle";
import { Link, useHistory } from "react-router-dom";
import Pagenations, { Roo_pagenation } from "../../../../../Root_component/Post_pagenation";
import { Page_nation_post } from "../../../../../func_src/Gaci_page_nation";
import Pagination from "../../components/Pagination";
import { useUserInfo } from "../../../../Big_component/Admin_router";


const User_info_Table = (props) => {
  const history = useHistory();
  const {setSelectUserInfo, setCalculateTabVal} = useUserInfo();
  const {
    setReRenderStatus,
    certPubList,
    ttlCnt,
    setContentNumPerPage,
    srchResultCnt,
    
    mbrType,
    joinDtOrderGbn,
    pageListNum,
    setMbrType,
    setJoinDtOrderGbn,
    setPageListNum,

    // ttlRowsCnt,
    // currPage,
    // setCurrPage,
    // contentNumPerPage,
    // setReRend,
  } = props;


  // const [mbrType, setMbrType] = useState('');           // 구분
  // const [joinDtOrderGbn, setJoinDtOrderGbn] = useState('');   // 가입일자 순서
  // const [pageListNum, setPageListNum] = useState(50);   // 목록 노출 개수
  const [radioChked, setRadioChked] = useState('');



  useEffect(() => {
    Table_middle();
    return () => {
      Table_middle();
    };
  }, []);


  // 구분 변경 이벤트
  const typeChange = (e) => {
    const value = e.target.value;
    setMbrType(() => value);
  }

  // 승인상태 변경 이벤트
  const joinDtOrderGbnChange = (e) => {
    const value = e.target.value;    
    setJoinDtOrderGbn(() => value);    
  }

  const listChange = (e) => {
    const cnt = e.target.value;
    setPageListNum(Number(cnt));
    setContentNumPerPage(Number(cnt))
  }

  const handleMbrIdxSelect = (e) => {
    console.log(e.target.value);
    setRadioChked(e.target.value);
  }

  // 선택회원 정산 등록
  const CalculateSelectUserAdd = () => {
    document.querySelectorAll('.User_info_table_radio_btn').forEach((el, index) => {
      if(el.checked === true){
        setSelectUserInfo([{id: certPubList[el.value].id, comp_id: certPubList[el.value].comp_no}]);
        setCalculateTabVal("sale");
        history.push("/admin/calculate");
      }
    });
  
  }


  return (
    <React.Fragment>
      <div className="backoffice_table_wrap">
        <Table responsive>
          <caption className="tb_caption">
            <div className="caption_title bold_none">
            [총 <p className="number_data">{ttlCnt}</p>건 ] 검색결과 
              <p className="number_data">{srchResultCnt}</p>건
            </div>
            <div className="tb_select_wrap">
              <button onClick={CalculateSelectUserAdd}>선택 회원 정산 등록</button>
              <Form.Control as="select" id="type_select" className="table_select tb_select" value={mbrType} onChange={typeChange}>
                <option value=''>회원유형 전체</option>
                <option value='0'>기업무료</option>
                <option value='1'>기업유료</option>                
                <option value='2'>센터사업자</option>                
                <option value='3'>개인무료</option>                
                <option value='4'>개인유료</option>                
              </Form.Control>
              <Form.Control as="select" className="table_select tb_select" value={joinDtOrderGbn}  onChange={joinDtOrderGbnChange}>
                <option value=''>일자구분 선택</option>
                <option value='0'>가입일 순</option>
                <option value='1'>최근 접속일</option>             
              </Form.Control>
              <Form.Control as="select" defaultValue='2' className="list_select tb_select" value={pageListNum} onChange={listChange}>
                <option value='2'>목록 2</option> {/*기본 값*/}
                <option value='4'>목록 4</option>
                <option value='10'>목록 10</option>
                <option value='30'>목록 30</option>
                <option value='50'>목록 50</option>  
                <option value='70'>목록 70</option>
                <option value='100'>목록 100</option>                
              </Form.Control>

            </div>
          </caption>
          <thead>
            <tr>
              <th></th>
              <th>회원 유형</th>
              <th className="table_min_w">회원명</th>
              <th>아이디</th>
              <th>핸드폰</th>
              <th>가입일</th>
              <th>최근 접속일</th>
              <th>데이터 판매</th>
              <th>서비스 판매</th>
            </tr>
          </thead>
          <tbody>

          {
            certPubList && certPubList.map((item, idx) => {
              const checked_v = item.mbrIdx === radioChked ? true : false;
              return (
                <tr key={idx}>
                  <td>
                    <div className="radio_inputButton_box">
                      <input
                        type="radio"
                        id={`back_radio_one-${idx}`}
                        name="User_info_table_radio"
                        className="User_info_table_radio_btn"
                        value={idx}
                        onClick={handleMbrIdxSelect}
                      />
                      <label htmlFor={`back_radio_one-${idx}`}></label>
                    </div>
                  </td>
                  <td>{item.mbrType}</td>
                  <td>
                    <Link className="link_style_text" to={"/admin/userinfo/detail"}>
                      <span className="table_href">{item.mbrName}</span>{item.mbrIdx}
                    </Link>
                  </td>
                  <td>
                    <Link className="link_style_text" to={"/admin/userinfo/detail"}>
                      <span className="table_href">{item.id}</span>
                    </Link>
                  </td>
                  <td>{item.hp}</td>
                  <td>{item.joinDt}</td>
                  <td>{item.currLogDt}</td>
                  <td className="table_number">{item.dataSaleCnt}</td>
                  <td className="table_number">{item.svcSaleCnt}</td>
                </tr>
              )
            })
          }

          </tbody>
        </Table>


        {/* <Pagination 
          ttlRowsCnt={ttlRowsCnt}
          currPage={currPage}
          setCurrPage={setCurrPage}
          contentNumPerPage={contentNumPerPage}
          setReRend={setReRend}
        /> */}
      </div>
    </React.Fragment>
  );
};

export default User_info_Table;
