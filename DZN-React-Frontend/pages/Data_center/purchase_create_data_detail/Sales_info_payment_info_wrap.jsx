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
    endCallNum,
    dtPrice,
    dayMnth_fee_type,
    setDayMnth_fee_type,
    feeInputData,
    setFeeInputData,
    saleLoad,
  } = props;
  const [feeData, setFeeData] = useState([]);
  const [feeLoad, setFeeLoad] = useState(false);
  const [reRend, setReRend] = useState(false);
  useEffect(() => {
    (async function () {
      try {
        let data = {
          pdbase_idx: pdbase_idx,
        };
        const service_by_id = await Server_ajax_post(
          `datacenter/getDataFeeInfo`,
          data
        );
        if (service_by_id.length >= 1) {
          setFeeInputData(() => service_by_id);
          setDayMnth_fee_type(service_by_id[0].dayMnth_fee_type);
        } else {
          setFeeInputData((feeData) => [
            ...feeData,
            {
              endCallNum: "",
              dtPrice: "",
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
  }, [reRend === true]);

  useEffect(() => {
    if (feeLoad === true) {
      setPay_type(pay_type);
      feeData[0] && setDayMnth_fee_type(feeData[0].dayMnth_fee_type);
      feeData[0] && setPay_notice(feeData[0].pay_notice);
    }
  }, [feeLoad]);
  
  const handelPaytype = useCallback((e) => {          
    // 0: 무료, 1: 유료            
      const payType = e.target.value;
      setPay_type(payType);
      
      // 무료일 때 모두 초기화
      if(payType === "0"){                
        setFeeInputData(() => [        
          {
            endCallNum: "",
            dtPrice: "",
          },
        ]);
        setDayMnth_fee_type("");
      } else {
        setDayMnth_fee_type("D");
      }
    },
    [pay_type]
  );

  // 항목 추가 이벤트
  const handleAddCallNumPrice = useCallback(
    (e) => {
      setFeeInputData((feeData) => [
        ...feeData,
        {
          endCallNum: "",
          dtPrice: "",
        },
      ]);
    },
    [feeData, setFeeInputData]
  );
  
  // 삭제 이벤트
  const handleRemoveCallNumPrice = useCallback(
    (index) => (e) => {      
      let returnArr2 = Object.values(feeInputData)
        .map((item, idx) => {
          return Number(idx) === Number(e.target.value) ? false : item;
        })
        .filter((val) => {
          return val !== false;
        });      
      setFeeData(() => returnArr2);
    },
    [feeData, feeInputData]
  );

  // // 요금제 선택 이벤트
  // const handleDayMnth_fee_type = (e) => {
  //   if (e.currentTarget.checked) {
  //     setDayMnth_fee_type(e.target.value);
  //   } else {
  //     setDayMnth_fee_type("");
  //   }
  // };

  // 과금시 유의사항 입력창 변경 이벤트
  const handlePay_notice = (e) => {
    setPay_notice(e.target.value);
  };

  useEffect(() => {    
    if (feeData.length <= 0) {
      endCallNum.current[0] =
        endCallNum.current[0] || React.createRef();
      dtPrice.current[0] = dtPrice.current[0] || React.createRef();
    } else {
      setFeeInputData([]);
      [...Array(endCallNum.current.length)].map((item, idx) => {
        endCallNum.current[idx] =
          endCallNum.current[idx] || React.createRef();
        dtPrice.current[idx] =
          dtPrice.current[idx] || React.createRef();
        setFeeInputData((feeInputData) => [
          ...feeInputData,
          {
            endCallNum: endCallNum.current[idx].value,
            dtPrice: dtPrice.current[idx].value,
          },
        ]);
      });
    }
    setFeeInputData(feeData);    
  }, [feeData]);

  // 횟수, 원 입력
  const handleFeeInputData = (e) => {    
    setFeeInputData([]);
    [...Array(feeInputData.length)].map((item, idx) => {
      setFeeInputData((feeInputData) => [
        ...feeInputData,
        {
          endCallNum: endCallNum.current[idx].value,
          dtPrice: dtPrice.current[idx].value,
        },
      ]);
    });
  };

  return (
    <React.Fragment>
      <div className="Sales_info_payment_info_wrap clearfix">
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
                  checked={saleLoad === true && pay_type === "0"}
                  onChange={handelPaytype}
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
                  checked={pay_type === "1"}
                  onChange={handelPaytype}
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
                <button>정산계좌 등록</button>
              </div>
            </div>
            <div className="Sales_info_payment_info_input_wrap">
              <div className="radio_inputButton_box">
                <input
                  type="checkbox"
                  name="payment_info_check"
                  id="Payemnt_info_check"
                  value="D"
                  checked={dayMnth_fee_type === "D"}
                  
                />
                <label className="checkbox_design" htmlFor="Payemnt_info_check">
                  일별 호출횟수 제한 요금제
                </label>
              </div>
              {[].map.call(feeInputData, (item, idx) => {
                return (
                  <div className="Sales_info_payment_info_input" key={idx}>
                    <p>횟수</p>
                    <input
                      ref={(el) => (endCallNum.current[idx] = el)}
                      className="form_input form-control"
                      type="text"
                      value={item.endCallNum}
                      onChange={handleFeeInputData}
                    />
                    <span>회</span>
                    <input
                      ref={(el) => (dtPrice.current[idx] = el)}
                      className="form_input form-control"
                      type="text"
                      value={item.dtPrice}
                      onChange={handleFeeInputData}
                    />
                    <span>원</span>
                    {(feeInputData.length - 1 === idx ||
                      (feeInputData.length === 1 && 0 === idx)) && (
                      <button value={idx} onClick={handleAddCallNumPrice}>
                        추가
                      </button>
                    )}
                    {feeInputData.length > 1 && 0 <= idx && (
                      <button
                        value={idx}
                        onClick={handleRemoveCallNumPrice(idx)}
                      >
                        삭제
                      </button>
                    )}
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
              defaultValue={pay_notice}
              onChange={handlePay_notice}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Sales_info_payment_info_wrap;
