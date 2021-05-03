import React, {
  useCallback,
  useState,
  useContext,
  createContext,
  useRef,
} from "react";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Service_Sales_info_exposure_info from "./Service_Sales_info_exposure_info";
import Service_Sales_info_product_img from "./Service_Sales_info_product_img";
import Service_Sales_info_payment_info from "./Service_Sales_info_payment_info";
import Approved_Request_popup from "../../popup/Small_popup/Data_Approved_Request_popup";
import Service_basic_info from "./Service_basic_info";
import Api_request from "./Api_request";
import Api_using from "./Api_using";
import Infra_service from "./infra_service";
import view_more from "../../../image/Center/Dashboard/view_more.png";
import Not_img from "../../../image/Service_Center/Service_product/Not_img.png";
import title_list_icon from "../../../image/Center/List_icon/title_list_icon.png";
import { useUsageInfo } from "../../Center/Service_center_router";

import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { SalseSaveBtn } from "../../../src/Image_Preview";
import Judge from "../../Service_center/service_product_detail_management_sale_judge/sale_judge";
import Sales_management from "../service_product_detail_management_sale_management/Sales_management";

import { Server_ajax_get, Server_ajax_post } from "../../../server_ajax";

import Test from "../../Root_component/Date_search";

const ServiceSalesContext = createContext();

