import React, { useCallback, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Table_Middle from '../../../../func_src/Table_middle';
import view_more from '../../../../image/Center/Dashboard/view_more.png';

const Admin_home_update_table = () => {
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
                    <p className="caption_title">업데이트</p>
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
                        <td className="table_title">로그인 API 업데이트</td>
                        <td>2020.01.13</td>
                    </tr>
                    <tr>
                        <td className="table_title">로그인 API 업데이트</td>
                        <td>2020.01.13</td>
                    </tr>
                    <tr>
                        <td className="table_title">로그인 API 업데이트</td>
                        <td>2020.01.13</td>
                    </tr>
                    <tr>
                        <td className="table_title">로그인 API 업데이트</td>
                        <td>2020.01.13</td>
                    </tr>
                    <tr>
                        <td className="table_title">로그인 API 업데이트</td>
                        <td>2020.01.13</td>
                    </tr>
                </tbody>
            </Table>
        </React.Fragment>
    );
}

export default Admin_home_update_table;
