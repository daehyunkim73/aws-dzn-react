import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Table_middle from '../../../../../func_src/Table_middle';

const Date_sale_Table = () => {
    useEffect(() => {
        Table_middle();
        return () => {
            Table_middle();
        }
    }, []);

    return (
        <React.Fragment>
            <div className="backoffice_table_wrap User_info_table_wrap">
                <Table responsive>
                    <caption className="tb_caption">
                        <p className="caption_title bold_none">[총 <span className="number_data">00</span>건 ]</p>
                    </caption>
                    <thead>
                        <tr>
                            <th>카테고리</th>
                            <th>서비스 제목</th>
                            <th>상세정보</th>
                            <th>요금제</th>
                            <th>판매 개시일</th>
                            <th>최종 수정일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>회계</td>
                            <td>세금아 안녕</td>
                            <td><button className='table_view_btn'>관리</button></td>
                            <td>일별 호출횟수 제한</td>
                            <td>2020-02-02 15:39:05</td>
                            <td>2020-02-02 15:39:05</td>
                        </tr>
                        <tr>
                            <td>문서</td>
                            <td>전표야 나와라</td>
                            <td><button className='table_view_btn'>관리</button></td>
                            <td>일별 호출횟수 제한</td>
                            <td>2020-02-02 15:39:05</td>
                            <td>2020-02-02 15:39:05</td>
                        </tr>
                        <tr>
                            <td>통계</td>
                            <td>쉽게 알아보는 통계 분석</td>
                            <td><button className='table_view_btn'>관리</button></td>
                            <td>일별 호출횟수 제한</td>
                            <td>2020-02-02 15:39:05</td>
                            <td>2020-02-02 15:39:05</td>
                        </tr>
                        <tr>
                            <td>업무</td>
                            <td>거래처 관리</td>
                            <td><button className='table_view_btn'>관리</button></td>
                            <td>무료</td>
                            <td>2020-02-02 15:39:05</td>
                            <td>2020-02-02 15:39:05</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </React.Fragment>
    );
}

export default Date_sale_Table;
