import React, { useState, useEffect, useCallback } from 'react';
import Support_sidebar from '../Forum_sidebar/forum_sidebar';
// import Data_set_Froum_gaci_contents from './Component/Data_set_Froum_gaci_contents';
// import Data_set_frouum_comment_comment from './Component/Data_set_Froum_gaci_comment_comment';
// import Data_set_froum_gaci_comments from './Component/Data_set_Froum_gaci_comment';
// import Service_set_Froum_gaci_Imagecontents from './Component/Service_set_Froum_gaci_Imagecontents';

const Service_froum_in = () => {
    return (
        <React.Fragment>
                <div className="faq_wrap">
                    <div className="faq_table notice_table">
                        {/* <Service_set_Froum_gaci_Imagecontents /> */}
                        <div className="comment_big_uloade_box">
                            {/* <Data_set_Froum_gaci_contents /> */}
                            {/* <Data_set_froum_gaci_comments /> */}
                            <div className="comment_double_comments_big_box">
                                {/* <Data_set_frouum_comment_comment /> */}
                            </div>
                        </div>
                    </div>
                </div>
        </React.Fragment>
    )
}

export default Service_froum_in;