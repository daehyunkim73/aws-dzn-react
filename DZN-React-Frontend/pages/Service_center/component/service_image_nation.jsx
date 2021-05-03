import React from 'react';

const Service_image_nation = (props) => {
    const { slide_api_info, service_appr_info } = props;
    return (
        <React.Fragment>
            <div className="working_activity">
                <div class="working_activity_box">
                    <div class="service_working_activity_api">
                        <div>
                            {
                                service_appr_info.filter((api_ifno) => {
                                    return api_ifno.pdsvc_idx === slide_api_info.pdsvc_idx
                                }).map((svcData) => {
                                    return (
                                        svcData.stat === 1 ? (
                                            <p class="service_working_activity_api_type service_working_activity_api_type_create">제작중</p>
                                        ) : svcData.stat === 2 ? (
                                            <p class="service_working_activity_api_type service_working_activity_api_type_judge">심사중</p>
                                        ) : svcData.stat === 3 ? (
                                            <p class="service_working_activity_api_type service_working_activity_api_type_approved">승인</p>
                                        ) : svcData.stat === 4 ? (
                                            <p class="service_working_activity_api_type service_working_activity_api_type_judge_fail">심사반려</p>
                                        ) : svcData.stat === 5 ? (
                                            <p class="service_working_activity_api_type service_working_activity_api_type_sale">판매중</p>
                                        ) : (svcData.stat === 6 &&
                                            <p className="service_working_activity_api_type service_working_activity_api_type_sale_stop">판매중지</p>)
                                    )
                                })
                            }
                            <p class="service_working_activity_api_text">{
                                service_appr_info.filter((api_ifno) => {
                                    return api_ifno.pdsvc_idx === slide_api_info.pdsvc_idx
                                }).map((result_api) => {
                                    return (
                                        <span>{result_api.svc_title}</span>
                                    )
                                })
                            }</p>
                        </div>
                    </div>
                    <div class="working_activity_info_wrap">
                        <div class="working_activity_nickname_wrap">
                            <p class="working_activity_nickname">{slide_api_info.wehago_api_name}</p>
                        </div>
                        <div class="working_activity_type">
                            <p class="wise">호출</p>
                        </div>
                        <p class="working_activity_info">일 200,000</p>
                        <div class="working_activity_type">
                            <p class="wise">요금제</p>
                        </div>
                        <p class="working_activity_info">{slide_api_info.free_gbn === "1" ? "유료" : "무료"}</p>
                        <div class="working_activity_date">
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Service_image_nation;