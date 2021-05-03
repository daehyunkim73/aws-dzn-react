import React, { useCallback, useState, useEffect } from "react";
// 이미지 import
import close_btn from "../../../image/Center/Close_btn/close_btn.png";
import FileSaver from 'file-saver';

/* 서비스 상품관리 > 승인심사  */

const Api_compaion_result_popup = (props) => {
    const { api_req_compaion_info } = props;
    const [use_download_file, setUse_download_file] = useState([]);
    const str_arr = [
        String.raw`uploade\image`,
        String.raw`uploade\file`,
    ];

    useEffect(() => {
        console.log("use_download_file", use_download_file);
    }, [use_download_file])

    // 리뷰로 인한 파일 오류문제로 잠시 주석 김용민 0924
    // useEffect(() => {
    //     if (api_req_compaion_info !== undefined) {
    //         if (api_req_compaion_info.addFile ===
    //             "uploade\\image\\" + api_req_compaion_info.addFile.replace(str_arr[0] + "\\", "")
    //         ) {
    //             str_arr.filter((c) => {
    //                 return c === str_arr[0]
    //             }).map((cotnrol) => {
    //                 setUse_download_file(
    //                     use_download_file =>
    //                         [...use_download_file, api_req_compaion_info.addFile.replace(cotnrol + "\\", "")]
    //                 );
    //             });
    //         } else {
    //             str_arr.filter((c) => {
    //                 return c === str_arr[1]
    //             }).map((cotnrol) => {
    //                 setUse_download_file(
    //                     use_download_file =>
    //                         [...use_download_file, api_req_compaion_info.addFile.replace(cotnrol + "\\", "")]
    //                 );
    //             });
    //         }
    //     }
    // }, [api_req_compaion_info]);

    const imageclose_click = useCallback(() => {
        const Data_list_popup_bgk = document.getElementById(
            "Api_compaion_result_popup"
        );
        Data_list_popup_bgk.style.display = "none";
    }, []);

    const file_compaion_download = (index) => () => {
        Array(api_req_compaion_info).filter((c) => {
            return Array(api_req_compaion_info).indexOf(c) === index
        }).map((c) => {
            FileDownload.saveAs(`https://api.wehago.com/${c.addFile}`, c.addFile)
        })
    }

    return (
        <React.Fragment>
            <div
                className="smae_popup_bgk_big_box"
                id="Api_compaion_result_popup"
            >
                <div className="Buy_make_popup_white_box">
                    <div className="Data_Approved_small_white_box">
                        <div className="Buy_popup_uploda_headLine_box">
                            <div className="Buy_popup_head_line_box">
                                <h1>승인심사 결과</h1>
                                <div className="Buy_popupClose_box">
                                    <img onClick={imageclose_click} src={close_btn} alt="" />
                                </div>
                            </div>
                        </div>
                        <div
                            className="question_uploade_nav_box"
                            id="Buy_popupClose_nav_box"
                        >
                            <div className="Sale_member_text_box">
                                <p>다음과 같이 결과를 알려드립니다.</p>
                            </div>
                            <div className="Companion_box">반려</div>
                            <div className="user_approved_result_popup">
                                <div contenteditable="true" className="text_result_compaion" dangerouslySetInnerHTML={{
                                    __html: api_req_compaion_info !== undefined && api_req_compaion_info.memo,
                                }}>
                                </div>
                            </div>
                            <div className="file_download_text_box">
                                <p>
                                    {
                                        api_req_compaion_info !== undefined &&
                                        api_req_compaion_info.addFile !== null && "첨부파일"
                                    }
                                </p>
                                <p>
                                    <span id="Aprroved_result_data_box" onClick={file_compaion_download}>
                                        {use_download_file.map((c) => {
                                            return (
                                                <b>{c}</b>
                                            )
                                        })}
                                    </span>
                                </p>
                            </div>
                            <div className="one_ok_button_box">
                                <button onClick={imageclose_click} className="ok_btn_popup">확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Api_compaion_result_popup;
