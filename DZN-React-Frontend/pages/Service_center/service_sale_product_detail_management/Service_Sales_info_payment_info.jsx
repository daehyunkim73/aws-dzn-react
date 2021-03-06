import React, { useCallback } from "react";
import large_list_icon from "../../../image/Center/List_icon/large_list_icon.png";
import { useServiceSalesContext_sale } from "./service_product_detail_management";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { Server_ajax_post } from "../../../server_ajax";

const Service_Sales_info_payment_info = () => {
  const {
    svc_pay_notice_ref,
    svc_pay_cate_ref,
    pay_notice,
    pay_cate_state,
    setPay_cate_state,
    pay_point_state,
    setPay_point_state,
    paid_payment_price,

    svc_pay_lic_personnel_ref,
    svc_pay_lic_price_ref,
    pay_type,
    setPay_type,
    reRend,
    setReRend,
    serviceID,

    svc_pay_lic_array,
    setSvc_pay_lic_array,

    svc_pay_lic_personnel,
    svc_pay_lic_price,

    svc_pay_lic_data_array,
    setSvc_pay_lic_data_array,
  } = useServiceSalesContext_sale();
  const history = useHistory();

  useEffect(() => {
    if (pay_cate_state === 1) {
      svc_pay_cate_ref.current.value = "";
    } else if (pay_cate_state === 0) {
      svc_pay_lic_personnel_ref.current.value = "";
      svc_pay_lic_price_ref.current.value = "";
    }
  }, [pay_cate_state]);

  const payment_type_click_evt = (e) => {
    if (e.target.id === "Payemnt_info_radio_check") {
      setPay_type(0);
    } else {
      setPay_type(1);
    }
  };

  const payment_cate_click_evt = (e) => {
    if (e.target.id === "license_check") {
      setPay_cate_state(1);
    } else {
      setPay_cate_state(0);
    }
  };

  const payment_point_click_evt = (e) => {
    if (e.target.id === "Payemnt_info_point_check") {
      setPay_point_state(0);
    } else {
      setPay_point_state(1);
    }
  };

  useEffect(() => {
    let data = {
      pdsvc_idx: serviceID,
    };
    (async function () {
      try {
        const getSvcFeeInfo = await Server_ajax_post(
          `svccenter/getSvcFeeInfo`,
          data
        );
        if (getSvcFeeInfo.length >= 1) {
          setSvc_pay_lic_array((svc_pay_lic_array) => getSvcFeeInfo);
        } else {
          setSvc_pay_lic_array((svc_pay_lic_array) => [
            ...svc_pay_lic_array,
            {
              svc_pay_lic_personnel_ref: 0,
              svc_pay_lic_price_ref: 0,
            },
          ]);
        }
      } catch (e) {
        return console.error(e);
      }
    })();
    setReRend(false);
  }, [reRend === true]);

  const handleFeeInputData = (e) => {
    setSvc_pay_lic_array([]);
    [...Array(svc_pay_lic_array.length)].map((item, idx) => {
      setSvc_pay_lic_array((svc_pay_lic_array) => [
        ...svc_pay_lic_array,
        {
          pay_lic_personnel: svc_pay_lic_personnel_ref.current[idx].value,
          pay_lic_price: svc_pay_lic_price_ref.current[idx].value,
        },
      ]);
    });
  };

  const RegisterAccountEvt = () => {
    history.push("/setting/settlement");
  };

  useEffect(() => {
    if (svc_pay_lic_array.length >= 1) {
      Object.values(svc_pay_lic_array).map((item, idx) => {
        svc_pay_lic_personnel_ref.current[idx] =
          svc_pay_lic_personnel_ref.current[idx] || React.createRef();
        svc_pay_lic_price_ref.current[idx] =
          svc_pay_lic_price_ref.current[idx] || React.createRef();
      });
    } else {
      svc_pay_lic_personnel_ref.current[0] =
        svc_pay_lic_personnel_ref.current[0] || React.createRef();
      svc_pay_lic_price_ref.current[0] =
        svc_pay_lic_price_ref.current[0] || React.createRef();
    }
  }, [svc_pay_lic_array]);

  return (
    <React.Fragment>
      <div className="Sales_info_payment_info_wrap clearfix">
        <div className="Sales_info_payment_info_first_wrap">
          <div
            className={pay_type !== 0 && "Service_Sales_info_payment_method"}
          >
            <p>
              ????????????<span className="red"> *</span>
            </p>
          </div>
          <div>
            <p>?????? ????????????</p>
          </div>
        </div>
        <div className="Sales_info_payment_info_second_wrap">
          <div>
            <div className="payment_info_radio_wrap">
              <div className="radio_inputButton_box">
                <input
                  type="radio"
                  name="payment_info_radio_check"
                  id="Payemnt_info_radio_check"
                  onClick={payment_type_click_evt}
                  checked={pay_type === 0 && true}
                  disabled
                />
                <label
                  className="checkbox_design"
                  htmlFor="Payemnt_info_radio_check"
                >
                  ??????
                </label>
              </div>

              <div className="radio_inputButton_box">
                <input
                  type="radio"
                  name="payment_info_radio_check"
                  id="Payemnt_info_radio_none_check"
                  onClick={payment_type_click_evt}
                  checked={pay_type === 1 && true}
                  disabled
                />
                <label
                  className="checkbox_design"
                  htmlFor="Payemnt_info_radio_none_check"
                >
                  ??????
                </label>
              </div>

              <div className="Sales_info_payment_info_notice_wrap">
                <span className="red">
                  ??? ????????? ?????? ????????????????????? ???????????????.
                </span>
              </div>
              <div className="Sales_info_payment_info_btn_wrap">
                <button onClick={RegisterAccountEvt}>???????????? ??????</button>
              </div>
            </div>
            {pay_type !== 0 && (
              <div className="Sales_info_payment_info_input_wrap">
                <div className="Sales_info_payment_info_input_title">
                  <img
                    src={large_list_icon}
                    className="large_list_icon"
                    alt="list_icon"
                  />
                  <span>???????????? ????????? ??????????????????.</span>
                </div>
                <div className="radio_inputButton_box radio_inputButton_box_btn">
                  <input
                    type="radio"
                    name="license_check"
                    id="license_none_check"
                    onClick={payment_cate_click_evt}
                    checked={pay_cate_state === 0 && true}
                    disabled
                  />
                  <label
                    className="checkbox_design"
                    htmlFor="license_none_check"
                  >
                    ????????? ??????
                  </label>
                </div>
                <button>????????? ??????</button>
                <div className="Sales_info_payment_info_input Sales_info_payment_info_input_mb_none">
                  <p className="nbsp"></p>
                  <select className="form-control" disabled>
                    <option>????????? ?????????</option>
                  </select>
                  <img
                    src={large_list_icon}
                    className="large_list_icon"
                    alt="list_icon"
                  />
                  <span>??????</span>

                  <input
                    className="form_input form-control"
                    type="number"
                    ref={svc_pay_cate_ref}
                    defaultValue={paid_payment_price}
                    readOnly
                  />
                  <span>???</span>
                </div>
                <div className="radio_inputButton_box radio_inputButton_box_btn">
                  <input
                    type="radio"
                    name="license_check"
                    id="license_check"
                    onClick={payment_cate_click_evt}
                    checked={pay_cate_state === 1 && true}
                    disabled
                  />
                  <label className="checkbox_design" htmlFor="license_check">
                    ???????????? ??????
                  </label>
                </div>
                {svc_pay_lic_array.map((item, idx) => {
                  return (
                    <div className="Sales_info_payment_info_input" key={idx}>
                      <p className="nbsp"></p>
                      <img
                        src={large_list_icon}
                        className="large_list_icon"
                        alt="list_icon"
                      />
                      <span>???????????? ??????</span>
                      <input
                        className="form_input form-control svc_pay_lic_personnel_input"
                        type="number"
                        ref={(el) =>
                          (svc_pay_lic_personnel_ref.current[idx] = el)
                        }
                        value={item.lic_user_limit}
                        onChange={handleFeeInputData}
                        readOnly
                      />
                      <span>???</span>
                      <p className="nbsp"></p>
                      <img
                        src={large_list_icon}
                        className="large_list_icon payAllCheck"
                        alt="list_icon"
                      />

                      <span>?????? ??????</span>
                      <input
                        className="form_input form-control"
                        type="number"
                        ref={(el) => (svc_pay_lic_price_ref.current[idx] = el)}
                        value={item.lic_mnthly_chrgeAmnt}
                        onChange={handleFeeInputData}
                        readOnly
                      />
                      <span>???</span>
                      {idx === svc_pay_lic_array.length - 1 && (
                        <button value={idx}>??????</button>
                      )}

                      {svc_pay_lic_array.length - 1 !== 0 && (
                        <button value={idx}>??????</button>
                      )}
                    </div>
                  );
                })}

                <div className="Sales_info_payment_info_notice_wrap">
                  <p className="nbsp"></p>
                  <span className="red">
                    ??? ???????????? 0??? ?????? ??? ????????? ?????????????????????.
                  </span>
                </div>
              </div>
            )}
            <div className="Sales_info_payment_info_input_wrap Sales_info_payment_info_point_input_wrap">
              <div className="Sales_info_payment_info_input_title">
                <img
                  src={large_list_icon}
                  className="large_list_icon"
                  alt="list_icon"
                />
                <span>????????? ??????????????? ??????????????????.</span>
              </div>
              <div className="payment_info_radio_wrap">
                <div className="radio_inputButton_box">
                  <input
                    type="radio"
                    name="payment_info_point_check"
                    id="Payemnt_info_point_check"
                    onClick={payment_point_click_evt}
                    checked={pay_point_state === 0 && true}
                    disabled
                  />
                  <label
                    className="checkbox_design"
                    htmlFor="Payemnt_info_point_check"
                  >
                    ????????? ??????
                  </label>
                </div>

                <div className="radio_inputButton_box">
                  <input
                    type="radio"
                    name="payment_info_point_check"
                    id="Payemnt_info_point_none_check"
                    onClick={payment_point_click_evt}
                    checked={pay_point_state === 1 && true}
                    disabled
                  />
                  <label
                    className="checkbox_design"
                    htmlFor="Payemnt_info_point_none_check"
                  >
                    ????????? ?????? ??? ???
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="Sales_info_payment_info_text_wrap">
            <input
              placeholder="?????? 100????????? ?????? ???????????????."
              type="text"
              className="form_input form-control"
              maxLength={100}
              ref={svc_pay_notice_ref}
              defaultValue={pay_notice}
              readOnly
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Service_Sales_info_payment_info;
