import React, { useState, useCallback, useEffect } from "react";
import { usesettingContext2 } from "./Authority_setting_detail_two";
import { usesettingContext } from "./Authority_setting";
import SubTree from "./subTree";
const Tree = ({ data, idx }) => {
  const { crueInfo } = usesettingContext();
  const { setCrueList, boldSelect, setBoldSelect } = usesettingContext2();
  const [treeClassify, setTreeClassify] = useState("");
  const [childrenData, setChildernData] = useState([]);
  const [childLogic, setChildLogic] = useState(false);
  const [treeIsSelect, setTreeIsSelect] = useState(false);

  const treeTrigger = useCallback(
    (o, c) => {
      setChildLogic(false);
      setBoldSelect("");
      setCrueList([]);

      setChildernData([]);
      setTreeClassify("");
      let organiz_no = o;
      setTreeClassify(o);
      setBoldSelect(o);
      crueInfo
        .filter((x) => {
          return x.organization_no === organiz_no;
        })
        .map((c) => {
          setCrueList((crueList) => [...crueList, c]);
        });
      setTreeIsSelect(!treeIsSelect);
      setChildernData(c);
      setChildLogic(true);
    },
    [
      setChildLogic,
      setBoldSelect,
      setChildernData,
      setTreeClassify,
      crueInfo,
      setTreeIsSelect,
      setCrueList,
      treeIsSelect,
    ]
  );

  return (
    <React.Fragment>
      <div
        className={
          boldSelect === data.organization_no
            ? "treebx treebx_select"
            : "treebx"
        }
        onClick={() => {
          treeTrigger(data.organization_no, data.children);
        }}
      >
        <div
          className={`treein treein_depth${data.organization_level}`}
          key={idx}
        >
          <span className="sp_lux"></span>
          <span className="txt">
            <span className="num">{data.employee_count}</span>
            {data.organization_name}
          </span>
        </div>
      </div>
      {data.organization_no === treeClassify &&
        treeIsSelect &&
        childLogic &&
        childrenData !== undefined &&
        childrenData.map((subData, idx) => (
          <SubTree subData={subData} key={idx} />
        ))}
    </React.Fragment>
  );
};

export default Tree;
