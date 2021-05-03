import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ko-KR";
import "bootstrap/js/modal";
import "bootstrap/js/dropdown";
import "bootstrap/js/tooltip";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import { Server_ajax_get, User_info } from '../../../server_ajax';
import Gaci_post_update_popup from '../../popup/Small_popup/Forum/Gaci_post_update_popup';
import { useCookies } from "react-cookie";

const forum_update = (props) => {
    const { match, history } = props;
    const title_value = useRef();
    const editor = useRef();
    const cate_selected = useRef();
    const [update_in_post, setUpdate_in_post] = useState([]);
    const [update_post_info, setUpdate_post_info] = useState({});
    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        try {
            (async function () {
                if (!cookies.wehago_s) {
                    alert('접근 권한이 없습니다.');
                    return history.push('/forum/service');
                }

                const update_post = await Server_ajax_get(`forum/data/contents?id=${match.params.id}`);
                const user_post_info = await User_info();
                
                if(!update_post || update_post.length === 0) {
                    alert('존재하지 않는 게시물입니다.');
                    return history.push('/forum/service');
                }
                
                if (update_post[0].post_mbr_idx !== user_post_info.resultData[0].user_no) {
                    alert('접근 권한이 없습니다.');
                    return history.push('/forum/service');
                }
                setUpdate_in_post(update_post[0]);
            })()
        } catch (e) {
            return console.error(e);
        }

    }, []);

    useEffect(() => {
        editor.current.noteEditable[0].innerHTML = update_in_post.forum_post_desc;
        cate_selected.current.value = update_in_post.cate_code;
        title_value.current.value = update_in_post.title;
    }, [update_in_post]);

    const forum_post_update = () => {
        setUpdate_post_info({
            update_post_id: match.params.id,
            update_title: title_value.current.value,
            update_cate: cate_selected.current.value,
            update_desc: editor.current.noteEditable[0].innerHTML,
            forum_update_gbn: 'S'
        })

        const forum_update_none_bgk = document.getElementById("Froum_Data_Approved_gaci_update_popup_bgk");
        forum_update_none_bgk.style.display = "table";
    }

    const foru_post_main_redirection = () => {
        history.push("/forum/service");
    }

    return (
        <React.Fragment>
            <Gaci_post_update_popup
                Forum_update_info={update_post_info}
                Redirection={history}
            />
            <div className="payment_info forum_write_wrap">
                <div className="search_page" id="big_lee_sarch_page_box">
                    <div className="input_wrap">
                        <div className="user_list_wrap" id="lee_user_list_wrap">
                            <div className="input_box_wrap">
                                <div className="input_box white_border">제목</div>
                                <div className="input_box">카테고리</div>
                            </div>
                            <div className="input_form_wrap">
                                <div className="input_form white_border">
                                    <Form.Control
                                        type="text"
                                        className="form_input"
                                        placeholder="제목은 최대 100자 까지 작성이 가능합니다."
                                        ref={title_value}
                                    />
                                </div>
                                <div className="input_form">
                                    <Form.Control
                                        as="select"
                                        className="search_select"
                                        ref={cate_selected}
                                    >
                                        <option>카테고리 선택</option>
                                        <option>사용방법</option>
                                        <option>문제해결</option>
                                        <option>자유토론</option>
                                        <option>데이터분석</option>
                                        <option>빅 데이터</option>
                                    </Form.Control>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="writing_gaci_box">
                        <ReactSummernote
                            value="Default value"
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
                        />
                        <div
                            className="writing_button_box"
                            style={{ marginBottom: "50px" }}
                        >
                            <div className="forum_file_button_text_box">
                                <div className="Sales_info_sc_file_btn_wrap">
                                    <input
                                        multiple
                                        hidden
                                        type="file"
                                        id="Sales_file_name"
                                        name="Sales_file_name"
                                    />
                                    <label htmlFor="Sales_file_name" >파일첨부</label>
                                </div>

                            </div>
                            <div className="list_gaci_uploade_box">
                                <button onClick={foru_post_main_redirection}>목록</button>
                                <button onClick={forum_post_update}>수정</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default forum_update;