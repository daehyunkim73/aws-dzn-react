import React from 'react';

// 이미지 import
import side_bar_btn from "../../image/Center/Developers_header/side_bar_btn.png";

const Side_button = ({ post }) => {
    return (
        <React.Fragment>
            <button type="button" id="sidebarCollapse" className="btn" onClick={post}>
                <img src={side_bar_btn} alt=""/>
            </button>
            
        </React.Fragment>
    )
}

export default Side_button;