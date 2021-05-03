import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Table_middle from "../../../../../func_src/Table_middle";
import Api_use_approved_mang_popup from "../../../popup/Popup_servciecenter_Management/Api_use_approved_mang_admin_compain";
import Approved_result_contents_popup from "../../../popup/Popup_datacenter_Management/Approved_result_popup_admin";
import { Link } from "react-router-dom";
import Sales_Service_management from "../../Sales_Service_management";
import axios from "axios";
import DayView from "@y0c/react-datepicker/lib/components/DayView";
import Api_use_approved_mang_Alm from "../../../popup/Popup_servciecenter_Management/Api_use_approved_mang_Alm";
import Api_use_appr_alm_table from "./Api_use_appr_alm_table";
import { Page_nation_post } from "../../../../../func_src/Gaci_page_nation";
import { Roo_pagenation } from "../../../../../Root_component/Post_pagenation";
import Pagenations from "../../../../../Root_component/Post_pagenation";
import { Server_ajax_get } from "../../../../../Server_ajax";

const Api_use_approved_management_table = () => {
  const [data_end, setData_end] = useState(false);
  const [use_api_appr_admin, setUse_api_appr_admin] = useState([]); //전체 게시물
  const [true_api_list, setTrue_api_list] = useState([]); //체크를 한애만
  const [search_api_list, setSearch_api_list] = useState([]); //검색 게시물
  const [search_api_yn, setSearch_api_yn] = useState(false); //검색 했을때 true 안했을때 false

  const [api_page_nations, setApi_page_nations] = useState(1);
  const [use_api_pagenation_list, setUse_api_pagenation_list] = useState([]); //전체 게시글의 페이지네이션
  const [
    search_use_api_pagenation_list,
    setSearch_use_api_pagenation_list,
  ] = useState([]); //검색 게시글의 페이지네이션
  const [page_list_num, setPage_list_num] = useState(10);

  const api_admin = useRef([]);
  const appr_stat = useRef();
  const list_appr = useRef();
  const date_appr = useRef();

  useEffect(() => {
    (async function () {
      try {
        const axios_host = await Server_ajax_get(
          "service_center_managment/svc_use_api_managment"
        );
        setUse_api_appr_admin(axios_host);
        Appr_state_change();
        setData_end(true);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, [data_end]);

  useEffect(() => {
    setUse_api_pagenation_list([]);
    if (search_api_yn === false && data_end === true) {
      Page_nation_post(
        page_list_num,
        api_page_nations,
        use_api_appr_admin,
        setUse_api_pagenation_list,
        use_api_pagenation_list
      );
    }
  }, [data_end, search_api_yn, use_api_appr_admin, api_page_nations]);

  useEffect(() => {
    setSearch_use_api_pagenation_list([]);
    if (search_api_yn === true && data_end === true) {
      Page_nation_post(
        page_list_num,
        api_page_nations,
        search_api_list,
        setSearch_use_api_pagenation_list,
        search_use_api_pagenation_list
      );
    }
  }, [data_end, search_api_yn, search_api_list, api_page_nations]);

  useEffect(() => {
    api_admin.current.filter((item) => {
        return item !== null; //검색했을때 초기화
      }).map((result) => {
        result.checked = false;
      });
  }, [search_api_list, search_api_yn]);

  const Appr_state_change = useCallback(() => {
    setApi_page_nations(1);
    setTrue_api_list([]);
    setSearch_api_yn(true);

    let sele_value = appr_stat.current.value; //ref를 지역변수를 쓰면 복사가 됨

    if (sele_value === "승인상태 선택") return setSearch_api_yn(false);
    else if (sele_value === "승인요청") sele_value = 0;
    else if (sele_value === "승인") sele_value = 1;
    else if (sele_value === "반려") sele_value = 2;

    const search_api_list_post = use_api_appr_admin.filter((item) => {
      return item.stat === sele_value;
    });

    if (search_api_list_post.length === 0) {
      alert("API가 존재하지 않습니다.");
      return setSearch_api_yn(false);
    } else setSearch_api_list(search_api_list_post);
  }, [search_api_yn, search_api_list, use_api_appr_admin]);

  const same_date_post_search = useCallback((mess) => {
      if (search_api_yn === false) {
        if(use_api_appr_admin.length === 1) return; 
        else
        use_api_appr_admin.sort((a, b) => {
          setUse_api_appr_admin([]);
            return mess === "요청"
              ? new Date(b.req_dt) - new Date(a.req_dt)
              : new Date(b.res_dt) - new Date(a.res_dt);
          }).map((result) => {
            return setUse_api_appr_admin((use_api_appr_admin) => [ ...use_api_appr_admin, result]);
          });
      } else {
        if(search_api_list.length === 1) return; 
        else
        search_api_list.sort((a, b) => {
            setSearch_api_list([]);
            return mess === "요청"
              ? new Date(b.req_dt) - new Date(a.req_dt)
              : new Date(b.res_dt) - new Date(a.res_dt);
          })
          .map((result) => {
            return setSearch_api_list(search_api_list => [...search_api_list, result]);
          });
      }
    },[search_api_list, use_api_appr_admin, search_api_yn]);

  const date_post_search = useCallback(() => {
    let date_aprr_post = date_appr.current.value;
    if (date_aprr_post === "요청일 순") {
      same_date_post_search("요청");
    } else if (date_aprr_post === "승인일 순") {
      same_date_post_search("승인");
    }
  }, [search_api_yn, search_api_list]);

  const list_post_search = useCallback(() => {
    const list_appr_post = list_appr.current.value;
    setApi_page_nations(1);

    if (list_appr_post === "목록") return;
    else {
      setSearch_use_api_pagenation_list([]);
      setUse_api_pagenation_list([]);
      setPage_list_num(list_appr_post);

      search_api_yn === true
        ? Page_nation_post(
            Number(list_appr_post),
            api_page_nations,
            search_api_list,
            setSearch_use_api_pagenation_list,
            search_use_api_pagenation_list
          )
        : Page_nation_post(
            Number(list_appr_post),
            api_page_nations,
            use_api_appr_admin,
            setUse_api_pagenation_list,
            use_api_pagenation_list
          );
    }
  }, [
    page_list_num,
    use_api_pagenation_list,
    search_use_api_pagenation_list,
    search_api_yn,
    api_page_nations,
  ]);

  //-----------------------------

  const Same_api_appr = (none_table) => {
    new Promise((res, rej) => {
      true_api_list.filter((c) => {
        (c.stat === 1 || c.stat === 2) && res("stat_req_fail"); //상태가 승인 반려일때
      });
      res("stat_req_succ");
    }).then((result) => {
      if (result === "stat_req_fail") {
        return alert("이미 신청 또한 반려된 API가 포함되어 있습니다.");
      } else {
        if (true_api_list.length === 0) {
          return alert("API를 선택해 주세요.");
        } else {
          none_table.style.display = "table";
        }
      }
    });
  };

  const api_admin_poup_req_appr = useCallback(() => {
    //반려
    const Admin_user_api_approved_mangUse_popup_comapin_bgk = document.getElementById(
      "Admin_user_api_approved_mangUse_popup_comapin_bgk"
    );
    Same_api_appr(Admin_user_api_approved_mangUse_popup_comapin_bgk);
  }, [true_api_list]);

  const api_admin_popup_req_compain = useCallback(() => {
    //승인
    const Admin_user_api_approved_mangUse_popup_bgk = document.getElementById(
      "Admin_user_api_approved_mangUse_popup_bgk"
    );
    Same_api_appr(Admin_user_api_approved_mangUse_popup_bgk);
  }, [true_api_list]);

  useEffect(() => {
    api_admin.current.filter((item) => {
        return item !== null;
      }).map((c) => {
        const id = String(c.id).substring(6);
        true_api_list.map((result) => {
          if (result.svcapi_idx === Number(id)) {
            c.checked = true;
          }
        });
      });
  }, [use_api_pagenation_list, search_use_api_pagenation_list]);

  const individual_checked = useCallback((amdin_api_info, admin_api_index) => () => {
      if (api_admin.current[admin_api_index].checked === true) { 
        setTrue_api_list((true_api_list) => [...true_api_list, amdin_api_info]);
      } else if (api_admin.current[admin_api_index].checked === false) {
        true_api_list.filter((item) => {
            return item.svcapi_idx === amdin_api_info.svcapi_idx;
          }).map((result) => {
            setTrue_api_list(
              true_api_list.splice(
                true_api_list.splice(true_api_list.indexOf(result), 1)
              )
            );
          });
      }
    },[api_admin, true_api_list, search_api_list]);

  const Not_in_stat = (message) => () => {
    alert(message);
  };

  return (
    <React.Fragment>
      <Api_use_approved_mang_Alm
        Ack_not_Companion_data={true_api_list}
        Ack_not_Companion_data_func={setTrue_api_list}
        Checked_all={api_admin.current}
        Data_end_func={setData_end}
      />
      <Api_use_approved_mang_popup
        Ack_Companion_data={true_api_list}
        Ack_not_Companion_data_func={setTrue_api_list}
        Checked_all={api_admin.current}
        Data_end_func={setData_end}
      />
      <div className="backoffice_table_wrap sp_use_approved_wrap_box">
        <Table responsive>
          <caption className="tb_caption">
            <div className="caption_title bold_none">
              [총 <p className="number_data">{use_api_appr_admin.length}</p>건 ]
              검색결과
              <p className="number_data">
                {search_api_yn === false ? use_api_appr_admin.length : search_api_list.length}
              </p>
              건
            </div>
            <div className="tb_select_wrap">
              <button onClick={api_admin_poup_req_appr}>승인</button>
              <button onClick={api_admin_popup_req_compain}>반려</button>
              <Form.Control
                as="select"
                className="table_select tb_select"
                onChange={Appr_state_change}
                ref={appr_stat}
              >
                <option>승인상태 선택</option>
                <option>승인요청</option>
                <option>반려</option>
                <option>승인</option>
              </Form.Control>
              <Form.Control
                as="select"
                className="table_select tb_select"
                onChange={date_post_search}
                ref={date_appr}
              >
                <option>요청일 순</option>
                <option>승인일 순</option>
              </Form.Control>
              <Form.Control
                as="select"
                className="list_select tb_select"
                onChange={list_post_search}
                ref={list_appr}
              >
                <option>목록</option>
                <option>10</option>
                <option>20</option>
                <option>30</option>
              </Form.Control>
            </div>
          </caption>
          <thead>
            <tr>
              <th>회원명/아이디</th>
              <th>서비스 제목</th>
              <th>사용신청 API</th>
              <th>선택</th>
              <th>서비스 상태</th>
              <th>API 상태</th>
              <th>요청일</th>
              <th>승인일</th>
              <th>승인 관리자</th>
            </tr>
          </thead>
          <tbody>
            {search_api_yn === false
              ? use_api_pagenation_list.map((api_service, api_service_idx) => {
                  return (
                    <Api_use_appr_alm_table
                      key={api_service_idx}
                      Api_service_info={api_service}
                      Api_sercie_idx_info={api_service_idx}
                      Api_checked_func={individual_checked}
                      Api_not_in_api_func={Not_in_stat}
                      Api_checked_ref={api_admin}
                      Api_true_list={true_api_list}
                    />
                  );
                })
              : search_use_api_pagenation_list.map(
                  (api_service, api_service_idx) => {
                    return (
                      <Api_use_appr_alm_table
                        key={api_service_idx}
                        Api_service_info={api_service}
                        Api_sercie_idx_info={api_service_idx}
                        Api_checked_func={individual_checked}
                        Api_not_in_api_func={Not_in_stat}
                        Api_checked_ref={api_admin}
                      />
                    );
                  }
                )}
          </tbody>
        </Table>
      </div>
      {search_api_yn === false
        ? Roo_pagenation(
            page_list_num,
            use_api_appr_admin, //전체 게시글
            use_api_pagenation_list, //페이지 네이션 게시글
            setUse_api_pagenation_list, //페이지 네이션 게시글 func
            api_page_nations, //현재 페이션 네이션
            setApi_page_nations, //현재 페이지 네이션 함수
            false,
            null
          )
        : Roo_pagenation(
            page_list_num,
            search_api_list, //전체 게시글
            search_use_api_pagenation_list, //페이지 네이션 게시글
            setSearch_use_api_pagenation_list, //페이지 네이션 게시글 func
            api_page_nations, //현재 페이션 네이션
            setApi_page_nations, //현재 페이지 네이션 함수
            false,
            null
          )}
      <Pagenations />
    </React.Fragment>
  );
};

export default Api_use_approved_management_table;
