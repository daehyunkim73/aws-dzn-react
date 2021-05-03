import React, { useState } from "react";
import CommonDataManagementJudgeSubmit from "./common_data_management_judge_submit";
import CommonDataManagementJudgeTable from "./common_data_management_judge_table";
import { Link } from "react-router-dom";

const Data_Approved_management_judge = ({defaultData, state, setState}) => {
    const {pdbase_idx,  mbr_id} = defaultData;
    const [rending, setRending] = useState(false);
    
    return (
        <React.Fragment>      
        {/* 데이터 센터의 기본정보에 기본정보, 판매정보의 필수 항목을 모두 입력하여야 승인심사로 이동 */}
        <div className="judge_table_top">
            {state === '2' && <CommonDataManagementJudgeSubmit pdbaseIdx={pdbase_idx} setRending={setRending} setState={setState} mbr_id={mbr_id} />}
        </div>
        <div className="judge_table_bottom">
            <CommonDataManagementJudgeTable pdbaseIdx={pdbase_idx} rending={rending} />

            <div className="judge_table_bottom_btn judge_table_btn">
            <Link to="/admin/dataapproval">
                <button>목록</button>
            </Link>
            </div>
        </div>
        </React.Fragment>
    );
};

export default Data_Approved_management_judge;
