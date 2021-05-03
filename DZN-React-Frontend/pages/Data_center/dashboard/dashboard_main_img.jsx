import React from "react";

// 이미지 import
import dashboard_wise from "../../../image/Center/Dashboard/Data_wise.png";
import dashboard_wide from "../../../image/Center/Dashboard/Data_wide.png";
import tableau from "../../../image/Center/Dashboard/Tableau.png";
import wehago_bi from "../../../image/Center/Dashboard/WEHAGO_BI.png";
import { Link } from "react-router-dom";

const dashboard_main_img_v2 = () => {
  return (
    <React.Fragment>
      <div className="dashboard_img_wrap">
        <div className="img_href_title">
          <p>데이터 분석도구 바로가기</p>
        </div>
        <div className="icon_wrap">
          <div className="icon_box_wrap">
            <a href="https://wide.wehago.com/" target="_blank">
              <div className="icon_box clearfix">
                <img src={dashboard_wise} alt="" />
                <p>
                  <span>WIDE</span>
                  <br />
                  똑똑한 지능형
                  <br />
                  분석 환경
                </p>
              </div>
            </a>

            <a href="http://wise.bigdata-sme.kr/login" target="_blank">
              <div className="icon_box">
                <img src={dashboard_wide} alt="" />
                <p>
                  <span>WISE</span>
                  <br />
                  편리한 데이터
                  <br />
                  개발환경 구성의 시작
                </p>
              </div>
            </a>
            <a href="https://tableau.wehago.com/#/home" target="_blank">
              <div className="icon_box">
                <img src={tableau} alt="" />
                <p>
                  <span>Tableau</span>
                  <br />
                  비전문가에게도
                  <br />
                  쉬운 데이터분석 서비스
                </p>
              </div>
            </a>
            <a href="https://bi.wehago.com/app/v2/workspace" target="_blank">
              <div className="icon_box">
                <img src={wehago_bi} alt="" />
                <p>
                  <span>WEHAGO BI</span>
                  <br />
                  편리한 데이터 개발환경
                  <br />
                  구성의 시작
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default dashboard_main_img_v2;
