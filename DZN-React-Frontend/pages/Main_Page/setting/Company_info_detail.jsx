import React, { Button } from 'react';
import { Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import { Card } from "react-bootstrap";

const Company_info_detail = () => {
  return (
    <React.Fragment>
      <div className="cs_container">
        <div className="tbl_accordion">
          <Accordion defaultActiveKey="0">
            <Card>
              <div className="LUX_basic_tbl open">
                <div className="tbl_tit">
                  <h2 className="co_revise_btn">기본정보</h2>
                  <div className="btnbx ">
                    <Link to="/setting/coinfo/revise">

                      <button type="button" className="LUX_basic_btn Default basic">
                        <span>수정</span>
                      </button>

                    </Link>
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
                        <col style={{ width: "440px" }} />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th scope="row">
                            <div className="inbx">회사이름</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">더존비즈온</p>
                            </div>
                          </td>
                          <td rowSpan="9" className="tbl_maparea">
                            <div className="inbx">
                              <div className="maparea">
                                <img
                                  src="https://static.wehago.com/imgs/dummy/@map.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">사업자등록번호</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">
                                123-12-12345
                        <button
                                  type="button"
                                  className="LUX_basic_btn Default basic"
                                  style={{ marginLeft: "8px", verticalAlign: "middle" }}
                                >
                                  <span>중복가입 내역조회</span>
                                </button>
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">법인등록번호</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">123-12-12345</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">대표자 이름</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">김더존</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">
                              <span className="sp_lux blue">필수입력</span>업종코드
                    </div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">720000</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">
                              <span className="sp_lux">필수입력</span>업태
                    </div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">정보서비스업</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">
                              <span className="sp_lux">필수입력</span>업종
                    </div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">소프트웨어자문/개발 및 공급</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">
                              <span className="sp_lux">필수입력</span>회사전화번호
                    </div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">02-6233-0929</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">
                              <span className="sp_lux">필수입력</span>회사주소
                    </div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">
                                [24563] 강원도 춘천시 남산면 수동리 버들1길 130
                                더존비즈온 1F
                      </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">사업자등록증</div>
                          </th>
                          <td colSpan="2">
                            <div className="inbx">
                              <div className="reg_card">
                                <div className="inbx_enroll_img2">
                                  <img src="" alt="사업자등록증" />
                                  <button type="button" className="btn btn_view">
                                    <span className="blind">크게보기</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        {/* <!-- 
                                        [D] 사업자등록증이 등록되지 않은 경우
                                    <tr>
                                        <th scope="row">
                                            <div className="inbx">
                                                사업자등록증
                                            </div>
                                        </th>
                                        <td>
                                            <div className="inbx">
                                                <p className="inbx_value">사업자등록증이 등록되지 않았습니다. "수정"버튼을 눌러 사업자정보 도용대비 및 회사증명을 위한 사업자등록증을 등록해주세요.</p>
                                            </div>
                                        </td>
                                    </tr>
                                    --> */}
                      </tbody>
                    </table>
                  </Card.Body>
                </Accordion.Collapse>
              </div>
            </Card>
          </Accordion>

          <Accordion defaultActiveKey="0">
            <Card>
              <div className="LUX_basic_tbl open">
                <div className="tbl_tit">
                  <h2>직장정보</h2>
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
                            <div className="inbx">회사로고</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <img
                                src="https://static.wehago.com/imgs/dummy/@company_logo.png"
                                alt=""
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">회사 영문이름</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">DUZONBIZON</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">대표자 영문이름</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">duzon Kim</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">회사 영문주소</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">
                                Beodeul 1-gil, Namsan-myeon,Chuncheon-si,Gangwon-do
                      </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">홈페이지 주소</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <p className="inbx_value">www.duzon.com</p>
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

          <Accordion defaultActiveKey="0">
            <Card>
              <div className="LUX_basic_tbl connect_wehagot open">
                <div className="tbl_tit">
                  <h2>세무대리 연결정보</h2>
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
                            <div className="inbx">세무대리인연결 유무</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <span className="sp_lux ico_chk"></span>미연결 상태{" "}
                              <button
                                type="button"
                                className="LUX_basic_btn Default basic btn_connect"
                              >
                                <span>세무대리 연결하기</span>
                              </button>
                              <span className="info_txt">
                                세무대리 수임중인 세무회계사무소와 연결할 수 있습니다.
                                왼쪽 세무대리 연결하기 버튼을 클릭하여 세무대리인을
                                연결하세요.
                      </span>
                            </div>
                          </td>
                        </tr>
                        {/* <!-- [D] 연결인 경우 is_linked 클래스 추가 --> */}
                        <tr className="is_linked">
                          <th scope="row">
                            <div className="inbx">세무대리인연결 유무</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <span className="sp_lux ico_chk"></span>연결완료
                    </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">연결된 세무대리인</div>
                          </th>
                          <td>
                            <div className="inbx">김원태회사1111</div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">사업자등록번호</div>
                          </th>
                          <td>
                            <div className="inbx">203-82-03602</div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">연결일시</div>
                          </th>
                          <td>
                            <div className="inbx">2019.04.01</div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">
                              세무대리인연결
                      <br />
                      데이터현황
                    </div>
                          </th>
                          <td>
                            <div className="inbx">
                              <div className="data_status_wrap">
                                <div className="data_title">
                                  <svg viewBox="0 0 24 24" className="comp_img">
                                    <path d="M16.002,11.999h2v-2h-2V11.999z M16.002,15.999h2v-2h-2V15.999z M21.992,8c0-1.1-0.891-2-1.99-2H15V4c0-1.1-0.9-2-2.001-2 H4C2.901,2,2.01,2.9,2.01,4L2,20.001C2,21.102,2.901,22,4,22h8.999c0,0,0,0,0.001,0h7.002c1.1,0,1.998-0.9,1.998-2L21.992,8z M12.999,20L10,20.001v-4.002H7v4.003l-3,0.001V4h9L12.999,20z M20.002,20H15V8h5.002l-0.01,0.002L20.002,20z M11,6H6v2h5V6z M11,9H6v2h5V9z M11,12H6v2h5V12z"></path>
                                  </svg>
                          (주)더존세무법인 데이터
                        </div>
                                <div className="data_bx">
                                  <dl className="detail_info">
                                    <dt>상호명</dt>
                                    <dd>(주)삼성물산 2019년 신고</dd>
                                    <dt>사업자등록번호</dt>
                                    <dd>503-10-01010</dd>
                                    <dt>종사업장 번호</dt>
                                    <dd>0001</dd>
                                  </dl>
                                  <dl className="detail_info">
                                    <dt>사용 서비스</dt>
                                    <dd>회계/인사</dd>
                                    <dt>사용중 기수</dt>
                                    <dd>1,2,4,5,6,7,8기</dd>
                                    <dt>사용중 인사연도</dt>
                                    <dd className="year_list">
                                      <span className="year">2019</span>
                                      <span className="year">2018</span>
                                      <span className="year">2017</span>
                                      <span className="year">2016</span>
                                      <span className="year">2015</span>
                                      <span className="year">2014</span>
                                      <span className="year">2013</span>
                                      <span className="year">2012</span>
                                      <span className="year">2011</span>
                                      <span className="year">2010</span>
                                      <span className="year">2009</span>
                                      <span className="year">2008</span>
                                      <span className="year">2007</span>
                                    </dd>
                                  </dl>
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

          <Accordion defaultActiveKey="0">
            <Card>
              <div className="LUX_basic_tbl connect_wehagot open">
                <div className="tbl_tit">
                  <h2>세무대리 연결정보</h2>
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
                          <td colSpan="2">
                            <div className="inbx">
                              <div className="nodata_area nodata_area_v2">
                                <span className="nodata_text">
                                  세무대리 연결 정보를 불러올 수 없습니다.
                          <br />
                          잠시 후 다시 확인하거나 고객센터로 문의바랍니다.
                        </span>
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

          <Accordion defaultActiveKey="0">
            <Card>
              <div className="LUX_basic_tbl open">
                <div className="tbl_tit">
                  <h2>본지점정보</h2>
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
                            <div className="inbx">본지점 구분</div>
                          </th>
                          <td>
                            <div className="inbx">본점</div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">조직도 통합설정</div>
                          </th>
                          <td>
                            <div className="inbx">통합조직도 사용</div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">과세단위</div>
                          </th>
                          <td>
                            <div className="inbx">총괄납부</div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <div className="inbx">지점리스트</div>
                          </th>
                          <td>
                            <div className="inbx">
                              <ul className="office_list_wrap">
                                <li>
                                  <a href="#">
                                    <div className="LUX_basic_tbl">
                                      <table className="tblarea">
                                        <caption>
                                          <span className="blind"></span>
                                        </caption>
                                        <colgroup>
                                          <col style={{ width: "100px" }} />
                                          <col />
                                          <col style={{ width: "30%" }} />
                                          <col style={{ width: "20%" }} />
                                          <col style={{ width: "100px" }} />
                                        </colgroup>
                                        <tbody>
                                          <tr>
                                            <td className="celcnt">
                                              <div className="inbx">지점</div>
                                            </td>
                                            <td className="celcnt" rowSpan="2">
                                              <div className="inbx">
                                                <span
                                                  className="company_name"
                                                  title="(주)더존비지니스"
                                                >
                                                  (주)더존비지니스 더존비지니스
                                                  더존비지니스 더존비지니스
                                        </span>
                                              </div>
                                            </td>
                                            <td className="celcnt" rowSpan="2">
                                              <div className="inbx company_num">
                                                123-123141-1231 / 0000
                                      </div>
                                            </td>
                                            <td className="celcnt" rowSpan="2">
                                              <div className="inbx">
                                                <div className="LUX_basic_popover">
                                                  <div className="popoverbx">
                                                    회사 관리자 : 김관리
                                          </div>
                                                  <div className="resultbx">
                                                    <div className="LUX_basic_profile profile_open">
                                                      <span className="sp_lux sp_arrow"></span>
                                                      <div className="profile">
                                                        <div className="imgbx">
                                                          <img
                                                            src="https://static.wehago.com/imgs/dummy/@img2.gif"
                                                            alt="프로필 이미지"
                                                          />
                                                        </div>
                                                        <div className="namebx">
                                                          <strong>이은비</strong>사원
                                                  <span className="sp_lux sp_ing">
                                                            접속중
                                                  </span>
                                                          <span className="sp_lux sp_offline">
                                                            미접속
                                                  </span>
                                                        </div>
                                                        <div className="btnbx">
                                                          <button
                                                            type="button"
                                                            className="LUX_basic_btn Default basic"
                                                          >
                                                            <span>메일</span>
                                                          </button>
                                                          <button
                                                            type="button"
                                                            className="LUX_basic_btn Default basic"
                                                          >
                                                            <span>일정</span>
                                                          </button>
                                                          <button
                                                            type="button"
                                                            className="LUX_basic_btn Default basic"
                                                          >
                                                            <span>대화</span>
                                                          </button>
                                                        </div>
                                                      </div>
                                                      <ul className="profile_info">
                                                        <li className="cellft">
                                                          <div className="inbx">
                                                            <span className="svgbx">
                                                              <span className="blind">
                                                                조직
                                                      </span>
                                                              <svg
                                                                viewBox="0 0 24 24"
                                                                style={{
                                                                  display:
                                                                    "inline-block",
                                                                  fill: "#4a4f63",
                                                                  height: "24px",
                                                                  width: "24px",
                                                                  userSelect: "none",
                                                                }}
                                                              >
                                                                <g>
                                                                  <path d="M14.479,4v3H9.479V4H14.479 M15.479,2H8.479c-0.552,0-1,0.447-1,1v5c0,0.553,0.448,1,1,1h6.999 c0.555,0,1-0.447,1-1V3C16.479,2.447,16.033,2,15.479,2L15.479,2z"></path>
                                                                  <path d="M8.479,17v3h-5v-3H8.479 M9.479,15h-7c-0.552,0-1,0.447-1,1v5c0,0.553,0.448,1,1,1h7c0.554,0,1-0.447,1-1 v-5C10.479,15.447,10.034,15,9.479,15L9.479,15z"></path>
                                                                  <path d="M20.521,17v3h-5v-3H20.521 M21.521,15h-7c-0.553,0-1,0.447-1,1v5c0,0.553,0.447,1,1,1h7 c0.553,0,1-0.447,1-1v-5C22.521,15.447,22.074,15,21.521,15L21.521,15z"></path>
                                                                </g>
                                                                <g>
                                                                  <rect
                                                                    x="11.479"
                                                                    y="9"
                                                                    width="1"
                                                                    height="3"
                                                                  ></rect>
                                                                  <rect
                                                                    x="5.479"
                                                                    y="11"
                                                                    width="1"
                                                                    height="4"
                                                                  ></rect>
                                                                  <rect
                                                                    x="17.479"
                                                                    y="11"
                                                                    width="1"
                                                                    height="4"
                                                                  ></rect>
                                                                  <rect
                                                                    x="6.479"
                                                                    y="11"
                                                                    width="10.999"
                                                                    height="1"
                                                                  ></rect>
                                                                </g>
                                                              </svg>
                                                            </span>
                                                    더존비즈온 / 전략부 문 /
                                                    전략마케팅본부 / 디자인센터
                                                    / UI/UX1팀 / 팀원
                                                  </div>
                                                        </li>
                                                        <li className="cellft">
                                                          <div className="inbx">
                                                            <span className="svgbx">
                                                              <span className="blind">
                                                                메일
                                                      </span>
                                                              <svg
                                                                viewBox="0 0 24 24"
                                                                style={{
                                                                  display:
                                                                    "inline-block",
                                                                  fill: "#4a4f63",
                                                                  height: "24px",
                                                                  width: "24px",
                                                                  userSelect: "none",
                                                                }}
                                                              >
                                                                <path d="M19,4.5H5c-1.1,0-1.99,0.9-1.99,2L3,17.5c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-11 C21,5.4,20.1,4.5,19,4.5z M19,17.5L5,17.502V8.511l6.984,5.021L19,8.5V17.5z M11.984,11.531L5,6.511V6.5h14L11.984,11.531z"></path>
                                                              </svg>
                                                            </span>
                                                    123456789012345678901234567890@naver.com
                                                  </div>
                                                        </li>
                                                        <li className="cellft">
                                                          <div className="inbx">
                                                            <span className="svgbx">
                                                              <span className="blind">
                                                                휴대폰번호
                                                      </span>
                                                              <svg
                                                                viewBox="0 0 24 24"
                                                                style={{
                                                                  display:
                                                                    "inline-block",
                                                                  fill: "#4a4f63",
                                                                  height: "24px",
                                                                  width: "24px",
                                                                  userSelect: "none",
                                                                }}
                                                              >
                                                                <path d="M16,2.001H8c-1.379,0-2.5,1.12-2.5,2.5v15c0,1.379,1.121,2.5,2.5,2.5h8c1.381,0,2.5-1.121,2.5-2.5v-15 C18.5,3.122,17.381,2.001,16,2.001z M13.539,20.002h-3.078v-1h3.078V20.002z M16.5,17.002h-9v-13h9V17.002z"></path>
                                                              </svg>
                                                            </span>
                                                    010-1234-1234
                                                  </div>
                                                        </li>
                                                        <li className="cellft">
                                                          <div className="inbx">
                                                            <span className="svgbx">
                                                              <span className="blind">
                                                                일정
                                                      </span>
                                                              <svg
                                                                viewBox="0 0 24 24"
                                                                style={{
                                                                  display:
                                                                    "inline-block",
                                                                  fill: "#4a4f63",
                                                                  height: "24px",
                                                                  width: "24px",
                                                                  userSelect: "none",
                                                                }}
                                                              >
                                                                <path d="M13.652,10.314h-3.335v3.38h3.335V10.314z M18.75,10.314h-3.335v3.38h3.335V10.314z M13.652,15.412 h-3.335v3.38h3.335V15.412z M22.212,1.795h-1.689V0.119h-3.405v1.676H6.919V0.119H3.577v1.676H1.788 c-0.937,0-1.699,0.761-1.699,1.699V22.18c0,0.94,0.762,1.699,1.699,1.699h20.424c0.939,0,1.699-0.759,1.699-1.699V3.494 C23.911,2.556,23.151,1.795,22.212,1.795z M22.152,22.235H1.818V6.957h20.334V22.235z M8.556,15.412H5.22v3.38h3.336V15.412z M8.556,10.314H5.22v3.38h3.336V10.314z M18.75,15.412h-3.335v3.38h3.335V15.412z"></path>
                                                              </svg>
                                                            </span>
                                                    2016.10.10 / 서비스 기획
                                                    진행사황 리뷰
                                                  </div>
                                                        </li>
                                                      </ul>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </td>
                                            <td className="celcnt" rowSpan="2">
                                              <div className="inbx sub_btn"></div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="celcnt">
                                              <div className="inbx">
                                                <span className="alarm_color">
                                                  연결요청중
                                        </span>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <div className="LUX_basic_tbl">
                                      <table className="tblarea">
                                        <caption>
                                          <span className="blind"></span>
                                        </caption>
                                        <colgroup>
                                          <col style={{ width: "100px" }} />
                                          <col />
                                          <col style={{ width: "30%" }} />
                                          <col style={{ width: "20%" }} />
                                          <col style={{ width: "100px" }} />
                                        </colgroup>
                                        <tbody>
                                          <tr>
                                            <td className="celcnt">
                                              <div className="inbx">지점</div>
                                            </td>
                                            <td className="celcnt" rowSpan="2">
                                              <div className="inbx">
                                                <span
                                                  className="company_name"
                                                  title="(주)더존비지니스"
                                                >
                                                  (주)더존상사
                                        </span>
                                              </div>
                                            </td>
                                            <td className="celcnt" rowSpan="2">
                                              <div className="inbx company_num">
                                                123-123141-1231 / 0000
                                      </div>
                                            </td>
                                            <td className="celcnt" rowSpan="2">
                                              <div className="inbx">
                                                <div className="LUX_basic_popover">
                                                  <div className="popoverbx">
                                                    회사 관리자 : 김관리
                                          </div>
                                                  <div className="resultbx">
                                                    <div className="LUX_basic_profile profile_open">
                                                      <span className="sp_lux sp_arrow"></span>
                                                      <div className="profile">
                                                        <div className="imgbx">
                                                          <img
                                                            src="https://static.wehago.com/imgs/dummy/@img2.gif"
                                                            alt="프로필 이미지"
                                                          />
                                                        </div>
                                                        <div className="namebx">
                                                          <strong>이은비</strong>사원
                                                  <span className="sp_lux sp_ing">
                                                            접속중
                                                  </span>
                                                          <span className="sp_lux sp_offline">
                                                            미접속
                                                  </span>
                                                        </div>
                                                        <div className="btnbx">
                                                          <button
                                                            type="button"
                                                            className="LUX_basic_btn Default basic"
                                                          >
                                                            <span>메일</span>
                                                          </button>
                                                          <button
                                                            type="button"
                                                            className="LUX_basic_btn Default basic"
                                                          >
                                                            <span>일정</span>
                                                          </button>
                                                          <button
                                                            type="button"
                                                            className="LUX_basic_btn Default basic"
                                                          >
                                                            <span>대화</span>
                                                          </button>
                                                        </div>
                                                      </div>
                                                      <ul className="profile_info">
                                                        <li className="cellft">
                                                          <div className="inbx">
                                                            <span className="svgbx">
                                                              <span className="blind">
                                                                조직
                                                      </span>
                                                              <svg
                                                                viewBox="0 0 24 24"
                                                                style={{
                                                                  display:
                                                                    "inline-block",
                                                                  fill: "#4a4f63",
                                                                  height: "24px",
                                                                  width: "24px",
                                                                  userSelect: "none",
                                                                }}
                                                              >
                                                                <g>
                                                                  <path d="M14.479,4v3H9.479V4H14.479 M15.479,2H8.479c-0.552,0-1,0.447-1,1v5c0,0.553,0.448,1,1,1h6.999 c0.555,0,1-0.447,1-1V3C16.479,2.447,16.033,2,15.479,2L15.479,2z"></path>
                                                                  <path d="M8.479,17v3h-5v-3H8.479 M9.479,15h-7c-0.552,0-1,0.447-1,1v5c0,0.553,0.448,1,1,1h7c0.554,0,1-0.447,1-1 v-5C10.479,15.447,10.034,15,9.479,15L9.479,15z"></path>
                                                                  <path d="M20.521,17v3h-5v-3H20.521 M21.521,15h-7c-0.553,0-1,0.447-1,1v5c0,0.553,0.447,1,1,1h7 c0.553,0,1-0.447,1-1v-5C22.521,15.447,22.074,15,21.521,15L21.521,15z"></path>
                                                                </g>
                                                                <g>
                                                                  <rect
                                                                    x="11.479"
                                                                    y="9"
                                                                    width="1"
                                                                    height="3"
                                                                  ></rect>
                                                                  <rect
                                                                    x="5.479"
                                                                    y="11"
                                                                    width="1"
                                                                    height="4"
                                                                  ></rect>
                                                                  <rect
                                                                    x="17.479"
                                                                    y="11"
                                                                    width="1"
                                                                    height="4"
                                                                  ></rect>
                                                                  <rect
                                                                    x="6.479"
                                                                    y="11"
                                                                    width="10.999"
                                                                    height="1"
                                                                  ></rect>
                                                                </g>
                                                              </svg>
                                                            </span>
                                                    더존비즈온 / 전략부 문 /
                                                    전략마케팅본부 / 디자인센터
                                                    / UI/UX1팀 / 팀원
                                                  </div>
                                                        </li>
                                                        <li className="cellft">
                                                          <div className="inbx">
                                                            <span className="svgbx">
                                                              <span className="blind">
                                                                메일
                                                      </span>
                                                              <svg
                                                                viewBox="0 0 24 24"
                                                                style={{
                                                                  display:
                                                                    "inline-block",
                                                                  fill: "#4a4f63",
                                                                  height: "24px",
                                                                  width: "24px",
                                                                  userSelect: "none",
                                                                }}
                                                              >
                                                                <path d="M19,4.5H5c-1.1,0-1.99,0.9-1.99,2L3,17.5c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-11 C21,5.4,20.1,4.5,19,4.5z M19,17.5L5,17.502V8.511l6.984,5.021L19,8.5V17.5z M11.984,11.531L5,6.511V6.5h14L11.984,11.531z"></path>
                                                              </svg>
                                                            </span>
                                                    123456789012345678901234567890@naver.com
                                                  </div>
                                                        </li>
                                                        <li className="cellft">
                                                          <div className="inbx">
                                                            <span className="svgbx">
                                                              <span className="blind">
                                                                휴대폰번호
                                                      </span>
                                                              <svg
                                                                viewBox="0 0 24 24"
                                                                style={{
                                                                  display:
                                                                    "inline-block",
                                                                  fill: "#1c90fb",
                                                                  height: "24px",
                                                                  width: "24px",
                                                                  userSelect: "none",
                                                                }}
                                                              >
                                                                <path d="M16,2.001H8c-1.379,0-2.5,1.12-2.5,2.5v15c0,1.379,1.121,2.5,2.5,2.5h8c1.381,0,2.5-1.121,2.5-2.5v-15 C18.5,3.122,17.381,2.001,16,2.001z M13.539,20.002h-3.078v-1h3.078V20.002z M16.5,17.002h-9v-13h9V17.002z"></path>
                                                              </svg>
                                                            </span>
                                                    010-1234-1234
                                                  </div>
                                                        </li>
                                                        <li className="cellft">
                                                          <div className="inbx">
                                                            <span className="svgbx">
                                                              <span className="blind">
                                                                일정
                                                      </span>
                                                              <svg
                                                                viewBox="0 0 24 24"
                                                                style={{
                                                                  display:
                                                                    "inline-block",
                                                                  fill: "#4a4f63",
                                                                  height: "20px",
                                                                  width: "20px",
                                                                  userSelect: "none",
                                                                }}
                                                              >
                                                                <path d="M13.652,10.314h-3.335v3.38h3.335V10.314z M18.75,10.314h-3.335v3.38h3.335V10.314z M13.652,15.412 h-3.335v3.38h3.335V15.412z M22.212,1.795h-1.689V0.119h-3.405v1.676H6.919V0.119H3.577v1.676H1.788 c-0.937,0-1.699,0.761-1.699,1.699V22.18c0,0.94,0.762,1.699,1.699,1.699h20.424c0.939,0,1.699-0.759,1.699-1.699V3.494 C23.911,2.556,23.151,1.795,22.212,1.795z M22.152,22.235H1.818V6.957h20.334V22.235z M8.556,15.412H5.22v3.38h3.336V15.412z M8.556,10.314H5.22v3.38h3.336V10.314z M18.75,15.412h-3.335v3.38h3.335V15.412z"></path>
                                                              </svg>
                                                            </span>
                                                    2016.10.10 / 서비스 기획
                                                    진행사황 리뷰
                                                  </div>
                                                        </li>
                                                      </ul>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </td>
                                            <td className="celcnt" rowSpan="2">
                                              <div className="inbx sub_btn">
                                                <button
                                                  type="button"
                                                  className="LUX_basic_btn Default basic"
                                                >
                                                  <span>해제요청</span>
                                                </button>
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="celcnt">
                                              <div className="inbx">
                                                <span className="positive_color">
                                                  연결완료
                                        </span>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </a>
                                </li>
                                <li className="on">
                                  <a href="#">
                                    <div className="LUX_basic_tbl">
                                      <table className="tblarea">
                                        <caption>
                                          <span className="blind"></span>
                                        </caption>
                                        <colgroup>
                                          <col style={{ width: "100px" }} />
                                          <col />
                                          <col style={{ width: "30%" }} />
                                          <col style={{ width: "20%" }} />
                                          <col style={{ width: "100px" }} />
                                        </colgroup>
                                        <tbody>
                                          <tr>
                                            <td className="celcnt">
                                              <div className="inbx">지점</div>
                                            </td>
                                            <td className="celcnt" rowSpan="2">
                                              <div className="inbx">
                                                <span
                                                  className="company_name"
                                                  title="(주)더존비지니스"
                                                >
                                                  (주)더존상사
                                        </span>
                                              </div>
                                            </td>
                                            <td className="celcnt" rowSpan="2">
                                              <div className="inbx company_num">
                                                123-123141-1231 / 0000
                                      </div>
                                            </td>
                                            <td className="celcnt" rowSpan="2">
                                              <div className="inbx">
                                                <div className="LUX_basic_popover">
                                                  <div className="popoverbx">
                                                    회사 관리자 : 김관리
                                          </div>
                                                  <div className="resultbx">
                                                    <div className="LUX_basic_profile profile_open">
                                                      <span className="sp_lux sp_arrow"></span>
                                                      <div className="profile">
                                                        <div className="imgbx">
                                                          <img
                                                            src="https://static.wehago.com/imgs/dummy/@img2.gif"
                                                            alt="프로필 이미지"
                                                          />
                                                        </div>
                                                        <div className="namebx">
                                                          <strong>이은비</strong>사원
                                                  <span className="sp_lux sp_ing">
                                                            접속중
                                                  </span>
                                                          <span className="sp_lux sp_offline">
                                                            미접속
                                                  </span>
                                                        </div>
                                                        <div className="btnbx">
                                                          <button
                                                            type="button"
                                                            className="LUX_basic_btn Default basic"
                                                          >
                                                            <span>메일</span>
                                                          </button>
                                                          <button
                                                            type="button"
                                                            className="LUX_basic_btn Default basic"
                                                          >
                                                            <span>일정</span>
                                                          </button>
                                                          <button
                                                            type="button"
                                                            className="LUX_basic_btn Default basic"
                                                          >
                                                            <span>대화</span>
                                                          </button>
                                                        </div>
                                                      </div>
                                                      <ul className="profile_info">
                                                        <li className="cellft">
                                                          <div className="inbx">
                                                            <span className="svgbx">
                                                              <span className="blind">
                                                                조직
                                                      </span>
                                                              <svg
                                                                viewBox="0 0 24 24"
                                                                style={{
                                                                  display:
                                                                    "inline-block",
                                                                  fill: "#4a4f63",
                                                                  height: "24px",
                                                                  width: "24px",
                                                                  userSelect: "none",
                                                                }}
                                                              >
                                                                <g>
                                                                  <path d="M14.479,4v3H9.479V4H14.479 M15.479,2H8.479c-0.552,0-1,0.447-1,1v5c0,0.553,0.448,1,1,1h6.999 c0.555,0,1-0.447,1-1V3C16.479,2.447,16.033,2,15.479,2L15.479,2z"></path>
                                                                  <path d="M8.479,17v3h-5v-3H8.479 M9.479,15h-7c-0.552,0-1,0.447-1,1v5c0,0.553,0.448,1,1,1h7c0.554,0,1-0.447,1-1 v-5C10.479,15.447,10.034,15,9.479,15L9.479,15z"></path>
                                                                  <path d="M20.521,17v3h-5v-3H20.521 M21.521,15h-7c-0.553,0-1,0.447-1,1v5c0,0.553,0.447,1,1,1h7 c0.553,0,1-0.447,1-1v-5C22.521,15.447,22.074,15,21.521,15L21.521,15z"></path>
                                                                </g>
                                                                <g>
                                                                  <rect
                                                                    x="11.479"
                                                                    y="9"
                                                                    width="1"
                                                                    height="3"
                                                                  ></rect>
                                                                  <rect
                                                                    x="5.479"
                                                                    y="11"
                                                                    width="1"
                                                                    height="4"
                                                                  ></rect>
                                                                  <rect
                                                                    x="17.479"
                                                                    y="11"
                                                                    width="1"
                                                                    height="4"
                                                                  ></rect>
                                                                  <rect
                                                                    x="6.479"
                                                                    y="11"
                                                                    width="10.999"
                                                                    height="1"
                                                                  ></rect>
                                                                </g>
                                                              </svg>
                                                            </span>
                                                    더존비즈온 / 전략부 문 /
                                                    전략마케팅본부 / 디자인센터
                                                    / UI/UX1팀 / 팀원
                                                  </div>
                                                        </li>
                                                        <li className="cellft">
                                                          <div className="inbx">
                                                            <span className="svgbx">
                                                              <span className="blind">
                                                                메일
                                                      </span>
                                                              <svg
                                                                viewBox="0 0 24 24"
                                                                style={{
                                                                  display:
                                                                    "inline-block",
                                                                  fill: "#4a4f63",
                                                                  height: "24px",
                                                                  width: "24px",
                                                                  userSelect: "none",
                                                                }}
                                                              >
                                                                <path d="M19,4.5H5c-1.1,0-1.99,0.9-1.99,2L3,17.5c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-11 C21,5.4,20.1,4.5,19,4.5z M19,17.5L5,17.502V8.511l6.984,5.021L19,8.5V17.5z M11.984,11.531L5,6.511V6.5h14L11.984,11.531z"></path>
                                                              </svg>
                                                            </span>
                                                    123456789012345678901234567890@naver.com
                                                  </div>
                                                        </li>
                                                        <li className="cellft">
                                                          <div className="inbx">
                                                            <span className="svgbx">
                                                              <span className="blind">
                                                                휴대폰번호
                                                      </span>
                                                              <svg
                                                                viewBox="0 0 24 24"
                                                                style={{
                                                                  display:
                                                                    "inline-block",
                                                                  fill: "#1c90fb",
                                                                  height: "24px",
                                                                  width: "24px",
                                                                  userSelect: "none",
                                                                }}
                                                              >
                                                                <path d="M16,2.001H8c-1.379,0-2.5,1.12-2.5,2.5v15c0,1.379,1.121,2.5,2.5,2.5h8c1.381,0,2.5-1.121,2.5-2.5v-15 C18.5,3.122,17.381,2.001,16,2.001z M13.539,20.002h-3.078v-1h3.078V20.002z M16.5,17.002h-9v-13h9V17.002z"></path>
                                                              </svg>
                                                            </span>
                                                    010-1234-1234
                                                  </div>
                                                        </li>
                                                        <li className="cellft">
                                                          <div className="inbx">
                                                            <span className="svgbx">
                                                              <span className="blind">
                                                                일정
                                                      </span>
                                                              <svg
                                                                viewBox="0 0 24 24"
                                                                style={{
                                                                  display:
                                                                    "inline-block",
                                                                  fill: "#4a4f63",
                                                                  height: "20px",
                                                                  width: "20px",
                                                                  userSelect: "none",
                                                                }}
                                                              >
                                                                <path d="M13.652,10.314h-3.335v3.38h3.335V10.314z M18.75,10.314h-3.335v3.38h3.335V10.314z M13.652,15.412 h-3.335v3.38h3.335V15.412z M22.212,1.795h-1.689V0.119h-3.405v1.676H6.919V0.119H3.577v1.676H1.788 c-0.937,0-1.699,0.761-1.699,1.699V22.18c0,0.94,0.762,1.699,1.699,1.699h20.424c0.939,0,1.699-0.759,1.699-1.699V3.494 C23.911,2.556,23.151,1.795,22.212,1.795z M22.152,22.235H1.818V6.957h20.334V22.235z M8.556,15.412H5.22v3.38h3.336V15.412z M8.556,10.314H5.22v3.38h3.336V10.314z M18.75,15.412h-3.335v3.38h3.335V15.412z"></path>
                                                              </svg>
                                                            </span>
                                                    2016.10.10 / 서비스 기획
                                                    진행사황 리뷰
                                                  </div>
                                                        </li>
                                                      </ul>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </td>
                                            <td className="celcnt" rowSpan="2">
                                              <div className="inbx sub_btn">
                                                <button
                                                  type="button"
                                                  className="LUX_basic_btn Default basic"
                                                >
                                                  <span>재요청</span>
                                                </button>
                                                <button
                                                  type="button"
                                                  className="LUX_basic_btn Default basic"
                                                >
                                                  <span>내역삭제</span>
                                                </button>
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td className="celcnt">
                                              <div className="inbx">
                                                <a href="#" className="msg_btn">
                                                  연결반려
                                        </a>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </a>
                                </li>
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
          {/* <!-- [D] 본지점 구분 '미사용'일 때 바로 위의 div 대신에 사용합니다.
                            <div className="LUX_basic_tbl open">
                                <div className="tbl_tit">
                                    <h2>본지점정보</h2>
                                    <div className="btnbx">
                                        <button type="button" className="LUX_basic_btn Image btn_arr"><span className="sp_lux">보기/숨기기</span></button>
                                    </div>
                                </div>
                                <table className="tblarea2">
                                    <caption><span className="blind"></span></caption>
                                    <colgroup>
                                        <col style={{width:"150px"}} />
                                        <col />
                                    </colgroup>
                                    <tbody>
                                    <tr>
                                        <th scope="row">
                                            <div className="inbx">
                                                본지점 구분
                                            </div>
                                        </th>
                                        <td>
                                            <div className="inbx">
                                                미사용
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            --> */}
        </div>

      </div>

    </React.Fragment>
  );
};

export default Company_info_detail;
