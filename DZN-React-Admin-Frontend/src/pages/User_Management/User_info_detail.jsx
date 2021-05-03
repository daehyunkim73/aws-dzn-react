import React from 'react';
import Join_info from './components/User_info_detail/Join_info';
import Comp_info from './components/User_info_detail/Comp_info';
import Data_sale from './components/User_info_detail/Data_sale';
import Service_sale from './components/User_info_detail/Service_sale';
import Calculate from './components/User_info_detail/Calculate';
import Pagination from '../../Big_component/Pagination';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Individual_member_popup from '../popup/Popup_User_Management/Individual_members_popup';


const User_info_detail = () => {
    const Notcie_post_Click = () => {
        const Admin_user_info_popup_bgk = document.getElementById("Admin_user_info_popup_bgk");
        Admin_user_info_popup_bgk.style.display="table";
    }
    return (
        <React.Fragment>
            <Individual_member_popup />
            <div className="user_info_detail_wrap clearfix">
                
                <div className="Page_same_text clearfix">
                    <p className="backoffice_title">회원 상세정보</p>
                    <div className='title_side_btn'>
                        <button className='table_view_btn' onClick={Notcie_post_Click}>수동 알림 보내기</button>
                        <button className='table_view_btn'>목록</button>
                    </div>
                    
                </div>
                <div className='user_join_info'>
                    <Join_info />
                </div>
                <div className='user_comp_info'>
                    <Comp_info />
                </div>
                <div className="userinfo_save_btn_wrap"> 
                    <button>저장</button>
                </div>
                <Tabs defaultActiveKey="data_sale" id="uncontrolled-tab-example" className='info_tabs'>
                    <Tab eventKey="data_sale" title="데이터 판매" >
                        <Data_sale />
                    </Tab>
                    <Tab eventKey="sale" className="service_sale" title="서비스 판매">
                        <Service_sale/>
                    </Tab>
                    <Tab eventKey="calculate" title="매출정산">
                        <Calculate/>
                    </Tab>
                </Tabs>
                <Pagination />
            </div>

        </React.Fragment>
    )
}

export default User_info_detail;