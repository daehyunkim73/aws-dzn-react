import React, { useEffect } from "react";
import Datacenter_guide from "./components/Use_management/Datacenter_guide";
import Servicecenter_guide from "./components/Use_management/Servicecenter_guide";
import { guideListAxios } from "../../../func_src/guideAxios";
import { useState } from "react";
const Using_guide_list = () => {
  const [guideListArray, setGuideListArray] = useState();
  const [guideListArrayLogic, setGuideListArrayLogic] = useState(false);
  useEffect(() => {
    guideListAxios(setGuideListArray, setGuideListArrayLogic);
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (guideListArrayLogic === true) {
      console.log(guideListArray);
    }
  }, [guideListArrayLogic]);
  return (
    <React.Fragment>
      <div className="using_guide_wrap">
        <div className="Page_same_text clearfix">
          <p className="backoffice_title">이용 가이드</p>
        </div>
        <div className="data_guide_wrap">
          <Datacenter_guide
            guideListArray={guideListArray}
            guideListArrayLogic={guideListArrayLogic}
          />
        </div>
        <div className="service_guide_wrap">
          <Servicecenter_guide
            guideListArray={guideListArray}
            guideListArrayLogic={guideListArrayLogic}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
export default Using_guide_list;