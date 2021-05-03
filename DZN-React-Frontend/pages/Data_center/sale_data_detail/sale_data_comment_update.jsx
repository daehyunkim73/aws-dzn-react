import React, { useState, useEffect, useCallback, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { useCookies } from "react-cookie";
import Ajax from "../../../lib/ajax-3rd-custom";
import globals from "../../../lib/globals";

const sale_data_comment_update = ({ data, setIsUpdateComment, setLending }) => {
  const comment_text = useRef("");
  const [commentCnt, setCommentCnt] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies();

  // 초기정보 설정
  useEffect(() => {
    const placeholder = document.querySelector(".reply_placeholder_update");
    placeholder.style.display = "none";

    const contents = data.contents;
    comment_text.current = contents;
    setCommentCnt(contents.length);
  }, []);

  // 댓글창 입력 이벤트
  const commentChange = (e) => {
    const contents = e.target.value;
    comment_text.current = contents;
    setCommentCnt(contents.length);
  };

  // 댓글창 클릭시 placeholder 멘트 제거
  const commentClick = useCallback(() => {
    const placeholder = document.querySelector(".reply_placeholder_update");
    const inputbox = document.querySelector(".reply_inputbox_update");
    placeholder.style.display = "none";
    inputbox.focus();
  });

  // 댓글창 벗어날 시 입력 여부에 따라 placeholder 노출 결정
  const commentBlur = useCallback(() => {
    const placeholder = document.querySelector(".reply_placeholder_update");
    if (comment_text.current === "") {
      placeholder.style.display = "block";
    } else {
      placeholder.style.display = "none";
    }
  });

  // 등록 버튼 이벤트
  const confirmClick = useCallback(async () => {
    try {
      const APIUrl = `${globals.certApiUrl}/comment/updateComment`;
      let param = {
        cno: cookies.h_selected_company_no, // 회사번호
        board_no: data.board_no, // 등록할 보드 고유 번호
        contents: comment_text.current, // 댓글내용
        comment_no: data.comment_no, // 수정할 댓글 고유 번호
      };

      // API 통하여 댓글 등록
      Ajax.post(APIUrl, param)
        .then((response) => {
          const resultData = JSON.parse(response);
          if (resultData.resultCode === 200) {
            setLending(true);
            setIsUpdateComment(false);
          } else {
            alert("댓글등록에 실패하였습니다.");
            console.error(resultData.resultMessage);
          }
        })
        .catch((e) => {
          alert("댓글등록에 실패하였습니다.");
          console.error(e);
        });
    } catch (e) {
      console.error(e);
    }
  }, []);

  // 취소 버튼 이벤트
  const cancelClick = useCallback(() => {
    setIsUpdateComment(false);
  }, [setIsUpdateComment]);

  return (
    <React.Fragment>
      <div className="LSreplybox modify">
        <div className="reply_profile">
          <div className="profile_image">
            <div
              className="image_box"
              style={{
                backgroundImage: `url(${globals.portalUrl}${data.profile_url})`,
              }}
            ></div>
          </div>
          <strong className="name">{data.user_name}</strong>
        </div>

        <ContentEditable
          className="reply_inputbox reply_inputbox_update"
          html={comment_text.current}
          onFocus={commentClick}
          onBlur={commentBlur}
          onChange={commentChange}
        />
        <span
          className="reply_placeholder reply_placeholder_update"
          onClick={commentClick}
        >
          댓글을 입력하세요.
        </span>

        <div className="reply_submitbox">
          <div className="btngroup">
            <button
              type="button"
              className="LS_btn basic"
              onClick={cancelClick}
            >
              취소
            </button>
            <button
              type="button"
              className="LS_btn basic2"
              onClick={confirmClick}
            >
              수정
            </button>
          </div>
          <span className="text_count">{commentCnt}/200</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default sale_data_comment_update;
