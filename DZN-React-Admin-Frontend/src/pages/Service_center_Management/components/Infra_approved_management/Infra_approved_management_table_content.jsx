import React from "react";
import { Link } from "react-router-dom";

const Infra_approved_management_table_content = ({
  item,
  cnt,
  setSvc_infra_click,
  setSvc_infra_click_logic,
}) => {
  // 판매중, 판매정지가 아닌 서비스는 상세정보로 이동 불가 팝업
  const inaccessible_stat = () => {
    alert("들어갈 수 없는 인프라 서비스입니다.");
  };

  const infraViewPopup = (e, cnt) => {
    const Admin_user_infra_approved_mangUse_popup_bgk = document.getElementById(
      "Admin_user_infra_approved_mangUse_popup_bgk"
    );

    const Admin_user_datacenter_approved_result_popup_bgk = document.getElementById(
      "Admin_user_datacenter_approved_result_popup_bgk"
    );

    if (e.target.value === "0") {
      // 상태가 미승인일때
      Admin_user_infra_approved_mangUse_popup_bgk.style.display = "table";
    } else if (e.target.value === "2") {
      //상태가 반려일때
      Admin_user_datacenter_approved_result_popup_bgk.style.display = "table";
    } else {
      //상태가 승인일때
      return;
    }
    setSvc_infra_click(cnt); // 클릭한 값이 배열에 몇번째인지를 저장
    setSvc_infra_click_logic(true);
  };

  return (
    <React.Fragment>
      <tr key={cnt}>
        <td>
          <span className="table_href">{item.mbr_idx}</span>
        </td>
        <td className="table_title">
          {item.svc_stat === 5 || item.svc_stat === 6 ? (
            <Link to={`/admin/svcinfo/${item.pdsvc_idx}`}>
              <span className="table_href">{item.svc_title}</span>
            </Link>
          ) : (
            <span className="table_href" onClick={inaccessible_stat}>
              {item.svc_title}
            </span>
          )}
        </td>
        <td>
          {item.svc_stat === 1
            ? "제작중"
            : item.svc_stat === 2
            ? "심사중"
            : item.svc_stat === 3
            ? "심사중"
            : item.svc_stat === 4
            ? "심사반려"
            : item.svc_stat === 5
            ? "판매중"
            : "판매중지"}
        </td>
        <td>
          {item.svcinfra_idx === 1
            ? "W_1"
            : item.svcinfra_idx === 2
            ? "W_2"
            : "W_3"}
        </td>
        <td>
          <button
            className="table_view_btn"
            onClick={(e) => {
              infraViewPopup(e, cnt);
            }}
            value={item.stat}
          >
            보기
          </button>
        </td>
        <td>
          {item.stat === "0" ? "미승인" : item.stat === "1" ? "승인" : "반려"}
        </td>
        <td>{item.req_dt}</td>
        <td>{item.res_dt}</td>
        <td></td>
      </tr>
    </React.Fragment>
  );
};

export default Infra_approved_management_table_content;
