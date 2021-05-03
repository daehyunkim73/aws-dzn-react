import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Update_list from './update_list';
import UptGroup_list from './uptGroup_list';
import Update_list_detail from './update_list_detail';


const Update_router = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <React.Fragment>
            <div className="api_document_wrap update_login_list notice_wrap4">
                <Route exact path="/support/update" component={Update_list}></Route>
                <Route exact path="/support/update/:upt_title_desc_code" component={UptGroup_list}></Route>
                <Route exact path="/support/update/:upt_title_desc_code/:upt_idx" component={Update_list_detail}></Route>
            </div>
        </React.Fragment>
    )
}

export default Update_router;