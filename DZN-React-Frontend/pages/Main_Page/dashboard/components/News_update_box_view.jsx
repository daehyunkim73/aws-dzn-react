import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import notice_update_all_empty from "../../../../image/Center/Empty/notice_update_all_empty.png";
import notice_update_empty from "../../../../image/Center/Empty/notice_update_empty.png";

const News_update_box = (props) => {
  const { boxes_lists, boxes_length, index } = props;

  function textLengthOverCut(txt, len, lastTxt) {
    if (len == "" || len == null) {
      // 기본값
      len = 40;
    }
    if (lastTxt == "" || lastTxt == null) {
      // 기본값
      lastTxt = "...";
    }
    // if (txt.length > len) {
    //     txt = txt.substr(0, len) + lastTxt;
    // }
    return txt;
  }

  return (
    <React.Fragment>
      {boxes_length === 0 ? (
        <div class="mainPageEmpty_wrap mainPage_UptEmpty_wrap">
          <div>
            <img src={notice_update_all_empty} alt="notice_update_all_empty" />
            <p>등록된 내용이 없습니다.</p>
          </div>
        </div>
      ) : boxes_lists[index] ? (
        <div className="new_small_white_box">
          <Link
            to={`/support/update/${boxes_lists[index].upt_title_desc_code}/${boxes_lists[index].upt_idx}`}
          >
            <Card className="news_white_card">
              <div className="card_text_box">
                <h2 className="card_text_hover">
                  {boxes_lists[index].upt_title_desc}
                </h2>
                <p className="card_small_text_hover">
                  {textLengthOverCut(boxes_lists[index].upt_title)}
                </p>
                <p className="card_footer_text">
                  WEHAGO Developers
                  <br /> {moment(boxes_lists[index].regDt).format("YYYY.MM.DD")}
                </p>
              </div>
            </Card>
          </Link>
        </div>
      ) : (
        <div className="new_small_white_box">
          <Card className="news_white_card">
            <div className="card_text_box empty_card_text_box">
              <img src={notice_update_empty} alt="notice_update_empty" />
            </div>
          </Card>
        </div>
      )}
    </React.Fragment>
  );
};
export default News_update_box;
