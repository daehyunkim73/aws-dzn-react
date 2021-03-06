import React, { useState, useRef, useEffect, useCallback } from "react";
import Gaci_uploade_fail_popup from "../../popup/Small_popup/Forum/Gaci_uploade_fail_popup";
import Gaci_uploade_list_popup from "../../popup/Small_popup/Forum/Gaci_uploade_list_popup";
import Gaci_uploade_popup from "../../popup/Small_popup/Forum/Gaci_uploade_popup";
import Close_btn_icon from "../../../image/Center/Close_btn/close_btn.png";
import Form from "react-bootstrap/Form";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ko-KR";
import "bootstrap/js/modal";
import "bootstrap/js/dropdown";
import "bootstrap/js/tooltip";
import "bootstrap/dist/css/bootstrap.css";
import { image_preview } from "../../../src/imageFile_preview";
import Ajax from '../../../lib/ajax-3rd-custom';
import { uploadFile } from '../../../lib/s3ObjectUtils-3rd-custom';
import { UncertApi_ajax_get } from '../../../server_ajax';
import $ from "jquery";
import globals from '../../../lib/globals'

const Data_forum_writing = ({ history }) => {
  let startTime = 0;
  const forum_title_value = useRef(null);
  const forum_select_vlaue = useRef(null);
  const editor = useRef();

  const [forum_title, setForum_title] = useState("");
  const [forum_select_cart_title, setForum_select_cart_title] = useState("");
  const [forum_info_yn, setForum_info_yn] = useState(false);
  const [file_in_name, setFile_in_name] = useState([]);
  const [file_data_form, setFile_data_from] = useState();
  const [content, setContent] = useState();
  const [file_remove, setFile_remove] = useState([]);
  const [image_preview_data, setImage_preview_data] = useState([]);

  useEffect(() => {
    setFile_in_name([]);
    const Form_data = new FormData();

    [].map.call(file_remove, (f) => {
      Form_data.append("image", f);
      setFile_in_name((file_in_name) => [...file_in_name, f]);
    });
    setFile_data_from(Form_data);
  }, [file_remove]);

  const input_file_names = useCallback((e) => {
    if (e.target.files.length > 5) {
      return alert("????????? ??? 5??????????????????.");
    }
    setFile_remove(e.target.files);
  }, [file_in_name, file_data_form, file_remove]);

  const img_in_remove = useCallback((file_index_num) => () => {
    //?????? ??????
    const file_remove_arr_file = Array.prototype.slice.call(file_remove);
    [].filter.call(file_remove, (c) => {
      file_remove_arr_file.indexOf(c) === file_index_num &&
        setFile_remove(
          file_remove_arr_file.splice(
            file_remove_arr_file.splice(file_remove_arr_file.indexOf(c), 1)
          )
        );
    });
  },
    [file_in_name, file_data_form, file_remove]
  );

  useEffect(() => {
    if (forum_info_yn === true) {
      const Froum_Data_Approved_gaci_uploade_popup_bgk = document.getElementById(
        "Froum_Data_Approved_gaci_uploade_popup_bgk"
      );
      Froum_Data_Approved_gaci_uploade_popup_bgk.style.display = "table";
    }
  }, [forum_info_yn]);

  const popup_List_click = () => {
    history.push("/forum/service");
  };

  const gaci_uploade_Click = () => {
    const select_big_value = forum_select_vlaue.current;
    const select_value_pric =
      select_big_value.options[select_big_value.selectedIndex].text;
    if (
      select_value_pric === "???????????? ??????" ||
      !forum_title_value.current.value ||
      !forum_title_value.current.value.trim()
    ) {
      return alert("???????????? ?????? ????????? ??????????????????.");
    }
    setForum_select_cart_title(select_value_pric);
    setForum_title(forum_title_value.current.value);
    setContent(editor.current.noteEditable[0].innerHTML);
    setForum_info_yn(true);
  };

  useEffect(() => {
    image_preview_data.map((c) => {
      const div = document.createElement("div");
      const img = document.createElement("img");
      img.className = "forum_image_fixed";
      img.src = `http://localhost:8081/uploade/image/${c}`;
      div.append(img);
      return editor.current.noteEditable.append(div);
    });
  }, [image_preview_data]);


  //---

  const handleUploadProgress = (param) => {
    let evt = param.event;
    let percentComplete = Math.round(evt.loaded * 100 / evt.total); // ???????????? ???????????????
    let currentTime = (new Date()).getTime(); // ????????????
    let secondsElapsed = (currentTime - startTime) / 1000; // ????????????
    let bytesPerSecond = secondsElapsed ? (evt.loaded / secondsElapsed) : 0; // ?????? byte ????????????
    let remainingBytes = evt.total - evt.loaded; // ?????? ??????
    let secondsRemaining = secondsElapsed ? (remainingBytes / bytesPerSecond).toFixed(0) : "???????????? ?????????.."; // ????????????
    let speedPerSecond, ext = ""; // ????????????
    if ((bytesPerSecond / 1024).toFixed(0) < 1024) {
      speedPerSecond = (bytesPerSecond / 1024).toFixed(2);
      ext = 'Kb';
    } else if ((bytesPerSecond / 1024 / 1024).toFixed(0) < 1024) {
      speedPerSecond = (bytesPerSecond / 1024 / 1024).toFixed(2);
      ext = 'Mb';
    } else {
      speedPerSecond = (bytesPerSecond / 1024 / 1024 / 1024).toFixed(0);
      ext = 'Gb';
    }

    let statusText = percentComplete + "% ????????? ??? => ???????????? " + speedPerSecond + "(" + ext + "), ???????????? " + secondsRemaining + "???";
    console.log(statusText);
  };

  const handleUploadSuccess = (param) => {
    console.log("upload_success " + param.newFileName)
  };

  const handleUploadError = (message) => {
    console.log("upload_error ", message);
  };

  const handleUploadCancel = (message) => {
    console.log("upload_cancel ", message);
  };

  const onImageUpload = async (fileList) => {
    const reader = new FormData();

    // [].map.call(fileList, (file_info) => {
    //   return reader.append("image", file_info);
    // });

    let file = fileList[0];
    let fileUploadData = {
      "file": file,                               // ???????????? ?????? ??????
      "serviceKey": "",
      "serviceCode": "backoffice",
      "bucketType": 'C',                          // S: ?????????, C: ??????, U: ?????????
      "handleSuccess": handleUploadSuccess,  // ????????? ?????? ???, ?????? ?????????
      "handleError": handleUploadError,      // ????????? ?????? ???, ?????? ?????????
      "handleProgress": handleUploadProgress,// ????????? ????????????, ?????? ?????????
      "handleCancel": handleUploadCancel,    // ????????? ?????? ???, ?????? ?????????
      "isPublic": true,                           // ????????? ???????????? ????????? ?????? (?????? ???????????? ???????????? false ??????)
      "isWedrive": false,                         // ?????????????????? ????????? ?????? true, ??????????????? ???????????? ???????????? false
      "wedriveToken": '',                         // isWedrive ?????? true ??? ?????? ??????????????? ?????? ???, false??? ?????? ?????? ????????? ???
      "wedrivePath": '',                          // isWedrive ?????? true ??? ?????? ??????????????? ?????? ?????? ???, false??? ?????? ?????? ????????? ???
      "async": true,                              // ????????? ??????
    };
    startTime = (new Date()).getTime();
    const result = uploadFile(fileUploadData)
    image_preview(reader, setImage_preview_data);
  };

  return (
    <React.Fragment>
      <Gaci_uploade_list_popup /> {/* ?????? ??????????????? ??????????????? ????????? */}
      {forum_info_yn === true && (
        <Gaci_uploade_popup
          Development_division={'S'}
          prop_title={forum_title}
          prop_select={forum_select_cart_title}
          prop_content={content}
          setprop_info_yn={setForum_info_yn}
          forum_history={history}
          prop_file_data_form={file_data_form}
        />
      )}
      {/* ???????????? ?????????  */}
      <div className="payment_info forum_write_wrap">
        <div className="search_page" id="big_lee_sarch_page_box">
          <div className="input_wrap">
            <div className="user_list_wrap" id="lee_user_list_wrap">
              <div className="input_box_wrap">
                <div className="input_box white_border">??????</div>
                <div className="input_box">????????????</div>
              </div>
              <div className="input_form_wrap">
                <div className="input_form white_border">
                  <Form.Control
                    ref={forum_title_value}
                    type="text"
                    className="form_input"
                    placeholder="????????? ?????? 100??? ?????? ????????? ???????????????."
                  />
                </div>
                <div className="input_form">
                  <Form.Control
                    as="select"
                    className="search_select"
                    ref={forum_select_vlaue}
                  >
                    <option>???????????? ??????</option>
                    <option>????????????</option>
                    <option>????????????</option>
                    <option>????????????</option>
                    <option>???????????????</option>
                    <option>??? ?????????</option>
                  </Form.Control>
                </div>
              </div>
            </div>
          </div>
          <div className="writing_gaci_box">
            <ReactSummernote
              value="Default value"
              ref={editor}
              options={{
                height: 350,
                dialogsInBody: true,
                toolbar: [
                  ["style", ["style"]],
                  ["font", ["bold", "underline", "clear"]],
                  ["fontname", ["fontname"]],
                  ["para", ["ul", "ol", "paragraph"]],
                  ["table", ["table"]],
                  ["insert", ["link", "picture", "video"]],
                  ["view", ["fullscreen", "codeview"]],
                ],
              }}
              onImageUpload={onImageUpload}
            />
            <div
              className="writing_button_box"
              style={{ marginBottom: "50px" }}
            >
              <div className="forum_file_button_text_box">
                <div className="Sales_info_sc_file_btn_wrap">
                  <input
                    multiple
                    hidden
                    type="file"
                    id="Sales_file_name"
                    name="Sales_file_name"
                    onChange={input_file_names}
                  />
                  <label htmlFor="Sales_file_name">????????????</label>
                </div>
                {/* {file_in_name.map((c, i) => {
                  console.log('i', i)
                  return (
                    <div
                      key={i}
                      style={{
                        display: "inline-block",
                        marginLeft: "5px",
                        marginRight: "5px",
                      }}
                    >
                      {c.name}
                      {c.name && (
                        <img
                          src={Close_btn_icon}
                          onClick={img_in_remove(i)}
                          alt={`${c}`}
                        />
                      )}
                    </div>
                  );
                })} */}
              </div>
              <div className="list_gaci_uploade_box">
                <button onClick={popup_List_click}>??????</button>
                <button onClick={gaci_uploade_Click}>??? ??????</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Data_forum_writing;
