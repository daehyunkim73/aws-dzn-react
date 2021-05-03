import React, { useEffect, useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Data_Approved_management_basic_info from './components/Data_Approved_management/Data_Approved_management_basic/Data_Approved_management_basic_info';
import Data_Approved_management_sale_detail from './components/Data_Approved_management/Data_Approved_management_sale/data_sale_main';
import Data_Approved_management_judge from './components/Data_Approved_management/Data_Approved_management_judge/Data_Approved_management_judge';
import { Server_ajax_post } from "../../../Server_ajax";

const Data_Approved_management = ({match}) => {
    const { dzonDataIdx:dzon_data_idx, pdbaseIdx:pdbase_idx } = match.params;
    const [defaultData, setDefaultData] = useState();
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState('');
    const [salesState, setSalesState] = useState('');
    const [stateSetting, setStateSetting] = useState({
        name: '',
        style: ''
    });
    const [salesStateSetting, setSalesStateSetting] = useState({
        name: '',
        style: ''
    });

    useEffect(() => {
        const getData = async () => {
            try {                
                // 기본정보 불러오기
                const datas = {
                    dzon_data_idx,
                    pdbase_idx
                };
                
                const getDefaultDataInfo = await Server_ajax_post("data_center_managment/getDefaultDataInfo", {datas});

                
                const resData = getDefaultDataInfo[0];
                setDefaultData(resData);
                setState(resData.stat);            
                setSalesState(resData.sales_stat);
                setLoading(true);                
            } catch(e) {
                console.error(e);
            }
        }
        getData();
    }, [])

    // 상태 정보에 따른 스타일 및 상태명
    useEffect(() => {
        if(state) {
            switch(state) {
                case "2": setStateSetting({name: '승인요청', style: "judge_badge"}); break;
                case "3": setStateSetting({name: '승인', style: "judge_ok_badge"}); break;
                case "4": setStateSetting({name: '심사반려', style: "judge_return_badge"}); break;
            }
        }        
    }, [state]);

    // 판매 여부 따른 스타일 밑 상태 변경
    useEffect(() => {
        if(salesState){
            switch(salesState){
                case "5": setSalesStateSetting({name: '판매중', style: 'sales_badge'}); break;
                case "6": setSalesStateSetting({name: '판매중지', style: 'sales_stop_badge'}); break;
            }
        }
    }, [salesState])

    return (
        <React.Fragment>
            <div className="Data_Approved_management_wrap">
                <div className="Page_same_text">
                    <p className="backoffice_title">데이터 상세정보</p>
                </div>
                <div className="service_title_wrap">
                    <div className="service_title_wrap_left">
                        <div>일반전표 (일별 매출, 매입 합산 집계 데이터)                        
                            {salesState && <p className={salesStateSetting.style}>{salesStateSetting.name}</p>}                            
                            <p className={stateSetting.style}>{stateSetting.name}</p>         
                            <p className="id_badge">{defaultData && `${defaultData.mbr_name}/${defaultData.mbr_id}`}</p>
                        </div>
                    </div>
                </div>
                <Tabs className="backoffice_tab_wrap" defaultActiveKey="basic" id="uncontrolled-tab-example">
                    <Tab eventKey="basic" title="기본정보" className="Data_Approved_management_basic_tab_wrap" >
                        {loading && <Data_Approved_management_basic_info defaultData={defaultData} /> }
                    </Tab>
                    <Tab eventKey="sale" className="calculate_registration Data_Approved_management_sale_tab_wrap" title="판매정보">
                        {loading && <Data_Approved_management_sale_detail defaultData={defaultData} salesState={salesState} setSalesState={setSalesState}/>}
                    </Tab>
                    <Tab eventKey="judge" className="calculate_registration" title="승인 심사">
                        {loading && <Data_Approved_management_judge defaultData={defaultData} state={state} setState={setState} />}
                    </Tab>
                </Tabs>

            </div>

        </React.Fragment>
    )
}

export default Data_Approved_management;