import React, { useState, useEffect } from 'react';
import Update_posts_delete_popup from "../../../../popup/Popup_update_Management/Update_posts_delete_popup";
import { Link } from 'react-router-dom';
import { Server_ajax_post } from '../../../../../../Server_ajax';
import { useHistory } from "react-router";

const Detail_gaci_header = ({ updateInfo, detailId }) => {    
    const [confirm, setConfirm] = useState(false);
    const history = useHistory();

    // 삭제 버튼 클릭 시 
    const deleteBtnClick = () => {
      const Admin_user_update_delete_popup_bgk = document.getElementById(
        "Admin_user_update_delete_popup_bgk"
      );
      Admin_user_update_delete_popup_bgk.style.display = "table";
    };
    // 삭제 버튼 확인 눌렀을 시
    useEffect(() => {
      const Admin_user_update_delete_popup_bgk = document.getElementById(
        "Admin_user_update_delete_popup_bgk"
      );
      Admin_user_update_delete_popup_bgk.style.display = "none";

      const deleteData = async () => {
        if(confirm) {             
          const param = {
            deleteIdxs: detailId
          }   
          const uptDelete = await Server_ajax_post(`contents_management/update_delete_checked`, param);

          if(uptDelete.affectedRows > 0) {
            history.push("/admin/update");          
          } else {
            throw new Error('삭제에 실패하였습니다.')
          }
        }
      }
      deleteData();
      setConfirm(false);
    }, [confirm])

    return (
      <React.Fragment>
      <Update_posts_delete_popup setConfirm={setConfirm}/>
      <div className="update_detail_wrap">
        <div className="Notice_detail_big_box">
          <div className="Page_same_text">
            <p className="backoffice_title">업데이트</p>
          </div>
          <div className="Notice_contents_Wrap">
            <div className="Notice_detail_table">
              <div className="notice_title_box" id="gaci_Writer">
                <p>{updateInfo.adm_id}</p>
              </div>
              <div className="notice_title_box">
                <div className="faq_headline_text_box">
                  <p>{updateInfo.regDt}, {updateInfo.upt_title}</p>
                </div>
              </div>

              <div className="notice_detail_contents_box">
                <div dangerouslySetInnerHTML={{__html: updateInfo.desc}}></div>
              </div>
            </div>
            <div className="notice_btn_box">
              <Link className="link_style_text" to={`/admin/update/modify/${detailId}`}>
                <button className="table_view_btn">수정</button>
              </Link>
              <button className="table_view_btn" onClick={deleteBtnClick}>
                삭제
              </button>
              <Link to="/admin/update">
                <button className="table_view_btn">목록</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
    )
}

export default Detail_gaci_header;