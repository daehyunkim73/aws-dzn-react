import React, { useState } from "react";
import Data_center_exposure_popup_v1 from "../../../../popup/Popup_datacenter_Management/Data_center_exposure_popup_v1";
import Data_center_exposure_popup_v2 from "../../../../popup/Popup_datacenter_Management/Data_center_exposure_popup_v2";
import { useServiceSalesContext } from "../../../Sales_Service_management";
import { useEffect } from "react";
import { Server_ajax_post } from "../../../../../../Server_ajax";

const Service_Sales_info_exposure_info = () => {
  const {
    serviceID,
    dataSave,
    saveLogic,
    showGbnStatLogic,
    setShowGbnStatLogic,
    svcSaleArray,
    svcSaleArrayLogic,
    svcSaleSimpleDesc,
    svcSaleKeyword,
    svc_cate,
    setSvc_cate,
    svcSaleCateList,
    svcCateState,
    simple_desc_ref,
    svc_intro_ref,
    main_func_ref,
    keyword_ref,
    ShowGbn,
    setShowGbn,
    setApprvLogic,
  } = useServiceSalesContext();
  const [showGbnStat, setShowGbnStat] = useState();
  const [svcStat, setSvcStat] = useState();

  // 스토어 노출 설정 노출함 클릭 이벤트
  const exposure_btn_v1_Click = () => {
    if (dataSave[0].stat === 5 || dataSave[0].stat === 6) {
      if (ShowGbn !== "Y") {
        const Admin_user_datacenter_mang_popup_bgk_v1 = document.getElementById(
          "Admin_user_datacenter_mang_popup_bgk_v1"
        );
        Admin_user_datacenter_mang_popup_bgk_v1.style.display = "table";
      }
    } else {
      alert("승인심사 완료된 후 노출 설정을 체크할 수 있습니다.");
    }
  };

  // 스토어 노출 설정 노출 안함 클릭 이벤트
  const exposure_btn_v2_Click = () => {
    if (dataSave[0].stat === 5 || dataSave[0].stat === 6) {
      if (ShowGbn !== "N") {
        const Admin_user_datacenter_mang_popup_bgk_v2 = document.getElementById(
          "Admin_user_datacenter_mang_popup_bgk_v2"
        );
        Admin_user_datacenter_mang_popup_bgk_v2.style.display = "table";
      }
    } else {
      alert("승인심사 완료된 후 노출 설정을 체크할 수 있습니다.");
    }
  };

  // 카테고리 설정에서 선택한 카테고리 값을 저장
  const cateSettingEvt = (e) => {
    setSvc_cate(e.target.options[e.target.selectedIndex].text);
  };

  // 서비스센터 일때만 스토어 노출 설정
  useEffect(() => {
    if (showGbnStat === "svc") {
      if (ShowGbn === "Y") {
        setShowGbn("N");
        setSvcStat(6);
      } else if (ShowGbn === "N") {
        setShowGbn("Y");
        setSvcStat(5);
      }
      setShowGbnStatLogic(true);
      setShowGbnStat();
    }
  }, [showGbnStat === "svc"]);

  useEffect(() => {
    if (showGbnStatLogic === true) {
      let body = {
        pdsvc_idx: serviceID,
        show_gbn: ShowGbn,
        stat: svcStat,
      };
      (async function () {
        try {
          const result = await Server_ajax_post(
            "service_center_managment/svcSaleGbnSave",
            body
          );
          console.log("iiiiiiiiiiiiiiiiiiiiiiii", result);
          setShowGbnStatLogic(false);
          setApprvLogic(true);
        } catch (e) {
          return console.error(e);
        }
      })();
    }
  }, [showGbnStatLogic === true]);

  return (
    <React.Fragment>
      {saveLogic === true && (
        <Data_center_exposure_popup_v1 setShowGbnStat={setShowGbnStat} />
      )}
      {saveLogic === true && (
        <Data_center_exposure_popup_v2 setShowGbnStat={setShowGbnStat} />
      )}
      <div className="Sales_info_exposure_info_wrap Service_Sales_info_exposure_info_wrap clearfix">
        <div className="Sales_info_exposure_info_first_wrap">
          <div>
            <p>
              스토어 노출 설정<span className="red"> *</span>
            </p>
          </div>
          <div className="Sales_info_exposure_info_left_sm">
            <p>
              서비스 간략 설명<span className="red"> *</span>
            </p>
          </div>
          <div className="Sales_info_exposure_info_left_medium">
            <p>
              서비스 소개<span className="red"> *</span>
            </p>
          </div>
          <div className="Sales_info_exposure_info_left_large">
            <p>
              주요기능<span className="red"> *</span>
            </p>
          </div>
          <div>
            <p>
              카테고리 설정<span className="red"> *</span>
            </p>
          </div>
          <div>
            <p>
              키워드 설정<span className="red"> *</span>
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
                checked={ShowGbn === "Y" ? true : false}
              />
              <label
                className="checkbox_design"
                htmlFor="Sales_info_radio_check"
                onClick={exposure_btn_v1_Click}
              >
                노출함
              </label>
            </div>

            <div className="checkbox_radio_wrap">
              <input
                type="radio"
                name="data_radio_check"
                id="Sales_info_radio_none_check"
                checked={ShowGbn === "N" ? true : false}
              />
              <label
                className="checkbox_design"
                htmlFor="Sales_info_radio_none_check"
                onClick={exposure_btn_v2_Click}
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
          <div className="Sales_info_Explan_wrap">
            <input
              placeholder="최대 100자까지 등록 가능합니다."
              type="text"
              className="form_input form-control"
              defaultValue={svcSaleSimpleDesc}
              readOnly
            />
            <div>
              <span className="red">※ 상품명 하단에 한 줄로 노출됩니다.</span>
            </div>
          </div>
          <div className="Sales_info_exposure_info_left_medium_wrap">
            <textarea
              rows="3"
              className="form-control"
              placeholder="최대 500자까지 등록 가능합니다."
              defaultValue={
                svcSaleArrayLogic === true && svcSaleArray[0].svc_intro
              }
              readOnly
            ></textarea>
          </div>
          <div className="Sales_info_exposure_info_left_large_wrap">
            <textarea
              rows="5"
              className="form-control"
              placeholder="최대 1000자까지 등록 가능합니다."
              defaultValue={
                svcSaleArrayLogic === true && svcSaleArray[0].main_func
              }
              readOnly
            ></textarea>
          </div>
          <div className="checkbox_radio_double_wrap category_select_detail_wrap">
            <div className="exposure_info_input_right_wrap">
              <select
                className="form-control"
                onChange={cateSettingEvt}
                disabled
              >
                <option>카테고리 선택</option>
                {svcCateState === true &&
                  svcSaleCateList[1].map((item, cnt) => {
                    return svcSaleArrayLogic === true &&
                      svc_cate === item.sub_cate_name ? (
                      <option value={item.sub_cate_name} selected key={cnt}>
                        {item.sub_cate_name}
                      </option>
                    ) : (
                      <option value={item.sub_cate_code} key={cnt}>
                        {item.sub_cate_name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>

          <div className="Sales_info_Explan_wrap">
            <input
              placeholder="따옴표(,)로 구분 (예: 기업, 노동, 비용, 단위노동비용지수)"
              type="text"
              className="form_input form-control"
              defaultValue={svcSaleKeyword}
              readOnly
            />
            <div>
              <span className="red">
                ※ 서비스에 대한 핵심 키워드로 서비스를 표시하는 가장 중요한
                항목으로 반드시 10개 이상 작성해 주세요.
              </span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Service_Sales_info_exposure_info;
