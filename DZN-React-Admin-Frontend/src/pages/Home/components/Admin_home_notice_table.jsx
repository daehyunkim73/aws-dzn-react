import React, { useCallback, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Table_Middle from '../../../../func_src/Table_middle';
import view_more from '../../../../image/Center/Dashboard/view_more.png';

const Admin_home_notice_table = () => {
    useEffect(() => {
        Table_Middle();
        return () => {
            Table_Middle();
        }
    }, []);

    return (
        <React.Fragment>
            <Table responsive>
                <caption className="tb_caption">
                    <p className="caption_title">공지사항</p>
                    <div className="caption_btn"><p>더보기</p>
                     <img className="caption_img" src={view_more} />
                </div>
                </caption>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>날짜</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="table_title">[운영] 더존 데이터 개발자 센터 오픈 안내를 드립니다.</td>
                        <td>2020.01.13</td>
                    </tr>
                    <tr>
                        <td className="table_title">[긴급] 개발자 센터 API 이용 필독 사항 안내</td>
                        <td>2020.01.13</td>
                    </tr>
                    <tr>
                        <td className="table_title">[일반] 개발자 센터 개소식 안내</td>
                        <td>2020.01.13</td>
                    </tr>
                    <tr>
                        <td className="table_title">[긴급] 데이터유통마켓과 연계 관련</td>
                        <td>2020.01.13</td>
                    </tr>
                    <tr>
                        <td className="table_title">[운영] WISE 정기점검 안내</td>
                        <td>2020.01.13</td>
                    </tr>
                </tbody>
            </Table>
        </React.Fragment>
    );
}

export default Admin_home_notice_table;
