import React from 'react';
import { Card } from 'react-bootstrap';
import Data_app_first_icon from '../../../../image/Dev_Center/DashBoard/Section_Img/data_app_first.png';
import Data_app_two_icon from '../../../../image/Dev_Center/DashBoard/Section_Img/data_app_second.png';
import Data_app_three_icon from '../../../../image/Dev_Center/DashBoard/Section_Img/data_app_three.png';
import Data_app_four_icon from '../../../../image/Dev_Center/DashBoard/Section_Img/data_app_four.png';

const Right_app_popular = () => {
    return (
        <React.Fragment>
            <div className="section_big_white_box">
                <Card className="dataApp_white_card">
                    <Card.Header className="card_header">
                        <h4 className="popular_data">인기 App 서비스</h4>
                        <div className="right_cal_box">
                            <span className="glyphicon glyphicon-calendar"></span> <span>2020.01.01 ~ 2020.01.07</span>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div className="data_app_icon_box">
                            <div>
                                <img src={Data_app_first_icon} />
                                <p>전자세금계산서</p>
                            </div>
                            <div>
                                <img src={Data_app_two_icon} />
                                <p>한컴웹오피스</p>
                            </div>
                            <div>
                                <img src={Data_app_three_icon} />
                                <p>신용지키미LTE</p>
                            </div>
                            <div>
                                <img src={Data_app_four_icon} />
                                <p>할일</p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </React.Fragment>
    )
}

export default Right_app_popular;