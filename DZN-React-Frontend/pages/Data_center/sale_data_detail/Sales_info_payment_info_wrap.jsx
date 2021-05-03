import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCallback } from "react";
import { useRef } from "react";
import { Server_ajax_post } from "../../../server_ajax";

const Sales_info_payment_info_wrap = (props) => {
  const {
    pdbase_idx,
    pay_type,
    setPay_type,
    pay_notice,
    setPay_notice,
    callNumRef,
    priceRef,
    dayMnth_fee_type,
    setDayMnth_fee_type,
    feeInputData,
    setFeeInputData,
    saleLoad,
  } = props;

  const [feeData, setFeeData] = useState([]);
  const [feeLoad, setFeeLoad] = useState(false);
  const [reRend, setReRend] = useState(false);
  //const [dayMnth_fee_type, setDayMnth_fee_type] = useState('');
  //const callNumRef = useRef([]);
  //const priceRef = useRef([]);

  useEffect(() => {
    try {
      (async function () {
        try {
          const result = await Server_ajax_post(`datacenter/getDataFeeInfo`, {
            pdbase_idx: props.pdbase_idx,
          });
          if (result.length >= 1) {
            setFeeData((feeData) => result);
          } else {
            setFeeData((feeData) => [
              ...feeData,
              {
                pdfee_idx: 0,
                pdbase_idx: props.pdbase_idx,
                dayMnth_fee_type: "D",
                beginCallNum: null,
                endCallNum: 0,
                dtPrice: 0,
                useGbn: "Y",
                show_gbn: "Y",
              },
            ]);
          }
          setFeeLoad(true);
        } catch (e) {
          return console.error(e);
        }
      })();
      setFeeLoad(false);
      setReRend(false);
    } catch (e) {
      console.error(e);
    }
  }, [reRend === true]);

  useEffect(() => {
    if (feeLoad === true) {
      props.setPay_type(props.pay_type);
      props.setDayMnth_fee_type(feeData[0].dayMnth_fee_type);
      props.setPay_notice(feeData[0].pay_notice);
    }
  }, [feeLoad]);

  const handelPaytype = useCallback(
    (e) => {
      props.setPay_type(e.target.value);
    },
    [props.pay_type]
  );

  const handleAddCallNumPrice = useCallback(
    (e) => {
      setFeeData((feeData) => [
        ...feeData,
        {
          pdfee_idx: 0,
          pdbase_idx: props.pdbase_idx,
          dayMnth_fee_type: "D",
          beginCallNum: null,
          endCallNum: "",
          dtPrice: "",
          useGbn: "Y",
          show_gbn: "Y",
        },
      ]);
    },
    [feeData]
  );

  const handleRemoveCallNumPrice = useCallback(
    (e) => {
      let returnArr = Object.values(feeData)
        .map((item, idx) => {
          return Number(idx) === Number(e.target.value) ? false : item;
        })
        .filter((val) => {
          return val !== false;
        });
      setFeeData((feeData) => returnArr);
    },
    [feeData]
  );

  const handleDayMnth_fee_type = (e) => {
    if (e.currentTarget.checked) {
      props.setDayMnth_fee_type(e.target.value);
    } else {
      props.setDayMnth_fee_type("");
    }
  };

  const handlePay_notice = (e) => {
    props.setPay_notice(e.target.value);
  };

  useEffect(() => {
    if (feeData.length >= 1) {
      Object.values(feeData).map((item, idx) => {
        props.callNumRef.current[idx] =
          props.callNumRef.current[idx] || React.createRef();
        props.priceRef.current[idx] =
          props.priceRef.current[idx] || React.createRef();
      });
    } else {
      props.callNumRef.current[0] =
        props.callNumRef.current[0] || React.createRef();
      props.priceRef.current[0] =
        props.priceRef.current[0] || React.createRef();
    }
  }, [feeData]);

  const handleFeeInputData = (e) => {
    props.setFeeInputData([]);
    [...Array(props.callNumRef.current.length)].map((item, idx) => {
      props.setFeeInputData((feeInputData) => [
        ...feeInputData,
        {
          callNumRef: props.callNumRef.current[idx].value,
          priceRef: props.priceRef.current[idx].value,
        },
      ]);
    });
  };

  return (
    <React.Fragment>
      <div className="Sales_info_payment_info_wrap clearfix" disabled>
        <div className="Sales_info_payment_info_first_wrap">
          <div className="Sales_info_payment_method">
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
                  value="0"
                  checked={saleLoad === true && props.pay_type === "0"}
                  onChange={handelPaytype}
                  disabled
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
                  value="1"
                  checked={props.pay_type === "1"}
                  onChange={handelPaytype}
                  disabled
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
                  ※ 요금제 정보 수정은 상단 '승인심사' 탭에서 파일을 첨부하시어
                  진행해 주시기 바랍니다.
                </span>
              </div>
            </div>
            <div className="Sales_info_payment_info_input_wrap">
              <div className="radio_inputButton_box">
                <input
                  type="checkbox"
                  name="payment_info_check"
                  id="Payemnt_info_check"
                  value="D"
                  checked={props.dayMnth_fee_type === "D"}
                  onChange={handleDayMnth_fee_type}
                  disabled
                />
                <label className="checkbox_design" htmlFor="Payemnt_info_check">
                  일별 호출횟수 제한 요금제
                </label>
              </div>
              {Object.values(feeData).map((item, idx) => {
                return (
                  <div className="Sales_info_payment_info_input" key={idx}>
                    <p>횟수</p>
                    <input
                      ref={(el) => (props.callNumRef.current[idx] = el)}
                      className="form_input form-control"
                      type="text"
                      defaultValue={
                        feeData[0].endCallNum ? feeData[0].endCallNum : ""
                      }
                      onChange={handleFeeInputData}
                      disabled
                    />
                    <span>회</span>
                    <input
                      ref={(el) => (props.priceRef.current[idx] = el)}
                      className="form_input form-control"
                      type="text"
                      defaultValue={
                        feeData[0].dtPrice ? feeData[0].dtPrice : ""
                      }
                      onChange={handleFeeInputData}
                      disabled
                    />
                    <span>원</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="Sales_info_payment_info_text_wrap">
            <input
              placeholder="최대 100자까지 등록 가능합니다."
              type="text"
              className="form_input form-control"
              defaultValue={props.pay_notice}
              onChange={handlePay_notice}
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sales_info_payment_info_wrap;
