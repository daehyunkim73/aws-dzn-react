import React from 'react';

const Admin_home_statistics = () => {
    return (
        <React.Fragment>
            <div className="service_title_wrap">
                    <div className="service_title_wrap_left">
                        <p>통계</p>
                    </div>
                </div>

                <div className="home_statistics">
                    <div className="home_statistics_wrap">
                        <div className="home_statistics_top_wrap">
                            <h3 className="home_statistics_bottom_number">2,000/500,000명</h3>
                        </div>
                        <div className="home_statistics_bottom_wrap">
                            <p className="home_statistics_bottom_title">신규가입/전체 회원 수</p>
                        </div>
                    </div>
                    <div className="home_statistics_wrap">
                        <div className="home_statistics_top_wrap">
                            <h3 className="home_statistics_bottom_number">20,000건</h3>
                        </div>
                        <div className="home_statistics_bottom_wrap">
                            <p className="home_statistics_bottom_title">데이터 신규 판매등록</p>
                        </div>
                    </div>
                    <div className="home_statistics_wrap">
                        <div className="home_statistics_top_wrap">
                            <h3 className="home_statistics_bottom_number">20,000건</h3>
                        </div>
                        <div className="home_statistics_bottom_wrap">
                            <p className="home_statistics_bottom_title">서비스 신규 판매등록</p>
                        </div>
                    </div>
                    <div className="home_statistics_wrap">
                        <div className="home_statistics_top_wrap">
                            <h3 className="home_statistics_bottom_number">2,000,000원</h3>
                        </div>
                        <div className="home_statistics_bottom_wrap">
                            <p className="home_statistics_bottom_title">데이터 판매 매출</p>
                        </div>
                    </div>
                    <div className="home_statistics_wrap">
                        <div className="home_statistics_top_wrap">
                            <h3 className="home_statistics_bottom_number">2,000,000원</h3>
                        </div>
                        <div className="home_statistics_bottom_wrap">
                            <p className="home_statistics_bottom_title">서비스 판매 매출</p>
                        </div>
                    </div>
                    <div className="home_statistics_wrap">
                        <div className="home_statistics_top_wrap">
                            <h3 className="home_statistics_bottom_number">3,000,000원</h3>
                        </div>
                        <div className="home_statistics_bottom_wrap">
                            <p className="home_statistics_bottom_title">API 사용 매출</p>
                        </div>
                    </div>
                </div>
        </React.Fragment>
    );
}

export default Admin_home_statistics;
