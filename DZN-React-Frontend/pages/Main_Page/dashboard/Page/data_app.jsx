import React from 'react';
import Left_data_popular from '../components/Left_data_popular';
import Right_app_popular from '../components/Right_app_popular';

const Data_app = () => {
    return (
        <React.Fragment>
            <div className="big_section_same_box">
                <div className="section_wrap">
                   <Left_data_popular />
                   <Right_app_popular />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Data_app;