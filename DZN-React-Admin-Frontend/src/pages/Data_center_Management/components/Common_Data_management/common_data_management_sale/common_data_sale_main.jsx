import React, { useEffect, useState } from "react";
import CommonDataSalesInfoExposureInfoWrap from "./common_data_sales_info_exposure_info_wrap";
import CommonDataSalesInfoPaymentInfoWrap from "./common_data_sales_info_payment_info_wrap";
import { Link } from "react-router-dom";
import { Server_ajax_post } from "../../../../../../Server_ajax";


const Data_sale_main = ({defaultData, salesState, setSalesState}) => {
  const {pdbase_idx} = defaultData;
  const [salesData, setSalesData] = useState();  
  const [loading, setLoading] = useState(false);
  const [payDataSave, setPayDataSave] = useState();
  const [rending, setRending] = useState(false);

  useEffect(() => {
    // 판매정보 불러오기
    const getData = async () => {
      try {
          const datas = {pdbase_idx};
          const getSalesDataInfo = await Server_ajax_post(`data_center_managment/getSalesDataInfo`, {datas});
          const resData = getSalesDataInfo[0];          
          setSalesData(resData);      
          setLoading(true);          
      } catch (e) {
          return console.error(e);
      }
    }
    getData();
  }, []);

  // 저장 버튼 클릭 이벤트
  const payInfoSaveClick = () => {
    setPayDataSave(true);
    alert('결제정보가 저장 되었습니다.');
    window.scrollTo(0, 0);
  }

  return (
    <React.Fragment>
      <div className="exposure_info_wrap Sales_info_detail_wrap">
        <div className="exposure_info_title_wrap">
          <p>노출정보</p>
          <span className="exposure_text">            
            ※ 데이터유통포털에 판매를 위해 노출되는 정보를 입력하거나 수정할 수
            있습니다.
          </span>
        </div>
        <div className="Sales_info_detail_default_wrap">
          {loading && <CommonDataSalesInfoExposureInfoWrap salesData={salesData} salesState={salesState} setSalesState={setSalesState}/>}
        </div>
        <div className="exposure_info_title_wrap">
          <p>결제정보</p>
        </div>
        <div className="Sales_info_detail_default_wrap Sales_info_detail_payment_default_wrap">
          {loading && <CommonDataSalesInfoPaymentInfoWrap salesData={salesData} rending={rending} setRending={setRending} payDataSave={payDataSave} />}
        </div>

        <div className="button_s_box" id="sale_make_box_button">
          <Link to="/admin/dataapproval">
            <button className="not_search_btn" type="submit">
              목록
            </button>
          </Link>          
            <button className="search_btn" type="submit" onClick={payInfoSaveClick}>
              결제정보 저장
            </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Data_sale_main;
