import React, { useState, useEffect, useCallback, useRef } from 'react';
import Support_sidebar from '../Forum_sidebar/forum_sidebar';
import New_icon from "../../../image/Dev_Center/Forum/data_set_new_comment.png";
import { Server_ajax_get, UncertApi_ajax_get, Server_ajax_post, User_info } from '../../../server_ajax';
import axios from 'axios';
import Service_detail_post_info from './Commponent/Service_detail_post_info';
import Service_comment_form from './Commponent/Service_comment_form';
import Service_forum_comment_list from './Commponent/Service_forum_comment_list';
import { test } from '../../../src/now_date';
import Ajax from '../../../lib/ajax-3rd-custom';
import { useCookies } from 'react-cookie';

const Service_froum_in = (props) => {
    const comment_text_area = useRef();

    const { match, history } = props;
    const [service_detail_post, setService_detail_post] = useState([]);
    const [comment_box_fade, setComment_box_fade] = useState(false);
    const [comment_uploade, setComment_uploade] = useState(false);
    const [change_text, setChange_text] = useState(0);
    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        comment_uploade === true && setComment_uploade(false);
    }, [comment_uploade]);

    useEffect(() => {
        try {
            (async function () {
                await Server_ajax_post(`forum/contents_view?id=${match.params.id}`, {});
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
                setService_detail_post(detial_main_post);
            });
        } catch (e) {
            return console.error(e);
        }
    }, [comment_uploade]);

    const comment_fade = useCallback(() => {
        setComment_box_fade((prev) => !prev, setChange_text(0));
    }, [comment_box_fade]);

    const comment_uploade_text = async () => {
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
    }

    const Forum_text_change = useCallback((e) => {

    }, [change_text]);

    return (
        <React.Fragment>
            <div className="faq_wrap">
                <div className="faq_table notice_table">
                    {
                        service_detail_post.map((service_detail_item, service_detail_idx) => {
                            return (
                                service_detail_idx < 1 &&
                                <Service_detail_post_info
                                    key={service_detail_item.forum_idx}
                                    detail_post_info={service_detail_item}
                                />
                            )
                        })
                    }
                    <div className="comment_big_uloade_box">
                        <div className="dataset_comment_box">
                            <div className="dataset_comment_button_box">
                                <p>댓글:
                                <span className="real_comment_number_text">
                                        {
                                            service_detail_post.map((comment_item, comment_idx, comment_info) => {
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
                            <Service_comment_form
                                Change_ev={Forum_text_change}
                                Text_ch={change_text}
                                Comment_uplode={comment_uploade_text}
                                Text_info={comment_text_area}
                            />
                        )}
                    </div>
                    {
                        service_detail_post.filter((forum_gaci_item) => {
                            return forum_gaci_item.forum_idx && forum_gaci_item.forum_idx === Number(match.params.id)
                        }).map((comment_result) => {
                            return (
                                <Service_forum_comment_list
                                    list_comments={comment_result}
                                    all_gaci_comment={service_detail_post}
                                    setComment_uploade={setComment_uploade}
                                    key={comment_result.frm_avr_idx}
                                />
                            );
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Service_froum_in;