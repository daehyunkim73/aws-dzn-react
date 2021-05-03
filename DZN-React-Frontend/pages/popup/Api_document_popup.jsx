import React from 'react'
import { Button, Table, FormControl } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

/* 서비스 상품관리 API 관련 팝업 ppt 41페이지 구매 API 가져오기 버튼 클릭시 오픈   */

const Api_document_popup = () => {
    return (
        <React.Fragment>
            <div className="smae_popup_bgk_big_box" id="Api_document_popup_bgk">
                <div className="Api_document_Popup_white_box" >
                    <div className="question_uploade_nav_box">
                        <div className="Approved_Popup_text_box">
                            <Table responsive className="api_document_popup_table_box">
                                <tbody>
                                    <tr>
                                        <td className="wall_api_box">Method</td>
                                        <td >
                                            <Form.Control as="select">
                                                <option>GET</option>
                                                <option>POST</option>
                                            </Form.Control>
                                        </td>
                                        <td>Request URL</td>
                                        <td colSpan="2">
                                            <FormControl placeholder="https://datastore.wehago.com/#/datasto" 
                                            aria-label="Text input with checkbox" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="wall_api_box">Header name</td>
                                        <td>
                                            <FormControl aria-label="Text input with checkbox" />
                                        </td>
                                        <td>Header Value</td>
                                        <td colSpan="2">
                                            <FormControl aria-label="Text input with checkbox" />
                                        </td>
                                    </tr>
                                    <tr className="button_table_td_box" >
                                        <td >Response</td>
                                        <td colSpan="4">
                                            <Button>Send</Button>
                                            <FormControl aria-label="Text input with checkbox" />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="table_Question_button_box">
                            <Button>확인</Button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Api_document_popup;