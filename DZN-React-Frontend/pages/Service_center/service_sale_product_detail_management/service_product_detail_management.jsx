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
  // ?????????

  const [imgFormData, setImgFormData] = useState([]); //????????? FormData
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
  }); //???????????? ????????? ??? ??????

  const [iconImgFormData, setIconImgFormData] = useState([]); //????????? ????????? FormData
  const [iconPreviewImgArray, setIconPreviewImgArray] = useState(); //????????? ????????? ??? ??????

  const [fileDataForm, setFileDataForm] = useState(); // ???????????? ????????? ?????? ??? ???????????????
  const [iconFileDataForm, setIconFileDataForm] = useState(); // ????????? ????????? ?????? ??? ???????????????

  //Logic
  const [saleLoad, setSaleLoad] = useState(false); // DB??? ???????????? ?????? ???????????? ?????? ???????????? true??? ?????????
  const [reRend, setReRend] = useState(false); // DB??? ???????????? ?????? ?????? ???????????? true??? ?????????
  const [imgLogic, setImgLogic] = useState(false);
  const [saveBtnLogic, setSaveBtnLogic] = useState(false);

  const [show_gbn, setShow_gbn_svc] = useState("N"); //????????????: ?????? = Y, ????????? = N
  const [show_dt, setShow_dt] = useState(""); // ??????????????????
  const [simple_desc, setSimple_desc] = useState(""); // ????????????
  const [svc_intro, setSvc_intro] = useState(""); // ????????? ??????
  const [main_func, setMain_func] = useState(""); // ????????????
  const [svc_cate, setSvc_cate] = useState("???????????? ??????"); // ???????????? ??????
  const [keyword, setKeyword] = useState(""); // ????????? ??????
  const [svc_icon_1, setSvc_icon_1] = useState([]); // ????????? ????????? ( ????????????, ???????????????)

  const [pay_type, setPay_type] = useState(1); // ???????????? (?????? = 0 / ?????? = 1)
  const [pay_cate_state, setPay_cate_state] = useState(0); // ???????????? ?????? (????????? = 0, ???????????? = 1)
  const [pay_point_state, setPay_point_state] = useState(); // ????????? ???????????? (?????? = 0, ???????????? = 1)
  const [paid_payment_price, setPaid_payment_price] = useState(""); // ????????? ?????? ?????? (??????)

  const [svc_pay_lic_array, setSvc_pay_lic_array] = useState([]); // ???????????? ?????? ???????????? ??????
  const [svc_pay_lic_data_array, setSvc_pay_lic_data_array] = useState([]); // ???????????? ?????? ???????????? ??????

  const [svc_pay_lic_personnel, setSvc_pay_lic_personnel] = useState(""); // ???????????? ?????? ???????????? ??????
  const [svc_pay_lic_price, setSvc_pay_lic_price] = useState(""); // ???????????? ?????? ?????? ?????? (??????)

  const [pay_notice, setPay_notice] = useState(""); // ?????? ????????????

  const [view_cnt, setView_cnt] = useState(""); // ?????????
  const [regDt, setRegDt] = useState(""); // ?????? ??????
  const [uptDt, setUptDt] = useState(""); // ???????????? ??????

  const [ev_target, setEv_target] = useState(""); // ???????????? ????????? ?????? ??? e.target.name ??? ??????
  const [imgFileName, setImgFileName] = useState(""); // ???????????? ????????? ????????? ??????

  const [requestApprovalEvt, setRequestApprovalEvt] = useState(false); // ??????(??????) ???????????? ?????? ?????????
  const [saveValidState, setSaveValidState] = useState(false); // ??????(??????) ???????????? ??????????????? ?????? ??????
  const [svcCateState, setSvcCateState] = useState(false); // ???????????? ??? ?????? ??????
  const [svcSaleCateList, setSaleSvcCateList] = useState(false); // ???????????? ?????? ?????? ?????????

  const [service_pop_yn_state, setService_pop_yn_state] = useState(false); // ?????????
  const [use_api_list, setUse_api_list] = useState([]); //?????? API ??????
  const [cate_list, setCate_list] = useState();

  // ???????????? useRef
  const simple_desc_ref = useRef(); // ????????? ?????? ??????
  const svc_intro_ref = useRef(); // ????????? ??????
  const main_func_ref = useRef(); // ????????????
  const keyword_ref = useRef(); // ????????? ??????

  // ???????????? useRef
  const svc_pay_cate_ref = useRef(); // ????????? ?????? ??????
  const svc_pay_lic_array_ref = useRef([]); // ???????????? ??????
  const svc_pay_lic_personnel_ref = useRef([]); // ???????????? ?????? ??????
  const svc_pay_lic_price_ref = useRef([]); // ???????????? ?????? ?????? ??????

  const svc_pay_notice_ref = useRef(); // ?????? ????????????

  //
  const [svcGbnState, setSvcGbnState] = useState(false); // ???????????? ????????? ???????????? ?????? state???

  // ????????? ???

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

  // // ?????????

  // ??????????????? ????????? DB??? ?????? ????????? ??? ?????? ?????? ???????????? ?????? 1
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
  }, [reRend === true, serviceID]); // ???????????? ?????? ?????????????????? useEffect ??????

  // ??????????????? ????????? DB??? ?????? ????????? ??? ?????? ?????? ???????????? ?????? 2
  // 1?????? ?????? ?????? ??????????????? ?????? ???????????? ??????
  useEffect(() => {
    if (
      previewImgArray[0] ||
      previewImgArray[1] ||
      previewImgArray[2] ||
      previewImgArray[3] ||
      previewImgArray[4]
    ) {
      // ???????????? ?????????, ?????????, ??????, ?????? ??????
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
      // ????????? ????????? ????????? ??????, ????????? ??????
      setIconPreviewImgArray({
        Icon_img_file: {
          sc_name: previewImgArray[0].svc_icon_1,
          sc_path: previewImgArray[0].svc_icon_path_1,
        },
      });

      setSimple_desc(previewImgArray[0].simple_desc); // ????????? ????????????
      setSvc_intro(previewImgArray[0].svc_intro); // ????????? ??????
      setMain_func(previewImgArray[0].main_func); // ????????????
      setSvc_cate(previewImgArray[0].svc_cate); // ???????????? ??????
      setKeyword(previewImgArray[0].keyword); // ????????? ??????
      setSvc_pay_lic_personnel(previewImgArray[0].lic_user_limit); // ???????????? ?????? ???????????? ??????
      setSvc_pay_lic_price(previewImgArray[0].lic_mnthly_chrgeAmnt); // ???????????? ?????? ?????? ??????

      setPay_notice(previewImgArray[0].pay_notice); // ?????? ????????????
      setPaid_payment_price(previewImgArray[0].paid_payment_price);

      setPay_type(previewImgArray[0].pay_type); // ?????? ?????? (??????, ??????)
      setPay_cate_state(previewImgArray[0].paid_payment_gbn); // ???????????? ?????? ( ?????????, ???????????? ??????)
      setPay_point_state(previewImgArray[0].point_gbn); // ????????? ???????????? ( ??????, ????????????)

      // setView_cnt(previewImgArray[0].view_cnt); //?????????
      // setRegDt(previewImgArray[0].regDt); // ?????? ??????
      // setUptDt(previewImgArray[0].uptDt);

      setShow_gbn_svc(previewImgArray[0].show_gbn); // ????????? ?????? ??????
      setImgLogic(true); // ???????????? ?????????????????? ???????????? ??????
    }
  }, [previewImgArray]);

  // ???????????? ????????????
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

  // ??????????????? ????????? ???????????? ?????? datas??? ????????? Router??? ????????? ?????? ??? DB ??????
  const DataSaveFun = () => {
    let datas = {
      pdsvc_idx: serviceID,
      show_gbn: show_gbn,
      simple_desc: simple_desc_ref.current.value,
      svc_intro: svc_intro_ref.current.value,
      main_func: main_func_ref.current.value,
      svc_cate: svc_cate !== "???????????? ??????" ? svc_cate : null,
      keyword: keyword_ref.current.value,
      svc_icon_1: iconPreviewImgArray
        ? iconPreviewImgArray.Icon_img_file.sc_name
        : null,
      svc_icon_path_1: iconPreviewImgArray
        ? iconPreviewImgArray.Icon_img_file.sc_path
        : null,
      show_dt: new Date().toISOString().slice(0, 10).replace(/-/g, ""),
      data: previewImgArray, //???????????? ?????????

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

  // ???????????? ???????????? & ?????? ????????????
  const svcSalesSaveBtn = (e) => {
    // ?????? ???????????? ??????????????? ?????? ??????
    if (SvrData[0].stat !== 2 && SvrData[0].stat !== 3) {
      if (pay_type === 1) {
        setSvc_pay_lic_data_array([]);
        svc_pay_lic_array.map((item, idx) => {
          // ???????????? ???????????? ?????? ???????????? ??????, ?????? ?????? ?????? ????????? ??????
          setSvc_pay_lic_data_array((svc_pay_lic_data_array) => [
            ...svc_pay_lic_data_array,
            {
              lic_personnel: svc_pay_lic_personnel_ref.current[idx].value,
              lic_price: svc_pay_lic_price_ref.current[idx].value,
            },
          ]);
        });
      }
      // requestApprovalBtn = ?????? ???????????? ?????? id ???
      if (e.target.id === "requestApprovalBtn") {
        setRequestApprovalEvt(true);
      }
      setSaveBtnLogic(true); //???????????? ??????(??????) ???????????? ?????? ?????? ??? true??? ???????????? (???????????? ???????????? & ?????? ???????????? ?????? useEffect)  ??????
      SalseSaveBtn("svc_sc_title", "svc_sc_content", previewImgArray);
    } else {
      setSalesReqVal("judge"); // ?????????????????? ??????????????? ?????? ???????????? ???????????? ??????
    }
  };

  useEffect(() => {
    if (saveBtnLogic === true) {
      //???????????? ????????????
      if (requestApprovalEvt === true) {
        //???????????? ??????(??????) ???????????? ??????
        setRequestApprovalEvt(false); // ??????????????? ??????
        svcSalesRequestBtn(); // ???????????? ?????? ???????????? ????????? ??????
      } else {
        DataSaveFun(); //?????? ??????
        alert("?????????????????????.");
      }
      setSaveBtnLogic(false);
    }
  }, [svc_pay_lic_data_array && saveBtnLogic === true]);

  // ???????????? ?????? ???????????? ????????? ??????
  const svcSalesRequestBtn = () => {
    if (
      simple_desc_ref.current.value === "" ||
      !simple_desc_ref.current.value ||
      !simple_desc_ref.current.value.trim()
    ) {
      alert("????????? ?????? ????????? ??????????????????.");
    } else if (
      svc_intro_ref.current.value === "" ||
      !svc_intro_ref.current.value ||
      !svc_intro_ref.current.value.trim()
    ) {
      alert("????????? ????????? ??????????????????.");
    } else if (
      main_func_ref.current.value === "" ||
      !main_func_ref.current.value ||
      !main_func_ref.current.value.trim()
    ) {
      alert("??????????????? ??????????????????.");
    } else if (svc_cate === "???????????? ??????") {
      alert("??????????????? ??????????????????.");
    } else if (
      keyword_ref.current.value === "" ||
      !keyword_ref.current.value ||
      !keyword_ref.current.value.trim()
    ) {
      alert("????????? ????????? ??????????????????.");
    }
    // 0923 ????????? ?????? ?????? ( ????????? ?????? ?????? ??? ?????? ?????? )
    // else if (
    //   iconPreviewImgArray.Icon_img_file.sc_path === "" ||
    //   !iconPreviewImgArray.Icon_img_file.sc_name
    // ) {
    //   alert("????????? ???????????? ??????????????????.");
    // } else if (
    //   !previewImgArray.Sales_img_1.file_path &&
    //   !previewImgArray.Sales_img_2.file_path &&
    //   !previewImgArray.Sales_img_3.file_path &&
    //   !previewImgArray.Sales_img_4.file_path &&
    //   !previewImgArray.Sales_img_5.file_path
    // ) {
    //   alert("???????????? ???????????? 1??? ?????? ??????????????????.");
    // }
    else if (pay_type === "" || pay_type === undefined || pay_type === null) {
      alert("??????????????? ??????????????????.");
    } else if (
      (pay_cate_state === "" && pay_type === 1) ||
      (pay_cate_state === undefined && pay_type === 1) ||
      (pay_cate_state === null && pay_type === 1)
    ) {
      alert("???????????? ????????? ??????????????????.");
    } else if (pay_cate_state === 0 && pay_type === 1) {
      if (
        svc_pay_cate_ref.current.value === "" ||
        svc_pay_cate_ref.current.value === undefined ||
        svc_pay_cate_ref.current.value === null
      ) {
        alert("????????? ????????? ??????????????? ??????????????????.");
      } else {
        setSaveValidState(true); // ????????? ?????? ?????? ??? true??? ??????
      }
    } else if (pay_cate_state === 1 && pay_type === 1) {
      svc_pay_lic_data_array.map((i, c) => {
        if (i.lic_personnel === "" || i.lic_personnel === undefined) {
          alert("???????????? ????????? ???????????? ????????? ??????????????????.");
        } else if (i.lic_price === "" || i.lic_price === undefined) {
          alert("???????????? ????????? ?????? ???????????? ??????????????????.");
        } else {
          setSaveValidState(true); // ????????? ?????? ?????? ??? true??? ??????
        }
      });
    } else if (
      (pay_point_state === "",
      pay_point_state === undefined,
      pay_point_state === null)
    ) {
      alert("????????? ??????????????? ??????????????????.");
    } else {
      setSaveValidState(true); // ????????? ?????? ?????? ??? true??? ??????
    }
  };

  // ????????? ?????? ?????? ??? ???????????? ??????
  useEffect(() => {
    if (saveValidState === true) {
      setSaveValidState(false); // ??????????????? ??????
      DataSaveFun(); // ????????? ?????? ?????? ??????
      setSalesReqVal("judge"); // ???????????? ??? ????????? ??????
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

  //??? ?????? ??? event ??? ????????? ??????
  const salesReqValEvt = (e) => {
    setSalesReqVal(e);
  };

  //api ?????? ?????? ??? ????????? event ??? ????????? ??????
  const salesApiTabReqValEvt = (e) => {
    setSalesApiTabReqVal(e);
  };

  // // ????????? ???

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
            <p className="page_title">?????? ????????? ??????</p>
            <div className="page_title_btn">
              <p>Home</p>
              <img className="caption_img" src={view_more} />
              <p>Service Center</p>
              <img className="caption_img" src={view_more} />
              <p>?????? ????????? ??????</p>
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
                  {/* <p className="service_title_icon">?????? ???</p> */}
                  {svr_yn_stat === true &&
                    (SvrData[0].stat === 1 ? (
                      <p className="service_title_icon">?????????</p>
                    ) : SvrData[0].stat === 2 ? (
                      <p className="service_title_icon_judge_btn">?????????</p>
                    ) : SvrData[0].stat === 3 ? (
                      <p className="service_title_icon_judge_ok_btn">??????</p>
                    ) : SvrData[0].stat === 4 ? (
                      <p className="service_title_icon_judge_fail_btn">
                        ????????????
                      </p>
                    ) : SvrData[0].stat === 5 ? (
                      <p className="service_title_icon_sales_btn">?????????</p>
                    ) : (
                      SvrData[0].stat === 6 && (
                        <p className="service_title_icon_sales_stop_btn">
                          ????????????
                        </p>
                      )
                    ))}
                  {svr_yn_stat === true &&
                    (SvrData[0].judge_stat === 1 ? (
                      <p className="service_title_icon_judge_btn">?????????</p>
                    ) : SvrData[0].judge_stat === 2 ? (
                      <p className="service_title_icon_judge_ok_btn">??????</p>
                    ) : SvrData[0].judge_stat === 3 ? (
                      <p className="service_title_icon_judge_fail_btn">
                        ????????????
                      </p>
                    ) : (
                      <></>
                    ))}
                </div>
              </div>
              <div className="service_title_wrap_right">
                <Form.Control as="select" onChange={moveProduct}>
                  <option value="default">?????? ????????? ????????????</option>
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
              <Tab eventKey="basic" className="sale_info" title="????????????">
                <ul>
                  <div className="title_list_icon">
                    <img src={title_list_icon} alt="" />
                    <li>
                      ???????????? ????????????(??????, ?????????URL)??? API??? ???????????? ??????
                      ????????? ??????(Redirect (s), ??????(Scope) ???)??? ???????????????
                      ????????? ??? ????????????.
                    </li>
                  </div>
                  <div className="title_list_icon">
                    <img src={title_list_icon} alt="" />
                    <li>
                      ???????????? ???????????? (API key, API secret key, API token
                      ????????? App??? ?????? ??? ????????? ????????? ??????????????? ?????????
                      ???????????? ?????????.
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
              <Tab eventKey="sale" className="sale_info" title="????????????">
                <ul>
                  <div className="title_list_icon">
                    <img src={title_list_icon} alt="" />
                    <li>
                      WEHAGO ????????? ???????????? ????????? ?????? ???????????? App??? ?????????
                      ??????????????? ????????? ??? ????????????.
                    </li>
                  </div>
                  <div className="title_list_icon">
                    <img src={title_list_icon} alt="" />
                    <li>
                      App??? ???????????? ??????????????? ?????? ????????? ????????????, ?????? ???
                      ????????? ????????? ?????? ??????????????? ????????? ???????????? ????????????
                      ?????? ???????????????.
                    </li>
                  </div>
                  <div className="title_list_icon">
                    <img src={title_list_icon} alt="" />
                    <li>????????? ?????? ????????? ??????????????? ??????????????????.</li>
                  </div>
                </ul>
                <div className="exposure_info_title_wrap clearfix">
                  <p>????????????</p>
                  <span className="exposure_text">??? ?????? ?????? ???????????????.</span>
                </div>
                <div className="Sales_info_detail_default_wrap">
                  <Service_Sales_info_exposure_info />
                </div>
                <div className="exposure_info_title_wrap">
                  <p>?????? ?????????</p>
                </div>
                <div className="Sales_info_detail_default_wrap">
                  <Service_Sales_info_product_img />
                </div>
                <div className="exposure_info_title_wrap">
                  <p>????????????</p>
                </div>
                <div className="Sales_info_detail_default_wrap">
                  <Service_Sales_info_payment_info />
                </div>
                <div className="button_s_box" id="sale_make_box_button">
                  <Link to="/svccenter/saleproduct">
                    <button className="not_search_btn" type="submit">
                      ??????
                    </button>
                  </Link>
                  <button
                    className="search_btn"
                    type="submit"
                    onClick={svcSalesSaveBtn}
                  >
                    ??????
                  </button>
                  <button
                    className="search_btn"
                    type="submit"
                    id="requestApprovalBtn"
                    onClick={svcSalesSaveBtn}
                  >
                    ??????(??????) ???????????? {">"}
                  </button>
                </div>
              </Tab>
              <Tab
                eventKey="api"
                className="sale_info api_info"
                title="API ??????"
              >
                <Tabs
                  activeKey={salesApiTabReqVal}
                  defaultActiveKey="api_request"
                  id="uncontrolled-tab-example"
                  onSelect={salesApiTabReqValEvt}
                >
                  <Tab eventKey="api_request" title="API ????????????">
                    <Api_request />
                  </Tab>
                  <Tab eventKey="api_using" title="?????? API">
                    <Api_using />
                  </Tab>
                </Tabs>
              </Tab>
              <Tab
                eventKey="infra"
                className="sale_info infra_info"
                title="????????? ?????????"
              >
                {saveLogic === true && <Infra_service />}
              </Tab>
              <Tab eventKey="sales" className="sale_info" title="????????????">
                <Sales_management />
              </Tab>
              <Tab eventKey="judge" className="sale_info" title="????????????">
                <ul>
                  <div className="title_list_icon">
                    <img src={title_list_icon} alt="" />
                    <li>
                      ?????? ??????, ???????????? ?????? ??? ????????? ????????? ?????? ?????????
                      ????????? ????????? ?????????.
                    </li>
                  </div>
                  <div className="title_list_icon">
                    <img src={title_list_icon} alt="" />
                    <li>
                      ????????? ???????????? ???????????? ???????????? ??????, ???????????????
                      ???????????? ????????? ???????????????. ??????????????? ?????????????????? ?????????
                      ??? ????????????.
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
