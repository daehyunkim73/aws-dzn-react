import React, { useEffect, useState, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import service_limit_image from "../../../image/Center/Empty/svccenter_icon_empty.png";
import svccenter_create_icon from "../../../image/Center/Empty/svccenter_create_icon.png";
import { useUsageInfo } from "../../Center/Service_center_router";
import { Server_ajax_get } from "../../../server_ajax";

const Service_product_box = (props) => {
  const {
    setUsageInfoFirst,
    setUsageInfoSecond,
    setSalesReqVal,
    setSalesApiTabReqVal,
    setApiUsingBtnEvt,
  } = useUsageInfo();
  const [boxDelImg, SetboxDelImg] = useState();
  const history = useHistory();
  const { setSave_logic } = props;
  const { save_logic } = props;
  const { setSvrData_posts } = props;
  const { SvrData_posts } = props;
  const { Pluse_service_uploade_Click } = props;
  const { moveDetailPage } = props;
  const { dataLogic } = props;
  useEffect(() => {
    SetboxDelImg(document.getElementById("box_del_btn_id"));
  }, [save_logic === true]);

  const apiClickHref = (idx, svckey) => {
    if (!svckey) {
      alert("기본정보 작성 후 이동 가능합니다.")
    } else {
      setApiUsingBtnEvt(true);
      setSalesReqVal("api");
      setSalesApiTabReqVal("api_using");
      setSave_logic(true);
      history.push(`/svccenter/product/control/${idx}`);
    }
  };

  const AuthorityClickHref = () => {
    setUsageInfoSecond(true);
    history.push("/setting/authority");
  };

  return (
    <React.Fragment>
      {/* <Service_uploade_list_Page_popup setSave_logic={setSave_logic} />{" "} */}
      {/* 서비스 만들기 클릭시 뜨는 팝업  */}
      <div className="dashboard_wrap">
        <div className="product_box_wrap">
          <div className="create_btn dashboard_box svccenter_create_box">
            <img src={svccenter_create_icon} onClick={Pluse_service_uploade_Click} alt="svccenter_create_icon"/>
            <p>서비스 만들기</p>
          </div>
          {SvrData_posts.map((svcData) => (
            <div className="sale_box_wrap" key={svcData.pdsvc_idx}>
              <div
                className={
                  svcData.stat === 1
                    ? "service_btn dashboard_box creating_box"
                    : svcData.stat === 2
                    ? "service_btn dashboard_box under_review_box"
                    : svcData.stat === 3
                    ? "service_btn dashboard_box judge_done"
                    : svcData.stat === 4
                    ? "service_btn dashboard_box judge_return_box"
                    : svcData.stat === 5
                    ? "service_btn dashboard_box sale_box"
                    : svcData.stat === 6 &&
                      "service_btn dashboard_box end_of_sale_box"
                }
              >
                <Link to={`/svccenter/product/control/${svcData.pdsvc_idx}`}>
                  <p className="time">{svcData.regDt.substring(0, 10)}</p>
                  <p className="revision_time">
                    [수정]
                    {!svcData.uptDt ? "" : svcData.uptDt.substring(0, 10)}
                  </p>
                  <div className="service_icon_box">
                    {svcData.iconPath !== null && svcData.iconPath !== "" ? (
                      <img
                        className="limit_service_image_box limit_service_image_icon_box"
                        src={`${svcData.iconPath}`}
                        alt=""
                      />
                    ) : (
                      <img
                        className="limit_service_image_box limit_service_image_icon_box box_limit_img"
                        src={service_limit_image}
                        alt=""
                      />
                    )}
                  </div>
                  <p className="dashboard_box_service_text">
                    {svcData.svc_title}
                  </p>
                  <p className="dashboard_box_service_price">
                    [{" "}
                    {svcData.pay_type === null
                      ? "가격정책미정"
                      : svcData.pay_type === 1
                      ? "유료"
                      : "무료"}{" "}
                    ]
                  </p>
                  <div className="dashboard_box_sub_text">
                    {svcData.stat === 1 ? (
                      <p>제작중</p>
                    ) : svcData.stat === 2 ? (
                      <p>심사중</p>
                    ) : svcData.stat === 3 ? (
                      <p>승인</p>
                    ) : svcData.stat === 4 ? (
                      <p>심사반려</p>
                    ) : svcData.stat === 5 ? (
                      <p>판매중</p>
                    ) : (
                      svcData.stat === 6 && <p>판매중지</p>
                    )}
                  </div>
                </Link>
              </div>
              <div className="api_usage_info">
                <p
                  onClick={() => {
                    apiClickHref(svcData.pdsvc_idx, svcData.svc_key);
                  }}
                >
                  API 사용정보
                </p>
                <p onClick={AuthorityClickHref}>사용자 추가</p>
                <p
                  className="deleteBtn"
                  onClick={() => {
                    moveDetailPage(
                      svcData.stat,
                      svcData.pdsvc_idx,
                      svcData.svc_title
                    );
                  }}
                >
                  삭제
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Service_product_box;
