import React, { useEffect, useState, useCallback } from "react";
// 이미지 import
import service_limit_image from "../../../image/Center/Not_Img/service_limit_image.png";
import close_btn from "../../../image/Center/Close_btn/close_btn.png";
import list_icon from "../../../image/Center/List_icon/list_icon.png";
import { useSaleInfoContext } from "./data_sale_main";

const create_data_sc_shot = (props) => {
  const { pdbase_idx, saleData, setReRend } = props;

  const {
    scrsht,
    setScrsht,
    fileDataForm,
    setFileDataForm,
    addFile,
    setAddFile,
    filePath,
    setFilePath,
    pay_type,
    setPay_type,
    pay_notice,
    setPay_notice,
    view_cnt,
    setView_cnt,
    regDt,
    setRegDt,
    uptDt,
    setUptDt,
    formData,
  } = useSaleInfoContext();

  const [formFiles, setFormFiles] = useState({
    scrsht_1: {
      file: "",
    },
    scrsht_2: {
      file: "",
    },
    scrsht_3: {
      file: "",
    },
    scrsht_4: {
      file: "",
    },
    scrsht_5: {
      file: "",
    },
  });

  useEffect(() => {
    if (props.saleData[0]) {
      setScrsht({
        scrsht_1: {
          title: props.saleData[0].scrsht_title_1,
          desc: props.saleData[0].scrsht_desc_1,
          file: props.saleData[0].scrsht_file_1,
          path: props.saleData[0].file_path_1,
          upt: 'N',
        },
        scrsht_2: {
          title: props.saleData[0].scrsht_title_2,
          desc: props.saleData[0].scrsht_desc_2,
          file: props.saleData[0].scrsht_file_2,
          path: props.saleData[0].file_path_2,
          upt: 'N',
        },
        scrsht_3: {
          title: props.saleData[0].scrsht_title_3,
          desc: props.saleData[0].scrsht_desc_3,
          file: props.saleData[0].scrsht_file_3,
          path: props.saleData[0].file_path_3,
          upt: 'N',
        },
        scrsht_4: {
          title: props.saleData[0].scrsht_title_4,
          desc: props.saleData[0].scrsht_desc_4,
          file: props.saleData[0].scrsht_file_4,
          path: props.saleData[0].file_path_4,
          upt: 'N',
        },
        scrsht_5: {
          title: props.saleData[0].scrsht_title_5,
          desc: props.saleData[0].scrsht_desc_5,
          file: props.saleData[0].scrsht_file_5,
          path: props.saleData[0].file_path_5,
          upt: 'N',
        },
      });
      
      setAddFile(props.saleData[0].addFile);
      setFilePath(props.saleData[0].filePath);
      setPay_type(props.saleData[0].pay_type);
      setPay_notice(props.saleData[0].pay_notice);
      setView_cnt(props.saleData[0].view_cnt);
      setRegDt(props.saleData[0].regDt);
      setUptDt(props.saleData[0].uptDt);
    }
  }, []);

  const FileRemove = (e) => {
    document.getElementById("input_" + e.target.name).value = "";
    setScrsht({
      ...scrsht,
      [e.target.name]: {
        //title: scrsht[e.target.name].title,
        //desc: scrsht[e.target.name].desc,
        title: "",
        desc: "",
        file: "",
        path: "",
        upt: "N"
      },
    });
  };

  useEffect(() => {    
    Object.values(formFiles).map((item, idx) => {
      formData.append("file_data", item);      
    });
    setFileDataForm(formData);    
  }, [formFiles]);

  const onChangeFileAdd = useCallback(
    (e) => {
      const imageType = e.target.files[0].type;
      if(!(imageType === "image/jpeg" || imageType === "image/jpg" || imageType === "image/png")){
        alert(`스크린샷은 'jpg / jpeg / png' 파일만 등록 가능합니다.`);
        return;
      }

      setFormFiles({
        ...formFiles,
        [e.target.name]: e.target.files[0],
      });
      //const formData = new FormData();
      let reader = new FileReader();
      const ev_tg_name = e.target.name;
      const fileName = e.target.files[0].name;
      reader.onloadend = () => {
        const img_view = reader.result;
        if (img_view) {
          setScrsht({
            ...scrsht,
            [ev_tg_name]: {
              title: scrsht[ev_tg_name].title,
              desc: scrsht[ev_tg_name].desc,
              file: fileName,
              path: img_view,
              upt: 'Y',
            },
          });
        }
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    [scrsht, formFiles]
  );

  const onChange_scrsht_title = useCallback(
    (e) => {
      const arrName = e.target.name.split("-");
      setScrsht({
        ...scrsht,
        [arrName[0]]: {
          title: e.target.value,
          desc: scrsht[arrName[0]].desc,
          file: scrsht[arrName[0]].file,
          path: scrsht[arrName[0]].path,
          upt: scrsht[arrName[0]].upt
        },
      });
    },
    [scrsht]
  );

  const onChange_scrsht_desc = useCallback(
    (e) => {
      const arrName = e.target.name.split("-");
      setScrsht({
        ...scrsht,
        [arrName[0]]: {
          title: scrsht[arrName[0]].title,
          desc: e.target.value,
          file: scrsht[arrName[0]].file,
          path: scrsht[arrName[0]].path,
          upt: scrsht[arrName[0]].upt
        },
      });
    },
    [scrsht]
  ); 

  return (
    <React.Fragment>
      <div className="Sales_info_sc_wrap clearfix">
        <div className="Sales_info_sc_left_wrap">
          <div className="Sales_info_sc_img_wrap">
            {scrsht.scrsht_1.file != "" && scrsht.scrsht_1.file != null ? (
              <img
                className="sales_info_img_Sales_file"
                id="sales_info_img_scrsht_1"
                src={scrsht.scrsht_1.path}
              />
            ) : (
              <img
                className="sales_info_img_Sales_file"
                id="sales_info_img_scrsht_1"
                src={service_limit_image}
              />
            )}
          </div>
          {scrsht.scrsht_1.file != "" && scrsht.scrsht_1.file != null ? (
            <div
              id="Sales_info_sc_file_name_wrap_scrsht_1"
              className="Sales_info_sc_file_name_wrap"
            >
              <p id="file_name_scrsht_1" onChange={onChangeFileAdd}>
                {scrsht.scrsht_1.file}
              </p>
              <img
                src={close_btn}
                alt="close_btn"
                name="scrsht_1"
                onClick={FileRemove}
              />
            </div>
          ) : (
            <div></div>
          )}

          <div className="Sales_info_sc_file_btn_wrap">
            <input
              type="file"
              id="input_scrsht_1"
              name="scrsht_1"
              onChange={onChangeFileAdd}
            />
            <label htmlFor="input_scrsht_1">파일선택</label>
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
              name="scrsht_1-title"
              className="form_input form-control"
              value={scrsht.scrsht_1.title}
              onChange={onChange_scrsht_title}
            />
          </div>
          <div className="Sales_info_sc_right_second_wrap">
            <div>
              <img src={list_icon} alt="list_icon" />
              <p>스크린샷 설명</p>
            </div>
            <textarea
              name="scrsht_1-desc"
              rows="3"
              value={scrsht.scrsht_1.desc}
              className="form-control"
              onChange={onChange_scrsht_desc}
            >
            </textarea>
          </div>
        </div>
      </div>

      <div className="Sales_info_sc_wrap clearfix">
        <div className="Sales_info_sc_left_wrap">
          <div className="Sales_info_sc_img_wrap">
            {scrsht.scrsht_2.file != "" && scrsht.scrsht_2.file != null ? (
              <img
                className="sales_info_img_Sales_file"
                id="sales_info_img_scrsht_2"
                src={scrsht.scrsht_2.path}
              />
            ) : (
              <img
                className="sales_info_img_Sales_file"
                id="sales_info_img_scrsht_2"
                src={service_limit_image}
              />
            )}
          </div>
          {scrsht.scrsht_2.file != "" && scrsht.scrsht_2.file != null ? (
            <div
              id="Sales_info_sc_file_name_wrap_scrsht_2"
              className="Sales_info_sc_file_name_wrap"
            >
              <p id="file_name_scrsht_2" onChange={onChangeFileAdd}>
                {scrsht.scrsht_2.file}
              </p>
              <img
                src={close_btn}
                alt="close_btn"
                name="scrsht_2"
                onClick={FileRemove}
              />
            </div>
          ) : (
            <div></div>
          )}

          <div className="Sales_info_sc_file_btn_wrap">
            <input
              type="file"
              id="input_scrsht_2"
              name="scrsht_2"
              onChange={onChangeFileAdd}
            />
            <label htmlFor="input_scrsht_2">파일선택</label>
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
              name="scrsht_2-title"
              className="form_input form-control"
              value={scrsht.scrsht_2.title}
              onChange={onChange_scrsht_title}
            />
          </div>
          <div className="Sales_info_sc_right_second_wrap">
            <div>
              <img src={list_icon} alt="list_icon" />
              <p>스크린샷 설명</p>
            </div>
            <textarea
              name="scrsht_2-desc"
              rows="3"
              value={scrsht.scrsht_2.desc}
              className="form-control"
              onChange={onChange_scrsht_desc}
            >
            </textarea>
          </div>
        </div>
      </div>

      <div className="Sales_info_sc_wrap clearfix">
        <div className="Sales_info_sc_left_wrap">
          <div className="Sales_info_sc_img_wrap">
            {scrsht.scrsht_3.file != "" && scrsht.scrsht_3.file != null ? (
              <img
                className="sales_info_img_Sales_file"
                id="sales_info_img_scrsht_3"
                src={scrsht.scrsht_3.path}
              />
            ) : (
              <img
                className="sales_info_img_Sales_file"
                id="sales_info_img_scrsht_3"
                src={service_limit_image}
              />
            )}
          </div>
          {scrsht.scrsht_3.file != "" && scrsht.scrsht_3.file != null ? (
            <div
              id="Sales_info_sc_file_name_wrap_scrsht_3"
              className="Sales_info_sc_file_name_wrap"
            >
              <p id="file_name_scrsht_3" onChange={onChangeFileAdd}>
                {scrsht.scrsht_3.file}
              </p>
              <img
                src={close_btn}
                alt="close_btn"
                name="scrsht_3"
                onClick={FileRemove}
              />
            </div>
          ) : (
            <div></div>
          )}

          <div className="Sales_info_sc_file_btn_wrap">
            <input
              type="file"
              id="input_scrsht_3"
              name="scrsht_3"
              onChange={onChangeFileAdd}
            />
            <label htmlFor="input_scrsht_3">파일선택</label>
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
              name="scrsht_3-title"
              className="form_input form-control"
              value={scrsht.scrsht_3.title}
              onChange={onChange_scrsht_title}
            />
          </div>
          <div className="Sales_info_sc_right_second_wrap">
            <div>
              <img src={list_icon} alt="list_icon" />
              <p>스크린샷 설명</p>
            </div>
            <textarea
              name="scrsht_3-desc"
              rows="3"
              value={scrsht.scrsht_3.desc}
              className="form-control"
              onChange={onChange_scrsht_desc}
            >
            </textarea>
          </div>
        </div>
      </div>

      <div className="Sales_info_sc_wrap clearfix">
        <div className="Sales_info_sc_left_wrap">
          <div className="Sales_info_sc_img_wrap">
            {scrsht.scrsht_4.file != "" && scrsht.scrsht_4.file != null ? (
              <img
                className="sales_info_img_Sales_file"
                id="sales_info_img_scrsht_4"
                src={scrsht.scrsht_4.path}
              />
            ) : (
              <img
                className="sales_info_img_Sales_file"
                id="sales_info_img_scrsht_4"
                src={service_limit_image}
              />
            )}
          </div>
          {scrsht.scrsht_4.file != "" && scrsht.scrsht_4.file != null ? (
            <div
              id="Sales_info_sc_file_name_wrap_scrsht_2"
              className="Sales_info_sc_file_name_wrap"
            >
              <p id="file_name_scrsht_4" onChange={onChangeFileAdd}>
                {scrsht.scrsht_4.file}
              </p>
              <img
                src={close_btn}
                alt="close_btn"
                name="scrsht_4"
                onClick={FileRemove}
              />
            </div>
          ) : (
            <div></div>
          )}

          <div className="Sales_info_sc_file_btn_wrap">
            <input
              type="file"
              id="input_scrsht_4"
              name="scrsht_4"
              onChange={onChangeFileAdd}
            />
            <label htmlFor="input_scrsht_4">파일선택</label>
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
              name="scrsht_4-title"
              className="form_input form-control"
              value={scrsht.scrsht_4.title}
              onChange={onChange_scrsht_title}
            />
          </div>
          <div className="Sales_info_sc_right_second_wrap">
            <div>
              <img src={list_icon} alt="list_icon" />
              <p>스크린샷 설명</p>
            </div>
            <textarea
              name="scrsht_4-desc"
              rows="3"
              value={scrsht.scrsht_4.desc}
              className="form-control"
              onChange={onChange_scrsht_desc}
            >
            </textarea>
          </div>
        </div>
      </div>

      <div className="Sales_info_sc_wrap clearfix">
        <div className="Sales_info_sc_left_wrap">
          <div className="Sales_info_sc_img_wrap">
            {scrsht.scrsht_5.file != "" && scrsht.scrsht_5.file != null ? (
              <img
                className="sales_info_img_Sales_file"
                id="sales_info_img_scrsht_5"
                src={scrsht.scrsht_5.path}
              />
            ) : (
              <img
                className="sales_info_img_Sales_file"
                id="sales_info_img_scrsht_5"
                src={service_limit_image}
              />
            )}
          </div>
          {scrsht.scrsht_5.file != "" && scrsht.scrsht_5.file != null ? (
            <div
              id="Sales_info_sc_file_name_wrap_scrsht_5"
              className="Sales_info_sc_file_name_wrap"
            >
              <p id="file_name_scrsht_5" onChange={onChangeFileAdd}>
                {scrsht.scrsht_5.file}
              </p>
              <img
                src={close_btn}
                alt="close_btn"
                name="scrsht_5"
                onClick={FileRemove}
              />
            </div>
          ) : (
            <div></div>
          )}

          <div className="Sales_info_sc_file_btn_wrap">
            <input
              type="file"
              id="input_scrsht_5"
              name="scrsht_5"
              onChange={onChangeFileAdd}
            />
            <label htmlFor="input_scrsht_5">파일선택</label>
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
              name="scrsht_5-title"
              className="form_input form-control"
              value={scrsht.scrsht_5.title}
              onChange={onChange_scrsht_title}
            />
          </div>
          <div className="Sales_info_sc_right_second_wrap">
            <div>
              <img src={list_icon} alt="list_icon" />
              <p>스크린샷 설명</p>
            </div>
            <textarea
              name="scrsht_5-desc"
              rows="3"
              value={scrsht.scrsht_5.desc}
              className="form-control"
              onChange={onChange_scrsht_desc}
            >
            </textarea>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default create_data_sc_shot;
