import React, { useEffect, useState, useCallback } from 'react';
import Data_center_exposure_popup_v1 from '../../../../popup/Popup_datacenter_Management/Data_center_exposure_popup_v1';
import Data_center_exposure_popup_v2 from '../../../../popup/Popup_datacenter_Management/Data_center_exposure_popup_v2';
import list_icon from '../../../../../../image/Center/List_icon/list_icon.png';
import { Server_ajax_post } from '../../../../../../Server_ajax';

const Sales_info_exposure_info_wrap = ({salesData, salesState, setSalesState}) => {

    const {
        show_gbn, tel, pdbase_idx,
        // 저장된 파일 정보 가져오기
        file_path_1,file_path_2,file_path_3,file_path_4,file_path_5,
        scrsht_desc_1,scrsht_desc_2,scrsht_desc_3,scrsht_desc_4,scrsht_desc_5,
        scrsht_file_1,scrsht_file_2,scrsht_file_3,scrsht_file_4,scrsht_file_5,
        scrsht_title_1,scrsht_title_2,scrsht_title_3,scrsht_title_4,scrsht_title_5
    } = salesData;    
        
    // 각 파일 배열로 저장
    const salesInfoScFileList = [
        {file_path:file_path_1, scrsht_desc:scrsht_desc_1, scrsht_file:scrsht_file_1, scrsht_title:scrsht_title_1},
        {file_path:file_path_2, scrsht_desc:scrsht_desc_2, scrsht_file:scrsht_file_2, scrsht_title:scrsht_title_2},
        {file_path:file_path_3, scrsht_desc:scrsht_desc_3, scrsht_file:scrsht_file_3, scrsht_title:scrsht_title_3},
        {file_path:file_path_4, scrsht_desc:scrsht_desc_4, scrsht_file:scrsht_file_4, scrsht_title:scrsht_title_4},
        {file_path:file_path_5, scrsht_desc:scrsht_desc_5, scrsht_file:scrsht_file_5, scrsht_title:scrsht_title_5}
    ];

    const [isExposure, setIsExposure] = useState('');
    const [showGbnStat, setShowGbnStat] = useState('');

    // 노출여부에 따라 판매여부 설정
    useEffect(() => {
        const setData = async () => {
            try {
                if(showGbnStat === 'data') {
                    const datas = {
                        pdbase_idx,
                        sales_stat: '',
                        show_gbn: ''
                    }
        
                    if(isExposure === 'Y'){                
                        datas.sales_stat = '6'
                        datas.show_gbn = 'N'
                    }else{                
                        datas.sales_stat = '5'
                        datas.show_gbn = 'Y'
                    }            

                    const updateDataSaleInfo = await Server_ajax_post(`data_center_managment/updateDataSaleInfo`, {datas});                    
                    if(updateDataSaleInfo.affectedRows > 0){
                        setIsExposure(datas.show_gbn);
                        setSalesState(datas.sales_stat);
                    }
                }
                setShowGbnStat('');
            } catch (e) {
                return console.error(e);
            }
        } 
        setData();    
    }, [showGbnStat === 'data'])
    
    useEffect(() => {
        setIsExposure(show_gbn);
    }, []);

    const setSaleInfoShowGbn = useCallback((e) => {      
        if(!salesState){
            alert('판매가 되지 않은 데이터는 노출여부를 변경할 수 없습니다.');
            return;            
        }
          
        setIsExposure(isExposure);
      },
      [isExposure]
    );

    const exposure_btn_v1_Click = () => {
        const Admin_user_datacenter_mang_popup_bgk_v1 = document.getElementById("Admin_user_datacenter_mang_popup_bgk_v1");
        if(salesState) {
            Admin_user_datacenter_mang_popup_bgk_v1.style.display="table";
        }
    }

    const exposure_btn_v2_Click = () => {
        const Admin_user_datacenter_mang_popup_bgk_v2 = document.getElementById("Admin_user_datacenter_mang_popup_bgk_v2");
        if(salesState) {
            Admin_user_datacenter_mang_popup_bgk_v2.style.display="table";
        }
    }
    return (
        <React.Fragment>
            <Data_center_exposure_popup_v1 setShowGbnStat={setShowGbnStat} />
            <Data_center_exposure_popup_v2 setShowGbnStat={setShowGbnStat} />
            <div className="Sales_info_exposure_info_wrap clearfix">
                <div className="Sales_info_exposure_info_first_wrap">
                    <div>
                        <p>데이터유통포털 노출<span className="red"> *</span></p>
                    </div>
                    <div>
                        <p>문의/안내 연락처<span className="red"> *</span></p>
                    </div>
                    <div>
                        <p>스크린샷<span className="red"> *</span></p>
                    </div>
                </div>
                <div className="Sales_info_exposure_info_second_wrap">
                    <div className="checkbox_radio_double_wrap">
                        <div className="checkbox_radio_wrap">
                            <input type="radio" 
                                   name="data_radio_check" 
                                   id="Sales_info_radio_check"
                                   value="Y"
                                   checked={isExposure === "Y"}
                                   onChange={setSaleInfoShowGbn}
                            />
                            <label className="checkbox_design" 
                                   htmlFor="Sales_info_radio_check" 
                                   onClick={exposure_btn_v1_Click}
                            >
                                노출함
                            </label>
                        </div>

                        <div className="checkbox_radio_wrap">
                            <input type="radio" 
                                   name="data_radio_check" 
                                   id="Sales_info_radio_none_check" 
                                   value="N"
                                   checked={isExposure === "N"}
                                   onChange={setSaleInfoShowGbn}
                            />
                            <label className="checkbox_design" 
                                   htmlFor="Sales_info_radio_none_check" 
                                   onClick={exposure_btn_v2_Click}
                            >
                                노출안함
                            </label>
                        </div>
                        <div className="Sales_info_exposure_info_second_notice">
                            <span>※ 최초 승인(판매)심사가 완려된 경우, 노출설정을 하시면 데이터 유통포털에 판매노출 됩니다.</span>
                        </div>
                    </div>

                    <div className="Sales_info_Contact_wrap">
                        <input placeholder="전화번호를 입력하세요." type="text" className="form_input form-control" value={tel} readOnly />
                    </div>
                    
                    <div className="Sales_info_exposure_info_second_notice_wrap">
                        <div className="Sales_info_exposure_info_second_notice">
                            <p>※ 권장(등록) 이미지: 500px * 300px / 1MB 이하 / 이미지 권장 해상도 HD</p>                            
                        </div>
                    </div>

                    {salesInfoScFileList.map( (list, index) => 
                        <div className="Sales_info_sc_wrap clearfix" key={index}>
                            <div className="Sales_info_sc_left_wrap">
                                <div className="Sales_info_sc_img_wrap">
                                    <img className='sales_info_img_Sales_file'
                                         id={`sales_info_img_scrsht_${index}`}
                                         src={list.file_path !== '' ? `http://localhost:8081/${list.file_path}` : ''} 
                                         alt=""                                         
                                    />
                                </div>    
                                <div className="Sales_info_sc_file_name_wrap">
                                    <p id={`file_name_scrsht_${index}`}>{list.scrsht_file.slice(0, 10)}</p>                                    
                                </div>                                                           
                            </div>
                            <div className="Sales_info_sc_right_wrap Sales_info_sc_right_upload_wrap">
                                <div className="Sales_info_sc_right_first_wrap">
                                    <div>
                                        <img src={list_icon} alt="list_icon" />
                                        <p>스크린샷 제목</p>
                                    </div>
                                    <input id={`sales_info_img_title_${index}`} type="text" className="form_input form-control" value={list.scrsht_title} readOnly />
                                </div>
                                <div className="Sales_info_sc_right_second_wrap">
                                    <div>
                                        <img src={list_icon} alt="list_icon" />
                                        <p>스크린샷 설명</p>
                                    </div>
                                    <textarea id={`sales_info_img_desc_${index}`} rows="3" className="form-control" value={list.scrsht_desc} readOnly></textarea>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>


        </React.Fragment>
    )
}

export default Sales_info_exposure_info_wrap;