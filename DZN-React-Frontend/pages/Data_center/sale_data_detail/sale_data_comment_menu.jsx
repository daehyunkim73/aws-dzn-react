import React, { useState, useCallback, useEffect } from "react";
import Ajax from "../../../lib/ajax-3rd-custom";
import globals from "../../../lib/globals";
import Comment_delete_popup from "../../popup/Small_popup/Comment_delete_popup";

// 메인 댓글 리스트
const SalesDataCommentMenu = ({
  data,
  userInfo,
  setLending,
  setIsUpdateComment,
}) => {
  const [isMenu, setIsMenu] = useState(false);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [confirm, setConfirm] = useState({
    isConfirm: false,
    isCancel: false,
  });

  // 메뉴 클릭 이벤트
  const menuClick = useCallback(() => {
    setIsMenu(!isMenu);
  }, [setIsMenu, isMenu]);

  // 업데이트 이벤트
  const updateClick = useCallback((e) => {
    setIsUpdateComment(true);
    setIsMenu(false);
  });

  // 컨펌창 확인 눌렀을 때
  useEffect(() => {
    if (confirm.isConfirm) {
      const APIUrl = `${globals.certApiUrl}/comment/deleteComment`;
      const param = {
        selected_comment_no: data.comment_no,
        board_no: data.board_no,
      };

      Ajax.post(APIUrl, param)
        .then((response) => {
          const resultData = JSON.parse(response);
          if (resultData.resultCode === 200) {
            alert("댓글삭제에 성공하였습니다.");
            setLending(true);
          } else {
            alert("댓글삭제에 실패하였습니다.(1)");
            console.error(resultData.resultMessage);
          }
        })
        .catch((e) => {
          alert("댓글삭제에 실패하였습니다.(2)");
          console.error(e);
        });
    }
    setIsMenu(false); // 메뉴 닫힘
    setIsDeletePopup(false); // 삭제 팝업 닫힘
    setConfirm((confirm) => {
      return { ...confirm, isConfirm: false };
    }); // 컨펌창 확인/취소 눌렀을 때 반응
  }, [confirm.isConfirm === true]);

  // 컨펌창 취소 눌렀을 때
  useEffect(() => {
    setIsMenu(false); // 메뉴 닫힘
    setIsDeletePopup(false); // 삭제 팝업 닫힘
    setConfirm((confirm) => {
      return { ...confirm, isCancel: false };
    }); // 컨펌창 확인/취소 눌렀을 때 반응
  }, [confirm.isCancel === true]);

  // 삭제 이벤트
  const deleteClick = useCallback((e) => {
    setIsDeletePopup(true);
    [globals, data, Ajax];
  });

  return (
    <React.Fragment>
      {isDeletePopup && <Comment_delete_popup setConfirm={setConfirm} />}
      {userInfo.user_no === data.insert_user_no && (
        <div className="LS_funcbtn">
          <div style={{ position: "relative", display: "inline-block" }}>
            <div>
              <button
                type="button"
                className="LS_btn funcbtn"
                onClick={menuClick}
                style={{ display: "block" }}
              >
                <span className="sp_selene">메뉴</span>
              </button>
            </div>
            {/* <!-- [D] 버튼 클릭시 display:block 처리 --> */}
            {isMenu && (
              <ul className="LS_funcbtn_list">
                <li>
                  <span onClick={updateClick}>수정</span>
                </li>
                <li>
                  <span onClick={deleteClick}>삭제</span>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default SalesDataCommentMenu;
