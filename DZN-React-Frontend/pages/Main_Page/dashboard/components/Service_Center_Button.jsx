import React from "react";
import { Link } from "react-router-dom";

const ServiceCenterButton = () => {
  return (
    <React.Fragment>
      <Link to="/svccenter/home">
        <button className="ellipse bt-btn-round">서비스센터 시작하기</button>
      </Link>
    </React.Fragment>
  );
};

export default ServiceCenterButton;
