import React from 'react';
import Side_nav from '../components/side_nav';
import Data_center from '../data_center/dashboard';
import Service_center from '../service_center/dashboard';
import User_list from '../user_list/user_list';
import Service_product_detail_management from '../service_product_detail_management/service_product_detail_management';
import Service_product_management from '../service_product_management/service_product_management';

// import Profile from './profile';
// import Data_true from './data_true';

const Side_bar = () => {

    return (
        <React.Fragment>
            <div className="wrapper">
                <Side_nav />
                <div id="content">
                    <div className="container-fluid">
                        {/* <Service_product_management /> */}
                        {/* <Service_product_detail_management /> */}

                        {/* <User_list /> */}
                        {/* <Data_center /> */}
                        {/* <Service_center /> */}
                    {/* <Profile /> 회원정보 페이지 */}
                    {/* <Data_true />  */}
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

export default Side_bar;