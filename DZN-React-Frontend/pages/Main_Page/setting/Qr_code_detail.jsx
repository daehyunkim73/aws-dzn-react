import React from 'react';

const Qr_code_detail = () => {
    const Qr_code_app_Click = () => {
        const Qr_code_popup = document.getElementById("qr_code_popup");
        Qr_code_popup.style.display="table";
    }
    
    return (
        <React.Fragment>
            <div className="ua_container">
						{/* <!-- QR코드인증 사용 설정 --> */}
						<div className="LUX_basic_tbl tbl_ver2">
							<div className="tbl_tit">
								<h2>QR코드인증 사용 설정</h2>
							</div>
							<table className="tblarea2">
								<caption><span className="blind"></span></caption>
								<colgroup>
									<col style={{width:"150px"}} />
									<col />
								</colgroup>
                                <tbody>
								<tr>
									<th scope="row" rowSpan="2" className="cellft celvat">
										<div className="inbx">
											사용설정
										</div>
									</th>
									<td className="cellft">
										<div className="inbx">
											<span className="LUX_basic_switch">
												<span className="LUXonoffbx">
													{/* <!-- 동일한 구조 input type checkbox LUXckbx LUXstarbx / radio LUXrabx LUXonoffbx 로 이이지 변경 --> */}
													<input type="checkbox" id="input_forid_onoff14" />
													{/* <!-- 이미지 --> */}
													<span className="sp_lux"></span>
													{/* <!-- input id 값과 label htmlFor 값을 동일하게 연결 --> */}
													<label htmlFor="input_forid_onoff14">온오프박스</label>
												</span>
											</span>
											<button type="button" className="LUX_basic_btn Default basic"><span>인증기기 변경</span></button>
											<p className="mes_qr">
												<strong>
                                                    QR코드 인증이란?
                                                    {/* <a href="#" className="sp_lux">QR코드 인증 도움말</a> */}
                                                </strong>
												<span>1차 로그인 단계 이후 2차 사용자 고유의 식별 2D바코드 인식을 통해 강력한 인증을 수행할 수 있습니다.</span>
											</p>
										</div>
									</td>
								</tr>
								<tr>
									<td className="cellft">
										<div className="inbx">
                                        <div className="info1 qr_title_info">
                                            <p><span className="point_color">WEHAGO</span>앱으로 QR코드를 스캔하시면 인증 시 사용할 기기로 등록됩니다.</p>
                                        </div>
											<div className="qr">
												<span>
													<img src="https://static.wehago.com/imgs/dummy/@qrcode.jpg" alt="qr코드이미지" />
												</span>
												<span>남은시간 02:59</span>
											</div>
											<div className="qr_info">
												<div className="info1">
													
													<ul className="guide_lst">
                                                        <li>WEHAGO앱 &gt; Smart Key 메뉴로 QR코드를 스캔하면 인증기기로 등록됩니다.</li>
														<li>반드시 본인 모바일로 등록해주시기 바랍니다.</li>
														<li>1인당 1개의 기기만 등록 할 수 있습니다.</li>
													</ul>
												</div>
                                                <button type="button" className="LUX_basic_btn Default basic" onClick={Qr_code_app_Click}><span>모바일 앱 내 폰에 설치</span></button>
                                                
                                                {/* <!--
												<div className="info2">
													<p>더존 Smart Key APP</p>
													<button type="button" className="LUX_basic_btn btn_store1"><span className="sp_ua">Google play</span></button>
													<button type="button" className="LUX_basic_btn btn_store2"><span className="sp_ua">Apple Store</span></button>
												</div>
                                                --> */}
											</div>
										</div>
									</td>
								</tr>
								</tbody>
							</table>
						</div>
						{/* <!-- QR코드인증 사용 설정 --> */}
						<div className="tbl_qr">
                            <div className="fltlft">
                                <div className="LUX_basic_tbl">
                                    <div className="tbl_tit">
                                        <h2>접속허용위치 설정</h2>
                                    </div>
                                    <table className="tblarea">
                                        <caption><span className="blind"></span></caption>
                                        <colgroup>
                                            <col />
                                        </colgroup>
                                        <thead>
                                        <tr>
                                            <th scope="col" className="celcnt">
                                                <div className="inbx">
                                                    <div className="LUX_basic_submit" style={{float:"left",width:"100%"}}>
                                                        <div className="searchbx">
                                                            <span className="inpbx">
                                                                <input type="text" id="btn_search"/>
                                                                <span className="placeholder">검색하세요.</span>
                                                            </span>
                                                            <button type="button" className="btn"><span className="sp_lux">검색</span></button>
                                                        </div>
                                                        <div className="resultbx">
                                                            <div className="result_scrall" style={{maxHeight:"100px"}}>
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
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="celrgt">
                                                <div className="inbx">
                                                    <span className="map"></span>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="fltrgt">
                                <div className="LUX_basic_tbl">
                                    <div className="tbl_tit">
                                        <div className="btnbx">
                                             <a href="#" className="LUX_basic_btn Default basic"><span>초기화</span></a>
                                        </div>
                                    </div>
                                    <table className="tblarea">
                                        <caption><span className="blind"></span></caption>
                                        <colgroup>
                                            <col style={{width:"63px"}} />
                                            <col/>
                                            <col style={{width:"150px"}}/>
                                            <col style={{width:"150px"}}/>
                                        </colgroup>
                                        <thead>
                                        <tr>
                                            <th scope="col" className="celcnt">
                                                <div className="inbx">
                                                    <span className="sp_ua" style={{width:"16px", height: "23px",backgroundPosition: "-270px -180px"}}></span>
                                                </div>
                                            </th>
                                            <th scope="col" className="celcnt">
                                                <div className="inbx">
                                                    위치
                                                </div>
                                            </th>
                                            <th scope="col" className="celcnt">
                                                <div className="inbx">
                                                    위도/경도
                                                </div>
                                            </th>
                                            <th scope="col" className="celcnt">
                                                <div className="inbx">
                                                    반경(km)
                                                </div>
                                            </th>
                                        </tr>
                                        </thead>
                                    </table>
                                    <div className="tbl_scrall" style={{maxHeight:"339px"}}>
                                        <div className="tbl_scrall_in">
                                             <table className="tblarea">
                                                 <colgroup>
                                                    <col style={{width:"63px"}} />
                                                    <col />
                                                    <col style={{width:"140px"}}/>
                                                    <col style={{width:"140px"}}/>
                                                </colgroup>
                                                <tbody>
                                                {/* <!--
                                                <tr>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            <span className="pass circle_bg1"></span>
                                                        </div>
                                                    </td>
                                                    <td className="cellft">
                                                        <div className="inbx">
                                                            <div className="tableform">
                                                                <div className="LUX_basic_text">
                                                                    <div className="inpbx">
                                                                        <p className="placeholder">입력해주세요</p>
                                                                        <input type="text" id="textField_text3" defaultValue=""/>
                                                                        <span className="sp_lux"></span>
                                                                    </div>
                                                                </div>
                                                                <div className="btn_group">
                                                                    <button type="button" className="LUX_basic_btn Default basic"><span>저장</span></button>
                                                                    <button type="button" className="LUX_basic_btn Default basic"><span>취소</span></button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            34.3456/123.4563
                                                        </div>
                                                    </td>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            <div className="km">
                                                                <div className="LUX_basic_text">
                                                                    <div className="inpbx">
                                                                        <p className="placeholder"></p>
                                                                        <input type="text" id="textField_text4" defaultValue=""/>
                                                                        <span className="sp_lux"></span>
                                                                    </div>
                                                                </div>
                                                                <button type="button" className="LUX_basic_btn Default basic"><span>삭제</span></button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            <span className="pass circle_bg2"></span>
                                                        </div>
                                                    </td>
                                                    <td className="cellft">
                                                        <div className="inbx">
                                                            <div className="tableform">
                                                                <span className="loca_result">집</span>
                                                                <div className="btn_group">
                                                                    <button type="button" className="LUX_basic_btn Default basic"><span>변경</span></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            34.3456/123.4563
                                                        </div>
                                                    </td>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            <div className="km">
                                                                <span className="km_result">집</span>
                                                                <button type="button" className="LUX_basic_btn Default basic"><span>삭제</span></button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            <span className="pass circle_bg3"></span>
                                                        </div>
                                                    </td>
                                                    <td className="cellft">
                                                        <div className="inbx">
                                                            <div className="tableform">
                                                                <span className="loca_result">집</span>
                                                                <div className="btn_group">
                                                                    <button type="button" className="LUX_basic_btn Default basic"><span>변경</span></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            34.3456/123.4563
                                                        </div>
                                                    </td>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            <div className="km">
                                                                <span className="km_result">집</span>
                                                                <button type="button" className="LUX_basic_btn Default basic"><span>삭제</span></button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            <span className="pass circle_bg4"></span>
                                                        </div>
                                                    </td>
                                                    <td className="cellft">
                                                        <div className="inbx">
                                                            <div className="tableform">
                                                                <span className="loca_result">집</span>
                                                                <div className="btn_group">
                                                                    <button type="button" className="LUX_basic_btn Default basic"><span>변경</span></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            34.3456/123.4563
                                                        </div>
                                                    </td>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            <div className="km">
                                                                <span className="km_result">집</span>
                                                                <button type="button" className="LUX_basic_btn Default basic"><span>삭제</span></button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            <span className="pass circle_bg5"></span>
                                                        </div>
                                                    </td>
                                                    <td className="cellft">
                                                        <div className="inbx">
                                                            <div className="tableform">
                                                                <span className="loca_result">집</span>
                                                                <div className="btn_group">
                                                                    <button type="button" className="LUX_basic_btn Default basic"><span>변경</span></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            34.3456/123.4563
                                                        </div>
                                                    </td>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            <div className="km">
                                                                <span className="km_result">집</span>
                                                                <button type="button" className="LUX_basic_btn Default basic"><span>삭제</span></button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            <span className="pass circle_bg6"></span>
                                                        </div>
                                                    </td>
                                                    <td className="cellft">
                                                        <div className="inbx">
                                                            <div className="tableform">
                                                                <span className="loca_result">집</span>
                                                                <div className="btn_group">
                                                                    <button type="button" className="LUX_basic_btn Default basic"><span>변경</span></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            34.3456/123.4563
                                                        </div>
                                                    </td>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            <div className="km">
                                                                <span className="km_result">집</span>
                                                                <button type="button" className="LUX_basic_btn Default basic"><span>삭제</span></button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            <span className="pass circle_bg7"></span>
                                                        </div>
                                                    </td>
                                                    <td className="cellft">
                                                        <div className="inbx">
                                                            <div className="tableform">
                                                                <span className="loca_result">집</span>
                                                                <div className="btn_group">
                                                                    <button type="button" className="LUX_basic_btn Default basic"><span>변경</span></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            34.3456/123.4563
                                                        </div>
                                                    </td>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            <div className="km">
                                                                <span className="km_result">집</span>
                                                                <button type="button" className="LUX_basic_btn Default basic"><span>삭제</span></button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            <span className="pass circle_bg8"></span>
                                                        </div>
                                                    </td>
                                                    <td className="cellft">
                                                        <div className="inbx">
                                                            <div className="tableform">
                                                                <span className="loca_result">집</span>
                                                                <div className="btn_group">
                                                                    <button type="button" className="LUX_basic_btn Default basic"><span>변경</span></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            34.3456/123.4563
                                                        </div>
                                                    </td>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            <div className="km">
                                                                <span className="km_result">집</span>
                                                                <button type="button" className="LUX_basic_btn Default basic"><span>삭제</span></button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            <span className="pass circle_bg9"></span>
                                                        </div>
                                                    </td>
                                                    <td className="cellft">
                                                        <div className="inbx">
                                                            <div className="tableform">
                                                                <span className="loca_result">집</span>
                                                                <div className="btn_group">
                                                                    <button type="button" className="LUX_basic_btn Default basic"><span>변경</span></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            34.3456/123.4563
                                                        </div>
                                                    </td>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            <div className="km">
                                                                <span className="km_result">집</span>
                                                                <button type="button" className="LUX_basic_btn Default basic"><span>삭제</span></button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            <span className="pass circle_bg10"></span>
                                                        </div>
                                                    </td>
                                                    <td className="cellft">
                                                        <div className="inbx">
                                                            <div className="tableform">
                                                                <span className="loca_result">집</span>
                                                                <div className="btn_group">
                                                                    <button type="button" className="LUX_basic_btn Default basic"><span>변경</span></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            34.3456/123.4563
                                                        </div>
                                                    </td>
                                                    <td className="celcnt">
                                                        <div className="inbx">
                                                            <div className="km">
                                                                <span className="km_result">집</span>
                                                                <button type="button" className="LUX_basic_btn Default basic"><span>삭제</span></button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                --> */}

                                                {/* <!-- [D] Emptyset --> */}
                                                <tr>
                                                    <td colSpan="4">
                                                        <div className="nodata_area qr_empty">
                                                            <span className="nodata_text">데이터가 없습니다.</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
					</div>
        </React.Fragment>
    )
}

export default Qr_code_detail;