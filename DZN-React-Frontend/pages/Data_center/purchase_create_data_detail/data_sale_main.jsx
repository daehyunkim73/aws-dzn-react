import React, { useEffect, useState, useRef, useCallback } from "react";
import Approved_Request_popup from "../../popup/Small_popup/Data_Approved_Request_popup";
import Sales_info_exposure_info_wrap from "./Sales_info_exposure_info_wrap";
import Sales_info_payment_info_wrap from "./Sales_info_payment_info_wrap";
import { Link } from "react-router-dom";
import { createContext, useContext } from "react";
import { Server_ajax_post } from "../../../server_ajax";
const SaleInfoContext = createContext();
const Data_sale_main = (props) => {
  const { detailID, dzonID, setJudgeClick, state } = props;
  const [saleData, setSaleData] = useState([]);
  const [saleLoad, setSaleLoad] = useState(false);
  const [reRend, setReRend] = useState(false);
  const endCallNum = useRef([]);
  const dtPrice = useRef([]);
  const [judgeMove, setJubgeMovie] = useState(false);
  ////// create_data_sc_shot Begin /////
  const [scrsht, setScrsht] = useState({
    scrsht_1: {
      title: "",
      desc: "",
      file: "",
      path: "",
      upt: "",
    },
    scrsht_2: {
      title: "",
      desc: "",
      file: "",
      path: "",
      upt: "",
    },
    scrsht_3: {
      title: "",
      desc: "",
      file: "",
      path: "",
      upt: "",
    },
    scrsht_4: {
      title: "",
      desc: "",
      file: "",
      path: "",
      upt: "",
    },
    scrsht_5: {
      title: "",
      desc: "",
      file: "",
      path: "",
      upt: "",
    },
  });
  const [addFile, setAddFile] = useState("");
  const [filePath, setFilePath] = useState("");
  const [view_cnt, setView_cnt] = useState("");
  const [regDt, setRegDt] = useState("");
  const [uptDt, setUptDt] = useState("");
  const [fileDataForm, setFileDataForm] = useState();
  let formData = new FormData();  
  ////// create_data_sc_shot End /////
  ////// Sales_info_exposure_info_wrap Begin /////
  const [show_gbn, setShow_gbn] = useState("");
  const [show_dt, setShow_dt] = useState("");
  const [tel, setTel] = useState("");
  ////// Sales_info_exposure_info_wrap End /////
  ////// Sales_info_payment_info_wrap Begin //////
  const [dayMnth_fee_type, setDayMnth_fee_type] = useState("");
  const [pay_type, setPay_type] = useState("");
  const [pay_notice, setPay_notice] = useState("");
  const [feeInputData, setFeeInputData] = useState([]);
  ////// Sales_info_payment_info_wrap End //////
  // ??????(??????) ?????? ?????? ?????? ?????????
  const Aprroved_popup = async () => {
    if (state !== "1" && state !== "4") {
      setJubgeMovie(true);
    } else {
      const Data_Approved_Request_popup_bgk = document.getElementById(
        "Data_Approved_Request_popup_bgk"
      );
      if (show_gbn === "") {
        Data_Approved_Request_popup_bgk.style.display = "table";
        return;
      }
      if (tel === "") {
        Data_Approved_Request_popup_bgk.style.display = "table";
        return;
      }
      // if (
      //   scrsht.scrsht_1.file === "" &&
      //   scrsht.scrsht_2.file === "" &&
      //   scrsht.scrsht_3.file === "" &&
      //   scrsht.scrsht_4.file === "" &&
      //   scrsht.scrsht_5.file === ""
      // ) {
      //   Data_Approved_Request_popup_bgk.style.display = "table";
      //   return;
      // }
      if (pay_type === "") {
        Data_Approved_Request_popup_bgk.style.display = "table";
        return;
      }
      // ?????? ???
      saveSaleData("judge");
    }
  };
  // ?????? ????????? ??????
  useEffect(() => {
    if (judgeMove) {
      const nav_link = document.querySelectorAll(".nav-link");
      const tab_pane = document.querySelectorAll(".tab-pane");
      for (let i = 0; i < nav_link.length; i++) {
        nav_link[i].setAttribute("aria-selected", "false");
        nav_link[i].setAttribute("tabindex", "-1");
        nav_link[i].classList.remove("active");
        tab_pane[i].setAttribute("aria-hidden", "true");
        tab_pane[i].classList.remove("active", "show");
      }
      const jt = document.getElementById("uncontrolled-tab-example-tab-judge");
      const jt_tab = document.getElementById(
        "uncontrolled-tab-example-tabpane-judge"
      );
      jt.setAttribute("aria-selected", "true");
      jt.removeAttribute("tabindex");
      jt.classList.add("active");
      jt_tab.setAttribute("aria-hidden", "false");
      jt_tab.classList.add("active", "show");
    }
    setJubgeMovie(false);
  }, [judgeMove === true]);

  useEffect(() => {
    (async function () {
      try {
        let data = {
          pdbase_idx: detailID,          
        };
        const getDataSaleInfo = await Server_ajax_post(
          `datacenter/getDataSaleInfo`,
          data
        );                
        setSaleData(() => getDataSaleInfo);
        setSaleLoad(true);
      } catch (e) {
        return console.error(e);
      }
    })();

    setSaleLoad(false);
    setReRend(false);
  }, [reRend === true]);

  useEffect(() => {
    if (saleLoad === true) {
      saleData[0] !== undefined && setPay_type(saleData[0].pay_type);
    }
  }, [saleLoad]);

  // ????????? ??????
  const validationCheck = () => {
    if (show_gbn === "") {
      alert("????????????????????? ????????? ?????? ????????????");
      return false;
    }
    if (tel === "") {
      alert("??????/?????? ???????????? ?????? ????????????");
      return false;
    }
    // ?????? ??????
    // if (
    //   scrsht.scrsht_1.file === "" &&
    //   scrsht.scrsht_2.file === "" &&
    //   scrsht.scrsht_3.file === "" &&
    //   scrsht.scrsht_4.file === "" &&
    //   scrsht.scrsht_5.file === ""
    // ) {
    //   alert("??????????????? ?????? ????????????");
    //   return false;
    // }

    if (pay_type === "") {
      alert("??????????????? ?????? ????????????");
      return false;
    }
    return true;
  };

  const saveSaleData = async (type) => {
    try {
      
      if (state !== "1" && state !== "4") {        
        return true;
      }
     
      const datas = {
        pdbase_idx: detailID,        
        show_gbn: show_gbn,
        show_dt: new Date().toISOString().slice(0, 10).replace(/-/g, ""),
        tel: tel,
        data: scrsht,
        dayMnth_fee_type: dayMnth_fee_type,
        pay_type: pay_type,
        pay_notice: pay_notice,
        feeInputData: feeInputData,
      };
     
      const isImg = scrsht.scrsht_1.file !== "" ||
                    scrsht.scrsht_2.file !== "" ||
                    scrsht.scrsht_3.file !== "" ||
                    scrsht.scrsht_4.file !== "" ||
                    scrsht.scrsht_5.file !== "";

      if (isImg) {
        const saleInfo_imgUpload = await Server_ajax_post(
          `datacenter/saleInfo_imgUpload`,
          fileDataForm          
        );
        
        if (saleInfo_imgUpload) {
          Object.values(scrsht).map((item2, idx2) => {
            saleInfo_imgUpload.map((item1, idx1) => {
              if (item2.upt === "Y") {
                item2.file = item1.filename;
                item2.path = item1.path;
              }
            });
          });
        }
        
        const service_by_id = await Server_ajax_post(
          `datacenter/saleInfo_regUpt`,
          datas          
        );        
        
        if (service_by_id.affectedRows > 0) {
          setReRend(true);
          setJudgeClick(true);
          if (type === "judge") {
            setJubgeMovie(true);
          }
        }
      } else {
        const service_by_id = await Server_ajax_post(
          `datacenter/saleInfo_regUpt`,
          datas          
        );
        
        if (service_by_id.affectedRows >= 0 && service_by_id.warningCount === 0) {
          setReRend(true);
          setJudgeClick(true);
          if (type === "judge") {
            setJubgeMovie(true);
          }
        } else {
          throw new Error('????????? ?????????????????????.')
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // ???????????? ??????
  const handleInsert = (e) => {
    if (validationCheck() !== true) {
      return;
    }
    saveSaleData("save");
  };
  return (
    <React.Fragment>
      <SaleInfoContext.Provider
        value={{
          scrsht,
          setScrsht,
          fileDataForm,
          setFileDataForm,
          addFile,
          setAddFile,
          filePath,
          setFilePath,
          pay_type,
          setPay_type,
          pay_notice,
          setPay_notice,
          view_cnt,
          setView_cnt,
          regDt,
          setRegDt,
          uptDt,
          setUptDt,
          formData,
          show_gbn,
          setShow_gbn,
          show_dt,
          setShow_dt,
          tel,
          setTel,
        }}
      >
        <Approved_Request_popup />
        {/* ???????????? ????????? ?????? ?????? ??? ??????(??????) ???????????? ???????????? ??????,
            ????????? ?????? ?????? ????????? ?????? ???????????? ?????? ?????? ?????? ??????????????? ??????  */}
        <div className="exposure_info_wrap Sales_info_detail_wrap">
          <div className="exposure_info_title_wrap">
            <p>????????????</p>
            <span className="exposure_text">
              {" "}
              ??? ???????????????????????? ????????? ?????? ???????????? ????????? ??????????????? ?????????
              ??? ????????????.
            </span>
          </div>
          <div className="Sales_info_detail_default_wrap">
            {saleLoad === true && (
              <Sales_info_exposure_info_wrap
                pdbase_idx={detailID}
                saleData={saleData}
                state={state}
                setReRend={setReRend}
              />
            )}
          </div>
          <div className="exposure_info_title_wrap">
            <p>????????????</p>
          </div>
          <div className="Sales_info_detail_default_wrap Sales_info_detail_payment_default_wrap">
            {saleLoad === true && (
              <Sales_info_payment_info_wrap
                pdbase_idx={detailID}
                pay_type={pay_type}
                setPay_type={setPay_type}
                pay_notice={pay_notice}
                setPay_notice={setPay_notice}
                endCallNum={endCallNum}
                dtPrice={dtPrice}
                dayMnth_fee_type={dayMnth_fee_type}
                setDayMnth_fee_type={setDayMnth_fee_type}
                feeInputData={feeInputData}
                setFeeInputData={setFeeInputData}
                saleLoad={saleLoad}
              />
            )}
          </div>
          <div className="button_s_box" id="sale_make_box_button">
            <Link to="/datacenter/purchasedata">
              <button className="not_search_btn" type="button">
                ??????
              </button>
            </Link>
            {state !== "1" && state !== "4" ? null : (
              <button
                className="search_btn"
                type="button"
                onClick={handleInsert}
              >
                ??????
              </button>
            )}
            <button
              className="search_btn"
              type="button"
              onClick={Aprroved_popup}
            >
              {state !== "1" && state !== "4"
                ? "??????(??????) ????????????>"
                : "??????(??????) ????????????>"}
            </button>
          </div>
        </div>
      </SaleInfoContext.Provider>
    </React.Fragment>
  );
};
export default Data_sale_main;
export function useSaleInfoContext() {
  return useContext(SaleInfoContext);
}
