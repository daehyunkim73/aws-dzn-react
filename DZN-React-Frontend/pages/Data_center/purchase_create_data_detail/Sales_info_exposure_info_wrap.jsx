import React, { useCallback, useState } from "react";
import Exposure_popup from "../../popup/Small_popup/Datacenter_Exposure_popup_v1";
import Exposure_popup_v2 from "../../popup/Small_popup/Datacenter_Exposure_popup_v2";
import Create_data_sc_shot from "./create_data_sc_shot";
import { useEffect } from "react";
import { useSaleInfoContext } from "./data_sale_main";
import { useHistory } from "react-router";
import { Server_ajax_post } from "../../../server_ajax";

const Sales_info_exposure_info_wrap = (props) => {
  const { pdbase_idx, saleData, setReRend, state } = props;
  const history = useHistory();

  const {
    show_gbn,
    setShow_gbn,
    show_dt,
    setShow_dt,
    tel,
    setTel,
  } = useSaleInfoContext();

  /*
  const [show_gbn, setShow_gbn] = useState('');
  const [show_dt, setShow_dt] = useState('');
  const [tel, setTel] = useState('');*/

  const [confirm, setConfirm] = useState(false);

  const Exposure_Click = useCallback(
    (e) => {
      const Data_list_popup_bgk = document.getElementById(
        "Data_Exposure_popup_v1"
      );
      
      if (show_gbn === "N" && state === "3") {
        Data_list_popup_bgk.style.display = "table";
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
      if (state === "3") {
        setShow_gbn(e.currentTarget.value);
      } else {
        alert("승인이 완료된 후 선택이 가능합니다.");
        // return;
      }
    },
    [show_gbn]
  );
  
  useEffect(() => {
    if (confirm) {
      const parmas = {
        pdbase_idx,
        sales_stat: 5,
        show_gbn: "Y",
      }
      const getData = async () => {
        try {
          await Server_ajax_post(`datacenter/updateDataSaleInfo`, parmas);
          history.push("/datacenter/saledata");
          setConfirm(false);
        } catch (e) {
          return console.error(e);
        }
      };
      getData();
    }
  }, [confirm === true]);

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
      {/* 승인완료가 된 경우 판매노출함으로 변경가능 */}
      {/* 노출 안함 설정시 판매 중지됨 판매중 재승인의 경우 승인완료시 해당 내용이 적용 됨 */}
      <div className="Sales_info_exposure_info_wrap clearfix">
        <div className="Sales_info_exposure_info_first_wrap">
          <div>
            <p>
              데이터유통포털 노출<span className="red"> *</span>
            </p>
          </div>
          <div>
            <p>
              문의/안내 연락처<span className="red"> *</span>
            </p>
          </div>
          <div>
            <p>
              스크린샷<span className="red"> *</span>
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
                checked={show_gbn === "Y" && state === "3"}
                onChange={setSaleInfoShowGbn}
              />
              <label
                className="checkbox_design"
                htmlFor="Sales_info_radio_check"
                onClick={Exposure_Click}
              >
                노출함
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
              >
                노출안함
              </label>
            </div>
            <div className="Sales_info_exposure_info_second_notice">
              <span>
                ※ 최초 승인(판매)심사가 완려된 경우, 노출설정을 하시면 데이터
                유통포털에 판매노출 됩니다.
              </span>
            </div>
          </div>
          <div className="Sales_info_Contact_wrap">
            <input
              placeholder="전화번호를 입력하세요."
              type="text"
              className="form_input form-control"
              value={tel}
              onChange={onChangeTel}
            />
          </div>
          <div className="Sales_info_exposure_info_second_notice_wrap">
            <div className="Sales_info_exposure_info_second_notice">
              <p>
                ※ 권장(등록) 이미지: 500px * 300px / 1MB 이하 / 이미지 권장
                해상도 HD
              </p>
              <p>
                ※ 스크린샷 이미지는 최대 5개까지 가능합니다. (권장 3개 이상)
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
