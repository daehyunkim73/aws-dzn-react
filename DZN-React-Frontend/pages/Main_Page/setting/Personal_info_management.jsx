import React, { Button, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { Card } from "react-bootstrap";

import { useCookies } from "react-cookie";
import Ajax from "../../../lib/ajax-3rd-custom"; //로그인 모듈

const Edit_personal_info = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const globals = require("../../../lib/globals"); //로그인 모듈
  const [userInfo, setUserInfo] = useState();
  const [companyInfo, setCompanyInfo] = useState();
  const [userInfoLogin, setuserInfoLogin] = useState(false);
  const [companyInfoLogin, setCompanyInfoLogin] = useState(false);

  useEffect(() => {
    const user_idx = cookies.h_portal_id;
    const company_idx = cookies.h_selected_company_no;
    const subUrl = `${globals.wehagoCommonApiUrl}/company/organizationmanagement/tree/employee?companyNo=${company_idx}`;
    const subUrl1 = `${globals.wehagoCommonApiUrl}/company/organizationmanagement/tree?companyNo=${company_idx}`;
    // const subUrl1 = `${globals.wehagoCommonApiUrl}/company/organizationmanagement/tree?companyNo==${idx}`;

    Ajax.get(subUrl)
      .then(function (response) {
        let result = JSON.parse(response);
        console.log(result.resultData);
        [].map.call(result.resultData, (item) => {
          if (item.portal_id === user_idx) {
            console.log(item);
            setUserInfo(item);
            setuserInfoLogin(true);
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });

    // Ajax.get(subUrl1)
    //   .then(function (response) {
    //     let result = JSON.parse(response);
    //     console.log(result.resultData);
    //     setCompanyInfo(result.resultData);
    //     setCompanyInfoLogin(true);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }, []);

  return (
    <React.Fragment>
      <div className="ua_container">
        {/* <!-- 기본정보 --> */}

        <div className="tbl_accordion">
          <Accordion defaultActiveKey="0">
            <Card>
              <div className="LUX_basic_tbl open">
                <div className="tbl_tit">
                  <h2>기본정보</h2>
                  <div className="btnbx">
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <button
                          type="button"
                          className="LUX_basic_btn Image btn_arr"
                        >
                          <span className="sp_lux">보기/숨기기</span>
                        </button>
                      </Accordion.Toggle>
                    </Card.Header>
                  </div>
                </div>

                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <table className="tblarea2">
                      <caption>
                        <span className="blind"></span>
                      </caption>
                      <colgroup>
                        <col style={{ width: "150px" }} />
                        <col />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>
                            <div className="inbx">프로필 사진 </div>
                          </th>
                          <td>
                            <div className="inbx">
                              <div className="LS_profile_image is_border">
                                <div
                                  className="image_box"
                                  style={{
                                    backgroundImage:
                                      userInfoLogin === true &&
                                      userInfo.profile_url
                                        ? `url(${globals.portalUrl}${userInfo.profile_url})`
                                        : `url(https://static.wehago.com/imgs/dummy/@dummy_02.jpg)`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <div className="inbx">이름</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">
                                {userInfoLogin === true && userInfo.user_name}
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <div className="inbx">아이디</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">
                                {userInfoLogin === true && userInfo.portal_id}
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <div className="inbx">
                              <span className="sp_lux">필수입력</span>
                              보조이메일주소
                            </div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">
                                {userInfoLogin === true && userInfo.user_email}
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <div className="inbx">#메일주소</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">
                                {userInfoLogin === true &&
                                  userInfo.user_default_email}
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <div className="inbx">
                              <span className="sp_lux">필수입력</span>
                              휴대전화번호
                            </div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">
                                {userInfoLogin === true &&
                                  userInfo.user_contact.replace(
                                    /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
                                    "$1-$2-$3"
                                  )}
                              </p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Card.Body>
                </Accordion.Collapse>
              </div>
            </Card>
          </Accordion>

          {/* <!-- 직장정보 --> */}
          <Accordion defaultActiveKey="0">
            <Card>
              <div className="LUX_basic_tbl open">
                <div className="tbl_tit">
                  <h2>
                    직장정보
                    <span className="tbl_tit_info">
                      {companyInfoLogin === true &&
                        companyInfo[0].organization_name}
                    </span>
                  </h2>
                  <div className="btnbx">
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <button
                          type="button"
                          className="LUX_basic_btn Image btn_arr"
                        >
                          <span className="sp_lux">보기/숨기기</span>
                        </button>
                      </Accordion.Toggle>
                    </Card.Header>
                  </div>
                </div>

                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <table className="tblarea2">
                      <caption>
                        <span className="blind"></span>
                      </caption>
                      <colgroup>
                        <col style={{ width: "150px" }} />
                        <col />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>
                            <div className="inbx">소속-주부서</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">
                                더존비즈온-SKY전략본부-미래전략기획부-전략기획
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <div className="inbx">소속-부부서</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">
                                더존비즈온-SKY전략본부-미래전략기획부-전략기획
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <div className="inbx">직급</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">
                                {userInfoLogin === true && userInfo.rank_name}
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <div className="inbx">직책</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">
                                {userInfoLogin === true &&
                                  userInfo.position_name}
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <div className="inbx">직장 이메일주소</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">작성필요</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <div className="inbx">직장 전화번호</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">02-6233-5887</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <div className="inbx">직장 주소</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">
                                [244-456] 강원도 춘천시 남산면 버들1길 130
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <div className="inbx">담당업무</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">기획</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <div className="inbx">사원번호</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">
                                {userInfoLogin === true &&
                                  userInfo.employee_id_number}
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <div className="inbx">입사일</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">
                                {userInfoLogin === true && userInfo.join_date}
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <div className="inbx">명함</div>
                          </th>
                          <td>
                            <div className="inbx">
                              {/* <!--
                                 [D] namecard_bx에 .front 또는 .back 클래스 중에 하나는 꼭 붙입니다.
                                      명함 이미지가 없을 때 : is_empty
                                     에디트모드 일 때 : is_edit
                                     '앞면/뒷면' 타이틀이 필요할 때 : is_title
                            --> */}
                              <div className="namecard_bx front is_title">
                                <strong className="title">앞면/뒷면</strong>
                                <img
                                  src="https://static.wehago.com/imgs/dummy/@namecard_front.png"
                                  className="img_namecard"
                                  alt="명함 앞면"
                                />
                              </div>
                              <div className="namecard_bx back is_title">
                                <strong className="title">앞면/뒷면</strong>
                                <img
                                  src="https://static.wehago.com/imgs/dummy/@namecard_back.png"
                                  className="img_namecard"
                                  alt="명함 앞면"
                                />
                              </div>
                              <div className="namecard_bx front is_empty"></div>
                              <div className="namecard_bx back is_empty"></div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Card.Body>
                </Accordion.Collapse>
              </div>
            </Card>
          </Accordion>
          {/* <!-- 직장정보 --> 
          <div className="LUX_basic_tbl">
            <div className="tbl_tit">
              <h2>
                직장정보<span className="tbl_tit_info">더존 상사</span>
              </h2>
              <div className="btnbx">
                <button type="button" className="LUX_basic_btn Image btn_arr">
                  <span className="sp_lux">보기/숨기기</span>
                </button>
              </div>
            </div>
          </div>*/}
          {/* <!-- 추가정보 --> */}
          <Accordion defaultActiveKey="0">
            <Card>
              <div className="LUX_basic_tbl open">
                <div className="tbl_tit">
                  <h2>추가정보</h2>
                  <div className="btnbx">
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <button
                          type="button"
                          className="LUX_basic_btn Image btn_arr"
                        >
                          <span className="sp_lux">보기/숨기기</span>
                        </button>
                      </Accordion.Toggle>
                    </Card.Header>
                  </div>
                </div>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <table className="tblarea2">
                      <caption>
                        <span className="blind"></span>
                      </caption>
                      <colgroup>
                        <col style={{ width: "150px" }} />
                        <col />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th scope="row">
                            <div className="inbx">개인 이메일주소</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">suhyun123@gmail.com</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <div className="inbx">집 전화번호</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">02-123-4567</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <div className="inbx">생년월일</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">
                                1989년 12월 13일 (양)
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <div className="inbx">직책</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">팀원</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <div className="inbx">보유스킬</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <div className="skill">
                                <span>TEXT</span>
                                <span>TEXTTEXTTEXTTEXTTEXT</span>
                                <span>TEXT</span>
                                <span>TEXT</span>
                                <span>TEXT</span>
                                <span>TEXT</span>
                                <span>TEXT</span>
                                <span>TEXTTEXTTEXTTEXTTEXT</span>
                                <span>TEXT</span>
                                <span>TEXT</span>
                                <span>TEXT</span>
                                <span>TEXT</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Card.Body>
                </Accordion.Collapse>
              </div>
            </Card>
          </Accordion>
          <p className="more_info">
            WEHAGO를 더 이상 이용하지 않으세요? <a href="#">[회원탈퇴]</a>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Edit_personal_info;
