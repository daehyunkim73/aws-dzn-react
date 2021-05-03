import React, { useEffect, useState, useRef, createContext, useContext } from "react";
import Approved_Request_popup from "../../popup/Small_popup/Data_Approved_Request_popup";
import Sales_info_exposure_info_wrap from "./Sales_info_exposure_info_wrap";
import Sales_info_payment_info_wrap from "./Sales_info_payment_info_wrap";
import { Link } from "react-router-dom";
import { Server_ajax_post } from "../../../server_ajax";

const SaleInfoContext = createContext();
const Data_sale_main = (props) => {
  const { detailID, dzonID, setSalesState } = props;
  const [saleData, setSaleData] = useState([]);
  const [saleLoad, setSaleLoad] = useState(false);
  const [reRend, setReRend] = useState(false);
  const callNumRef = useRef([]);
  const priceRef = useRef([]);
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
  
  useEffect(() => {
    (async function () {
      try {
        const param =  {
          pdbase_idx: detailID          
        }        
        const axios_host = await Server_ajax_post(`datacenter/getDataSaleInfo`, param);
        
        setSaleData(() => axios_host);
        setSaleLoad(true);
      } catch (e) {
          return console.error(e);
      }
      window.scrollTo(0, 0);
    })();
    setReRend(false);
  }, [reRend === true]);
  useEffect(() => {
    if (saleLoad === true) {      
      saleData[0] !== undefined && setPay_type(saleData[0].pay_type);
    }
  }, [saleLoad]);

  const handleInsert = (e) => {
    if (show_gbn === "") {
      alert("데이터유통포털 노출을 선택 해주세요");
      return;
    }
    if (tel === "") {
      alert("문의/안내 연락처를 입력 해주세요");
      return;
    }
    // if (
    //   scrsht.scrsht_1.file === "" &&
    //   scrsht.scrsht_2.file === "" &&
    //   scrsht.scrsht_3.file === "" &&
    //   scrsht.scrsht_4.file === "" &&
    //   scrsht.scrsht_5.file === ""
    // ) {
    //   alert("스크린샷을 입력 해주세요");
    //   return;
    // }

    if (pay_type === "") {
      alert("결제방식을 입력 해주세요");
      return;
    }
    
    const datas = {
      pdbase_idx: props.detailID,      
      show_gbn: show_gbn,
      show_dt: new Date().toISOString().slice(0, 10).replace(/-/g, ""),
      tel: tel,
      data: scrsht,
      dayMnth_fee_type: dayMnth_fee_type,
      pay_type: pay_type,
      pay_notice: pay_notice,
      feeInputData: feeInputData,
    };    
    
    (async function () {
      try {
        if ( scrsht.scrsht_1.file !== "" ||
          scrsht.scrsht_2.file !== "" ||
          scrsht.scrsht_3.file !== "" ||
          scrsht.scrsht_4.file !== "" ||
          scrsht.scrsht_5.file !== "") {
          const imgUpload = await Server_ajax_post(`datacenter/saleInfo_imgUpload`, fileDataForm);
            
          if(imgUpload) {
            Object.values(scrsht).map((item2) => {
              result.data.map((item1) => {
                if (item2.upt === "Y") {
                  item2.file = item1.filename;
                  item2.path = item1.path;
                }
              });
            });    
              
            const axios_host = await Server_ajax_post(`datacenter/saleInfo_regUpt`, datas);
            if(axios_host.affectedRows >= 0 && axios_host.warningCount === 0) {
              setReRend(true);
            }
          }
        } else {
          const axios_host = await Server_ajax_post(`datacenter/saleInfo_regUpt`, datas);
          console.log(axios_host)
          if(axios_host.affectedRows >= 0 && axios_host.warningCount === 0) {
            setReRend(true);
          }
        }
      } catch (e) {
          return console.error(e);
      }
    })();           
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
        <Approved_Request_popup />{" "}
        {/* 현재까지 입력한 내용 저장 후 승인(판매) 요청하기 화면으로 이동,
            토스트 팝업 필수 정보가 전부 입력되지 않은 경우 승인 판매요청이 안됨  */}
        <div className="exposure_info_wrap Sales_info_detail_wrap">
          <div className="exposure_info_title_wrap">
            <p>노출정보</p>
            <span className="exposure_text">
              {" "}
              ※ 데이터유통포털에 판매를 위해 노출되는 정보를 입력하거나 수정할
              수 있습니다.
            </span>
          </div>
          <div className="Sales_info_detail_default_wrap">
            {saleLoad === true && (
              <Sales_info_exposure_info_wrap
                pdbase_idx={detailID}
                saleData={saleData}
                setReRend={setReRend}
                setSalesState={setSalesState}
              />
            )}
          </div>
          <div className="exposure_info_title_wrap">
            <p>결제정보</p>
          </div>
          <div className="Sales_info_detail_default_wrap Sales_info_detail_payment_default_wrap">
            {saleLoad === true && (
              <Sales_info_payment_info_wrap
                pdbase_idx={detailID}
                pay_type={pay_type}
                setPay_type={setPay_type}
                pay_notice={pay_notice}
                setPay_notice={setPay_notice}
                callNumRef={callNumRef}
                priceRef={priceRef}
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
                목록
              </button>
            </Link>
            <button className="search_btn" type="button" onClick={handleInsert}>
              저장
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
