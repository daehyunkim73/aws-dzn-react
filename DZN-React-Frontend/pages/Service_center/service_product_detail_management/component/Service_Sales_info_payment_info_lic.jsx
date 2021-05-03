import React, { useEffect } from "react";
import large_list_icon from "../../../../image/Center/List_icon/large_list_icon.png";
import { useServiceSalesContext } from "../service_product_detail_management";

const Service_Sales_info_payment_info_lic = ({ idx }) => {
  const {
    svc_pay_lic_personnel,
    svc_pay_lic_price,
    svc_pay_lic_personnel_ref,
    svc_pay_lic_price_ref,
    svc_pay_lic_array,
    setSvc_pay_lic_array,
    svc_pay_lic_array_ref,
  } = useServiceSalesContext();

  useEffect(() => {
    console.log("><VNSAVJKDSANKVDS");
  }, []);

  // const handleAddPayLic = useCallback(() => {
  //   setSvc_pay_lic_array((svc_pay_lic_array) => [
  //     ...svc_pay_lic_array,
  //     {
  //       pay_lic_personnel: "",
  //       pay_lic_price: "",
  //     },
  //   ]);
  // }, [svc_pay_lic_array]);

  return (
    <React.Fragment>
      <div className="Sales_info_payment_info_input" key={idx}>
        <p className="nbsp"></p>
        <img
          src={large_list_icon}
          className="large_list_icon"
          alt="list_icon"
        />
        <span>사용자수 제한</span>
        <input
          className="form_input form-control svc_pay_lic_personnel_input"
          type="number"
          ref={(el) => (svc_pay_lic_personnel_ref.current[idx] = el)}
          defaultValue={svc_pay_lic_personnel}
        />
        <span>명</span>
        <p className="nbsp"></p>
        <img
          src={large_list_icon}
          className="large_list_icon"
          alt="list_icon"
        />

        <span>매월 과금</span>
        <input
          className="form_input form-control"
          type="number"
          ref={(el) => (svc_pay_lic_price_ref.current[idx] = el)}
          defaultValue={svc_pay_lic_price}
        />
        <span>원</span>
        <button value={idx} onClick={handleAddPayLic}>
          추가
        </button>
      </div>
    </React.Fragment>
  );
};

export default Service_Sales_info_payment_info_lic;
