import React,{ useEffect, useRef, useState, useCallback } from 'react';
import Quest_posts_uploade_popup from '../../../../popup/Popup_Notice_Management/Quest_posts_uploade_popup';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useCookies } from "react-cookie";
import moment from 'moment';

// summernote
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ko-KR";
import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
import 'bootstrap/dist/css/bootstrap.css';
import { Server_ajax_post } from '../../../../../../Server_ajax';

const Detail_gaci_header = ({ info, setRending, setLoading }) => {
  const [cookies, setCookie, removeCookie] = useCookies();  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // 1차 답변 수정 클릭 이벤트
  const questAnswerEditClick = useCallback(() => {          
    setTitle(info.ta_title); 
    setContent(info.ta_desc);
    setIsEdit(true);    
  }, [setIsEdit, setTitle, setContent])

  // 답변/2차답변 등록 클릭 이벤트
  const questAnswerRegClick = useCallback(() => {    
    // 유효성 체크
    if(title.trim() === ''){
      alert('제목을 입력해 주세요.');
      return;
    }      
        
    if(content.replace(/(<([^>]+)>)/ig,"") === '') {
      alert('내용을 입력해 주세요.');
      return;
    }    
    const Admin_user_post_uploade_popup_bgk = document.getElementById("Admin_user_post_uploade_popup_bgk");
    Admin_user_post_uploade_popup_bgk.style.display = "table";
  }, [title, content]);

  // 답변 등록/수정 확인 버튼 클릭시 이벤트
  useEffect(() => {
    if(confirm) {
      const Gaci_uploade_ok_popup_bgk = document.getElementById("Admin_user_post_uploade_popup_bgk");
      Gaci_uploade_ok_popup_bgk.style.display = "none";

      const setData = async function() {
        try {
          const params = {
              questIdx: info.tq_idx,
              title: title,
              content: content,
              date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
              adminId: cookies.h_portal_id
          }      

          let questAnswer;
          if(isEdit) questAnswer = await Server_ajax_post(`contents_management/quest_answer_update`, params);
          else questAnswer = await Server_ajax_post(`contents_management/quest_answer_save`, params);
  
          if(questAnswer.affectedRows > 0) {            
            // 등록 시 알람에 추가
          if(!isEdit) {
            const alamParam = {
              id: info.tq_id,
              definitionCode: 4,
              contentCode: 1,
              etc: ''
            }            
            await Server_ajax_post(`admin_settings/alarm_regist`, alamParam);            
          }

            setRending(true);
            setIsEdit(false);
            setLoading(false);
          } else {
            throw new Error(`답변 ${isEdit ? '수정' : '등록'}에 실패하였습니다.`);
          }
        } catch (e) {
            return console.error(e);
        }
      };    
      setData();  
    }
    setConfirm(false);
  }, [confirm])

  // 제목 입력 이벤트
  const inputChange = (e) => {    
    setTitle(e.target.value);
  }

  // Summernote 이벤트
  // 이미지
  const onImageUpload = (images, insertImage) => {
    for (let i = 0; i < images.length; i++) {      
      const reader = new FileReader();

      reader.onloadend = () => {
        insertImage(reader.result);
      };

      reader.readAsDataURL(images[i]);
    }
  }
  // 내용 입력 후 State에 값 전달
  const summernoteChange = (value) => {          
    setContent(value);
  }
  // 수정 버튼 클릭 후 내용 불러올 때
  const onInit = (func) => {
    func.replace(isEdit ? info.ta_desc : '');
  }

  return (
    <React.Fragment>
      <Quest_posts_uploade_popup setConfirm={setConfirm} isEdit={isEdit} /> 
      <div className="Noice_big_box">
        <div className="Page_same_text">
          <p className="backoffice_title">{'문의하기 > 답변 내용 보기'}</p>
        </div>
      </div>
      <div className="Notice_detail_table">
        <div className="notice_title_box" id="gaci_Writer">
          <p>작성자: {info.tq_name}</p>
        </div>
        <div className="notice_title_box">
          <div className="notice_left_text_box">
            <p className="notice_detail_sp_text">
              문의: <span className="sp_head_line_color_text">[{info.tq_type_name}]</span>
            </p>
            <p>{info.tq_title}</p>
          </div>
          <div className="notice_right_text_box">
            <p>{info.tq_regDt}</p>
          </div>
        </div>
        <div className="notice_detail_contents_box">
          <div dangerouslySetInnerHTML={{__html: info.tq_desc}}></div>
        </div>
        {
        info.awr_idx && !isEdit ? 
        <div className="question_answer">
          <div className="answer_headline_box" id="question_answer_detail_box">
            <div className="question_answer_result_box">
              <p>
                답변: <span id="question_result">{info.ta_title}</span>
              </p>
            </div>
            <div className="question_answer_date_box">
              <p className="question_answer_date">{info.ta_regDt}</p>
            </div>
          </div>
          <div className="answer_contents_box">
            <div dangerouslySetInnerHTML={{__html: info.ta_desc}}></div>
          </div>
          <div className="posts_btn_box">
            <button className="ok_posts_btn" id="question_answer_list" onClick={questAnswerEditClick}>
              수정
            </button>            
            <Link to="/admin/question">
              <button className="fail_posts_btn" id="question_answer_btn">
                목록
              </button>
            </Link>
          </div>
        </div>        
        :        
        <div className="question_answer">
          <div className="answer_headline_box" id="question_answer_detail_box">
            <div className="question_answer_result_box">
              <p>
                답변
              </p>
            </div>            
          </div>
          <div className="answer_contents_box">
            <Form.Control type="text" className="form_input" value={title} placeholder="제목을 입력해주세요." onChange={inputChange} />
            <ReactSummernote              
              options={{
                height: 250,
                width: 740,
                dialogsInBody: true,
                toolbar: [
                  ["style", ["style"]],
                  ["font", ["bold", "underline", "clear"]],
                  ["fontname", ["fontname"]],
                  ["para", ["ul", "ol", "paragraph"]],
                  ["table", ["table"]],
                  ["insert", ["link", "picture", "video"]],
                  ["view", ["fullscreen", "codeview"]],
                ],
              }}              
              onChange={summernoteChange}
              onImageUpload={onImageUpload}
              onInit={onInit}
              
            />      
          </div>
          <div className="posts_btn_box">
            {isEdit ? 
            <button className="ok_posts_btn" id="question_answer_list" onClick={questAnswerRegClick}>
              수정
            </button>
            :
            <button className="ok_posts_btn" id="question_answer_list" onClick={questAnswerRegClick}>
              등록
            </button>
            }
            <Link to="/admin/question">
              <button className="fail_posts_btn" id="question_answer_btn">
                목록
              </button>
            </Link>
          </div>
        </div>
        }
      </div>
    </React.Fragment>
    )
}

export default Detail_gaci_header;