import React, { useState, useCallback, useEffect } from "react";
import globals from "../../../lib/globals";
import { usesettingContext2 } from "./Authority_setting_detail_two";
import { usesettingContext } from "./Authority_setting";
import Tree from "./Tree";
const subTree = ({ subData, idx }) => {
  const { crueInfo } = usesettingContext();
  const { setCrueList, boldSelect, setBoldSelect } = usesettingContext2();
  const [subChildrenData, setSubChildernData] = useState([]);
  const [subTreeClassify, setSubTreeClassify] = useState("");
  const [subChildLogic, setSubChildLogic] = useState(false);
  const [subTreeIsSelect, setSubTreeIsSelect] = useState(false);
  const subTreeTrigger = useCallback(
    (o, c) => {
      setCrueList([]);
      setSubChildernData([]);
      setBoldSelect("");
      setSubChildLogic(false);
      setSubTreeClassify("");
      let organiz_no = o;
      setSubTreeClassify(o);
      setBoldSelect(o);
      crueInfo
        .filter((x) => {
          return x.organization_no === organiz_no;
        })
        .map((c) => {
          setCrueList((crueList) => [...crueList, c]);
        });
      setSubTreeIsSelect(!subTreeIsSelect);
      setSubChildernData(c);
      setSubChildLogic(true);
    },
    [
      setCrueList,
      setSubChildernData,
      setBoldSelect,
      setSubChildLogic,
      setSubTreeClassify,
      crueInfo,
      setCrueList,
      setSubTreeIsSelect,
      subTreeIsSelect,
    ]
  );
  return (
    <React.Fragment>
      <div
        className={
          subData.organization_no === boldSelect
            ? "treebx treebx_select"
            : "treebx"
        }
        onClick={() => {
          subTreeTrigger(subData.organization_no, subData.children);
        }}
      >
        <div
          className={`treein treein_depth${subData.organization_level}`}
          key={idx}
        >
          <span className="sp_lux"></span>
          <span className="txt">
            <span className="num">{subData.employee_count}</span>
            {subData.organization_name}
          </span>
        </div>
      </div>
      {subData.organization_no === subTreeClassify &&
        subTreeIsSelect &&
        subChildLogic &&
        subChildrenData !== undefined &&
        subChildrenData.map((data, idx) => <Tree data={data} key={idx} />)}
    </React.Fragment>
  );
};

export default subTree;
