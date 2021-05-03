import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Api_right_sidebar from './Api_right_sidebar';
import Api_search from '../../../image/Dev_Center/API_Document/search.png'

const Api_category = () => {

    return (
        <React.Fragment>
                <div className="page_title_wrap">
                    <p className="page_title">API 문서</p>
                    <div className="page_title_btn">
                        <p>Home</p>
                        <img className="caption_img" src="../image/Center/Dashboard/view_more.png" />
                        <p>API 문서</p>
                        <img className="caption_img" src="../image/Center/Dashboard/view_more.png" />
                        <p>회계</p>
                    </div>
                </div>
                
                <div className="api_cg_content_wrap">
                    <div className='api_search'>
                        <p>WEHAGO API 라이브러리</p>
                        <input type='text' placeholder='API 제목을 입력해주세요.' />
                        <img src={Api_search} alt="search" />
                    </div>
                    
                    <div className='cg_content'>
                    <Api_right_sidebar/>
                        <div className='cg_content_title'>
                            <p>회계관리 API</p>
                        </div>
                        <div className='api_content'>
                            <p>전자세금계산서 API는 기업이나 사업체에 다양한 비용지출에 대하여 전자세금계산서를 쉽게 발행할 수 있게 도와주는 WEHAGO의 대표 시스템입니다.</p>
                            <Table responsive>
                            <thead>
                                <tr>
                                    <th>API</th>
                                    <th>가격/호출 수(기간)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>세금정보 등록 API</td>
                                    <td>10,000원/100,000회(월)</td>
                                </tr>
                                <tr>
                                    <td>세금정보 수정 API</td>
                                    <td>무료</td>
                                </tr>
                                <tr>
                                    <td>전자세금계산서 삭제 API</td>
                                    <td>10,000원/100,000회(월)</td>
                                </tr>
                                <tr>
                                    <td>세금정보 등록 API</td>
                                    <td>10,000원/100,000회(월)</td>
                                </tr>
                                <tr>
                                <td>세금정보 수정 API</td>
                                <td>무료</td>
                                </tr>
                                <tr>
                                <td>전자세금계산서 삭제 API</td>
                                <td>10,000원/100,000회(월)</td>
                                </tr>
                            </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
        </React.Fragment>
    )
}

export default Api_category;