import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Server_ajax_post } from '../../../../../../Server_ajax';

const Sales_info_payment_info_wrap = ({salesData, rending, setRending, payDataSave}) => {
    const { pdbase_idx, pay_type, pay_notice } = salesData;    
    const [payInfoData, setPayInfoData] = useState([]); // 결제정보 데이터 저장 State  
    const [payType, setPayType] = useState();           // 결제타입 State
    const [dayMnthFee, setDayMnthFee] = useState('');     // 일별 호출횟수 제한 버튼 State
    const [payNotice, setPayNotice] = useState('');     // 과금 유의사항 State

    const endCallNum = useRef([]);
    const dtPrice = useRef([]);

    //  결제방식, 과금유의사항 기본 설정
    useEffect(() => {
        setPayType(() => pay_type);
        setPayNotice(() => pay_notice ? pay_notice : '');        
    }, [])
    
    // 결제방식 -> 횟수 제한 요금제 추가 이벤트
    const handleAddCallNumPrice = useCallback((e) => {        
        setPayInfoData([...payInfoData, {
            endCallNum: '',
            dtPrice: ''
        }])
    }, [payInfoData]);

    // 결제방식 -> 횟수 제한 요금제 삭제 이벤트
    const handleRemoveCallNumPrice = useCallback((e) => {        
        const newPayInfoData = payInfoData.filter((item, index) => {
            return index !== Number(e.target.value)
        })
        setPayInfoData(() => newPayInfoData);
    }, [payInfoData]);

    // 횟수 문자열 변경 이벤트
    const feeInputChange = () => {     
        setPayInfoData([]);
        payInfoData.map((item, idx) => {
            setPayInfoData((payInfoData) => [...payInfoData, {
                endCallNum: endCallNum.current[idx].value,
                dtPrice: dtPrice.current[idx].value
            }])
        })
    }

    // 과금 유의사항 텍스트 변경 이벤트
    const textAreaChange = (e) => {        
        setPayNotice(e.target.value)
    }

    // 일별 호출횟수 제한 요금제 변경 이벤트
    const dayMnthFeeChange = (e) => {
        if(payType === '0'){
            alert('결제방식이 무료인 경우 호출 횟수 제한 요금제를 설정할 수 없습니다.');
            return;
        }
        if (e.currentTarget.checked) {
            setDayMnthFee(e.target.value);
        }
    }

    // 무료, 유료 변경 이벤트
    const payTypeChange = (e) => {
        const salesPayPre = document.querySelectorAll('.Sales_payments_precautions');

        const selectType = e.target.value;        
        setPayType(selectType);

        if(selectType === '1'){             
            setDayMnthFee(dayMnthFee === '' ? 'D' : dayMnthFee);
        }
    }    

    // 결제정보 데이터 가져오기
    useEffect(() => {
        const getData = async () => {
            try {
                if(pay_type === '1'){                                 
                    const datas = {pdbase_idx};
                    
                    const getDataFeeInfo = await Server_ajax_post(`data_center_managment/getDataFeeInfo`, {datas});
                    const resData = getDataFeeInfo;
                    setPayInfoData(() =>resData);
                    setDayMnthFee(() => resData[0].dayMnth_fee_type);                    
                } else {            
                    setPayInfoData([...payInfoData, {
                        endCallNum: '',
                        dtPrice: ''
                    }])
                }
            }
            catch(e) {
                console.error(e);
            }
        }
        getData();
        
        setRending(false);
    }, [rending===true])


    // 결제 정보 저장
    useEffect(() => {
        const setData = async () => {
            try {
                if(payDataSave !== true) return;

                let datas = {
                    pdbase_idx,
                    payType,
                    payNotice: ''            
                }
        
                if(payType === '1'){
                    datas = {
                        ...datas,
                        payNotice,
                    }
                }
                // 판매정보 등록(결제정보 제외)
                await Server_ajax_post(`data_center_managment/setPayInfoData`, {datas});                

                // 1차. 결제정보 삭제
                await Server_ajax_post(`data_center_managment/deletePayInfoDetailData`, {datas});

                // 2차. 결제정보 유료인 경우 새로 등록        
                // 유료인 경우 새로 추가
                if(payType === '1'){
                    datas = {
                        ...datas,
                        payInfoData,
                        dayMnthFee
                    }

                    // 결제정보 등록
                    await Server_ajax_post(`data_center_managment/setPayInfoDetailData`, {datas});                    
                }                   
            } catch(e) {
                console.error(e);
            }
        }
        setData();
    }, [payDataSave === true])

    return (
        <React.Fragment>            
            <div className="Sales_info_payment_info_wrap clearfix">
                <div className="Sales_info_payment_info_first_wrap">
                    <div className="Sales_info_payment_method">
                        <p>결제방식<span className="red"> *</span></p>
                    </div>
                    <div>
                        <p>과금 유의사항</p>
                    </div>
                </div>
                <div className="Sales_info_payment_info_second_wrap">
                    <div>
                        <div className="payment_info_radio_wrap">

                            <div className="radio_inputButton_box">
                                <input type="radio" 
                                       name="payment_info_radio_check" 
                                       id="Payemnt_info_radio_check" 
                                       value='0'
                                       checked={payType === '0'}
                                       onChange={payTypeChange}
                                />
                                <label className="checkbox_design" htmlFor="Payemnt_info_radio_check">무료</label>
                            </div>

                            <div className="radio_inputButton_box">
                                <input type="radio" 
                                       name="payment_info_radio_check" 
                                       id="Payemnt_info_radio_none_check" 
                                       value='1'
                                       checked={payType === '1'}
                                       onChange={payTypeChange}
                                />
                                <label className="checkbox_design" htmlFor="Payemnt_info_radio_none_check" >유료</label>
                            </div>

                            <div className="Sales_info_payment_info_notice_wrap">
                                <span className="red">※ 유료인 경우 정산계좌정보를 등록하세요.</span>
                            </div>
                            <div className="Sales_info_payment_info_btn_wrap">
                                <button>정산계좌 등록</button>
                            </div>
                        </div>                        
                        <div className="Sales_info_payment_info_input_wrap Sales_payments_precautions">
                            <div className="radio_inputButton_box">
                                <input type="checkbox" 
                                       name="payment_info_check" 
                                       id="Payemnt_info_check_D"
                                       value="D"
                                       checked={dayMnthFee === "D"}
                                       onChange={dayMnthFeeChange}
                                       disabled={payType==="0"}
                                />
                                <label className="checkbox_design" htmlFor="Payemnt_info_check_D" >일별 호출횟수 제한 요금제</label>
                            </div>
                            <div className="radio_inputButton_box">
                                <input type="checkbox" 
                                       name="payment_info_check" 
                                       id="Payemnt_info_check_M"
                                       value="M"
                                       checked={dayMnthFee === "M"}
                                       onChange={dayMnthFeeChange}
                                       disabled={payType==="0"}
                                />
                                <label className="checkbox_design" htmlFor="Payemnt_info_check_M" >월별 호출횟수 제한 요금제</label>
                            </div>
                            
                            {
                                payInfoData && [].map.call(payInfoData, (item, index) => (
                                    <div className="Sales_info_payment_info_input" key={index}>
                                        <p>횟수</p>
                                        <input ref={ el => endCallNum.current[index] = el } 
                                               className="form_input form-control" type="text"
                                               name={`end_call_id_${index}`}
                                               value={item.endCallNum}
                                               onChange={feeInputChange}
                                               disabled={payType==="0"}
                                        />                                               
                                        <span>회</span>
                                        <input ref={ el => dtPrice.current[index] = el} 
                                               className="form_input form-control" type="text"
                                               name={`dt_price_id_${index}`}
                                               value={item.dtPrice}
                                               onChange={feeInputChange}
                                               disabled={payType==="0"}
                                        />
                                        <span>원</span>
                                        {
                                            ((payInfoData.length - 1) === index || (payInfoData.length === 1 && 0 === index)) &&
                                            <button value={index} onClick={handleAddCallNumPrice} disabled={payType==="0"}>추가</button>
                                        }{
                                            (payInfoData.length > 1 && 0 <= index) &&
                                            <button value={index} onClick={handleRemoveCallNumPrice} disabled={payType==="0"}>삭제</button>
                                        }
                                    </div>
                                ))
                            }
                        </div>                        
                    </div>

                    <div className="Sales_info_payment_info_text_wrap Sales_payments_precautions">
                        <input placeholder="최대 100자까지 등록 가능합니다." 
                               type="text" 
                               className="form_input form-control" 
                               name="pay_notice" 
                               value={payNotice} 
                               onChange={textAreaChange}
                               disabled={payType==="0"}
                        />
                    </div>
                </div>
            </div>            
        </React.Fragment>
    )
}

export default Sales_info_payment_info_wrap;