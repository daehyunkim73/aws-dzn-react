import React from "react";

const ScreenShot_Img_list = () => {
  return (
    <React.Fragment>
      <div className="Sales_info_sc_wrap clearfix">
        <div className="Sales_info_sc_left_wrap">
          <div className="Sales_info_sc_img_wrap">
            {previewImgArray.Sales_img_1 ||
            previewImgArray.Sales_img_1 !== undefined ? (
              <img
                className="sales_info_img_Sales_file"
                id="sales_info_img_Sales_img_1"
                src={previewImgArray.Sales_img_1.sc_path}
              />
            ) : (
              <img
                className="sales_info_img_Sales_file"
                id="sales_info_img_Sales_img_1"
                src={service_limit_image}
              />
            )}
          </div>
          {previewImgArray.Sales_img_1 ||
          previewImgArray.Sales_img_1 !== undefined ? (
            <div
              id="Sales_info_sc_file_name_wrap_Sales_img_1"
              className="Sales_info_sc_file_name_wrap"
            >
              <p id="file_name_Sales_img_1" onChange={Image_Preview_Evt}>
                {previewImgArray.Sales_img_1.sc_name}
              </p>
              <img
                src={close_btn}
                alt="close_btn"
                name="Sales_img_1"
                onClick={Image_Preview_Remove_Evt}
              />
            </div>
          ) : (
            ""
          )}
          <div className="Sales_info_sc_file_btn_wrap">
            <input
              type="file"
              id="input_Sales_img_1"
              name="Sales_img_1"
              onChange={Image_Preview_Evt}
            />
            <label htmlFor="input_Sales_img_1">파일선택</label>
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
              defaultValue={
                !previewImgArray.Sales_img_1 === false
                  ? previewImgArray.Sales_img_1.sc_title
                  : ""
              }
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
              defaultValue={
                !previewImgArray.Sales_img_1 === false
                  ? previewImgArray.Sales_img_1.sc_content
                  : ""
              }
            >
              {/* {previewImgArray.Sales_img_1 && previewImgArray.Sales_img_1} */}
            </textarea>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ScreenShot_Img_list;
