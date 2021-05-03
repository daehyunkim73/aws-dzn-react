import React, { useState } from "react";
import service_limit_image from "../../../../../../image/Center/Not_Img/service_limit_image.png";
import list_icon from "../../../../../../image/Center/List_icon/list_icon.png";
import close_btn from "../../../../../../image/Center/Close_btn/close_btn.png";
import { useServiceSalesContext } from "../../../Sales_Service_management";
import ModalImage from "react-modal-image";
const Service_Sales_info_product_img = () => {
  const { svcSaleArray, svcSaleArrayLogic } = useServiceSalesContext();

  return (
    <React.Fragment>
      <div className="Sales_info_exposure_info_wrap clearfix">
        <div className="Sales_info_exposure_info_first_wrap">
          <div className="Sales_info_service_icon">
            <p>
              서비스 아이콘<span className="red"> *</span>
            </p>
          </div>
          <div>
            <p>
              스크린샷<span className="red"> *</span>
            </p>
          </div>
        </div>
        <div className="Sales_info_exposure_info_second_wrap Service_Sales_info_exposure_info_second_wrap">
          <div className="Sales_info_exposure_info_second_notice_wrap">
            <div className="Sales_info_exposure_info_second_notice">
              <p>
                ※ 서비스 아이콘은 사용자들이 서비스를 구분할 수 있고 홍보하는데
                도움이 됩니다.
              </p>
            </div>
          </div>
          <div className="Sales_info_icon_img_wrap clearfix">
            <div className="Sales_info_sc_left_wrap">
              <ModalImage
                small={
                  svcSaleArrayLogic === true &&
                  `http://localhost:8081/${svcSaleArray[0].svc_icon_path_1}`
                }
                large={
                  svcSaleArrayLogic === true &&
                  `http://localhost:8081/${svcSaleArray[0].svc_icon_path_1}`
                }
                className="sales_info_img_Sales_file Sales_info_icon_img_wrap Sales_info_sc_img_wrap"
                alt={svcSaleArrayLogic === true && svcSaleArray[0].svc_icon_1}
              />
              <div className="Sales_info_sc_file_name_wrap">
                <p>
                  {svcSaleArrayLogic === true && svcSaleArray[0].svc_icon_1}
                </p>
              </div>
            </div>
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
          {svcSaleArrayLogic === true &&
            svcSaleArray.map((item, cnt) => {
              return (
                <div className="Sales_info_sc_wrap clearfix" key={cnt}>
                  <div className="Sales_info_sc_left_wrap">
                    {!item.file_path ? (
                      <div className="Sales_info_sc_img_wrap Sales_info_icon_img_wrap">
                        <img
                          className="sales_info_img_Sales_file"
                          id="Icon_img_file"
                          src={service_limit_image}
                        />
                      </div>
                    ) : (
                      <ModalImage
                        small={`http://localhost:8081/${item.file_path}`}
                        large={`http://localhost:8081/${item.file_path}`}
                        className="sales_info_img_Sales_file Sales_info_icon_img_wrap Sales_info_sc_img_wrap"
                        alt={item.scrsht_file}
                      />
                    )}

                    <div className="Sales_info_sc_file_name_wrap">
                      <p>{item.scrsht_file}</p>
                    </div>
                  </div>
                  <div className="Sales_info_sc_right_wrap Sales_info_sc_right_upload_wrap">
                    <div className="Sales_info_sc_right_first_wrap">
                      <div>
                        <img src={list_icon} alt="list_icon" />
                        <p>스크린샷 제목</p>
                      </div>
                      <input
                        type="text"
                        className="form_input form-control"
                        readOnly
                        defaultValue={item.scrsht_title}
                      />
                    </div>
                    <div className="Sales_info_sc_right_second_wrap">
                      <div>
                        <img src={list_icon} alt="list_icon" />
                        <p>스크린샷 설명</p>
                      </div>
                      <textarea
                        rows="3"
                        className="form-control"
                        readOnly
                        defaultValue={item.scrsht_desc}
                      ></textarea>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Service_Sales_info_product_img;
