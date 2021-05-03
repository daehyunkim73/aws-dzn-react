import React, { useState, useEffect} from 'react';
import Forum_file from "../../../../image/Dev_Center/Forum/file.png";
import Forum_profile from "../../../../image/Center/Developers_header/profile.png";

const Search_forum_table = (props) => {
    const { Search_table_data } = props;
    const [html_arr, setHtml_arr] = useState([]);
    const [html_code_text, setHtml_code_text] = useState([]);
    const [yn_tf, setYn_tf] = useState(false);
    const [comment_lists_box, setComment_lists_box] = useState([]);
    const [forum_addfile, setForum_addfile] = useState();
    const tag_list = [
        'p',
        'blockquote',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'b',
        'u'
    ]

    useEffect(() => {
        const doc = new DOMParser().parseFromString(Search_table_data.tqDesc, "text/html");
        const tqDesc_element_child = doc.firstChild.lastChild;

        setHtml_arr(html_arr => [...html_arr, tqDesc_element_child]);
        setYn_tf(true);
    }, []);

    useEffect(() => {
        if (yn_tf === true) {
            tag_list.map((tag_info) => {
                return html_arr[0].getElementsByTagName(tag_info);
            }).filter((tag_info) => {
                return tag_info[0] !== undefined && setHtml_code_text(html_code_text => [...html_code_text, tag_info])
            })
        }
    }, [yn_tf]);

    return (
        <React.Fragment>
            <div className="forum_post_table_wrap">
                <div className="forum_post_table_title">
                    <img src={Forum_profile} alt="profile" />
                    <p className="forum_post_category">[{Search_table_data.tqTypeCode}]</p>
                    <p>{Search_table_data.title}</p>
                </div>
                 <div className="forum_post_table_content">
                    {
                        html_code_text.map((c) =>
                            c.length >= 5 ?
                                [].slice.call(c).slice(0, 4).map((data_rows_ifno, rows_index) => {
                                    return (
                                        <div key={rows_index} dangerouslySetInnerHTML={{ __html: data_rows_ifno.innerHTML }}></div>
                                    )
                                })
                                :
                                [].map.call(c, (data_info, index) => {
                                    return (
                                        <div key={index} dangerouslySetInnerHTML={{ __html: data_info.innerHTML }}></div>
                                    )
                                })
                        )
                    }
                </div>
                <div className="forum_post_table_footer">
                    <div>
                        <p>작성자:</p>
                        <p className="forum_footer_content">홍길동</p>
                    </div>
                    <div>
                        <p>작성일:</p>
                        <p className="forum_footer_content">{Search_table_data.tqRegDt}</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Search_forum_table;