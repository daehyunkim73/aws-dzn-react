import React, { useEffect, useState } from "react";
import service_limit_image from "../../../image/Center/Not_Img/service_limit_image.png";
import ScreenShot_Img from "./component/ScreenShot_Img";
import { useServiceSalesContext } from "./service_product_detail_management";
import { FileRemove } from "../../../src/Image_Preview";
import close_btn from "../../../image/Center/Close_btn/close_btn.png";
import { Server_ajax_post, Image_uploade, setThumbnail_kym, setThumbnail } from "../../../server_ajax";
const Service_Sales_info_product_img = () => {
  let [mapState, setMapState] = useState(true);
  const {
    previewImgArray,
    iconPreviewImgArray,
    setIconPreviewImgArray,
    imgFormData,
    setFileDataForm,
    imgLogic,
    setImgLogic,
    dataSave,
  } = useServiceSalesContext();
  let Form_data = new FormData();
  useEffect(() => {
    Object.values(imgFormData).map((item) => {
      Form_data.append("ScImgFormData", item);
    });
    setFileDataForm(Form_data);
  }, [imgFormData]);
  let config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const Image_Preview_Evt = (e) => {
    const fileTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (dataSave[0].stat !== 2 && dataSave[0].stat !== 3) {
      if (fileTypes.includes(e.target.files[0].type)) {
        const ev_tg_name = e.target.name;
        const file_name = e.target.files[0];

        (async function () {
          try {
          const result = await Image_uploade(e.target.files[0], 'backoffice', 'C') //첫번째 인자: 파일 정보, 두번째 인자: service_code, 세번째 인자: S: 서비스, C: 회사, U: 사용자*비동기임*
          const previewPath = await setThumbnail(file_name);
          console.log(result);
          setIconPreviewImgArray({
            ...iconPreviewImgArray,
            [ev_tg_name]: {
              sc_name: file_name.name,
              sc_path: previewPath,
            },
          });
          setImgLogic(true);
          } catch (e) {
            return console.error(e);
          }
        })();
      } else {
        alert("jpg, jpeg, png 형식의 이미지를 올려주세요.");
      }
    }
  };
  const Image_Preview_Remove_Evt = (e) => {
    if (dataSave[0].stat !== 2 && dataSave[0].stat !== 3) {
      setImgLogic(false);
      FileRemove(
        e,
        iconPreviewImgArray,
        setIconPreviewImgArray,
        imgFormData,
        setFileDataForm
      );
    }
  };


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
          {imgLogic === true &&
          iconPreviewImgArray.Icon_img_file.sc_name !== null ? (
            <div className="Sales_info_icon_img_wrap clearfix">
              <div className="Sales_info_sc_left_wrap">
                <img
                  className="sales_info_img_Sales_file Sales_info_icon_img_wrap Sales_info_sc_img_wrap"
                  id="Icon_img_file"
                  src={`${iconPreviewImgArray.Icon_img_file.sc_path}`}
                />
                <div className="Sales_info_sc_file_name_wrap">
                  <p>{iconPreviewImgArray.Icon_img_file.sc_name}</p>
                  <img
                    src={close_btn}
                    name="Icon_img_file"
                    alt="close_btn"
                    onClick={Image_Preview_Remove_Evt}
                  />
                </div>
                <div className="Sales_info_sc_file_btn_wrap Sales_info_sc_icno_file_btn_wrap Sales_info_sc_icno_file_btn_use_mr_top">
                  <input
                    type="file"
                    id="Icon_img_file_btn"
                    name="Icon_img_file"
                    accept="image/png,image/jpg,image/jpeg"
                    onChange={Image_Preview_Evt}
                  />
                  <label htmlFor="Icon_img_file_btn">파일선택</label>
                </div>
                <div>
                  <p>권장(등록) 이미지:</p>
                  <p>64px * 64px / png</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="Sales_info_icon_img_wrap clearfix">
              <div className="Sales_info_sc_left_wrap">
                <div className="Sales_info_sc_img_wrap Sales_info_icon_img_wrap">
                  <img
                    className="sales_info_img_Sales_file"
                    id="Icon_img_file"
                    src={service_limit_image}
                  />
                </div>
                <div className="Sales_info_sc_file_btn_wrap Sales_info_sc_icno_file_btn_wrap Sales_info_sc_icno_file_btn_mr_top">
                  <input
                    type="file"
                    id="Icon_img_file_btn"
                    name="Icon_img_file"
                    onChange={Image_Preview_Evt}
                  />
                  <label htmlFor="Icon_img_file_btn">파일선택</label>
                </div>
                <div>
                  <p>권장(등록) 이미지:</p>
                  <p>64px * 64px / png</p>
                </div>
              </div>
            </div>
          )}
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
          {Object.values(previewImgArray).map((val, cnt) => {
            return (
              <ScreenShot_Img
                val={val}
                cnt={cnt}
                key={cnt}
                setMapState={setMapState}
              />
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};
export default Service_Sales_info_product_img;