const Service_product_detail_management = (props) => {
  const serviceID = props.match.params.serviceID;
  const [SvrData, setSvrData] = useState([]);
  const [svr_yn_stat, setSvr_yn_stat] = useState(false);
  const [svr_info_stat, setSvr_info_stat] = useState(false);
  const [SvrData_posts, setSvrData_posts] = useState([]);
  const [save_logic, setSave_logic] = useState(false);
  const [save_logic2, setSave_logic2] = useState(false);
  const [dataSave, setDataSave] = useState([]);
  const [saveLogic, setSaveLogic] = useState(false);
  const [infraLogic, setInfraLogic] = useState(false);
  const [apprvLogic, setApprvLogic] = useState(false);
  const [svcName, setSvcName] = useState("");
  // 김용민

  const [imgFormData, setImgFormData] = useState([]); //이미지 FormData
  const [previewImgArray, setPreviewImgArray] = useState({
    Sales_img_1: {
      sc_name: undefined,
      sc_path: undefined,
      sc_title: undefined,
      sc_content: undefined,
    },
    Sales_img_2: {
      sc_name: undefined,
      sc_path: undefined,
      sc_title: undefined,
      sc_content: undefined,
    },
    Sales_img_3: {
      sc_name: undefined,
      sc_path: undefined,
      sc_title: undefined,
      sc_content: undefined,
    },
    Sales_img_4: {
      sc_name: undefined,
      sc_path: undefined,
      sc_title: undefined,
      sc_content: undefined,
    },
    Sales_img_5: {
      sc_name: undefined,
      sc_path: undefined,
      sc_title: undefined,
      sc_content: undefined,
    },
  }); //스크린샷 이미지 값 저장

  const [iconImgFormData, setIconImgFormData] = useState([]); //아이콘 이미지 FormData
  const [iconPreviewImgArray, setIconPreviewImgArray] = useState(); //아이콘 이미지 값 저장

  const [fileDataForm, setFileDataForm] = useState(); // 스크린샷 이미지 파일 폼 데이터형식
  const [iconFileDataForm, setIconFileDataForm] = useState(); // 아이콘 이미지 파일 폼 데이터형식

  //Logic
  const [saleLoad, setSaleLoad] = useState(false); // DB에 저장되어 있는 판매정보 값을 불러오면 true로 변경됨
  const [reRend, setReRend] = useState(false); // DB에 저장되어 있는 값을 불러오면 true로 변경됨
  const [imgLogic, setImgLogic] = useState(false);
  const [saveBtnLogic, setSaveBtnLogic] = useState(false);

  const [show_gbn, setShow_gbn_svc] = useState("N"); //노출여부: 노출 = Y, 비노출 = N
  const [show_dt, setShow_dt] = useState(""); // 노출개시일자
  const [simple_desc, setSimple_desc] = useState(""); // 간략설명
  const [svc_intro, setSvc_intro] = useState(""); // 서비스 소개
  const [main_func, setMain_func] = useState(""); // 주요기능
  const [svc_cate, setSvc_cate] = useState("카테고리 선택"); // 카테고리 설정
  const [keyword, setKeyword] = useState(""); // 키워드 설정
  const [svc_icon_1, setSvc_icon_1] = useState([]); // 서비스 아이콘 ( 이미지명, 이미지주소)

  const [pay_type, setPay_type] = useState(1); // 결제방식 (무료 = 0 / 유료 = 1)
  const [pay_cate_state, setPay_cate_state] = useState(0); // 유료결제 방법 (요금제 = 0, 라이선스 = 1)
  const [pay_point_state, setPay_point_state] = useState(); // 포인트 사용여부 (사용 = 0, 사용안함 = 1)
  const [paid_payment_price, setPaid_payment_price] = useState(""); // 요금제 방식 과금 (가격)

  const [svc_pay_lic_array, setSvc_pay_lic_array] = useState([]); // 라이선스 방식 사용자수 제한
  const [svc_pay_lic_data_array, setSvc_pay_lic_data_array] = useState([]); // 라이선스 방식 사용자수 제한

  const [svc_pay_lic_personnel, setSvc_pay_lic_personnel] = useState(""); // 라이선스 방식 사용자수 제한
  const [svc_pay_lic_price, setSvc_pay_lic_price] = useState(""); // 라이선스 방식 매월 과금 (가격)

  const [pay_notice, setPay_notice] = useState(""); // 과금 유의사항

  const [view_cnt, setView_cnt] = useState(""); // 조회수
  const [regDt, setRegDt] = useState(""); // 올린 시간
  const [uptDt, setUptDt] = useState(""); // 업데이트 시간

  const [ev_target, setEv_target] = useState(""); // 스크린샷 이미지 클릭 시 e.target.name 값 저장
  const [imgFileName, setImgFileName] = useState(""); // 스크린샷 이미지 파일명 저장

  const [requestApprovalEvt, setRequestApprovalEvt] = useState(false); // 승인(판매) 요청하기 클릭 이벤트
  const [saveValidState, setSaveValidState] = useState(false); // 승인(판매) 요청하기 유효성검사 통과 여부
  const [svcCateState, setSvcCateState] = useState(false); // 카테고리 값 호출 상태
  const [svcSaleCateList, setSaleSvcCateList] = useState(false); // 카테고리 설정 목록 리스트

  const [service_pop_yn_state, setService_pop_yn_state] = useState(false); // 주호꺼
  const [use_api_list, setUse_api_list] = useState([]); //사용 API 배열
  const [cate_list, setCate_list] = useState();

  // 노출정보 useRef
  const simple_desc_ref = useRef(); // 서비스 간략 설명
  const svc_intro_ref = useRef(); // 서비스 소개
  const main_func_ref = useRef(); // 주요기능
  const keyword_ref = useRef(); // 키워드 설정

  // 결제정보 useRef
  const svc_pay_cate_ref = useRef(); // 요금제 방식 과금
  const svc_pay_lic_array_ref = useRef([]); // 라이선스 방식
  const svc_pay_lic_personnel_ref = useRef([]); // 라이선스 방식 인원
  const svc_pay_lic_price_ref = useRef([]); // 라이선스 방식 매월 과금

  const svc_pay_notice_ref = useRef(); // 과금 유의사항

  //
  const [svcGbnState, setSvcGbnState] = useState(false); // 판매정보 노출함 노출안함 현재 state값

  // 김용민 끝

  const history = useHistory();

  const moveProduct = (e) => {
    if (e.target.value !== "default") {
      history.push(`/svccenter/saleproduct/control/${e.target.value}`);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const service_by_id = await Server_ajax_get(
          `svccenter/product/control/service_by_id?id=${serviceID}`
        );
        setSvrData(service_by_id);
        setDataSave(service_by_id);
        setSaveLogic(true);
        setSvr_yn_stat(true);
      } catch (e) {
        return console.error(e);
      }
    })();
    setSvr_yn_stat(false);
    setSaveLogic(false);
    setSvcGbnState(false);
  }, [
    serviceID,
    svr_info_stat === true,
    svcGbnState === true,
    apprvLogic === true,
  ]);
  useEffect(() => {
    saveLogic && setSvcName(SvrData[0].svc_title);
  }, [saveLogic]);

  useEffect(() => {
    (async function () {
      try {
        const Service_product_list_sale = await Server_ajax_get(
          `svccenter/Service_product_list_sale`
        );
        setSvrData_posts(Service_product_list_sale);
        setSave_logic(false);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, [save_logic === true]);

  const Aprroved_popup = useCallback(() => {
    const Data_Approved_Request_popup_bgk = document.getElementById(
      "Data_Approved_Request_popup_bgk"
    );
    Data_Approved_Request_popup_bgk.style.display = "table";
  }, []);

  const {
    usageInfoFirst,
    setUsageInfoFirst,
    salesReqVal,
    setSalesReqVal,
    salesApiTabReqVal,
    setSalesApiTabReqVal,
    apiUsingBtnEvt,
    setApiUsingBtnEvt,
  } = useUsageInfo();

  useEffect(() => {
    setUsageInfoFirst(false);
  });

  // // 김용민

  // 판매정보에 저장된 DB에 값을 불러온 후 값을 넣어 뿌려주는 기능 1
  useEffect(() => {
    let data = {
      pdsvc_idx: serviceID,
    };
    (async function () {
      try {
        const getDataSaleInfo = await Server_ajax_post(
          "svccenter/getDataSaleInfo",
          data
        );
        if (Array.isArray(getDataSaleInfo) && getDataSaleInfo.length) {
          setPreviewImgArray((previewImgArray) => getDataSaleInfo);
        }
        setSaleLoad(true);
      } catch (e) {
        return console.error(e);
      }
    })();
    setSaleLoad(false);
    setReRend(false);
  }, [reRend === true, serviceID]); // 데이터가 모두 불러와졌을때 useEffect 실행

  // 판매정보에 저장된 DB에 값을 불러온 후 값을 넣어 뿌려주는 기능 2
  // 1에서 값이 모두 들어갔을때 값이 변경되면 실행
  useEffect(() => {
    if (
      previewImgArray[0] ||
      previewImgArray[1] ||
      previewImgArray[2] ||
      previewImgArray[3] ||
      previewImgArray[4]
    ) {
      // 스크린샷 이미지, 파일명, 제목, 설명 저장
      setPreviewImgArray({
        Sales_img_1: {
          scrsht_file: previewImgArray[0].scrsht_file,
          file_path: previewImgArray[0].file_path,
          scrsht_title: previewImgArray[0].scrsht_title,
          scrsht_desc: previewImgArray[0].scrsht_desc,
        },
        Sales_img_2: {
          scrsht_file: previewImgArray[1].scrsht_file,
          file_path: previewImgArray[1].file_path,
          scrsht_title: previewImgArray[1].scrsht_title,
          scrsht_desc: previewImgArray[1].scrsht_desc,
        },
        Sales_img_3: {
          scrsht_file: previewImgArray[2].scrsht_file,
          file_path: previewImgArray[2].file_path,
          scrsht_title: previewImgArray[2].scrsht_title,
          scrsht_desc: previewImgArray[2].scrsht_desc,
        },
        Sales_img_4: {
          scrsht_file: previewImgArray[3].scrsht_file,
          file_path: previewImgArray[3].file_path,
          scrsht_title: previewImgArray[3].scrsht_title,
          scrsht_desc: previewImgArray[3].scrsht_desc,
        },
        Sales_img_5: {
          scrsht_file: previewImgArray[4].scrsht_file,
          file_path: previewImgArray[4].file_path,
          scrsht_title: previewImgArray[4].scrsht_title,
          scrsht_desc: previewImgArray[4].scrsht_desc,
        },
      });
      // 서비스 아이콘 이미지 파일, 파일명 저장
      setIconPreviewImgArray({
        Icon_img_file: {
          sc_name: previewImgArray[0].svc_icon_1,
          sc_path: previewImgArray[0].svc_icon_path_1,
        },
      });

      setSimple_desc(previewImgArray[0].simple_desc); // 서비스 간략설명
      setSvc_intro(previewImgArray[0].svc_intro); // 서비스 소개
      setMain_func(previewImgArray[0].main_func); // 주요기능
      setSvc_cate(previewImgArray[0].svc_cate); // 카테고리 설정
      setKeyword(previewImgArray[0].keyword); // 키워드 설정
      setSvc_pay_lic_personnel(previewImgArray[0].lic_user_limit); // 라이선스 방식 사용자수 제한
      setSvc_pay_lic_price(previewImgArray[0].lic_mnthly_chrgeAmnt); // 라이선스 방식 매월 과금

      setPay_notice(previewImgArray[0].pay_notice); // 과금 유의사항
      setPaid_payment_price(previewImgArray[0].paid_payment_price);

      setPay_type(previewImgArray[0].pay_type); // 결제 방식 (무료, 유료)
      setPay_cate_state(previewImgArray[0].paid_payment_gbn); // 유료결제 방식 ( 요금제, 라이선스 방식)
      setPay_point_state(previewImgArray[0].point_gbn); // 포인트 사용여부 ( 사용, 사용안함)

      // setView_cnt(previewImgArray[0].view_cnt); //조회수
      // setRegDt(previewImgArray[0].regDt); // 올린 날짜
      // setUptDt(previewImgArray[0].uptDt);

      setShow_gbn_svc(previewImgArray[0].show_gbn); // 스토어 노출 설정
      setImgLogic(true); // 이미지가 받아와졌느지 확인하는 로직
    }
  }, [previewImgArray]);

  // 판매정보 카테고리
  useEffect(() => {
    let data = {
      pdsvc_idx: serviceID,
    };

    (async function () {
      try {
        const getSvcGbnCate = await Server_ajax_post(
          "svccenter/getSvcGbnCate",
          data
        );
        setSaleSvcCateList((svcSaleCateList) => [
          svcSaleCateList,
          getSvcGbnCate,
        ]);
        setSvcCateState(true);
      } catch (e) {
        return console.error(e);
      }
    })();
    setSvcCateState(false);
  }, []);

  // 판매정보에 써있는 정보들을 모두 datas에 담아서 Router로 보내어 처리 후 DB 저장
  const DataSaveFun = () => {
    let datas = {
      pdsvc_idx: serviceID,
      show_gbn: show_gbn,
      simple_desc: simple_desc_ref.current.value,
      svc_intro: svc_intro_ref.current.value,
      main_func: main_func_ref.current.value,
      svc_cate: svc_cate !== "카테고리 선택" ? svc_cate : null,
      keyword: keyword_ref.current.value,
      svc_icon_1: iconPreviewImgArray
        ? iconPreviewImgArray.Icon_img_file.sc_name
        : null,
      svc_icon_path_1: iconPreviewImgArray
        ? iconPreviewImgArray.Icon_img_file.sc_path
        : null,
      show_dt: new Date().toISOString().slice(0, 10).replace(/-/g, ""),
      data: previewImgArray, //스크린샷 이미지

      pay_type: pay_type,
      paid_payment_gbn: pay_type === 1 ? pay_cate_state : null,
      point_gbn: pay_point_state,
      paid_payment_price:
        pay_cate_state === 0 ? svc_pay_cate_ref.current.value : null,
      pay_notice: svc_pay_notice_ref.current.value,
      lic_data_array: pay_cate_state === 1 ? svc_pay_lic_data_array : null,
    };

    (async function () {
      try {
        const option = { contextType: "application/json" };

        await Server_ajax_post("svccenter/saleInfo_regInsert", datas, option);
        setReRend(true);
      } catch (e) {
        return console.error(e);
      }
    })();
  };

  // 판매정보 저장하기 & 승인 요청하기
  const svcSalesSaveBtn = (e) => {
    // 제작 중이거나 심사반려일 경우 실행
    if (SvrData[0].stat !== 2 && SvrData[0].stat !== 3) {
      if (pay_type === 1) {
        setSvc_pay_lic_data_array([]);
        svc_pay_lic_array.map((item, idx) => {
          // 결제정보 라이선스 방식 사용자수 제한, 매월 과금 값을 배열로 저장
          setSvc_pay_lic_data_array((svc_pay_lic_data_array) => [
            ...svc_pay_lic_data_array,
            {
              lic_personnel: svc_pay_lic_personnel_ref.current[idx].value,
              lic_price: svc_pay_lic_price_ref.current[idx].value,
            },
          ]);
        });
      }
      // requestApprovalBtn = 승인 요청하기 버튼 id 값
      if (e.target.id === "requestApprovalBtn") {
        setRequestApprovalEvt(true);
      }
      setSaveBtnLogic(true); //판매정보 승인(판매) 요청하기 버튼 클릭 시 true로 변경되며 (판매정보 저장하기 & 승인 요청하기 구분 useEffect)  실행
      SalseSaveBtn("svc_sc_title", "svc_sc_content", previewImgArray);
    } else {
      setSalesReqVal("judge"); // 심사중이거나 승인되었을 경우 승인심사 페이지로 이동
    }
  };

  useEffect(() => {
    if (saveBtnLogic === true) {
      //판매정보 저장하기
      if (requestApprovalEvt === true) {
        //판매정보 승인(판매) 요청하기 버튼
        setRequestApprovalEvt(false); // 초기값으로 변경
        svcSalesRequestBtn(); // 판매정보 승인 요청하기 유효성 검사
      } else {
        DataSaveFun(); //저장 기능
        alert("저장되었습니다.");
      }
      setSaveBtnLogic(false);
    }
  }, [svc_pay_lic_data_array && saveBtnLogic === true]);

  // 판매정보 승인 요청하기 유효성 검사
  const svcSalesRequestBtn = () => {
    if (
      simple_desc_ref.current.value === "" ||
      !simple_desc_ref.current.value ||
      !simple_desc_ref.current.value.trim()
    ) {
      alert("서비스 간략 설명을 입력해주세요.");
    } else if (
      svc_intro_ref.current.value === "" ||
      !svc_intro_ref.current.value ||
      !svc_intro_ref.current.value.trim()
    ) {
      alert("서비스 소개를 입력해주세요.");
    } else if (
      main_func_ref.current.value === "" ||
      !main_func_ref.current.value ||
      !main_func_ref.current.value.trim()
    ) {
      alert("주요기능을 입력해주세요.");
    } else if (svc_cate === "카테고리 선택") {
      alert("카테고리를 선택해주세요.");
    } else if (
      keyword_ref.current.value === "" ||
      !keyword_ref.current.value ||
      !keyword_ref.current.value.trim()
    ) {
      alert("키워드 설정을 입력해주세요.");
    }
    // 0923 리뷰로 인한 주석 ( 이미지 오류 해결 시 주석 해제 )
    // else if (
    //   iconPreviewImgArray.Icon_img_file.sc_path === "" ||
    //   !iconPreviewImgArray.Icon_img_file.sc_name
    // ) {
    //   alert("서비스 아이콘을 추가해주세요.");
    // } else if (
    //   !previewImgArray.Sales_img_1.file_path &&
    //   !previewImgArray.Sales_img_2.file_path &&
    //   !previewImgArray.Sales_img_3.file_path &&
    //   !previewImgArray.Sales_img_4.file_path &&
    //   !previewImgArray.Sales_img_5.file_path
    // ) {
    //   alert("스크린샷 이미지를 1개 이상 추가해주세요.");
    // }
    else if (pay_type === "" || pay_type === undefined || pay_type === null) {
      alert("결제방식을 선택해주세요.");
    } else if (
      (pay_cate_state === "" && pay_type === 1) ||
      (pay_cate_state === undefined && pay_type === 1) ||
      (pay_cate_state === null && pay_type === 1)
    ) {
      alert("유료결제 방법을 선택해주세요.");
    } else if (pay_cate_state === 0 && pay_type === 1) {
      if (
        svc_pay_cate_ref.current.value === "" ||
        svc_pay_cate_ref.current.value === undefined ||
        svc_pay_cate_ref.current.value === null
      ) {
        alert("요금제 방식의 과금정보를 입력해주세요.");
      } else {
        setSaveValidState(true); // 유효성 검사 통과 시 true로 변경
      }
    } else if (pay_cate_state === 1 && pay_type === 1) {
      svc_pay_lic_data_array.map((i, c) => {
        if (i.lic_personnel === "" || i.lic_personnel === undefined) {
          alert("라이선스 방식의 사용자수 제한을 입력해주세요.");
        } else if (i.lic_price === "" || i.lic_price === undefined) {
          alert("라이선스 방식의 매월 과금액을 입력해주세요.");
        } else {
          setSaveValidState(true); // 유효성 검사 통과 시 true로 변경
        }
      });
    } else if (
      (pay_point_state === "",
      pay_point_state === undefined,
      pay_point_state === null)
    ) {
      alert("포인트 사용여부를 선택해주세요.");
    } else {
      setSaveValidState(true); // 유효성 검사 통과 시 true로 변경
    }
  };

  // 유효성 검사 통과 후 실행되는 기능
  useEffect(() => {
    if (saveValidState === true) {
      setSaveValidState(false); // 초기값으로 전환
      DataSaveFun(); // 데이터 저장 기능 실행
      setSalesReqVal("judge"); // 승인심사 탭 메뉴로 이동
    }
  }, [saveValidState === true]);

  useEffect(() => {
    (async function () {
      try {
        const use_api_list = await Server_ajax_get(`svccenter/use_api_list`);
        setUse_api_list(use_api_list);
      } catch (e) {
        return console.error(e);
      }
    })();

    (async function () {
      try {
        const cate_list = await Server_ajax_get(`svccenter/cate_list`);
        setCate_list(cate_list);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, [service_pop_yn_state === true]);

  useEffect(() => {
    if (apiUsingBtnEvt !== true) {
      setSalesReqVal("basic");
      setSalesApiTabReqVal("api_request");
    } else {
      setApiUsingBtnEvt(false);
    }
  }, []);

  //탭 클릭 시 event 값 받아서 이동
  const salesReqValEvt = (e) => {
    setSalesReqVal(e);
  };

  //api 사용 안에 탭 클릭시 event 값 받아서 이동
  const salesApiTabReqValEvt = (e) => {
    setSalesApiTabReqVal(e);
  };

  // // 김용민 끝

  return (
    <React.Fragment>
      <Approved_Request_popup />
      <ServiceSalesContext.Provider
        value={{
          imgFormData,
          setImgFormData,

          iconImgFormData,
          setIconImgFormData,
          iconPreviewImgArray,
          setIconPreviewImgArray,

          previewImgArray,
          setPreviewImgArray,
          fileDataForm,
          setFileDataForm,
          iconFileDataForm,
          setIconFileDataForm,

          setShow_gbn_svc,
          show_gbn,
          pay_notice,
          setPay_notice,
          view_cnt,
          setView_cnt,
          regDt,
          setRegDt,
          uptDt,
          setUptDt,

          simple_desc_ref,
          svc_intro_ref,
          main_func_ref,
          keyword_ref,
          svc_pay_cate_ref,

          svc_icon_1,
          setSvc_icon_1,

          simple_desc,
          setSimple_desc,
          svc_intro,
          setSvc_intro,
          main_func,
          setMain_func,
          svc_cate,
          setSvc_cate,
          keyword,
          setKeyword,
          svcCateState,
          svcSaleCateList,

          ev_target,
          setEv_target,

          pay_cate_state,
          setPay_cate_state,
          pay_point_state,
          setPay_point_state,
          pay_type,
          setPay_type,
          paid_payment_price,
          svc_pay_lic_array,
          setSvc_pay_lic_array,

          svc_pay_lic_personnel_ref,
          svc_pay_lic_price_ref,
          svc_pay_lic_personnel,
          svc_pay_lic_price,
          svc_pay_lic_data_array,
          setSvc_pay_lic_data_array,

          imgFileName,
          setImgFileName,

          dataSave,
          saveLogic,
          setSaveLogic,
          setInfraLogic,
          infraLogic,
          svc_pay_notice_ref,
          imgLogic,
          setImgLogic,

          svc_pay_lic_array_ref,
          serviceID,

          service_pop_yn_state,
          setService_pop_yn_state,

          setSalesReqVal,

          use_api_list,
          cate_list,
          setReRend,
          setSvcGbnState,
          setApprvLogic,
          apprvLogic,

          svr_yn_stat,
          svcName,
        }}
      >
        <div className="service_product_wrap">
          <div className="page_title_wrap">
            <p className="page_title">판매 서비스 관리</p>
            <div className="page_title_btn">
              <p>Home</p>
              <img className="caption_img" src={view_more} />
              <p>Service Center</p>
              <img className="caption_img" src={view_more} />
              <p>판매 서비스 관리</p>
            </div>
          </div>
          <div className="max_w">
            <div className="service_title_wrap">
              <div className="service_title_wrap_left">
                {
                  // logic_1 === true &&
                  saleLoad === true && iconPreviewImgArray !== undefined ? (
                    <img
                      src={`${iconPreviewImgArray.Icon_img_file.sc_path}`}
                      alt=""
                    />
                  ) : (
                    <img src={Not_img} alt="logo" />
                  )
                }

                <div>
                  {svr_yn_stat === true && SvrData[0].svc_title}
                  {/* <p className="service_title_icon">제작 중</p> */}
                  {svr_yn_stat === true &&
                    (SvrData[0].stat === 1 ? (
                      <p className="service_title_icon">제작중</p>
                    ) : SvrData[0].stat === 2 ? (
                      <p className="service_title_icon_judge_btn">심사중</p>
                    ) : SvrData[0].stat === 3 ? (
                      <p className="service_title_icon_judge_ok_btn">승인</p>
                    ) : SvrData[0].stat === 4 ? (
                      <p className="service_title_icon_judge_fail_btn">
                        심사반려
                      </p>
                    ) : SvrData[0].stat === 5 ? (
                      <p className="service_title_icon_sales_btn">판매중</p>
                    ) : (
                      SvrData[0].stat === 6 && (
                        <p className="service_title_icon_sales_stop_btn">
                          판매중지
                        </p>
                      )
                    ))}
                  {svr_yn_stat === true &&
                    (SvrData[0].judge_stat === 1 ? (
                      <p className="service_title_icon_judge_btn">심사중</p>
                    ) : SvrData[0].judge_stat === 2 ? (
                      <p className="service_title_icon_judge_ok_btn">승인</p>
                    ) : SvrData[0].judge_stat === 3 ? (
                      <p className="service_title_icon_judge_fail_btn">
                        심사반려
                      </p>
                    ) : (
                      <></>
                    ))}
                </div>
              </div>
              <div className="service_title_wrap_right">
                <Form.Control as="select" onChange={moveProduct}>
                  <option value="default">다른 서비스 선택하기</option>
                  {SvrData_posts.map((all_Info) => (
                    <option value={all_Info.pdsvc_idx}>
                      {all_Info.svc_title}
                    </option>
                  ))}
                </Form.Control>
              </div>
            </div>
            <Tabs
              defaultActiveKey={usageInfoFirst ? "api" : "basic"}
              activeKey={salesReqVal}
              onSelect={salesReqValEvt}
              id="uncontrolled-tab-example"
            >
              <Tab eventKey="basic" className="sale_info" title="기본정보">
                <ul>
                  <div className="title_list_icon">
                    <img src={title_list_icon} alt="" />
                    <li>
                      서비스의 기본정보(이름, 서비스URL)과 API를 사용하기 위해
                      필요한 정보(Redirect (s), 권한(Scope) 등)을 입력하거나
                      수정할 수 있습니다.
                    </li>
                  </div>
                  <div className="title_list_icon">
                    <img src={title_list_icon} alt="" />
                    <li>
                      서비스의 인증정보 (API key, API secret key, API token
                      정보는 App의 인증 및 동작에 중요한 정보이오니 관리에
                      주의해야 합니다.
                    </li>
                  </div>
                </ul>
                {svr_yn_stat === true && (
                  <Service_basic_info
                    serviceID={serviceID}
                    SvrData={SvrData}
                    setSvr_info_stat={setSvr_info_stat}
                    svr_info_stat={svr_info_stat}
                    svr_yn_stat={svr_yn_stat}
                    setSave_logic={setSave_logic}
                    save_logic2={save_logic2}
                    setSave_logic2={setSave_logic2}
                    setSalesReqVal={setSalesReqVal}
                  />
                )}
              </Tab>
              <Tab eventKey="sale" className="sale_info" title="판매정보">
                <ul>
                  <div className="title_list_icon">
                    <img src={title_list_icon} alt="" />
                    <li>
                      WEHAGO 서비스 스토어에 판매를 위해 노출되는 App의 정보를
                      입력하거나 수정할 수 있습니다.
                    </li>
                  </div>
                  <div className="title_list_icon">
                    <img src={title_list_icon} alt="" />
                    <li>
                      App을 판매하고 홍보하는데 매우 중요한 정보이며, 심사 시
                      반드시 필요로 하는 항목이오니 최대한 빠짐없이 작성하는
                      것을 권장합니다.
                    </li>
                  </div>
                  <div className="title_list_icon">
                    <img src={title_list_icon} alt="" />
                    <li>스토어 등록 샘플을 확인하시고 입력해주세요.</li>
                  </div>
                </ul>
                <div className="exposure_info_title_wrap clearfix">
                  <p>노출정보</p>
                  <span className="exposure_text">※ 필수 입력 정보입니다.</span>
                </div>
                <div className="Sales_info_detail_default_wrap">
                  <Service_Sales_info_exposure_info />
                </div>
                <div className="exposure_info_title_wrap">
                  <p>상품 이미지</p>
                </div>
                <div className="Sales_info_detail_default_wrap">
                  <Service_Sales_info_product_img />
                </div>
                <div className="exposure_info_title_wrap">
                  <p>결제정보</p>
                </div>
                <div className="Sales_info_detail_default_wrap">
                  <Service_Sales_info_payment_info />
                </div>
                <div className="button_s_box" id="sale_make_box_button">
                  <Link to="/svccenter/saleproduct">
                    <button className="not_search_btn" type="submit">
                      목록
                    </button>
                  </Link>
                  <button
                    className="search_btn"
                    type="submit"
                    onClick={svcSalesSaveBtn}
                  >
                    저장
                  </button>
                  <button
                    className="search_btn"
                    type="submit"
                    id="requestApprovalBtn"
                    onClick={svcSalesSaveBtn}
                  >
                    승인(판매) 요청하기 {">"}
                  </button>
                </div>
              </Tab>
              <Tab
                eventKey="api"
                className="sale_info api_info"
                title="API 사용"
              >
                <Tabs
                  activeKey={salesApiTabReqVal}
                  defaultActiveKey="api_request"
                  id="uncontrolled-tab-example"
                  onSelect={salesApiTabReqValEvt}
                >
                  <Tab eventKey="api_request" title="API 신청하기">
                    <Api_request />
                  </Tab>
                  <Tab eventKey="api_using" title="사용 API">
                    <Api_using />
                  </Tab>
                </Tabs>
              </Tab>
              <Tab
                eventKey="infra"
                className="sale_info infra_info"
                title="인프라 서비스"
              >
                {saveLogic === true && <Infra_service />}
              </Tab>
              <Tab eventKey="sales" className="sale_info" title="매출관리">
                <Sales_management />
              </Tab>
              <Tab eventKey="judge" className="sale_info" title="승인심사">
                <ul>
                  <div className="title_list_icon">
                    <img src={title_list_icon} alt="" />
                    <li>
                      승인 이후, 가격정보 수정 및 데이터 수정의 경우 재승인
                      요청을 하셔야 합니다.
                    </li>
                  </div>
                  <div className="title_list_icon">
                    <img src={title_list_icon} alt="" />
                    <li>
                      심사가 원활하게 완료되어 승인되는 경우, 판매상태로
                      변경하여 판매가 가능합니다. 판매현황은 매출관리에서 확인할
                      수 있습니다.
                    </li>
                  </div>
                </ul>
                {saveLogic === true && <Judge />}
              </Tab>
            </Tabs>
          </div>
        </div>
      </ServiceSalesContext.Provider>
    </React.Fragment>
  );
};

export default Service_product_detail_management;

export function useServiceSalesContext_sale() {
  return useContext(ServiceSalesContext);
}
