import React, { useEffect, useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import fileDownload from 'file-saver';
import Quest_file from "../../../../image/Dev_Center/Forum/file.png";
import { Server_ajax_get } from '../../../../server_ajax';
import moment from 'moment'

const Detail_gaci_header = (props) => {
    const { detail_gaci_info, search_file_id } = props;
    const [use_download_file, setUse_download_file] = useState([]);
    const [search_download_file, setSearch_download_file] = useState([]);
    const str_arr = [
        String.raw`uploade\image`,
        String.raw`uploade\file`,
    ];

    function textLengthOverCut(txt, len, lastTxt) {
        if (len == "" || len == null) { // 기본값
            len = 40;
        }
        if (lastTxt == "" || lastTxt == null) { // 기본값
            lastTxt = "...";
        }
        if (txt.length > len) {
            txt = txt.substr(0, len) + lastTxt;
        }
        return txt;
      }

    let answerWrite = null;

    useEffect(() => {
        (async function () {
            try {
                const axios_host = await Server_ajax_get(
                    'support/froum_file_post',
                )
                axios_host.filter((v) => {                    
                    return v.quest_post_idx === search_file_id.params.qst_idx;
                }).map((file_data) => {                    
                    setSearch_download_file(search_download_file => [...search_download_file, file_data]);
                    if (file_data.quest_file_path) {
                        if (file_data.quest_file_path ===
                            "uploade\\image\\" + file_data.quest_file_path.replace(str_arr[0] + "\\", "")
                        ) {
                            str_arr.filter((c) => {
                                return c === str_arr[0]
                            }).map((cotnrol) => {
                                setUse_download_file(
                                    use_download_file =>
                                        [...use_download_file, file_data.quest_file_path.replace(cotnrol + "\\", "")]
                                );
                            });
                        } else {
                            str_arr.filter((c) => {
                                return c === str_arr[1]
                            }).map((cotnrol) => {
                                setUse_download_file(
                                    use_download_file =>
                                        [...use_download_file, file_data.quest_file_path.replace(cotnrol + "\\", "")]
                                );
                            });
                        }
                    }
                })
            } catch (e) {
                return console.error(e);
            }
        })()
    }, []);

    useEffect(() => {
        if (detail_gaci_info.stat === "답변등록") {
            answerWrite = (
                <div className="answer_box">
                    <div className="answer_header">
                        <div className="big_header_box">
                            <div className="answer_button">
                                <div className="question_text_wel">답변</div>
                            </div>
                            <div className="answer_text_box">
                                <p>{textLengthOverCut(detail_gaci_info.taTitle)}</p>
                            </div>
                            <div className="answer_time_box">
                                <p>{detail_gaci_info.taRegDt}</p>
                            </div>
                        </div>
                    </div>

                    <div className="main_question_text_box"> {/*답변글 */}
                        <div dangerouslySetInnerHTML={{ __html: detail_gaci_info.taDesc }}></div>
                    </div>
                </div>
            )
        }
    })

    const download_file = useCallback((index) => () => {
        search_download_file.filter((c) => {
            return search_download_file.indexOf(c) === index
        }).map((c) => {
            fileDownload.saveAs(`http://localhost:8081/${c.quest_file_path}`)
        })
    }, [use_download_file]);

    return (
        <React.Fragment>
            <div className="page_title_wrap" id="question_second_header">
                <div className="second_header_question_box">
                    <div className="question_small_box">
                        <div id="question_button_box">
                            <div className="question_text_wel">문의</div>
                        </div>
                        <div className="question_text_box">
                            <p>{textLengthOverCut(detail_gaci_info.tqTitle)}</p>
                        </div>
                        <div className="question_heaeLine_time_textBox">
                            <p>
                                <span className="gaci_question">[{detail_gaci_info.tqTypeName}]</span> <br />
                                <span className="question_time">{moment(detail_gaci_info.tqRegDt).format('YYYY-MM-DD hh:mm:ss')}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="api_content_wrap" id="question_wrap_box">
                <div className="main_question_box">
                    <div className="main_question_text_box"> 
                        <div dangerouslySetInnerHTML={{ __html: detail_gaci_info.tqDesc }}></div>
                        <div>{use_download_file && use_download_file.length !== 0 ? <img src={Quest_file} alt="file" /> : ''}</div>
                        {
                            use_download_file.map((c, i) => {
                                return (
                                    <div key={i}
                                        style={{
                                            cursor: 'pointer',
                                            color: "#6495ED",
                                            display: "inline-block",
                                            marginLeft: "10px",
                                            marginTop: "5px"
                                        }}
                                        onClick={download_file(i)}>{c}&nbsp;
                                    </div>
                                )
                            })
                        }
                    </div>                                    
                    {
                    detail_gaci_info.stat === "답변등록" &&                                
                    <div className="big_answer">
                        <div className="answer_header">
                            <div className="big_header_box">
                                <div className="answer_button">
                                    <div className="question_text_wel">답변</div>
                                </div>
                                <div className="answer_text_box">
                                    <p>{detail_gaci_info.taTitle}</p>
                                </div>
                                <div className="answer_time_box">
                                    <p>{detail_gaci_info.taRegDt}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="main_question_text_box"> {/*답변글 */}
                            <div dangerouslySetInnerHTML={{ __html: detail_gaci_info.taDesc }}></div>
                        </div>
                        
                    </div>
                    }                        
                    
                    <div className="list_button_box">
                        <Link to="/support/question" className="router_link">
                            <Button>목록</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>


    )
}

export default Detail_gaci_header;