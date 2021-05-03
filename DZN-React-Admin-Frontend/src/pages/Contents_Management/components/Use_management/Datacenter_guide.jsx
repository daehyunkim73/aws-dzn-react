import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Table_middle from "../../../../../func_src/Table_middle";
import { Link } from "react-router-dom";

const User_info_Table = ({ guideListArray, guideListArrayLogic }) => {
  useEffect(() => {
    Table_middle();
    return () => {
      Table_middle();
    };
  }, []);

  return (
    <React.Fragment>
      <div className="backoffice_table_wrap data_guide_table_wrap">
        <Table responsive id="Using_backoffice_guide_table">
          <caption className="tb_caption">
            <p className="caption_title bold_none">데이터 개발자 센터</p>
          </caption>
          <thead>
            <tr>
              <th>카테고리</th>
              <th>제목</th>
              <th>수정</th>
              <th>최근 수정일</th>
            </tr>
          </thead>
          <tbody>
            {guideListArrayLogic === true &&
              guideListArray.map((item, cnt) => {
                if (item.center_gbn === "D") {
                  return (
                    <tr key={cnt}>
                      <td>{item.cate}</td>
                      <td>
                        <Link
                          className="link_style_text"
                          to={`/admin/usingguide/detail/${item.useguide_mast_idx}`}
                          value={item.useguide_mast_idx}
                        >
                          {item.title}
                        </Link>
                      </td>
                      <td>
                        <Link
                          className="link_style_text"
                          to={`/admin/usingguide/modify/${item.useguide_mast_idx}`}
                          value={item.useguide_mast_idx}
                        >
                          <button className="table_view_btn">수정</button>
                        </Link>
                      </td>
                      <td>{item.uptDt}</td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default User_info_Table;
