import React, { useEffect, useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Guide_Api_sidebar from "../guide_sidebar/Data_Guide_Api_sidebar";
import View_more from "../../../image/Center/Dashboard/view_more.png";
import Data_development_step from "../../../image/Dev_Center/Guide/data_development_step.png";
import Data_sale_step from "../../../image/Dev_Center/Guide/data_sale_step.png";
import Data_development_list from "../../../image/Dev_Center/Guide/list_style.png";
import { Link, useLocation } from "react-router-dom";
import { UncertApi_ajax_get } from "../../../server_ajax";
import Ajax from "../../../lib/ajax-3rd-custom";

const Data_Development_Guide_page = (props) => {
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
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <React.Fragment>
      <div className="guide_wrap guide_page_wrap">
        <div className="page_title_wrap">
          {guideListArrayLogic === true &&
            guideListArray.map((item, cnt) => {
              return (
                item.cate_code === guideListID && (
                  <p key={cnt} className="page_title">
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
            <p>데이터센터 가이드</p>
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
            {guideListID === "dataDevelopment" ? (
              <div>
                <p className="guide_content_title">데이터 개발/판매 절차</p>
                <p className="guide_content">
                  데이터를 개발/판매하기 위해서는 단계별 절차를 거쳐야 합니다.
                </p>
                <Jumbotron>
                  <img src={Data_development_step} alt="" />
                  <div>
                    <p>
                      데이터개발사 <br />
                      등록
                    </p>
                    <p>
                      WISE,WIDE
                      <br />
                      데이터 가공 개발
                    </p>
                    <p>
                      WISE,WIDE
                      <br />
                      신규데이터 생성
                    </p>
                    <p>
                      데이터정보 입력 및<br /> 판매신청
                    </p>
                    <p>판매 및 정산</p>
                  </div>
                </Jumbotron>
              </div>
            ) : guideListID === "dataSale" ? (
              <div>
                <p className="guide_content_title">데이터 개발/판매 절차</p>
                <p className="guide_content">
                  데이터를 개발/판매하기 위해서는 단계별 절차를 거쳐야 합니다.
                </p>
                <Jumbotron>
                  <img src={Data_sale_step} alt="" />
                  <div>
                    <p>
                      데이터개발사 <br />
                      등록
                    </p>
                    <p>
                      WISE,WIDE
                      <br />
                      데이터 가공 개발
                    </p>
                    <p>
                      WISE,WIDE
                      <br />
                      신규데이터 생성
                    </p>
                    <p>
                      데이터정보 입력 및<br /> 판매신청
                    </p>
                    <p>판매 및 정산</p>
                  </div>
                </Jumbotron>
              </div>
            ) : (
              <div></div>
            )}
            <div className="guide_list_wrap">
              <p className="guide_list_title">개발가이드 목차</p>
              <p className="guide_list_content">
                본 문서는 실제 개발 과정과 유사하게 진행되므로, 순차적으로
                확인하시는 것을 권장합니다.
              </p>
              <Jumbotron>
                <ul className="guide_list_href">
                  {guideListArrayLogic === true &&
                    guideSubListArray.map((item, idx) => {
                      if (item.cate_code === guideListID) {
                        return (
                          <Link
                            key={idx}
                            to={`/data_development_guide/${item.cate_code}/${item.title_code}`}
                          >
                            <li>
                              <img
                                src={Data_development_list}
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

export default Data_Development_Guide_page;
