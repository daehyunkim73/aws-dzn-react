import React, { useState, useEffect } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Guide_Api_sidebar from "../guide_sidebar/Data_Guide_Api_sidebar";
import List_style from "../../../image/Dev_Center/Guide/list_style.png";
import Axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Server_ajax_get, UncertApi_ajax_get } from "../../../server_ajax";
import Ajax from "../../../lib/ajax-3rd-custom";

const Data_Development_Guide_Signup = (props) => {
  const guideGbn = props.match.params.guideList; // 데이터 서비스 가이드 구분 값

  const guideListID = props.match.params.guideCotent; // 타이틀 코드 번호
  const [guideListArray, setGuideListArray] = useState(); // 가이드 제목 필터링
  const [guideSubListArray, setGuideSubListArray] = useState(); // 가이드 목차 배열
  const [guideTitleDesc, setGuideTitleDesc] = useState(); // 가이드 제목 설명
  const [guideFilterArray, setGuideFilterArray] = useState(); // 해당 cate에 맞는 배열만
  const [guideListArrayLogic, setGuideListArrayLogic] = useState(false);

  useEffect(() => {
    try {
      const url = `/developer/Data_development_guide/guideSidebarList`;
      const sub_url = `/developer/Data_development_guide/guideSubSidebarList`;
      Ajax.getUncertToken(url, "get", async (signature) => {
        const guideSidebarList = await UncertApi_ajax_get(url, signature);
        setGuideListArray(guideSidebarList);
        guideSidebarList.map((item) => {
          if (
            item.title_code === Number(guideListID) &&
            item.cate_code === guideGbn
          ) {
            setGuideTitleDesc(item.content);
          }
        });

        const filterArray = guideSidebarList
          .filter((item) => {
            if (item.center_gbn === "D") return item.center_gbn === "D";
            return item.center_gbn === "S";
          })
          .filter((item) => {
            return item.cate_code === guideGbn;
          });
        setGuideFilterArray(filterArray);
        Ajax.getUncertToken(sub_url, "get", async (signature) => {
          const guideSubSidebarList = await UncertApi_ajax_get(
            sub_url,
            signature
          );
          setGuideSubListArray(guideSubSidebarList);
          setGuideListArrayLogic(true);
        });
      });
    } catch (e) {
      return console.error(e);
    }
  }, [guideGbn, guideListID]);

  const scrollMoveEvt = (idx) => () => {
    var location = document.querySelector("#guideList" + idx).offsetTop - 100;
    window.scrollTo({ top: location, behavior: "smooth" });
  };

  return (
    <React.Fragment>
      <div className="guide_wrap  guide_signup_wrap">
        <div className="page_title_wrap">
          <p className="page_title">
            {guideListArrayLogic === true &&
              guideListArray.map((item) => {
                if (
                  item.title_code === Number(guideListID) &&
                  item.cate_code === guideGbn
                ) {
                  return item.title;
                }
              })}
          </p>
          <div className="page_title_btn">
            <p>Home</p>
            <img
              className="caption_img"
              src="../image/Center/Dashboard/view_more.png"
            />
            <p>이용 가이드</p>
            <img
              className="caption_img"
              src="../image/Center/Dashboard/view_more.png"
            />
            <p>데이터센터 가이드</p>
            <img
              className="caption_img"
              src="../image/Center/Dashboard/view_more.png"
            />
            <p>
              {guideListArrayLogic === true &&
                guideListArray.map((item) => {
                  if (
                    item.title_code === Number(guideListID) &&
                    item.cate_code === guideGbn
                  ) {
                    return item.title;
                  }
                })}
            </p>
          </div>
        </div>
        <Guide_Api_sidebar />
        <div className="guide_content_wrap">
          <div className="guide_mr_auto">
            <div
              className="guide_content pt-10"
              dangerouslySetInnerHTML={{ __html: guideTitleDesc }}
            ></div>

            <div className="guide_list_wrap">
              <Jumbotron>
                <p className="guide_list_box_title">목차</p>
                <ul>
                  {guideListArrayLogic === true &&
                    guideSubListArray.map((item, idx) => {
                      if (
                        item.title_code === Number(guideListID) &&
                        item.cate_code === guideGbn
                      ) {
                        return (
                          <li
                            key={idx}
                            onClick={scrollMoveEvt(idx)}
                            className="scrollMoveEvt"
                          >
                            <img src={List_style} alt="list_stlye" />
                            <p>{item.list_title}</p>
                          </li>
                        );
                      }
                    })}
                </ul>
              </Jumbotron>

              {guideListArrayLogic === true &&
                guideSubListArray.map((item, idx) => {
                  if (
                    item.title_code === Number(guideListID) &&
                    item.cate_code === guideGbn
                  ) {
                    return (
                      <div
                        id={"guideList" + idx}
                        className="guide_join"
                        key={idx}
                      >
                        <p className="guide_list_title">{item.list_title}</p>

                        <div
                          className="guide_content pt-10"
                          dangerouslySetInnerHTML={{
                            __html: item.list_content,
                          }}
                        ></div>
                      </div>
                    );
                  }
                })}

              <div className="guide_list_btn">
                <Link to="/support/question">
                  <button className="questionBtn">문의하기</button>
                </Link>
                {guideListArrayLogic === true &&
                  guideFilterArray.map((item, cnt) => {
                    if (
                      item.title_code === Number(guideListID) &&
                      item.cate_code === guideGbn &&
                      cnt < guideFilterArray.length - 1
                    ) {
                      return (
                        <Link to={`${Number(guideListID) + 1}`}>
                          <button>다음 문서</button>
                        </Link>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Data_Development_Guide_Signup;
