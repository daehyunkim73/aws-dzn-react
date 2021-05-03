import React, { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Update_Posts_popup_fail_popup from "../popup/Popup_FAQ_Management/Faq_Notice_posts_posts_fail_popup";
import Faq_Notice_posts_posts_uploade_modify_popup from "../popup/Popup_FAQ_Management/Faq_Notice_posts_posts_uploade_modify_popup";

import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ko-KR";
import "bootstrap/js/modal";
import "bootstrap/js/dropdown";
import "bootstrap/js/tooltip";
import "bootstrap/dist/css/bootstrap.css";
import { Server_ajax_get } from "../../../Server_ajax";

const Post_Faq_Write = ({ history, match }) => {
  const title = useRef(null);
  const category = useRef(null);
  const editor = useRef(null);
  const faq_key = match.params.id;

  const [notice_title, setNotice_title] = useState("");
  const [notice_category, setNotice_category] = useState("");
  const [notice_content, setNotice_content] = useState();

  const [a, setA] = useState("");
  const [noticeInfo, setNoticeInfo] = useState(); // 공지사항 수정 전 값
  const [category_list, setCategory_list] = useState();
  const [notice_info_yn, setNotice_info_yn] = useState(false);

  const Notice_Posts_popup_fail_popup_Click = () => {
    const Admin_user_Faq_post_fail_popup_bgk = document.getElementById(
      "Admin_user_Faq_post_fail_popup_bgk"
    );
    Admin_user_Faq_post_fail_popup_bgk.style.display = "table";
  };

  const Notice_posts_posts_faq_popup_Click = () => {
    const select_big_value = category.current; //createRef를 이용한 dom 접근
    const select_value_pric =
      category.current.options[select_big_value.selectedIndex].text;

    if (select_value_pric === "카테고리 선택") {
      alert("카테고리를 선택해주세요.");
    } else if (!title.current.value || !title.current.value.trim()) {
      alert("제목을 작성해주세요.");
    } else if (
      editor.current.noteEditable[0].innerHTML === "<p><br></p>" ||
      !editor.current.noteEditable[0].innerHTML
    ) {
      alert("내용을 작성해주세요.");
    } else {
      const Admin_user_faq_post_popup_bgk = document.getElementById(
        "Admin_user_faq_post_popup_bgk"
      );
      Admin_user_faq_post_popup_bgk.style.display = "table";

      setNotice_category(category.current.value);
      setNotice_title(title.current.value);
      setNotice_content(editor.current.noteEditable[0].innerHTML);
      setNotice_info_yn(true);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const cateInfo = await Server_ajax_get(
          `contents_management/faq_category_list`
        );
        const contentInfo = await Server_ajax_get(
          `contents_management/admin/faq/detail/${match.params.id}`
        );
        setCategory_list(cateInfo);
        setNoticeInfo(contentInfo);
        setA(contentInfo[0].desc);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, []);

  // 이미지 미리보기
  const onImageUpload = (images, insertImage) => {
    for (let i = 0; i < images.length; i++) {      
      const reader = new FileReader();
      reader.onloadend = () => {
        insertImage(reader.result);
      };
      reader.readAsDataURL(images[i]);
    }
  }

  const onInit = (func) => {
      func.replace(noticeInfo[0].faq_desc);
  };

  return (
    <React.Fragment>
      <Faq_Notice_posts_posts_uploade_modify_popup
        category={notice_category}
        title={notice_title}
        content={notice_content}
        setNotice_info_yn={setNotice_info_yn}
        faq_key={faq_key}
        history={history}
      />
      <Update_Posts_popup_fail_popup />
      <div className="Post_faq_modfiy_wrap">
        <div className="Post_faq_modfiy_big_box">
          <div className="Page_same_text">
            <p className="backoffice_title">FAQ {">"} 수정</p>
          </div>

          <div className="admin_user_list_wrap" id="post_headerText_box_first">
            <div className="admin_user_list_header" id="post_input_box_header">
              <div className="notice_input_box">카테고리</div>
            </div>
            <div className="Notice_from_wrap">
              <div className="notice_input_form" id="Notice_input_box">
                <Form.Control
                  as="select"
                  className="list_select"
                  ref={category}
                >
                  <option>카테고리 선택</option>
                  {noticeInfo &&
                    category_list.map((item, cnt) => {
                      console.log("🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️", noticeInfo[0].faq_type_code);
                      return noticeInfo[0].faq_type_code ===
                        item.sub_cate_name ? (
                        <option value={item.sub_cate_code} selected key={cnt}>
                          {item.sub_cate_name}
                        </option>
                      ) : (
                        <option value={item.sub_cate_code} key={cnt}>
                          {item.sub_cate_name}
                        </option>
                      );
                    })}
                </Form.Control>
              </div>
            </div>
          </div>

          <div className="admin_user_list_wrap" id="post_headerText_box">
            <div className="admin_user_list_header" id="post_input_box_header">
              <div className="notice_input_box">제목</div>
            </div>
            <div className="Notice_from_wrap">
              <div className="notice_input_form" id="Notice_input_box">
                <Form.Control
                  type="text"
                  placeholder="제목을 입력해주세요."
                  ref={title}
                  defaultValue={noticeInfo && noticeInfo[0].faq_title}
                />
              </div>
            </div>
          </div>

          <div className="writing_gaci_box">
            {noticeInfo && <ReactSummernote
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
              onInit={onInit}
              onImageUpload={onImageUpload}
            />
}
            <div className="posts_btn_box">
              <button
                className="fail_posts_btn"
                onClick={Notice_Posts_popup_fail_popup_Click}
              >
                취소
              </button>
              <button
                className="ok_posts_btn"
                onClick={Notice_posts_posts_faq_popup_Click}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Post_Faq_Write;
