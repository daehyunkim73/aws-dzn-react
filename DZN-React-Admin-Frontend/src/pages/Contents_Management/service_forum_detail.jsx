import React from "react";

import Service_forum_detail_comment_comment from "./components/Forum_management/Service_forum_detail_comment_comment";
import Service_forum_detail_comment from "./components/Forum_management/Service_forum_detail_comment";
import Service_forum_detail_post_comment from "./components/Forum_management/Service_forum_detail_posts_comment";
import Serviceforum_posts_delete_popup from "../popup/Popup_forum_Management/Service_forum_delete_popup";
import gaci_data_img from "../../../image/Dev_Center/Forum/gaci_data_img.png";
import data_set_new_comment from "../../../image/Dev_Center/Forum/data_set_new_comment.png";
import { Link } from "react-router-dom";

const Service_forum_detail = () => {
  const Service_detail_popup_Click = () => {
    const Admin_user_service_forum_delete_popup_bgk = document.getElementById(
      "Admin_user_service_forum_delete_popup_bgk"
    );
    Admin_user_service_forum_delete_popup_bgk.style.display = "table";
  };
  return (
    <React.Fragment>
      <Serviceforum_posts_delete_popup />
      <div className="forum_detail_box">
        <div className="big_forum_detail_box">
          <div className="Page_same_text">
            <p className="backoffice_title">서비스 개발자 포럼</p>
          </div>
          <div className="forum_detail_wrap_box">
            <div className="profile_box">
              <p>
                <span>[사용방법]</span>데이터를 만들었는데 어디다가 파나요?
              </p>
            </div>
            <div className="porfile_info_box">
              <div className="left_profile_box">
                <p>임꺽정</p>
              </div>
              <div className="right_profile_box">
                <p>
                  <span className="dataset_views">조회수: 7</span>
                  <span>|</span>
                  <span className="dataset_date">2019-07-29</span>
                </p>
              </div>
            </div>

            <div className="posts_contents_box">
              <div className="posts_image_box">
                <p>지도 데이터 이미지....</p>
                <div className="posts_forum_image_box">
                  <img src={gaci_data_img} alt="" />
                </div>
              </div>
            </div>

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
                    onClick={Service_detail_popup_Click}
                  >
                    삭제
                  </button>
                  <Link to="/admin/forum">
                    <button id="admin_post_list_btn">목록</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="big_posts_gaci_comments_box">
              <Service_forum_detail_post_comment />
            </div>

            <div className="big_admin_comments_box">
              <Service_forum_detail_comment />
            </div>

            <div className="admin_comment_double_comments_big_box">
              <Service_forum_detail_comment_comment />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Service_forum_detail;
