import React, { useState, useRef, useCallback } from "react";
import { useCookies } from "react-cookie";
import ContentEditable from "react-contenteditable";
import globals from "../../../lib/globals";
import Ajax from "../../../lib/ajax-3rd-custom"; // REST API

const sale_data_comment_input = ({
  userInfo,
  type,
  commentNo,  
  boardNo,
  setLending,
}) => {
  const comment_text = useRef("");
  const [commentCnt, setCommentCnt] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies();

  // 댓글창 입력 이벤트
  const commentChange = (e) => {
    comment_text.current = e.target.value;
    setCommentCnt(e.target.value.length);
  };

  // 댓글창 클릭시 placeholder 멘트 제거
  const commentClick = useCallback(() => {
    const upperNo = type === "main" ? "" : `_${commentNo}`;    
    const placeholder = document.getElementById(`reply_placeholder${upperNo}`);
    const inputbox = document.getElementById(`reply_inputbox${upperNo}`);
    placeholder.style.display = "none";
    inputbox.focus();
  }, [type]);

  // 댓글창 벗어날 시 입력 여부에 따라 placeholder 노출 결정
  const commentBlur = useCallback(() => {
    const upperNo = type === "main" ? "" : `_${commentNo}`;

    const placeholder = document.getElementById(`reply_placeholder${upperNo}`);
    if (comment_text.current === "") {
      placeholder.style.display = "block";
    } else {
      placeholder.style.display = "none";
    }
  }, [commentNo]);

  const commentSaveClick = () => {
    let APIUrl = globals.certApiUrl;
    let param = {
      cno: cookies.h_selected_company_no,
      board_no: boardNo,
      contents: comment_text.current,
    };

    // 메인 댓글 등록
    if (type === "main") {
      APIUrl += "/comment/createRoot";
    }
    // 서브 댓글 등록
    else {
      APIUrl += "/comment/createSub";

      param = {
        ...param,
        parent_comment_no: commentNo,
      };
    }

    // API 통하여 댓글 등록
    Ajax.put(APIUrl, param)
      .then((response) => {
        const resultData = JSON.parse(response);
        if (resultData.resultCode === 200) {          
          comment_text.current = "";
          setLending(true);
        } else {
          alert("댓글등록에 실패하였습니다.");
          console.error(resultData.resultMessage);
        }
      })
      .catch((e) => {
        alert("댓글등록에 실패하였습니다.");
        console.error(e);
      });
  };

  return (
    <React.Fragment>                    
      <div className="LSreplybox">
        <div className="reply_profile">
          <div className="profile_image">
            <div
              className="image_box"
              style={{
                backgroundImage: `url(${globals.portalUrl}${userInfo.profile_url})`,
              }}
            ></div>
          </div>
          <strong className="name">{userInfo.user_name}</strong>
        </div>
        <ContentEditable
          id={`reply_inputbox${type === "main" ? "" : `_${commentNo}`}`}
          className="reply_inputbox"
          html={comment_text.current}
          onFocus={commentClick}
          onBlur={commentBlur}
          onChange={commentChange}
        />
        <span
          id={`reply_placeholder${type === "main" ? "" : `_${commentNo}`}`}
          className="reply_placeholder"
          onClick={commentClick}
        >
          댓글을 입력하세요.
        </span>

        <div className="reply_submitbox">
          <div className="btngroup">
            <button
              type="button"
              className="LS_btn basic2"
              onClick={commentSaveClick}
            >
              등록
            </button>
          </div>
          <span className="text_count">{commentCnt}/200</span>
        </div>
      </div>            
        
    </React.Fragment>
  );
};

export default sale_data_comment_input;
