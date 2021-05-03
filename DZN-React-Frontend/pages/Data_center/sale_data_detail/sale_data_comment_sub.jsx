import React, { useState, useCallback } from "react";
import { useEffect } from "react";
import Ajax from "../../../lib/ajax-3rd-custom"; //로그인 모듈
import globals from "../../../lib/globals";
import commonModule from "../common_module/common_module";
import SaleDataCommentInput from "./sale_data_comment_input";
import SaleDataCommentSubDetail from "./sale_data_comment_sub_detail";

// 대댓글 조회용 컴포넌트
const Sale_data_comment_sub = ({
  userInfo,
  commentNo,
  boardNo,
  isReComment,
  parentDepth,
}) => {
  const [loading, setLoading] = useState(false);
  const [lending, setLending] = useState(false);
  const [subComments, setSubComments] = useState([]);
  const { htmlDecode } = commonModule;

  useEffect(() => {
    if (isReComment) {
      subCommentAPI();
      setLending(false);
    }
  }, [isReComment, lending]);

  // 대댓글 조회 API
  const subCommentAPI = useCallback(async () => {
    try {
      // 대댓글 조회
      const subUrl = `${globals.certApiUrl}/comment/getSubList?selected_comment_no=${commentNo}&board_no=${boardNo}`;
      const subApi = await Ajax.get(subUrl);
      const subData = await JSON.parse(subApi);

      if (subData.resultCode === 200) {
        // 성공시
        const list = subData.resultData.list;

        setSubComments(() =>
          list
            .map((data) => {
              const contents = htmlDecode(data.contents);
              return { ...subComments, ...data, contents };
            })
            .sort((a, b) => {
              return b.insert_timestamp - a.insert_timestamp;
            })
        );
        // 실패시
      } else throw new Error(`${subData.resultCode}: ${subData.errorMsg}`);
    } catch (e) {
      console.error(e);
    }
    setLoading(true);
  }, [globals, commentNo, boardNo, setSubComments, htmlDecode]);

  return (
    <React.Fragment>
      {loading &&
        subComments.map((item, idx) => {
          return (
            <SaleDataCommentSubDetail
              key={idx}
              userInfo={userInfo}
              item={item}
              setLending={setLending}
            />
          );
        })}
      <div className={`LSreplybox_wrap depth${parentDepth}`}>
        <SaleDataCommentInput
          userInfo={userInfo}
          type="sub"
          commentNo={commentNo}
          boardNo={boardNo}
          setLending={setLending}
        />
      </div>
    </React.Fragment>
  );
};

export default Sale_data_comment_sub;
