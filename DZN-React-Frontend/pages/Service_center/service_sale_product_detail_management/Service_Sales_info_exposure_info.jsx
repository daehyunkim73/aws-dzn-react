import React, { useCallback } from "react";
import Exposure_popup from "../../popup/Small_popup/Data_Exposure_popup_v1";
import Exposure_popup_v2 from "../../popup/Small_popup/Data_Exposure_popup_v2";
import { useServiceSalesContext_sale } from "./service_product_detail_management";
import { useEffect } from "react";

const Service_Sales_info_exposure_info = () => {
  const {
    setShow_gbn_svc,
    simple_desc_ref,
    svc_intro_ref,
    main_func_ref,
    setSvc_cate,
    keyword_ref,
    svc_cate,
    show_gbn,
    simple_desc,
    main_func,
    svc_intro,
    keyword,
    svcCateState,
    svcSaleCateList,
    dataSave,
    svr_yn_stat,
  } = useServiceSalesContext_sale();

  // 스토어 노출 설정 노출함 클릭 이벤트
  const Exposure_Click = useCallback(() => {
    console.log(svr_yn_stat, "!!!");
    if (show_gbn !== "Y" && svr_yn_stat === true) {
      if (
        dataSave[0].stat !== 1 &&
        dataSave[0].stat !== 2 &&
        dataSave[0].stat !== 4
      ) {
        const Data_list_popup_bgk = document.getElementById(
          "Data_Exposure_popup_v1"
        );
        Data_list_popup_bgk.style.display = "table";
      } else {
        alert("승인심사 완료된 후 노출 설정을 체크할 수 있습니다.");
      }
    }
  }, [show_gbn, svr_yn_stat]);

  // 스토어 노출 설정 노출 안함 클릭 이벤트
  const Not_Exposure_Click = useCallback(() => {
    if (show_gbn !== "N" && svr_yn_stat === true) {
      if (
        dataSave[0].stat !== 1 &&
        dataSave[0].stat !== 2 &&
        dataSave[0].stat !== 4
      ) {
        const Data_list_popup_bgk_V2 = document.getElementById(
          "Data_Exposure_popup_v2"
        );
        Data_list_popup_bgk_V2.style.display = "table";
      } else {
        alert("승인심사 완료된 후 노출 설정을 체크할 수 있습니다.");
      }
    }
  }, [show_gbn, svr_yn_stat]);

  // 카테고리 설정에서 선택한 카테고리 값을 저장
  const cateSettingEvt = (e) => {
    setSvc_cate(e.target.options[e.target.selectedIndex].text);
  };

  return (
    <React.Fragment>
      {svr_yn_stat === true && (
        <Exposure_popup setShow_gbn_svc={setShow_gbn_svc} dataSave={dataSave} />
      )}
      {/* 승인완료가 된 경우 판매노출함으로 변경가능 */}
      {svr_yn_stat === true && (
        <Exposure_popup_v2
          setShow_gbn_svc={setShow_gbn_svc}
          dataSave={dataSave}
        />
      )}
      {/* 노출 안함 설정시 판매 중지됨 판매중 재승인의 경우 승인완료시 해당 내용이 적용 됨 */}
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
                checked={show_gbn === "Y" && true}
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
                checked={show_gbn === "N" && true}
              />
              <label
                className="checkbox_design"
                htmlFor="Sales_info_radio_none_check"
                onClick={Not_Exposure_Click}
              >
                노출안함
              </label>
            </div>
            <div className="Sales_info_exposure_info_second_notice">
              <span>
                ※ 최초 승인(판매)심사가 완료된 경우, 노출설정을 하시면 데이터
                유통포털에 판매노출 됩니다.
              </span>
            </div>
          </div>
          <div className="Sales_info_Explan_wrap">
            <input
              placeholder="최대 100자까지 등록 가능합니다."
              type="text"
              className="form_input form-control"
              ref={simple_desc_ref}
              defaultValue={simple_desc}
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
              ref={svc_intro_ref}
              defaultValue={main_func}
            ></textarea>
          </div>
          <div className="Sales_info_exposure_info_left_large_wrap">
            <textarea
              rows="5"
              className="form-control"
              placeholder="최대 1000자까지 등록 가능합니다."
              ref={main_func_ref}
              defaultValue={svc_intro}
            ></textarea>
          </div>
          <div className="checkbox_radio_double_wrap">
            <div className="exposure_info_input_right_wrap">
              <select className="form-control" onChange={cateSettingEvt}>
                <option>카테고리 선택</option>
                {svcCateState === true &&
                  svcSaleCateList[1].map((val) => {
                    return svc_cate === val.sub_cate_name ? (
                      <option value={val.sub_cate_code} selected>
                        {val.sub_cate_name}
                      </option>
                    ) : (
                      <option value={val.sub_cate_code}>
                        {val.sub_cate_name}
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
              ref={keyword_ref}
              defaultValue={keyword}
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
