import React from "react";
import not_image from "../../../image/Center/Dashboard/not_image.png";
import user_add from "../../../image/Center/Dashboard/user_add.png";
import { Link } from "react-router-dom";

const Dashboard_production_activity = (props) => {
  const { creating } = props;
  return (
    <React.Fragment>
      <div className="act_title create_act_title clearfix">
        <p>서비스 제작 활동</p>
      </div>
      <div className="dc_home_purchasedata_wrap sc_home_svc_create">
        {creating.map(
          (svcData, cnt) =>
            cnt < 3 && (
              console.log(svcData, "🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️"),
              <div className="dc_purchasedata_wrap">
                <div className="dc_purchasedata_first_wrap">
                  <div className="dc_purchasedata_icon_wrap">
                    {svcData.iconPath !== null && svcData.iconPath !== "" ? (
                      <div className="sc_svc_create_icon_wrap">
                        <img
                          className="sc_svc_create_icon_wrap_ok"
                          src={`${svcData.iconPath}`}
                          alt=""
                        />
                      </div>
                    ) : (
                      <div className="sc_svc_create_icon_wrap">
                        <img
                          className="sc_svc_create_icon"
                          src={not_image}
                          alt="not image"
                        />
                      </div>
                    )}
                  </div>
                  <div className="dc_purchasedata_content">
                    <p className="dc_purchasedata_title">
                      {svcData.svc_title}
                    </p>
                    <p className="dc_purchasedata_date_wrap sc_purchasedata_date ">
                      최근 수정일 :
                      {svcData.uptDt !== null ? (
                        <span className="dc_purchasedata_date sc_purchasedata_modification_date">
                          {svcData.uptDt.substring(0, 10)}
                        </span>
                      ) : (
                        <span className="dc_purchasedata_date sc_purchasedata_modification_date">
                          {svcData.regDt.substring(0, 10)}
                        </span>
                      )}
                    </p>
                    <p className="dc_purchasedata_date_wrap sc_purchasedata_date sc_purchasedata_date ">
                      등록일 :
                      <span className="dc_purchasedata_date sc_purchasedata_registration_date">
                        {svcData.regDt.substring(0, 10)}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="dc_purchasedata_second_wrap">
                  <div className="dc_purchasedata_second_top">
                    <div className="dc_purchasedata_time_wrap">
                      <p className="dc_purchasedata_time">2020.02.01 00:00</p>
                    </div>
                    <div className="dc_purchasedata_user_add_btn">
                      <Link target="_blank" to="/setting/authority">
                        <img src={user_add} alt="user_add" />
                      </Link>
                    </div>
                  </div>
                  <div className="dc_purchasedata_second_bottom">
                    <div className="dc_purchasedata_name_wrap">
                      <p className="dc_purchasedata_name">관리자</p>
                    </div>
                    <div className="dc_purchasedata_text_wrap">
                      <p className="dc_purchasedata_text">사용자 추가</p>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </React.Fragment>
  );
};

export default Dashboard_production_activity;
