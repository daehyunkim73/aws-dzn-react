import React, { useEffect } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Link, useHistory } from "react-router-dom";
import list_style from "../../../image/Dev_Center/Guide/list_style.png";
import { guideListAxios } from "../../../func_src/guideAxios";
import { useState } from "react";
import { Server_ajax_post } from "../../../Server_ajax";

const Using_guide_detail = (props) => {
  const guidePostKey = props.match.params.useguide_mast_idx;
  const guideKey = props.match.params.useguide_mast_idx - 1;
  const [guideList, setGuideList] = useState(); // 데이터 서비스 전체적인 배열
  const [guideListLogic, setGuideListLogic] = useState(false);
  const [dataguideList, setDataGuideList] = useState(); // 데이터 서비스 목차 배열
  // const [dataguideListLogic, setDataGuideListLogic] = useState(false);

  useEffect(() => {
    const guidePostKey = {
      useguide_mast_idx: props.match.params.useguide_mast_idx,
    };

    (async function () {
      try {
        const getGuideDetailList = await Server_ajax_post(
          `contents_management/getGuideDetailList`,
          guidePostKey
        );
        console.log(
          "🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍",
          getGuideDetailList
        );
        setDataGuideList(getGuideDetailList);
        guideListAxios(setGuideList, setGuideListLogic);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, [guideListLogic === true]);

  return (
    <React.Fragment>
      <div className="using_guide_detail_wrap">
        <div className="Page_same_text clearfix">
          <p className="backoffice_title">
            {guideListLogic === true && guideList[guideKey].title}
          </p>
        </div>

        <div className="guide_content_wrap">
          <div className="guide_mr_auto">
            <p
              className="guide_content"
              dangerouslySetInnerHTML={{
                __html: guideListLogic === true && guideList[guideKey].content,
              }}
            ></p>
            <div className="guide_list_wrap">
              <Jumbotron>
                <p className="guide_detail_box_title">목차</p>
                <ul>
                  {guideListLogic === true &&
                    dataguideList.map((item) => {
                      return (
                        <li>
                          <img src={list_style} alt="list_stlye" />
                          <p>{item.title}</p>
                        </li>
                      );
                    })}
                </ul>
              </Jumbotron>
              {guideListLogic === true &&
                dataguideList.map((item) => {
                  return (
                    <div className="guide_join">
                      <p className="guide_list_title">{item.title}</p>
                      <ul>
                        <li
                          dangerouslySetInnerHTML={{
                            __html: item.content,
                          }}
                        ></li>
                      </ul>
                    </div>
                  );
                })}
              <div className="guide_list_btn clearfix">
                <Link
                  className="link_style_text"
                  to={`/admin/usingguide/modify/${guidePostKey}`}
                >
                  <button className="table_view_btn">수정</button>
                </Link>
                <Link to="/admin/usingguide">
                  <button className="table_view_btn">목록</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Using_guide_detail;
