import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Table_middle from '../../../../../func_src/Table_middle';

const Comp_info_Table = () => {
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
                        <p className="caption_title">회사정보</p>
                    </caption>
                    <tbody>
                        <tr>
                            <th>회사 이름</th>
                            <td >중소기업빅데이터플랫폼</td>
                        </tr>
                        <tr>
                            <th>사업자등록번호</th>
                            <td >456-78-415678</td>
                        </tr>
                        <tr>
                            <th>종사업장번호</th>
                            <td >-</td>
                        </tr>
                        <tr>
                            <th>사업자구분</th>
                            <td >법인</td>
                        </tr>
                        <tr>
                            <th>법인등록번호</th>
                            <td >-</td>
                        </tr>
                        <tr>
                            <th>대표자 이름</th>
                            <td >한기업</td>
                        </tr>
                        <tr>
                            <th>업종코드</th>
                            <td >724000</td>
                        </tr>
                        <tr>
                            <th>업태</th>
                            <td >정보통신업</td>
                        </tr>
                        <tr>
                            <th>업종</th>
                            <td >데이터베이스 및 온라인 정보 제공업</td>
                        </tr>
                        <tr>
                            <th>회사전화번호</th>
                            <td >02-0000-0000</td>
                        </tr>
                        <tr>
                            <th>정산일 지정</th>
                            <td ><input type='text' /></td>
                        </tr>
                        <tr>
                            <th>정산 조건</th>
                            <td ><input type='text' /></td>
                        </tr>
                        <tr>
                            <th>정산 등록 계좌</th>
                            <td ><div className="account_number">국민 200345-89-234567</div><p className="file_upload">기업통장계좌.png</p> </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </React.Fragment>
    );
}

export default Comp_info_Table;
