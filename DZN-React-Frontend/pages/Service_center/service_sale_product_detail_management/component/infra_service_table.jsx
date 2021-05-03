import React, { useEffect, useState } from "react";
import select_active from "../../../../image/Dev_Center/Api_request_step/select_active.png";
import { useCallback } from "react";
import Infra_service_popup from "../../../popup/Middle/Infra_servcie_popup";

const Infra_service_table = (props) => {
  const { Infra_post } = props;
  const [infra_idx_list, setInfra_idx_list] = useState(null);
  const [infra_idx_post_list, setInfra_idx_post_list] = useState([]);
  const [infra_yn_state, setInfra_yn_state] = useState(false);

  useEffect(() => {
    if (infra_idx_list === props.Infra_post.svcinfra_idx) {
      setInfra_idx_post_list((infra_idx_post_list) => [
        ...infra_idx_post_list,
        props.Infra_post,
      ]);
    }
  }, [infra_idx_list && infra_yn_state]);

  useEffect(() => {
    if (infra_yn_state === false) {
      setInfra_idx_post_list([]);
    }
  }, [infra_yn_state === false || infra_idx_post_list]);

  useEffect(() => {
    if (infra_yn_state === true) {
      const infra_service_popup_bgk = document.getElementById(
        "infra_service_popup_bgk"
      );
      infra_service_popup_bgk.style.display = "table";
      console.log("infra_idx_post_list", infra_idx_post_list);
    }
  }, [
    infra_yn_state && infra_idx_post_list && infra_idx_post_list.svcinfra_idx,
  ]);

  const infra_service_popup_click = useCallback(() => {
    setInfra_yn_state(true);
  }, [infra_yn_state]);

  const Infra_list_post = useCallback(() => {
    setInfra_idx_list(props.Infra_post.svcinfra_idx);
  }, [infra_idx_list]);

  return (
    <React.Fragment>
      {infra_yn_state === true && (
        <Infra_service_popup
          post_infra_idx_post_list={infra_idx_post_list}
          post_infra_yn_state={infra_yn_state}
          post_setInfra_yn_state={setInfra_yn_state}
        />
      )}
      <div
        className="infra_service_using_guide_box_wrap"
        onClick={Infra_list_post}
      >
        <div className="infra_service_using_guide_box">
          <p className="infra_service_title">{Infra_post.infra_name}</p>
          <p className="infra_service_price">{Infra_post.price}</p>
          <div className="infra_service_text_wrap">
            <img src={select_active} alt="check" />
            <p className="infra_service_text_number">{Infra_post.cpu}</p>
            <p className="infra_service_text">CPU</p>
          </div>
          <div className="infra_service_text_wrap">
            <img src={select_active} alt="check" />
            <p className="infra_service_text_number">{Infra_post.mmory}</p>
            <p className="infra_service_text">GB</p>
          </div>
          <div className="infra_service_text_wrap">
            <img src={select_active} alt="check" />
            <p className="infra_service_text_number">{Infra_post.savespace}</p>
            <p className="infra_service_text">GB</p>
          </div>
          <div className="infra_service_using_guide_button">
            <button onClick={infra_service_popup_click}>서비스 신청</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Infra_service_table;
