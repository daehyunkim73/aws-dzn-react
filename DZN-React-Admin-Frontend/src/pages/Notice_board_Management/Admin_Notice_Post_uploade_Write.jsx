import React, { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Notice_posts_posts_uploade_popup from "../popup/Popup_Notice_Management/Notice_posts_posts_uploade_popup";
import Notice_Posts_popup_fail_popup from "../popup/Popup_Notice_Management/Notice_posts_posts_fail_popup";

import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ko-KR";
import "bootstrap/js/modal";
import "bootstrap/js/dropdown";
import "bootstrap/js/tooltip";
import "bootstrap/dist/css/bootstrap.css";
import { Server_ajax_get, Server_ajax_post } from "../../../Server_ajax";

const Post_Uploade_Write = ({ history }) => {
  const [noticeCateList, setNoticeCateList] = useState([]); // 공지사항 카테고리 값
  const title = useRef(null);
  const category = useRef(null);
  const editor = useRef(null);

  const [notice_title, setNotice_title] = useState("");
  const [notice_category, setNotice_category] = useState("");
  const [notice_content, setNotice_content] = useState();

  const [notice_info_yn, setNotice_info_yn] = useState(false);

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const cateInfo = await Server_ajax_get(
          `contents_management/noticeCateList`
        );
        setNoticeCateList(cateInfo);

        // get으로 변경해야 할듯.. 부장님 작업중이라 지금 바꾸지 못함
        const usrInfoList = await Server_ajax_post("user_management/get_certUsrList", {});
        let users = [];
        usrInfoList.map((list) => {
          users = users.concat(list.mbr_id);          
        })
        users = [...new Set(users)];
        setUserList(() => users);

      } catch (e) {
        return console.error(e);
      }
    })();
  }, []);

  const Notice_Posts_popup_fail_popup_Click = () => {
    const Admin_user_noticePost_fail_popup_bgk = document.getElementById(
      "Admin_user_noticePost_fail_popup_bgk"
    );
    Admin_user_noticePost_fail_popup_bgk.style.display = "table";
  };

  const Notice_posts_posts_uploade_popup_Click = () => {
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
      const Admin_user_post_uploade_popup_bgk = document.getElementById(
        "Admin_user_post_uploade_popup_bgk"
      );
      Admin_user_post_uploade_popup_bgk.style.display = "table";

      setNotice_category(category.current.value);
      setNotice_title(title.current.value);
      setNotice_content(editor.current.noteEditable[0].innerHTML);
      setNotice_info_yn(true);
    }
  };

  return (
    <React.Fragment>
      <Notice_posts_posts_uploade_popup
        category={notice_category}
        title={notice_title}
        content={notice_content}
        setNotice_info_yn={setNotice_info_yn}
        userList={userList}
        history={history}
      />
      <Notice_Posts_popup_fail_popup />
      <div className="Post_uploade_modfiy_wrap">
        <div className="Post_uploade_modfiy_big_box">
          <div className="Page_same_text">
            <p className="backoffice_title">공지사항 {">"} 등록</p>
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
                  {noticeCateList.map((item, cnt) => {
                    return <option key={cnt}>{item.sub_cate_name}</option>;
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
                />
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
            />
            <div className="posts_btn_box">
              <button
                className="fail_posts_btn"
                onClick={Notice_Posts_popup_fail_popup_Click}
              >
                취소
              </button>
              <button
                className="ok_posts_btn"
                onClick={Notice_posts_posts_uploade_popup_Click}
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

export default Post_Uploade_Write;
