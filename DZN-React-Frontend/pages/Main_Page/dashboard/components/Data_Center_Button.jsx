import React from "react";
import { Link } from "react-router-dom";

const DataCenterButton = () => {
  return (
    <React.Fragment>
      <Link to="/datacenter/home">
        <button className="ellipse bt-btn-round">데이터센터 시작하기</button>
      </Link>
    </React.Fragment>
  );
};

export default DataCenterButton;
