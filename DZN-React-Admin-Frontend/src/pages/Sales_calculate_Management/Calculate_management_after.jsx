import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Calculate_management_search from './components/Calculate_management/Calculate_management_search';
import Calculate_management_table from './components/Calculate_management/Calculate_management_table';
import Calculate_entry_after from './components/Calculate_management/Calculate_entry_after';
import Pagination from '../../Big_component/Pagination';


const Calculate_management = () => {
    return (
        <React.Fragment>
            <div className="Calculate_management_wrap">
                <div className="Page_same_text">
                    <p className="backoffice_title">정산관리</p>
                </div>
                <Tabs className="backoffice_tab_wrap" defaultActiveKey="sale" id="uncontrolled-tab-example">
                    <Tab eventKey="calculate_history" title="정산내역" >
                        
                    </Tab>
                    <Tab eventKey="sale" className="calculate_registration" title="정산등록">
                        <Calculate_entry_after />
                    </Tab>
                </Tabs>

            </div>

        </React.Fragment>
    )
}

export default Calculate_management;