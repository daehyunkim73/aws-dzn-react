import React from "react";

const Use_api_apprvl_table = (props) => {
  const { Table_api_list, cate_list } = props;

  return (
    <React.Fragment>
      {
        Table_api_list.stat === 0 &&
        <tr>
          {
            cate_list && cate_list.map((c) => {
              return (
                <>
                  {
                    c.wehago_cate_idx === Table_api_list.main_cate_code &&
                    < td >{c.main_cate_name} {">"} {c.sub_cate_name}</td>
                  }
                </>
              )
            })
          }
          <td>{Table_api_list.wehago_api_name}</td>
          <td>일별호출제한</td>
          <td>{
            Table_api_list.stat === 0 ? '심사중' : Table_api_list.stat === 2 && '반려중'
          }</td>
        </tr>
      }

    </React.Fragment >
  );
};

export default Use_api_apprvl_table;
