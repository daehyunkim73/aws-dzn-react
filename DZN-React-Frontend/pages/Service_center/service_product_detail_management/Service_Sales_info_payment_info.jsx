import React, { useCallback } from "react";
import large_list_icon from "../../../image/Center/List_icon/large_list_icon.png";
import { useServiceSalesContext } from "./service_product_detail_management";
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
    dataSave,
  } = useServiceSalesContext();
  const history = useHistory();

  // useEffect(() => {
  //   if (pay_cate_state === 1) {
  //     svc_pay_cate_ref.current.value = "";
  //   } else if (pay_cate_state === 0) {
  //     svc_pay_lic_personnel_ref.current.value = "";
  //     svc_pay_lic_price_ref.current.value = "";
  //   }
  // }, [pay_cate_state]);

  // 결제방식 ( 무료 = 0, 유료 = 1 )
  const payment_type_click_evt = (e) => {
    // 무료 radio 버튼에 id값 = Payemnt_info_radio_check
    if (e.target.id === "Payemnt_info_radio_check") {
      // 무료 선택 시 0을 저장
      setPay_type(0);
    } else {
      // 유료 선택 시 1을 저장
      setPay_type(1);
    }
  };

  // 유료결제 방법 ( 요금제 방식 = 0, 라이선스  방식 = 1 )
  const payment_cate_click_evt = (e) => {
    // 요금제 방식 radio 버튼에 id값 = license_none_check
    if (e.target.id === "license_none_check") {
      // 요금제 방식 선택 시 0을 저장
      setPay_cate_state(0);
    } else {
      // 라이선스 방식 선택 시 1을 저장
      setPay_cate_state(1);
    }
  };

  // 포인트 사용여부 ( 포인트 사용 = 0, 포인트 사용 안함 = 1 )
  const payment_point_click_evt = (e) => {
    // 포인트 사용 radio 버튼에 id값 = Payemnt_info_point_check
    if (e.target.id === "Payemnt_info_point_check") {
      // 포인트 사용 선택 시 0을 저장
      setPay_point_state(0);
    } else {
      // 포인트 사용 안함 선택 시 1을 저장
      setPay_point_state(1);
    }
  };

  // DB에 저장되어 있는 라이선스 방식의 값을 가져와서 뿌려줌
  useEffect(() => {
      try {
        (async function () {
          try {
            const result = await Server_ajax_post(`svccenter/getSvcFeeInfo`, {
              pdsvc_idx: serviceID,
            });
            if (result.length >= 1) {
              setSvc_pay_lic_array((svc_pay_lic_array) => result);
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
        //   setFeeLoad(false);
        setReRend(false);
      } catch (e) {
        console.error(e);
      }
  }, [reRend]);

  // 결제정보 라이선스 방식 추가 기능
  const handleAddPayLic = useCallback(() => {
    if (dataSave[0].stat !== 2 && dataSave[0].stat !== 3) {
      setSvc_pay_lic_array((svc_pay_lic_array) => [
        ...svc_pay_lic_array,
        {
          lic_user_limit: "",
          lic_mnthly_chrgeAmnt: "",
        },
      ]);
    }
  }, [svc_pay_lic_array]);

  // 결제정보 라이선스 방식 삭제 기능
  const handleRemoveCallNumPrice = useCallback(
    (e) => {
      if (dataSave[0].stat !== 2 && dataSave[0].stat !== 3) {
        const ClickTarget = e.target.value;

        svc_pay_lic_array.map((val, cnt) => {
          if (Number(ClickTarget) === cnt) {
            setSvc_pay_lic_array(
              svc_pay_lic_array.splice(svc_pay_lic_array.splice(cnt, 1))
            );
          }
        });
      }
    },
    [svc_pay_lic_array]
  );

  // 라이선스 방식에 입력한 데이터를 인식하여 value 값을 바꿔줌 ( react에서 value 값을 지정하면 입력 못하는 오류로 인한 기능 )
  const handleFeeInputData = (e) => {
    setSvc_pay_lic_array([]);
    [...Array(svc_pay_lic_array.length)].map((item, idx) => {
      setSvc_pay_lic_array((svc_pay_lic_array) => [
        ...svc_pay_lic_array,
        {
          lic_user_limit: svc_pay_lic_personnel_ref.current[idx].value,
          lic_mnthly_chrgeAmnt: svc_pay_lic_price_ref.current[idx].value,
        },
      ]);
    });
  };

  // 결제정보에서 정산계좌 등록 버튼 클릭 시 정산정보관리 페이지로 이동.
  const RegisterAccountEvt = () => {
    history.push("/setting/settlement");
  };

  // 라이선스 방식이 늘어날 때마다 useRef를 하나 씩 추가
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
              결제방식<span className="red"> *</span>
            </p>
          </div>
          <div>
            <p>과금 유의사항</p>
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
                />
                <label
                  className="checkbox_design"
                  htmlFor="Payemnt_info_radio_check"
                >
                  무료
                </label>
              </div>

              <div className="radio_inputButton_box">
                <input
                  type="radio"
                  name="payment_info_radio_check"
                  id="Payemnt_info_radio_none_check"
                  onClick={payment_type_click_evt}
                  checked={pay_type === 1 && true}
                />
                <label
                  className="checkbox_design"
                  htmlFor="Payemnt_info_radio_none_check"
                >
                  유료
                </label>
              </div>

              <div className="Sales_info_payment_info_notice_wrap">
                <span className="red">
                  ※ 유료인 경우 정산계좌정보를 등록하세요.
                </span>
              </div>
              <div className="Sales_info_payment_info_btn_wrap">
                <button onClick={RegisterAccountEvt}>정산계좌 등록</button>
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
                  <span>유료결제 방법을 선택해주세요.</span>
                </div>
                <div className="radio_inputButton_box radio_inputButton_box_btn">
                  <input
                    type="radio"
                    name="license_check"
                    id="license_none_check"
                    onClick={payment_cate_click_evt}
                    checked={pay_cate_state === 0 && true}
                  />
                  <label
                    className="checkbox_design"
                    htmlFor="license_none_check"
                  >
                    요금제 방식
                  </label>
                </div>
                <button>요금제 보기</button>
                <div className="Sales_info_payment_info_input Sales_info_payment_info_input_mb_none">
                  <p className="nbsp"></p>
                  <select className="form-control">
                    <option>월정액 요금제</option>
                  </select>
                  <img
                    src={large_list_icon}
                    className="large_list_icon"
                    alt="list_icon"
                  />
                  <span>과금</span>

                  <input
                    className="form_input form-control"
                    type="number"
                    ref={svc_pay_cate_ref}
                    defaultValue={paid_payment_price}
                  />
                  <span>원</span>
                </div>
                <div className="radio_inputButton_box radio_inputButton_box_btn">
                  <input
                    type="radio"
                    name="license_check"
                    id="license_check"
                    onClick={payment_cate_click_evt}
                    checked={pay_cate_state === 1 && true}
                  />
                  <label className="checkbox_design" htmlFor="license_check">
                    라이선스 방식
                  </label>
                </div>
                {[].map.call(svc_pay_lic_array, (item, idx) => {
                  return (
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
                        ref={(el) =>
                          (svc_pay_lic_personnel_ref.current[idx] = el)
                        }
                        value={item.lic_user_limit}
                        onChange={handleFeeInputData}
                      />
                      <span>명</span>
                      <p className="nbsp"></p>
                      <img
                        src={large_list_icon}
                        className="large_list_icon payAllCheck"
                        alt="list_icon"
                      />

                      <span>매월 과금</span>
                      <input
                        className="form_input form-control"
                        type="number"
                        ref={(el) => (svc_pay_lic_price_ref.current[idx] = el)}
                        value={item.lic_mnthly_chrgeAmnt}
                        onChange={handleFeeInputData}
                      />
                      <span>원</span>
                      {idx === svc_pay_lic_array.length - 1 && (
                        <button value={idx} onClick={handleAddPayLic}>
                          추가
                        </button>
                      )}

                      {svc_pay_lic_array.length - 1 !== 0 && (
                        <button value={idx} onClick={handleRemoveCallNumPrice}>
                          삭제
                        </button>
                      )}
                    </div>
                  );
                })}

                <div className="Sales_info_payment_info_notice_wrap">
                  <p className="nbsp"></p>
                  <span className="red">
                    ※ 사용자수 0명 입력 시 무제한 라이선스입니다.
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
                <span>포인트 사용여부를 선택해주세요.</span>
              </div>
              <div className="payment_info_radio_wrap">
                <div className="radio_inputButton_box">
                  <input
                    type="radio"
                    name="payment_info_point_check"
                    id="Payemnt_info_point_check"
                    onClick={payment_point_click_evt}
                    checked={pay_point_state === 0 && true}
                  />
                  <label
                    className="checkbox_design"
                    htmlFor="Payemnt_info_point_check"
                  >
                    포인트 사용
                  </label>
                </div>

                <div className="radio_inputButton_box">
                  <input
                    type="radio"
                    name="payment_info_point_check"
                    id="Payemnt_info_point_none_check"
                    onClick={payment_point_click_evt}
                    checked={pay_point_state === 1 && true}
                  />
                  <label
                    className="checkbox_design"
                    htmlFor="Payemnt_info_point_none_check"
                  >
                    포인트 사용 안 함
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="Sales_info_payment_info_text_wrap">
            <input
              placeholder="최대 100자까지 등록 가능합니다."
              type="text"
              className="form_input form-control"
              maxLength={100}
              ref={svc_pay_notice_ref}
              defaultValue={pay_notice}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Service_Sales_info_payment_info;
