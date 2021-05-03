import React from "react";

const Use_infra_apprvl_table = (props) => {
  const { infra_list } = props;
  return (
    <React.Fragment>
      <tr>
        <td>
          {infra_list.svcinfra_idx === 1
            ? "W_1"
            : infra_list.svcinfra_idx === 2
            ? "W_2"
            : infra_list.svcinfra_idx === 3 && "W_3"}
        </td>
        <td>
          {infra_list.svcinfra_idx === 1
            ? "CPU 2개, MEMORY 2GB, DISK 20GB"
            : infra_list.svcinfra_idx === 2
            ? "CPU 2개, MEMORY 15GB, DISK 18GB"
            : infra_list.svcinfra_idx === 3 &&
              "CPU 4개, MEMORY 32GB, DISK 32GB"}
        </td>
        <td>
          {infra_list.req_dt !== null ? (
            ` ${infra_list.req_dt.substring(
              0,
              10
            )} ${infra_list.req_dt.substring(11, 19)} `
          ) : (
            <></>
          )}
        </td>
        <td>
          {infra_list.use_period !== null ? (
            `${infra_list.use_period}개월`
          ) : (
            <></>
          )}
        </td>
        <td>
          {infra_list.stat === "0"
            ? "승인심사 중"
            : infra_list.stat === "2" && "심사 반려"}
        </td>
      </tr>
    </React.Fragment>
  );
};

export default Use_infra_apprvl_table;
