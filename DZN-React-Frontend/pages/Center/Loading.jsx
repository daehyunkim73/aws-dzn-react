import React from 'react';

const Loading = () => {

    return (
        <React.Fragment>
            <div className="dimmed loading_page">
                <div className="LS_spinner2">
                    <div className="loading"></div>
                    <span className="loading_text">loading</span>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Loading;