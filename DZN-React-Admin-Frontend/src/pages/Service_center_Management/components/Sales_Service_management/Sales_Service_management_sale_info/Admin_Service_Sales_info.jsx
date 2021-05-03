import React from "react";
import Service_Sales_info_exposure_info from "./Service_Sales_info_exposure_info";
import Service_Sales_info_product_img from "./Service_Sales_info_product_img";
import Service_Sales_info_payment_info from "./Service_Sales_info_payment_info";
import { useServiceSalesContext } from "../../../Sales_Service_management";
import { Link } from "react-router-dom";
import { Server_ajax_post } from "../../../../../../Server_ajax";

const Admin_Service_Sales_info = () => {
  const {
    serviceID,
    svcPayType,
    svcPaidPaymentGbn,
    svcPointGbn,
    paid_payment_price_ref,
    svc_notice_ref,
    svc_pay_lic_array,
  } = useServiceSalesContext();

  // 판매정보에 써있는 정보들을 모두 datas에 담아서 Router로 보내어 처리 후 DB 저장
  const DataSaveFun = () => {
    let datas = {
      pdsvc_idx: serviceID,
      pay_type: svcPayType,
      paid_payment_gbn: svcPayType === 1 ? svcPaidPaymentGbn : null,
      point_gbn: svcPointGbn,
      paid_payment_price:
        svcPayType === 0
          ? null
          : svcPaidPaymentGbn === 0
          ? paid_payment_price_ref.current.value === ""
            ? null
            : paid_payment_price_ref.current.value
          : null,
      pay_notice: svc_notice_ref.current.value,
      lic_data_array: svcPaidPaymentGbn === 1 ? svc_pay_lic_array : null,
    };
    (async function () {
      try {
        const result = await Server_ajax_post(
          "service_center_managment/uptSvcSaleInfo",
          datas
        );
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhh", result);
        alert("저장되었습니다.");
      } catch (e) {
        return console.error(e);
      }
    })();
  };

  return (
    <React.Fragment>
      <div className="exposure_info_title_wrap">
        <p>노출정보</p>
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
        <Link to="/admin/salesvc">
          <button className="not_search_btn" type="submit">
            목록
          </button>
        </Link>

        <button className="search_btn" type="submit" onClick={DataSaveFun}>
          저장
        </button>
      </div>
    </React.Fragment>
  );
};

export default Admin_Service_Sales_info;
