import React, { useState, useRef, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import Update_posts_post_uplaode_popup from '../popup/Popup_update_Management/Update_Notice_posts_posts_uploade_popup';
import Update_Notice_posts_posts_fail_popup from '../popup/Popup_update_Management/Update_Notice_posts_posts_fail_popup';

import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ko-KR";
import "bootstrap/js/modal";
import "bootstrap/js/dropdown";
import "bootstrap/js/tooltip";
import "bootstrap/dist/css/bootstrap.css";

import { Server_ajax_get, Server_ajax_post } from "../../../Server_ajax";
import { useCookies } from "react-cookie";

const Update_post_modify = ({history, match}) => {    
    const category = useRef('');
    const editor = useRef('');

    const uptIdx = match.params.id;    
    const [updateCateList, setUpdateCateList] = useState([]);
    const [editConfirm, setEditConfirm] = useState(false);
    const [cnlConfirm, setCnlConfirm] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    
    // 카테고리 정보 가져오기
    useEffect(() => {        
        (async() => {
            try{
                const getCate = await Server_ajax_get("contents_management/update_get_category");                
                setUpdateCateList(() => getCate);
                
                const getData = await Server_ajax_get(`contents_management/admin/update/detail/${uptIdx}`);
                if(getData) {                                        
                    category.current = getData.upt_title_desc_code;
                    setTitle(getData.upt_title)
                    setContent(getData.desc);
                }
                setLoading(true);
            }catch(e){
                console.error(e);
            }            
        })();        
    }, [])
      
    const updateCancelClick = () => {
        const Admin_user_update_post_fail_popup_bgk = document.getElementById("Admin_user_update_post_fail_popup_bgk");
        Admin_user_update_post_fail_popup_bgk.style.display = "table";
    }
    useEffect(() => {
        if(cnlConfirm){     
            window.history.back();            
        }
    }, [cnlConfirm])

    const updateEditClick = () => {
        const cateTag = category.current; //createRef를 이용한 dom 접근                        
        const selectCateCode = cateTag.options[cateTag.selectedIndex].value;        
        const upttitle = title.trim();        
        const content = editor.current.noteEditable[0].innerText.trim();        
        
        if(selectCateCode === "" || upttitle === '' || content === '') {
          return alert("'카테고리/제목/내용'을 입력하여 주시기 바랍니다.");
        }
        const Admin_user_update_post_uplaode_popup_bgk = document.getElementById("Admin_user_update_post_uplaode_popup_bgk");
        Admin_user_update_post_uplaode_popup_bgk.style.display = "table";      
    }
    useEffect(() => {
        if(editConfirm === true) {
            const setData = async() => {
                try{                    
                    const body = {
                        uptIdx: uptIdx,
                        categoryCode: category.current.value,
                        title: title.trim(),
                        content: editor.current.noteEditable[0].innerHTML,                        
                        date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                        adminId: cookies.h_portal_id
                    }            
                    const updateReg = await Server_ajax_post(
                        'contents_management/update_writing_update', body
                    )
                    
                    if(updateReg.affectedRows > 0){
                        history.push(`/admin/update/detail/${uptIdx}`);
                    } else {
                        throw new Error('등록에 실패하였습니다.');
                    }
                }
                catch(e) {
                    console.error(e);
                }
            }
            setData();
        }
    }, [editConfirm])      

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
    // 수정 버튼 클릭 후 내용 불러올 때
    const onInit = (func) => {        
        func.replace(content);
    }
    
    return (
        <React.Fragment>
            <Update_Notice_posts_posts_fail_popup setConfirm={setCnlConfirm} />
            <Update_posts_post_uplaode_popup setConfirm={setEditConfirm} />
            {loading && 
            <div className="Post_uploade_modfiy_wrap">
                <div className="Post_uploade_modfiy_big_box">
                    <div className="Page_same_text">
                        <p className="backoffice_title">{'FAQ > 수정'}</p>
                    </div>
                    
                    <div className="admin_user_list_wrap" id="post_headerText_box_first">
                        <div className="admin_user_list_header" id="post_input_box_header">
                            <div className="notice_input_box">카테고리</div>
                        </div>
                        <div className="Notice_from_wrap">
                            <div className="notice_input_form" id="Notice_input_box">                                
                                <Form.Control as="select" className="list_select" ref={category} defaultValue={loading && category.current}>
                                    <option value=''>카테고리 선택</option>
                                    {                                        
                                        loading && updateCateList.map((list) => 
                                        <option key={list.UPT_MAIN_CODE} value={list.UPT_MAIN_CODE}  >
                                            {list.UPT_MAIN_NAME}
                                        </option>
                                        )
                                    }
                                </Form.Control>                                
                            </div>
                        </div>
                    </div>

                    <div className="admin_user_list_wrap" id="post_headerText_box">
                        <div className="admin_user_list_header" id="post_input_box_header">
                            <div className="notice_input_box">제목</div>
                        </div>
                        <div className="Notice_from_wrap">
                            <div className="notice_input_form" id="Notice_input_box">
                                <Form.Control type="text" placeholder="제목을 입력해주세요." value={title} onChange={inputChange} />
                            </div>
                        </div>
                    </div>

                    <div className="Posts_box">                        
                        <ReactSummernote                            
                            ref={editor}
                            options={{
                            height: 350,
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
                            onInit={onInit}
                        />
                    <div className="posts_btn_box">
                        <button className="fail_posts_btn" onClick={updateCancelClick}>취소</button>
                        <button className="ok_posts_btn" onClick={updateEditClick}>수정</button>
                    </div>
                </div>
            </div>
        </div>
        }
        </React.Fragment>        
    )
}

export default Update_post_modify;