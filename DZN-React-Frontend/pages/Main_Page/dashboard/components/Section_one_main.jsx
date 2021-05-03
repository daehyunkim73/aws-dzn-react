import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import Section_hover_go from "../../../../image/Dev_Center/DashBoard/Section_Img/section_hover_go.png";
import Section_hover_arrow from "../../../../image/Dev_Center/DashBoard/Section_sub/arrow.png";
import Section_sub_one_icon from "../../../../image/Dev_Center/DashBoard/Section_Img/one_icon.png";
import Section_sub_two_icon from "../../../../image/Dev_Center/DashBoard/Section_Img/two_icon.png";
import Section_sub_three_icon from "../../../../image/Dev_Center/DashBoard/Section_Img/three_icon.png";
import Section_sub_four_icon from "../../../../image/Dev_Center/DashBoard/Section_Img/four_icon.png";
import Section_sub_data from "../../../../image/Dev_Center/DashBoard/Section_sub/data.png";
import Section_sub_statistics from "../../../../image/Dev_Center/DashBoard/Section_sub/statistics.png";
import Section_sub_model from "../../../../image/Dev_Center/DashBoard/Section_sub/model.png";
import Section_sub_wise from "../../../../image/Dev_Center/DashBoard/Section_sub/blue_wise.png";
import Section_sub_wide from "../../../../image/Dev_Center/DashBoard/Section_sub/blue_wide.png";
import Section_sub_calculator from "../../../../image/Dev_Center/DashBoard/Section_sub/Calculator.png";
import Section_sub_accounting from "../../../../image/Dev_Center/DashBoard/Section_sub/accounting.png";
import Section_sub_distribution from "../../../../image/Dev_Center/DashBoard/Section_sub/distribution.png";
import Section_sub_app_creation from "../../../../image/Dev_Center/DashBoard/Section_sub/app_creation.png";
import Section_sub_certification from "../../../../image/Dev_Center/DashBoard/Section_sub/certification.png";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
const Section_one_main = () => {
  const [cookies, setCookie, removeCookie] = useCookies(); // api 모듈
  useEffect(() => {
    console.log("++++++++++++++++++++++++", cookies.wehago_s);
  });
  // 주호 메인 페이지 화살표 호버 효과
  useEffect(() => {
    $(".big_hover_arrow_box").mouseover(function () {
      $(this).children(".block_none_go_arrow_image").css({
        display: "block",
      });
      $(this).children(".hover_arrow_image").css({
        "padding-left": "20px",
        transition: "0.3s all",
      });
    });

    $(".big_hover_arrow_box").mouseout(function () {
      $(this).children(".block_none_go_arrow_image").css({
        display: "none",
      });
      $(this).children(".hover_arrow_image").css({
        "padding-left": "0px",
        transition: "0.3s all",
      });
    });
  });
  return (
    <React.Fragment>
      <div className="small_white_box_left_wrap">
        <div className="small_white_box">
          <div className="radious_box">
            <img src={Section_sub_one_icon} alt="one_icon" />
          </div>
          <Card className="white_card">
            <div className="text_box">
              <h4 className="section_one_text_head">데이터 구매하기</h4>
              <p>
                데이터유통포털에서 <br /> 다양한 데이터를 구매하세요.
              </p>
              <a
                href="https://datastore.wehago.com/#/datastore/search"
                target="_blank"
              >
                <div className="big_hover_arrow_box">
                  <img
                    className="block_none_go_arrow_image"
                    src={Section_hover_go}
                    alt="section_hover_go"
                  />
                  <img
                    className="hover_arrow_image"
                    src={Section_hover_arrow}
                  />
                </div>
              </a>

              <br />
              <div className="icon_box">
                <div>
                  <img src={Section_sub_data} className="section_icon" />
                  <br />
                  <p className="card_iocn_text">데이터</p>
                </div>
                <div>
                  <img src={Section_sub_statistics} className="section_icon" />
                  <br />
                  <p className="card_iocn_text">통계</p>
                </div>
                <div>
                  <img src={Section_sub_model} className="section_icon" />
                  <br />
                  <p className="card_iocn_text">모델</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="small_white_box">
          <div className="radious_box">
            <img src={Section_sub_two_icon} alt="" />
          </div>
          <Card className="white_card">
            <div className="text_box">
              <h4 className="section_one_text_head">데이터 개발 가이드</h4>
              <p>
                구매한 데이터를 누구나 쉽게
                <br /> 활용하기 위한 도구를 추천합니다.
              </p>
              <div className="big_hover_arrow_box">
                <img
                  className="block_none_go_arrow_image"
                  src={Section_hover_go}
                  alt="section_hover_go"
                />
                <img className="hover_arrow_image" src={Section_hover_arrow} />
              </div>
              <br />
              <div className="icon_box">
                <div>
                  <img src={Section_sub_wise} className="section_icon" />
                  <br />
                  <p className="card_iocn_text">WISE</p>
                </div>
                <div>
                  <img src={Section_sub_wide} className="section_icon" />
                  <br />
                  <p className="card_iocn_text">WIDE</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <Link to="/datacenter/home">
          <p className="sertion_one_main_start_btn sertion_one_main_data_start_btn">
            데이터 센터 시작하기 ->
          </p>
        </Link>
      </div>
      <div className="small_white_box_right_wrap">
        <div className="small_white_box">
          <div className="radious_box">
            <img src={Section_sub_three_icon} alt="" />
          </div>
          <Card className="white_card">
            <div className="text_box">
              <h4 className="section_one_text_head">API 라이브러리</h4>
              <p>
                앱개발에 필요한 API 제공목록을 <br /> 확인할 수 있습니다.
              </p>
              <div className="big_hover_arrow_box">
                <img
                  className="block_none_go_arrow_image"
                  src={Section_hover_go}
                  alt="section_hover_go"
                />
                <img className="hover_arrow_image" src={Section_hover_arrow} />
              </div>
              <br />
              <div className="icon_box">
                <div>
                  <img src={Section_sub_calculator} className="section_icon" />
                  <br />
                  <p className="card_iocn_text">급여</p>
                </div>
                <div>
                  <img src={Section_sub_accounting} className="section_icon" />
                  <br />
                  <p className="card_iocn_text">회계</p>
                </div>
                <div>
                  <img
                    src={Section_sub_distribution}
                    className="section_icon"
                  />
                  <br />
                  <p className="card_iocn_text">물류</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="small_white_box">
          <div className="radious_box">
            <img src={Section_sub_four_icon} alt="" />
          </div>
          <Card className="white_card">
            <div className="text_box">
              <h4 className="section_one_text_head">앱 개발 가이드</h4>
              <p>
                앱 생성, 인증 API 사용방법을 <br /> 설명합니다.
              </p>
              <div className="big_hover_arrow_box">
                <img
                  className="block_none_go_arrow_image"
                  src={Section_hover_go}
                  alt="section_hover_go"
                />
                <img className="hover_arrow_image" src={Section_hover_arrow} />
              </div>
              <br />
              <div className="icon_box" id="sp_icon_box">
                <div>
                  <img
                    src={Section_sub_app_creation}
                    className="section_icon"
                  />
                  <br />
                  <p className="card_iocn_text">앱생성</p>
                </div>
                <div>
                  <img
                    src={Section_sub_certification}
                    className="section_icon"
                  />
                  <br />
                  <p className="card_iocn_text">인증하기</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <Link to="/svccenter/home">
          <p className="sertion_one_main_start_btn sertion_one_main_service_start_btn">
            서비스 센터 시작하기 ->
          </p>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Section_one_main;
