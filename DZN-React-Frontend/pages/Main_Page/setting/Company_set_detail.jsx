import React, { Button } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Card } from "react-bootstrap";

const Company_set_detail = () => {

    return (
        <React.Fragment>
            <div className="cs_edit_container tbl_accordion">
                <Accordion defaultActiveKey="0">
                    <Card>
                        <div className="LUX_basic_tbl open">
                            <div className="tbl_tit">
                                <h2>기본정보</h2>
                                <div className="btnbx">
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            <button type="button" className="LUX_basic_btn Image btn_arr"><span className="sp_lux">보기/숨기기</span></button>
                                        </Accordion.Toggle>
                                    </Card.Header>
                                </div>
                            </div>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <table className="tblarea2">
                                        <caption><span className="blind"></span></caption>
                                        <colgroup>
                                            <col style={{ width: "150px" }} />
                                            <col />
                                            <col style={{ width: "440px" }} />
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <th scope="row">
                                                    <div className="inbx">
                                                        회사이름
                                            </div>
                                                </th>
                                                <td>
                                                    <div className="inbx">
                                                        <p className="inbx_value">더존비즈온</p>
                                                    </div>
                                                </td>
                                                <td rowSpan="9" className="tbl_maparea">
                                                    <div className="inbx">
                                                        <div className="maparea">
                                                            <img src="https://static.wehago.com/imgs/dummy/@map.png" alt="" />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <div className="inbx">
                                                        사업자등록번호
                                            </div>
                                                </th>
                                                <td>
                                                    <div className="inbx">
                                                        <p className="inbx_value">123-12-12345</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <div className="inbx">
                                                        법인등록번호
                                            </div>
                                                </th>
                                                <td>
                                                    <div className="inbx">
                                                        <p className="inbx_value">123-1234567</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <div className="inbx">
                                                        대표자 이름
                                            </div>
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
                                                        <span className="sp_lux">필수입력</span>업종코드
                                            </div>
                                                </th>
                                                <td>
                                                    <div className="inbx">
                                                        <div className="inbx_default">
                                                            <div className="LUX_basic_submit">
                                                                <div className="searchbx">
                                                                    <span className="inpbx">
                                                                        <input type="text" id="btn_search5" />
                                                                        <span className="placeholder">검색하세요.</span>
                                                                    </span>
                                                                    <button type="button" className="btn"><span className="sp_lux">검색</span></button>
                                                                </div>
                                                                <div className="resultbx">
                                                                    <div className="result_scrall" style={{ maxHeight: "100px" }}>
                                                                        {/* <!-- 스크롤 생성 height 높이값 제어 --> */}
                                                                        <div className="result_scrallin">
                                                                            <ul className="result_lst">
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span></div>
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span> 리스트</div>
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span> 리스트리스트</div>
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span> 리스트리스트</div>
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span> 리스트리스트</div>
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span> 리스트리스트</div>
                                                                                    </a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                                        <div className="inbx_default">
                                                            <div className="LUX_basic_submit">
                                                                <div className="searchbx">
                                                                    <span className="inpbx">
                                                                        <input type="text" id="btn_search6" />
                                                                        <span className="placeholder">검색하세요.</span>
                                                                    </span>
                                                                    <button type="button" className="btn"><span className="sp_lux">검색</span></button>
                                                                </div>
                                                                <div className="resultbx">
                                                                    <div className="result_scrall" style={{ maxHeight: "100px" }}>
                                                                        {/* <!-- 스크롤 생성 height 높이값 제어 --> */}
                                                                        <div className="result_scrallin">
                                                                            <ul className="result_lst">
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span></div>
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span> 리스트</div>
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span> 리스트리스트</div>
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span> 리스트리스트</div>
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span> 리스트리스트</div>
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span> 리스트리스트</div>
                                                                                    </a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                                        <div className="inbx_default">
                                                            <div className="LUX_basic_submit">
                                                                <div className="searchbx">
                                                                    <span className="inpbx">
                                                                        <input type="text" id="btn_search7" />
                                                                        <span className="placeholder">검색하세요.</span>
                                                                    </span>
                                                                    <button type="button" className="btn"><span className="sp_lux">검색</span></button>
                                                                </div>
                                                                <div className="resultbx">
                                                                    <div className="result_scrall" style={{ maxHeight: "100px" }}>
                                                                        {/* // <!-- 스크롤 생성 height 높이값 제어 --> */}
                                                                        <div className="result_scrallin">
                                                                            <ul className="result_lst">
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span></div>
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span> 리스트</div>
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span> 리스트리스트</div>
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span> 리스트리스트</div>
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span> 리스트리스트</div>
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span> 리스트리스트</div>
                                                                                    </a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                                        <div className="inbx_default">
                                                            <div className="LUX_basic_text">
                                                                <div className="inpbx">
                                                                    <p className="placeholder">입력해주세요</p>
                                                                    <input type="text" id="textField_text15" defaultValue="" />
                                                                    <span className="sp_lux"></span>
                                                                </div>
                                                                <p className="info">숫자만 입력해주세요.</p>
                                                            </div>
                                                        </div>
                                                        <p className="guide_p">전화번호 사이에 ‘-‘는 제외</p>
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
                                                        <div className="inbx_full2">
                                                            <div className="LUX_basic_text">
                                                                <div className="inpbx">
                                                                    <p className="placeholder">입력해주세요</p>
                                                                    <input type="text" id="textField_text16" defaultValue="" />
                                                                    <span className="sp_lux"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="inbx_full2">
                                                            <div className="LUX_basic_text">
                                                                <div className="inpbx">
                                                                    <p className="placeholder">입력해주세요</p>
                                                                    <input type="text" id="textField_text17" defaultValue="" />
                                                                    <span className="sp_lux"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <div className="inbx">
                                                        사업자등록증
                                            </div>
                                                </th>
                                                <td colSpan="2">
                                                    <div className="inbx">
                                                        <div className="reg_card">
                                                            <div className="inbx_enroll_img2">
                                                                <img src="" alt="사업자등록증" />
                                                                <button type="button" className="btn btn_view"><span className="blind">크게보기</span></button>
                                                            </div>
                                                            <div className="inbx_enroll_info">
                                                                <ul className="guide_lst">
                                                                    <li>사업자등록증을 카메라로 찍거나 스캔한 이미지를 업로드하세요.</li>
                                                                    <li>개인정보를 위해 제출하는 서류에 있는 개인정보는 마스킹해서 제출하시기를 권장합니다.(주민번호, 대표자개인의주소, 전화번호, 휴대전화번호 등)</li>
                                                                    <li>업로드하는 사업자등록증은 10MB이내의 jpg, gif, png, pdf 형식의 파일만 등록할 수 있습니다.</li>
                                                                    <li>등록된 사업자등록증은 도용신고 및 회사증명의 사유가 발생했을 경우에 확인 목적으로만 사용됩니다.</li>
                                                                </ul>
                                                                <div className="inbx_default">
                                                                    <div className="LUX_basic_text">
                                                                        <div className="inpbx">
                                                                            <input type="text" id="textField_text8" defaultValue="" />
                                                                            <span className="sp_lux"></span>
                                                                        </div>
                                                                    </div>
                                                                    <button type="button" className="LUX_basic_btn Default basic"><span>파일선택</span></button>
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

                <Accordion defaultActiveKey="0">
                    <Card>
                        <div className="LUX_basic_tbl open">
                            <div className="tbl_tit">
                                <h2>직장정보</h2>
                                <div className="btnbx">
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            <button type="button" className="LUX_basic_btn Image btn_arr"><span className="sp_lux">보기/숨기기</span></button>
                                        </Accordion.Toggle>
                                    </Card.Header>
                                </div>
                            </div>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <table className="tblarea2">
                                        <caption><span className="blind"></span></caption>
                                        <colgroup>
                                            <col style={{ width: "150px" }} />
                                            <col />
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <th scope="row">
                                                    <div className="inbx">
                                                        회사로고
                                            </div>
                                                </th>
                                                <td>
                                                    <div className="inbx">
                                                        <div className="inbx_enroll_img2">
                                                            <img src="https://static.wehago.com/imgs/dummy/@company_logo.png" alt="회사로고" />
                                                        </div>
                                                        <div className="inbx_enroll_info">
                                                            <ul className="guide_lst">
                                                                <li>서비스 이용중 표시되는 로고를 등록할 수 있습니다.</li>
                                                                <li>상하여백이 있는 50px의 이미지 등록을 권장합니다.</li>
                                                                <li>이미지 최대사이즈 150 * 50px, 용량 500KB 미만의 파일을 등록해 주세요.</li>
                                                            </ul>
                                                            <button type="button" className="LUX_basic_btn Default basic"><span>등록</span></button>
                                                            <button type="button" className="LUX_basic_btn Default basic"><span>삭제</span></button>
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
                                                                <button type="button" className="btn"><span className="sp_lux">검색</span></button>
                                                            </div>
                                                            <div className="resultbx">
                                                                <div className="result_scrall" style={{ maxHeight: "100px" }}>
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
                                                                    <input type="text" id="textField_text8" defaultValue="" />
                                                                    <span className="sp_lux"></span>
                                                                </div>
                                                            </div>
                                                            <button type="button" className="LUX_basic_btn Default basic"><span>삭제</span></button>
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
                                                                    <input type="text" id="btn_search10" />
                                                                    <span className="placeholder">직장 전화번호</span>
                                                                </span>
                                                                <button type="button" className="btn"><span className="sp_lux">검색</span></button>
                                                            </div>
                                                            <div className="resultbx">
                                                                <div className="result_scrall" style={{ maxHeight: "100px" }}>
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
                                                <td className="cellft">
                                                    <div className="inbx">
                                                        <div className="inbx_default">
                                                            <div className="LUX_basic_text">
                                                                <div className="inpbx">
                                                                    <p className="placeholder">입력해주세요</p>
                                                                    <input type="text" id="textField_text8_01" defaultValue="" />
                                                                    <span className="sp_lux"></span>
                                                                </div>
                                                            </div>
                                                            <button type="button" className="LUX_basic_btn Default basic"><span>삭제</span></button>
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
                                                                    <input type="text" id="btn_search11" />
                                                                    <span className="placeholder">직장 주소</span>
                                                                </span>
                                                                <button type="button" className="btn"><span className="sp_lux">검색</span></button>
                                                            </div>
                                                            <div className="resultbx">
                                                                <div className="result_scrall" style={{ maxHeight: "100px" }}>
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
                                                                    <input type="text" id="textField_text10" defaultValue="" />
                                                                    <span className="sp_lux"></span>
                                                                </div>
                                                            </div>
                                                            <button type="button" className="LUX_basic_btn Default basic"><span>삭제</span></button>
                                                        </div>
                                                        <div className="inbx_full">
                                                            <div className="LUX_basic_text">
                                                                <div className="inpbx">
                                                                    <p className="placeholder">입력해주세요</p>
                                                                    <input type="text" id="textField_text11" defaultValue="" />
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
                                                                    <input type="text" id="btn_search12" />
                                                                    <span className="placeholder">직장 주소</span>
                                                                </span>
                                                                <button type="button" className="btn"><span className="sp_lux">검색</span></button>
                                                            </div>
                                                            <div className="resultbx">
                                                                <div className="result_scrall" style={{ maxHeight: "100px" }}>
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
                                                                    <input type="text" id="textField_text_01" defaultValue="" />
                                                                    <span className="sp_lux"></span>
                                                                </div>
                                                            </div>
                                                            <button type="button" className="LUX_basic_btn Default basic"><span>삭제</span></button>
                                                        </div>
                                                        <div className="inbx_full">
                                                            <div className="LUX_basic_text">
                                                                <div className="inpbx">
                                                                    <p className="placeholder">입력해주세요</p>
                                                                    <input type="text" id="textField_text11_01" defaultValue="" />
                                                                    <span className="sp_lux"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <div className="inbx">
                                                        회사 영문이름
                                            </div>
                                                </th>
                                                <td>
                                                    <div className="inbx">
                                                        <div className="inbx_default">
                                                            <div className="LUX_basic_text">
                                                                <div className="inpbx">
                                                                    <p className="placeholder">입력해주세요</p>
                                                                    <input type="text" id="textField_text_02" defaultValue="" />
                                                                    <span className="sp_lux"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <div className="inbx">
                                                        대표자 영문이름
                                            </div>
                                                </th>
                                                <td>
                                                    <div className="inbx">
                                                        <div className="inbx_default">
                                                            <div className="LUX_basic_text">
                                                                <div className="inpbx">
                                                                    <p className="placeholder">입력해주세요</p>
                                                                    <input type="text" id="textField_text11_02" defaultValue="" />
                                                                    <span className="sp_lux"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <div className="inbx">
                                                        회사 영문이름
                                            </div>
                                                </th>
                                                <td>
                                                    <div className="inbx">
                                                        <div className="inbx_full">
                                                            <div className="LUX_basic_text">
                                                                <div className="inpbx">
                                                                    <p className="placeholder">입력해주세요</p>
                                                                    <input type="text" id="textField_text12" defaultValue="" />
                                                                    <span className="sp_lux"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <div className="inbx">
                                                        홈페이지 주소
                                            </div>
                                                </th>
                                                <td>
                                                    <div className="inbx">
                                                        <div className="inbx_full">
                                                            <div className="LUX_basic_text">
                                                                <div className="inpbx">
                                                                    <p className="placeholder">입력해주세요</p>
                                                                    <input type="text" id="textField_text13" defaultValue="" />
                                                                    <span className="sp_lux"></span>
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

                <Accordion defaultActiveKey="0">
                    <Card>
                        <div className="LUX_basic_tbl open">
                            <div className="tbl_tit">
                                <h2>본지점정보</h2>
                                <div className="btnbx">
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            <button type="button" className="LUX_basic_btn Image btn_arr"><span className="sp_lux">보기/숨기기</span></button>
                                        </Accordion.Toggle>
                                    </Card.Header>
                                </div>
                            </div>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <table className="tblarea2">
                                        <caption><span className="blind"></span></caption>
                                        <colgroup>
                                            <col style={{ width: "150px" }} />
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
                                                        <div className="inbx_default">
                                                            <span className="LUX_basic_switch">
                                                                <span className="LUXrabx">
                                                                    <input type="radio" id="input_tblin_radio1" name="tbl__radio" />
                                                                    <span className="sp_lux"></span>
                                                                    <label htmlFor="input_tblin_radio1">미사용</label>
                                                                </span>
                                                            </span>
                                                            <span className="LUX_basic_switch">
                                                                <span className="LUXrabx">
                                                                    <input type="radio" id="input_tblin_radio2" name="tbl__radio" />
                                                                    <span className="sp_lux"></span>
                                                                    <label htmlFor="input_tblin_radio2">본점</label>
                                                                </span>
                                                            </span>
                                                            <span className="LUX_basic_switch">
                                                                <span className="LUXrabx">
                                                                    <input type="radio" id="input_tblin_radio3" name="tbl__radio" />
                                                                    <span className="sp_lux"></span>
                                                                    <label htmlFor="input_tblin_radio3">본점</label>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <div className="inbx">
                                                        조직도 통합설정
                                            </div>
                                                </th>
                                                <td>
                                                    <div className="inbx">
                                                        <div className="inbx_default">
                                                            <span className="LUX_basic_switch">
                                                                <span className="LUXrabx">
                                                                    <input type="radio" id="input_tblin_radio4" name="tbl_radio" />
                                                                    <span className="sp_lux"></span>
                                                                    <label htmlFor="input_tblin_radio4">통합조직도 제공</label>
                                                                </span>
                                                            </span>
                                                            <span className="LUX_basic_switch">
                                                                <span className="LUXrabx">
                                                                    <input type="radio" id="input_tblin_radio5" name="tbl_radio" />
                                                                    <span className="sp_lux"></span>
                                                                    <label htmlFor="input_tblin_radio5">지점별 조직도 제공</label>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <div className="inbx">
                                                        과세단위
                                            </div>
                                                </th>
                                                <td>
                                                    <div className="inbx">
                                                        <div className="inbx_default">
                                                            <span className="LUX_basic_switch">
                                                                <span className="LUXrabx">
                                                                    <input type="radio" id="input_tblin_radio8" name="tbl___radio" />
                                                                    <span className="sp_lux"></span>
                                                                    <label htmlFor="input_tblin_radio8">미사용</label>
                                                                </span>
                                                            </span>
                                                            <span className="LUX_basic_switch">
                                                                <span className="LUXrabx">
                                                                    <input type="radio" id="input_tblin_radio6" name="tbl___radio" />
                                                                    <span className="sp_lux"></span>
                                                                    <label htmlFor="input_tblin_radio6">총괄납부</label>
                                                                </span>
                                                            </span>
                                                            <span className="LUX_basic_switch">
                                                                <span className="LUXrabx">
                                                                    <input type="radio" id="input_tblin_radio7" name="tbl___radio" />
                                                                    <span className="sp_lux"></span>
                                                                    <label htmlFor="input_tblin_radio7">사업자단위과세</label>
                                                                </span>
                                                            </span>
                                                            <div className="LUX_basic_text">
                                                                <div className="inpbx">
                                                                    <p className="placeholder">종사업장번호를 입력하세요.</p>
                                                                    <input type="text" id="textField_text14" defaultValue="" />
                                                                    <span className="sp_lux"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <div className="inbx">
                                                        조직도 통합설정
                                            </div>
                                                </th>
                                                <td>
                                                    <div className="inbx">
                                                        <div className="inbx_default">
                                                            <div className="LUX_basic_submit">
                                                                <div className="searchbx">
                                                                    <span className="inpbx">
                                                                        <input type="text" id="btn_search" />
                                                                        <span className="placeholder">검색하세요.</span>
                                                                    </span>
                                                                    <button type="button" className="btn"><span className="sp_lux">검색</span></button>
                                                                </div>
                                                                <div className="resultbx">
                                                                    <div className="result_scrall" style={{ maxHeight: "100px" }}>
                                                                        {/* <!-- 스크롤 생성 height 높이값 제어 --> */}
                                                                        <div className="result_scrallin">
                                                                            <ul className="result_lst">
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span></div>
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span> 리스트</div>
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span> 리스트리스트</div>
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span> 리스트리스트</div>
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span> 리스트리스트</div>
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <div><span>검색결과</span> 리스트리스트</div>
                                                                                    </a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="guide_p">지점등록 시 지점연결요청이 접수됩니다.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                    <div className="inbx">
                                                        지점리스트
                                            </div>
                                                </th>
                                                <td>
                                                    <div className="inbx">
                                                        <div className="LUX_basic_tbl">
                                                            <table className="tblarea">
                                                                <caption><span className="blind"></span></caption>
                                                                <colgroup>
                                                                    <col style={{ width: "40px" }} />
                                                                    <col style={{ width: "100px" }} />
                                                                    <col style={{ width: "100px" }} />
                                                                    <col style={{ width: "60px" }} />
                                                                    <col style={{ width: "100px" }} />
                                                                    <col style={{ width: "80px" }} />
                                                                </colgroup>
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col" className="celcnt">
                                                                            <div className="inbx">
                                                                                <button type="button" className="btn btn_data">구분<span className="sp_lux"></span></button>
                                                                            </div>
                                                                        </th>
                                                                        <th scope="col" className="celcnt">
                                                                            <div className="inbx">
                                                                                <button type="button" className="btn btn_data">회사이름<span className="sp_lux"></span></button>
                                                                            </div>
                                                                        </th>
                                                                        <th scope="col" className="celcnt">
                                                                            <div className="inbx">
                                                                                <button type="button" className="btn btn_data">사업자등록번호<span className="sp_lux"></span></button>
                                                                            </div>
                                                                        </th>
                                                                        <th scope="col" className="celcnt">
                                                                            <div className="inbx">
                                                                                <button type="button" className="btn btn_data">관리자이름<span className="sp_lux"></span></button>
                                                                            </div>
                                                                        </th>
                                                                        <th scope="col" className="celcnt">
                                                                            <div className="inbx">
                                                                                <button type="button" className="btn btn_data">관리자전화번호<span className="sp_lux"></span></button>
                                                                            </div>
                                                                        </th>
                                                                        <th scope="col" className="celcnt">
                                                                            <div className="inbx">
                                                                                <button type="button" className="btn btn_data">관리<span className="sp_lux"></span></button>
                                                                            </div>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="celcnt">
                                                                            <div className="inbx">
                                                                                <p className="inbx_value">본점</p>
                                                                            </div>
                                                                        </td>
                                                                        <td className="celrht">
                                                                            <div className="inbx">
                                                                                <p className="inbx_value">더존비즈온</p>
                                                                            </div>
                                                                        </td>
                                                                        <td className="celcnt">
                                                                            <div className="inbx">
                                                                                <p className="inbx_value">123-12-12345</p>
                                                                            </div>
                                                                        </td>
                                                                        <td className="celcnt">
                                                                            <div className="inbx">
                                                                                <p className="inbx_value">김더존</p>
                                                                            </div>
                                                                        </td>
                                                                        <td className="celcnt">
                                                                            <div className="inbx">
                                                                                <p className="inbx_value">010-3333-2313</p>
                                                                            </div>
                                                                        </td>
                                                                        <td className="celcnt">
                                                                            <div className="inbx">
                                                                                <div className="inbx">
                                                                                    <a href="#" className="LUX_basic_btn Default basic"><span>지점해제</span></a>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
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
        </React.Fragment>
    )
}

export default Company_set_detail;