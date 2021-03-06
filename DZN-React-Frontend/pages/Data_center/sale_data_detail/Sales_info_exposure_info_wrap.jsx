import React, { useCallback, useState } from "react";
import Exposure_popup from "../../popup/Small_popup/Datacenter_Exposure_popup_v1";
import Exposure_popup_v2 from "../../popup/Small_popup/Datacenter_Exposure_popup_v2";
import Create_data_sc_shot from "./Sales_info_exposure_sc_shot";
import { useEffect } from "react";
import { useSaleInfoContext } from "./data_sale_main";
import { Server_ajax_post } from "../../../server_ajax";

const Sales_info_exposure_info_wrap = (props) => {
  const { pdbase_idx, saleData, setReRend, state, setSalesState } = props;

  const {
    show_gbn,
    setShow_gbn,
    show_dt,
    setShow_dt,
    tel,
    setTel,
  } = useSaleInfoContext();

  const [confirm, setConfirm] = useState(false);

  const Exposure_Click = useCallback(
    (e) => {
      const Data_list_popup_bgk = document.getElementById(
        "Data_Exposure_popup_v1"
      );
      if (show_gbn === "N") {
        Data_list_popup_bgk.style.display = "table";
      }
    },
    [show_gbn]
  );

  const Not_Exposure_Click = useCallback(
    (e) => {
      const Data_list_popup_bgk_V2 = document.getElementById(
        "Data_Exposure_popup_v2"
      );
      if (show_gbn === "Y") {
        Data_list_popup_bgk_V2.style.display = "table";
      }
    },
    [show_gbn]
  );

  useEffect(() => {
    setShow_gbn("N");

    if (saleData[0]) {
      setShow_gbn(saleData[0].show_gbn);
      setShow_dt(saleData[0].show_dt);
      setTel(saleData[0].tel);
    }
  }, []);

  const setSaleInfoShowGbn = useCallback(
    (e) => {
      setShow_gbn(e.currentTarget.value);
    },
    [show_gbn]
  );

  useEffect(() => {
    if (confirm) {
      const sales_stat = show_gbn === "Y" ? "5" : "6";

      const parmas = {
        pdbase_idx: pdbase_idx,
        sales_stat: sales_stat,
        show_gbn: show_gbn,
      };

      const stateUpdate = async () => {
        try {
          const axios_host = await Server_ajax_post(
            `datacenter/updateDataSaleInfo`,
            parmas
          );
          if (axios_host && axios_host.affectedRows > 0) {
            setConfirm(false);
            setSalesState(sales_stat);
          }
        } catch (e) {
          return console.error(e);
        }
      };
      stateUpdate();
    }
  }, [confirm]);

  const onChangeTel = useCallback(
    (e) => {
      setTel(e.target.value);
    },
    [tel]
  );

  return (
    <React.Fragment>
      <Exposure_popup
        show_gbn={show_gbn}
        setShow_gbn={setShow_gbn}
        setConfirm={setConfirm}
        gbn="show"
      />{" "}
      {/* ??????????????? ??? ?????? ????????????????????? ???????????? */}
      <Exposure_popup_v2
        show_gbn={show_gbn}
        setShow_gbn={setShow_gbn}
        setConfirm={setConfirm}
        gbn="notShow"
      />
      {/* ?????? ?????? ????????? ?????? ????????? ????????? ???????????? ?????? ??????????????? ?????? ????????? ?????? ??? */}
      <div className="Sales_info_exposure_info_wrap clearfix">
        <div className="Sales_info_exposure_info_first_wrap">
          <div>
            <p>
              ????????????????????? ??????<span className="red"> *</span>
            </p>
          </div>
          <div>
            <p>
              ??????/?????? ?????????<span className="red"> *</span>
            </p>
          </div>
          <div>
            <p>
              ????????????<span className="red"> *</span>
            </p>
          </div>
        </div>
        <div className="Sales_info_exposure_info_second_wrap">
          <div className="checkbox_radio_double_wrap">
            <div className="checkbox_radio_wrap">
              <input
                type="radio"
                name="data_radio_check"
                id="Sales_info_radio_check"
                value="Y"
                checked={show_gbn === "Y"}
                onChange={setSaleInfoShowGbn}
              />
              <label
                className="checkbox_design"
                htmlFor="Sales_info_radio_check"
                onClick={Exposure_Click}
              >
                ?????????
              </label>
            </div>

            <div className="checkbox_radio_wrap">
              <input
                type="radio"
                name="data_radio_check"
                id="Sales_info_radio_none_check"
                value="N"
                checked={show_gbn === "N"}
                onChange={setSaleInfoShowGbn}
              />
              <label
                className="checkbox_design"
                htmlFor="Sales_info_radio_none_check"
                onClick={Not_Exposure_Click}
              >
                ????????????
              </label>
            </div>
            <div className="Sales_info_exposure_info_second_notice">
              <span>
                ??? ?????? ??????(??????)????????? ????????? ??????, ??????????????? ????????? ?????????
                ??????????????? ???????????? ?????????.
              </span>
            </div>
          </div>
          <div className="Sales_info_Contact_wrap">
            <input
              placeholder="??????????????? ???????????????."
              type="text"
              className="form_input form-control"
              value={tel}
              onChange={onChangeTel}
            />
          </div>
          <div className="Sales_info_exposure_info_second_notice_wrap">
            <div className="Sales_info_exposure_info_second_notice">
              <p>
                ??? ??????(??????) ?????????: 500px * 300px / 1MB ?????? / ????????? ??????
                ????????? HD
              </p>
              <p>
                ??? ???????????? ???????????? ?????? 5????????? ???????????????. (?????? 3??? ??????)
              </p>
            </div>
          </div>

          <Create_data_sc_shot saleData={saleData} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sales_info_exposure_info_wrap;
