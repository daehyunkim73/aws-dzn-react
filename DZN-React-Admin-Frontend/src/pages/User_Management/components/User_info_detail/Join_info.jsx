import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Table_middle from '../../../../../func_src/Table_middle';

const Join_info_Table = () => {
    useEffect(() => {
        Table_middle();
        return () => {
            Table_middle();
        }
    }, []);

    return (
        <React.Fragment>
            <div className="backoffice_table_wrap join_info_table_wrap">
                <Table responsive>
                    <caption className="tb_caption">
                        <p className="caption_title">회원가입정보</p>
                    </caption>
                    <tbody>
                        <tr>
                            <th>회원 유형</th>
                            <td>
                                기업회원
                            </td>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <td>한기업</td>
                        </tr>
                        <tr>
                            <th>아이디</th>
                            <td>datapotal</td>
                        </tr>
                        <tr>
                            <th>WEHAGO 이메일 주소</th>
                            <td>datapotal@wehago.com</td>
                        </tr>
                        <tr>
                            <th>기본 이메일 주소</th>
                            <td>datapotal@wehago.com</td>
                        </tr>
                        <tr>
                            <th>보조 이메일 주소</th>
                            <td>datapotal@wehago.com</td>
                        </tr>
                        <tr>
                            <th>휴대전화번호</th>
                            <td>010-1234-5678</td>
                        </tr>
                        <tr>
                            <th>가입일</th>
                            <td>2018-07-11 13:23:11</td>
                        </tr>
                        <tr>
                            <th>최근 접속일</th>
                            <td>2020-03-18 12:54:15</td>
                        </tr>
                        <tr>
                            <th>알림 설정</th>
                            <td>한기업</td>
                        </tr>
                        <tr>
                            <th>메모</th>
                            <td><textarea></textarea></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </React.Fragment>
    );
}

export default Join_info_Table;
