import React, { useState, useCallback } from "react";
import globals from "../../../lib/globals";
import SaleDataCommentMenu from "./sale_data_comment_menu";
import commonModule from "../common_module/common_module";
import SaleDataCommentSub from "./sale_data_comment_sub";
import SaleDataCommentUpdate from "./sale_data_comment_update";

const Sale_data_comment_sub_detail = ({ userInfo, item, setLending }) => {
  const { timeForToday } = commonModule;
  const [subCommentNo, setSubCommentNo] = useState();
  const [isReComment, setIsReComment] = useState(false);
  const [isUpdateComment, setIsUpdateComment] = useState(false);

  // 답글 클릭 이벤트 (서브 댓글 확인)
  const recommentClcik = useCallback(
    (e) => {
      setSubCommentNo(e.target.id);
      setIsReComment(!isReComment);
    },
    [setSubCommentNo, setIsReComment, isReComment]
  );

  return (
    <React.Fragment>
      {isUpdateComment ? (
        <div className={`LSreplybox_wrap depth${item.depth - 1}`}>
          <SaleDataCommentUpdate
            data={item}
            setIsUpdateComment={setIsUpdateComment}
            setLending={setLending}
          />
        </div>
      ) : (
        <div
          className={`LSreplybox re_reply readonly depth${
            item.depth - 1
          } re_reply_${item.group_no}`}
        >
          <div className="reply_profile">
            <div className="profile_image">
              <div
                className="image_box"
                style={{
                  backgroundImage: `url(${globals.portalUrl}${item.profile_url})`,
                }}
              ></div>
            </div>
            <strong className="name">{item.user_name}</strong>
          </div>
          {item.is_deleted === "F" ? (
            <div className="reply_inputbox">{item.contents}</div>
          ) : (
            <div className="reply_inputbox_delete">삭제된 댓글입니다.</div>
          )}
          {item.depth !== 6 && (
            <div className="reply_submitbox">
              <div className="btngroup">
                <button
                  type="button"
                  className="LS_btn basic"
                  id={item.comment_no}
                  onClick={recommentClcik}
                >
                  답글 {item.child_count}
                </button>
              </div>
              <span className="text_count">
                {timeForToday(item.insert_timestamp)}
              </span>
            </div>
          )}
          {item.is_deleted === "F" && (
            <SaleDataCommentMenu
              data={item}
              userInfo={userInfo}
              setLending={setLending}
              setIsUpdateComment={setIsUpdateComment}
            />
          )}
        </div>
      )}
      {isReComment && (
        <SaleDataCommentSub
          userInfo={userInfo}
          commentNo={subCommentNo}
          boardNo={item.board_no}
          isReComment={isReComment}
          parentDepth={item.depth}
        />
      )}
    </React.Fragment>
  );
};

export default Sale_data_comment_sub_detail;
