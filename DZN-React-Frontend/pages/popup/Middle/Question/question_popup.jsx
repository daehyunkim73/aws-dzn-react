import React, { useState, useRef, useEffect, useCallback } from "react";
import Table from 'react-bootstrap/Table';
import { FormControl } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Gaci_upload_ok_popup from '../../Small_popup/Question/Gaci_upload_ok_popup';
import Question_popup_fail from './question_popup_fail';
import { Server_ajax_post } from "../../../../server_ajax";
import { useCookies } from "react-cookie";

// summernote
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ko-KR";
import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
import 'bootstrap/dist/css/bootstrap.css';

// 이미지 import
import close_btn from '../../../../image/Center/Close_btn/close_btn.png';

const Question_Popup = ({ setRending }) => {
    const [cookies, setCookie, removeCookie] = useCookies();

    const quest_title_value = useRef('');
    const quest_select_vlaue = useRef('');
    const editor = useRef();
  
    const [quest_info_yn, setQuest_info_yn] = useState(false);

    const [confirm, setConfirm] = useState(false);
    const [quest_title, setQuest_title] = useState(""); // 제목
    const [quest_cate, setQuest_cate] = useState(""); // 카테고리
    const [content, setContent] = useState();    // 내용    

    const initInfo = useCallback(() => {
      // 입력 정보 초기화
      editor.current.noteEditable[0].innerHTML = '';
      quest_title_value.current.value = '';
      quest_select_vlaue.current.value = '';
      setQuest_info_yn(false);
    }, [setQuest_info_yn]);
    
    //취소 클릭 시 이벤트
    const Image_close_popup = useCallback(() => {
        const Question_popup_bgk = document.getElementById("Question_popup_bgk");
        Question_popup_bgk.style.display = "none";
        initInfo();        
    }, [initInfo]);
    
    // 등록 버튼 눌렀을 떄 이벤트
    useEffect(() => {      
      if(quest_info_yn)  {
        const Gaci_uploade_ok_popup_bgk = document.getElementById(
          "Gaci_uploade_ok_popup_bgk"
        );
        Gaci_uploade_ok_popup_bgk.style.display = "table";
        Gaci_uploade_ok_popup_bgk.style.zIndex = "101";        
      }      
    }, [quest_info_yn]);
    
    // 문의 등록 
    const questionRegClick = () => {
      const title = quest_title_value.current.value;      

      const select_big_value = quest_select_vlaue.current; //createRef를 이용한 dom 접근      
      const select_value_pric = quest_select_vlaue.current.options[select_big_value.selectedIndex].value;

      const contentHtml = editor.current.noteEditable[0].innerHTML;
      const contentText = editor.current.noteEditable[0].innerText;      
        
      if (select_value_pric === "" || contentText.trim() === "" || title.trim() === "") {
        const Gaci_uploade_fail_popup_bgk = document.getElementById("Gaci_uploade_fail_popup_bgk");
        Gaci_uploade_fail_popup_bgk.style.display = "table";
        Gaci_uploade_fail_popup_bgk.style.zIndex = "9999";
        return ;
      }

      setQuest_title(title);  // 제목
      setQuest_cate(select_value_pric); // 선택한 카테고리
      setContent(contentHtml);  // 문의내용
      setQuest_info_yn(true); // 등록 버튼 확인
    };

    // 문의글 최종 등록
    useEffect(() => {
      (async () => {
        try{
          if(confirm === true) {
            const Question_popup_bgk = document.getElementById("Question_popup_bgk");
            Question_popup_bgk.style.display = "none";

            const url = `support/question_wirteing_save`;      
            const imgUrl = `support/quest_uploade_img`;
            const qstTd = cookies.h_portal_id

            const param = {
                mbrId: qstTd,
                title: quest_title,
                category: quest_cate,
                content: content,                
                date: moment(new Date()).format('YYYY-MM-DD hh:mm:ss')                
            }
    
            if (false) { //파일이 있으면
                axios.post('http://localhost:8081/support/quest_uploade_img', prop_file_data_form, config)
                    .then((result) => {
                        body.quest_data_imfl = result.data
                        axios.post('http://localhost:8081/developer/support/question_wirteing_save', body)
                            .then(() => {
                            })
                    })
            } else {                
                const result = await Server_ajax_post(url, param);
                
                if(result.affectedRows > 0) { 
                  setRending(true);
                }else {
                  throw new Error('문의 등록 실패')
                }
            }
            initInfo();
          }
        }catch(e){
          console.error(e);
        }        
      })();
      setConfirm(false);      
    }, [confirm])


    // 제목 입력 이벤트
    const inputChange = (e) => {
      const str = e.target.value;
      if(str.length > 50) {        
        e.target.value = quest_title;
        return; 
      }
      setQuest_title(str);
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
  
    return (
    <React.Fragment>
        <Gaci_upload_ok_popup setConfirm={setConfirm} />
    <Question_popup_fail message={`카테고리/제목/문의내용을 작성해주세요.`} /> {/*올리는거에 실패를 할때 ex: 문의유형을 선택하세요.*/}
        <div className="smae_popup_bgk_big_box" id="Question_popup_bgk">
            <div className="Buy_make_popup_white_box">
                <div className="service_center_delete_middel_white_box" id="Question_sp_middle_box">
                    <div className="Buy_popup_head_line_box">
                        <div className="Small_popup_box">
                            <div className="Buy_popup_head_line_box">
                                <h1>문의 등록</h1>
                                <div className="Buy_popupClose_box">
                                    <img onClick={Image_close_popup} src={close_btn} alt="" />
                                </div>
                            </div>
                            <div className="question_uploade_nav_box">
                                <div className="table_question_uploade_box">
                                    <Table responsive>
                                        <tbody>
                                            <tr className="first_tr_question">
                                                <td>문의유형</td>
                                                <td id="control_select_question">
                                                    <Form.Control as="select" className="list_select"
                                                        ref={quest_select_vlaue}>
                                                        <option value=''>카테고리 선택</option>
                                                        <option value='1'>이용문의</option>
                                                        <option value='2'>오류신고</option>
                                                        <option value='3'>건의사항(API관련)</option>
                                                        <option value='4'>기술지원</option>
                                                        <option value='5'>법률상담</option>
                                                        <option value='6'>기타</option>
                                                    </Form.Control>
                                                </td>
                                            </tr>
                                            <tr className="second_tr_question">
                                                <td>제목</td>
                                                <td id="control_input_question">
                                                    <FormControl placeholder="제목은 최대 50자까지 작성이 가능합니다."
                                                        className="list_all_input" ref={quest_title_value} onChange={inputChange}/>
                                                </td>
                                            </tr>
                                            <tr className="three_tr_question">
                                                <td>첨부파일</td>
                                                <td>
                                                    <div className="file_sp_wrap">
                                                      <input hidden type="file" id="Sales_file_name" name="Sales_file_name"/>
                                                      <label htmlFor="Sales_file_name">파일첨부</label>
                                                    </div>

                                                    {/* {file_in_name.map((c, i) => {
                                                    console.log('i',i)
                                                    return (
                                                        <div
                                                          key={i}
                                                          style={{
                                                            display: "inline-block",
                                                            marginLeft: "5px",
                                                            marginRight: "5px",
                                                          }}
                                                        >
                                                          {c.name}
                                                          {c.name && (
                                                            <img
                                                              src={Close_btn_icon}
                                                              onClick={img_in_remove(i)}
                                                              alt={`${c}`}
                                                            />
                                                          )}
                                                        </div>
                                                      );
                                                    })} */}
                                                    <ul id="question_file_big_ul">
                                                        <li>
                                                            <div></div><span>첨부파일: 2M이하/파일명 영문으로 등록</span>
                                                        </li>
                                                        <li>
                                                            <div></div><span>파일이 여러 개인 경우 압축해서 올려 주시기 바랍니다.</span>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr className="four_tr_question">
                                                <td>문의 내용</td>
                                                <td id="control_Biginput_question">
                                                <ReactSummernote
                                                  value="Default value"
                                                  ref={editor}
                                                  options={{
                                                    height: 250,
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
                                                  onImageUpload={onImageUpload}
                                                />                                      
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="one_ok_button_box">
                                    <button className="fail_btn_popup" onClick={Image_close_popup}>취소</button>
                                    <button className="ok_btn_popup" id="gaci_main_uploade_ok_btn"
                                        onClick={questionRegClick}>등록</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
    )
}

export default Question_Popup;