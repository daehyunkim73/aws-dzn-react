import React from 'react';
import Aside_laptop_two from '../../../../image/Dev_Center/DashBoard/Aside/Laptop2.png';
import Aside_arrow from '../../../../image/Dev_Center/DashBoard/Aside/arrow.png';
import Aside_bg_first from '../../../../image/Dev_Center/DashBoard/Aside/background_first.gif';
import Aside_bg_second from '../../../../image/Dev_Center/DashBoard/Aside/background_second.gif';
import Aside_phone_two from '../../../../image/Dev_Center/DashBoard/Aside/Phone2.png';

const Aside_main = () => {
  return (
    <React.Fragment>
      <div className="aside_big_box">
        <div className="big_aside_up_box">
          <div className="same_width">
            <div className="computer_aside_icon_big_box">
              <img
                className="computer_img_width"
                src={Aside_laptop_two}
                alt=""
              />
              <div className="computer_aside_icon_text">
                <h2 className="color_text">
                  모든 기업을 위한 데이터 유통 포털
                </h2>
                <div className="same_width_text">
                  <p>&#183; 개방형 빅데이터 플랫폼</p>
                  <p>&#183; 양질의 데이터 제공</p>
                  <p>&#183; 기업상생 생태계 조성</p>
                </div>
                <a href="https://datastore.wehago.com/#/datastore/landing" target="_blank"><div className="aside_rgb_box">
                  데이터유통포털 바로 가기
                      <img src={Aside_arrow} />
                </div></a>
              </div>
            </div>
            <img
              className="same_width"
              src={Aside_bg_first}
              alt=""
            />
          </div>

          <div className="same_width">
            <div className="phoe_aside_icon_big_box">
              <img
                className="phone_img_width"
                src={Aside_phone_two}
                alt=""
              />
              <div className="phone_aside_icon_text">
                <h2 className="color_text">
                  한 곳에 모아보는 기업 업무 서비스
                </h2>
                <div className="same_width_text">
                  <p>&#183; 전문경영관리 서비스</p>
                  <p>&#183; 편리한 협업 서비스</p>
                  <p>&#183; 다양한 업무환경지원</p>
                </div>

                <a href="https://www.wehago.com/landing/ko/home/" target="_blank"><div className="aside_rgb_box">
                  서비스스토어 바로 가기
                    <img src={Aside_arrow} />
                </div></a>
              </div>
            </div>
            <img
              className="same_width"
              src={Aside_bg_second}
              alt=""
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Aside_main;