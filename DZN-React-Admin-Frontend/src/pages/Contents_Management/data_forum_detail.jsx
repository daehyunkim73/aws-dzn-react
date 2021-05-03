import React, { useEffect, useState } from "react";
import Data_forum_detail_comment_comment from "./components/Forum_management/Data_forum_detail_comment_comment";
import Data_forum_detail_comment from "./components/Forum_management/Data_forum_detail_comment";
import Dataforum_posts_delete_popup from "../popup/Popup_forum_Management/Data_posts_delete_popup";
import data_set_new_comment from "../../../image/Dev_Center/Forum/data_set_new_comment.png";
import { Link } from "react-router-dom";
import axios from 'axios';
import profile_comment from '../../../image/Dev_Center/Forum/profile_comment.png';
import { Server_ajax_get } from '../../../Server_ajax';
import { func_date } from '../../../func_src/admin_now_date';
import { User_info } from '../../../Server_ajax';

const data_Forum_detail = (props) => {
  const [fourm_detail_post, setForum_detail_post] = useState([]);
  const [use_download_file, setUse_download_file] = useState([]);
  const [search_download_file, setSearch_download_file] = useState([]);
  const [forum_post_comments, setForum_post_commnets] = useState([]);
  const [forum_detail_delete, setForum_detail_delete] = useState([]);
  const [comment_uploade, setComment_uploade] = useState(false);

  const str_arr = [
    String.raw`uploade\image`,
    String.raw`uploade\file`,
  ];

  const { match, history } = props;

  useEffect(() => {
    (async function () {
      try {
        const axios_host = await Server_ajax_get(
          `contents_management/admin_forum_post_list/${match.params.id}`
        )
        setForum_detail_post(axios_host);
        const axios_host_comment = await Server_ajax_get('contents_management/post_comments_list');
        setForum_post_commnets(axios_host_comment);
      } catch (e) {
        return console.error(e);
      }
    })();
  }, [comment_uploade]);


  const Data_detail_popup_Click = () => {
    const Admin_user_data_forum_delete_popup_bgk = document.getElementById(
      "Admin_user_data_forum_delete_popup_bgk"
    );
    Admin_user_data_forum_delete_popup_bgk.style.display = "table";
    setForum_detail_delete(forum_detail_delete => [...forum_detail_delete, match.params.id]);
  };

  const download_file = () => () => {
  }

  const admin_comment_form_comemnt = async () => {
    const user_comment_info = await User_info();
    const comment_date_time = new func_date();
    let body = {
      comment_contents: `<p>${comment_text_area.current.value.replace(/(\n|\r\n)/g, "<br>")}</p>`,
      forum_post_idx: match.params.id,
      gaci_idx_comment: Number(match.params.id),
      comment_mbr_idx: user_comment_info.resultData[0].portal_id,
      comment_date: comment_date_time.date,
    };

    await Server_ajax_post("contents_management/forum_comment_up", body);
    comment_text_area.current.value = "";
    // setChange_text(0);
    setComment_uploade(true);
  }

  return (
    <React.Fragment>
      <Dataforum_posts_delete_popup
        Forum_delete={forum_detail_delete}
        History_back={history}
      />
      <div className="forum_detail_box">
        <div className="big_forum_detail_box">
          <div className="Page_same_text">
            <p className="backoffice_title">데이터 개발자 포럼</p>
          </div>
          <div className="forum_detail_wrap_box">
            {
              fourm_detail_post.map((item, item_idx) => {
                if (item_idx < 1) {
                  return (
                    <div key={item.forum_idx}>
                      <div className="profile_box">
                        <p><span>[{item.cate_code}]</span>{item.title}</p>
                      </div>
                      <div className="porfile_info_box">
                        <div className="left_profile_box">
                          <p>홍길동</p>
                        </div>
                        <div className="right_profile_box">
                          <p>
                            <span className="dataset_views">조회수: {item.vw_cnt}</span>
                            <span>|</span>
                            <span className="dataset_date">{item.regDt}</span>
                          </p>
                        </div>
                      </div>
                      <div dangerouslySetInnerHTML={{ __html: item.desc }}></div>
                    </div>
                  )
                }
              })
            }
            {
              fourm_detail_post.map((item, index) => {
                return (
                  <div style={{
                    cursor: 'pointer',
                    color: "#6495ED",
                    display: "inline-block",
                    marginLeft: "10px",
                    marginTop: "5px"
                  }}
                    key={item.forum_idx}
                    onClick={download_file(item, index)}>{item.forum_post_file_name}</div>
                )
              })
            }
            <div className="big_posts_comments_box">
              <div className="posts_comment_box">
                <div className="post_comment_button_box">
                  <p>
                    댓글: <span id="post_comment_number_text">12</span>
                    <img
                      src={data_set_new_comment}
                      className="comment_label"
                      alt=""
                    />
                  </p>
                </div>
                <div className="admin_posts_btn_box">
                  <button
                    id="admin_post_delete_btn"
                    onClick={Data_detail_popup_Click}
                  >삭제</button>
                  <Link to="/admin/forum">
                    <button id="admin_post_list_btn">목록</button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="big_posts_gaci_comments_box">
              <div className="admin_posts_input_gaci_box">
                <div className="admin_post_comment_input_real_box">
                  <div className="admin_profile_big_box">
                    <div className="admin_profile_box">
                      <img src={profile_comment} alt="" />
                    </div>
                    <div className="admin_profile_name_box"><p>데이터 도둑</p></div>
                  </div>
                  <div className="admin_uploade_input_typing_uploade_box">
                    <textarea type="text" placeholder="댓글 내용을 입력해주세요."
                      maxLength="200" />
                  </div>
                  <div className="admin_value_input_comment_box">
                    <div className="admin_number_input_text_upBox">
                      <p><span id="max_number_gaci">0</span>
                        <span>/</span>
                        <span>200</span></p>
                    </div>
                    <div className="admin_comment_uploade_btn" onClick={admin_comment_form_comemnt}>등록</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="big_admin_comments_box">
              {
                forum_post_comments.filter(forum_comment_idx =>
                  Number(match.params.id) === Number(forum_comment_idx.forum_idx)
                ).map((forum_comments) => {
                  return (
                    <Data_forum_detail_comment
                      Forum_comments_ifno={forum_comments}
                    />
                  )
                })
              }
            </div>
            <div className="admin_comment_double_comments_big_box">
              <Data_forum_detail_comment_comment />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default data_Forum_detail;
