import React, { useState, useCallback, useEffect } from "react";
import globals from "../../../lib/globals";
import commonModule from "../common_module/common_module";
import SaleDataCommentMenu from "./sale_data_comment_menu";
import SaleDataCommentSub from "./sale_data_comment_sub";
import SaleDataCommentUpdate from "./sale_data_comment_update";

// 메인 댓글 리스트
const SalesDataCommentDetail = ({ data, userInfo, setLending }) => {
  const [commentNo, setCommentNo] = useState("");
  const [isReComment, setIsReComment] = useState(false);
  const { timeForToday } = commonModule;
  const [isUpdateComment, setIsUpdateComment] = useState(false);

  // 답글 클릭 이벤트 (서브 댓글 확인)
  const recommentClcik = useCallback(
    (e) => {
      setCommentNo(e.target.id);
      setIsReComment(!isReComment);
    },
    [setCommentNo, setIsReComment, isReComment]
  );

  return (
    <React.Fragment>
      {isUpdateComment ? (
        <SaleDataCommentUpdate
          data={data}
          setIsUpdateComment={setIsUpdateComment}
          setLending={setLending}
        />
      ) : (
        <div className="LSreplybox readonly">
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
          {data.is_deleted === "F" ? (
            <div className="reply_inputbox">{data.contents}</div>
          ) : (
            <div className="reply_inputbox_delete">삭제된 댓글입니다.</div>
          )}
          <div className="reply_submitbox">
            <div className="btngroup">
              <button
                type="button"
                className="LS_btn basic"
                id={data.comment_no}
                onClick={recommentClcik}
              >
                답글 {data.child_count}
              </button>
            </div>
            <span className="text_count">
              {timeForToday(data.insert_timestamp)}
            </span>
          </div>
          {data.is_deleted === "F" && (
            <SaleDataCommentMenu
              data={data}
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
          commentNo={commentNo}
          boardNo={data.board_no}
          isReComment={isReComment}
          parentDepth={data.depth}
        />
      )}
    </React.Fragment>
  );
};

export default SalesDataCommentDetail;
