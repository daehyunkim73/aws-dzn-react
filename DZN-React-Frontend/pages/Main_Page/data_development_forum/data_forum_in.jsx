import React, { useState, useEffect, useCallback, useRef } from "react";
import Forum_gaci_img from "../../../image/Dev_Center/Forum/gaci_data_img.png";
import New_icon from "../../../image/Dev_Center/Forum/data_set_new_comment.png";
import axios from "axios";
import Detail_gaci_header from "./Component/Detail_gaci_header";
import Comment_form from "./Component/Comment_form";
import Comment_lists from "./Component/Comment_lists";
import {
  Server_ajax_get,
  Server_ajax_post,
  UncertApi_ajax_get,
  User_info
} from "../../../server_ajax";
import { test } from '../../../src/now_date';
import Ajax from '../../../lib/ajax-3rd-custom';
import { useCookies } from 'react-cookie';

const Data_froum_in = (props) => {
  const comment_text_area = useRef();
  const [gaci_user_info, setGaci_user_info] = useState([]);
  const [forum_comment_lists, setForum_comment_lists] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();

  const [change_text, setChange_text] = useState(0);
  const [comment_box_fade, setComment_box_fade] = useState(false);
  const [comment_uploade, setComment_uploade] = useState(false);
  const { match, history } = props;

  const [forum_in_file, setForum_in_file] = useState([]);

  const comment_fade = useCallback(() => {
    setComment_box_fade((prev) => !prev, setChange_text(0));
  }, [comment_box_fade]);

  const Forum_text_change = useCallback((e) => {

  }, [change_text]);

  useEffect(() => {
    try {
      (async function () {
        await Server_ajax_post(`forum/contents_view?id=${match.params.id}`, {});
        const forum_file_info = await Server_ajax_get(`forum/froum_file_post`)
        setForum_in_file(forum_file_info);
      })();
    } catch (e) {
      return console.error(e);
    }
  }, [])

  useEffect(() => {
    try {
      const post_url = `/developer/forum/data/contents?id=${match.params.id}`;

      Ajax.getUncertToken(post_url, "get", async (signature) => { //댓글 수정(예정)
        const detial_main_post = await UncertApi_ajax_get(post_url, signature); // 수정(예정)
        setGaci_user_info(detial_main_post);
      });
    } catch (e) {
      return console.error(e);
    }
  }, [comment_uploade]);

  useEffect(() => {
    comment_uploade === true && setComment_uploade(false);
  }, [comment_uploade]);

  const comment_uploade_text = async () => { //댓글 등록
    try {
      if (!cookies.wehago_s) {
        return alert('로그인을 먼저 해주세요.')
      }
      const user_comment_info = await User_info();
      const comment_date_time = new test();

      let body = {
        comment_contents: `<p>${comment_text_area.current.value.replace(/(\n|\r\n)/g, "<br>")}</p>`,
        forum_post_idx: match.params.id,
        gaci_idx_comment: Number(match.params.id),
        comment_mbr_idx: user_comment_info.resultData[0].user_no,
        comment_date: comment_date_time.date,
      };

      await Server_ajax_post("forum/forum_comment_up", body);
      comment_text_area.current.value = "";
      setChange_text(0);
      setComment_uploade(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <React.Fragment>
      <div className="faq_wrap">
        <div className="faq_table notice_table">
          {gaci_user_info.map((Gaci_main_con, Gaci_main_index) => {
            return (
              Gaci_main_index < 1 &&
              <Detail_gaci_header
                detail_gaci_info={Gaci_main_con}
                detail_gaci_file_info={forum_in_file}
                search_file_id={match}
                key={Gaci_main_con.forum_idx}
              />
            );
          })}
          <div className="comment_big_uloade_box">
            <div className="dataset_comment_box">
              <div className="dataset_comment_button_box">
                <p>
                  댓글:
                  <span className="real_comment_number_text">
                    {
                      gaci_user_info.map((comment_item, comment_idx, comment_info) => {
                        if (comment_idx < 1) {
                          if (comment_item.forum_idx !== null) {
                            return comment_info.length;
                          } else {
                            return 0;
                          }
                        }
                      })
                    }
                  </span>
                  <img src={New_icon} alt="" />
                </p>
              </div>
              <div className="comment_uploade_button">
                <button onClick={comment_fade}>댓글달기</button>
              </div>
            </div>
            {comment_box_fade === true && (
              <Comment_form
                Change_ev={Forum_text_change}
                Text_ch={change_text}
                Comment_uplode={comment_uploade_text}
                Text_info={comment_text_area}
              />
            )}
          </div>
          {
            gaci_user_info.filter((forum_gaci_item) => {
              return forum_gaci_item.forum_idx && forum_gaci_item.forum_idx === Number(match.params.id)
            }).map((comment_result) => {
              return (
                <Comment_lists
                  list_comments={comment_result}
                  all_gaci_comment={gaci_user_info}
                  setComment_uploade={setComment_uploade}
                  key={comment_result.frm_avr_idx}
                />
              );
            })
          }
        </div>
      </div>
    </React.Fragment>
  );
};
export default Data_froum_in;
