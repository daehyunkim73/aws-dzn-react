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
import Ajax from "../../../lib/ajax-3rd-custom";
import { UncertApi_ajax_get } from "../../../server_ajax";
import { Image_uploade } from "../../../server_ajax";
import { useCookies } from "react-cookie";

const Data_forum_writing = ({ history }) => {
  const forum_title_value = useRef(null);
  const forum_select_vlaue = useRef(null);
  const editor = useRef();

  const [forum_info_yn, setForum_info_yn] = useState(false);
  const [file_in_name, setFile_in_name] = useState([]);
  const [file_data_form, setFile_data_from] = useState();
  const [file_remove, setFile_remove] = useState([]);
  const [image_preview_data, setImage_preview_data] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();

  const [writing_info, setWriting_info] = useState({
    writing_title: null,
    writing_cate: null,
    writing_desc: null,
  });

  useEffect(() => {
    setFile_in_name([]);
    [].map.call(file_remove, (f) => {
      setFile_in_name((file_in_name) => [...file_in_name, f]);
    });
  }, [file_remove]);

  const img_in_remove = useCallback(
    (file_index_num) => () => {
      const file_remove_arr_file = Array.prototype.slice.call(file_in_name);
      [].filter.call(file_in_name, (c) => {
        file_remove_arr_file.indexOf(c) === file_index_num &&
          setFile_remove(
            file_remove_arr_file.splice(
              file_remove_arr_file.splice(file_remove_arr_file.indexOf(c), 1)
            )
          );
      });
    },
    [file_in_name, file_remove]
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
    history.push("/forum/data");
  };

  const gaci_uploade_Click = () => {
    if (!cookies.wehago_s) {
      return alert("로그인을 먼저 해주세요.");
    }
    const select_big_value = forum_select_vlaue.current;
    const select_value_pric =
      select_big_value.options[select_big_value.selectedIndex].text;
    if (
      select_value_pric === "카테고리 선택" ||
      !forum_title_value.current.value ||
      !forum_title_value.current.value.trim()
    ) {
      return alert("카테고리 또는 제목을 작성해주세요.");
    }
    setWriting_info({
      writing_title: select_value_pric,
      writing_cate: forum_title_value.current.value,
      writing_desc: editor.current.noteEditable[0].innerHTML,
    });
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

  const File_uploade = (fileList) => {
    let file = fileList.target.files;
    if (file.length > 5) {
      return alert("파일은 총 5개까지입니다.");
    }
    [].map.call(file, async (f) => {
      const result_data = await Image_uploade(f, "backoffice", "C");
      if (result_data) {
        f.image_src = result_data;
        const image_info = {
          image_src: result_data,
          name: f.name,
        };
        setFile_in_name((file_in_name) => [...file_in_name, image_info]);
      }
    });
  };

  const onImageUpload = (fileList) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      ReactSummernote.insertImage(reader.result);
    };
    reader.readAsDataURL(fileList[0]);
  };

  const File_uploade_click = () => {
    if (!cookies.wehago_s) {
      return alert("로그인을 먼저 해주세요.");
    }
  };

  return (
    <React.Fragment>
      <Gaci_uploade_list_popup /> {/* 아직 작성중일때 목록버튼을 누르면 */}
      {forum_info_yn === true && (
        <Gaci_uploade_popup
          Development_division={"D"}
          prop_writing_info={writing_info}
          setprop_info_yn={setForum_info_yn}
          forum_history={history}
          prop_file_data_form={file_in_name}
        />
      )}
      {/* 게시물을 올릴때  */}
      <div className="payment_info forum_write_wrap">
        <div className="search_page" id="big_lee_sarch_page_box">
          <div className="input_wrap">
            <div className="user_list_wrap" id="lee_user_list_wrap">
              <div className="input_box_wrap">
                <div className="input_box white_border">제목</div>
                <div className="input_box">카테고리</div>
              </div>
              <div className="input_form_wrap">
                <div className="input_form white_border">
                  <Form.Control
                    ref={forum_title_value}
                    type="text"
                    className="form_input"
                    placeholder="제목은 최대 100자 까지 작성이 가능합니다."
                  />
                </div>
                <div className="input_form">
                  <Form.Control
                    as="select"
                    className="search_select"
                    ref={forum_select_vlaue}
                  >
                    <option>카테고리 선택</option>
                    <option>사용방법</option>
                    <option>문제해결</option>
                    <option>자유토론</option>
                    <option>데이터분석</option>
                    <option>빅 데이터</option>
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
                    // onChange={input_file_names}
                    onChange={File_uploade}
                  />
                  <label htmlFor="Sales_file_name" onClick={File_uploade_click}>
                    파일첨부
                  </label>
                </div>
                {file_in_name.map((c, i) => {
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
                })}
              </div>
              <div className="list_gaci_uploade_box">
                <button onClick={popup_List_click}>목록</button>
                <button onClick={gaci_uploade_Click}>글 등록</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Data_forum_writing;
