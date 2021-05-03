import React from "react";

const working_activity = () => {
  return (
    <React.Fragment>
      <div className="working_activity_wrap">
        <p>작업 활동</p>
        <div className="working_activity">
          <div className="working_activity_info_wrap">
            <p className="working_activity_nickname">user001</p>
            <p className="working_activity_date">2020.02.01 00:00</p>
            <div className="working_activity_type">
              <p>WISE</p>
            </div>
            <p className="working_activity_info">
              현재 기업재무데이터를 활용한 부도예측모형 진행 중입니다.
            </p>
          </div>
          <div className="working_activity_graph">
            <p className="working_activity_graph_title">진행률</p>
            <p className="working_activity_graph_number">90%</p>
            <div>
              <span data-val="60%">&nbsp;</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default working_activity;
