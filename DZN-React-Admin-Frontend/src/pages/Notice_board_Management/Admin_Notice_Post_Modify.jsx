import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Gaci_uploade_fail_popup from "../../../pages/popup/Small_popup/Forum/Gaci_uploade_fail_popup";
import Gaci_uploade_list_popup from "../../../pages/popup/Small_popup/Forum/Gaci_uploade_list_popup";
import Gaci_uploade_popup from "../../../pages/popup/Small_popup/Notice/Gaci_uploade_popup";
import Form from 'react-bootstrap/Form';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';
import 'react-summernote/lang/summernote-ko-KR';
import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
import 'bootstrap/dist/css/bootstrap.css';


function popup_block() {
  const list_popup = document.getElementById(
    "Froum_Data_Approved_uploade_popup_bgk"
  );
  list_popup.style.display = "table";
  return list_popup;
}

const Post_Uploade_Modify = ({ history }) => {
  const forum_title_value = useRef(null);
  const forum_select_vlaue = useRef(null);
  const editor = useRef();

  const [forum_title, setForum_title] = useState("");
  const [forum_select_cart_title, setForum_select_cart_title] = useState("");
  const [forum_info_yn, setForum_info_yn] = useState(false);
  const [content, setContent] = useState();
  const [file_data_form, setFile_data_from] = useState();

  useEffect(() => {
    if (forum_info_yn === true) {
      const Froum_Data_Approved_gaci_uploade_popup_bgk = document.getElementById(
        "Froum_Data_Approved_gaci_uploade_popup_bgk"
      );
      Froum_Data_Approved_gaci_uploade_popup_bgk.style.display = "table";
    }
  }, [forum_info_yn]);

  const popup_List_click = () => {
    popup_block();
  };

  const gaci_uploade_Click = () => {
    const select_big_value = forum_select_vlaue.current; //createRef를 이용한 dom 접근
    const select_value_pric = select_big_value.options[select_big_value.selectedIndex].text;
    if(select_value_pric === "카테고리 선택" || !forum_title_value.current.value || !forum_title_value.current.value.trim()) {
      return alert('문의 유형을 선택하세요.');
    }
    setForum_select_cart_title(select_value_pric);
    setForum_title(forum_title_value.current.value);
    setContent(editor.current.noteEditable[0].innerHTML);
    setForum_info_yn(true);
    console.log('카테고리',select_value_pric); //카테고리
    console.log('제목',forum_title_value.current.value); //제목
    console.log('본문',editor.current.noteEditable[0].innerHTML); //본문
  }

  return (
    <React.Fragment>
      <Gaci_uploade_fail_popup /> {/* 필수 항목들을 다 안적었을 때 */}
      <Gaci_uploade_list_popup /> {/* 아직 작성중일때 목록버튼을 누르면 */}
      {forum_info_yn === true && (
        <Gaci_uploade_popup
          prop_title={forum_title}
          prop_type={forum_select_cart_title}
          prop_content={content}
          setprop_info_yn={setForum_info_yn}
          forum_history={history}
          prop_file_data_form={file_data_form}
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
                    <option>운영</option>
                    <option>긴급</option>
                    <option>일반</option>
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
                  ['style', ['style']],
                  ['font', ['bold', 'underline', 'clear']],
                  ['fontname', ['fontname']],
                  ['para', ['ul', 'ol', 'paragraph']],
                  ['table', ['table']],
                  ['insert', ['link', 'picture', 'video']],
                  ['view', ['fullscreen', 'codeview']]
                ]
              }}
            />
            <div className="writing_button_box" style={{ marginBottom: '50px' }}>
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

export default Post_Uploade_Modify;
