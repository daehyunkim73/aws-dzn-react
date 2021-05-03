import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useRef,
} from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Sales_Service_management_api_table from "./components/Sales_Service_management/Sales_Service_management_api/Sales_Service_management_api_table";
import Sales_Service_management_sales_info_search from "./components/Sales_Service_management/Sales_Service_management_sales_info/Sales_Service_management_sales_info_search";
import Sales_Service_management_sales_info_table from "./components/Sales_Service_management/Sales_Service_management_sales_info/Sales_Service_management_sales_info_table";
import Sales_Service_management_basic_info from "./components/Sales_Service_management/Sales_Service_management_basic/Sales_Service_management_basic_info";
import Sales_Service_management_sale_info_detail from "./components/Sales_Service_management/Sales_Service_management_sale_info/Admin_Service_Sales_info";
import Sales_Service_management_judge from "./components/Sales_Service_management/Sales_Service_management_judge/Sales_Service_management_judge";
import Infra_approve from "./components/Sales_Service_management/Sales_Service_management_infra/Infra_approve";
import Pagination from "../../Big_component/Pagination";
import { Server_ajax_get, Server_ajax_post } from "../../../Server_ajax";
import moment from "moment";
import dummyData from "../Data_center_Management/components/Common_Data_management/common_data_sales_management_info/Sales_management_dummy_data.json";
const ServiceSalesContext = createContext();
const Sales_Service_management = (props) => {
  const serviceID = props.match.params.serviceID;
  const [dataSave, setDataSave] = useState([]);
  const [saveLogic, setSaveLogic] = useState(false);
  const [apprvLogic, setApprvLogic] = useState(false);
  const [svcSaleArray, setSvcSaleArray] = useState([]); // DB에 저장되어있는 판매정보 값
  const [svcSaleArrayLogic, setSvcSaleArrayLogic] = useState(false); // DB에 저장되어있는 판매정보 값 받아왔을때 true로 변경
  const [ShowGbn, setShowGbn] = useState(); //스토어 노출 설정
  const [showGbnStatLogic, setShowGbnStatLogic] = useState(false); //스토어 노출 설정 바꿨을 때 true로 변경
  const [svcSaleSimpleDesc, setSvcSaleSimpleDesc] = useState(); //서비스 간략 설명
  const [svc_cate, setSvc_cate] = useState("카테고리 선택"); // 카테고리 설정
  const [svcSaleCateList, setSaleSvcCateList] = useState(); // 카테고리 설정 목록 리스트
  const [svcCateState, setSvcCateState] = useState(false); // 카테고리 설정 목록 리스트를 받아왔을때 true로 변경
  const [svcSaleKeyword, setSvcSaleKeyword] = useState(); //서비스 키워드 설정
  const [svcPayType, setSvcPayType] = useState(1); // 결제 방식 (0 = 무료, 1 = 유료)
  const [svcPaidPaymentGbn, setSvcPaidPaymentGbn] = useState(); //유료결제 방법 ( 0 = 요금제 방식, 1 = 라이선스 방식 )
  const [paid_payment_price, setPaid_payment_price] = useState(); // 요금제 방식 과금
  const [svcPointGbn, setSvcPointGbn] = useState(); //포인트 사용여부 ( 0 = 포인트 사용, 1 = 포인트 사용 안함 )
  const [svc_pay_lic_array, setSvc_pay_lic_array] = useState([]); //결제정보 라이선스 방식 Array
  const [svcSalePayNotice, setSvcSalePayNotice] = useState(); // 과금 유의사항
  // 노출정보 useRef
  const simple_desc_ref = useRef(); // 서비스 간략 설명
  const svc_intro_ref = useRef(); // 서비스 소개
  const main_func_ref = useRef(); // 주요기능
  const keyword_ref = useRef(); // 키워드 설정
  // 결제정보 useRef
  const paid_payment_price_ref = useRef(); // 요금제 방식 과금
  const svc_pay_lic_array_ref = useRef([]); // 라이선스 방식
  const svc_pay_lic_personnel_ref = useRef([]); // 라이선스 방식 인원
  const svc_pay_lic_price_ref = useRef([]); // 라이선스 방식 매월 과금
  const svc_notice_ref = useRef(); // 과금 유의사항

  //메출관련
  const [salesData, setSalesData] = useState();
  const [searchData, setSearchData] = useState({ startDate: "", endDate: "" });
  const [loading, setLoading] = useState(false); // API 통해서 처리 했을 경우 사용
  const [rending, setRending] = useState(false);
  const [totalCnt, setTotalCnt] = useState(0);
  const [isSearch, setIsSearch] = useState(false);

  // 더미데이터로 처리
  useEffect(() => {
    const datas = dummyData.data;
    const { startDate, endDate } = searchData;

    const filterData = datas.filter((data, i) => {
      if (startDate === "" && endDate === "") return true;
      else
        return (
          startDate <= moment(data.date).format("YYYY-MM-DD") &&
          moment(data.date).format("YYYY-MM-DD") <= endDate
        );
    });

    if (totalCnt === 0) {
      setTotalCnt(filterData.length);
    }

    filterData.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    setSalesData(() => filterData);
    setRending(false);
    setLoading(true);
  }, [rending === true]);
  // useEffect(() => {
  //     // 매출 데이터 받아 왔을 때 처리
  //     (async() => {
  //         try {

  //         } catch(e) {
  //             console.error(e);
  //         }
  //     })
  // }, [])
  //매출관련 끝
  useEffect(() => {
    (async function () {
      try {
        const service_by_id = await Server_ajax_get(
          `service_center_managment/product/control/service_by_id?id=${serviceID}`
        );
        setDataSave(service_by_id);
        setSaveLogic(true);
      } catch (e) {
        return console.error(e);
      }
    })();
    setSaveLogic(false);
    setApprvLogic(false);
  }, [serviceID, apprvLogic === true]);
  useEffect(() => {
    (async function () {
      try {
        let data = {
          pdsvc_idx: serviceID,
        };
        const getSvcSaleDetailInfo = await Server_ajax_post(
          `service_center_managment/getSvcSaleDetailInfo`,
          data
        );
        if (
          Array.isArray(getSvcSaleDetailInfo) &&
          getSvcSaleDetailInfo.length
        ) {
          setSvcSaleArray((svcSaleArray) => getSvcSaleDetailInfo);
          setShowGbn(getSvcSaleDetailInfo[0].show_gbn);
          setSvcSaleSimpleDesc(getSvcSaleDetailInfo[0].simple_desc);
          setSvcSalePayNotice(getSvcSaleDetailInfo[0].pay_notice);
          setSvcSaleKeyword(getSvcSaleDetailInfo[0].keyword);
          setSvc_cate(getSvcSaleDetailInfo[0].svc_cate);
          setSvcPayType(getSvcSaleDetailInfo[0].pay_type);
          setSvcPaidPaymentGbn(getSvcSaleDetailInfo[0].paid_payment_gbn);
          setSvcPointGbn(getSvcSaleDetailInfo[0].point_gbn);
          setPaid_payment_price(getSvcSaleDetailInfo[0].paid_payment_price);
          setSvcSaleArrayLogic(true);
        }
      } catch (e) {
        return console.error(e);
      }
    })();
  }, [serviceID]);
  // 판매정보 카테고리
  useEffect(() => {
    let data = {
      pdsvc_idx: serviceID,
    };

    async function ssss() {
      try {
        const getSvcSaleGbnCate = await Server_ajax_get(
          `service_center_managment/getSvcSaleGbnCate`
        );
        setSaleSvcCateList((svcSaleCateList) => [
          svcSaleCateList,
          getSvcSaleGbnCate,
        ]);
        setSvcCateState(true);
      } catch (e) {
        return console.error(e);
      }
    }
    ssss();

    setSvcCateState(false);
  }, []);
  return (
    <React.Fragment>
      <ServiceSalesContext.Provider
        value={{
          dataSave,
          saveLogic,
          setSaveLogic,
          serviceID,
          setApprvLogic,
          apprvLogic,
          //판매정보
          svcSaleArray,
          svcSaleArrayLogic,
          setSvcSaleArrayLogic,
          // 노출정보
          ShowGbn,
          setShowGbn,
          svcSaleSimpleDesc,
          svc_cate,
          setSvc_cate,
          svcSaleCateList,
          svcCateState,
          svcSaleKeyword,
          showGbnStatLogic,
          setShowGbnStatLogic,
          // 노출정보 Ref
          simple_desc_ref,
          svc_intro_ref,
          main_func_ref,
          keyword_ref,
          // 결제정보
          svc_pay_lic_array,
          setSvc_pay_lic_array,
          svcSalePayNotice,
          paid_payment_price,
          svcPayType,
          setSvcPayType,
          svcPointGbn,
          setSvcPointGbn,
          svcPaidPaymentGbn,
          setSvcPaidPaymentGbn,
          // 결제정보 Ref
          paid_payment_price_ref,
          svc_pay_lic_array_ref,
          svc_pay_lic_personnel_ref,
          svc_pay_lic_price_ref,
          svc_notice_ref,
          // 판매정보
        }}
      >
        <div className="Sales_Service_management_wrap">
          <div className="Page_same_text">
            <p className="backoffice_title">서비스 상세정보</p>
          </div>
          <div className="service_title_wrap">
            <div className="service_title_wrap_left">
              <div>
                {saveLogic === true && dataSave[0].svc_title}
                {/* <p className="create_badge">신규 제작</p> */}
                {saveLogic === true &&
                  (dataSave[0].stat === 5 ? (
                    <p className="sales_badge">판매중</p>
                  ) : dataSave[0].stat === 6 ? (
                    <p className="sales_stop_badge">판매중지</p>
                  ) : (
                    <></>
                  ))}
                {saveLogic === true &&
                  (dataSave[0].stat === 3 || dataSave[0].judge_stat === 2 ? (
                    <p className="judge_ok_badge">승인</p>
                  ) : (
                    <></>
                  ))}
                {saveLogic === true &&
                  (dataSave[0].stat === 2 || dataSave[0].judge_stat === 1 ? (
                    <p className="judge_badge">승인요청</p>
                  ) : (
                    <></>
                  ))}
                {saveLogic === true &&
                  (dataSave[0].stat === 4 || dataSave[0].judge_stat === 3 ? (
                    <p className="judge_return_badge">반려</p>
                  ) : (
                    <></>
                  ))}
                <p className="id_badge">한기업/datapotal</p>
              </div>
            </div>
          </div>
          <Tabs
            className="backoffice_tab_wrap"
            defaultActiveKey="basic"
            id="uncontrolled-tab-example"
          >
            <Tab
              eventKey="basic"
              title="기본정보"
              className="Sales_Service_management_basic_tab_wrap"
            >
              <Sales_Service_management_basic_info serviceID={serviceID} />
            </Tab>
            <Tab
              eventKey="sale"
              className="calculate_registration Data_Approved_management_sale_tab_wrap"
              title="판매정보"
            >
              {saveLogic === true && (
                <Sales_Service_management_sale_info_detail
                  serviceID={serviceID}
                />
              )}
            </Tab>
            <Tab
              eventKey="usingapi"
              className="calculate_registration"
              title="사용 API"
            >
              {saveLogic === true && <Sales_Service_management_api_table />}
              <Pagination />
            </Tab>
            <Tab
              eventKey="infra"
              className="calculate_registration"
              title="인프라 승인"
            >
              {saveLogic === true && <Infra_approve dataSave={dataSave} />}
            </Tab>
            <Tab
              eventKey="sales"
              className="calculate_registration"
              title="매출 정보"
            >
              <Sales_Service_management_sales_info_search
                setSearchData={setSearchData}
                setRending={setRending}
                setIsSearch={setIsSearch}
              />
              {loading && (
                <Sales_Service_management_sales_info_table
                  salesData={salesData}
                  totalCnt={totalCnt}
                  isSearch={isSearch}
                  setIsSearch={setIsSearch}
                />
              )}
              {/* <Pagination /> */}
            </Tab>
            <Tab
              eventKey="judge"
              className="calculate_registration"
              title="승인 심사"
            >
              {saveLogic === true && <Sales_Service_management_judge />}
            </Tab>
          </Tabs>
        </div>
      </ServiceSalesContext.Provider>
    </React.Fragment>
  );
};
export default Sales_Service_management;
export function useServiceSalesContext() {
  return useContext(ServiceSalesContext);
}
