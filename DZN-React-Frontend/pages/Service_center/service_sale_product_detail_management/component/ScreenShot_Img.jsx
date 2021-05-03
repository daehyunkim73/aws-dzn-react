import React from "react";
import close_btn from "../../../../image/Center/Close_btn/close_btn.png";
import list_icon from "../../../../image/Center/List_icon/list_icon.png";
import service_limit_image from "../../../../image/Center/Not_Img/service_limit_image.png";
import { useServiceSalesContext_sale } from "../service_product_detail_management";
import { FileRemove } from "../../../../src/Image_Preview";
import { Server_ajax_post, Image_uploade, setThumbnail } from "../../../../server_ajax";

const ScreenShot_Img = ({ val, cnt }) => {
  const index = cnt + 1;
  const {
    previewImgArray,
    setPreviewImgArray,
    imgFormData,
    setImgFormData,
    ev_target,
    setEv_target,
    imgFileName,
    setImgFileName,
  } = useServiceSalesContext_sale();

  let config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  const Image_Preview_Evt = (e) => {
    const fileTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (fileTypes.includes(e.target.files[0].type)) {
      const ev_tg_name = e.target.name;
      const file_name = e.target.files[0];
      (async function () {
        try {
          const result = await Image_uploade(e.target.files[0], 'backoffice', 'C') //첫번째 인자: 파일 정보, 두번째 인자: service_code, 세번째 인자: S: 서비스, C: 회사, U: 사용자*비동기임*
          const previewPath = await setThumbnail(file_name);
          console.log(previewPath)
          setPreviewImgArray({
            ...previewImgArray,
            [ev_tg_name]: {
              scrsht_file: file_name.name,
              file_path: previewPath,
            },
          });
        } catch (e) {
          return console.error(e);
        }
      })();
    } else {
      alert("jpg, jpeg, png 형식의 이미지를 올려주세요.");
    }
  };

  const Image_Preview_Remove_Evt = (e) => {
    FileRemove(
      e,
      previewImgArray,
      setPreviewImgArray,
      imgFormData,
      setImgFormData
    );
  };

  return (
    <React.Fragment>
      <div className="Sales_info_sc_wrap clearfix">
        <div className="Sales_info_sc_left_wrap">
          {!val.file_path || val.file_path === "" ? (
            <div className="Sales_info_sc_img_wrap">
              <img
                className="sales_info_img_Sales_file"
                id={"sales_info_img_" + index}
                src={service_limit_image}
                alt="limit_image"
              />
            </div>
          ) : (
            <img
              className="sales_info_img_Sales_file Sales_info_sc_img_wrap"
              id={"sales_info_img_" + index}
              src={`https://api.wehago.com/developer/${val.file_path}`}
              alt={val.scrsht_file}
            />
          )}
          {!val.file_path || val.file_path === "" ? (
            ""
          ) : (
            <div
              id={"Sales_info_sc_file_name_wrap_" + index}
              className="Sales_info_sc_file_name_wrap"
            >
              <p id={"file_name_" + index} onChange={Image_Preview_Evt}>
                {val.scrsht_file}
              </p>
              <img
                src={close_btn}
                alt="close_btn"
                name={"Sales_img_" + index}
                onClick={Image_Preview_Remove_Evt}
              />
            </div>
          )}
          <div className="Sales_info_sc_file_btn_wrap">
            <input
              type="file"
              id={"input_" + index}
              name={"Sales_img_" + index}
              onChange={Image_Preview_Evt}
              accept="image/png,image/jpg,image/jpeg"
            />
            <label htmlFor={"input_" + index}>파일선택</label>
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
              className="form_input form-control svc_sc_title"
              defaultValue={!val === false ? val.scrsht_title : ""}
            />
          </div>
          <div className="Sales_info_sc_right_second_wrap">
            <div>
              <img src={list_icon} alt="list_icon" />
              <p>스크린샷 설명</p>
            </div>
            <textarea
              rows="3"
              className="form-control svc_sc_content"
              defaultValue={!val === false ? val.scrsht_desc : ""}
            ></textarea>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ScreenShot_Img;
