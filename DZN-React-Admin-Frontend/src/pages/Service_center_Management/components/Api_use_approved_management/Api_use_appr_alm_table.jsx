import React from 'react';
import { Link } from "react-router-dom";

const Api_use_appr_alm_table = (props) => {
    const {
        Api_service_info,
        Api_sercie_idx_info,
        Api_checked_func,
        Api_not_in_api_func,
        Api_checked_ref,
        Api_true_list
    } = props;

    return (
        <React.Fragment>
            <tr key={Api_service_info.svcapi_idx}>
                <td>
                    <span className="table_href">한기업/datapotal</span>
                </td>
                <td className="table_title">
                    {
                        (Api_service_info.svc_stat === 5 || Api_service_info.svc_stat === 6) ?
                            <Link to={`/admin/svcinfo/${Api_service_info.pdsvc_idx}`}>
                                <span className="table_href">{Api_service_info.svc_title}</span>
                            </Link>
                            :
                            <span className="table_href" onClick={Api_not_in_api_func("들어갈 수 없는 API 입니다.")}>
                                {Api_service_info.svc_title}
                            </span>
                    }
                </td>
                <td className="table_title table_line_height">{Api_service_info.wehago_api_name}</td>
                <td>
                    <div className="checkbox_wrap" id="sp_check_box_radio_box">
                        <input
                            type="checkbox"
                            name="data_valid"
                            id={`valid_${Api_service_info.svcapi_idx}`}
                            onChange={Api_checked_func(Api_service_info, Api_sercie_idx_info)}
                            ref={(el) => Api_checked_ref.current[Api_sercie_idx_info] = el}
                        />
                        <label className="checkbox_design" htmlFor={`valid_${Api_service_info.svcapi_idx}`}>
                        </label>
                    </div>
                </td>
                <td>
                    {
                        Api_service_info.svc_stat === 1 ? "제작중" :
                            Api_service_info.svc_stat === 2 ? "심사중" :
                                Api_service_info.svc_stat === 3 ? "승인" :
                                    Api_service_info.svc_stat === 4 ? "심사반려" :
                                        Api_service_info.svc_stat === 5 ? "판매중" :
                                            Api_service_info.svc_stat === 6 && "판매중지"
                    }
                </td>
                <td>
                    {
                        Api_service_info.stat === 0 ? "승인요청" :
                            Api_service_info.stat === 1 ? "승인" :
                                Api_service_info.stat === 2 && "반려"
                    }
                </td>
                <td>{Api_service_info.req_dt}</td>
                <td>{Api_service_info.res_dt}</td>
                <td></td>
            </tr>
        </React.Fragment>
    )
}

export default Api_use_appr_alm_table;