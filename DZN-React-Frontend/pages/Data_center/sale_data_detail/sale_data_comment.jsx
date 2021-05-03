import React, { useState, useRef, useEffect, useCallback } from "react";
import Ajax from "../../../lib/ajax-3rd-custom"; //로그인 모듈
import globals from "../../../lib/globals";
import commonModule from "../common_module/common_module";
import SaleDataCommentInput from "./sale_data_comment_input";
import SaleDataCommentDetail from "./sale_data_comment_detail";

const Sale_data_comment = ({ detailID: boardNo, userInfo }) => {
  const [comments, setComments] = useState([]);
  const [lending, setLending] = useState(false);
  const [loading, setLoading] = useState(false);
  const { htmlDecode } = commonModule;

  useEffect(() => {
    mainCommentAPI();
    setLending(false);
  }, [lending === true]);

  const mainCommentAPI = useCallback(async () => {
    try {
      // 댓글 조회
      const mainUrl = `${globals.certApiUrl}/comment/getAllRootList?board_no=${boardNo}&comment_list=T`;
      const minApi = await Ajax.get(mainUrl);
      const mainData = await JSON.parse(minApi);

      if (mainData.resultCode === 200) {
        const list = mainData.resultData.list;
        setComments(() =>
          list
            .map((data) => {
              const contents = htmlDecode(data.contents);
              return { ...data, contents };
            })
            .sort((a, b) => {
              return b.insert_timestamp - a.insert_timestamp;
            })
        );
      } else throw new Error(`${mainData.resultCode}: ${mainData.errorMsg}`);
    } catch (e) {
      console.error(e);
    }
    setLoading(true);
  }, [globals, comments, setLoading, setComments, htmlDecode, boardNo]);

  // 새로고침
  const refreshClick = () => {
    setLending(true);
  };

  return (
    <React.Fragment>
      <div className="content_wrap">
        <div className="market_content LS_reply">
          {/* <!-- 댓글 카운팅 --> */}
          <div className="replycount">
            <strong>
              댓글(<span>{comments.length}</span>)
            </strong>
            <div
              style={{
                position: "absolute",
                verticalAlign: "top",
                display: "inline-block",
              }}
            >
              <div>
                <button
                  type="button"
                  className="LS_btn refresh"
                  onClick={refreshClick}
                >
                  <span className="sp_selene">새로고침</span>
                </button>
              </div>
            </div>
          </div>
          {/* <!-- 댓글 입력 --> */}
          <SaleDataCommentInput
            userInfo={userInfo}
            type="main"
            commentNo=""
            boardNo={boardNo}
            setLending={setLending}
          />
          {loading &&
            comments.map((data, idx) => (
              <SaleDataCommentDetail
                key={idx}
                data={data}
                userInfo={userInfo}
                setLending={setLending}
              />
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sale_data_comment;
