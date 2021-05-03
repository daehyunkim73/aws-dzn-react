import React, { useEffect, useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Guide_Api_sidebar from "../guide_sidebar/Data_Guide_Api_sidebar";
import View_more from "../../../image/Center/Dashboard/view_more.png";
import Service_development_list from "../../../image/Dev_Center/Guide/list_style.png";
import Service_development_step from "../../../image/Dev_Center/Guide/service_development_step.png";
import Service_release_step from "../../../image/Dev_Center/Guide/service_release_step.png";
import Axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Server_ajax_get, UncertApi_ajax_get } from "../../../server_ajax";
import Ajax from "../../../lib/ajax-3rd-custom";

function Big_safari() {
  const sp_safari_text = document.getElementById("sp_safari_text");
  const isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(
      !window["safari"] ||
        (typeof safari !== "undefined" && safari.pushNotification)
    );

  if (isSafari) {
    sp_safari_text.style.padding = "10px 22px 0 22px";
  }

  return {
    isSafari,
    sp_safari_text,
  };
}

const Service_development_Guide_page = (props) => {
  const guideListID = props.match.params.guideList; // 가이드 목록 번호
  const guide_path = useLocation().pathname;
  const [guideListArray, setGuideListArray] = useState(); // 가이드 제목 필터링
  const [guideSubListArray, setGuideSubListArray] = useState(); // 가이드 목차 배열
  const [guideListArrayLogic, setGuideListArrayLogic] = useState(false);

  useEffect(() => {
    try {
      const url = `/developer/Data_development_guide/guideSidebarList`;
      Ajax.getUncertToken(url, "get", async (signature) => {
        const guideSidebarList = await UncertApi_ajax_get(url, signature);
        // 중복값 필터링
        const filterArray = guideSidebarList.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.cate === item.cate)
        );
        setGuideListArray(filterArray);
        setGuideSubListArray(guideSidebarList);
        setGuideListArrayLogic(true);
      });
    } catch (e) {
      return console.error(e);
    }

    // (async function () {
    //   try {
    //     const guideSidebarList = await Server_ajax_get(
    //       `Data_development_guide/guideSidebarList`
    //     );
    //     setGuideListArray(
    //       guideSidebarList.filter(
    //         (item, index, self) =>
    //           index === self.findIndex((t) => t.cate === item.cate)
    //       )
    //     );
    //     setGuideSubListArray(guideSidebarList);
    //     setGuideListArrayLogic(true);
    //   } catch (e) {
    //     return console.error(e);
    //   }
    // })();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <React.Fragment>
      <div className="guide_wrap service_guide_wrap1">
        <div className="page_title_wrap">
          {guideListArrayLogic === true &&
            guideListArray.map((item, cnt) => {
              return (
                item.cate_code === guideListID && (
                  <p className="page_title" key={cnt}>
                    {item.cate}
                  </p>
                )
              );
            })}
          <div className="page_title_btn">
            <p>Home</p>
            <img className="caption_img" src={View_more} />
            <p>이용 가이드</p>
            <img className="caption_img" src={View_more} />
            <p>서비스센터 가이드</p>
            <img className="caption_img" src={View_more} />
            {guideListArrayLogic === true &&
              guideListArray.map((item, cnt) => {
                return (
                  item.cate_code === guideListID && <p key={cnt}>{item.cate}</p>
                );
              })}
          </div>
        </div>
        <Guide_Api_sidebar />
        <div className="guide_content_wrap">
          <div className="guide_mr_auto">
            {guideListID === "svcDevelopment" ? (
              <div>
                <p className="guide_content_title">서비스 개발/출시 절차</p>
                <p className="guide_content">
                  서비스를 개발/출시하기 위해서는 단계별 절차를 거쳐야 합니다.
                </p>
                <Jumbotron>
                  <img src={Service_development_step} alt="" />
                  <div>
                    <p>
                      앱 생성 및 <br />
                      기본정보 등록
                    </p>
                    <p>판매정보 입력</p>
                    <p id="sp_safari_text">
                      API 제휴 신청 및 <br /> 사용 설정
                    </p>
                    <p>승인 신청 및 출시</p>
                    <p>판매 및 정산</p>
                  </div>
                </Jumbotron>
              </div>
            ) : guideListID === "svcLaunch" ? (
              <div>
                <p className="guide_content_title">서비스 개발/출시 절차</p>
                <p className="guide_content">
                  서비스를 개발/출시하기 위해서는 단계별 절차를 거쳐야 합니다.
                </p>
                <Jumbotron>
                  <img src={Service_release_step} alt="" />
                  <div>
                    <p>
                      앱 생성 및 <br />
                      기본정보 등록
                    </p>
                    <p>판매정보 입력</p>
                    <p id="sp_safari_text">
                      API 제휴 신청 및 <br /> 사용 설정
                    </p>
                    <p>승인 신청 및 출시</p>
                    <p>판매 및 정산</p>
                  </div>
                </Jumbotron>
              </div>
            ) : (
              <div></div>
            )}

            <div className="guide_list_wrap">
              <p className="guide_list_title">서비스 가이드 문서에서는</p>
              <p className="guide_list_content">
                위의 절차 중 앱 생성/판매정보 입력/API 활용에 대한 개발 방법을
                안내합니다.
              </p>
              <Jumbotron>
                <ul className="guide_list_href">
                  {guideListArrayLogic === true &&
                    guideSubListArray.map((item, idx) => {
                      if (item.cate_code === guideListID) {
                        return (
                          <Link
                            key={idx}
                            to={`/service_development_guide/${item.cate_code}/${item.title_code}`}
                          >
                            <li>
                              <img
                                src={Service_development_list}
                                alt="list_stlye"
                              />
                              <p>{item.title}</p>
                            </li>
                          </Link>
                        );
                      }
                    })}
                </ul>
              </Jumbotron>
              <div className="guide_list_btn">
                <Link to="/support/question">
                  <button className="questionBtn">문의하기</button>
                </Link>
                {guideListArrayLogic === true &&
                  guideListArray.map((item, cnt) => {
                    return (
                      item.cate_code === guideListID && (
                        <Link to={`${guide_path}/${item.title_code}`}>
                          <button>다음 문서</button>
                        </Link>
                      )
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Service_development_Guide_page;
