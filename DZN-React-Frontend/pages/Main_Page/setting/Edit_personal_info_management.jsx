import React, { Button } from 'react';
import { Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import { Card } from "react-bootstrap";

const Edit_personal_info = () => {
  return (
    <React.Fragment>
      <div className="ua_container">
        <div className="tbl_accordion">
          <Accordion defaultActiveKey="0">
            <Card>
              <div className="LUX_basic_tbl open">
                <div className="tbl_tit">
                  <h2>기본정보</h2>
                  <div className="btnbx">
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <button type="button" className="LUX_basic_btn Image btn_arr">
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
                            <div className="inbx">프로필 사진</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <div className="LS_profile_image is_border">
                                <div
                                  className="image_box"
                                  style={{
                                    backgroundImage: `url(https://static.wehago.com/imgs/dummy/@dummy_02.jpg)`,
                                  }}
                                ></div>
                              </div>
                              <div className="inbx_enroll_info">
                                <ul className="guide_lst">
                                  <li>프로필 사진을 등록해주세요.</li>
                                  <li>이미지 파일 최대 크기 2MB 미만</li>
                                </ul>
                                <button
                                  type="button"
                                  className="LUX_basic_btn Default basic"
                                >
                                  <span>등록</span>
                                </button>
                                <button
                                  type="button"
                                  className="LUX_basic_btn Default basic"
                                >
                                  <span>삭제</span>
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">이름</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">이은비</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">아이디</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">suhyun</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">
                              <span className="sp_lux">필수입력</span>보조이메일주소
                    </div>
                          </th>
                          <td>
                            <div className="inbx">
                              <div className="inbx_email">
                                <div className="LUX_basic_text error">
                                  <div className="inpbx">
                                    <p className="placeholder">입력해주세요</p>
                                    <input
                                      type="text"
                                      id="textField_text_email1"
                                      defaultValue=""
                                    />
                                    <span className="sp_lux"></span>
                                  </div>
                                  <p className="info">필수입력 항목입니다</p>
                                </div>
                                <span className="sign">@</span>
                                <div className="LUX_basic_text">
                                  {/* <!-- 입력창에 포커스 - inpbx className="on" 추가  --> */}
                                  <div className="inpbx">
                                    <p className="placeholder"></p>
                                    <input
                                      type="text"
                                      id="textField_text_email1_2"
                                      defaultValue=""
                                    />
                                    <span className="sp_lux"></span>
                                  </div>
                                </div>
                                <div className="LUX_basic_select">
                                  <div className="searchbx">
                                    <span className="inpbx">
                                      <input type="text" id="textField_text_email1_3" />
                                      <span className="placeholder">직접입력</span>
                                    </span>
                                    <button type="button" className="btn">
                                      <span className="sp_lux">검색</span>
                                    </button>
                                  </div>
                                  <div className="resultbx">
                                    <div
                                      className="result_scrall"
                                      style={{ maxHeight: "100px" }}
                                    >
                                      {/* <!-- 스크롤 생성 height 높이값 제어 --> */}
                                      <div className="result_scrallin">
                                        <ul className="result_lst">
                                          <li>
                                            <a href="#">
                                              <div>naver.com</div>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <div>naver.com</div>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  className="LUX_basic_btn Default basic"
                                >
                                  <span>삭제</span>
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">#메일주소</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">아이디#성수현.개인</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">
                              <span className="sp_lux">필수입력</span>휴대전화번호
                    </div>
                          </th>
                          <td>
                            <div className="inbx">
                              <div className="inbx_default">
                                <p className="inbx_value">010-1234-5678</p>
                                <button
                                  type="button"
                                  className="LUX_basic_btn Default basic"
                                >
                                  <span>본인인증</span>
                                </button>
                              </div>
                              <ul className="guide_lst">
                                <li>
                                  아이디, 비밀번호 찾기 등 본인확인이 필요한 경우 또는
                                  WEHAGO으로부터 알림을 받을 때 사용할
                                  휴대전화번호입니다.
                        </li>
                                <li>수정 시 반드시 인증이 필요합니다.</li>
                              </ul>
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
                    직장정보<span className="tbl_tit_info">더존 비즈온</span>
                  </h2>
                  <div className="btnbx">
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <button type="button" className="LUX_basic_btn Image btn_arr">
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
                          <th scope="row">
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
                          <th scope="row">
                            <div className="inbx">직급</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">사원</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">직책</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">팀원</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">
                              <div className="LUX_basic_select">
                                <div className="searchbx">
                                  <span className="inpbx">
                                    <input type="text" id="textField_text_email2_1" />
                                    <span className="placeholder">직장 이메일주소</span>
                                  </span>
                                  <button type="button" className="btn">
                                    <span className="sp_lux">검색</span>
                                  </button>
                                </div>
                                <div className="resultbx">
                                  <div
                                    className="result_scrall"
                                    style={{ maxHeight: "100px" }}
                                  >
                                    {/* <!-- 스크롤 생성 height 높이값 제어 --> */}
                                    <div className="result_scrallin">
                                      <ul className="result_lst">
                                        <li>
                                          <a href="#">
                                            <div>naver.com</div>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <div>naver.com</div>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </th>
                          <td>
                            <div className="inbx">
                              <div className="inbx_email">
                                <div className="LUX_basic_text editing">
                                  <div className="inpbx">
                                    <p className="placeholder">입력해주세요</p>
                                    <input
                                      type="text"
                                      id="textField_text_email2_2"
                                      defaultValue=""
                                    />
                                    <span className="sp_lux"></span>
                                  </div>
                                </div>
                                <span className="sign">@</span>
                                <div className="LUX_basic_text">
                                  {/* <!-- 입력창에 포커스 - inpbx className="on" 추가  --> */}
                                  <div className="inpbx">
                                    <p className="placeholder"></p>
                                    <input
                                      type="text"
                                      id="textField_text_email2_3"
                                      defaultValue=""
                                    />
                                    <span className="sp_lux"></span>
                                  </div>
                                </div>
                                <div className="LUX_basic_select">
                                  <div className="searchbx">
                                    <span className="inpbx">
                                      <input type="text" id="textField_text_email2_4" />
                                      <span className="placeholder">직접입력</span>
                                    </span>
                                    <button type="button" className="btn">
                                      <span className="sp_lux">검색</span>
                                    </button>
                                  </div>
                                  <div className="resultbx">
                                    <div
                                      className="result_scrall"
                                      style={{ maxHeight: "100px" }}
                                    >
                                      {/* <!-- 스크롤 생성 height 높이값 제어 --> */}
                                      <div className="result_scrallin">
                                        <ul className="result_lst">
                                          <li>
                                            <a href="#">
                                              <div>naver.com</div>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <div>naver.com</div>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  className="LUX_basic_btn Default basic"
                                >
                                  <span>삭제</span>
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="addcell">
                          <th scope="row">
                            <div className="inbx">
                              <div className="LUX_basic_select">
                                <div className="searchbx">
                                  <span className="inpbx">
                                    <input type="text" id="btn_search7_1" />
                                    <span className="placeholder">직장 이메일주소</span>
                                  </span>
                                  <button type="button" className="btn">
                                    <span className="sp_lux">검색</span>
                                  </button>
                                </div>
                                <div className="resultbx">
                                  <div
                                    className="result_scrall"
                                    style={{ maxHeight: "100px" }}
                                  >
                                    {/* <!-- 스크롤 생성 height 높이값 제어 --> */}
                                    <div className="result_scrallin">
                                      <ul className="result_lst">
                                        <li>
                                          <a href="#">
                                            <div>naver.com</div>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <div>naver.com</div>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </th>
                          <td>
                            <div className="inbx">
                              <div className="inbx_email">
                                <div className="LUX_basic_text editing">
                                  <div className="inpbx">
                                    <p className="placeholder">입력해주세요</p>
                                    <input
                                      type="text"
                                      id="textField_text4_1_1111"
                                      defaultValue=""
                                    />
                                    <span className="sp_lux"></span>
                                  </div>
                                </div>
                                <span className="sign">@</span>
                                <div className="LUX_basic_text">
                                  {/* <!-- 입력창에 포커스 - inpbx className="on" 추가  --> */}
                                  <div className="inpbx">
                                    <p className="placeholder"></p>
                                    <input
                                      type="text"
                                      id="textField_text5_1_1"
                                      defaultValue=""
                                    />
                                    <span className="sp_lux"></span>
                                  </div>
                                </div>
                                <div className="LUX_basic_select">
                                  <div className="searchbx">
                                    <span className="inpbx">
                                      <input type="text" id="btn_search7_2_1" />
                                      <span className="placeholder">직접입력</span>
                                    </span>
                                    <button type="button" className="btn">
                                      <span className="sp_lux">검색</span>
                                    </button>
                                  </div>
                                  <div className="resultbx">
                                    <div
                                      className="result_scrall"
                                      style={{ maxHeight: "100px" }}
                                    >
                                      {/* <!-- 스크롤 생성 height 높이값 제어 --> */}
                                      <div className="result_scrallin">
                                        <ul className="result_lst">
                                          <li>
                                            <a href="#">
                                              <div>naver.com</div>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <div>naver.com</div>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  className="LUX_basic_btn Default basic"
                                >
                                  <span>삭제</span>
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">
                              <div className="LUX_basic_select">
                                <div className="searchbx">
                                  <span className="inpbx">
                                    <input type="text" id="btn_search9" />
                                    <span className="placeholder">직장 전화번호</span>
                                  </span>
                                  <button type="button" className="btn">
                                    <span className="sp_lux">검색</span>
                                  </button>
                                </div>
                                <div className="resultbx">
                                  <div
                                    className="result_scrall"
                                    style={{ maxHeight: "100px" }}
                                  >
                                    {/* <!-- 스크롤 생성 height 높이값 제어 --> */}
                                    <div className="result_scrallin">
                                      <ul className="result_lst">
                                        <li>
                                          <a href="#">
                                            <div>naver.com</div>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <div>naver.com</div>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </th>
                          <td>
                            <div className="inbx">
                              <div className="inbx_default">
                                <div className="LUX_basic_text">
                                  <div className="inpbx">
                                    <p className="placeholder">입력해주세요</p>
                                    <input
                                      type="text"
                                      id="textField_text8"
                                      defaultValue=""
                                    />
                                    <span className="sp_lux"></span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  className="LUX_basic_btn Default basic"
                                >
                                  <span>삭제</span>
                                </button>
                              </div>
                              <p className="guide_p">전화번호 사이에 ‘-‘는 제외</p>
                            </div>
                          </td>
                        </tr>
                        <tr className="addcell">
                          <th scope="row">
                            <div className="inbx">
                              <div className="LUX_basic_select">
                                <div className="searchbx">
                                  <span className="inpbx">
                                    <input type="text" id="btn_search9_1" />
                                    <span className="placeholder">직장 전화번호</span>
                                  </span>
                                  <button type="button" className="btn">
                                    <span className="sp_lux">검색</span>
                                  </button>
                                </div>
                                <div className="resultbx">
                                  <div
                                    className="result_scrall"
                                    style={{ maxHeight: "100px" }}
                                  >
                                    {/* <!-- 스크롤 생성 height 높이값 제어 --> */}
                                    <div className="result_scrallin">
                                      <ul className="result_lst">
                                        <li>
                                          <a href="#">
                                            <div>naver.com</div>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <div>naver.com</div>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </th>
                          <td>
                            <div className="inbx">
                              <div className="inbx_default">
                                <div className="LUX_basic_text">
                                  <div className="inpbx">
                                    <p className="placeholder">입력해주세요</p>
                                    <input
                                      type="text"
                                      id="textField_text8_1"
                                      defaultValue=""
                                    />
                                    <span className="sp_lux"></span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  className="LUX_basic_btn Default basic"
                                >
                                  <span>삭제</span>
                                </button>
                              </div>
                              <p className="guide_p">전화번호 사이에 ‘-‘는 제외</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="celvat">
                            <div className="inbx">
                              <div className="LUX_basic_select">
                                <div className="searchbx">
                                  <span className="inpbx">
                                    <input type="text" id="textField_text_email3_1" />
                                    <span className="placeholder">직장 주소</span>
                                  </span>
                                  <button type="button" className="btn">
                                    <span className="sp_lux">검색</span>
                                  </button>
                                </div>
                                <div className="resultbx">
                                  <div
                                    className="result_scrall"
                                    style={{ maxHeight: "100px" }}
                                  >
                                    {/* <!-- 스크롤 생성 height 높이값 제어 --> */}
                                    <div className="result_scrallin">
                                      <ul className="result_lst">
                                        <li>
                                          <a href="#">
                                            <div>naver.com</div>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <div>naver.com</div>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </th>
                          <td>
                            <div className="inbx">
                              <div className="inbx_full">
                                <div className="LUX_basic_text">
                                  <div className="inpbx">
                                    <p className="placeholder">입력해주세요</p>
                                    <input
                                      type="text"
                                      id="textField_text_email3_2"
                                      defaultValue=""
                                    />
                                    <span className="sp_lux"></span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  className="LUX_basic_btn Default basic"
                                >
                                  <span>삭제</span>
                                </button>
                              </div>
                              <div className="inbx_full">
                                <div className="LUX_basic_text">
                                  <div className="inpbx">
                                    <p className="placeholder">입력해주세요</p>
                                    <input
                                      type="text"
                                      id="textField_text_email_3_3"
                                      defaultValue=""
                                    />
                                    <span className="sp_lux"></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="addcell">
                          <th scope="row" className="celvat">
                            <div className="inbx">
                              <div className="LUX_basic_select">
                                <div className="searchbx">
                                  <span className="inpbx">
                                    <input type="text" id="textField_text4_11_1" />
                                    <span className="placeholder">직장 주소</span>
                                  </span>
                                  <button type="button" className="btn">
                                    <span className="sp_lux">검색</span>
                                  </button>
                                </div>
                                <div className="resultbx">
                                  <div
                                    className="result_scrall"
                                    style={{ maxHeight: "100px" }}
                                  >
                                    {/* <!-- 스크롤 생성 height 높이값 제어 --> */}
                                    <div className="result_scrallin">
                                      <ul className="result_lst">
                                        <li>
                                          <a href="#">
                                            <div>naver.com</div>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <div>naver.com</div>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </th>
                          <td>
                            <div className="inbx">
                              <div className="inbx_full">
                                <div className="LUX_basic_text">
                                  <div className="inpbx">
                                    <p className="placeholder">입력해주세요</p>
                                    <input
                                      type="text"
                                      id="textField_text4_2"
                                      defaultValue=""
                                    />
                                    <span className="sp_lux"></span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  className="LUX_basic_btn Default basic"
                                >
                                  <span>삭제</span>
                                </button>
                              </div>
                              <div className="inbx_full">
                                <div className="LUX_basic_text">
                                  <div className="inpbx">
                                    <p className="placeholder">입력해주세요</p>
                                    <input
                                      type="text"
                                      id="textField_text4_3"
                                      defaultValue=""
                                    />
                                    <span className="sp_lux"></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">담당업무</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">기획</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">사원번호</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">B0000</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">입사일</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">2012년 07월 02일</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">
                              명함
                      <button
                                type="button"
                                className="LUX_basic_btn Default basic btn_mobile"
                                style={{ marginTop: "4px" }}
                              >
                                <span>
                                  <span className="sp_lux"></span> 모바일촬영
                        </span>
                              </button>
                            </div>
                          </th>
                          <td>
                            <div className="inbx">
                              {/* <!--
													 [D] namecard_bx에 .front 또는 .back 클래스 중에 하나는 꼭 붙입니다.
													 	 명함 이미지가 없을 때 : is_empty
														 에디트모드 일 때 : is_edit
														 '앞면/뒷면' 타이틀이 필요할 때 : is_title
												--> */}
                              <div className="namecard_bx front is_edit is_title">
                                <strong className="title">앞면/뒷면</strong>
                                <img
                                  src="https://static.wehago.com/imgs/dummy/@namecard_front.png"
                                  className="img_namecard"
                                  alt="명함 앞면"
                                />
                                <div className="edit_bx">
                                  <div className="btn_bx">
                                    <a href="#" className="btn_edit delete">
                                      <span>삭제</span>
                                    </a>
                                    <a href="#" className="btn_edit modify">
                                      <span>수정</span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="namecard_bx back is_edit is_title">
                                <strong className="title">앞면/뒷면</strong>
                                <img
                                  src="https://static.wehago.com/imgs/dummy/@namecard_back.png"
                                  className="img_namecard"
                                  alt="명함 앞면"
                                />
                                <div className="edit_bx">
                                  <div className="btn_bx">
                                    <a href="#" className="btn_edit delete">
                                      <span>삭제</span>
                                    </a>
                                    <a href="#" className="btn_edit modify">
                                      <span>수정</span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="namecard_bx file_drop is_title">
                                <strong className="title">앞면/뒷면</strong>
                                <div
                                  className="LUX_filezone type2"
                                  style={{ border: 0 }}
                                >
                                  <div className="file_bx">
                                    {/* <!-- [D] 기본 상태 --> */}
                                    <div
                                      className="default"
                                      style={{ padding: "37px 0" }}
                                    >
                                      <p style={{ paddingLeft: 0 }}>
                                        <span
                                          className="sp_lux"
                                          style={{
                                            width: "41px",
                                            height: "46px",
                                            verticalAlign: "middle",
                                            backgroundPosition: "-311px -663px",
                                          }}
                                        ></span>
                                        <span
                                          className="txt"
                                          style={{ letterSpacing: "-1px" }}
                                        >
                                          여기에 놓으면 파일이 첨부됩니다.
                                </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {/* <!-- [D] 모바일 촬영 버튼이 필요한 경우 btn_bx에 mobile 클래스를 붙여주세요. --> */}
                                <div className="btn_bx">
                                  <button
                                    type="button"
                                    className="LUX_basic_btn Default basic btn_mypc"
                                  >
                                    <span>
                                      <span className="sp_lux"></span> 내 PC
                            </span>
                                  </button>
                                  <button
                                    type="button"
                                    className="LUX_basic_btn Default basic btn_wedrive"
                                  >
                                    <span>
                                      <span className="sp_lux"></span> WE드라이브
                            </span>
                                  </button>
                                  <button
                                    type="button"
                                    className="LUX_basic_btn Default basic btn_mobile"
                                  >
                                    <span>
                                      <span className="sp_lux"></span> 모바일촬영
                            </span>
                                  </button>
                                </div>
                                <div className="dimmed">
                                  <div className="LS_spinner2">
                                    <div className="loading"></div>
                                    <span className="loading_text">loading</span>
                                  </div>
                                </div>
                              </div>
                              <div className="namecard_bx file_drop is_title is_loading">
                                <strong className="title">앞면/뒷면</strong>
                                <div
                                  className="LUX_filezone type2"
                                  style={{ border: 0 }}
                                >
                                  <div className="file_bx">
                                    {/* <!-- [D] 기본 상태 --> */}
                                    <div
                                      className="default"
                                      style={{ padding: "37px 0" }}
                                    >
                                      <p style={{ paddingLeft: 0 }}>
                                        <span
                                          className="sp_lux"
                                          style={{
                                            width: "41px",
                                            height: "46px",
                                            verticalAlign: "middle",
                                            backgroundPosition: "-311px -663px",
                                          }}
                                        ></span>
                                        <span
                                          className="txt"
                                          style={{ letterSpacing: "-1px" }}
                                        >
                                          여기에 놓으면 파일이 첨부됩니다.
                                </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {/* <!-- [D] 모바일 촬영 버튼이 필요한 경우 btn_bx에 mobile 클래스를 붙여주세요. --> */}
                                <div className="btn_bx">
                                  <button
                                    type="button"
                                    className="LUX_basic_btn Default basic btn_mypc"
                                  >
                                    <span>
                                      <span className="sp_lux"></span> 내 PC
                            </span>
                                  </button>
                                  <button
                                    type="button"
                                    className="LUX_basic_btn Default basic btn_wedrive"
                                  >
                                    <span>
                                      <span className="sp_lux"></span> WE드라이브
                            </span>
                                  </button>
                                  <button
                                    type="button"
                                    className="LUX_basic_btn Default basic btn_mobile"
                                  >
                                    <span>
                                      <span className="sp_lux"></span> 모바일촬영
                            </span>
                                  </button>
                                </div>
                                <div className="dimmed">
                                  <div className="LS_spinner2">
                                    <div className="loading"></div>
                                    <span className="loading_text">loading</span>
                                  </div>
                                </div>
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
          {/* <!-- 직장정보 --> 
          <div className="LUX_basic_tbl open">
            <div className="tbl_tit">
              <h2>
                직장정보<span className="tbl_tit_info">더존 비즈온</span>
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
                        <button type="button" className="LUX_basic_btn Image btn_arr">
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
                            <div className="inbx">
                              <div className="LUX_basic_select">
                                <div className="searchbx">
                                  <span className="inpbx">
                                    <input type="text" id="textField_text5_11" />
                                    <span className="placeholder">직장 이메일주소</span>
                                  </span>
                                  <button type="button" className="btn">
                                    <span className="sp_lux">검색</span>
                                  </button>
                                </div>
                                <div className="resultbx">
                                  <div
                                    className="result_scrall"
                                    style={{ maxHeight: "100px" }}
                                  >
                                    {/* <!-- 스크롤 생성 height 높이값 제어 --> */}
                                    <div className="result_scrallin">
                                      <ul className="result_lst">
                                        <li>
                                          <a href="#">
                                            <div>naver.com</div>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <div>naver.com</div>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </th>
                          <td>
                            <div className="inbx">
                              <div className="inbx_email">
                                <div className="LUX_basic_text editing">
                                  <div className="inpbx">
                                    <p className="placeholder">입력해주세요</p>
                                    <input
                                      type="text"
                                      id="textField_text5_2"
                                      defaultValue=""
                                    />
                                    <span className="sp_lux"></span>
                                  </div>
                                </div>
                                <span className="sign">@</span>
                                <div className="LUX_basic_text">
                                  {/* <!-- 입력창에 포커스 - inpbx className="on" 추가  --> */}
                                  <div className="inpbx">
                                    <p className="placeholder"></p>
                                    <input
                                      type="text"
                                      id="textField_text5_3"
                                      defaultValue=""
                                    />
                                    <span className="sp_lux"></span>
                                  </div>
                                </div>
                                <div className="LUX_basic_select">
                                  <div className="searchbx">
                                    <span className="inpbx">
                                      <input type="text" id="textField_text5_4" />
                                      <span className="placeholder">직접입력</span>
                                    </span>
                                    <button type="button" className="btn">
                                      <span className="sp_lux">검색</span>
                                    </button>
                                  </div>
                                  <div className="resultbx">
                                    <div
                                      className="result_scrall"
                                      style={{ maxHeight: "100px" }}
                                    >
                                      {/* <!-- 스크롤 생성 height 높이값 제어 --> */}
                                      <div className="result_scrallin">
                                        <ul className="result_lst">
                                          <li>
                                            <a href="#">
                                              <div>naver.com</div>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <div>naver.com</div>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  className="LUX_basic_btn Default basic"
                                >
                                  <span>삭제</span>
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="addcell">
                          <th scope="row">
                            <div className="inbx">
                              <div className="LUX_basic_select">
                                <div className="searchbx">
                                  <span className="inpbx">
                                    <input type="text" id="btn_search7_11" />
                                    <span className="placeholder">직장 이메일주소</span>
                                  </span>
                                  <button type="button" className="btn">
                                    <span className="sp_lux">검색</span>
                                  </button>
                                </div>
                                <div className="resultbx">
                                  <div
                                    className="result_scrall"
                                    style={{ maxHeight: "100px" }}
                                  >
                                    {/* <!-- 스크롤 생성 height 높이값 제어 --> */}
                                    <div className="result_scrallin">
                                      <ul className="result_lst">
                                        <li>
                                          <a href="#">
                                            <div>naver.com</div>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <div>naver.com</div>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </th>
                          <td>
                            <div className="inbx">
                              <div className="inbx_email">
                                <div className="LUX_basic_text editing">
                                  <div className="inpbx">
                                    <p className="placeholder">입력해주세요</p>
                                    <input
                                      type="text"
                                      id="textField_text4_1"
                                      defaultValue=""
                                    />
                                    <span className="sp_lux"></span>
                                  </div>
                                </div>
                                <span className="sign">@</span>
                                <div className="LUX_basic_text">
                                  {/* <!-- 입력창에 포커스 - inpbx className="on" 추가  --> */}
                                  <div className="inpbx">
                                    <p className="placeholder"></p>
                                    <input
                                      type="text"
                                      id="textField_text5_1"
                                      defaultValue=""
                                    />
                                    <span className="sp_lux"></span>
                                  </div>
                                </div>
                                <div className="LUX_basic_select">
                                  <div className="searchbx">
                                    <span className="inpbx">
                                      <input type="text" id="btn_search7_2" />
                                      <span className="placeholder">직접입력</span>
                                    </span>
                                    <button type="button" className="btn">
                                      <span className="sp_lux">검색</span>
                                    </button>
                                  </div>
                                  <div className="resultbx">
                                    <div
                                      className="result_scrall"
                                      style={{ maxHeight: "100px" }}
                                    >
                                      {/* <!-- 스크롤 생성 height 높이값 제어 --> */}
                                      <div className="result_scrallin">
                                        <ul className="result_lst">
                                          <li>
                                            <a href="#">
                                              <div>naver.com</div>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <div>naver.com</div>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  className="LUX_basic_btn Default basic"
                                >
                                  <span>삭제</span>
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">
                              <div className="LUX_basic_select">
                                <div className="searchbx">
                                  <span className="inpbx">
                                    <input type="text" id="textField_text6_1" />
                                    <span className="placeholder">직장 전화번호</span>
                                  </span>
                                  <button type="button" className="btn">
                                    <span className="sp_lux">검색</span>
                                  </button>
                                </div>
                                <div className="resultbx">
                                  <div
                                    className="result_scrall"
                                    style={{ maxHeight: "100px" }}
                                  >
                                    {/* <!-- 스크롤 생성 height 높이값 제어 --> */}
                                    <div className="result_scrallin">
                                      <ul className="result_lst">
                                        <li>
                                          <a href="#">
                                            <div>naver.com</div>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <div>naver.com</div>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </th>
                          <td>
                            <div className="inbx">
                              <div className="inbx_default">
                                <div className="LUX_basic_text">
                                  <div className="inpbx">
                                    <p className="placeholder">입력해주세요</p>
                                    <input
                                      type="text"
                                      id="textField_text6_2"
                                      defaultValue=""
                                    />
                                    <span className="sp_lux"></span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  className="LUX_basic_btn Default basic"
                                >
                                  <span>삭제</span>
                                </button>
                              </div>
                              <p className="guide_p">전화번호 사이에 ‘-‘는 제외</p>
                            </div>
                          </td>
                        </tr>
                        <tr className="addcell">
                          <th scope="row">
                            <div className="inbx">
                              <div className="LUX_basic_select">
                                <div className="searchbx">
                                  <span className="inpbx">
                                    <input type="text" id="textField_text7_1" />
                                    <span className="placeholder">직장 전화번호</span>
                                  </span>
                                  <button type="button" className="btn">
                                    <span className="sp_lux">검색</span>
                                  </button>
                                </div>
                                <div className="resultbx">
                                  <div
                                    className="result_scrall"
                                    style={{ maxHeight: "100px" }}
                                  >
                                    {/* <!-- 스크롤 생성 height 높이값 제어 --> */}
                                    <div className="result_scrallin">
                                      <ul className="result_lst">
                                        <li>
                                          <a href="#">
                                            <div>naver.com</div>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <div>naver.com</div>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </th>
                          <td>
                            <div className="inbx">
                              <div className="inbx_default">
                                <div className="LUX_basic_text">
                                  <div className="inpbx">
                                    <p className="placeholder">입력해주세요</p>
                                    <input
                                      type="text"
                                      id="textField_text7_2"
                                      defaultValue=""
                                    />
                                    <span className="sp_lux"></span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  className="LUX_basic_btn Default basic"
                                >
                                  <span>삭제</span>
                                </button>
                              </div>
                              <p className="guide_p">전화번호 사이에 ‘-‘는 제외</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">생년월일</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <div className="inbx_default">
                                <div className="LUX_basic_date">
                                  <div className="datebx">
                                    <span className="inpbx">
                                      <input
                                        type="text"
                                        id="btn_date"
                                        defaultValue="2016.08.28"
                                      />
                                      <label htmlFor="btn_date"></label>
                                    </span>
                                    <button type="button" className="btn">
                                      <span className="sp_lux">검색</span>
                                    </button>
                                  </div>

                                  <div className="LUX_calendar">
                                    <div className="LUX_date_day_bx">
                                      <div className="date_select">
                                        <button
                                          type="button"
                                          className="btn btn_prev_year"
                                        >
                                          <span className="sp_lux">이전년</span>
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn_prev_mon"
                                        >
                                          <span className="sp_lux">이전달</span>
                                        </button>
                                        <strong className="date_day_title">
                                          2017. 08
                                </strong>
                                        <button
                                          type="button"
                                          className="btn btn_next_mon"
                                        >
                                          <span className="sp_lux">다음년</span>
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn_next_year"
                                        >
                                          <span className="sp_lux">이전달</span>
                                        </button>
                                      </div>
                                      <div className="date_tbl">
                                        <table>
                                          <caption></caption>
                                          <colgroup>
                                            <col style={{ width: "28px" }} span="7" />
                                          </colgroup>
                                          <thead>
                                            <tr>
                                              <th scope="col" className="date_week">
                                                일
                                      </th>
                                              <th scope="col" className="date_week">
                                                월
                                      </th>
                                              <th scope="col" className="date_week">
                                                화
                                      </th>
                                              <th scope="col" className="date_week">
                                                수
                                      </th>
                                              <th scope="col" className="date_week">
                                                목
                                      </th>
                                              <th scope="col" className="date_week">
                                                금
                                      </th>
                                              <th scope="col" className="date_week">
                                                토
                                      </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td className="date_day date_day_sun date_day_prev_mon">
                                                <button type="button">
                                                  <span>30</span>
                                                </button>
                                              </td>
                                              <td className="date_day date_day_prev_mon">
                                                <button type="button">
                                                  <span>31</span>
                                                </button>
                                              </td>
                                              <td className="date_day">
                                                <button type="button">
                                                  <span>1</span>
                                                </button>
                                              </td>
                                              <td className="date_day">
                                                <button type="button">
                                                  <span>2</span>
                                                </button>
                                              </td>
                                              <td className="date_day">
                                                <button type="button">
                                                  <span>3</span>
                                                </button>
                                              </td>
                                              <td className="date_day">
                                                <button type="button">
                                                  <span>4</span>
                                                </button>
                                              </td>
                                              <td className="date_day date_day_sat">
                                                <button type="button">
                                                  <span>5</span>
                                                </button>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="date_day date_day_sun">
                                                <button type="button">
                                                  <span>6</span>
                                                </button>
                                              </td>
                                              <td className="date_day date_day_today">
                                                <button type="button">
                                                  <span>7</span>
                                                </button>
                                              </td>
                                              <td className="date_day">
                                                <button type="button">
                                                  <span>8</span>
                                                </button>
                                              </td>
                                              <td className="date_day">
                                                <button type="button">
                                                  <span>9</span>
                                                </button>
                                              </td>
                                              <td className="date_day">
                                                <button type="button">
                                                  <span>10</span>
                                                </button>
                                              </td>
                                              <td className="date_day">
                                                <button type="button">
                                                  <span>11</span>
                                                </button>
                                              </td>
                                              <td className="date_day date_day_sat">
                                                <button type="button">
                                                  <span>12</span>
                                                </button>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="date_day date_day_sun">
                                                <button type="button">
                                                  <span>13</span>
                                                </button>
                                              </td>
                                              <td className="date_day">
                                                <button type="button">
                                                  <span>14</span>
                                                </button>
                                              </td>
                                              <td className="date_day date_day_holiday">
                                                <button type="button">
                                                  <span>15</span>
                                                </button>
                                              </td>
                                              <td className="date_day">
                                                <button type="button">
                                                  <span>16</span>
                                                </button>
                                              </td>
                                              <td className="date_day">
                                                <button type="button">
                                                  <span>17</span>
                                                </button>
                                              </td>
                                              <td className="date_day date_day_selected">
                                                <button type="button">
                                                  <span>18</span>
                                                </button>
                                              </td>
                                              <td className="date_day date_day_sat date_day_gap">
                                                <button type="button">19</button>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="date_day date_day_sun date_day_gap">
                                                <button type="button">
                                                  <span>20</span>
                                                </button>
                                              </td>
                                              <td className="date_day date_day_gap">
                                                <button type="button">
                                                  <span>21</span>
                                                </button>
                                              </td>
                                              <td className="date_day date_day_gap">
                                                <button type="button">
                                                  <span>22</span>
                                                </button>
                                              </td>
                                              <td className="date_day date_day_gap">
                                                <button type="button">
                                                  <span>23</span>
                                                </button>
                                              </td>
                                              <td className="date_day date_day_selected">
                                                <button type="button">
                                                  <span>24</span>
                                                </button>
                                              </td>
                                              <td className="date_day">
                                                <button type="button">
                                                  <span>25</span>
                                                </button>
                                              </td>
                                              <td className="date_day date_day_sat">
                                                <button type="button">
                                                  <span>26</span>
                                                </button>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="date_day date_day_sun">
                                                <button type="button">
                                                  <span>27</span>
                                                </button>
                                              </td>
                                              <td className="date_day">
                                                <button type="button">
                                                  <span>28</span>
                                                </button>
                                              </td>
                                              <td className="date_day">
                                                <button type="button">
                                                  <span>29</span>
                                                </button>
                                              </td>
                                              <td className="date_day">
                                                <button type="button">
                                                  <span>30</span>
                                                </button>
                                              </td>
                                              <td className="date_day">
                                                <button type="button">
                                                  <span>31</span>
                                                </button>
                                              </td>
                                              <td className="date_day date_day_next_mon">
                                                <button type="button">
                                                  <span>1</span>
                                                </button>
                                              </td>
                                              <td className="date_day date_day_sat date_day_next_mon">
                                                <button type="button">
                                                  <span>2</span>
                                                </button>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>

                                    <div className="select_area">
                                      <div className="btn_group">
                                        <button type="button" className="btn btn_db">
                                          오늘
                                </button>
                                      </div>
                                      <p className="solar_area">
                                        <span
                                          className="_label"
                                          data-solar-label="양력"
                                          data-lunar-label="음력"
                                        >
                                          음력
                                </span>
                                        <span className="_text">2017.06.10 (평달)</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <span className="LUX_basic_switch">
                                  <span className="LUXrabx">
                                    <input
                                      type="radio"
                                      id="input_tblin_radio7"
                                      name="tbl_radio2"
                                    />
                                    <span className="sp_lux"></span>
                                    <label htmlFor="input_tblin_radio7">양력</label>
                                  </span>
                                </span>
                                <span className="LUX_basic_switch">
                                  <span className="LUXrabx">
                                    <input
                                      type="radio"
                                      id="input_tblin_radio8"
                                      name="tbl_radio2"
                                    />
                                    <span className="sp_lux"></span>
                                    <label htmlFor="input_tblin_radio8">음력</label>
                                  </span>
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">직책</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">팀원</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">보유스킬</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <div className="skill">
                                <span>TEXT</span>
                                <span>TEXT</span>
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
        </div>

        <div className="btn_group">
          <Link to="/setting/userinfo/">
            <button type="button" className="LUX_basic_btn Confirm hover">
              <span>취소</span>
            </button>
          </Link>
          <button type="button" className="LUX_basic_btn Confirm basic2">
            <span>저장</span>
          </button>
        </div>

      </div>

    </React.Fragment>
  );
};

export default Edit_personal_info;
